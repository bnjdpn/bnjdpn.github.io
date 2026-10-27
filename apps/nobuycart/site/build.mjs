#!/usr/bin/env node
// Lays the NoBuyCart "counter slip" pages over a public/NoBuyCart stage.
// Privacy, support, en-US/index.html (redirect), badges and site.js stay as the stage has them.
// scripts/product-site/build.mjs calls overlay() after generating the stage.
import { cpSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { LOCALES, render } from './page.mjs';

const here = dirname(fileURLToPath(import.meta.url));

export function overlay(out) {
  if (!existsSync(join(out, 'en-US', 'privacy.html'))) throw new Error(`${out} is not a NoBuyCart stage`);
  const dest = join(out, 'assets', 'slip');
  mkdirSync(dest, { recursive: true });
  cpSync(join(here, 'slip.css'), join(dest, 'slip.css'));
  cpSync(join(here, 'fonts'), join(dest, 'fonts'), { recursive: true, filter: (f) => !f.endsWith('.txt') });
  cpSync(join(here, 'media'), dest, { recursive: true });
  for (const og of ['og-en.jpg', 'og-fr.jpg']) cpSync(join(here, og), join(dest, og));
  for (const loc of LOCALES) {
    mkdirSync(join(out, loc.dir), { recursive: true });
    writeFileSync(join(out, loc.dir, 'index.html'), render(loc));
  }
  return { app: 'NoBuyCart', locales: LOCALES.length, out };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const arg = (name) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
  const base = arg('--base');
  const out = arg('--out');
  if (!base || !out) { console.error('usage: build.mjs --base <public/NoBuyCart> --out <dir>'); process.exit(2); }
  if (resolve(base) !== resolve(out)) cpSync(base, out, { recursive: true });
  console.log(JSON.stringify(overlay(out)));
}
