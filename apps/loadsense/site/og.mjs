// Social card template (1200x630). Rendered once with headless Chrome:
//   node apps/loadsense/site/og.mjs fr > /tmp/og-fr.html, then screenshot at 1200x630 -> og-fr.jpg
// Uses the real Today screenshot, never a generated UI.
import copy from './copy.mjs';
const key = process.argv[2] === 'fr' ? 'fr' : 'en';
const folder = key === 'fr' ? 'fr-FR' : 'en-US';
const t = copy[key];
const here = new URL('.', import.meta.url).pathname;
process.stdout.write(`<!doctype html><html lang="${key}"><meta charset="utf-8"><style>
@font-face{font-family:B;font-weight:800;src:url(${here}fonts/big-shoulders-display-latin-800-normal.woff2)}
@font-face{font-family:A;font-weight:400;src:url(${here}fonts/atkinson-hyperlegible-next-latin-400-normal.woff2)}
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#0f1c25;color:#e9f4f1}
.c{position:absolute;left:64px;top:22px;font:800 300px/.8 B;letter-spacing:-2px;white-space:nowrap}
.c b{color:#52d4c2;font-weight:800}.c i{color:#c3dda5;font-style:normal}.c u{color:#568cc5;text-decoration:none}
h1{position:absolute;left:68px;top:330px;width:640px;margin:0;font:800 64px/.95 B}
p{position:absolute;left:68px;bottom:44px;margin:0;font:400 24px/1.3 A;color:#b7cbc9}
img{position:absolute;right:70px;top:46px;width:300px;border-radius:30px;box-shadow:0 0 0 1px rgba(233,244,241,.15)}
</style><div class="c"><b>07</b><i>:</i><u>51</u></div><h1>${t.hero.h1}</h1><p>LoadSense, iPhone &amp; Apple Watch</p><img src="${here}media/${folder}/today-880.webp" alt=""></html>`);
