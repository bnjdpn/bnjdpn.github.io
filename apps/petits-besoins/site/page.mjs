import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import copy from './copy.mjs';

export const LOCALES = [
 {code:'en', key:'en', media:'en-US', dir:''},
 {code:'fr', key:'fr', media:'fr-FR', dir:'fr-FR/'}
];
export const ORIGIN = 'https://bnjdpn.com/petits-besoins/';
export const APP_STORE = 'https://apps.apple.com/fr/app/id6820659968';
export const PLAY = 'https://play.google.com/store/apps/details?id=com.bnjdpn.petitsbesoins';
const version = createHash('sha256').update(readFileSync(new URL('./relais.css',import.meta.url))).digest('hex').slice(0,12);
const base = '/petits-besoins/assets/';
const esc = x => String(x).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function screen(loc,name,alt,eager=false) {
 const path = base + 'media/' + loc.media + '/' + name;
 return `<picture><source type="image/avif" srcset="${path}-440.avif 440w, ${path}-880.avif 880w" sizes="(min-width: 900px) 360px, 78vw"><img src="${path}-880.webp" srcset="${path}-440.webp 440w, ${path}-880.webp 880w" sizes="(min-width: 900px) 360px, 78vw" width="880" height="1956" alt="${esc(alt)}" ${eager?'fetchpriority="high"':'loading="lazy"'} decoding="async"></picture>`;
}
export function render(loc) {
 const t=copy[loc.key], self=ORIGIN+loc.dir;
 const old=`${loc.key==='fr'?'/fr':''}/apps/petits-besoins/`;
 const contact=`${loc.key==='fr'?'/fr':''}/contact/?app=petits-besoins`;
 const apple=loc.key==='fr'?APP_STORE:'https://apps.apple.com/app/id6820659968';
 const stores=()=>`<div class="pb-stores"><a href="${apple}"><img src="${base}badges/${loc.key}.svg" width="144" height="48" alt="${esc(t.apple)}"></a><a href="${PLAY}"><img src="${base}badges/play-${loc.key}.webp" width="162" height="48" alt="${esc(t.play)}"></a></div>`;
 const og=`${ORIGIN}assets/og-${loc.key}.jpg`;
 const schema={'@context':'https://schema.org','@type':'SoftwareApplication',name:'Petits Besoins',url:self,description:t.description,applicationCategory:'LifestyleApplication',operatingSystem:'Android; iOS; iPadOS',image:og,installUrl:[apple,PLAY],author:{'@type':'Person',name:'Benjamin Dupin',url:'https://bnjdpn.com/'}};
 return `<!doctype html>
<html lang="${loc.code}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title><meta name="description" content="${esc(t.description)}"><meta name="theme-color" content="#FFFAF4">
<link rel="canonical" href="${self}">${LOCALES.map(l=>`<link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${l.dir}">`).join('')}<link rel="alternate" hreflang="x-default" href="${ORIGIN}">
<link rel="icon" href="${base}icon.png"><link rel="apple-touch-icon" href="${base}icon.png">
<meta name="apple-itunes-app" content="app-id=6820659968">
<link rel="preload" href="${base}fonts/sniglet-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${base}relais.css?v=${version}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Petits Besoins"><meta property="og:locale" content="${loc.key==='fr'?'fr_FR':'en_US'}"><meta property="og:title" content="${esc(t.title)}"><meta property="og:description" content="${esc(t.description)}"><meta property="og:url" content="${self}"><meta property="og:image" content="${og}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(t.h1)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${og}"><meta name="twitter:image:alt" content="${esc(t.h1)}">
<script type="application/ld+json">${JSON.stringify(schema)}</script></head>
<body><a class="pb-skip" href="#main">${t.skip}</a>
<header class="pb-header"><a class="pb-brand" href="/petits-besoins/${loc.dir}"><img src="${base}icon.png" width="40" height="40" alt="">Petits Besoins</a><nav class="pb-nav" aria-label="${loc.key==='fr'?'Navigation principale':'Main navigation'}"><a href="#carnet">${t.nav[0]}</a><a href="#creche">${t.nav[1]}</a><a href="#gratuit">${t.nav[2]}</a></nav><nav class="pb-languages" aria-label="${t.language}">${LOCALES.map(l=>`<a href="/petits-besoins/${l.dir}" lang="${l.code}" hreflang="${l.code}"${l.key===loc.key?' aria-current="page"':''}>${l.key.toUpperCase()}</a>`).join('')}</nav></header>
<main id="main">
<section class="pb-opening" aria-labelledby="pb-title"><div class="pb-opening-copy"><h1 id="pb-title">${t.h1}</h1><p class="pb-intro">${t.intro}</p>${stores()}<p class="pb-freenote">${t.free}</p></div><figure class="pb-signature">${screen(loc,'01-today',t.heroAlt,true)}</figure></section>
<section class="pb-distinction" id="carnet"><h2>${t.hinge}</h2><p>${t.hingeBody}</p></section>
<section class="pb-evening"><div class="pb-evening-copy"><h2>${t.dayTitle}</h2><p>${t.dayBody}</p><p class="pb-shareline">${t.dayEnd}</p><aside class="pb-reminder"><h3>${t.reminderTitle}</h3><p>${t.reminderBody}</p></aside></div><figure class="pb-history">${screen(loc,'02-history',t.historyAlt)}</figure></section>
<section class="pb-daycare" id="creche"><div class="pb-daycare-heading"><h2>${t.kitTitle}</h2><div><p>${t.kitBody}</p><p>${t.kitEnd}</p></div></div><div class="pb-kit-pair"><figure>${screen(loc,'03-kit',t.kitAlt)}<figcaption>${t.kitCaption}</figcaption></figure><figure>${screen(loc,'04-preview',t.previewAlt)}<figcaption>${t.previewCaption}</figcaption></figure></div></section>
<section class="pb-offer" id="gratuit"><h2>${t.offerTitle}</h2><dl class="pb-terms"><div><dt>${t.freeTitle}</dt><dd>${t.freeBody}</dd></div><div><dt>${t.paidTitle}</dt><dd>${t.paidBody}<p>${t.paidEnd}</p></dd></div></dl></section>
<section class="pb-local"><h2>${t.privacyTitle}</h2><div><p>${t.privacyBody}</p><p>${t.privacyEnd}</p><a href="${old}privacy/">${t.privacy}</a></div></section>
<section class="pb-install"><h2>${t.end}</h2>${stores()}</section>
<section class="pb-contact" id="contact"><h2>${t.contact}</h2><p>${t.contactBody}</p><a href="${contact}">${t.contactLink}</a></section>
</main><footer class="pb-footer"><p><strong>Petits Besoins</strong><br>${t.footer}</p><nav aria-label="${loc.key==='fr'?'Liens utiles':'Useful links'}"><a href="${old}privacy/">${t.privacy}</a><a href="${old}support/">${t.contact}</a><a href="${loc.key==='fr'?'/fr/':'/'}">${t.other}</a></nav><p><a href="https://bnjdpn.com/">Benjamin Dupin</a></p><small>Apple and the Apple logo are trademarks of Apple Inc. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</small></footer>
</body></html>`;
}
