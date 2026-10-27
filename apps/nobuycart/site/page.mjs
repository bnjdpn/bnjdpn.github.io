// Renders the NoBuyCart page (first version: "counter slip"; the drawn paper slip was removed on 2026-10-27) for one locale.
// Pure function of copy.mjs + content/product-sites: used by build.mjs and by
// scripts/check-antitemplate.mjs.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import copy from './copy.mjs';
import product from '../../../content/product-sites/NoBuyCart.mjs';
import { UI, LOCALE_NAMES } from '../../../content/product-sites/ui.mjs';
import { FORM_NOTE } from '../../../content/product-sites/form-note.mjs';
import { googlePlayBadge } from '../../../scripts/product-site/google-play.mjs';

export const ORIGIN = 'https://bnjdpn.com/NoBuyCart/';
const CT = 'ct=nobuycart_web_slip_20261027&mt=8';
const APPLE = {
  'en-US': `https://apps.apple.com/us/app/nobuycart-pause-before-buying/id6778049102?${CT}`,
  'fr-FR': `https://apps.apple.com/fr/app/nobuycart-pause-avant-achat/id6778049102?${CT}`,
};
const storeFor = (code) => APPLE[code] || `https://apps.apple.com/app/id${product.appStoreId}?${CT}`;
export const PLAY = product.playUrl;

export const LOCALES = [
  { code: 'en-US', key: 'en', dir: '', og: 'en_US' },
  { code: 'fr-FR', key: 'fr', dir: 'fr-FR/', og: 'fr_FR' },
  { code: 'de-DE', key: 'de', dir: 'de-DE/', og: 'de_DE' },
  { code: 'es-MX', key: 'es', dir: 'es-MX/', og: 'es_MX' },
  { code: 'ja', key: 'ja', dir: 'ja/', og: 'ja_JP' },
  { code: 'ko', key: 'ko', dir: 'ko/', og: 'ko_KR' },
  { code: 'pt-BR', key: 'pt', dir: 'pt-BR/', og: 'pt_BR' },
  { code: 'zh-Hans', key: 'zh-Hans', dir: 'zh-Hans/', og: 'zh_CN' },
  { code: 'zh-Hant', key: 'zh-Hant', dir: 'zh-Hant/', og: 'zh_TW' },
];
const BADGE_W = { 'en-US': 120, 'fr-FR': 127, 'de-DE': 120, 'es-MX': 120, ja: 109, ko: 130, 'pt-BR': 120, 'zh-Hans': 109, 'zh-Hant': 109 };
const CSS_VERSION = createHash('sha256').update(readFileSync(new URL('./slip.css', import.meta.url))).digest('hex').slice(0, 10);
const RELATED = [['NeatShift', 'NeatShift', 'neatshift'], ['FastZen', 'FastZen', 'fastzen']];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function privacyUrl(code) {
  if (code === 'zh-Hans') return `${ORIGIN}privacy`;
  return `${ORIGIN}${code}/privacy`;
}
function shotFolder(loc, name) {
  if (loc.code === 'fr-FR' && (name === 'list' || name === 'history')) return 'fr-FR';
  return 'en-US';
}

export function render(loc) {
  const p = product.locales[loc.key];
  const t = copy[loc.key];
  const ui = UI[loc.key];
  const S = p.sections;
  const up = loc.dir ? '../' : '';
  const self = ORIGIN + loc.dir;
  const privacy = privacyUrl(loc.code);
  const store = storeFor(loc.code);
  const play = googlePlayBadge(loc.code);
  const playW = Math.round(40 * play.width / play.height);
  const hreflang = LOCALES.map((l) => `<link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${l.dir}">`).join('')
    + `<link rel="alternate" hreflang="en" href="${ORIGIN}"><link rel="alternate" hreflang="fr" href="${ORIGIN}fr-FR/"><link rel="alternate" hreflang="pt" href="${ORIGIN}pt-BR/">`
    + `<link rel="alternate" hreflang="x-default" href="${ORIGIN}">`;
  const ogImg = `${ORIGIN}assets/slip/og-${loc.key === 'fr' ? 'fr' : 'en'}.jpg`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Person', '@id': 'https://bnjdpn.com/#benjamin-dupin', name: 'Benjamin Dupin', url: 'https://bnjdpn.com/', sameAs: ['https://apps.apple.com/fr/developer/benjamin-dupin/id1871474236', 'https://play.google.com/store/apps/developer?id=Benjamin+Dupin'] },
      { '@type': 'SoftwareApplication', '@id': `${ORIGIN}#software`, name: 'NoBuyCart', description: t.meta, url: ORIGIN, image: ogImg, applicationCategory: product.applicationCategory, operatingSystem: 'iOS, Android', offers: { '@type': 'Offer', price: '0', priceCurrency: product.currency[loc.code] }, author: { '@id': 'https://bnjdpn.com/#benjamin-dupin' }, sameAs: [store.split('?')[0], PLAY] },
      { '@type': 'WebPage', '@id': `${self}#webpage`, url: self, name: p.title, description: t.meta, inLanguage: loc.code, about: { '@id': `${ORIGIN}#software` } },
    ],
  };
  const stores = `<div class="nbc-stores"><a href="${esc(store)}" rel="external"><img src="${up}assets/app-store-badges/${loc.code}.svg" width="${BADGE_W[loc.code]}" height="40" alt="${esc(ui.badgeAlt)}"></a><a href="${esc(PLAY)}" rel="external"><img src="${play.src}" width="${playW}" height="40" alt="${esc(play.alt)}"></a></div>`;
  const langs = LOCALES.map((l) => `<a href="${ORIGIN}${l.dir}" hreflang="${l.code}" lang="${l.code}"${l.code === loc.code ? ' aria-current="page"' : ''}>${esc(LOCALE_NAMES[l.code])}</a>`).join('');
  const picture = (name, alt, eager = false) => {
    const folder = shotFolder(loc, name);
    const foreign = folder === 'en-US' && loc.key !== 'en';
    const fullAlt = foreign ? `${alt} ${t.foreign}` : alt;
    const base = `${up}assets/slip/${folder}/${name}`;
    const sizes = eager ? '(max-width: 959px) 280px, 360px' : '(max-width: 1039px) 92vw, 420px';
    const load = eager ? 'eager' : 'lazy';
    const priority = eager ? ' fetchpriority="high"' : '';
    return { alt: fullAlt, html: `<picture><source type="image/avif" srcset="${base}-440.avif 440w, ${base}-880.avif 880w" sizes="${sizes}"><img src="${base}-880.webp" srcset="${base}-440.webp 440w, ${base}-880.webp 880w" sizes="${sizes}" width="880" height="1912" alt="${esc(fullAlt)}" loading="${load}" decoding="async"${priority}></picture>` };
  };
  const shot = (name, block, cls = 'nbc-shot', eager = false) => {
    const pic = picture(name, block.alt, eager);
    const cap = shotFolder(loc, name) === 'en-US' && loc.key !== 'en' ? `${block.cap} ${t.foreign}` : block.cap;
    return `<figure class="${cls}">${pic.html}<figcaption class="nbc-cap">${esc(cap)}</figcaption></figure>`;
  };
  const prose = (block) => `<div class="nbc-prose">${block.body.map((x) => `<p>${esc(x)}</p>`).join('')}</div>`;
  const pair = (id, block, name, shotFirst) => {
    const head = `<section class="nbc-block" id="${id}" aria-labelledby="${id}-title"><h2 id="${id}-title">${esc(block.title)}</h2>`;
    if (!name) return `${head}${prose(block)}</section>`;
    const text = `<div>${prose(block)}</div>`;
    const pic = shot(name, block);
    return `${head}<div class="nbc-pair${shotFirst ? ' nbc-pair-shot' : ''}">${shotFirst ? pic + text : text + pic}</div></section>`;
  };
  const heroName = loc.code === 'fr-FR' ? 'list' : 'editor';
  const heroBlock = heroName === 'list' ? t.list : t.save;

  const cats = ui.categories.map((c, i) => `<option value="${esc(ui.categoryValues[i])}">${esc(c)}</option>`).join('');
  const noteKey = loc.key === 'zh-Hans' || loc.key === 'zh-Hant' ? loc.key : loc.key;
  const related = RELATED.map(([name, slug, icon]) => `<li><a href="https://bnjdpn.com/${slug}/${loc.key === 'fr' ? 'fr-FR/' : ''}"><img src="${up}assets/apps/${icon}.webp" width="48" height="48" alt="" loading="lazy" decoding="async"><span>${esc(name)}</span></a></li>`).join('');

  return `<!doctype html>
<html lang="${loc.code}" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(t.meta)}">
<meta name="theme-color" content="#f6f6fd">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${self}">
${hreflang}
<meta name="apple-itunes-app" content="app-id=${product.appStoreId}">
<link rel="icon" href="${up}assets/app-icon.png">
<link rel="apple-touch-icon" href="${up}assets/app-icon-512.png">
<link rel="manifest" href="${up}site.webmanifest">
<link rel="preload" href="${up}assets/slip/fonts/literata-latin-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${up}assets/slip/slip.css?v=${CSS_VERSION}">
<meta name="author" content="Benjamin Dupin">
<meta property="og:type" content="website">
<meta property="og:site_name" content="NoBuyCart">
<meta property="og:locale" content="${loc.og}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(t.meta)}">
<meta property="og:url" content="${self}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(t.h1)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(t.meta)}">
<meta name="twitter:image" content="${ogImg}">
<meta name="twitter:image:alt" content="${esc(t.h1)}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<a class="skip" href="#main">${esc(ui.skip)}</a>
<header class="nbc-top">
<a class="nbc-brand" href="./"><img src="${up}assets/app-icon.png" width="36" height="36" alt=""><span>NoBuyCart</span></a>
<nav class="nbc-nav" aria-label="${esc(ui.navMain)}"><a href="#features">${esc(S.wishes.nav)}</a><a href="#review">${esc(S.review.nav)}</a><a href="#free-and-register">${esc(S.offer.nav)}</a><a href="#contact">${esc(ui.support)}</a></nav>
<div class="nbc-tools">
<a class="nbc-help" href="#contact">${esc(ui.support)}</a>
<details class="nbc-lang"><summary>${esc(ui.language)}</summary><nav aria-label="${esc(ui.language)}">${langs}</nav></details>
</div>
</header>
<main id="main">
<section class="nbc-hero" aria-labelledby="hero-title">
<div class="nbc-hero-side">
<h1 id="hero-title">${esc(t.h1)}</h1>
${stores}
<p class="nbc-lede">${esc(t.lede)}</p>
</div>
${shot(heroName, heroBlock, 'nbc-shot nbc-hero-shot', true)}
</section>
${pair('features', t.save, heroName === 'editor' ? '' : 'editor', false)}
${pair('waiting', t.list, heroName === 'list' ? '' : 'list', true)}
<section class="nbc-block" id="decide" aria-labelledby="decide-title">
<h2 id="decide-title">${esc(t.decide.title)}</h2>
${prose(t.decide)}
${shot('decide', t.decide, 'nbc-shot nbc-center')}
</section>
${pair('history', t.history, 'history', true)}
<section class="nbc-block" id="review" aria-labelledby="review-title">
<h2 id="review-title">${esc(t.review.title)}</h2>
${prose(t.review)}
${shot('review', t.review, 'nbc-shot nbc-center')}
</section>
<section class="nbc-month" id="november" aria-labelledby="november-title">
<div class="nbc-month-inner">
<h2 id="november-title">${esc(t.november.title)}</h2>
<p class="nbc-range"><span>1</span><span class="nbc-rule" aria-hidden="true"></span><span>30</span></p>
<p class="nbc-when">${esc(t.november.when)}</p>
<p>${esc(t.november.body)}</p>
</div>
</section>
<section class="nbc-block" id="free-and-register" aria-labelledby="register-title">
<h2 id="register-title">${esc(t.register.title)}</h2>
<dl class="nbc-ledger">
<div><dt>${esc(t.register.freeLabel)}</dt><dd>${esc(t.register.free)}</dd></div>
<div><dt>${esc(t.register.paidLabel)}</dt><dd>${esc(t.register.paid)}</dd></div>
</dl>
${t.register.price ? `<p class="nbc-prose">${esc(t.register.price)}</p>` : ''}
<p class="nbc-fine">${esc(t.register.kept)}</p>
<p class="nbc-device">${esc(t.device)} <a href="${privacy}">${esc(S.offer.privacyLink)}</a></p>
${shot('register', t.register, 'nbc-shot nbc-center')}
</section>
<section class="nbc-close" aria-labelledby="close-title">
<h2 id="close-title">${esc(t.outro)}</h2>
${stores}
</section>
<section class="nbc-more" aria-labelledby="more-title">
<h2 id="more-title">${esc(p.relatedTitle)}</h2>
<ul>${related}</ul>
</section>
<span class="nbc-anchor" id="pause-contact-title"></span>
<section class="nbc-ask" id="contact" aria-labelledby="contact-title">
<h2 id="contact-title">${esc(p.supportTitle)}</h2>
<p class="nbc-lede">${esc(p.supportIntro)}</p>
<form class="support-form" action="/api/contact" method="POST" data-sending="${esc(ui.formSending)}" data-success="${esc(ui.formSuccess)}" data-error="${esc(ui.formError)}">
<input type="hidden" name="app" value="NoBuy Cart"><input type="hidden" name="_subject" value="NoBuy Cart support request">
<label class="honeypot" aria-hidden="true">Leave empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>
<label><span>${esc(ui.labels.category)}</span><select name="category" required><option value="" selected disabled>—</option>${cats}</select></label>
<label><span>${esc(ui.labels.email)}</span><input type="email" name="email" autocomplete="email" required></label>
<label><span>${esc(ui.labels.appVersion)}</span><input type="text" name="app_version"></label>
<label><span>${esc(ui.labels.osVersion)}</span><input type="text" name="os_version"></label>
<label class="message-field"><span>${esc(ui.labels.message)}</span><textarea name="message" required></textarea></label>
<div class="cf-turnstile" data-sitekey="0x4AAAAAAFb8sZbCULV4skmB" data-action="contact"></div>
<button type="submit">${esc(ui.send)}</button>
<p class="form-status" role="status" aria-live="polite"></p>
</form>
<p class="form-note">${esc(FORM_NOTE[noteKey])}</p>
</section>
</main>
<footer class="nbc-end">
<p><strong>NoBuyCart</strong> ${esc(p.footer)}</p>
<nav aria-label="${esc(ui.legalNav)}"><a href="${privacy}">${esc(ui.privacy)}</a><a href="#contact">${esc(ui.support)}</a><a href="https://bnjdpn.com/">${esc(t.other)}</a></nav>
<small class="nbc-legal">Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</small>
</footer>
<script src="${up}assets/site.js" defer></script>
</body>
</html>
`;
}
