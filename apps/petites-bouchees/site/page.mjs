// Renders the Petites Bouchées "place setting" page for one locale.
// Pure function of copy.mjs + content/product-sites (ui, form note, store ids).
// Used by build.mjs and by scripts/check-antitemplate.mjs.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import copy from './copy.mjs';
import product from '../../../content/product-sites/petites-bouchees.mjs';
import { UI, LOCALE_NAMES } from '../../../content/product-sites/ui.mjs';
import { FORM_NOTE } from '../../../content/product-sites/form-note.mjs';

export const ORIGIN = 'https://bnjdpn.com/petites-bouchees/';
const CT = 'ct=petitesbouchees_web_couvert_20261027&mt=8';
const STORE = {
  'fr-FR': `https://apps.apple.com/fr/app/petites-bouch%C3%A9es-journal-b%C3%A9b%C3%A9/id6760203890?${CT}`,
  'en-US': `https://apps.apple.com/us/app/petites-bouch%C3%A9es-weaning-log/id6760203890?${CT}`,
  'en-GB': `https://apps.apple.com/gb/app/petites-bouch%C3%A9es-weaning-log/id6760203890?${CT}`,
};
export const PLAY = product.playUrl;
export const LOCALES = [
  { code: 'en-US', key: 'en', copy: 'en', dir: '', og: 'en_US', shots: 'en-US', play: ['en', 'Get it on Google Play'] },
  { code: 'en-GB', key: 'en-GB', copy: 'gb', dir: 'en-GB/', og: 'en_GB', shots: 'en-US', play: ['en', 'Get it on Google Play'] },
  { code: 'fr-FR', key: 'fr', copy: 'fr', dir: 'fr-FR/', og: 'fr_FR', shots: 'fr-FR', play: ['fr', 'Disponible sur Google Play'] },
];
const CSS_VERSION = createHash('sha256').update(readFileSync(new URL('./spoon.css', import.meta.url))).digest('hex').slice(0, 10);
const KIN = [['Petites Gouttes', 'petites-gouttes'], ['Petites Nuits', 'petites-nuits'], ['Petites Dents', 'petites-dents']];
const SWATCH = ['#4CAF50', '#FF9800', '#D4A574', '#E57373', '#64B5F6', '#FFD54F', '#BA68C8'];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function screen(loc, name, alt, caption, up, eager) {
  const base = `${up}assets/spoon/${loc.shots}/${name}`;
  const sizes = eager ? '(min-width: 960px) 460px, calc(100vw - 40px)' : '(min-width: 880px) 400px, calc(100vw - 40px)';
  const loading = eager ? 'eager' : 'lazy';
  const priority = eager ? ' fetchpriority="high"' : '';
  return `<figure class="bite-shot"><picture><source type="image/avif" srcset="${base}-440.avif 440w, ${base}-880.avif 880w" sizes="${sizes}"><img src="${base}-880.webp" srcset="${base}-440.webp 440w, ${base}-880.webp 880w" sizes="${sizes}" width="880" height="1912" alt="${esc(alt)}" loading="${loading}"${priority} decoding="async"></picture><figcaption class="bite-caption">${esc(caption)}</figcaption></figure>`;
}

const spoon = `<svg class="bite-svg" viewBox="0 0 640 280" width="640" height="280" aria-hidden="true" focusable="false">
<ellipse cx="188" cy="150" rx="156" ry="112" fill="#7A9B5A"/>
<ellipse cx="188" cy="150" rx="136" ry="94" fill="#E8832A"/>
<ellipse cx="176" cy="162" rx="88" ry="52" fill="#F2A24A"/>
<circle cx="150" cy="132" r="7" fill="#D06A1E"/>
<circle cx="214" cy="186" r="5" fill="#D06A1E"/>
<path d="M300 128c70-6 210-10 292 8 18 4 22 22 4 28-86 16-214 14-296-4-14-4-14-26 0-32z" fill="#C4844A"/>
<path d="M328 140c78-4 186-2 250 8" fill="none" stroke="#E2B27A" stroke-width="7" stroke-linecap="round"/>
</svg>`;

function stores(loc, ui, up) {
  return `<div class="bite-stores"><a class="bite-store" href="${esc(STORE[loc.code])}"><img src="${up}assets/app-store-badges/${loc.code}.svg" width="120" height="40" alt="${esc(ui.badgeAlt)}"></a><a class="bite-store" href="${esc(PLAY)}"><img src="/assets/badges/google-play/${loc.play[0]}.webp" width="162" height="48" alt="${esc(loc.play[1])}"></a></div>`;
}

function supportForm(ui) {
  const cats = ui.categories.map((c, i) => `<option value="${esc(ui.categoryValues[i])}">${esc(c)}</option>`).join('');
  return `<form class="support-form" action="https://petites-forms.bnjdpn.com/contact" method="POST" data-sending="${esc(ui.formSending)}" data-success="${esc(ui.formSuccess)}" data-error="${esc(ui.formError)}">
<input type="hidden" name="app" value="Petites Bouchées"><input type="hidden" name="_subject" value="Petites Bouchées support request">
<label class="honeypot" aria-hidden="true">Leave empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>
<label><span>${esc(ui.labels.category)}</span><select name="category" required><option value="" selected disabled>—</option>${cats}</select></label>
<label><span>${esc(ui.labels.email)}</span><input type="email" name="email" autocomplete="email" required></label>
<label><span>${esc(ui.labels.appVersion)}</span><input type="text" name="app_version"></label>
<label><span>${esc(ui.labels.osVersion)}</span><input type="text" name="os_version"></label>
<label class="message-field"><span>${esc(ui.labels.message)}</span><textarea name="message" required></textarea></label>
<div class="cf-turnstile" data-sitekey="0x4AAAAAAFezChpqNmpql-I3" data-size="flexible" data-language="auto"></div>
<button type="submit">${esc(ui.send)}</button>
<p class="form-status" role="status" aria-live="polite"></p>
</form>`;
}

export function render(loc) {
  const t = copy[loc.copy];
  const ui = UI[loc.key === 'fr' ? 'fr' : 'en'];
  const up = loc.dir ? '../' : '';
  const self = ORIGIN + loc.dir;
  const privacy = `${ORIGIN}${loc.code}/privacy`;
  const guide = ORIGIN + product.guides[loc.code];
  const hreflang = LOCALES.map((l) => `<link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${l.dir}">`).join('')
    + `<link rel="alternate" hreflang="x-default" href="${ORIGIN}">`;
  const ogImg = `${ORIGIN}assets/spoon/og-${loc.key === 'fr' ? 'fr' : 'en'}.jpg`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Person', '@id': 'https://bnjdpn.com/#benjamin-dupin', name: 'Benjamin Dupin', url: 'https://bnjdpn.com/', sameAs: ['https://apps.apple.com/fr/developer/benjamin-dupin/id1871474236', 'https://play.google.com/store/apps/developer?id=Benjamin+Dupin'] },
      { '@type': 'SoftwareApplication', '@id': `${ORIGIN}#software`, name: 'Petites Bouchées', description: t.description, url: ORIGIN, image: ogImg, applicationCategory: product.applicationCategory, operatingSystem: 'iOS, Android', inLanguage: ['fr', 'en', 'es'], offers: { '@type': 'Offer', price: '0', priceCurrency: product.currency[loc.code] }, author: { '@id': 'https://bnjdpn.com/#benjamin-dupin' }, installUrl: [STORE[loc.code], PLAY] },
      { '@type': 'WebPage', '@id': `${self}#webpage`, url: self, name: t.title, description: t.description, inLanguage: loc.code, about: { '@id': `${ORIGIN}#software` } },
    ],
  };
  const langs = LOCALES.map((l) => `<a href="${ORIGIN}${l.dir}" hreflang="${l.code}" lang="${l.code}"${l.code === loc.code ? ' aria-current="page"' : ''}>${esc(LOCALE_NAMES[l.code])}</a>`).join('');
  const reacts = t.reacts.map((word, i) => `<li class="bite-react bite-react-${['yes', 'mid', 'no'][i]}">${esc(word)}</li>`).join('');
  const swatches = t.swatches.map((name, i) => `<li><span class="bite-swatch" style="--swatch:${SWATCH[i]}"></span>${esc(name)}</li>`).join('');
  const pdfs = t.pdfs.map(([name, text]) => `<h3>${esc(name)}</h3><p>${esc(text)}</p>`).join('');
  const free = t.freeItems.map((item) => `<li>${esc(item)}</li>`).join('');
  const paid = t.paidItems.map((item) => `<li>${esc(item)}</li>`).join('');
  const kin = KIN.map(([name, slug]) => `<li><a href="https://bnjdpn.com/${slug}/${loc.key === 'fr' ? 'fr-FR/' : ''}"><img src="/assets/icons/${slug}-128.webp" width="48" height="48" alt="" loading="lazy" decoding="async"><span>${esc(name)}</span></a></li>`).join('');
  const home = loc.key === 'fr' ? 'https://bnjdpn.com/fr/' : 'https://bnjdpn.com/';

  return `<!doctype html>
<html lang="${loc.code}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.description)}">
<meta name="theme-color" content="#FFF8EE">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${self}">
${hreflang}
<meta name="apple-itunes-app" content="app-id=${product.appStoreId}">
<link rel="icon" href="${up}assets/app-icon.png">
<link rel="apple-touch-icon" href="${up}assets/app-icon-512.png">
<link rel="manifest" href="${up}site.webmanifest">
<link rel="preload" href="${up}assets/spoon/fonts/baloo-2-latin-800-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${up}assets/spoon/spoon.css?v=${CSS_VERSION}">
<meta name="author" content="Benjamin Dupin">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Petites Bouchées">
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
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<a class="skip" href="#main">${esc(ui.skip)}</a>
<header class="bite-mast">
<a class="bite-brand" href="./"><img src="${up}assets/app-icon.png" width="36" height="36" alt=""><span>Petites Bouchées</span></a>
<nav class="bite-nav" aria-label="${esc(ui.navMain)}"><a href="#features">${esc(t.nav[0])}</a><a href="#taste">${esc(t.nav[1])}</a><a href="#foods">${esc(t.nav[2])}</a><a href="#handover">${esc(t.nav[3])}</a><a href="#contact">${esc(ui.support)}</a></nav>
<details class="bite-lang"><summary>${esc(ui.language)}</summary><nav aria-label="${esc(ui.language)}">${langs}</nav></details>
</header>
<main id="main">
<section class="bite-hero" id="features" aria-labelledby="hero-title">
<div class="bite-hero-top">
<h1 id="hero-title">${esc(t.h1)}</h1>
<p class="bite-lead">${esc(t.lead)}</p>
${stores(loc, ui, up)}
<p class="bite-fine">${esc(t.fine)}</p>
</div>
<div class="bite-stage">
<div class="bite-spoon" role="img" aria-label="${esc(t.spoonLabel)}">${spoon}<p class="bite-stamp">${esc(t.stamp)}</p></div>
${screen(loc, 'journal', t.journalAlt, t.journalCaption, up, true)}
</div>
<div class="bite-hero-more">
<h2 id="journal-title">${esc(t.journalTitle)}</h2>
${t.journalBody.map((p) => `<p>${esc(p)}</p>`).join('')}
</div>
</section>
<section class="bite-taste" id="taste" aria-labelledby="taste-title">
<div class="bite-split">
<div>
<h2 id="taste-title">${esc(t.tasteTitle)}</h2>
${t.tasteBody.map((p) => `<p>${esc(p)}</p>`).join('')}
<ul class="bite-reacts">${reacts}</ul>
<p class="bite-aside">${esc(t.tasteNote)}</p>
</div>
${screen(loc, 'taste', t.tasteAlt, t.tasteCaption, up)}
</div>
</section>
<section class="bite-foods" id="foods" aria-labelledby="foods-title">
<div class="bite-split">
<div>
<h2 id="foods-title">${esc(t.foodsTitle)}</h2>
${t.foodsBody.map((p) => `<p>${esc(p)}</p>`).join('')}
<ul class="bite-key">${swatches}</ul>
<p>${esc(t.allergens)}</p>
</div>
${screen(loc, 'foods', t.foodsAlt, t.foodsCaption, up)}
</div>
</section>
<section class="bite-handover" id="handover" aria-labelledby="hand-title">
<div class="bite-split">
<div>
<h2 id="hand-title">${esc(t.handTitle)}</h2>
${t.handBody.map((p) => `<p>${esc(p)}</p>`).join('')}
<div class="bite-pdfs">${pdfs}</div>
<p>${esc(t.handMore)}</p>
<p>${esc(t.transfer)}</p>
<p class="bite-guide"><a href="${guide}">${esc(t.guide)}</a></p>
<p class="bite-aside">${esc(t.limit)}</p>
</div>
${screen(loc, 'handover', t.handAlt, t.handCaption, up)}
</div>
</section>
<section class="bite-offer" id="free-and-records" aria-labelledby="offer-title">
<h2 id="offer-title">${esc(t.offerTitle)}</h2>
<p class="bite-offer-lead">${esc(t.offerIntro)}</p>
<div class="bite-plans">
<div class="bite-free"><h3>${esc(t.freeTitle)}</h3><ul>${free}</ul></div>
<div class="bite-paid"><h3>${esc(t.paidTitle)}</h3><ul>${paid}</ul></div>
</div>
<p class="bite-price">${esc(t.price)}</p>
<p class="bite-price">${esc(t.kept)}</p>
<p class="bite-price">${esc(t.privacy)} <a href="${privacy}">${esc(t.privacyLink)}</a></p>
</section>
<section class="bite-close" aria-labelledby="close-title">
<h2 id="close-title">${esc(t.outro)}</h2>
${stores(loc, ui, up)}
</section>
<section class="bite-kin" aria-labelledby="kin-title">
<h2 id="kin-title">${esc(t.kinTitle)}</h2>
<ul class="bite-kin-list">${kin}</ul>
</section>
<section class="bite-help" id="contact" aria-labelledby="contact-title">
<h2 id="contact-title">${esc(t.supportTitle)}</h2>
<p>${esc(t.supportIntro)}</p>
${supportForm(ui)}
<p class="form-note">${esc(FORM_NOTE[loc.key === 'fr' ? 'fr' : 'en'])}</p>
</section>
</main>
<footer class="bite-foot">
<p><strong>Petites Bouchées</strong> ${esc(t.footer)}</p>
<nav aria-label="${esc(ui.legalNav)}"><a href="${privacy}">${esc(ui.privacy)}</a><a href="#contact">${esc(ui.support)}</a><a href="${home}">${esc(t.otherApps)}</a></nav>
<p class="bite-who"><a href="https://apps.apple.com/fr/developer/benjamin-dupin/id1871474236">${esc(t.onStore)}</a> <a href="https://play.google.com/store/apps/developer?id=Benjamin+Dupin">${esc(t.onPlay)}</a></p>
<small>Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</small>
</footer>
<script src="${up}assets/site.js" defer></script>
<script>(function(){var s=["https://challenges.cloudflare.com/turnstile/v0/api.js"],d=0,f=document.querySelectorAll('.support-form');function l(){if(d)return;d=1;s.forEach(function(u){var e=document.createElement('script');e.src=u;e.async=true;document.head.appendChild(e)})}if(!f.length||!('IntersectionObserver' in window))return l();var o=new IntersectionObserver(function(x){if(x.some(function(y){return y.isIntersecting})){o.disconnect();l()}},{rootMargin:'800px 0px'});f.forEach(function(e){o.observe(e);e.addEventListener('focusin',l)})})()</script>
</body>
</html>
`;
}
