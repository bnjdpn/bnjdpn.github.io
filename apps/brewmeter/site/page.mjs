import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import product from '../../../content/product-sites/BrewMeter.mjs';
import { UI, LOCALE_NAMES } from '../../../content/product-sites/ui.mjs';
import { copyFor } from '../../../scripts/product-site/render-home.mjs';
import { googlePlayBadge } from '../../../scripts/product-site/google-play.mjs';
import copy from './copy.mjs';

export const LOCALES = [
  { code: 'en-US', key: 'en', dir: '' }, { code: 'fr-FR', key: 'fr', dir: 'fr-FR/' },
  { code: 'de-DE', key: 'de', dir: 'de-DE/' }, { code: 'es-ES', key: 'es', dir: 'es-ES/' },
  { code: 'es-MX', key: 'es-MX', dir: 'es-MX/' }, { code: 'it', key: 'it', dir: 'it/' },
  { code: 'ja', key: 'ja', dir: 'ja/' }, { code: 'pt-BR', key: 'pt', dir: 'pt-BR/' },
];
const ORIGIN = 'https://bnjdpn.com/BrewMeter/';
const CSS_VERSION = createHash('sha256').update(readFileSync(new URL('./roast.css', import.meta.url))).digest('hex').slice(0, 10);
const e = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const APPLE_WIDTH = { 'en-US': 120, 'fr-FR': 127, 'de-DE': 120, 'es-ES': 120, 'es-MX': 120, it: 120, ja: 109, 'pt-BR': 120 };

export function render(loc) {
  const p = copyFor(product, loc.code), t = copy[loc.key], ui = UI[loc.key] ?? UI[loc.key.split('-')[0]];
  const { journal: j, estimate: est, offer: o } = p.sections;
  const up = loc.dir ? '../' : '', asset = `${up}assets/roast/`, self = ORIGIN + loc.dir;
  const country = { 'en-US': 'us', 'fr-FR': 'fr', 'de-DE': 'de', 'es-ES': 'es', 'es-MX': 'mx', it: 'it', ja: 'jp', 'pt-BR': 'br' }[loc.code];
  const apple = `https://apps.apple.com/${country}/app/id${product.appStoreId}`, play = googlePlayBadge(loc.code);
  const privacy = `${ORIGIN}${loc.code}/privacy`;
  const stores = `<div class="bm-stores"><a href="${apple}"><img src="${asset}badges/${loc.code}.svg" width="${APPLE_WIDTH[loc.code]}" height="40" alt="${e(ui.badgeAlt)}"></a><a href="${e(product.playUrl)}"><img src="${play.src}" width="135" height="40" alt="${e(play.alt)}"></a></div>`;
  const shot = (num, eager = false) => `<picture><source type="image/avif" srcset="${asset}${loc.code}/${num}-440.avif 440w, ${asset}${loc.code}/${num}-880.avif 880w" sizes="(min-width: 900px) 350px, 280px"><img src="${asset}${loc.code}/${num}-880.webp" srcset="${asset}${loc.code}/${num}-440.webp 440w, ${asset}${loc.code}/${num}-880.webp 880w" sizes="(min-width: 900px) 350px, 280px" width="880" height="1912" alt="${e(p.alts[Number(num) - 1])}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
  const paragraph = ([title, body]) => `<div class="bm-entry"><h3>${e(title)}</h3><p>${e(body)}</p></div>`;
  const langs = LOCALES.map(l => `<a href="${ORIGIN}${l.dir}" lang="${l.code}" hreflang="${l.code}"${l.code === loc.code ? ' aria-current="page"' : ''}>${e(LOCALE_NAMES[l.code])}</a>`).join('');
  const graph = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'BrewMeter', description: p.description, applicationCategory: product.applicationCategory, operatingSystem: product.operatingSystem, url: self, image: `${ORIGIN}assets/roast/og-${loc.key === 'fr' ? 'fr' : 'en'}.jpg`, offers: { '@type': 'Offer', price: '0', priceCurrency: product.currency[loc.code] }, author: { '@type': 'Person', name: 'Benjamin Dupin', url: 'https://bnjdpn.com/' }, sameAs: [apple, product.playUrl] };
  return `<!doctype html>
<html lang="${loc.code}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(p.title)}</title><meta name="description" content="${e(p.description)}"><meta name="theme-color" content="#14100c">
<link rel="canonical" href="${self}">${LOCALES.map(l => `<link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${l.dir}">`).join('')}<link rel="alternate" hreflang="x-default" href="${ORIGIN}">
<link rel="icon" href="${up}assets/app-icon.png"><link rel="apple-touch-icon" href="${up}assets/app-icon-512.png"><link rel="manifest" href="${up}site.webmanifest">
<link rel="preload" href="${asset}fonts/caprasimo-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset}roast.css?v=${CSS_VERSION}"><meta name="apple-itunes-app" content="app-id=${product.appStoreId}">
<meta property="og:type" content="website"><meta property="og:site_name" content="BrewMeter"><meta property="og:title" content="${e(p.title)}"><meta property="og:description" content="${e(p.description)}"><meta property="og:url" content="${self}"><meta property="og:locale" content="${(loc.code === 'it' ? 'it_IT' : loc.code === 'ja' ? 'ja_JP' : loc.code.replace('-', '_'))}"><meta property="og:image" content="${graph.image}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${e(t.h1)}"><meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(graph)}</script></head>
<body><a class="skip" href="#main">${e(ui.skip)}</a>
<header class="bm-top"><a class="bm-brand" href="${self}"><img src="${up}assets/app-icon.png" alt="" width="36" height="36">BrewMeter</a><nav class="bm-nav" aria-label="${e(ui.navMain)}"><a href="#features">${e(j.kicker)}</a><a href="#free-and-pro">Pro</a><a href="#contact">${e(ui.support)}</a></nav><details class="bm-language"><summary>${e(ui.language)}</summary><nav aria-label="${e(ui.language)}">${langs}</nav></details></header>
<main id="main"><section class="bm-hero" aria-labelledby="hero-title"><div class="bm-opening"><p class="bm-platform">${e(p.hero.eyebrow)}</p><h1 id="hero-title">${e(t.h1)}</h1><p class="bm-lead">${e(t.lead)}</p>${stores}<p class="bm-small">${e(p.hero.note)}</p></div><figure class="bm-first">${shot('01', true)}</figure></section>
<span id="features-title"></span><span id="field-notes"></span><span id="field-title"></span>
<section class="bm-journal" id="features" aria-labelledby="journal-title"><div class="bm-journal-copy"><h2 id="journal-title">${e(t.journal)}</h2>${j.items.slice(0, 3).map(paragraph).join('')}<a href="${up}${product.guides[loc.code]}">${e(p.hero.guide)}</a></div><figure class="bm-correction">${shot('02')}<figcaption>${e(j.captions[0])}</figcaption></figure></section>
<section class="bm-estimate" id="estimate" aria-labelledby="estimate-title"><h2 id="estimate-title">${e(t.estimate)}</h2><p class="bm-lead">${e(est.intro)}</p><div class="bm-reading">${est.items.map(paragraph).join('')}</div><p class="bm-caution">${e(est.note)}</p></section>
<section class="bm-history" aria-labelledby="history-title"><div><h2 id="history-title">${e(t.pro)}</h2>${paragraph(j.items[3])}<h3>${e(o.title)}</h3><p>${e(o.intro)}</p></div><figure class="bm-trends">${shot('03')}<figcaption>${e(j.captions[1])}</figcaption></figure></section>
<section class="bm-offer" id="free-and-pro" aria-labelledby="offer-title"><h2 id="offer-title">${e(t.offer)}</h2><div class="bm-plans">${o.plans.map(plan => `<div class="bm-plan"><h3>${e(plan.title)}</h3>${plan.price ? `<p class="bm-purchase">${e(plan.price)}</p>` : ''}<ul>${plan.items.map(s => `<li>${e(s)}</li>`).join('')}</ul></div>`).join('')}</div><p>${e(o.notes[1])}</p><p>${e(o.privacy)} <a href="${privacy}">${e(o.privacyLink)}</a></p>${stores}</section>
<span id="studio"></span><span id="studio-title"></span><span id="more-apps"></span><span id="related-title"></span>
<section class="bm-contact" id="contact" aria-labelledby="contact-title"><h2 id="contact-title">${e(p.supportTitle)}</h2><p>${e(p.supportIntro)}</p>
<form class="support-form" action="/api/contact" method="POST" data-sending="${e(ui.formSending)}" data-success="${e(ui.formSuccess)}" data-error="${e(ui.formError)}">
<input type="hidden" name="app" value="BrewMeter"><input type="hidden" name="_subject" value="BrewMeter support request"><label class="honeypot" aria-hidden="true">Leave empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>
<label><span>${e(ui.labels.category)}</span><select name="category" required><option value="" selected disabled>—</option>${ui.categories.map((c, i) => `<option value="${e(ui.categoryValues[i])}">${e(c)}</option>`).join('')}</select></label>
<label><span>${e(ui.labels.email)}</span><input type="email" name="email" autocomplete="email" required></label><label><span>${e(ui.labels.appVersion)}</span><input type="text" name="app_version"></label><label><span>${e(ui.labels.osVersion)}</span><input type="text" name="os_version"></label><label class="message-field"><span>${e(ui.labels.message)}</span><textarea name="message" required></textarea></label><div class="cf-turnstile" data-sitekey="0x4AAAAAAFb8sZbCULV4skmB" data-action="contact"></div><button type="submit">${e(ui.send)}</button><p class="form-status" role="status" aria-live="polite"></p></form><p class="form-note">${e(p.formNote)}</p></section></main>
<footer class="bm-footer"><p>BrewMeter — ${e(p.footer)}</p><nav aria-label="${e(ui.legalNav)}"><a href="${privacy}">${e(ui.privacy)}</a><a href="#contact">${e(ui.support)}</a><a href="https://bnjdpn.com/">Benjamin Dupin</a></nav><small>Apple and the Apple logo are trademarks of Apple Inc. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</small></footer>
<script src="${up}assets/site.js" defer></script></body></html>`;
}
