// Renders the Petites Gouttes "freezer drawer" landing page for one locale.
// Pure function of copy.mjs + content/product-sites (petites-gouttes.mjs, ui.mjs,
// form-note.mjs): used by build.mjs and by scripts/check-antitemplate.mjs.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import copy from './copy.mjs';
import product from '../../../content/product-sites/petites-gouttes.mjs';
import { UI, LOCALE_NAMES } from '../../../content/product-sites/ui.mjs';
import { FORM_NOTE } from '../../../content/product-sites/form-note.mjs';

export const ORIGIN = 'https://bnjdpn.com/petites-gouttes/';
export const APP_STORE = `https://apps.apple.com/app/id${product.appStoreId}?ct=petitesgouttes_web_drawer_20261027&mt=8`;
export const PLAY = product.playUrl;
export const LOCALES = [
  { code: 'en-US', key: 'en', copy: 'en', dir: '', og: 'en_US', play: ['en', 'Get it on Google Play'] },
  { code: 'en-GB', key: 'en-GB', copy: 'gb', dir: 'en-GB/', og: 'en_GB', play: ['en', 'Get it on Google Play'] },
  { code: 'fr-FR', key: 'fr', copy: 'fr', dir: 'fr-FR/', og: 'fr_FR', play: ['fr', 'Disponible sur Google Play'] },
];
// Stylesheet URL carries its content hash: Pages serves CSS with max-age=14400.
const CSS_VERSION = createHash('sha256').update(readFileSync(new URL('./drawer.css', import.meta.url))).digest('hex').slice(0, 10);
const RELATED = [['Petites Bouchées', 'petites-bouchees', 'bouchees'], ['Petites Nuits', 'petites-nuits', 'nuits'], ['Petites Dents', 'petites-dents', 'dents']];
// Where each numbered pin sits on the screenshot, in % of its width and height.
const PINS = {
  add: () => [[2.5, 21], [2.5, 38.6], [2.5, 62.7], [2.5, 74.8]],
  // The storage badge is longer in French (Congélateur) than in English (Freezer).
  stock: key => [[key === 'fr' ? 61 : 75, 31.6], [2.5, 37.3], [2.5, 42.5], [44.5, 42.5], [44.5, 48]],
  dashboard: () => [[2.5, 22], [2.5, 33.5], [2.5, 51.5], [2.5, 70.5]],
};
const SIZES = { full: '(max-width: 899px) 78vw, 320px', pair: '(max-width: 899px) 78vw, 270px' };

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const merge = (a, b) => {
  if (!b) return a;
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = v && typeof v === 'object' && !Array.isArray(v) ? merge(a[k] || {}, v) : v;
  return out;
};

function screen(loc, name, alt, up, { pins = [], size = 'full', eager = false, cls = 'screen' } = {}) {
  const base = `${up}assets/drawer/${loc.code}/${name}`;
  const sizes = SIZES[size];
  const marks = pins.map(([x, y], i) => `<span class="pin" style="--x:${x}%;--y:${y}%" aria-hidden="true">${i + 1}</span>`).join('');
  return `<figure class="${cls}"><picture><source type="image/avif" srcset="${base}-440.avif 440w, ${base}-880.avif 880w" sizes="${sizes}"><img src="${base}-880.webp" srcset="${base}-440.webp 440w, ${base}-880.webp 880w" sizes="${sizes}" width="880" height="1912" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>${marks}</figure>`;
}

export function render(loc) {
  const p = merge(product.locales.en, loc.key === 'en' ? null : product.locales[loc.key]);
  const t = copy[loc.copy];
  const ui = UI[loc.key === 'fr' ? 'fr' : 'en'];
  const S = p.sections;
  const C = t.chapters;
  const up = loc.dir ? '../' : '';
  const self = ORIGIN + loc.dir;
  const privacy = `${ORIGIN}${loc.code}/privacy`;
  const guide = ORIGIN + product.guides[loc.code];
  const hreflang = LOCALES.map(l => `<link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${l.dir}">`).join('')
    + `<link rel="alternate" hreflang="x-default" href="${ORIGIN}">`;
  const ogImg = `${ORIGIN}assets/drawer/og-${loc.key === 'fr' ? 'fr' : 'en'}.jpg`;
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Person', '@id': 'https://bnjdpn.com/#benjamin-dupin', name: 'Benjamin Dupin', url: 'https://bnjdpn.com/', sameAs: ['https://apps.apple.com/fr/developer/benjamin-dupin/id1871474236', 'https://play.google.com/store/apps/developer?id=Benjamin+Dupin'] },
    { '@type': 'SoftwareApplication', '@id': `${ORIGIN}#software`, name: 'Petites Gouttes', description: p.description, url: ORIGIN, image: ogImg, applicationCategory: product.applicationCategory, operatingSystem: product.operatingSystem, offers: { '@type': 'Offer', price: '0', priceCurrency: product.currency[loc.code] }, author: { '@id': 'https://bnjdpn.com/#benjamin-dupin' }, installUrl: [APP_STORE, PLAY] },
    { '@type': 'WebPage', '@id': `${self}#webpage`, url: self, name: p.title, description: p.description, inLanguage: loc.code, about: { '@id': `${ORIGIN}#software` } },
  ] };
  const stores = `<div class="stores"><a class="store-badge" href="${esc(APP_STORE)}" rel="external"><img src="${up}assets/app-store-badges/${loc.code}.svg" width="144" height="48" alt="${esc(ui.badgeAlt)}"></a><a class="store-badge" href="${esc(PLAY)}" rel="external"><img src="/assets/badges/google-play/${loc.play[0]}.webp" width="162" height="48" alt="${esc(loc.play[1])}"></a></div>`;
  const langs = LOCALES.map(l => `<a href="${ORIGIN}${l.dir}" hreflang="${l.code}" lang="${l.code}"${l.code === loc.code ? ' aria-current="page"' : ''}>${esc(LOCALE_NAMES[l.code])}</a>`).join('');

  const D = t.drawer;
  const ml = D.bags.map(([v]) => parseFloat(v));
  const max = Math.max(...ml);
  const bags = D.bags.map(([vol, date], i) => `<div class="bag${i === 0 ? ' bag-next' : ''}" style="--fill:${Math.round(ml[i] / max * 100)}%;--i:${i}">${i === 0 ? `<span class="next-tag">${esc(D.next)}</span>` : ''}<span class="bag-zip"></span><span class="bag-write"><b>${esc(vol.replace(/\s*(mL|fl oz)$/, ''))}</b><i>${esc(vol.match(/(mL|fl oz)$/)[1])}</i><small>${esc(date)}</small></span><span class="bag-milk"></span></div>`).join('');
  const drawer = `<figure class="drawer-fig"><div class="drawer" role="img" aria-label="${esc(`${D.label} ${D.front}. ${D.next}: ${D.bags[0].join(', ')}.`)}"><div class="bags">${bags}</div><div class="drawer-front"><span class="drawer-tape">${esc(D.front)}</span></div></div><figcaption>${esc(D.caption)}</figcaption></figure>`;

  const chapter = (id, side, c, shotName, extra = '') => `<article class="chapter" data-side="${side}"${id ? ` id="${id}"` : ''}>
<div class="chapter-grid">
${screen(loc, shotName, c.alt, up, { pins: PINS[shotName](loc.key) })}
<div class="chapter-text">
<p class="tape">${esc(c.tag)}</p>
<h2>${esc(c.title)}</h2>
${c.body.map(x => `<p>${esc(x)}</p>`).join('')}
<ol class="legend">${c.pins.map((x, i) => `<li><span class="num" aria-hidden="true">${i + 1}</span><span>${esc(x)}</span></li>`).join('')}</ol>
${extra}
</div>
</div>
</article>`;

  const care = S.daycare;
  const sticker = `<div class="sticker" aria-hidden="true"><b>${esc(C.care.sticker[0])}</b>${C.care.sticker.slice(1).map(x => `<span>${esc(x)}</span>`).join('')}</div>`;
  const packCols = S.offer.plans.map((pl, i) => `<div class="pack-col${i ? ' pack-paid' : ''}"><h3>${esc(pl.title)}</h3><ul>${pl.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('');
  const cats = ui.categories.map((c, i) => `<option value="${esc(ui.categoryValues[i])}">${esc(c)}</option>`).join('');

  return `<!doctype html>
<html lang="${loc.code}" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="theme-color" content="#eef5f8">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${self}">
${hreflang}
<meta name="apple-itunes-app" content="app-id=${product.appStoreId}">
<link rel="icon" href="${up}assets/app-icon.png">
<link rel="apple-touch-icon" href="${up}assets/app-icon-512.png">
<link rel="manifest" href="${up}site.webmanifest">
<link rel="preload" href="${up}assets/drawer/fonts/recursive-latin-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${up}assets/drawer/drawer.css?v=${CSS_VERSION}">
<meta name="author" content="Benjamin Dupin">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Petites Gouttes">
<meta property="og:locale" content="${loc.og}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${self}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(t.h1)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${ogImg}">
<meta name="twitter:image:alt" content="${esc(t.h1)}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<a class="skip" href="#main">${esc(ui.skip)}</a>
<header class="top">
<a class="home" href="./"><img src="${up}assets/app-icon.png" width="36" height="36" alt=""><span>Petites Gouttes</span></a>
<nav class="menu" aria-label="${esc(ui.navMain)}"><a href="#stock">${esc(S.stock.nav)}</a><a href="#daycare">${esc(C.care.tag)}</a><a href="#free-and-pro">${esc(S.offer.nav)}</a><a href="#contact">${esc(ui.support)}</a></nav>
<details class="langs"><summary>${esc(ui.language)}</summary><nav aria-label="${esc(ui.language)}">${langs}</nav></details>
</header>
<main id="main">
<section class="freezer-top" aria-labelledby="hero-title">
<div class="top-copy">
<p class="lead-in">${esc(p.hero.eyebrow)}</p>
<h1 id="hero-title">${esc(t.h1)}</h1>
<p class="intro">${esc(p.hero.intro)}</p>
${stores}
<p class="fine-print">${esc(p.hero.note)}</p>
</div>
${drawer}
</section>
<section class="journey" aria-label="${esc(S.stock.title)}">
${chapter('stock', 'left', C.pump, 'add')}
${chapter('', 'right', C.freezer, 'stock')}
${chapter('', 'left', C.feed, 'dashboard')}
</section>
<section class="care" id="daycare" aria-labelledby="care-title">
<p class="tape">${esc(C.care.tag)}</p>
<h2 id="care-title">${esc(care.title)}</h2>
<div class="care-grid">
<div class="care-shots">
${screen(loc, 'week', C.care.weekAlt, up, { size: 'pair', cls: 'screen screen-week' })}
${screen(loc, 'labels', C.care.labelsAlt, up, { size: 'pair', cls: 'screen screen-labels' })}
</div>
<div class="care-text">
${care.items.map(([h, x]) => `<h3>${esc(h)}</h3><p>${esc(x)}</p>`).join('')}
<figure class="sticker-fig">${sticker}<figcaption>${esc(C.care.stickerNote)}</figcaption></figure>
<p class="guide-link"><a href="${guide}">${esc(p.hero.guide)}</a></p>
</div>
</div>
</section>
<section class="pack" id="free-and-pro" aria-labelledby="offer-title">
<h2 id="offer-title">${esc(S.offer.title)}</h2>
<p class="pack-intro">${esc(S.offer.intro)}</p>
<div class="pack-cols">${packCols}</div>
${S.offer.notes.map(n => `<p class="pack-note">${esc(n)}</p>`).join('')}
<p class="on-device">${esc(S.offer.privacy)} <a href="${privacy}">${esc(S.offer.privacyLink)}</a></p>
</section>
<section class="outro" aria-labelledby="outro-title">
<h2 id="outro-title">${esc(t.outro)}</h2>
${stores}
</section>
<section class="siblings" aria-labelledby="siblings-title">
<h2 id="siblings-title">${esc(p.relatedTitle)}</h2>
<ul class="sibling-list">${RELATED.map(([n, slug, icon]) => `<li><a href="https://bnjdpn.com/${slug}/${loc.key === 'fr' ? 'fr-FR/' : ''}"><img src="${up}assets/apps/${icon}.png" width="48" height="48" alt="" loading="lazy" decoding="async"><span>${esc(n)}</span></a></li>`).join('')}</ul>
</section>
<section class="contact" id="contact" aria-labelledby="contact-title">
<div class="contact-head"><h2 id="contact-title">${esc(p.supportTitle)}</h2><p>${esc(p.supportIntro)}</p></div>
<form class="support-form" action="https://petites-forms.bnjdpn.com/contact" method="POST" data-sending="${esc(ui.formSending)}" data-success="${esc(ui.formSuccess)}" data-error="${esc(ui.formError)}">
<input type="hidden" name="app" value="Petites Gouttes"><input type="hidden" name="_subject" value="Petites Gouttes support request">
<label class="honeypot" aria-hidden="true">Leave empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>
<label><span>${esc(ui.labels.category)}</span><select name="category" required><option value="" selected disabled>—</option>${cats}</select></label>
<label><span>${esc(ui.labels.email)}</span><input type="email" name="email" autocomplete="email" required></label>
<label><span>${esc(ui.labels.appVersion)}</span><input type="text" name="app_version"></label>
<label><span>${esc(ui.labels.osVersion)}</span><input type="text" name="os_version"></label>
<label class="message-field"><span>${esc(ui.labels.message)}</span><textarea name="message" required></textarea></label>
<div class="cf-turnstile" data-sitekey="0x4AAAAAAFezChpqNmpql-I3" data-size="flexible" data-language="auto"></div>
<button type="submit">${esc(ui.send)}</button>
<p class="form-status" role="status" aria-live="polite"></p>
</form>
<p class="form-note">${esc(FORM_NOTE[loc.key === 'fr' ? 'fr' : 'en'])}</p>
</section>
</main>
<footer class="page-end">
<p><strong>Petites Gouttes</strong> ${esc(p.footer)}</p>
<nav aria-label="${esc(ui.legalNav)}"><a href="${privacy}">${esc(ui.privacy)}</a><a href="#contact">${esc(ui.support)}</a><a href="https://bnjdpn.com/">${esc(t.otherApps)}</a></nav>
<small>Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</small>
</footer>
<script src="${up}assets/site.js" defer></script>
<script>(function(){var s=["https://challenges.cloudflare.com/turnstile/v0/api.js"],d=0,f=document.querySelectorAll('.support-form');function l(){if(d)return;d=1;s.forEach(function(u){var e=document.createElement('script');e.src=u;e.async=true;document.head.appendChild(e)})}if(!f.length||!('IntersectionObserver' in window))return l();var o=new IntersectionObserver(function(x){if(x.some(function(y){return y.isIntersecting})){o.disconnect();l()}},{rootMargin:'800px 0px'});f.forEach(function(e){o.observe(e);e.addEventListener('focusin',l)})})()</script>
</body>
</html>
`;
}
