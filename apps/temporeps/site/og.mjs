// Social card template (1200x630), rendered once with headless Chrome:
//   node apps/temporeps/site/og.mjs fr > /tmp/og-fr.html, then screenshot at 1200x630 -> og-fr.jpg
// Uses the real MIX screenshot, never a generated UI.
import copy from './copy.mjs';
import product from '../../../content/product-sites/TempoReps.mjs';
const key = process.argv[2] === 'fr' ? 'fr' : 'en';
const folder = key === 'fr' ? 'fr-FR' : 'en-US';
const t = copy[key];
const M = product.locales[key].sections.modes.items;
const here = new URL('.', import.meta.url).pathname;
const rows = [[M[2][0], t.board.tabata, '#d36c50'], [M[1][0], t.board.emom, '#f5772b'], [M[3][0], t.board.amrap, '#5a82c0'], [M[6][0], t.board.rest, '#d9ab63']];
process.stdout.write(`<!doctype html><html lang="${key}"><meta charset="utf-8"><style>
@font-face{font-family:A;font-weight:100 900;font-stretch:62% 125%;src:url(${here}fonts/archivo-latin-wdth-normal.woff2)}
@font-face{font-family:M;font-weight:100 800;src:url(${here}fonts/martian-mono-latin-wght-normal.woff2)}
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#151314;color:#f2ede7;font-family:A}
h1{position:absolute;left:64px;top:52px;width:560px;margin:0;font-weight:800;font-stretch:112%;font-size:54px;line-height:.98;letter-spacing:-.5px}
.b{position:absolute;left:64px;bottom:56px;width:520px;background:#1f1b1d;border:1px solid #3a3436;border-radius:14px;padding:10px 20px}
.r{display:flex;justify-content:space-between;align-items:baseline;padding:10px 0 10px 16px;border-bottom:1px dashed #3a3436;position:relative}
.r:last-child{border:0}.r i{position:absolute;left:0;top:10px;bottom:10px;width:5px;border-radius:3px}
.r b{font-weight:800;font-stretch:120%;font-size:28px}.r span{font:500 20px M}
img{position:absolute;right:300px;top:40px;width:250px;border-radius:30px;box-shadow:0 0 0 1px rgba(242,237,231,.15)}
.ic{position:absolute;right:64px;top:52px;width:150px;border-radius:34px;box-shadow:none}
.n{position:absolute;right:64px;top:222px;width:170px;font-weight:800;font-stretch:118%;font-size:30px;line-height:1.05}
</style><h1>${t.h1}</h1><div class="b">${rows.map(([n, d, c]) => `<div class="r"><i style="background:${c}"></i><b>${n}</b><span>${d}</span></div>`).join('')}</div><img src="${here}media/${folder}/mix-880.webp" alt=""><img class="ic" src="${here}og-icon.png" alt=""><p class="n">TempoReps</p></html>`);
