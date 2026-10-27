#!/usr/bin/env node
// Anti-template check for per-app sites (apps/<app>/site/ with a DESIGN.md).
// Each site must render through its own page.mjs and fail if it slides back
// to the shared look: banned fonts, banned marketing phrases, arrow/middle-dot
// tics, or more than 30% of its CSS classes shared with the legacy templates.
// Sites are also checked against each other: under 30% shared classes and no
// shared @font-face family, so a new app page cannot be a recolored copy of
// another app's page.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BANNED_FONTS = ['inter', 'roboto', 'arial', 'helvetica', 'poppins', 'montserrat', 'open sans', 'bricolage', 'dm sans', 'instrument serif'];
const BANNED_PHRASES = [
  'découvrez', 'libérez', 'révolutionnaire', 'tout-en-un', 'en toute sérénité', 'conçu pour vous', 'boostez', 'en toute simplicité',
  'discover', 'unlock', 'revolutionary', 'all-in-one', 'seamless', 'effortless', 'game-changer', 'supercharge', 'powerful',
];
// Classes the shared support form script, Turnstile and accessibility need; not a style signature.
const FUNCTIONAL = new Set(['support-form', 'cf-turnstile', 'form-status', 'form-note', 'honeypot', 'visually-hidden', 'skip', 'message-field']);
const MAX_SHARED = 0.3;

const classesIn = text => {
  const out = new Set();
  for (const m of text.matchAll(/class="([^"$]*)"/g)) for (const c of m[1].split(/\s+/)) if (/^[a-z][\w-]*$/i.test(c)) out.add(c);
  return out;
};
const cssClasses = css => new Set([...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/\.([a-z][\w-]*)/gi)].map(m => m[1]).filter(c => !/^\d/.test(c) && !['woff2', 'png', 'jpg', 'webp', 'avif'].includes(c)));
const visibleText = html => html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ');
const metaText = html => [...html.matchAll(/<(?:title)>([^<]*)<|content="([^"]*)"|alt="([^"]*)"/g)].map(m => m[1] || m[2] || m[3] || '').join(' ');

function legacyClasses(ownDir) {
  const ref = new Set();
  const add = file => { if (!existsSync(file)) return; const t = readFileSync(file, 'utf8'); for (const c of (file.endsWith('.css') ? cssClasses(t) : classesIn(t))) ref.add(c); };
  const ps = join(root, 'scripts', 'product-site');
  if (existsSync(ps)) for (const f of readdirSync(ps)) add(join(ps, f));
  add(join(root, 'styles.css'));
  add(join(root, 'index.html'));
  for (const app of readdirSync(join(root, 'apps'))) {
    const dir = join(root, 'apps', app);
    add(join(dir, 'index.html'));
    add(join(dir, 'styles.css'));
  }
  return ref;
}

const fontFamilies = css => new Set([...css.matchAll(/@font-face\s*{[^}]*font-family:\s*["']?([^"';}]+)/gi)].map(m => m[1].trim().toLowerCase()));

const failures = [];
const report = [];
const sites = [];
for (const app of readdirSync(join(root, 'apps')).sort()) {
  const dir = join(root, 'apps', app, 'site');
  if (!existsSync(join(dir, 'DESIGN.md'))) continue;
  if (!existsSync(join(dir, 'page.mjs'))) { failures.push(`${app}: DESIGN.md without page.mjs`); continue; }
  const page = await import(pathToFileURL(join(dir, 'page.mjs')).href);
  const cssFiles = readdirSync(dir).filter(f => f.endsWith('.css'));
  const css = cssFiles.map(f => readFileSync(join(dir, f), 'utf8')).join('\n');
  const htmls = page.LOCALES.map(loc => ({ loc: loc.code, html: page.render(loc) }));
  const design = readFileSync(join(dir, 'DESIGN.md'), 'utf8');
  if ((design.match(/^###? Option/gim) || []).length < 3) failures.push(`${app}: DESIGN.md must describe three options`);

  const fontScan = [css, ...htmls.map(h => (h.html.match(/<style[\s\S]*?<\/style>|style="[^"]*"|fonts\.googleapis[^"]*/g) || []).join(' '))].join('\n').toLowerCase();
  for (const font of BANNED_FONTS) if (new RegExp(`(^|[^a-z-])${font}([^a-z-]|$)`).test(fontScan.replace(/url\([^)]*\)/g, ''))) failures.push(`${app}: banned font "${font}"`);

  for (const { loc, html } of htmls) {
    const text = (visibleText(html) + ' ' + metaText(html)).toLowerCase();
    for (const phrase of BANNED_PHRASES) if (new RegExp(`(^|[^\\p{L}])${phrase}`, 'u').test(text)) failures.push(`${app} ${loc}: banned phrase "${phrase}"`);
    for (const m of html.matchAll(/<(a|button)\b[^>]*>([\s\S]*?)<\/\1>/g)) if (/→|&rarr;|-&gt;/.test(m[2])) failures.push(`${app} ${loc}: arrow in a link or button: ${visibleText(m[2]).trim()}`);
    if (/\S+ · \S+ · \S+/.test(visibleText(html))) failures.push(`${app} ${loc}: middle-dot chain in visible text`);
  }

  const ref = legacyClasses(dir);
  const own = new Set();
  for (const { html } of htmls) for (const c of classesIn(html)) own.add(c);
  for (const c of cssClasses(css)) own.add(c);
  const styled = [...own].filter(c => !FUNCTIONAL.has(c));
  const shared = styled.filter(c => ref.has(c));
  const share = styled.length ? shared.length / styled.length : 0;
  report.push(`${app}: ${styled.length} classes, ${shared.length} shared with legacy templates (${Math.round(share * 100)}%)${shared.length ? `: ${shared.join(', ')}` : ''}`);
  if (share >= MAX_SHARED) failures.push(`${app}: ${Math.round(share * 100)}% of classes shared with legacy templates (max ${MAX_SHARED * 100}%)`);
  sites.push({ app, styled: new Set(styled), fonts: fontFamilies(css) });
}

for (const a of sites) for (const b of sites) {
  if (a === b) continue;
  const shared = [...a.styled].filter(c => b.styled.has(c));
  const share = a.styled.size ? shared.length / a.styled.size : 0;
  report.push(`${a.app} vs ${b.app}: ${shared.length} shared classes (${Math.round(share * 100)}%)${shared.length ? `: ${shared.join(', ')}` : ''}`);
  if (share >= MAX_SHARED) failures.push(`${a.app}: ${Math.round(share * 100)}% of classes shared with the ${b.app} site (max ${MAX_SHARED * 100}%)`);
  if (a.app < b.app) for (const f of a.fonts) if (b.fonts.has(f)) failures.push(`${a.app} and ${b.app} both use the font "${f}"`);
}

for (const line of report) console.log(`anti-template: ${line}`);
if (failures.length) { for (const f of failures) console.error(`anti-template FAIL: ${f}`); process.exit(1); }
console.log(`anti-template: ${sites.length} site(s) pass`);
