#!/usr/bin/env node
// Lays the Petites Bouchées "place setting" pages over a public/petites-bouchees stage.
// Privacy, guides, en-US/index.html (redirect), badges and site.js stay as the stage has them.
// scripts/product-site/build.mjs calls overlay() after generating the stage;
// by hand: node apps/petites-bouchees/site/build.mjs --base <public/petites-bouchees> --out <dir>
import { cpSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { LOCALES, render } from './page.mjs';

const here = dirname(fileURLToPath(import.meta.url));

export function overlay(out) {
  const privacy = ['fr-FR/privacy.html', 'fr-FR/privacy/index.html'].find((path) => existsSync(join(out, path)));
  if (!privacy) throw new Error(`${out} is not a Petites Bouchées stage`);
  const dest = join(out, 'assets', 'spoon');
  mkdirSync(dest, { recursive: true });
  cpSync(join(here, 'spoon.css'), join(dest, 'spoon.css'));
  cpSync(join(here, 'fonts'), join(dest, 'fonts'), { recursive: true, filter: (file) => !file.endsWith('.txt') });
  cpSync(join(here, 'media'), dest, { recursive: true });
  for (const og of ['og-en.jpg', 'og-fr.jpg']) if (existsSync(join(here, og))) cpSync(join(here, og), join(dest, og));
  for (const loc of LOCALES) {
    mkdirSync(join(out, loc.dir), { recursive: true });
    writeFileSync(join(out, loc.dir, 'index.html'), render(loc));
  }
  return { app: 'Petites Bouchées', locales: LOCALES.length, out };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const arg = (name) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
  const base = arg('--base');
  const out = arg('--out');
  if (!base || !out) { console.error('usage: build.mjs --base <public/petites-bouchees> --out <dir>'); process.exit(2); }
  if (resolve(base) !== resolve(out)) cpSync(base, out, { recursive: true });
  console.log(JSON.stringify(overlay(out)));
}
