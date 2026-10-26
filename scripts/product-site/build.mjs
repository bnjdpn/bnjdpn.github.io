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
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderHome } from './render-home.mjs';
import { LOCALE_NAMES, UI } from '../../content/product-sites/ui.mjs';
import {
  TEXT_EXTENSIONS, cleanUrls, isLegalPath, noindexLegal, primaryRedirect, robotsTxt, sitemapXml, webManifest,
} from './stage-common.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const [key, inline] = argv[i].replace(/^--/, '').split('=');
    args[key] = inline ?? argv[++i];
  }
  if (!args.repo || !args.out) throw new Error('Usage: build.mjs --repo <app repo> --out <stage dir>');
  return { repo: resolve(args.repo), out: resolve(args.out) };
}

function storeNames(repo, cfg) {
  const names = {};
  for (const { code } of cfg.locales) {
    const file = join(repo, 'fastlane/metadata', code, 'name.txt');
    if (existsSync(file)) names[code] = readFileSync(file, 'utf8').trim();
  }
  return names;
}

export async function build({ repo, out }) {
  const cfg = JSON.parse(readFileSync(join(repo, 'marketing/site.json'), 'utf8'));
  cfg.app_name ??= cfg.app?.name;
  const app = (await import(pathToFileURL(join(ROOT, 'content/product-sites', `${cfg.app_name}.mjs`)).href)).default;
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

  for (const { code } of cfg.locales) {
    const html = renderHome({ cfg, app, ui: UI, names: LOCALE_NAMES, locale: code });
    if (code === cfg.primary_locale) {
      put('index.html', html);
      put(`${code}/index.html`, primaryRedirect(cfg, code));
    } else {
      put(`${code}/index.html`, html);
    }
  }
  put('sitemap.xml', sitemapXml(cfg, app.lastModified ?? cfg.seo_last_modified));
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
  return { app: cfg.app_name, files: files.size, out };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  build(parseArgs(process.argv.slice(2)))
    .then((result) => console.log(JSON.stringify(result)))
    .catch((error) => { console.error(error.message); process.exit(1); });
}
