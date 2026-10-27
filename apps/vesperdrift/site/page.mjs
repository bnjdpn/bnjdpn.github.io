import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import copy from './copy.mjs';
import { UI } from '../../../content/product-sites/ui.mjs';
import { FORM_NOTE } from '../../../content/product-sites/form-note.mjs';
export const ORIGIN = 'https://bnjdpn.com/VesperDrift/';
export const LOCALES = [{code:'en-US', key:'en', dir:'', og:'en_US'}, {code:'fr-FR', key:'fr', dir:'fr-FR/', og:'fr_FR'}];
const CSS_VERSION = createHash('sha256').update(readFileSync(new URL('./drift.css',import.meta.url))).digest('hex').slice(0,10);
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function shot(loc, n, up, eager=false) {
 const base = `${up}assets/drift/${loc.code}/${n === 1 ? 'action-detail' : 'action-full'}`;
 const sizes = n === 1 ? '(min-width: 1200px) 360px, (min-width: 900px) 31vw, 77.4vw' : '(min-width: 900px) 34vw, 86vw';
 return `<figure class="vd-shot vd-shot-${n}"><picture><source type="image/avif" srcset="${base}-440.avif 440w, ${base}-880.avif 880w" sizes="${sizes}"><img src="${base}-880.webp" srcset="${base}-440.webp 440w, ${base}-880.webp 880w" sizes="${sizes}" width="880" height="${n === 1 ? 951 : 1903}" alt="${esc(copy[loc.key].alts[n-1])}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture></figure>`;
}
function fleetShot(loc, up) {
 const base = `${up}assets/drift/${loc.code}/fleet`;
 const sizes = '(min-width: 900px) 34vw, 86vw';
 const alt = loc.key === 'fr' ? 'Écran Flotte : Kestrel, Lancer, Manta et Aegis, chacun avec son style de tir' : 'Fleet screen: Kestrel, Lancer, Manta and Aegis, each with its own firing style';
 return `<figure class="vd-shot vd-shot-fleet"><picture><source type="image/avif" srcset="${base}-440.avif 440w, ${base}-880.avif 880w" sizes="${sizes}"><img src="${base}-880.webp" srcset="${base}-440.webp 440w, ${base}-880.webp 880w" sizes="${sizes}" width="880" height="1415" alt="${esc(alt)}" loading="lazy" decoding="async"></picture></figure>`;
}
export function render(loc) {
 const t = copy[loc.key], ui = UI[loc.key], up = loc.dir ? '../' : '';
 const self = ORIGIN+loc.dir, privacy = `${up}privacy.html`, apple = `https://apps.apple.com/${loc.key === 'fr' ? 'fr' : 'us'}/app/id6791882792`;
 const play = 'https://play.google.com/store/apps/details?id=com.bnjdpn.vesperdrift';
 const ogImg = ORIGIN+`assets/drift/og-${loc.key}.jpg`;
 const hreflang = LOCALES.map(l=>`<link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${l.dir}">`).join('')+`<link rel="alternate" hreflang="en" href="${ORIGIN}"><link rel="alternate" hreflang="fr" href="${ORIGIN}fr-FR/"><link rel="alternate" hreflang="x-default" href="${ORIGIN}">`;
 const ld = {'@context':'https://schema.org','@graph':[{'@type':'SoftwareApplication',name:'Vesper Drift',description:t.description,url:self,image:ogImg,applicationCategory:'GameApplication',operatingSystem:'iOS 17.0 or later, iPadOS 17.0 or later, Android',offers:{'@type':'Offer',price:'0',priceCurrency:loc.key==='fr'?'EUR':'USD'},author:{'@type':'Person',name:'Benjamin Dupin',url:'https://bnjdpn.com/'},sameAs:[apple,play],installUrl:[apple,play]}]};
 const stores = `<div class="vd-stores"><a href="${apple}"><img src="${up}assets/drift/badges/${loc.code}.svg" width="${loc.key === 'fr' ? 152 : 144}" height="48" alt="${esc(ui.badgeAlt)}"></a><a href="${play}"><img src="${up}assets/drift/badges/${loc.key}.webp" width="162" height="48" alt="${loc.key==='fr'?'Disponible sur Google Play':'Get it on Google Play'}"></a></div>`;
 const cats = ui.categories.map((c,i)=>`<option value="${esc(ui.categoryValues[i])}">${esc(c)}</option>`).join('');
 return `<!doctype html>
<html lang="${loc.code}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.description)}">
<meta name="theme-color" content="#061113">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${self}">
${hreflang}
<meta name="apple-itunes-app" content="app-id=6791882792">
<link rel="icon" href="${up}assets/app-icon.png">
<link rel="apple-touch-icon" href="${up}assets/app-icon-512.png">
<link rel="manifest" href="${up}site.webmanifest">
<link rel="preload" href="${up}assets/drift/fonts/tektur-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" as="image" href="${up}assets/drift/${loc.code}/action-detail-880.avif" imagesrcset="${up}assets/drift/${loc.code}/action-detail-440.avif 440w, ${up}assets/drift/${loc.code}/action-detail-880.avif 880w" imagesizes="(min-width: 1200px) 360px, (min-width: 900px) 31vw, 77.4vw" type="image/avif" fetchpriority="high">
<link rel="stylesheet" href="${up}assets/drift/drift.css?v=${CSS_VERSION}">
<meta name="author" content="Benjamin Dupin">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Vesper Drift">
<meta property="og:locale" content="${loc.og}">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.description)}">
<meta property="og:url" content="${self}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(t.headline)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(t.title)}">
<meta name="twitter:description" content="${esc(t.description)}">
<meta name="twitter:image" content="${ogImg}">
<meta name="twitter:image:alt" content="${esc(t.headline)}">
<script type="application/ld+json">${JSON.stringify(ld).replaceAll('<', '\\u003c')}</script>
</head>
<body>
<a class="skip" href="#main">${esc(ui.skip)}</a>
<header class="vd-header">
<a class="vd-brand" href="./"><img src="${up}assets/app-icon.png" width="36" height="36" alt=""><span>Vesper Drift</span></a>
<nav class="vd-nav" aria-label="${esc(ui.navMain)}"><a href="#features">${esc(t.navCampaign)}</a><a href="#contact">${esc(ui.support)}</a></nav>
<nav class="vd-languages" aria-label="${esc(ui.language)}">${LOCALES.map(l=>`<a href="${up}${l.dir || './'}" lang="${l.code}" hreflang="${l.code}"${loc.code===l.code?' aria-current="page"':''}>${l.key.toUpperCase()}</a>`).join('')}</nav>
</header>
<main id="main">
<section class="vd-launch" aria-labelledby="hero-title">
<div class="vd-call"><p class="vd-platforms">${esc(t.hero.eyebrow)}</p><h1 id="hero-title">${esc(t.headline)}</h1>${stores}<p class="vd-note">${esc(t.hero.note)}</p></div>
${shot(loc,1,up,true)}
<div class="vd-flightnotes"><p class="vd-intro">${esc(t.hero.intro)}</p><p class="vd-missioncount"><strong>18</strong> ${esc(t.missions)}</p><p>${esc(t.opening)}</p><a href="${up}${t.guidePath}">${esc(t.hero.guide)}</a><p class="vd-offline">${esc(t.offlineLabel)}</p></div>
</section>
<section class="vd-campaign" id="features" aria-labelledby="campaign-title">
<div class="vd-story"><span id="features-title" aria-hidden="true"></span><span id="vesper-flight-journal-v1" aria-hidden="true"></span><span id="flight-notes"></span><span id="notes-title"></span><h2 id="campaign-title">${esc(t.campaignTitle)}</h2><p>${esc(t.sections.campaign.items[0][1])}</p><h3>${esc(t.sections.campaign.items[2][0])}</h3><p>${esc(t.sections.campaign.items[2][1])}</p><p class="vd-accent">${esc(t.retries)}</p></div>${shot(loc,2,up)}
</section>
<section class="vd-fleet" aria-labelledby="fleet-title"><div class="vd-story"><span id="results-title" aria-hidden="true"></span><h2 id="fleet-title">${esc(t.fleetTitle)}</h2><p>${esc(t.sections.campaign.items[1][1])}</p></div>${fleetShot(loc,up)}</section>
<section class="vd-contracts" id="modes" aria-labelledby="contracts-title"><div class="vd-story"><span id="modes-title" aria-hidden="true"></span><h2 id="contracts-title">${esc(t.contractTitle)}</h2><p>${esc(t.sections.modes.items[0][1])}</p><h3>${esc(t.sections.modes.items[1][0])}</h3><p>${esc(t.arcade)}</p></div></section>
<section class="vd-offer" id="free-and-purchases" aria-labelledby="offer-title"><span id="free-and-purchases-title" aria-hidden="true"></span><span id="questions" aria-hidden="true"></span><span id="questions-title" aria-hidden="true"></span><h2 id="offer-title">${esc(t.sections.offer.title)}</h2><p class="vd-lead">${esc(t.sections.offer.intro)}</p><dl class="vd-purchases">${t.purchases.map(([a,b])=>`<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl><p>${esc(t.prices)}</p><h3>${esc(t.sections.modes.items[2][0])}</h3><p>${esc(t.sections.modes.items[2][1])}</p><p>${esc(t.save)}</p>${stores}</section>
<section class="vd-help" id="contact" aria-labelledby="contact-title"><h2 id="contact-title">${esc(t.supportTitle)}</h2><p>${esc(t.supportIntro)}</p>
<form class="support-form" action="/api/contact" method="POST" data-sending="${esc(ui.formSending)}" data-success="${esc(ui.formSuccess)}" data-error="${esc(ui.formError)}">
<input type="hidden" name="app" value="Vesper Drift"><input type="hidden" name="_subject" value="Vesper Drift support request">
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
<p class="form-note">${esc(FORM_NOTE[loc.key])}</p></section>
</main>
<footer class="vd-footer"><span id="more-apps" aria-hidden="true"></span><span id="more-apps-title" aria-hidden="true"></span><p>Vesper Drift. ${esc(t.footer)}</p><nav aria-label="${esc(ui.legalNav)}"><a href="${privacy}">${esc(ui.privacy)}</a><a href="#contact">${esc(ui.support)}</a><a href="https://bnjdpn.com/">${esc(t.otherApps)}</a></nav><small>Apple and the Apple logo are trademarks of Apple Inc. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</small></footer>
<script src="${up}assets/site.js" defer></script>

</body></html>`;
}
