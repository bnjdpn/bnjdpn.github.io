// Renders the LoadSense "24 hours" landing page for one locale.
// Pure function of copy.mjs + shared form strings: used by build.mjs and by
// scripts/check-antitemplate.mjs (npm run check).
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import copy from './copy.mjs';
import { UI, LOCALE_NAMES } from '../../../content/product-sites/ui.mjs';
import { FORM_NOTE } from '../../../content/product-sites/form-note.mjs';

export const ORIGIN = 'https://bnjdpn.com/LoadSense/';
export const APP_STORE = 'https://apps.apple.com/app/id6758211103?pt=128480256&ct=loadsense_web_day_20261027&mt=8';
export const LOCALES = [
  { code: 'en-US', key: 'en', dir: '', og: 'en_US', guide: 'en-US/understand-recovery-watch' },
  { code: 'fr-FR', key: 'fr', dir: 'fr-FR/', og: 'fr_FR', guide: 'fr-FR/comprendre-recuperation-watch' },
  { code: 'de-DE', key: 'de', dir: 'de-DE/', og: 'de_DE' },
  { code: 'es-ES', key: 'es', dir: 'es-ES/', og: 'es_ES' },
  { code: 'ja', key: 'ja', dir: 'ja/', og: 'ja_JP' },
];
// Real screenshots: today/measures/week are native per locale; journal,
// trends and watch exist natively in en-US and fr-FR only.
const NATIVE_EXTRA = new Set(['en-US', 'fr-FR']);
const DIMS = { today: [880, 1912], measures: [880, 1912], week: [880, 1912], journal: [880, 1912], trends: [880, 1912] };

// Stylesheet URL carries its content hash: Pages serves CSS with max-age=14400.
const CSS_VERSION = createHash('sha256').update(readFileSync(new URL('./day.css', import.meta.url))).digest('hex').slice(0, 10);

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function shot(loc, name, alt, up, cls, eager = false) {
  const folder = (name === 'journal' || name === 'trends' || name === 'watch') && !NATIVE_EXTRA.has(loc.code) ? 'en-US' : loc.code;
  const base = `${up}assets/day/${folder}/${name}`;
  if (name === 'watch') {
    return `<figure class="${cls} wrist"><picture><source type="image/avif" srcset="${base}-368.avif"><img src="${base}-368.webp" width="368" height="448" alt="${esc(alt)}" loading="lazy" decoding="async"></picture></figure>`;
  }
  const [w, h] = DIMS[name];
  const sizes = '(max-width: 760px) 74vw, 340px';
  return `<figure class="${cls}"><picture><source type="image/avif" srcset="${base}-440.avif 440w, ${base}-880.avif 880w" sizes="${sizes}"><img src="${base}-880.webp" srcset="${base}-440.webp 440w, ${base}-880.webp 880w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture></figure>`;
}

function tone(i) { return ['night', 'dawn', 'dawn', 'morning', 'noon', 'dusk', 'night'][i] || 'night'; }

export function render(loc) {
  const t = copy[loc.key];
  const ui = UI[loc.key];
  const up = loc.dir ? '../' : '';
  const self = ORIGIN + loc.dir;
  const privacy = `${ORIGIN}${loc.code}/privacy`;
  const terms = `${ORIGIN}${loc.code}/terms`;
  const hreflang = LOCALES.map(l => `<link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${l.dir}">`).join('')
    + `<link rel="alternate" hreflang="en" href="${ORIGIN}"><link rel="alternate" hreflang="fr" href="${ORIGIN}fr-FR/"><link rel="alternate" hreflang="x-default" href="${ORIGIN}">`;
  const ogImg = `${ORIGIN}assets/day/og-${loc.key === 'fr' ? 'fr' : 'en'}.jpg`;
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Person', '@id': 'https://bnjdpn.com/#benjamin-dupin', name: 'Benjamin Dupin', url: 'https://bnjdpn.com/', sameAs: ['https://apps.apple.com/fr/developer/benjamin-dupin/id1871474236'] },
    { '@type': 'SoftwareApplication', '@id': `${ORIGIN}#software`, name: 'LoadSense', description: t.description, url: ORIGIN, image: ogImg, applicationCategory: 'HealthApplication', operatingSystem: 'iOS 18.0 or later, watchOS 11.0 or later', offers: { '@type': 'Offer', price: '0', priceCurrency: { en: 'USD', ja: 'JPY' }[loc.key] || 'EUR', url: APP_STORE }, downloadUrl: APP_STORE, sameAs: ['https://apps.apple.com/app/id6758211103'], author: { '@id': 'https://bnjdpn.com/#benjamin-dupin' }, inLanguage: loc.code },
    { '@type': 'WebPage', '@id': `${self}#webpage`, url: self, name: t.title, description: t.description, inLanguage: loc.code, about: { '@id': `${ORIGIN}#software` } },
  ] };
  const badge = (cls) => `<a class="${cls}" href="${esc(APP_STORE)}" rel="external"><img src="${up}assets/app-store-badges/${loc.code}.svg" width="120" height="40" alt="${esc(ui.badgeAlt)}"></a>`;
  const langs = LOCALES.map(l => `<a href="${ORIGIN}${l.dir}" hreflang="${l.code}" lang="${l.code}"${l.code === loc.code ? ' aria-current="page"' : ''}>${esc(LOCALE_NAMES[l.code])}</a>`).join('');
  const [h, m] = ['07', '51'];

  const stops = t.stops.map((s, i) => {
    const id = `t${s.time.replace(/\D/g, '')}`;
    let media = '';
    if (s.signals) media = `<div class="signals"><h3>${esc(s.signalsTitle)}</h3><ul>${s.signals.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
    if (s.media2) media = `<div class="pair">${shot(loc, s.media, s.alt, up, 'screen')}${shot(loc, s.media2, s.alt2, up, 'screen lift')}</div>`;
    // The Today screen is already the hero shot: its stop shows the screen's own words instead.
    const heroEcho = s.media === 'today';
    const quote = s.quote ? `<blockquote class="said${heroEcho ? ' big' : ''}"><p>${esc(s.quote)}</p><footer>${esc(s.quoteSource)}</footer></blockquote>` : '';
    if (heroEcho) media = quote;
    else if (s.media && !s.media2) media = shot(loc, s.media, s.alt, up, 'screen');
    const hasMedia = Boolean(s.media || s.signals);
    const parts = s.time.split(' ');
    const clock = parts.pop();
    const dayName = parts.length ? `<span class="day-name">${esc(parts.join(' '))}</span>` : '';
    return `<li class="stop ${tone(i)}${hasMedia ? '' : ' bare'}" id="${id}">
<p class="hour"><time>${dayName}${esc(clock)}</time></p>
<div class="words"><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p>${heroEcho ? '' : quote}</div>
${hasMedia ? `<div class="media">${media}</div>` : ''}
</li>`;
  }).join('\n');

  const plans = t.plans.map((p, i) => `<div class="tier${i ? ' pro' : ''}"><h3>${esc(p.title)}</h3><ul>${p.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('');
  const cats = ui.categories.map((c, i) => `<option value="${esc(ui.categoryValues[i])}">${esc(c)}</option>`).join('');

  return `<!doctype html>
<html lang="${loc.code}" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.description)}">
<meta name="theme-color" content="#0f1c25">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${self}">
${hreflang}
<meta name="apple-itunes-app" content="app-id=6758211103">
<link rel="icon" href="${up}assets/app-icon.png">
<link rel="apple-touch-icon" href="${up}assets/app-icon.png">
<link rel="manifest" href="${up}site.webmanifest">
<link rel="preload" href="${up}assets/day/fonts/big-shoulders-display-latin-800-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${up}assets/day/fonts/atkinson-hyperlegible-next-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${up}assets/day/day.css?v=${CSS_VERSION}">
<meta name="author" content="Benjamin Dupin">
<meta property="og:type" content="website">
<meta property="og:site_name" content="LoadSense">
<meta property="og:locale" content="${loc.og}">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.description)}">
<meta property="og:url" content="${self}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(t.hero.h1)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${ogImg}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<a class="skip" href="#main">${esc(ui.skip)}</a>
<header class="bar">
<a class="mark" href="./"><img src="${up}assets/app-icon.png" width="32" height="32" alt=""><span>LoadSense</span></a>
<nav class="jump" aria-label="${esc(ui.navMain)}"><a href="#day">${esc(t.nav.day)}</a><a href="#free-and-pro">${esc(t.nav.offer)}</a><a href="#contact">${esc(t.nav.support)}</a></nav>
<details class="tongue"><summary>${esc(ui.language)}</summary><nav aria-label="${esc(ui.language)}">${langs}</nav></details>
</header>
<main id="main">
<section class="dawnline" aria-labelledby="hero-title">
<p class="clock" role="img" aria-label="${esc(t.hero.clockLabel)}"><span data-h>${h}</span><span class="colon">:</span><span data-m>${m}</span></p>
<div class="opening">
<p class="lead">${esc(t.hero.lead)}</p>
<h1 id="hero-title">${esc(t.hero.h1)}</h1>
<p class="intro">${esc(t.hero.intro)}</p>
<div class="get">${badge('store')}</div>
<p class="fine">${esc(t.hero.note)}</p>
</div>
${shot(loc, 'today', t.stops[1].alt, up, 'screen hero-shot', true)}
</section>
<section class="day" id="day" aria-labelledby="day-title">
<h2 id="day-title" class="visually-hidden">${esc(t.dayTitle)}</h2>
<span id="features" class="anchor" aria-hidden="true"></span>
<ol class="stops">
${stops}
</ol>
</section>
<section class="home-data" aria-labelledby="privacy-title">
<h2 id="privacy-title">${esc(t.privacyTitle)}</h2>
<p>${esc(t.privacy)}</p>
<p><a href="${privacy}">${esc(t.privacyLink)}</a></p>
</section>
<section class="offer" id="free-and-pro" aria-labelledby="offer-title">
<h2 id="offer-title">${esc(t.offerTitle)}</h2>
<p class="offer-intro">${esc(t.offerIntro)}</p>
<div class="tiers">${plans}</div>
${t.notes.map(n => `<p class="small">${esc(n)}</p>`).join('')}
</section>
<section class="tomorrow" aria-labelledby="end-title">
<h2 id="end-title">${esc(t.endTitle)}</h2>
${badge('store')}
<p class="small">${esc(t.limits)}</p>
${loc.guide ? `<p class="small"><a href="${ORIGIN}${loc.guide}">${esc(t.guide)}</a></p>` : ''}
</section>
<section class="help" id="contact" aria-labelledby="contact-title">
<div class="help-head"><h2 id="contact-title">${esc(t.supportTitle)}</h2><p>${esc(t.supportIntro)}</p></div>
<form class="support-form" action="/api/contact" method="POST" data-sending="${esc(ui.formSending)}" data-success="${esc(ui.formSuccess)}" data-error="${esc(ui.formError)}">
<input type="hidden" name="app" value="LoadSense"><input type="hidden" name="_subject" value="LoadSense support request">
<label class="honeypot" aria-hidden="true">Leave empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>
<label><span>${esc(ui.labels.category)}</span><select name="category" required><option value="" selected disabled>—</option>${cats}</select></label>
<label><span>${esc(ui.labels.email)}</span><input type="email" name="email" autocomplete="email" required></label>
<label><span>${esc(ui.labels.appVersion)}</span><input type="text" name="app_version"></label>
<label><span>${esc(ui.labels.osVersion)}</span><input type="text" name="os_version"></label>
<label class="message-field"><span>${esc(ui.labels.message)}</span><textarea name="message" required></textarea></label>
<div class="cf-turnstile" data-sitekey="0x4AAAAAAFb8sZbCULV4skmB" data-action="contact"></div>
<button type="submit">${esc(ui.send)}</button>
<p class="form-status" role="status" aria-live="polite"></p>
<p class="form-note small">${esc(FORM_NOTE[loc.key])}</p>
</form>
</section>
</main>
<footer class="foot">
<p><strong>LoadSense</strong> ${esc(t.footer)}</p>
<nav aria-label="${esc(ui.legalNav)}"><a href="${privacy}">${esc(ui.privacy)}</a><a href="${terms}">${esc(ui.terms)}</a><a href="#contact">${esc(ui.support)}</a><a href="https://bnjdpn.com/">${esc(t.otherApps)}</a></nav>
<small>Apple, the Apple logo and Apple Watch are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc.</small>
</footer>
<script src="${up}assets/site.js" defer></script>
<script>(function(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var m=document.querySelector('[data-m]');if(!m)return;var v=47;m.textContent=String(v);var c=document.querySelector('.clock');c.classList.add('ticking');var i=setInterval(function(){v++;m.textContent=String(v);if(v>=51){clearInterval(i);c.classList.remove('ticking')}},260)})()</script>
</body>
</html>
`;
}
