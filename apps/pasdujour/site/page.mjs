import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import copy from './copy.mjs';
import forms from './support.mjs';
export const LOCALES = [{code:'en-US',key:'en',dir:''},{code:'fr-FR',key:'fr',dir:'fr-FR/'}];
const ORIGIN='https://bnjdpn.com/PasDuJour/';
const version=createHash('sha256').update(readFileSync(new URL('./glance.css',import.meta.url))).digest('hex').slice(0,12);
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function render(loc, preserved={}) {
 const t=copy[loc.code], fr=loc.key==='fr', up=loc.dir?'../':'', base=up+'assets/glance/', self=ORIGIN+loc.dir;
 const store=`https://apps.apple.com/${fr?'fr':'us'}/app/id6795232703`;
 const badge=()=>`<a class="pd-download" href="${store}" rel="external"><img src="${up}assets/app-store-badges/${loc.code}.svg" width="${fr?152:144}" height="48" alt="${fr?'Télécharger dans l’App Store':'Download on the App Store'}"></a>`;
 const shot=(name,hero=false)=>`<picture class="pd-screen"><source srcset="${base}${loc.code}/${name}.avif" type="image/avif"><img src="${base}${loc.code}/${name}.webp" width="422" height="514" alt="${e(t.alts[name])}" ${hero?'fetchpriority="high"':'loading="lazy"'} decoding="async"></picture>`;
 const privacy=`${ORIGIN}privacy`;
 const graph={'@context':'https://schema.org','@type':'SoftwareApplication',name:'Pas du Jour',description:t.description,url:self,image:ORIGIN+`assets/glance/og-${loc.key}.jpg`,applicationCategory:'HealthApplication',operatingSystem:'watchOS 26.0 or later',offers:{'@type':'Offer',price:'0',priceCurrency:fr?'EUR':'USD'},author:{'@type':'Person',name:'Benjamin Dupin'},installUrl:store};
 let html=`<!doctype html>
<html lang="${loc.code}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.title)}</title><meta name="description" content="${e(t.description)}"><meta name="theme-color" content="#101818">
<link rel="canonical" href="${self}">${LOCALES.map(l=>`<link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${l.dir}"><link rel="alternate" hreflang="${l.key}" href="${ORIGIN}${l.dir}">`).join('')}<link rel="alternate" hreflang="x-default" href="${ORIGIN}">
<meta name="apple-itunes-app" content="app-id=6795232703"><link rel="icon" href="${up}assets/app-icon.png"><link rel="apple-touch-icon" href="${up}assets/app-icon-512.png"><link rel="manifest" href="${up}site.webmanifest">
<link rel="preload" href="${base}fonts/chakra-petch-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${base}glance.css?v=${version}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Pas du Jour"><meta property="og:locale" content="${fr?'fr_FR':'en_US'}"><meta property="og:locale:alternate" content="${fr?'en_US':'fr_FR'}"><meta property="og:title" content="${e(t.title)}"><meta property="og:description" content="${e(t.description)}"><meta property="og:url" content="${self}"><meta property="og:image" content="${ORIGIN}assets/glance/og-${loc.key}.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${e(t.h1)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${ORIGIN}assets/glance/og-${loc.key}.jpg"><script type="application/ld+json">${JSON.stringify(graph)}</script></head>
<body id="top"><a class="pd-skip" href="#main">${t.skip}</a>
<header class="pd-mast"><a class="pd-brand" href="${self}"><img src="${up}assets/app-icon.png" width="32" height="32" alt="">Pas du Jour</a><nav class="pd-nav" aria-label="${fr?'Navigation principale':'Main navigation'}"><a href="#features">${t.nav[0]}</a><a href="#installer-complication-pas">${t.nav[1]}</a><a href="#contact">${t.nav[2]}</a></nav><nav class="pd-language" aria-label="${t.language}">${LOCALES.map(l=>`<a href="${ORIGIN}${l.dir}" lang="${l.code}" hreflang="${l.code}" ${l.code===loc.code?'aria-current="page"':''}>${l.key.toUpperCase()}</a>`).join('')}</nav></header>
<main id="main"><section class="pd-opening" aria-labelledby="hero-title"><div class="pd-pitch"><h1 id="hero-title">${t.h1}</h1><p class="pd-lead">${t.lead}</p>${badge()}<p class="pd-small">${t.free}</p></div><div class="pd-today">${shot('home-goal',true)}<p class="pd-caption">${t.today}</p></div></section>
<section class="pd-styles" id="features" aria-labelledby="features-title"><div class="pd-section-copy"><h2 id="features-title">${t.stylesTitle}</h2><p>${t.stylesBody}</p><p>${t.todayBody}</p><a href="#installer-complication-pas">${t.sections.install.title}</a></div><div class="pd-pair">${shot('gallery')}${shot('gallery-families')}</div></section>
<section class="pd-week" aria-labelledby="week-title"><div class="pd-section-copy"><h2 id="week-title">${t.weekTitle}</h2><p>${t.weekBody}</p></div>${shot('history')}</section>
<section class="pd-setup" id="installer-complication-pas" aria-labelledby="setup-title"><h2 id="setup-title">${t.installTitle}</h2><ol class="pd-instructions">${t.sections.install.items.map(([a,b])=>`<li><h3>${e(a.replace(/^\d+\. /,''))}</h3><p>${e(b)}</p></li>`).join('')}</ol><p class="pd-small">${e(t.sections.install.note)}</p></section>
<section class="pd-pro" id="free-and-pro" aria-labelledby="pro-title"><div class="pd-section-copy"><h2 id="pro-title">${t.proTitle}</h2><p>${t.proBody}</p><p>${t.privacyBody} <a href="${privacy}">${t.privacyLabel}</a></p><p class="pd-small">${e(t.sections.free.note)}</p></div>${shot('pro-editor')}</section>
<section class="pd-finish"><h2>${t.finalTitle}</h2>${badge()}<p class="pd-small">${t.availability}. ${t.free}</p></section>
<section class="pd-relations" id="more-apps"><h2 id="more-apps-title">${e(t.relatedTitle)}</h2><a href="https://bnjdpn.com/LoadSense/${loc.dir}">LoadSense</a><a href="https://bnjdpn.com/TempoReps/${loc.dir}">TempoReps</a></section>
<section class="pd-support" id="contact" aria-labelledby="contact-title"><div><h2 id="contact-title">${e(t.supportTitle)}</h2><p>${e(t.supportIntro)}</p></div><div>${preserved.form||forms[loc.code]}<p class="pd-small">${e(t.formNote)}</p></div></section></main>
<footer class="pd-foot"><p>Pas du Jour. ${e(t.footer)}</p><nav aria-label="${fr?'Liens utiles':'Useful links'}"><a href="${privacy}">${t.privacyLabel}</a><a href="#contact">${t.nav[2]}</a><a href="https://bnjdpn.com/${fr?'fr/':''}">${t.portfolio}</a></nav><small>Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc.</small></footer>
<script>(function(){var d=0,f=document.querySelector('.support-form');function l(){if(d)return;d=1;var e=document.createElement('script');e.src='${up}assets/site.js';e.onload=function(){f.dataset.ready='true'};document.head.appendChild(e)}if(!f)return;if(!('IntersectionObserver' in window))return l();var o=new IntersectionObserver(function(x){if(x.some(function(y){return y.isIntersecting})){o.disconnect();l()}},{rootMargin:'800px 0px'});o.observe(f);f.addEventListener('focusin',l)})()</script></body></html>`;
 const aliases=['step-title','detail-title','more-title','step-contact-title','hero','free','install','offer',...(preserved.ids||[])];
 const ids=new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]));
 const missing=[...new Set(aliases)].filter(id=>!ids.has(id));
 return html.replace('<main id="main">',`<main id="main">${missing.map(id=>`<span class="pd-anchor" id="${e(id)}" aria-hidden="true"></span>`).join('')}`);
}
