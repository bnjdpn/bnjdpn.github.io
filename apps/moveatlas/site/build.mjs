#!/usr/bin/env node
// Lays the MoveAtlas "machine plate" pages over a public/MoveAtlas stage.
// Privacy, support, guides, en-US/index.html (redirect), badges and site.js stay as the stage has them.
// scripts/product-site/build.mjs calls overlay() after generating the MoveAtlas stage;
// by hand: node apps/moveatlas/site/build.mjs --base <public/MoveAtlas> --out <dir> (base may equal out).
import { cpSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { LOCALES, render } from './page.mjs';

const here = dirname(fileURLToPath(import.meta.url));

export function overlay(out) {
  if (!existsSync(join(out, 'en-US', 'privacy.html')) && !existsSync(join(out, 'fr-FR', 'privacy.html'))) {
    throw new Error(`${out} is not a MoveAtlas stage`);
  }
  const dest = join(out, 'assets', 'plate');
  mkdirSync(dest, { recursive: true });
  cpSync(join(here, 'plate.css'), join(dest, 'plate.css'));
  cpSync(join(here, 'fonts'), join(dest, 'fonts'), { recursive: true, filter: f => !f.endsWith('.txt') });
  cpSync(join(here, 'media'), dest, { recursive: true });
  // Official white App Store badges: the stage ships the black artwork, which disappears on this steel page.
  const badges = join(out, 'assets', 'app-store-badges');
  mkdirSync(badges, { recursive: true });
  cpSync(join(here, 'badges'), badges, { recursive: true });
  for (const og of ['og-en.jpg', 'og-fr.jpg']) if (existsSync(join(here, og))) cpSync(join(here, og), join(dest, og));
  for (const loc of LOCALES) {
    mkdirSync(join(out, loc.dir), { recursive: true });
    writeFileSync(join(out, loc.dir, 'index.html'), render(loc));
  }
  return { app: 'MoveAtlas', locales: LOCALES.length, out };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const arg = name => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
  const base = arg('--base');
  const out = arg('--out');
  if (!base || !out) { console.error('usage: build.mjs --base <public/MoveAtlas> --out <dir>'); process.exit(2); }
  if (resolve(base) !== resolve(out)) cpSync(base, out, { recursive: true });
  console.log(JSON.stringify(overlay(out)));
}
