import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { copy, app } from './copy.mjs';
import { UI, LOCALE_NAMES } from '../../../content/product-sites/ui.mjs';
import { googlePlayBadge } from '../../../scripts/product-site/google-play.mjs';
const read = file => readFileSync(new URL(file, import.meta.url), 'utf8');
const kept = JSON.parse(read('./preserved.json'));
export const LOCALES = JSON.parse(read('./locales.json')).map(({ code }) => ({ code, dir: code === 'en-US' ? '' : `${code}/`, key: code.split('-')[0] }));
const cssHash = createHash('sha256').update(read('./charge.css')).digest('hex').slice(0, 10);
const ORIGIN = 'https://bnjdpn.com/ColdLoad/';
const STORES = JSON.parse(read('./stores.json'));
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export function render(loc) {
 const { code, dir, key } = loc, t = copy(code), u = UI[code] ?? UI[key], p = dir ? '../' : '', prev = kept[code];
 const play = googlePlayBadge(code), self = ORIGIN + dir, APPLE = STORES[code];
 const ogLocale = u.ogLocale.replace(/_.*/, '') + '_' + (code.split('-')[1] ?? u.ogLocale.split('_')[1]);
 const stores = `<div class="cl-stores"><a href="${APPLE}" rel="external"><img src="${p}assets/charge/badges/${code}.svg" width="150" height="50" alt="${esc(u.badgeAlt)}"></a><a href="${app.playUrl}" rel="external"><img src="${play.src}" width="${play.width}" height="${play.height}" alt="${esc(play.alt)}"></a></div>`;
 const shot = (n, eager = false) => `<figure class="cl-screen cl-screen-${n}"><picture><source type="image/avif" srcset="${p}assets/charge/${code}/0${n}-440.avif 440w, ${p}assets/charge/${code}/0${n}-880.avif 880w" sizes="(min-width: 900px) 340px, 82vw"><img src="${p}assets/charge/${code}/0${n}-440.webp" srcset="${p}assets/charge/${code}/0${n}-440.webp 440w, ${p}assets/charge/${code}/0${n}-880.webp 880w" sizes="(min-width: 900px) 340px, 82vw" width="440" height="956" alt="${esc(t.alts[n-1])}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture></figure>`;
 const item = ([title, text]) => `<div class="cl-detail"><h3>${esc(title)}</h3><p>${esc(text)}</p></div>`;
 const load = t.sections.load, eq = t.sections.equipment, offer = t.sections.offer;
 const langs = LOCALES.map(l => `<a href="${ORIGIN}${l.dir}" lang="${l.code}" hreflang="${l.code}"${l.code === code ? ' aria-current="page"' : ''}>${esc(LOCALE_NAMES[l.code] ?? l.code)}</a>`).join('');
 const og = `${ORIGIN}assets/charge/og-${key === 'fr' ? 'fr' : 'en'}.jpg`;
 const ld = { '@context':'https://schema.org', '@graph':[{ '@type':'SoftwareApplication',name:'ColdLoad',description:t.description,url:ORIGIN,image:og,applicationCategory:app.applicationCategory,operatingSystem:app.operatingSystem,offers:{'@type':'Offer',price:'0',priceCurrency:app.currency[code]},sameAs:[APPLE,app.playUrl],installUrl:[APPLE,app.playUrl],author:{'@type':'Person',name:'Benjamin Dupin',url:'https://bnjdpn.com/'} },{'@type':'WebPage',url:self,name:t.title,inLanguage:code}] };
 const html = `<!doctype html><html lang="${code}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title><meta name="description" content="${esc(t.description)}"><meta name="theme-color" content="#040507"><meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${self}">${LOCALES.map(l => `<link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${l.dir}">`).join('')}<link rel="alternate" hreflang="x-default" href="${ORIGIN}">
<link rel="icon" href="${p}assets/app-icon.png"><link rel="apple-touch-icon" href="${p}assets/app-icon-512.png"><link rel="manifest" href="${p}site.webmanifest"><meta name="apple-itunes-app" content="app-id=6785921799">
<link rel="preload" href="${p}assets/charge/fonts/teko-latin-600.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${p}assets/charge/charge.css?v=${cssHash}">
<meta property="og:type" content="website"><meta property="og:site_name" content="ColdLoad"><meta property="og:locale" content="${ogLocale}"><meta property="og:title" content="${esc(t.title)}"><meta property="og:description" content="${esc(t.description)}"><meta property="og:url" content="${self}"><meta property="og:image" content="${og}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="ColdLoad"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${og}">
<script type="application/ld+json">${JSON.stringify(ld).replaceAll('<','\\u003c')}</script></head><body>
<a class="skip" href="#main">${esc(u.skip)}</a>
<header class="cl-header"><a class="cl-brand" href="./"><img src="${p}assets/app-icon.png" width="36" height="36" alt="">ColdLoad</a><nav class="cl-nav" aria-label="${esc(u.navMain)}"><a href="#equipment">${esc(eq.nav)}</a><a href="#free-and-pro">Pro</a><a href="#contact">${esc(u.support)}</a></nav><details class="cl-languages"><summary>${esc(u.language)}</summary><nav aria-label="${esc(u.language)}">${langs}</nav></details></header>
<main id="main"><section class="cl-hero" aria-labelledby="hero-title"><div class="cl-pitch"><h1 id="hero-title">${esc(t.hero.h1)}</h1><p class="cl-intro">${esc(t.hero.intro)}</p>${stores}</div>${shot(1,true)}<p class="cl-note">${esc(t.hero.note)}</p></section>
<section class="cl-answer" id="features" aria-labelledby="features-title"><div><h2 id="features-title">${esc(load.title)}</h2><p>${esc(load.items[0][1])}</p></div><p class="cl-equation"><strong>25 + 5 kg</strong><span>${esc(load.items[0][0])}</span></p></section>
<section class="cl-stock" aria-label="${esc(load.nav)}">${item(load.items[3])}${item(eq.items[3])}${app.guides[code] && t.hero.guide ? `<p><a class="cl-guide" href="${ORIGIN}${app.guides[code]}">${esc(t.hero.guide)}</a></p>` : ''}</section>
<section class="cl-equipment" id="equipment" aria-labelledby="equipment-title"><div class="cl-equipment-copy"><h2 id="equipment-title">${esc(eq.title)}</h2>${item(load.items[1])}${item(eq.items[0])}</div>${shot(2)}</section>
<section class="cl-reverse" aria-label="${esc(load.items[2][0])}"><div class="cl-reverse-copy">${item(load.items[2])}${item(eq.items[2])}${item(eq.items[1])}<p class="cl-note">${esc(eq.note)}</p></div>${shot(3)}</section>
<section class="cl-offer" id="free-and-pro" aria-labelledby="free-and-pro-title"><h2 id="free-and-pro-title">${esc(offer.title)}</h2><p class="cl-intro">${esc(offer.intro)}</p><div class="cl-plans">${offer.plans.map(plan => `<article><h3>${esc(plan.title)}</h3>${plan.price ? `<p>${esc(plan.price)}</p>` : ''}<ul>${plan.items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul></article>`).join('')}</div><p>${esc(offer.privacy)} <a href="${prev.privacy}">${esc(offer.privacyLink)}</a></p>${stores}</section>
<section class="cl-support" id="contact" aria-labelledby="contact-title"><h2 id="contact-title">${esc(t.supportTitle)}</h2><p>${esc(t.supportIntro)}</p>${prev.form}<p class="form-note">${esc(t.formNote)}</p></section></main>
<footer class="cl-footer"><p><strong>ColdLoad</strong> ${esc(t.footer)}</p>${prev.legalNav}<p><a href="https://bnjdpn.com/">${esc(u.moreApps)}</a></p><small>Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</small></footer>
<script>(function(){var done=false,f=document.querySelector('.support-form');function load(){if(done)return;done=true;var s=document.createElement('script');s.src='${p}assets/site.js';s.defer=true;document.head.appendChild(s)}if(window.location.hash==='#privacy')load();window.addEventListener('hashchange',function(){if(window.location.hash==='#privacy')load()});if(!('IntersectionObserver' in window))return load();var o=new IntersectionObserver(function(es){if(es.some(function(e){return e.isIntersecting})){o.disconnect();load()}},{rootMargin:'800px 0px'});o.observe(f);f.addEventListener('focusin',load)})()</script></body></html>`;
 const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]));
 return html.replace('<main id="main">', `<main id="main">${prev.ids.filter(id=>!ids.has(id)).map(id=>`<span class="cl-anchor" id="${esc(id)}" aria-hidden="true"></span>`).join('')}`);
}
