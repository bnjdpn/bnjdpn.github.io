import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import copy from './copy.mjs';
import product from '../../../content/product-sites/PRVault.mjs';
import { UI, LOCALE_NAMES } from '../../../content/product-sites/ui.mjs';
import { FORM_NOTE } from '../../../content/product-sites/form-note.mjs';
import { googlePlayBadge } from '../../../scripts/product-site/google-play.mjs';
export const LOCALES = [['en-US','en','us'],['fr-FR','fr','fr'],['de-DE','de','de'],['es-ES','es','es'],['es-MX','es','mx'],['it','it','it'],['ja','ja','jp'],['pt-BR','pt','br']].map(([code,key,country])=>({code,key,country,dir:code==='en-US'?'':code+'/'}));
const ORIGIN='https://bnjdpn.com/PRVault/';
const PLAY='https://play.google.com/store/apps/details?id=com.bnjdpn.prvault';
const CSS=createHash('sha256').update(readFileSync(new URL('./personal-best.css',import.meta.url))).digest('hex').slice(0,10);
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function render(loc){
 const t={...copy[loc.key],...(loc.code==='es-MX'?product.locales['es-MX']:{})}, ui=UI[loc.key], up=loc.dir?'../':'', a=up+'assets/personal-best/', self=ORIGIN+loc.dir;
 const apple=`https://apps.apple.com/${loc.country}/app/id6758960761`, play=googlePlayBadge(loc.code), r=t.sections.records, im=t.sections.import, offer=t.sections.offer;
 const shot=(name,alt,eager=false)=>`<figure class="pv-screen pv-${name}"><picture><source type="image/avif" srcset="${a}${loc.code}/${name}-440.avif 440w, ${a}${loc.code}/${name}-880.avif 880w" sizes="(min-width: 960px) 360px, 82vw"><img src="${a}${loc.code}/${name}-880.webp" srcset="${a}${loc.code}/${name}-440.webp 440w, ${a}${loc.code}/${name}-880.webp 880w" sizes="(min-width: 960px) 360px, 82vw" width="880" height="1913" alt="${esc(alt)}" ${eager?'fetchpriority="high"':'loading="lazy"'} decoding="async"></picture></figure>`;
 const stores=`<div class="pv-downloads"><a href="${apple}" rel="external"><img src="${up}assets/app-store-badges/${loc.code}.svg" width="150" height="48" alt="${esc(ui.badgeAlt)}"></a><a href="${esc(PLAY)}" rel="external"><img src="${play.src}" width="162" height="48" alt="${esc(play.alt)}"></a></div>`;
 const facts=items=>`<dl class="pv-facts">${items.map(([label,text])=>`<div><dt>${esc(label)}</dt><dd>${esc(text)}</dd></div>`).join('')}</dl>`;
 const langs=LOCALES.map(l=>`<a href="${ORIGIN}${l.dir}" hreflang="${l.code}" lang="${l.code}"${l.code===loc.code?' aria-current="page"':''}>${esc(LOCALE_NAMES[l.code])}</a>`).join('');
 const og=ORIGIN+'assets/personal-best/og-'+(loc.key==='fr'?'fr':'en')+'.jpg';
 const ld={'@context':'https://schema.org','@graph':[{'@type':'SoftwareApplication',name:'PRVault',description:t.description,applicationCategory:'SportsApplication',operatingSystem:product.operatingSystem,url:ORIGIN,image:og,offers:{'@type':'Offer',price:'0',priceCurrency:product.currency[loc.code]},sameAs:[apple,PLAY],installUrl:[apple,PLAY],author:{'@type':'Person',name:'Benjamin Dupin',url:'https://bnjdpn.com/'}},{'@type':'WebPage',url:self,name:t.title,inLanguage:loc.code}]};
 return `<!doctype html>
<html lang="${loc.code}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title><meta name="description" content="${esc(t.description)}"><meta name="theme-color" content="#121C2A">
<link rel="canonical" href="${self}">${LOCALES.map(l=>`<link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${l.dir}">`).join('')}<link rel="alternate" hreflang="x-default" href="${ORIGIN}">
<link rel="icon" href="${up}assets/app-icon.png"><link rel="apple-touch-icon" href="${up}assets/app-icon-512.png"><link rel="manifest" href="${up}site.webmanifest"><meta name="apple-itunes-app" content="app-id=6758960761">
<link rel="preload" href="${a}fonts/anton-latin-400.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${a}personal-best.css?v=${CSS}">
<meta property="og:type" content="website"><meta property="og:site_name" content="PRVault"><meta property="og:locale" content="${loc.code.replace('-','_')}"><meta property="og:title" content="${esc(t.title)}"><meta property="og:description" content="${esc(t.description)}"><meta property="og:url" content="${self}"><meta property="og:image" content="${og}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(t.alts[0])}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(t.title)}"><meta name="twitter:description" content="${esc(t.description)}"><meta name="twitter:image" content="${og}">
<script type="application/ld+json">${JSON.stringify(ld).replaceAll('<','\\u003c')}</script></head>
<body><a class="skip" href="#main">${esc(ui.skip)}</a>
<header class="pv-top"><a class="pv-brand" href="${ORIGIN}${loc.dir}"><img src="${up}assets/app-icon.png" width="34" height="34" alt="">PRVault</a><nav class="pv-nav" aria-label="${esc(ui.navMain)}"><a href="#features">${esc(r.nav)}</a><a href="#import">CSV</a><a href="#free-and-pro">Pro</a><a href="#contact">${esc(ui.support)}</a></nav><details class="pv-language"><summary>${esc(ui.language)}</summary><nav aria-label="${esc(ui.language)}">${langs}</nav></details></header>
<main id="main"><section class="pv-opening" aria-labelledby="hero-title"><span id="vault-title" class="pv-anchor"></span><div class="pv-headline"><p class="pv-platform">${esc(t.hero.eyebrow)}</p><h1 id="hero-title">${esc(t.h1)}</h1>${stores}</div>
${shot('reference',t.alts[0],true)}
<div class="pv-benchmark"><p class="pv-lift">${esc(t.exercise)} <span>${esc(t.measured)}</span></p><p class="pv-weight">130<span>kg</span></p><p class="pv-intro">${esc(t.hero.intro)}</p><p class="pv-note">${esc(t.hero.note)}</p></div></section>
<section class="pv-log" id="features" aria-labelledby="features-title"><div class="pv-log-copy"><h2 id="features-title">${esc(r.title)}</h2>${facts(r.items.slice(0,3))}</div>${shot('record',t.alts[1])}</section>
<section class="pv-estimate" id="register" aria-labelledby="register-title"><div class="pv-estimate-copy"><h2 id="register-title">${esc(r.items[3][0])}</h2><p>${esc(r.items[3][1])}</p><p>${esc(r.items[4][1])}</p>${t.hero.guide?`<a class="pv-guide" href="${up}${product.guides[loc.code]}">${esc(t.hero.guide)}</a>`:''}</div>${shot('history',t.alts[2])}</section>
<section class="pv-import" id="import" aria-labelledby="pv-import-title"><h2 id="pv-import-title">${esc(im.title)}</h2>${facts(im.items)}<p class="pv-note">${esc(im.note)}</p></section>
<section class="pv-membership" id="free-and-pro" aria-labelledby="pv-offer-title"><h2 id="pv-offer-title">${esc(offer.title)}</h2><p class="pv-offer-intro">${esc(offer.intro)}</p><div class="pv-plans">${offer.plans.map(p=>`<section class="pv-plan"><h3>${esc(p.title)}</h3><ul>${p.items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul></section>`).join('')}</div><p>${esc(t.priceNote)}</p><p class="pv-note">${esc(offer.notes[1])}</p><p class="pv-private">${esc(t.privacy)} <a href="${up}${loc.code}/privacy">${esc(offer.privacyLink)}</a></p>${stores}</section>
<section class="pv-related" id="more-apps" aria-labelledby="related-title"><span id="other-title" class="pv-anchor"></span><h2 id="related-title">${esc(t.relatedTitle)}</h2><ul>${['LoadSense','ColdLoad','TempoReps','MoveAtlas'].map(n=>`<li><a href="https://bnjdpn.com/${n}/${loc.key==='fr'?'fr-FR/':''}">${n}</a></li>`).join('')}</ul></section>
<section class="pv-help" id="contact" aria-labelledby="contact-title"><div><h2 id="contact-title">${esc(t.supportTitle)}</h2><p>${esc(t.supportIntro)}</p></div>
<form class="support-form" action="/api/contact" method="POST" data-sending="${esc(ui.formSending)}" data-success="${esc(ui.formSuccess)}" data-error="${esc(ui.formError)}">
<input type="hidden" name="app" value="PRVault"><input type="hidden" name="_subject" value="PRVault support request"><label class="honeypot" aria-hidden="true">Leave empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>
<label><span>${esc(ui.labels.category)}</span><select name="category" required><option value="" selected disabled>—</option>${ui.categories.map((c,i)=>`<option value="${esc(ui.categoryValues[i])}">${esc(c)}</option>`).join('')}</select></label>
<label><span>${esc(ui.labels.email)}</span><input type="email" name="email" autocomplete="email" required></label><label><span>${esc(ui.labels.appVersion)}</span><input type="text" name="app_version"></label><label><span>${esc(ui.labels.osVersion)}</span><input type="text" name="os_version"></label><label class="message-field"><span>${esc(ui.labels.message)}</span><textarea name="message" required></textarea></label>
<div class="cf-turnstile" data-sitekey="0x4AAAAAAFb8sZbCULV4skmB" data-action="contact"></div><button type="submit">${esc(ui.send)}</button><p class="form-status" role="status" aria-live="polite"></p></form><p class="form-note">${esc(FORM_NOTE[loc.key])}</p></section></main>
<footer class="pv-footer"><p><strong>PRVault</strong> ${esc(t.footer)}</p><nav aria-label="${esc(ui.legalNav)}"><a href="${up}${loc.code}/privacy">${esc(ui.privacy)}</a><a href="#contact">${esc(ui.support)}</a><a href="https://bnjdpn.com/">Benjamin Dupin</a></nav><small>Apple and the Apple logo are trademarks of Apple Inc. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</small></footer>
<script src="${up}assets/site.js" defer></script>
</body></html>`;
}
