#!/usr/bin/env node
// Social card (1200×630). Rendered once with headless WebKit:
//   node apps/fastzen/site/og.mjs fr > /tmp/og-fr.html
//   then a 1200×630 screenshot, saved as og-fr.jpg (og-en.jpg for en).
// The phone is the real App Store home screen. No drawn dial, arc or frame.
import copy from './copy.mjs';
const key = process.argv[2] === 'fr' ? 'fr' : 'en';
const folder = key === 'fr' ? 'fr-FR' : 'en-US';
const t = copy[key];
const here = new URL('.', import.meta.url).pathname;
process.stdout.write(`<!doctype html><html lang="${key}"><meta charset="utf-8"><style>
@font-face{font-family:F;font-weight:400 700;src:url(${here}fonts/fraunces-latin-wght-normal.woff2) format("woff2")}
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#0f1311;color:#f2efe8;font-family:F,Palatino,serif}
.brand{position:absolute;left:72px;top:64px;margin:0;font-weight:650;font-size:28px;letter-spacing:.01em}
.time{position:absolute;left:68px;top:160px;margin:0;font-weight:620;font-size:112px;letter-spacing:-1.5px;line-height:.9}
.word{position:absolute;left:76px;top:292px;margin:0;color:#8fa897;font-size:28px}
h1{position:absolute;left:72px;top:380px;width:620px;margin:0;font-weight:560;font-size:44px;line-height:1.15}
img.phone{position:absolute;right:64px;top:24px;width:252px;height:auto}
</style>
<p class="brand">FastZen</p>
<p class="time">${t.dial.elapsed}</p>
<p class="word">${t.dial.word}</p>
<h1>${t.h1}</h1>
<img class="phone" src="${here}media/${folder}/home-880.webp" alt="">
</html>`);
