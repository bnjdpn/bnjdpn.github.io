#!/usr/bin/env node
// Social card source (1200x630): app icon, the page title and the real dashboard screen. Nothing drawn.
//   node apps/petites-gouttes/site/og.mjs <en|fr> > card.html, open it from this folder's parent, screenshot at 1200x630 -> og-<loc>.jpg.
import copy from './copy.mjs';
const key = process.argv[2] === 'fr' ? 'fr' : 'en';
const folder = key === 'fr' ? 'fr-FR' : 'en-US';
const here = new URL('.', import.meta.url).pathname;
const sub = key === 'fr' ? 'Sur iPhone et Android.' : 'On iPhone and Android.';
process.stdout.write(`<!doctype html><html lang="${key}"><meta charset="utf-8"><style>
@font-face{font-family:R;src:url(${here}fonts/recursive-latin-var.woff2);font-weight:400 800}
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#eef5f8;color:#102d3a;font-family:R}
.l{position:absolute;left:72px;top:0;bottom:0;width:640px;display:flex;flex-direction:column;justify-content:center}
.n{display:flex;align-items:center;gap:18px;font-weight:800;font-size:30px;margin-bottom:28px;font-variation-settings:"CASL" .55}.n img{width:72px;height:72px;border-radius:16px}
h1{font-weight:800;font-size:62px;line-height:1.02;margin:0;font-variation-settings:"CASL" .55}p{font-size:28px;margin:26px 0 0;color:#4a6470}
.s{position:absolute;right:72px;top:64px;width:380px;border-radius:34px 34px 0 0;overflow:hidden;box-shadow:0 0 0 1px #c9dbe2}.s img{width:100%;display:block}
</style><div class="l"><div class="n"><img src="${here}../../../assets/apps/petites-gouttes.png" alt="">Petites Gouttes</div><h1>${copy[key].h1}</h1><p>${sub}</p></div><div class="s"><img src="${here}media/${folder}/dashboard-880.webp" alt=""></div></html>`);
