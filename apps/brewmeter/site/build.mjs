// Overlay only BrewMeter landing pages; legal pages, guides, site.js and redirects are preserved.
import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { LOCALES, render } from './page.mjs';
const here = dirname(fileURLToPath(import.meta.url));
export function overlay(out) {
  if (!existsSync(join(out, 'fr-FR', 'privacy.html'))) throw new Error(`${out} is not a BrewMeter stage`);
  const dest = join(out, 'assets', 'roast');
  mkdirSync(dest, { recursive: true });
  for (const name of ['roast.css', 'fonts', 'badges']) cpSync(join(here, name), join(dest, name), { recursive: true });
  cpSync(join(here, 'media'), dest, { recursive: true });
  for (const lang of ['fr', 'en']) cpSync(join(here, `og-${lang}.jpg`), join(dest, `og-${lang}.jpg`));
  for (const loc of LOCALES) {
    mkdirSync(join(out, loc.dir), { recursive: true });
    writeFileSync(join(out, loc.dir, 'index.html'), render(loc));
  }
  return { app: 'BrewMeter', locales: LOCALES.length, out };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const arg = name => process.argv[process.argv.indexOf(name) + 1];
  const base = arg('--base'), out = arg('--out');
  if (!process.argv.includes('--base') || !process.argv.includes('--out')) throw new Error('usage: build.mjs --base <stage> --out <dir>');
  if (resolve(base) !== resolve(out)) cpSync(base, out, { recursive: true });
  console.log(JSON.stringify(overlay(out)));
}
