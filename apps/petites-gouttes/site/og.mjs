#!/usr/bin/env node
// Social card source: node apps/petites-gouttes/site/og.mjs <en|fr> > card.html, served next to a built
// stage (it links ../petites-gouttes/assets/drawer/drawer.css), then screenshot at 1200x630 -> og-<loc>.jpg.
import { LOCALES, render } from './page.mjs';
const key = process.argv[2] === 'fr' ? 'fr' : 'en';
const html = render(LOCALES.find(l => l.key === key));
const drawer = html.match(/<figure class="drawer-fig">[\s\S]*?<\/figure>/)[0].replace(/<figcaption>[\s\S]*?<\/figcaption>/, '');
const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1];
process.stdout.write(`<!doctype html><html lang="${key}"><head><meta charset="utf-8"><link rel="stylesheet" href="/petites-gouttes/assets/drawer/drawer.css">
<style>body{width:1200px;height:630px;overflow:hidden;margin:0;display:grid;grid-template-columns:560px 1fr;gap:48px;align-items:center;padding:0 64px;box-sizing:border-box}
.og-brand{display:flex;align-items:center;gap:14px;font-weight:750;font-variation-settings:"CASL" .55;font-size:1.5rem;color:#102d3a;margin-bottom:26px}
.og-brand img{border-radius:14px}h1{font-size:3.15rem;margin:0}.drawer-fig{width:100%}.bag{height:250px}
.bag-write b{font-size:1.05rem}.bag-write i{font-size:.75rem}.bag-write small{font-size:.72rem}.next-tag{font-size:.85rem}.drawer-tape{font-size:1.05rem}
.bag-next,.next-tag{animation:none!important}</style></head>
<body><div><p class="og-brand"><img src="/petites-gouttes/assets/app-icon.png" width="56" height="56" alt="">Petites Gouttes</p><h1>${h1}</h1></div>${drawer}</body></html>`);
