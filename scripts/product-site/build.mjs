#!/usr/bin/env node
// Builds the static site of one app for bnjdpn.com/<App>/.
//
//   node scripts/product-site/build.mjs --repo <app repo> --out <stage dir>
//
// Reads from the app repository, without changing it:
//   marketing/site.json      locales, URLs, screenshots, theme, assets to copy
//   marketing/*.css, site.js the app theme and the page script
//   marketing/legal, guides  copied as they are (legal pages get noindex)
//   fastlane/metadata/*/name.txt  the App Store name of each locale
// Page copy comes from content/product-sites/<App>.mjs in this repository.
//
// Pages the Ruby generator built and this one does not render yet (guides,
// extra locale folders) are listed in the app's `carry` patterns and copied
// unchanged from the previous stage given with --ruby-stage.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderHome } from './render-home.mjs';
import { LOCALE_NAMES, UI } from '../../content/product-sites/ui.mjs';
import {
  TEXT_EXTENSIONS, cleanUrls, imageSize, isLegalPath, noindexLegal, primaryRedirect, robotsTxt, sitemapXml, webManifest,
} from './stage-common.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const [key, inline] = argv[i].replace(/^--/, '').split('=');
    args[key] = inline ?? argv[++i];
  }
  if (!args.repo || !args.out) throw new Error('Usage: build.mjs --repo <app repo> --out <stage dir> [--ruby-stage <dir>]');
  return { repo: resolve(args.repo), out: resolve(args.out), rubyStage: args['ruby-stage'] ? resolve(args['ruby-stage']) : null };
}

function listFiles(root) {
  const out = [];
  const visit = (dir) => readdirSync(dir).forEach((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) visit(path); else out.push(relative(root, path));
  });
  visit(root);
  return out;
}

function storeNames(repo, cfg) {
  const names = {};
  for (const { code } of cfg.locales) {
    const file = ['fastlane/metadata', 'ios/fastlane/metadata'].map((dir) => join(repo, dir, code, 'name.txt')).find(existsSync);
    if (file) names[code] = readFileSync(file, 'utf8').trim();
  }
  return names;
}

export async function build({ repo, out, rubyStage }) {
  // Échappée has no marketing/site.json: its existing _pages scene is the base.
  if (basename(repo) === 'Echappee') {
    const base = rubyStage ?? join(repo, '_pages');
    if (resolve(base) === resolve(out)) throw new Error('Use a separate Échappée candidate directory');
    cpSync(base, out, { recursive: true });
    const { overlay } = await import(pathToFileURL(join(ROOT, 'apps/echappee/site/build.mjs')).href);
    return overlay(out);
  }
  // Catalogue-only apps can own a site without a marketing directory in the app repo.
  if (basename(repo) === 'petits-pots') {
    const { overlay } = await import('../../apps/petits-pots/site/build.mjs');
    return overlay(out);
  }
  const cfg = JSON.parse(readFileSync(join(repo, 'marketing/site.json'), 'utf8'));
  cfg.app_name ??= cfg.app?.name;
  const app = (await import(pathToFileURL(join(ROOT, 'content/product-sites', `${basename(repo)}.mjs`)).href)).default;
  app.storeNames = { ...storeNames(repo, cfg), ...(app.storeNames ?? {}) };

  const files = new Map();
  const put = (path, data) => {
    if (files.has(path)) throw new Error(`Duplicate output ${path}`);
    files.set(path, data);
  };
  const fromRepo = (path) => readFileSync(join(repo, path));

  for (const asset of cfg.local_assets) {
    const data = fromRepo(asset.source);
    put(asset.path, isLegalPath(asset.path) ? noindexLegal(data.toString('utf8')) : data);
  }
  for (const name of ['base.css', 'theme.css', 'site.js']) put(`assets/${name}`, fromRepo(`marketing/${name}`));
  put('assets/app-icon.png', fromRepo(cfg.web_icon_path));
  put('assets/app-icon-512.png', fromRepo(cfg.web_icon_large_path));
  const review = 'docs/review/foreground-service-code10.mp4';
  if (existsSync(join(repo, review))) put('review/foreground-service-code10.mp4', fromRepo(review));

  if (!rubyStage) throw new Error('Pass --ruby-stage: the previous stage of this app');
  if (app.carry?.length) {
    const patterns = app.carry.map((p) => new RegExp(`^(?:${p})$`));
    for (const path of listFiles(rubyStage)) {
      if (patterns.some((re) => re.test(path))) put(path, readFileSync(join(rubyStage, path)));
    }
  }

  const images = {
    has: (path) => files.has(path),
    socialFor: (locale) => {
      const own = [...files.keys()].find((p) => p.startsWith(`assets/social-card-${locale}.`));
      return own ?? cfg.social_image_path;
    },
    size: (path) => imageSize(files.get(path)),
  };
  for (const { code } of cfg.locales) {
    const previousPath = join(rubyStage, code === cfg.primary_locale ? 'index.html' : `${code}/index.html`);
    const previous = existsSync(previousPath) ? readFileSync(previousPath, 'utf8') : null;
    const html = renderHome({ cfg, app, ui: UI, names: LOCALE_NAMES, locale: code, images, previous });
    if (code === cfg.primary_locale) {
      put('index.html', html);
      put(`${code}/index.html`, primaryRedirect(cfg, code));
    } else {
      put(`${code}/index.html`, html);
    }
  }
  put('sitemap.xml', sitemapXml(cfg, app.lastModified ?? cfg.seo_last_modified, readFileSync(join(rubyStage, 'sitemap.xml'), 'utf8')));
  put('robots.txt', robotsTxt(cfg));
  put('site.webmanifest', webManifest(cfg));
  put('.nojekyll', '');

  rmSync(out, { recursive: true, force: true });
  for (const [path, data] of [...files].sort(([a], [b]) => a.localeCompare(b))) {
    const target = join(out, path);
    mkdirSync(dirname(target), { recursive: true });
    const text = TEXT_EXTENSIONS.has(extname(path)) ? cleanUrls(Buffer.isBuffer(data) ? data.toString('utf8') : data) : data;
    writeFileSync(target, text);
  }
  // An app with its own art direction (apps/<app>/site/) lays its pages over the generated stage.
  // Repository slugs stay stable when the display name contains spaces (Petites Nuits).
  const own = join(ROOT, 'apps', basename(repo).toLowerCase(), 'site', 'build.mjs');
  if (existsSync(own)) (await import(pathToFileURL(own).href)).overlay(out);
  return { app: cfg.app_name, files: files.size, out };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  build(parseArgs(process.argv.slice(2)))
    .then((result) => console.log(JSON.stringify(result)))
    .catch((error) => { console.error(error.message); process.exit(1); });
}
