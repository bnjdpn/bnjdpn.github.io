import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import copy from './copy.mjs';
import { forms, legacyIds } from './support.mjs';
import { UI, LOCALE_NAMES } from '../../../content/product-sites/ui.mjs';
import { googlePlayBadge } from '../../../scripts/product-site/google-play.mjs';

export const LOCALES = [
 {code:'en-US',key:'en',dir:'',country:'us'},
 {code:'fr-FR',key:'fr',dir:'fr-FR/',country:'fr'},
 {code:'de-DE',key:'de',dir:'de-DE/',country:'de'},
 {code:'es-ES',key:'es',dir:'es-ES/',country:'es'},
];
const ROOT='https://bnjdpn.com/GrooveLog/';
const PLAY='https://play.google.com/store/apps/details?id=com.bnjdpn.groovelog';
const hash=createHash('sha256').update(readFileSync(new URL('./rhythm.css',import.meta.url))).digest('hex').slice(0,12);
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const facts=items=>`<dl class="gl-facts">${items.map(([a,b])=>`<div><dt>${e(a)}</dt><dd>${e(b)}</dd></div>`).join('')}</dl>`;

export function render(loc, previousIds = []) {
 const t=copy[loc.key],ui=UI[loc.key],up=loc.dir?'../':'';
 const media=`${up}assets/rhythm/`,apple=`https://apps.apple.com/${loc.country}/app/id6760195408`,self=ROOT+loc.dir;
 const picture=(n,eager=false)=>`<picture><source type="image/avif" srcset="${media}${loc.code}/0${n}-440.avif 440w, ${media}${loc.code}/0${n}-880.avif 880w" sizes="(min-width: 900px) 320px, 250px"><img src="${media}${loc.code}/0${n}-440.webp" srcset="${media}${loc.code}/0${n}-440.webp 440w, ${media}${loc.code}/0${n}-880.webp 880w" sizes="(min-width: 900px) 320px, 250px" width="880" height="1912" alt="${e(t.alts[n-1])}" ${eager?'fetchpriority="high"':'loading="lazy"'} decoding="async"></picture>`;
 const play=googlePlayBadge(loc.code);
 const stores=`<div class="gl-stores"><a href="${apple}" rel="external"><img src="${media}badges/${loc.code}.svg" width="${loc.key==='fr'?152:144}" height="48" alt="${e(ui.badgeAlt)}"></a><a href="${e(PLAY)}" rel="external"><img src="${media}badges/play-${loc.key}.webp" width="${play.width}" height="${play.height}" alt="${e(play.alt)}"></a></div>`;
 const privacy=`${ROOT}${['fr-FR','en-US'].includes(loc.code)?loc.code+'/':''}privacy`;
 const ids=new Set(['main','hero-title','features','features-title','cycle','cycle-title','free-and-pro','free-and-pro-title','more-apps','related-title','contact','contact-title','journal-guide-title']);
 const legacy=[...new Set([...legacyIds[loc.code], ...previousIds])].filter(id=>!ids.has(id)).map(id=>`<span id="${e(id)}" class="gl-anchor" aria-hidden="true"></span>`).join('');
 const ld={'@context':'https://schema.org','@graph':[{'@type':'SoftwareApplication',name:'GrooveLog',description:t.description,url:self,image:`${ROOT}assets/rhythm/og-${loc.key}.jpg`,applicationCategory:'HealthApplication',operatingSystem:'iOS 17.0 or later, iPadOS 17.0 or later, Android 8.0 or later',offers:{'@type':'Offer',price:'0',priceCurrency:loc.key==='en'?'USD':'EUR'},sameAs:[apple,PLAY],installUrl:[apple,PLAY],author:{'@type':'Person',name:'Benjamin Dupin',url:'https://bnjdpn.com/'}},{'@type':'WebPage',url:self,name:t.title,inLanguage:loc.code}]};
 return `<!doctype html>
<html lang="${loc.code}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.title)}</title><meta name="description" content="${e(t.description)}"><meta name="theme-color" content="#101a14">
<link rel="canonical" href="${self}">${LOCALES.map(l=>`<link rel="alternate" hreflang="${l.code}" href="${ROOT}${l.dir}">`).join('')}<link rel="alternate" hreflang="x-default" href="${ROOT}">
<meta name="apple-itunes-app" content="app-id=6760195408"><link rel="icon" href="${up}assets/app-icon.png"><link rel="apple-touch-icon" href="${up}assets/app-icon-512.png">
<link rel="preload" href="${media}fonts/unbounded-latin-600.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${media}rhythm.css?v=${hash}">
<meta property="og:type" content="website"><meta property="og:site_name" content="GrooveLog"><meta property="og:locale" content="${loc.code.replace('-','_')}"><meta property="og:title" content="${e(t.title)}"><meta property="og:description" content="${e(t.description)}"><meta property="og:url" content="${self}"><meta property="og:image" content="${ROOT}assets/rhythm/og-${loc.key}.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${e(t.h1.join(' '))}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${ROOT}assets/rhythm/og-${loc.key}.jpg"><script type="application/ld+json">${JSON.stringify(ld).replaceAll('<','\\u003c')}</script></head>
<body><a class="gl-skip" href="#main">${e(ui.skip)}</a>
<header class="gl-bar"><a class="gl-brand" href="${self}"><img src="${up}assets/app-icon.png" width="36" height="36" alt="">GrooveLog</a><nav class="gl-nav" aria-label="${e(ui.navMain)}"><a href="#features">${e(t.nav[0])}</a><a href="#cycle">${e(t.nav[1])}</a><a href="#free-and-pro">${e(t.nav[2])}</a><a href="#contact">${e(ui.support)}</a></nav><details class="gl-language"><summary>${e(ui.language)}</summary><nav aria-label="${e(ui.language)}">${LOCALES.map(l=>`<a href="${ROOT}${l.dir}" lang="${l.code}" hreflang="${l.code}"${l.code===loc.code?' aria-current="page"':''}>${e(LOCALE_NAMES[l.code])}</a>`).join('')}</nav></details></header>
<main id="main">${legacy}
<section class="gl-opening" aria-labelledby="hero-title"><h1 id="hero-title">${t.h1.map(line=>`<span>${e(line)}</span>`).join('')}</h1><figure class="gl-first">${picture(1,true)}</figure><div class="gl-invite"><p class="gl-intro">${e(t.intro)}</p>${stores}<p class="gl-small">${e(t.hero.note)}</p></div><p class="gl-method">${e(t.hero.eyebrow)}</p></section>
<section class="gl-journal" id="features" aria-labelledby="features-title"><div class="gl-journal-copy"><h2 id="features-title">${e(t.journal)}</h2><p class="gl-lead">${e(t.journalIntro)}</p>${facts(t.sections.practice.items.slice(0,2))}</div><figure class="gl-recorded">${picture(2)}<figcaption>${e(t.journalCap)}</figcaption></figure><div class="gl-spacing"><h3>${e(t.next)}</h3><p>${e(t.nextBody)}</p></div></section>
<section class="gl-cycle" id="cycle" aria-labelledby="cycle-title"><div><h2 id="cycle-title">${e(t.cycle)}</h2><p class="gl-lead">${e(t.cycleIntro)}</p>${facts([t.sections.practice.items[2],t.sections.cycle.items[1],t.sections.cycle.items[2]])}<p id="journal-guide-title"><a href="${ROOT}${loc.dir}grease-the-groove-journal/">${e(t.hero.guide)}</a></p></div><figure>${picture(3)}<figcaption>${e(t.cycleCap)}</figcaption></figure></section>
<section class="gl-offer" id="free-and-pro" aria-labelledby="free-and-pro-title"><h2 id="free-and-pro-title">${e(t.sections.offer.title)}</h2><p class="gl-lead">${e(t.sections.offer.intro)}</p><div class="gl-plans">${t.sections.offer.plans.map((plan,i)=>`<div class="${i?'gl-pro':'gl-free'}"><h3>${e(plan.title)}</h3><ul>${plan.items.map(item=>`<li>${e(item)}</li>`).join('')}</ul></div>`).join('')}</div><p class="gl-small">${e(t.offerNote)}</p><p>${e(t.privacy)} <a href="${privacy}">${e(ui.privacy)}</a></p></section>
<section class="gl-download"><h2>${e(t.close)}</h2>${stores}</section>
<section class="gl-related" id="more-apps" aria-labelledby="related-title"><h2 id="related-title">${e(t.relatedTitle)}</h2><ul><li><a href="https://bnjdpn.com/MoveAtlas/${loc.dir}">MoveAtlas</a></li><li><a href="https://bnjdpn.com/TempoReps/${loc.dir}">TempoReps</a></li></ul></section>
<section class="gl-help" id="contact" aria-labelledby="contact-title"><div><h2 id="contact-title">${e(t.supportTitle)}</h2><p>${e(t.supportIntro)}</p></div>${forms[loc.code]}<p class="gl-form-note">${e(t.formNote)}</p></section>
</main><footer class="gl-footer"><p><strong>GrooveLog</strong> ${e(t.footer)}</p><nav aria-label="${e(ui.legalNav)}"><a href="${privacy}">${e(ui.privacy)}</a><a href="#contact">${e(ui.support)}</a><a href="https://bnjdpn.com/">${e(t.others)}</a></nav><small>Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</small></footer>
<script src="${up}assets/site.js" defer></script></body></html>`;
}
