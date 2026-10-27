// Renders the MoveAtlas landing page (first version: "machine plate"; the drawn plate was removed on 2026-10-27) for one locale.
// Pure function of copy.mjs + shared form strings: used by build.mjs and by
// scripts/check-antitemplate.mjs (npm run check).
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import copy from './copy.mjs';
import { UI, LOCALE_NAMES } from '../../../content/product-sites/ui.mjs';
import { FORM_NOTE } from '../../../content/product-sites/form-note.mjs';
import { googlePlayBadge } from '../../../scripts/product-site/google-play.mjs';

export const ORIGIN = 'https://bnjdpn.com/MoveAtlas/';
export const PLAY = 'https://play.google.com/store/apps/details?id=com.bnjdpn.moveatlas';
const STORE = {
  'fr-FR': 'https://apps.apple.com/fr/app/moveatlas-exercices-en-salle/id6786200811',
  'en-US': 'https://apps.apple.com/us/app/moveatlas-gym-exercises/id6786200811',
};
const storeUrl = code => `${STORE[code] || 'https://apps.apple.com/app/id6786200811'}?pt=128480256&ct=moveatlas_web_plate_20261027&mt=8`;

export const LOCALES = [
  { code: 'en-US', key: 'en', dir: '', og: 'en_US' },
  { code: 'fr-FR', key: 'fr', dir: 'fr-FR/', og: 'fr_FR' },
  { code: 'de-DE', key: 'de', dir: 'de-DE/', og: 'de_DE' },
  { code: 'es-ES', key: 'es', dir: 'es-ES/', og: 'es_ES' },
];

const CSS_VERSION = createHash('sha256').update(readFileSync(new URL('./plate.css', import.meta.url))).digest('hex').slice(0, 10);
const RELATED = [['TempoReps', 'TempoReps'], ['PRVault', 'PRVault'], ['ColdLoad', 'ColdLoad']];
const LEGACY = ['atlas', 'atlas-1', 'atlas-2', 'atlas-3', 'bibliography-title', 'index-title', 'machine-guide-title', 'reglages-machines-salle', 'related-title'];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function shot(loc, name, alt, cap, up, eager = false) {
  const folder = loc.code === 'fr-FR' ? 'fr-FR' : 'en-US';
  const base = `${up}assets/plate/${folder}/${name}`;
  const sizes = '(max-width: 879px) 92vw, 400px';
  return `<figure class="mv-shot"><picture><source type="image/avif" srcset="${base}-440.avif 440w, ${base}-880.avif 880w" sizes="${sizes}"><img src="${base}-880.webp" srcset="${base}-440.webp 440w, ${base}-880.webp 880w" sizes="${sizes}" width="880" height="1912" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture><figcaption class="mv-cap">${esc(cap)}</figcaption></figure>`;
}

export function render(loc) {
  const t = copy[loc.code];
  const ui = UI[loc.key];
  const play = googlePlayBadge(loc.code);
  const up = loc.dir ? '../' : '';
  const self = ORIGIN + loc.dir;
  const privacy = `${ORIGIN}${loc.code}/privacy`;
  const apple = storeUrl(loc.code);
  const hreflang = LOCALES.map(l => `<link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${l.dir}">`).join('')
    + `<link rel="alternate" hreflang="en" href="${ORIGIN}"><link rel="alternate" hreflang="fr" href="${ORIGIN}fr-FR/"><link rel="alternate" hreflang="x-default" href="${ORIGIN}">`;
  const ogImg = `${ORIGIN}assets/plate/og-${loc.key === 'fr' ? 'fr' : 'en'}.jpg`;
  const folder = loc.code === 'fr-FR' ? 'fr-FR' : 'en-US';
  const lcp = `${up}assets/plate/${folder}/machine-880.avif`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Person', '@id': 'https://bnjdpn.com/#benjamin-dupin', name: 'Benjamin Dupin', url: 'https://bnjdpn.com/', sameAs: ['https://apps.apple.com/fr/developer/benjamin-dupin/id1871474236', 'https://play.google.com/store/apps/developer?id=Benjamin+Dupin'] },
      { '@type': 'SoftwareApplication', '@id': `${ORIGIN}#software`, name: 'MoveAtlas', description: t.description, url: ORIGIN, image: ogImg, applicationCategory: 'HealthApplication', operatingSystem: 'iOS, Android', offers: { '@type': 'Offer', price: '0', priceCurrency: loc.code === 'en-US' ? 'USD' : 'EUR' }, author: { '@id': 'https://bnjdpn.com/#benjamin-dupin' }, installUrl: [apple, PLAY], downloadUrl: apple },
      { '@type': 'WebPage', '@id': `${self}#webpage`, url: self, name: t.title, description: t.description, inLanguage: loc.code, about: { '@id': `${ORIGIN}#software` } },
    ],
  };
  const appleBox = loc.code === 'fr-FR' ? [152, 48] : [144, 48];
  const stores = `<div class="mv-stores"><a class="mv-store" href="${esc(apple)}" rel="external"><img src="${up}assets/app-store-badges/${loc.code}.svg" width="${appleBox[0]}" height="${appleBox[1]}" alt="${esc(ui.badgeAlt)}"></a><a class="mv-store" href="${esc(PLAY)}" rel="external"><img src="${play.src}" width="${play.width}" height="${play.height}" alt="${esc(play.alt)}"></a></div>`;
  const langs = LOCALES.map(l => `<a href="${ORIGIN}${l.dir}" hreflang="${l.code}" lang="${l.code}"${l.code === loc.code ? ' aria-current="page"' : ''}>${esc(LOCALE_NAMES[l.code])}</a>`).join('');
  const cats = ui.categories.map((c, i) => `<option value="${esc(ui.categoryValues[i])}">${esc(c)}</option>`).join('');
  const legacy = LEGACY.map(id => `<span class="mv-legacy" id="${id}"></span>`).join('');
  const relatedDir = loc.code === 'fr-FR' ? 'fr-FR/' : '';

  // Opening: the title only; the visual is the real Machine screen next to it (no drawn plate).
  const head = `<div class="mv-head">
<h1 id="hero-title">${esc(t.h1)}</h1>
</div>`;

  return `<!doctype html>
<html lang="${loc.code}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.description)}">
<meta name="theme-color" content="#04060A">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${self}">
${hreflang}
<meta name="apple-itunes-app" content="app-id=6786200811">
<link rel="icon" href="${up}assets/app-icon.png">
<link rel="apple-touch-icon" href="${up}assets/app-icon-512.png">
<link rel="manifest" href="${up}site.webmanifest">
<link rel="preload" href="${up}assets/plate/fonts/sofia-sans-condensed-latin-800-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" as="image" href="${lcp}" imagesrcset="${up}assets/plate/${folder}/machine-440.avif 440w, ${lcp} 880w" imagesizes="(max-width: 879px) 92vw, 400px" type="image/avif" fetchpriority="high">
<link rel="stylesheet" href="${up}assets/plate/plate.css?v=${CSS_VERSION}">
<meta name="author" content="Benjamin Dupin">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MoveAtlas">
<meta property="og:locale" content="${loc.og}">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.description)}">
<meta property="og:url" content="${self}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(t.h1)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(t.title)}">
<meta name="twitter:description" content="${esc(t.description)}">
<meta name="twitter:image" content="${ogImg}">
<meta name="twitter:image:alt" content="${esc(t.h1)}">
<script type="application/ld+json">${JSON.stringify(ld).replaceAll('<', '\\u003c')}</script>
</head>
<body>
<a class="skip" href="#main">${esc(ui.skip)}</a>
<header class="mv-bar">
<a class="mv-word" href="./"><img src="${up}assets/app-icon.png" width="36" height="36" alt=""><span>MoveAtlas</span></a>
<nav class="mv-nav" aria-label="${esc(ui.navMain)}"><a href="#features">${esc(t.nav.find)}</a><a href="#steps">${esc(t.nav.read)}</a><a href="#workouts">${esc(t.nav.floor)}</a><a href="#free-and-pro">${esc(t.nav.offer)}</a><a href="#contact">${esc(ui.support)}</a></nav>
<details class="mv-lang"><summary>${esc(ui.language)}</summary><nav aria-label="${esc(ui.language)}">${langs}</nav></details>
</header>
<main id="main">
${legacy}
<section class="mv-open" id="machine-settings" aria-labelledby="hero-title">
<span class="mv-legacy" id="machine-settings-title"></span>
${head}
<div class="mv-pitch">
<p class="mv-intro">${esc(t.intro)}</p>
${stores}
</div>
${shot(loc, 'machine', t.machineAlt, t.machineCap, up, true)}
<p class="mv-fine">${esc(t.note)}</p>
</section>
<section class="mv-find" id="features" aria-labelledby="features-title">
<h2 id="features-title">${esc(t.findTitle)}</h2>
<p class="mv-query"><span class="mv-typed">${esc(t.findQuery)}</span><span class="mv-zone">${esc(t.findZone)}</span></p>
<p>${esc(t.findBody)}</p>
${shot(loc, 'search', t.findAlt, t.findCap, up)}
</section>
<section class="mv-read" id="steps" aria-labelledby="steps-title">
<div class="mv-read-copy">
<h2 id="steps-title">${esc(t.readTitle)}</h2>
<dl class="mv-facts">${t.readItems.map(([term, text]) => `<div><dt>${esc(term)}</dt><dd>${esc(text)}</dd></div>`).join('')}</dl>
</div>
<div class="mv-read-shot">
${shot(loc, 'steps', t.readAlt, t.readCap, up)}
</div>
</section>
<section class="mv-floor" id="workouts" aria-labelledby="workouts-title">
<h2 id="workouts-title">${esc(t.floorTitle)}</h2>
<ul class="mv-stats">${t.floorBits.map(bit => `<li>${esc(bit)}</li>`).join('')}</ul>
<p>${esc(t.floorBody)}</p>
${shot(loc, 'session', t.floorAlt, t.floorCap, up)}
<p class="mv-more">${esc(t.floorMore)}</p>
</section>
<section class="mv-locker" aria-labelledby="locker-title">
<h2 id="locker-title">${esc(t.lockerTitle)}</h2>
<p>${esc(t.lockerBody)}</p>
<ol class="mv-index">${t.lockerRows.map(([name, detail]) => `<li><span>${esc(name)}</span><span>${esc(detail)}</span></li>`).join('')}</ol>
${shot(loc, 'locker', t.lockerAlt, t.lockerCap, up)}
</section>
<section class="mv-buy" id="free-and-pro" aria-labelledby="free-and-pro-title">
<h2 id="free-and-pro-title">${esc(t.offerTitle)}</h2>
<p class="mv-offer-lead">${esc(t.offerIntro)}</p>
<div class="mv-split">
<div class="mv-free"><h3>${esc(t.freeTitle)}</h3><ul>${t.freeItems.map(item => `<li>${esc(item)}</li>`).join('')}</ul></div>
<div class="mv-pro"><h3>${esc(t.proTitle)}</h3><p class="mv-once">${esc(t.proPrice)}</p><ul>${t.proItems.map(item => `<li>${esc(item)}</li>`).join('')}</ul></div>
</div>
${t.offerNotes.map(n => `<p class="mv-note">${esc(n)}</p>`).join('')}
<p class="mv-note">${esc(t.privacy)} <a href="${privacy}">${esc(t.privacyLink)}</a></p>
</section>
<section class="mv-close" aria-labelledby="close-title">
<h2 id="close-title">${esc(t.closeTitle)}</h2>
${stores}
</section>
<section class="mv-kin" id="more-apps" aria-labelledby="more-apps-title">
<h2 id="more-apps-title">${esc(t.relatedTitle)}</h2>
<ul class="mv-kin-list">${RELATED.map(([name, slug]) => `<li><a href="https://bnjdpn.com/${slug}/${relatedDir}">${esc(name)}</a></li>`).join('')}</ul>
</section>
<section class="mv-help" id="contact" aria-labelledby="contact-title">
<div class="mv-help-copy"><h2 id="contact-title">${esc(t.supportTitle)}</h2><p>${esc(t.supportIntro)}</p></div>
<form class="support-form" action="/api/contact" method="POST" data-sending="${esc(ui.formSending)}" data-success="${esc(ui.formSuccess)}" data-error="${esc(ui.formError)}">
<input type="hidden" name="app" value="MoveAtlas"><input type="hidden" name="_subject" value="MoveAtlas support request">
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
</section>
</main>
<footer class="mv-foot">
<p><strong>MoveAtlas</strong> ${esc(t.footer)}</p>
<nav aria-label="${esc(ui.legalNav)}"><a href="${privacy}">${esc(ui.privacy)}</a><a href="#contact">${esc(ui.support)}</a><a href="https://bnjdpn.com/">${esc(t.otherApps)}</a></nav>
<small>Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</small>
</footer>
<script src="${up}assets/site.js" defer></script>
<script>(function(){var s=["https://challenges.cloudflare.com/turnstile/v0/api.js"],d=0,f=document.querySelectorAll('.support-form');function l(){if(d)return;d=1;s.forEach(function(u){var e=document.createElement('script');e.src=u;e.async=true;document.head.appendChild(e)})}if(!f.length||!('IntersectionObserver' in window))return l();var o=new IntersectionObserver(function(x){if(x.some(function(y){return y.isIntersecting})){o.disconnect();l()}},{rootMargin:'800px 0px'});f.forEach(function(e){o.observe(e);e.addEventListener('focusin',l)})})()</script>
</body>
</html>
`;
}
