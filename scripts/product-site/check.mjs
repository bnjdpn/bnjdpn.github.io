#!/usr/bin/env node
// Checks a staged product site before it is assembled and deployed.
//
//   node scripts/product-site/check.mjs --stage <dir> [--reference <previous stage dir>]
//
// Home pages: title of 60 characters or less, unique description, one H1,
// canonical equal to the final URL, hreflang with x-default, Open Graph,
// SoftwareApplication JSON-LD with an offer. Every local link and asset
// must exist in the stage. With --reference, the file list must be identical.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).join(' ').split('--').filter(Boolean).map((x) => x.trim().split(/\s+/)));
const stage = resolve(args.stage);
const reference = args.reference ? resolve(args.reference) : null;
const errors = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);

const listFiles = (root) => {
  const out = [];
  const visit = (dir) => readdirSync(dir).forEach((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) visit(path); else out.push(relative(root, path));
  });
  visit(root);
  return out.sort();
};

const files = listFiles(stage);
const base = readFileSync(join(stage, 'robots.txt'), 'utf8').match(/Sitemap: (\S+)sitemap\.xml/)[1];

if (reference) {
  const before = new Set(listFiles(reference));
  const after = new Set(files);
  for (const f of before) if (!after.has(f)) fail(f, 'missing compared with the reference stage');
  for (const f of after) if (!before.has(f)) fail(f, 'new file not in the reference stage');
}

const attr = (html, re) => (html.match(re) ?? [])[1];
const homes = files.filter((f) => /^(?:[a-z]{2}(?:-[A-Za-z]{2,4})?\/)?index\.html$/.test(f))
  .filter((f) => !readFileSync(join(stage, f), 'utf8').includes('http-equiv="refresh"'));
const descriptions = new Map();
const report = [];

for (const file of homes) {
  const html = readFileSync(join(stage, file), 'utf8');
  const url = base + file.replace(/index\.html$/, '');
  const title = attr(html, /<title>([^<]*)<\/title>/);
  const description = attr(html, /<meta name="description" content="([^"]*)"/);
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g) ?? [];
  if (!title || [...title.replaceAll('&amp;', '&').replaceAll('&#39;', "'")].length > 60) fail(file, `title too long or missing (${title})`);
  if (!description) fail(file, 'no description');
  else if (descriptions.has(description)) fail(file, `same description as ${descriptions.get(description)}`);
  else descriptions.set(description, file);
  if (canonical !== url) fail(file, `canonical ${canonical} is not ${url}`);
  if (h1.length !== 1) fail(file, `${h1.length} h1`);
  if (!html.includes(`hreflang="x-default" href="${base}"`)) fail(file, 'no x-default');
  if (attr(html, /<meta property="og:url" content="([^"]*)"/) !== url) fail(file, 'og:url differs from canonical');
  for (const p of ['og:title', 'og:description', 'og:image']) if (!html.includes(`property="${p}"`)) fail(file, `no ${p}`);
  const ld = attr(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  try {
    const graph = JSON.parse(ld)['@graph'];
    const appNode = graph.find((n) => n['@type'] === 'SoftwareApplication');
    if (!appNode?.offers?.priceCurrency || appNode.offers.price === undefined) fail(file, 'SoftwareApplication without offer');
    if (!appNode?.operatingSystem) fail(file, 'no operatingSystem');
    if (!/apps\.apple\.com/.test(JSON.stringify(appNode?.sameAs))) fail(file, 'no store link in sameAs');
  } catch (error) { fail(file, `JSON-LD: ${error.message}`); }
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');
  const prose = text.replace(/\s—\s(?=\s*$)|>—</g, ' ');
  for (const banned of [/bientôt/i, /coming soon/i, /These are separate apps/i, /Read the full description/i]) {
    if (banned.test(prose)) fail(file, `banned text ${banned}`);
  }
  if ((text.match(/\u2014/g) ?? []).length > 1) fail(file, 'em dash in the copy');
  report.push({ file, title: title?.replaceAll('&#39;', "'"), titleLength: [...(title ?? '')].length, h1: h1[0]?.replace(/<[^>]+>/g, ''), bytes: Buffer.byteLength(html) });
}

// Local references: every href/src/srcset pointing inside the site must exist.
for (const file of files.filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(join(stage, file), 'utf8');
  const dir = file.includes('/') ? file.slice(0, file.lastIndexOf('/') + 1) : '';
  const refs = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((m) => m[1])
    .concat([...html.matchAll(/\bsrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((x) => x.trim().split(/\s+/)[0])));
  for (const ref of refs) {
    let path;
    if (ref.startsWith(base)) path = ref.slice(base.length);
    else if (/^(?:[a-z]+:|\/\/|#|\/)/i.test(ref)) continue;
    else path = new URL(ref, `https://x/${dir}`).pathname.slice(1);
    path = path.split(/[?#]/)[0];
    const candidates = [path, `${path}.html`, `${path}index.html`, `${path}/index.html`];
    if (!candidates.some((c) => c !== '' && existsSync(join(stage, c)) && statSync(join(stage, c)).isFile()) && path !== '') fail(file, `broken local reference ${ref}`);
  }
}

console.log(JSON.stringify({ stage, files: files.length, homes: report, errors }, null, 2));
process.exit(errors.length ? 1 : 0);
