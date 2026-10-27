import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import copy from './copy.mjs';
import forms from './forms.mjs';
import product from '../../../content/product-sites/petites-nuits.mjs';
import { UI, LOCALE_NAMES } from '../../../content/product-sites/ui.mjs';
import { FORM_NOTE } from '../../../content/product-sites/form-note.mjs';
export const LOCALES = [
 { code: 'en-US', key: 'en', copy: 'en', form: 'en', dir: '' },
 { code: 'en-GB', key: 'en-GB', copy: 'en', form: 'gb', dir: 'en-GB/' },
 { code: 'fr-FR', key: 'fr', copy: 'fr', form: 'fr', dir: 'fr-FR/' },
];
const ORIGIN = 'https://bnjdpn.com/petites-nuits/';
const hash = createHash('sha256').update(readFileSync(new URL('./noon.css', import.meta.url))).digest('hex').slice(0, 10);
const e = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function render(loc) {
 const t = copy[loc.copy], ui = UI[loc.copy], p = product.locales[loc.key];
 const original = product.locales.en;
 const alts = p.alts || original.alts;
 const description = p.description || original.description;
 const title = p.title || original.title;
 const up = loc.dir ? '../' : '', a = `${up}assets/noon/`, self = ORIGIN + loc.dir;
 const privacy = `${up}${loc.code}/privacy`;
 const stores = `<div class="pn-stores"><a href="https://apps.apple.com/${loc.copy === 'fr' ? 'fr' : loc.code === 'en-GB' ? 'gb' : 'us'}/app/id${product.appStoreId}"><img src="${a}badges/apple-${loc.copy}.svg" width="144" height="48" alt="${e(ui.badgeAlt)}"></a><a href="${e(product.playUrl)}"><img src="${a}badges/play-${loc.copy}.webp" width="162" height="48" alt="${loc.copy === 'fr' ? 'Disponible sur Google Play' : 'Get it on Google Play'}"></a></div>`;
 const shot = (n, eager=false) => `<a class="pn-shot-link" href="${a}${loc.code}/${n}-880.webp" data-screenshot><picture><source type="image/avif" srcset="${a}${loc.code}/${n}-440.avif 440w, ${a}${loc.code}/${n}-880.avif 880w" sizes="(min-width:900px) 320px, 76vw"><img src="${a}${loc.code}/${n}-880.webp" srcset="${a}${loc.code}/${n}-440.webp 440w, ${a}${loc.code}/${n}-880.webp 880w" sizes="(min-width:900px) 320px, 76vw" width="880" height="1912" alt="${e(alts[Number(n)-1])}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture></a>`;
 const plans = (p.sections?.offer?.plans || original.sections.offer.plans);
 const og = `${ORIGIN}assets/noon/og-${loc.copy}.jpg`;
 const ld = {'@context':'https://schema.org','@type':'SoftwareApplication',name:'Petites Nuits',url:self,description,applicationCategory:product.applicationCategory,operatingSystem:product.operatingSystem,image:og,author:{'@type':'Person',name:'Benjamin Dupin'},offers:{'@type':'Offer',price:'0',priceCurrency:product.currency[loc.code]},sameAs:[`https://apps.apple.com/app/id${product.appStoreId}`,product.playUrl],installUrl:[`https://apps.apple.com/app/id${product.appStoreId}`,product.playUrl]};
 return `<!doctype html>
<html lang="${loc.code}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(title)}</title><meta name="description" content="${e(description)}"><meta name="theme-color" content="#0A0E1F">
<link rel="canonical" href="${self}">${LOCALES.map(l=>`<link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${l.dir}">`).join('')}<link rel="alternate" hreflang="x-default" href="${ORIGIN}">
<link rel="icon" href="${up}assets/app-icon.png"><link rel="apple-touch-icon" href="${up}assets/app-icon-512.png"><meta name="apple-itunes-app" content="app-id=${product.appStoreId}">
<link rel="preload" href="${a}fonts/young-serif-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${a}noon.css?v=${hash}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Petites Nuits"><meta property="og:locale" content="${loc.code.replace('-','_')}"><meta property="og:url" content="${self}"><meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}"><meta property="og:image" content="${og}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${e(t.h1)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${og}">
<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":[ld]})}</script></head>
<body><a class="pn-skip" href="#main">${e(ui.skip)}</a>
<header class="pn-header"><a class="pn-brand" href="./"><img src="${up}assets/app-icon.png" width="36" height="36" alt=""><span>Petites Nuits</span></a><nav class="pn-nav" aria-label="${e(ui.navMain)}"><a href="#features">${e(t.nav[0])}</a><a href="#pdf-diary">${e(t.nav[1])}</a><a href="#contact">${e(t.nav[2])}</a></nav><details class="pn-language"><summary>${loc.copy === 'fr' ? 'Français' : loc.code === 'en-GB' ? 'English (UK)' : 'English (US)'}</summary><nav aria-label="${e(ui.language)}">${LOCALES.map(l=>`<a href="${up}${l.dir || './'}" lang="${l.code}" ${l.code === loc.code ? 'aria-current="page"' : ''}>${LOCALE_NAMES[l.code]}</a>`).join('')}</nav></details></header>
<main id="main">
<section class="pn-opening" aria-labelledby="hero-title"><div class="pn-opening-copy"><p class="pn-audience">${e(t.audience)}</p><h1 id="hero-title">${e(t.h1)}</h1><p class="pn-intro">${e(t.intro)}</p>${stores}<p class="pn-free">${e(t.free)}</p></div><figure class="pn-active">${shot('02',true)}<figcaption>${e(t.active)}</figcaption></figure></section>
<span id="notes"></span><span id="notes-title"></span>
<section class="pn-record" id="features" aria-labelledby="features-title"><div class="pn-record-copy"><h2 id="features-title">${e(t.start)}</h2><p>${e(t.startText)}</p><h3>${e(t.notesTitle)}</h3><p>${e(t.notesText)}</p><aside class="pn-widget"><h3>${e(t.widgetTitle)}</h3><p>${e(t.widget)}</p></aside></div><figure class="pn-entry">${shot('01')}</figure></section>
<section class="pn-reread" aria-labelledby="pn-day"><div class="pn-reread-copy"><p class="pn-noon">${loc.copy === 'fr' ? 'De midi à midi.' : 'Noon to noon.'}</p><h2 id="pn-day">${e(t.dayTitle)}</h2><p>${e(t.dayText)}</p></div><figure class="pn-trends">${shot('03')}<figcaption>${e(t.dayCaption)}</figcaption></figure></section>
<section class="pn-pdf" id="pdf-diary" aria-labelledby="pdf-diary-title"><h2 id="pdf-diary-title">${e(t.pdfTitle)}</h2><div class="pn-pdf-body"><p class="pn-pdf-lead">${e(t.pdfIntro)}</p><p>${e(t.pdfDetails)}</p></div></section>
<section class="pn-offer" id="free-and-diary" aria-labelledby="free-and-diary-title"><div class="pn-free-plan" id="questions"><span id="faq-title"></span><h2 id="free-and-diary-title">${e(t.offerTitle)}</h2><ul>${plans[0].items.map(x=>`<li>${e(x)}</li>`).join('')}</ul></div><div class="pn-paid-plan"><h2>${e(t.paidTitle)}</h2><p>${e(t.paid)}</p><p>${e(t.paidNote)}</p></div><p class="pn-private">${e(t.privacy)} <a href="${privacy}">${e(ui.privacy)}</a></p></section>
<section class="pn-install" aria-labelledby="pn-next"><h2 id="pn-next">${e(t.outro)}</h2>${stores}<p class="pn-requires">${e(p.hero?.note || original.hero.note)}</p></section>
<section class="pn-contact" id="contact" aria-labelledby="contact-title"><div><h2 id="contact-title">${e(t.contact)}</h2><p>${e(t.contactText)}</p></div><div>${forms[loc.form]}<p class="form-note">${e(FORM_NOTE[loc.copy])}</p></div></section>
<span id="family"></span><span id="family-title"></span>
</main><footer class="pn-footer"><p>Petites Nuits<br>${e(p.footer || original.footer)}</p><nav aria-label="${e(ui.legalNav)}"><a href="${privacy}">${e(ui.privacy)}</a><a href="#contact">${e(ui.support)}</a><a href="https://bnjdpn.com/${loc.copy === 'fr' ? 'fr/' : ''}">${e(t.other)}</a></nav><div class="pn-more" id="more-apps"><span id="more-apps-title"></span><span id="related"></span><h2 id="related-title">${e(t.other)}</h2><ul>${[['Petites Bouchées','petites-bouchees'],['Petites Gouttes','petites-gouttes'],['Petites Dents','petites-dents']].map(([name,slug])=>`<li><a href="https://bnjdpn.com/${slug}/${loc.copy === 'fr' ? 'fr-FR/' : ''}">${name}</a></li>`).join('')}</ul></div><small>Apple and the Apple logo are trademarks of Apple Inc. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</small></footer>
<dialog class="pn-dialog screenshot-dialog" aria-label="${e(ui.dialog)}"><form method="dialog"><button aria-label="${e(ui.close)}">×</button></form><img width="880" height="1912" alt=""></dialog>
<script src="${up}assets/site.js" defer></script><script src="${a}contact.js" defer></script>
</body></html>`;
}
