import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import copy from './copy.mjs';
export const ORIGIN='https://bnjdpn.com/petits-pots/';
export const PLAY='https://play.google.com/store/apps/details?id=com.bnjdpn.petitspots';
export const LOCALES=[{code:'en-US',key:'en',dir:'',og:'en_US'},{code:'fr-FR',key:'fr',dir:'fr-FR/',og:'fr_FR'}];
const version=createHash('sha256').update(readFileSync(new URL('./pantry.css',import.meta.url))).digest('hex').slice(0,10);
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function render(loc){
 const t=copy[loc.code],asset='/petits-pots/assets/pantry/',self=ORIGIN+loc.dir,legacy=(loc.key==='fr'?'/fr':'')+'/apps/petits-pots/';
 const shot=(name,alt,hero=false,cap='')=>`<figure class="pp-shot${hero?' pp-stock-shot':''}"><picture><source type="image/avif" srcset="${asset}${loc.code}/${name}-400.avif 400w, ${asset}${loc.code}/${name}-800.avif 800w" sizes="(min-width:760px) ${hero?'350':'320'}px, 88vw"><img src="${asset}${loc.code}/${name}-800.webp" srcset="${asset}${loc.code}/${name}-400.webp 400w, ${asset}${loc.code}/${name}-800.webp 800w" sizes="(min-width:760px) ${hero?'350':'320'}px, 88vw" width="800" height="1422" alt="${esc(alt)}" ${hero?'fetchpriority="high"':'loading="lazy"'} decoding="async"></picture>${cap?`<figcaption>${esc(cap)}</figcaption>`:''}</figure>`;
 const badge=`<a class="pp-badge" href="${PLAY}" rel="external"><img src="${asset}badges/${loc.key}.webp" width="162" height="48" alt="${esc(t.badge)}"></a>`;
 const graph={'@context':'https://schema.org','@type':'SoftwareApplication',name:'Petits Pots',description:t.description,applicationCategory:'LifestyleApplication',operatingSystem:'Android',url:self,inLanguage:['fr','en'],image:asset.startsWith('/')?'https://bnjdpn.com'+asset+'og-'+loc.key+'.jpg':'',installUrl:PLAY,author:{'@type':'Person',name:'Benjamin Dupin',url:'https://bnjdpn.com/'}};
 return `<!doctype html>
<html lang="${loc.key}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title><meta name="description" content="${esc(t.description)}"><meta name="theme-color" content="#D8E7DA">
<link rel="canonical" href="${self}">${LOCALES.map(l=>`<link rel="alternate" hreflang="${l.key}" href="${ORIGIN}${l.dir}">`).join('')}<link rel="alternate" hreflang="x-default" href="${ORIGIN}">
<link rel="icon" href="${asset}icon.png"><link rel="apple-touch-icon" href="${asset}icon.png">
<link rel="preload" href="${asset}fonts/bree-serif-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset}pantry.css?v=${version}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Petits Pots"><meta property="og:locale" content="${loc.og}"><meta property="og:locale:alternate" content="${loc.key==='fr'?'en_US':'fr_FR'}"><meta property="og:title" content="${esc(t.title)}"><meta property="og:description" content="${esc(t.description)}"><meta property="og:url" content="${self}"><meta property="og:image" content="https://bnjdpn.com${asset}og-${loc.key}.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(t.h1)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(t.title)}"><meta name="twitter:description" content="${esc(t.description)}"><meta name="twitter:image" content="https://bnjdpn.com${asset}og-${loc.key}.jpg"><meta name="twitter:image:alt" content="${esc(t.h1)}">
<script type="application/ld+json">${JSON.stringify(graph).replaceAll('<','\\u003c')}</script></head>
<body id="top"><a class="pp-skip" href="#main">${esc(t.skip)}</a>
<header class="pp-bar"><a class="pp-brand" href="${loc.dir?'/petits-pots/fr-FR/':'/petits-pots/'}"><img src="${asset}icon.png" width="36" height="36" alt="">Petits Pots</a><nav class="pp-nav" aria-label="${loc.key==='fr'?'Navigation principale':'Main navigation'}"><a href="#menus">${t.nav[0]}</a><a href="#free-and-pro">${t.nav[1]}</a><a href="#contact">${t.nav[2]}</a></nav><nav class="pp-langs" aria-label="${t.lang}">${LOCALES.map(l=>`<a href="/petits-pots/${l.dir}" lang="${l.key}" hreflang="${l.key}"${l.key===loc.key?' aria-current="page"':''}>${l.key.toUpperCase()}</a>`).join('')}</nav></header>
<main id="main">
<section class="pp-hero" aria-labelledby="pp-title"><h1 id="pp-title">${esc(t.h1)}</h1><div class="pp-pitch"><p class="pp-intro">${esc(t.intro)}</p>${badge}<p class="pp-small">${esc(t.note)}</p></div>${shot('stock',t.stockAlt,true)}<div class="pp-side"><h2>${esc(t.aside)}</h2><p>${esc(t.asideBody)}</p></div></section>
<section class="pp-lots" id="stock"><div class="pp-lot-text"><h2>${esc(t.lotTitle)}</h2><p>${esc(t.lotBody)}</p><p>${esc(t.lotMore)}</p><div class="pp-prepared"><h3>${esc(t.preparedTitle)}</h3><p>${esc(t.preparedBody)}</p></div></div>${shot('carrot',t.carrotAlt)}</section>
<section class="pp-menu" id="menus"><div class="pp-menu-copy"><h2>${esc(t.menuTitle)}</h2><p>${esc(t.menuBody)}</p><p>${esc(t.menuMore)}</p></div>${shot('menus',t.menuAlt,false,t.menuCap)}</section>
<section class="pp-shop" id="shopping"><div class="pp-shop-copy"><h2>${esc(t.shoppingTitle)}</h2><p>${esc(t.shoppingBody)}</p></div>${shot('shopping',t.shoppingAlt)}</section>
<section class="pp-offer" id="free-and-pro"><h2>${esc(t.offerTitle)}</h2><div class="pp-plans"><div class="pp-free"><h3>${esc(t.freeTitle)}</h3><p>${esc(t.freeBody)}</p></div><div class="pp-pro"><h3>${esc(t.proTitle)}</h3><p>${esc(t.proBody)}</p></div></div><p>${esc(t.purchase)}</p></section>
<section class="pp-local"><h2>${esc(t.localTitle)}</h2><p>${esc(t.localBody)}</p></section>
<section class="pp-faq"><h2>${esc(t.faqTitle)}</h2><div class="pp-questions">${t.questions.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></section>
<section class="pp-last"><h2>${esc(t.end)}</h2>${badge}</section>
</main><footer class="pp-footer" id="contact"><div class="pp-help"><h2>${esc(t.help)}</h2><p>${esc(t.helpBody)}</p></div><nav class="pp-footer-links" aria-label="${loc.key==='fr'?'Assistance et confidentialité':'Support and privacy'}"><a href="${legacy}support/">${esc(t.support)}</a><a href="${loc.key==='fr'?'/fr':''}/contact/?app=petits-pots">${esc(t.contact)}</a><a href="${legacy}privacy/">${esc(t.privacy)}</a></nav><div class="pp-credit"><p>${esc(t.by)} <a href="${loc.key==='fr'?'/fr/':'/'}">Benjamin Dupin</a></p><a href="#top">${esc(t.back)}</a></div><p class="pp-legal">Google Play ${loc.key==='fr'?'et le logo Google Play sont des marques de Google LLC.':'and the Google Play logo are trademarks of Google LLC.'}</p></footer></body></html>\n`;
}
