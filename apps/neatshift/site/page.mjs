import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import copy from './copy.mjs';
import {UI} from '../../../content/product-sites/ui.mjs';
import {FORM_NOTE} from '../../../content/product-sites/form-note.mjs';
export const LOCALES = [{code:'en-US',key:'en',dir:''},{code:'fr-FR',key:'fr',dir:'fr-FR/'}];
const ORIGIN='https://bnjdpn.com/NeatShift/';
const cssHash=createHash('sha256').update(readFileSync(new URL('./household.css',import.meta.url))).digest('hex').slice(0,10);
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function render(loc){
 const t=copy[loc.key],ui=UI[loc.key],up=loc.dir?'../':'',asset=up+'assets/household/',self=ORIGIN+loc.dir;
 const privacy=ORIGIN+loc.code+'/privacy';
 const apple='https://apps.apple.com/'+(loc.key==='fr'?'fr':'us')+'/app/id6759961773';
 const play='https://play.google.com/store/apps/details?id=com.bnjdpn.neatshift';
 const cats=ui.categories.map((c,i)=>`<option value="${esc(ui.categoryValues[i])}">${esc(c)}</option>`).join('');
 const stores=`<div class="ns-stores"><a href="${apple}"><img src="${asset}badges/${loc.code}.svg" width="${loc.key==='fr'?152:144}" height="48" alt="${esc(ui.badgeAlt)}"></a><a href="${play}"><img src="${asset}badges/play-${loc.key}.webp" width="162" height="48" alt="${loc.key==='fr'?'Disponible sur Google Play':'Get it on Google Play'}"></a></div>`;
 const shot=(n,eager=false)=>`<picture class="ns-screen"><source type="image/avif" srcset="${asset}${loc.code}/0${n}-440.avif 440w, ${asset}${loc.code}/0${n}-880.avif 880w" sizes="(min-width: 900px) 340px, 82vw"><img src="${asset}${loc.code}/0${n}-440.webp" srcset="${asset}${loc.code}/0${n}-440.webp 440w, ${asset}${loc.code}/0${n}-880.webp 880w" sizes="(min-width: 900px) 340px, 82vw" width="880" height="${[1513,1593,1660][n-1]}" alt="${esc(t.alts[n-1])}" ${eager?'fetchpriority="high"':'loading="lazy"'} decoding="async"></picture>`;
 const ld={'@context':'https://schema.org','@type':'SoftwareApplication',name:'NeatShift',url:ORIGIN,description:t.description,operatingSystem:'iOS 17, iPadOS 17, Android 8',applicationCategory:'LifestyleApplication',image:ORIGIN+'assets/household/og-'+loc.key+'.jpg',offers:{'@type':'Offer',price:'0',priceCurrency:loc.key==='fr'?'EUR':'USD'},author:{'@type':'Person',name:'Benjamin Dupin'},installUrl:[apple,play]};
 return `<!doctype html><html lang="${loc.code}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title><meta name="description" content="${esc(t.description)}">
<meta name="theme-color" content="#e4efeb"><link rel="canonical" href="${self}">
${LOCALES.map(l=>`<link rel="alternate" hreflang="${l.code}" href="${ORIGIN+l.dir}">`).join('')}
<link rel="alternate" hreflang="x-default" href="${ORIGIN}">
<meta property="og:type" content="website"><meta property="og:locale" content="${loc.code.replace('-','_')}"><meta property="og:url" content="${self}"><meta property="og:title" content="${esc(t.title)}"><meta property="og:description" content="${esc(t.description)}"><meta property="og:image" content="${ORIGIN}assets/household/og-${loc.key}.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">
<meta name="apple-itunes-app" content="app-id=6759961773"><link rel="icon" href="${up}assets/app-icon.png">
<link rel="preload" href="${asset}fonts/gabarito-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset}household.css?v=${cssHash}"><script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":[{...ld,sameAs:[apple,play]}]})}</script></head><body>
<a class="ns-skip" href="#main">${esc(ui.skip)}</a>
<header class="ns-top"><a class="ns-brand" href="${self}"><img src="${up}assets/app-icon-512.png" alt="" width="48" height="48">NeatShift</a><nav aria-label="${esc(ui.navMain)}"><a href="#features">Planning</a><a href="#free-and-pro">${loc.key==='fr'?'Gratuit et Pro':'Free & Pro'}</a><a href="#contact">${esc(ui.support)}</a></nav><a class="ns-language" href="${ORIGIN+(loc.key==='fr'?'':'fr-FR/')}" lang="${loc.key==='fr'?'en':'fr'}">${loc.key==='fr'?'EN':'FR'}</a></header>
<main id="main">
<section class="ns-hero" aria-labelledby="home-title"><span class="ns-alias" id="hero-title" aria-hidden="true"></span><div class="ns-pitch"><p class="ns-category">${esc(loc.key==='fr'?'Planning ménage':'Household cleaning planner')}</p><h1 id="home-title">${esc(t.h1)}</h1><p class="ns-intro">${esc(t.intro)}</p>${stores}<p class="ns-platform">${esc(t.platform)}</p></div><div class="ns-calendar">${shot(2,true)}</div></section>
<section class="ns-today" id="features"><span id="example"></span><span id="brief"></span><span id="brief-title"></span><div class="ns-story"><h2 id="features-title">${esc(t.firstTitle)}</h2><p>${esc(t.firstBody)}</p><h3>${esc(t.shareTitle)}</h3><p>${esc(t.shareBody)}</p></div>${shot(1)}</section>
<section class="ns-time"><h2>${esc(t.timeTitle)}</h2><p>${esc(t.timeBody)}</p></section>
<section class="ns-rooms"><div class="ns-story"><h2>${esc(t.roomTitle)}</h2><p>${esc(t.roomBody)}</p></div>${shot(3)}</section>
<section class="ns-offer" id="free-and-pro"><div class="ns-free"><h2 id="free-and-pro-title">${esc(t.freeTitle)}</h2><ul>${t.plans[0].items.map(s=>`<li>${esc(s)}</li>`).join('')}</ul></div><div class="ns-pro"><h2>${esc(t.proTitle)}</h2><ul>${t.plans[1].items.map(s=>`<li>${esc(s)}</li>`).join('')}</ul><p>${esc(t.terms)}</p></div></section>
<section class="ns-private"><h2>${esc(t.privateTitle)}</h2><p>${esc(t.privateBody)} <a href="${privacy}">${esc(ui.privacy)}</a></p></section>
<section class="ns-last"><h2>${esc(t.close)}</h2>${stores}</section>
<section class="ns-related" id="more-apps"><span id="neighbours"></span><span id="neighbours-title"></span><span class="ns-alias" id="more-apps-title" aria-hidden="true"></span><h2 id="related-title">${esc(t.relatedTitle)}</h2><a href="https://bnjdpn.com/NoBuyCart/${loc.dir}">NoBuy Cart</a><a href="https://bnjdpn.com/FastZen/${loc.dir}">FastZen</a></section>
<section class="ns-support" id="contact"><span class="ns-alias" id="support-title" aria-hidden="true"></span><div><h2 id="contact-title">${esc(t.supportTitle)}</h2><p>${esc(t.supportIntro)}</p></div>
<form class="support-form" action="/api/contact" method="POST" data-sending="${esc(ui.formSending)}" data-success="${esc(ui.formSuccess)}" data-error="${esc(ui.formError)}">
<input type="hidden" name="app" value="NeatShift"><input type="hidden" name="_subject" value="NeatShift support request">
<label class="honeypot" aria-hidden="true">Leave empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>
<label><span>${esc(ui.labels.category)}</span><select name="category" required><option value="" selected disabled>${esc(t.choose)}</option>${cats}</select></label>
<label><span>${esc(ui.labels.email)}</span><input type="email" name="email" autocomplete="email" required></label>
<label><span>${esc(ui.labels.appVersion)}</span><input type="text" name="app_version"></label>
<label><span>${esc(ui.labels.osVersion)}</span><input type="text" name="os_version"></label>
<label class="message-field"><span>${esc(ui.labels.message)}</span><textarea name="message" required></textarea></label>
<div class="cf-turnstile" data-sitekey="0x4AAAAAAFb8sZbCULV4skmB" data-action="contact"></div>
<button type="submit">${esc(ui.send)}</button>
<p class="form-status" role="status" aria-live="polite"></p>
</form>
<p class="form-note">${esc(FORM_NOTE[loc.key])}</p>
</section></main><footer class="ns-footer"><p>${esc(t.footer)}</p><nav aria-label="${esc(ui.legalNav)}"><a href="${privacy}">${esc(ui.privacy)}</a><a href="#contact">${esc(ui.support)}</a><a href="https://bnjdpn.com/">${esc(t.other)}</a></nav><small>Apple and the Apple logo are trademarks of Apple Inc. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</small></footer>
<script src="${up}assets/site.js" defer></script>
<script>(function(){var s=["https://challenges.cloudflare.com/turnstile/v0/api.js"],d=0,f=document.querySelectorAll('.support-form');function l(){if(d)return;d=1;s.forEach(function(u){var e=document.createElement('script');e.src=u;e.async=true;document.head.appendChild(e)})}if(!f.length||!('IntersectionObserver' in window))return l();var o=new IntersectionObserver(function(x){if(x.some(function(y){return y.isIntersecting})){o.disconnect();l()}},{rootMargin:'800px 0px'});f.forEach(function(e){o.observe(e);e.addEventListener('focusin',l)})})()</script>
</body></html>`;
}
