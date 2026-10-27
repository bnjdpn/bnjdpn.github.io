// Social card template (1200x630): app icon, the page title and the real MIX screenshot. Nothing drawn.
//   node apps/temporeps/site/og.mjs fr > /tmp/og-fr.html, then screenshot at 1200x630 -> og-fr.jpg
import copy from './copy.mjs';
const key = process.argv[2] === 'fr' ? 'fr' : 'en';
const folder = key === 'fr' ? 'fr-FR' : 'en-US';
const t = copy[key];
const here = new URL('.', import.meta.url).pathname;
const sub = key === 'fr' ? 'Sur iPhone, Apple Watch et Android.' : 'On iPhone, Apple Watch and Android.';
process.stdout.write(`<!doctype html><html lang="${key}"><meta charset="utf-8"><style>
@font-face{font-family:A;font-weight:100 900;font-stretch:62% 125%;src:url(${here}fonts/archivo-latin-wdth-normal.woff2)}
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#151314;color:#f2ede7;font-family:A}
.l{position:absolute;left:72px;top:0;bottom:0;width:640px;display:flex;flex-direction:column;justify-content:center}
.n{display:flex;align-items:center;gap:18px;font-weight:800;font-stretch:112%;font-size:30px;margin-bottom:28px}.n img{width:72px;height:72px;border-radius:16px}
h1{font-weight:800;font-stretch:112%;font-size:62px;line-height:1.02;margin:0}p{font-size:28px;margin:26px 0 0;color:#b9afa6}
.s{position:absolute;right:72px;top:64px;width:380px;border-radius:34px 34px 0 0;overflow:hidden;box-shadow:0 0 0 1px rgba(242,237,231,.15)}.s img{width:100%;display:block}
</style><div class="l"><div class="n"><img src="${here}og-icon.png" alt="">TempoReps</div><h1>${t.h1}</h1><p>${sub}</p></div><div class="s"><img src="${here}media/${folder}/mix-880.webp" alt=""></div></html>`);
