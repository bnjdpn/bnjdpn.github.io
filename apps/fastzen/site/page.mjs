// Renders the FastZen "fasting dial" page for one locale.
// Used by build.mjs and by scripts/check-antitemplate.mjs.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import copy from './copy.mjs';
import product from '../../../content/product-sites/FastZen.mjs';
import { UI, LOCALE_NAMES } from '../../../content/product-sites/ui.mjs';
import { FORM_NOTE } from '../../../content/product-sites/form-note.mjs';
import { googlePlayBadge } from '../../../scripts/product-site/google-play.mjs';

export const ORIGIN = 'https://bnjdpn.com/FastZen/';
const STORE = {
  fr: 'https://apps.apple.com/fr/app/fastzen-routine-de-je%C3%BBne/id6761484595?ct=fastzen_web_dial_20261027&mt=8',
  us: 'https://apps.apple.com/us/app/fastzen-fasting-timer/id6761484595?ct=fastzen_web_dial_20261027&mt=8',
};
const PLAY = product.playUrl;
const CSS_VERSION = createHash('sha256').update(readFileSync(new URL('./dial.css', import.meta.url))).digest('hex').slice(0, 10);
const START = 21;
const FAST = 16;
const ELAPSED = 2;

export const LOCALES = [
  { code: 'en-US', ui: 'en', copy: 'en', dir: '', og: 'en_US', play: 'en-US', twelve: true, store: 'us', paywall: true, shots: 'en-US' },
  { code: 'fr-FR', ui: 'fr', copy: 'fr', dir: 'fr-FR/', og: 'fr_FR', play: 'fr', twelve: false, store: 'fr', paywall: true, shots: 'fr-FR' },
  { code: 'de-DE', ui: 'de', copy: 'de', dir: 'de-DE/', og: 'de_DE', play: 'de', twelve: false, store: 'us', paywall: false, shots: 'en-US' },
  { code: 'es-ES', ui: 'es', copy: 'es', dir: 'es-ES/', og: 'es_ES', play: 'es', twelve: false, store: 'us', paywall: false, shots: 'en-US' },
  { code: 'es-MX', ui: 'es', copy: 'mx', dir: 'es-MX/', og: 'es_MX', play: 'es-MX', twelve: true, store: 'us', paywall: false, shots: 'en-US' },
  { code: 'it', ui: 'it', copy: 'it', dir: 'it/', og: 'it_IT', play: 'it', twelve: false, store: 'us', paywall: false, shots: 'en-US' },
  { code: 'ja', ui: 'ja', copy: 'ja', dir: 'ja/', og: 'ja_JP', play: 'ja', twelve: false, store: 'us', paywall: false, shots: 'en-US' },
  { code: 'pt-BR', ui: 'pt', copy: 'pt', dir: 'pt-BR/', og: 'pt_BR', play: 'pt', twelve: false, store: 'us', paywall: false, shots: 'en-US' },
];

const HREFLANG = [
  ['en', ''], ['fr', 'fr-FR/'], ['es', 'es-ES/'], ['pt', 'pt-BR/'],
];
const RELATED = [
  ['BrewMeter', 'brewmeter.webp', 'https://bnjdpn.com/BrewMeter/'],
  ['LoadSense', 'loadsense.webp', 'https://bnjdpn.com/LoadSense/'],
];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fill = (tpl, n) => tpl.replaceAll('{n}', String(n));

function clock(hour, twelve, am, pm) {
  const h = ((hour % 24) + 24) % 24;
  if (!twelve) return `${String(h).padStart(2, '0')}:00`;
  const suffix = h < 12 ? (am || ' AM') : (pm || ' PM');
  return `${h % 12 || 12}:00${suffix}`;
}

// The home screen puts the start hour at the top and runs clockwise.
const CX = 130;
const RING = 76;
const LABEL_R = 102;
const END_R = 116;

function polar(hour, radius) {
  const fromStart = ((hour - START) % 24 + 24) % 24;
  const a = (fromStart / 24) * Math.PI * 2 - Math.PI / 2;
  return [CX + Math.cos(a) * radius, CX + Math.sin(a) * radius];
}

function hourTag(hour, twelve, am, pm) {
  const h = ((hour % 24) + 24) % 24;
  if (!twelve) return `${String(h).padStart(2, '0')}:00`;
  return `${h % 12 || 12}${h < 12 ? (am || ' AM') : (pm || ' PM')}`;
}

const ticks = Array.from({ length: 24 }, (_, hour) => {
  const major = hour % 3 === 0;
  const [x1, y1] = polar(hour, major ? 66 : 70);
  const [x2, y2] = polar(hour, 74);
  return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="${major ? 'fz-tick fz-major' : 'fz-tick'}"/>`;
}).join('');

function screen(loc, name, alt, up, eager, extra) {
  const base = `${up}assets/dial/${loc.shots}/${name}`;
  const sizes = extra === 'fz-beside' ? '240px' : '(max-width: 899px) 92vw, 420px';
  const cls = extra ? `fz-shot ${extra}` : 'fz-shot';
  return `<figure class="${cls}"><picture><source type="image/avif" srcset="${base}-440.avif 440w, ${base}-880.avif 880w" sizes="${sizes}"><img src="${base}-880.webp" srcset="${base}-440.webp 440w, ${base}-880.webp 880w" sizes="${sizes}" width="880" height="1912" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
}

export function render(loc) {
  const t = copy[loc.copy];
  const ui = UI[loc.ui];
  const note = FORM_NOTE[loc.ui];
  const up = loc.dir ? '../' : '';
  const self = ORIGIN + loc.dir;
  const privacy = `${ORIGIN}${loc.code}/privacy`;
  const guide = ORIGIN + product.guides[loc.code];
  const store = STORE[loc.store];
  const play = googlePlayBadge(loc.play);
  const endHour = (START + FAST) % 24;
  const endText = clock(endHour, loc.twelve, t.dial.am, t.dial.pm);
  const [mx, my] = polar(endHour, RING).map(n => n.toFixed(2));
  const [lx, ly] = polar(endHour, END_R).map(n => n.toFixed(2));
  const left = FAST - ELAPSED;
  const apart = (a, b) => { const d = Math.abs(a - b) % 24; return Math.min(d, 24 - d); };
  const hourLabels = [0, 3, 6, 9, 12, 15, 18, 21].map(h => {
    const [x, y] = polar(h, LABEL_R);
    const cls = h === START ? 'fz-hour fz-start' : 'fz-hour';
    const hidden = h !== START && apart(h, endHour) < 2 ? ' hidden' : '';
    return `<text class="${cls}" data-h="${h}" x="${x.toFixed(1)}" y="${y.toFixed(1)}"${hidden}>${esc(hourTag(h, loc.twelve, t.dial.am, t.dial.pm))}</text>`;
  }).join('');
  const ogImg = `${ORIGIN}assets/dial/og-${loc.copy === 'fr' ? 'fr' : 'en'}.jpg`;
  const hreflang = LOCALES.map(l => `<link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${l.dir}">`).join('')
    + HREFLANG.map(([lang, dir]) => `<link rel="alternate" hreflang="${lang}" href="${ORIGIN}${dir}">`).join('')
    + `<link rel="alternate" hreflang="x-default" href="${ORIGIN}">`;
  const langs = LOCALES.map(l => `<a href="${ORIGIN}${l.dir}" hreflang="${l.code}" lang="${l.code}"${l.code === loc.code ? ' aria-current="page"' : ''}>${esc(LOCALE_NAMES[l.code])}</a>`).join('');
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Person', '@id': 'https://bnjdpn.com/#benjamin-dupin', name: 'Benjamin Dupin', url: 'https://bnjdpn.com/' },
      {
        '@type': 'SoftwareApplication', '@id': `${ORIGIN}#software`, name: 'FastZen', description: t.description,
        url: ORIGIN, image: ogImg, applicationCategory: product.applicationCategory, operatingSystem: 'iOS, Android',
        offers: { '@type': 'Offer', price: '0', priceCurrency: product.currency[loc.code] },
        author: { '@id': 'https://bnjdpn.com/#benjamin-dupin' },
        sameAs: [store, PLAY],
      },
      { '@type': 'WebPage', '@id': `${self}#webpage`, url: self, name: t.title, description: t.description, inLanguage: loc.code, about: { '@id': `${ORIGIN}#software` } },
    ],
  };
  const badges = `<div class="fz-badges"><a class="fz-badge" href="${esc(store)}" rel="external"><img src="${up}assets/app-store-badges/${loc.code}.svg" width="120" height="40" alt="${esc(ui.badgeAlt)}"></a><a class="fz-badge" href="${esc(PLAY)}" rel="external"><img src="${play.src}" width="${play.width}" height="${play.height}" alt="${esc(play.alt)}"></a></div>`;
  const cats = ui.categories.map((c, i) => `<option value="${esc(ui.categoryValues[i])}">${esc(c)}</option>`).join('');
  const days = t.days.map(([name, plan, hours, rest]) => `<li class="fz-day${rest ? ' fz-rest' : ''}"><span class="fz-dow">${esc(name)}</span><span class="fz-plan">${esc(plan)}${hours ? ` ${esc(hours)}` : ''}</span></li>`).join('');
  const closeShot = cap => `<figcaption class="fz-cap">${esc(cap)}</figcaption></figure>`;
  const paras = xs => xs.map(x => `<p>${esc(x)}</p>`).join('');

  return `<!doctype html>
<html lang="${loc.code}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.description)}">
<meta name="theme-color" content="#0F1311">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${self}">
${hreflang}
<meta name="apple-itunes-app" content="app-id=${product.appStoreId}">
<link rel="icon" href="${up}assets/app-icon.png">
<link rel="apple-touch-icon" href="${up}assets/app-icon-512.png">
<link rel="manifest" href="${up}site.webmanifest">
<link rel="preload" href="${up}assets/dial/fonts/fraunces-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${up}assets/dial/dial.css?v=${CSS_VERSION}">
<meta name="author" content="Benjamin Dupin">
<meta property="og:type" content="website">
<meta property="og:site_name" content="FastZen">
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
<header class="fz-bar">
<a class="fz-brand" href="./"><img src="${up}assets/app-icon.png" width="36" height="36" alt=""><span>FastZen</span></a>
<nav class="fz-nav" aria-label="${esc(ui.navMain)}"><a href="#features">${esc(t.nav[0])}</a><a href="#routine">${esc(t.nav[1])}</a><a href="#custom-week">${esc(t.nav[2])}</a><a href="#contact">${esc(ui.support)}</a></nav>
<details class="fz-lang"><summary>${esc(ui.language)}</summary><nav aria-label="${esc(ui.language)}">${langs}</nav></details>
</header>
<main id="main">
<span class="fz-keep" id="dawn-title"></span>
<section class="fz-open" aria-labelledby="hero-title">
<figure class="fz-dial" style="--elapsed:${ELAPSED};--left:${left}" data-start="${START}" data-elapsed="${ELAPSED}" data-twelve="${loc.twelve ? '1' : '0'}" data-ampm="${esc((t.dial.am || ' AM') + '|' + (t.dial.pm || ' PM'))}" data-end-word="${esc(t.dial.end)}" data-hour-tpl="${esc(t.dial.hour)}" data-win-tpl="${esc(t.dial.window)}" data-over-tpl="${esc(t.dial.over)}">
<div class="fz-face">
<svg class="fz-ring" viewBox="0 0 260 260" aria-hidden="true">
<circle class="fz-track" cx="${CX}" cy="${CX}" r="${RING}"/>
${ticks}
<circle class="fz-left" cx="${CX}" cy="${CX}" r="${RING}" pathLength="24" transform="rotate(-90 ${CX} ${CX})" stroke-dasharray="0 ${ELAPSED} ${left} 24"/>
<circle class="fz-done" cx="${CX}" cy="${CX}" r="${RING}" pathLength="24" transform="rotate(-90 ${CX} ${CX})"/>
<circle class="fz-mark" cx="${mx}" cy="${my}" r="5"/>
${hourLabels}
<text class="fz-endlab" x="${lx}" y="${ly}">${esc(hourTag(endHour, loc.twelve, t.dial.am, t.dial.pm))}</text>
</svg>
<div class="fz-core">
<p class="fz-time">${esc(t.dial.elapsed)}</p>
<p class="fz-word">${esc(t.dial.word)}</p>
<p class="fz-end">${esc(t.dial.end)} ${esc(endText)}</p>
</div>
</div>
</figure>
<div class="fz-pitch">
<p class="fz-lead">${esc(t.lead)}</p>
<h1 class="fz-h1" id="hero-title">${esc(t.h1)}</h1>
${badges}
<p class="fz-intro">${esc(t.intro)}</p>
<p class="fz-fine">${esc(t.fine)}</p>
<div class="fz-proto" role="group" aria-label="${esc(t.protocols)}">
<button type="button" class="fz-choice" data-h="16" aria-pressed="true">16:8</button>
<button type="button" class="fz-choice" data-h="18" aria-pressed="false">18:6</button>
<button type="button" class="fz-choice" data-h="20" aria-pressed="false">20:4</button>
<button type="button" class="fz-choice" data-h="23" aria-pressed="false">OMAD</button>
</div>
<label class="fz-range"><span>${esc(t.custom)}</span><input type="range" min="1" max="48" value="${FAST}"></label>
<p class="fz-win" aria-live="polite">${esc(fill(t.dial.hour, FAST))}, ${esc(fill(t.dial.window, 24 - FAST))}</p>
</div>
${screen(loc, 'home', t.homeAlt, up, false, 'fz-beside')}</figure>
</section>
<span class="fz-keep" id="principles-title"></span>
<section class="fz-block" id="features" aria-labelledby="features-title">
<div class="fz-split">
<div class="fz-copy">
<h2 id="features-title">${esc(t.runningTitle)}</h2>
${paras(t.running)}
</div>
${screen(loc, 'home', t.homeAlt, up, true, 'fz-repeat')}${closeShot(t.homeCap)}
</div>
</section>
<span class="fz-keep" id="related-title"></span>
<section class="fz-block" id="routine" aria-labelledby="routine-title">
<div class="fz-copy">
<h2 id="routine-title">${esc(t.weekTitle)}</h2>
<p>${esc(t.weekLead)}</p>
</div>
<ol class="fz-week">${days}</ol>
${t.shotNote ? `<p class="fz-hint">${esc(t.shotNote)}</p>` : ''}
${screen(loc, 'week', t.weekCap, up, false)}${closeShot(t.weekCap)}
<div class="fz-split">
<div class="fz-copy">
<h2 class="fz-h2b">${esc(t.todayTitle)}</h2>
${paras(t.today)}
<p class="fz-guide"><a href="${guide}">${esc(t.guide)}</a></p>
</div>
${screen(loc, 'today', t.todayAlt, up, false)}${closeShot(t.todayCap)}
</div>
</section>
<section class="fz-block" id="history" aria-labelledby="history-title">
<div class="fz-split fz-flip">
<div class="fz-copy">
<h2 id="history-title">${esc(t.historyTitle)}</h2>
${paras(t.history)}
<p class="fz-disc">${esc(t.disclaimer)}</p>
</div>
${screen(loc, 'history', t.historyAlt, up, false)}${closeShot(t.historyCap)}
</div>
</section>
<span class="fz-keep" id="footnotes-title"></span>
<section class="fz-block" id="custom-week" aria-labelledby="custom-week-title">
<h2 id="custom-week-title">${esc(t.offerTitle)}</h2>
<p class="fz-intro">${esc(t.offerIntro)}</p>
<div class="fz-bill">
<h3>${esc(t.freeTitle)}</h3>
<ul>${t.free.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
<h3 class="fz-paid">${esc(t.paidTitle)}</h3>
<p class="fz-once">${esc(t.once)}</p>
<ul>${t.paid.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
</div>
<p class="fz-price">${esc(t.price)}</p>
<p class="fz-price">${esc(t.keep)}</p>
<p class="fz-device">${esc(t.device)} <a href="${privacy}">${esc(ui.privacy)}</a></p>
${loc.paywall ? `${screen(loc, 'paywall', t.payAlt, up, false)}${closeShot(t.payCap)}` : ''}
${badges}
</section>
<section class="fz-block fz-sibs" id="more-apps" aria-labelledby="more-apps-title">
<h2 id="more-apps-title">${esc(t.related)}</h2>
<ul>${RELATED.map(([name, icon, href]) => `<li><a href="${href}"><img src="${up}assets/apps/${icon}" width="48" height="48" alt="" loading="lazy" decoding="async"><span>${esc(name)}</span></a></li>`).join('')}</ul>
</section>
<span class="fz-keep" id="dawn-contact-title"></span>
<section class="fz-block fz-ask" id="contact" aria-labelledby="contact-title">
<h2 id="contact-title">${esc(t.supportTitle)}</h2>
<p>${esc(t.supportIntro)}</p>
<form class="support-form" action="/api/contact" method="POST" data-sending="${esc(ui.formSending)}" data-success="${esc(ui.formSuccess)}" data-error="${esc(ui.formError)}">
<input type="hidden" name="app" value="FastZen"><input type="hidden" name="_subject" value="FastZen support request">
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
<p class="form-note">${esc(note)}</p>
</section>
</main>
<footer class="fz-foot">
<p><strong>FastZen</strong> ${esc(t.footer)}</p>
<nav aria-label="${esc(ui.legalNav)}"><a href="${privacy}">${esc(ui.privacy)}</a><a href="#contact">${esc(ui.support)}</a><a href="https://bnjdpn.com/">${esc(t.outro)}</a></nav>
<small>Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</small>
</footer>
<script src="${up}assets/site.js" defer></script>
<script>
(function () {
  var root = document.querySelector('.fz-dial');
  if (!root) return;
  var start = Number(root.dataset.start);
  var elapsed = Number(root.dataset.elapsed);
  var twelve = root.dataset.twelve === '1';
  var ampm = (root.dataset.ampm || ' AM| PM').split('|');
  var endEl = root.querySelector('.fz-end');
  var winEl = document.querySelector('.fz-win');
  var mark = root.querySelector('.fz-mark');
  var buttons = [].slice.call(document.querySelectorAll('.fz-choice'));
  var range = document.querySelector('.fz-range input');
  function clock(h) {
    h = ((h % 24) + 24) % 24;
    if (!twelve) return (h < 10 ? '0' : '') + h + ':00';
    return (h % 12 || 12) + ':00' + (h < 12 ? ampm[0] : ampm[1]);
  }
  function ringTag(h) {
    h = ((h % 24) + 24) % 24;
    if (!twelve) return (h < 10 ? '0' : '') + h + ':00';
    return (h % 12 || 12) + (h < 12 ? ampm[0] : ampm[1]);
  }
  var cx = 130, ring = 76, endR = 116;
  var leftEl = root.querySelector('.fz-left');
  var endLab = root.querySelector('.fz-endlab');
  var hourLabs = [].slice.call(root.querySelectorAll('.fz-hour'));
  function polar(hour, radius) {
    var fromStart = ((hour - start) % 24 + 24) % 24;
    var a = (fromStart / 24) * Math.PI * 2 - Math.PI / 2;
    return [cx + Math.cos(a) * radius, cx + Math.sin(a) * radius];
  }
  function apart(a, b) {
    var d = Math.abs(a - b) % 24;
    return Math.min(d, 24 - d);
  }
  function apply(hours) {
    var end = (start + hours) % 24;
    endEl.textContent = root.dataset.endWord + ' ' + clock(end);
    var shown = Math.min(elapsed, hours);
    var left = Math.max(0, Math.min(hours, 24) - shown);
    root.style.setProperty('--elapsed', shown);
    root.style.setProperty('--left', left);
    if (leftEl) leftEl.setAttribute('stroke-dasharray', '0 ' + shown + ' ' + left + ' 24');
    var p = polar(end, ring);
    mark.setAttribute('cx', p[0].toFixed(2));
    mark.setAttribute('cy', p[1].toFixed(2));
    if (endLab) {
      var lab = polar(end, endR);
      endLab.setAttribute('x', lab[0].toFixed(2));
      endLab.setAttribute('y', lab[1].toFixed(2));
      endLab.textContent = ringTag(end);
      endLab.toggleAttribute('hidden', apart(end, start) === 0);
    }
    hourLabs.forEach(function (el) {
      var h = Number(el.dataset.h);
      el.toggleAttribute('hidden', h !== start && apart(h, end) < 2);
    });
    var text = hours > 24
      ? root.dataset.overTpl.replace('{n}', hours)
      : root.dataset.hourTpl.replace('{n}', hours) + ', ' + root.dataset.winTpl.replace('{n}', 24 - hours);
    if (winEl) winEl.textContent = text;
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', Number(b.dataset.h) === hours ? 'true' : 'false'); });
    if (range && Number(range.value) !== hours) range.value = String(hours);
  }
  buttons.forEach(function (b, i) {
    b.addEventListener('click', function () { apply(Number(b.dataset.h)); });
    b.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      var n = (i + (e.key === 'ArrowRight' ? 1 : buttons.length - 1)) % buttons.length;
      buttons[n].focus();
      apply(Number(buttons[n].dataset.h));
    });
  });
  if (range) range.addEventListener('input', function () { apply(Number(range.value)); });
})();
</script>
</body>
</html>
`;
}
