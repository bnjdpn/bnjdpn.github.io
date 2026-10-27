// Renders the TempoReps "program on the wall" landing page for one locale.
// Pure function of copy.mjs + content/product-sites (TempoReps.mjs, ui.mjs,
// form-note.mjs): used by build.mjs and by scripts/check-antitemplate.mjs.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import copy from './copy.mjs';
import product from '../../../content/product-sites/TempoReps.mjs';
import { UI, LOCALE_NAMES } from '../../../content/product-sites/ui.mjs';
import { FORM_NOTE } from '../../../content/product-sites/form-note.mjs';

export const ORIGIN = 'https://bnjdpn.com/TempoReps/';
export const APP_STORE = 'https://apps.apple.com/app/id6758854166?pt=128480256&ct=temporeps_web_wall_20261027&mt=8';
export const PLAY = product.playUrl;
export const LOCALES = [
  { code: 'en-US', key: 'en', dir: '', og: 'en_US', play: ['en', 'Get it on Google Play'], guide: 'timer-tempo-3020/' },
  { code: 'fr-FR', key: 'fr', dir: 'fr-FR/', og: 'fr_FR', play: ['fr', 'Disponible sur Google Play'], guide: 'fr-FR/timer-tempo-3020/' },
  { code: 'de-DE', key: 'de', dir: 'de-DE/', og: 'de_DE', play: ['de', 'Jetzt bei Google Play'] },
  { code: 'es-MX', key: 'es', dir: 'es-MX/', og: 'es_MX', play: ['es-419', 'Descargar en Google Play'] },
  { code: 'it', key: 'it', dir: 'it/', og: 'it_IT', play: ['it', 'Disponibile su Google Play'] },
  { code: 'ja', key: 'ja', dir: 'ja/', og: 'ja_JP', play: ['ja', 'Google Play で手に入れよう'] },
  { code: 'pl', key: 'pl', dir: 'pl/', og: 'pl_PL', play: ['pl', 'Pobierz z Google Play'] },
  { code: 'pt-BR', key: 'pt', dir: 'pt-BR/', og: 'pt_BR', play: ['pt-br', 'Disponível no Google Play'] },
];
// Stylesheet URL carries its content hash: Pages serves CSS with max-age=14400.
const CSS_VERSION = createHash('sha256').update(readFileSync(new URL('./wall.css', import.meta.url))).digest('hex').slice(0, 10);
const RELATED = [['LoadSense', 'loadsense'], ['ColdLoad', 'coldload'], ['PRVault', 'prvault'], ['MoveAtlas', 'moveatlas']];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function phone(loc, name, alt, up, cls, eager = false) {
  const base = `${up}assets/wall/${loc.code}/${name}`;
  if (name === 'watch') {
    return `<figure class="${cls}"><picture><source type="image/avif" srcset="${base}-368.avif"><img src="${base}-368.webp" width="368" height="448" alt="${esc(alt)}" loading="lazy" decoding="async"></picture></figure>`;
  }
  const h = name === 'modes' || name === 'mix' ? 1912 : 1914;
  const sizes = '(max-width: 899px) 78vw, 300px';
  return `<figure class="${cls}"><picture><source type="image/avif" srcset="${base}-440.avif 440w, ${base}-880.avif 880w" sizes="${sizes}"><img src="${base}-880.webp" srcset="${base}-440.webp 440w, ${base}-880.webp 880w" sizes="${sizes}" width="880" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture></figure>`;
}

export function render(loc) {
  const p = product.locales[loc.key];
  const t = copy[loc.key];
  const ui = UI[loc.key];
  const S = p.sections;
  const M = Object.fromEntries(S.modes.items.map(([name, text], i) => [['tempo', 'emom', 'tabata', 'amrap', 'fortime', 'mix', 'rest', 'stopwatch', 'mirror'][i], { name, text }]));
  const W = S.workout.items;
  const up = loc.dir ? '../' : '';
  const self = ORIGIN + loc.dir;
  const privacy = `${ORIGIN}${loc.code}/privacy`;
  const terms = `${ORIGIN}${loc.code}/terms`;
  const hreflang = LOCALES.map(l => `<link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${l.dir}">`).join('')
    + `<link rel="alternate" hreflang="x-default" href="${ORIGIN}">`;
  const ogImg = `${ORIGIN}assets/wall/og-${loc.key === 'fr' ? 'fr' : 'en'}.jpg`;
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Person', '@id': 'https://bnjdpn.com/#benjamin-dupin', name: 'Benjamin Dupin', url: 'https://bnjdpn.com/', sameAs: ['https://apps.apple.com/fr/developer/benjamin-dupin/id1871474236', 'https://play.google.com/store/apps/developer?id=Benjamin+Dupin'] },
    { '@type': 'SoftwareApplication', '@id': `${ORIGIN}#software`, name: 'TempoReps', description: p.description, url: ORIGIN, image: ogImg, applicationCategory: product.applicationCategory, operatingSystem: product.operatingSystem, offers: { '@type': 'Offer', price: '0', priceCurrency: product.currency[loc.code], url: APP_STORE }, downloadUrl: [APP_STORE, PLAY], sameAs: [`https://apps.apple.com/app/id${product.appStoreId}`, PLAY], author: { '@id': 'https://bnjdpn.com/#benjamin-dupin' }, inLanguage: loc.code },
    { '@type': 'WebPage', '@id': `${self}#webpage`, url: self, name: p.title, description: p.description, inLanguage: loc.code, about: { '@id': `${ORIGIN}#software` } },
  ] };
  const badges = `<div class="badges"><a class="badge" href="${esc(APP_STORE)}" rel="external"><img src="${up}assets/app-store-badges/${loc.code}.svg" width="144" height="48" alt="${esc(ui.badgeAlt)}"></a><a class="badge" href="${esc(PLAY)}" rel="external"><img src="/assets/badges/google-play/${loc.play[0]}.webp" width="162" height="48" alt="${esc(loc.play[1])}"></a></div>`;
  const langs = LOCALES.map(l => `<a href="${ORIGIN}${l.dir}" hreflang="${l.code}" lang="${l.code}"${l.code === loc.code ? ' aria-current="page"' : ''}>${esc(LOCALE_NAMES[l.code])}</a>`).join('');
  const ribbon = `<ol class="ribbon" aria-label="3-0-2-0">${[3, 0, 2, 0].map((s, i) => `<li class="cell${i === 0 ? ' now' : ''}" style="--s:${s}"><span>${esc(t.phases[i])}</span><b>${s} s</b></li>`).join('')}</ol>`;
  const guide = loc.guide ? `<p class="more-link"><a href="${ORIGIN}${loc.guide}">${esc(p.hero.guide)}</a></p>` : '';
  const block = (id, tone, mode, mark, title, body, shot, extra = '') => `<article class="block" data-tone="${tone}"${id ? ` id="${id}"` : ''}>
<p class="banner"><span class="banner-mode">${esc(mode)}</span>${mark ? `<span class="banner-mark">${esc(mark)}</span>` : ''}</p>
<div class="block-body">${shot}<div class="block-copy"><h2>${esc(title)}</h2>${body.map(x => `<p>${esc(x)}</p>`).join('')}${extra}</div></div>
</article>`;
  const blocks = [
    block('', 'work', M.tabata.name, t.tabataMark, t.blocks.tabata, [M.tabata.text, W[0][1]], phone(loc, 'tabata', `${M.tabata.name}: ${t.blocks.tabata}`, up, 'phone')),
    block('tempo', 'down', M.tempo.name, '3-0-2-0', t.blocks.tempo, [M.tempo.text], phone(loc, 'tempo', `${M.tempo.name} 3-0-2-0: ${t.phases.map((x, i) => `${x} ${[3, 0, 2, 0][i]} s`).join(', ')}`, up, 'phone'), ribbon + guide),
    block('', 'sand', t.blocks.savedTag, '', t.blocks.saved, [W[2][1], W[3][1]], phone(loc, 'routines', W[2][0], up, 'phone')),
    block('', 'go', 'APPLE WATCH', '', t.blocks.watch, [W[1][1]], phone(loc, 'watch', W[1][0], up, 'wrist-shot')),
  ].join('\n');
  const modeList = `<ul class="mode-list">${S.modes.items.map(([n, x]) => `<li><strong>${esc(n)}</strong><span>${esc(x)}</span></li>`).join('')}</ul>`;
  const plans = S.offer.plans.map((pl, i) => `<div class="plan${i ? ' plan-pro' : ''}"><h3>${esc(pl.title)}</h3><ul>${pl.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('');
  const cats = ui.categories.map((c, i) => `<option value="${esc(ui.categoryValues[i])}">${esc(c)}</option>`).join('');

  return `<!doctype html>
<html lang="${loc.code}" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="theme-color" content="#151314">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${self}">
${hreflang}
<meta name="apple-itunes-app" content="app-id=${product.appStoreId}">
<link rel="icon" href="${up}assets/app-icon.png">
<link rel="apple-touch-icon" href="${up}assets/app-icon-512.png">
<link rel="manifest" href="${up}site.webmanifest">
<link rel="preload" href="${up}assets/wall/fonts/archivo-latin-wdth-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${up}assets/wall/wall.css?v=${CSS_VERSION}">
<meta name="author" content="Benjamin Dupin">
<meta property="og:type" content="website">
<meta property="og:site_name" content="TempoReps">
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
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<a class="skip" href="#main">${esc(ui.skip)}</a>
<header class="hdr">
<a class="brand" href="./"><img src="${up}assets/app-icon.png" width="36" height="36" alt=""><span>TempoReps</span></a>
<nav class="links" aria-label="${esc(ui.navMain)}"><a href="#features">${esc(S.modes.nav)}</a><a href="#free-and-pro">${esc(S.offer.nav)}</a><a href="#contact">${esc(ui.support)}</a></nav>
<details class="lang"><summary>${esc(ui.language)}</summary><nav aria-label="${esc(ui.language)}">${langs}</nav></details>
</header>
<main id="main">
<section class="wall" aria-labelledby="hero-title">
<div class="wall-copy">
<p class="kick">${esc(p.hero.eyebrow)}</p>
<h1 id="hero-title">${esc(t.h1)}</h1>
<p class="sub">${esc(p.hero.intro)}</p>
${badges}
<p class="small-print">${esc(p.hero.note)}</p>
</div>
<div class="pairing">
${phone(loc, 'mix', p.alts[2], up, 'phone pair-phone', true)}
</div>
</section>
<section class="blocks" aria-label="${esc(S.workout.title)}">
${blocks}
</section>
<section class="modes" id="features" aria-labelledby="modes-title">
<div class="modes-copy"><h2 id="modes-title">${esc(S.modes.title)}</h2>${modeList}</div>
${phone(loc, 'modes', p.alts[0], up, 'phone')}
</section>
<section class="pro" id="free-and-pro" aria-labelledby="offer-title">
<h2 id="offer-title">${esc(S.offer.title)}</h2>
<p class="pro-intro">${esc(S.offer.intro)}</p>
<div class="plans">${plans}</div>
${S.offer.notes.map(n => `<p class="legal-note">${esc(n)}</p>`).join('')}
<p class="local">${esc(S.offer.privacy)} <a href="${privacy}">${esc(S.offer.privacyLink)}</a></p>
</section>
<section class="go" aria-labelledby="go-title">
<h2 id="go-title">${esc(t.endTitle)}</h2>
${badges}
</section>
<section class="more" aria-labelledby="more-title">
<h2 id="more-title">${esc(p.relatedTitle)}</h2>
<ul class="more-list">${RELATED.map(([n, i]) => `<li><a href="https://bnjdpn.com/${n}/"><img src="${up}assets/apps/${i}.png" width="48" height="48" alt="" loading="lazy" decoding="async"><span>${n}</span></a></li>`).join('')}</ul>
</section>
<section class="ask" id="contact" aria-labelledby="contact-title">
<div class="ask-head"><h2 id="contact-title">${esc(p.supportTitle)}</h2><p>${esc(p.supportIntro)}</p></div>
<form class="support-form" action="/api/contact" method="POST" data-sending="${esc(ui.formSending)}" data-success="${esc(ui.formSuccess)}" data-error="${esc(ui.formError)}">
<input type="hidden" name="app" value="TempoReps"><input type="hidden" name="_subject" value="TempoReps support request">
<label class="honeypot" aria-hidden="true">Leave empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>
<label><span>${esc(ui.labels.category)}</span><select name="category" required><option value="" selected disabled>—</option>${cats}</select></label>
<label><span>${esc(ui.labels.email)}</span><input type="email" name="email" autocomplete="email" required></label>
<label><span>${esc(ui.labels.appVersion)}</span><input type="text" name="app_version"></label>
<label><span>${esc(ui.labels.osVersion)}</span><input type="text" name="os_version"></label>
<label class="message-field"><span>${esc(ui.labels.message)}</span><textarea name="message" required></textarea></label>
<div class="cf-turnstile" data-sitekey="0x4AAAAAAFb8sZbCULV4skmB" data-action="contact"></div>
<button type="submit">${esc(ui.send)}</button>
<p class="form-status" role="status" aria-live="polite"></p>
<p class="form-note">${esc(FORM_NOTE[loc.key])}</p>
</form>
</section>
</main>
<footer class="base">
<p><strong>TempoReps</strong> ${esc(p.footer)}</p>
<nav aria-label="${esc(ui.legalNav)}"><a href="${privacy}">${esc(ui.privacy)}</a><a href="${terms}">${esc(ui.terms)}</a><a href="#contact">${esc(ui.support)}</a><a href="https://bnjdpn.com/">${esc(t.otherApps)}</a></nav>
<small>Apple, the Apple logo and Apple Watch are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</small>
</footer>
<script src="${up}assets/site.js" defer></script>
</body>
</html>
`;
}
