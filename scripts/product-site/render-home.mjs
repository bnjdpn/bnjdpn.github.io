// Renders one localized home page of a product site.
//   cfg  the app's marketing/site.json (locales, URLs, screenshots, assets)
//   app  content/product-sites/<App>.mjs: store facts, section layout, copy
//   ui   interface strings shared by every app (content/product-sites/ui.mjs)
// The page layout lives in layout.css; the app theme only gives colours and fonts.
import { readFileSync } from 'node:fs';
import { escapeHtml as e, hreflangLinks, localeUrl } from './stage-common.mjs';
import { googlePlayBadge, PLAY_DEVELOPER_URL } from './google-play.mjs';

const PERSON_ID = 'https://bnjdpn.com/#benjamin-dupin';
const LAYOUT_CSS = readFileSync(new URL('./layout.css', import.meta.url), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '').trim();

export const language = (locale) => locale.split('-')[0];

// Copy is keyed by language ("en"), or by locale ("en-GB") when a locale needs its own text.
export function copyFor(app, locale) {
  const base = app.locales[language(locale)];
  const own = app.locales[locale];
  if (!base && !own) throw new Error(`Missing copy for ${locale}`);
  return merge(base ?? {}, own ?? {});
}

function merge(base, own) {
  const out = { ...base };
  for (const [key, value] of Object.entries(own)) {
    const plain = value && typeof value === 'object' && !Array.isArray(value);
    out[key] = plain && base[key] && typeof base[key] === 'object' ? merge(base[key], value) : value;
  }
  return out;
}

function picture(prefix, shot, alt, eager) {
  const sizes = eager ? '(max-width: 760px) 78vw, 310px' : '(max-width: 760px) 78vw, 250px';
  const variants = shot.variants ?? [{ w: 440, h: 956 }, { w: 880, h: 1912 }];
  const big = variants[variants.length - 1];
  const set = (fmt) => variants.map(({ w }) => `${prefix}${shot.base}-${w}.${fmt} ${w}w`).join(', ');
  const load = eager ? 'decoding="async" fetchpriority="high"' : 'decoding="async" loading="lazy"';
  return `<picture><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><img src="${prefix}${shot.base}-${big.w}.webp" srcset="${set('webp')}" sizes="${sizes}" width="${big.w}" height="${big.h}" alt="${e(alt)}" ${load}></picture>`;
}

// Desktop hero: the first store screenshot in a device frame. It is hidden below
// 1000px, where the gallery under the hero shows the same screenshot; lazy loading
// keeps phones from downloading it, and desktops get it from the gallery's request.
function device(prefix, shot, alt) {
  const variants = shot.variants ?? [{ w: 440, h: 956 }, { w: 880, h: 1912 }];
  const big = variants.at(-1);
  const watch = big.h / big.w < 1.5;
  const set = (fmt) => variants.map(({ w }) => `${prefix}${shot.base}-${w}.${fmt} ${w}w`).join(', ');
  const sizes = watch ? '260px' : '300px';
  return `<figure class="ps-device${watch ? ' ps-device-watch' : ''}"><picture><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><img src="${prefix}${shot.base}-${big.w}.webp" srcset="${set('webp')}" sizes="${sizes}" width="${big.w}" height="${big.h}" alt="${e(alt)}" loading="lazy" decoding="async"></picture></figure>`;
}

const largest = (shot) => (shot.variants ?? [{ w: 880 }]).at(-1).w;

function shotLink(prefix, shot, alt, eager = false) {
  return `<a class="shot-link" href="${prefix}${shot.base}-${largest(shot)}.webp" data-screenshot data-caption="${e(alt)}" aria-label="${e(alt)}">${picture(prefix, shot, alt, eager)}</a>`;
}

function jsonLd(cfg, app, t, locale, url, social) {
  const base = cfg.base_url;
  const store = cfg.app_store_url;
  const graph = [
    { '@type': 'Person', '@id': PERSON_ID, name: 'Benjamin Dupin', url: 'https://bnjdpn.com/', sameAs: [cfg.developer_profile_url, PLAY_DEVELOPER_URL] },
    { '@type': 'WebSite', '@id': `${base}#website`, url: base, name: cfg.app_name, publisher: { '@id': PERSON_ID } },
    {
      '@type': 'SoftwareApplication',
      '@id': `${base}#software`,
      name: cfg.app_name,
      alternateName: app.storeNames?.[locale] ?? app.storeNames?.[cfg.primary_locale] ?? cfg.app_name,
      description: t.description,
      url: base,
      image: social.url,
      applicationCategory: app.applicationCategory,
      operatingSystem: app.operatingSystem,
      offers: { '@type': 'Offer', price: app.price ?? '0', priceCurrency: app.currency[locale], url: store },
      downloadUrl: store,
      installUrl: store,
      sameAs: [`https://apps.apple.com/app/id${app.appStoreId}`, ...(app.playUrl ? [app.playUrl] : [])],
      author: { '@id': PERSON_ID },
      publisher: { '@id': PERSON_ID },
      inLanguage: locale,
    },
    {
      '@type': 'WebPage', '@id': `${url}#webpage`, url, name: t.title, description: t.description, inLanguage: locale,
      isPartOf: { '@id': `${base}#website` }, about: { '@id': `${base}#software` }, author: { '@id': PERSON_ID },
    },
  ];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c');
}

const head = (c, id) => `<header class="ps-head">${c.kicker ? `<p class="ps-kicker">${e(c.kicker)}</p>` : ''}<h2 id="${id}-title">${e(c.title)}</h2>${c.intro ? `<p>${e(c.intro)}</p>` : ''}</header>`;

const SECTIONS = {
  list: (c) => `<dl class="ps-list">${c.items.map(([term, text]) => `<div><dt>${e(term)}</dt><dd>${e(text)}</dd></div>`).join('')}</dl>`,
  cards: (c) => `<div class="ps-cards">${c.items.map(([title, text]) => `<div><h3>${e(title)}</h3><p>${e(text)}</p></div>`).join('')}</div>`,
};

function renderSection(section, ctx) {
  const { t, prefix, shots, store, play, legal, anchors } = ctx;
  const c = t.sections[section.key];
  if (!c) throw new Error(`Missing copy for section ${section.key}`);
  const id = section.id ?? section.key;
  let body;
  if (section.type === 'offer') {
    body = `<div class="ps-plans">${c.plans.map((p) => `<article class="ps-plan"><h3>${e(p.title)}</h3>${p.price ? `<p>${e(p.price)}</p>` : ''}<ul>${p.items.map((x) => `<li>${e(x)}</li>`).join('')}</ul></article>`).join('')}</div>`
      + (c.notes ?? []).map((x) => `<p class="ps-small">${e(x)}</p>`).join('')
      + (c.privacy ? `<p class="ps-small">${e(c.privacy)} <a href="${legal.privacy}">${e(c.privacyLink)}</a></p>` : '')
      + (c.cta ? `<p><a class="ps-link" href="${e(store)}" rel="external">${e(c.cta)} <span aria-hidden="true">↗</span></a>${play && c.playCta ? ` <a class="ps-link" href="${e(play)}" rel="external">${e(c.playCta)} <span aria-hidden="true">↗</span></a>` : ''}</p>` : '');
  } else {
    const text = SECTIONS[section.type](c);
    const figures = (section.shots ?? []).map((i, n) => `<figure>${shotLink(prefix, shots[i], t.alts[i])}${c.captions?.[n] ? `<figcaption>${e(c.captions[n])}</figcaption>` : ''}</figure>`).join('');
    body = `<div class="ps-body${figures ? '' : ' ps-text-only'}">${text}${figures ? `<div class="ps-shots">${figures}</div>` : ''}</div>`
      + (c.note ? `<p class="ps-small ps-after">${e(c.note)}</p>` : '');
  }
  return `${anchors(section.anchors, section.anchorIds)}<section class="ps-section" id="${id}" aria-labelledby="${id}-title">${head(c, id)}${body}</section>`;
}

// The support form (endpoint, Turnstile key, labels), the legal links and any
// external script are taken unchanged from the previous page of the same locale,
// so contact delivery and legal URLs cannot drift during a redesign.
function keptFromPrevious(html, locale) {
  if (!html) throw new Error(`No previous page for ${locale}`);
  const form = html.match(/<form class="support-form"[\s\S]*?<\/form>/)?.[0];
  const footer = html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0] ?? '';
  const legalNav = footer.match(/<nav aria-label="[^"]*">(?:<a [^>]*>[^<]*<\/a>)+<\/nav>/)?.[0];
  const privacyHref = legalNav?.match(/href="([^"#][^"]*)"/)?.[1];
  if (!form || !legalNav || !privacyHref) throw new Error(`Previous page for ${locale} lacks the form or legal links`);
  const scripts = (html.match(/<script src="https:\/\/[^"]*"[^>]*><\/script>/g) ?? []).join('');
  return { form, legalNav, privacyHref, scripts };
}

function imageType(path) {
  return { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }[path.split('.').pop()];
}

export function renderHome({ cfg, app, ui: uiByLanguage, names, locale, images, previous }) {
  const lang = language(locale);
  const t = copyFor(app, locale);
  const ui = uiByLanguage[locale] ?? uiByLanguage[lang];
  if (!ui) throw new Error(`Missing interface strings for ${lang}`);
  const primary = locale === cfg.primary_locale;
  const prefix = primary ? '' : '../';
  const url = localeUrl(cfg, locale);
  const shots = cfg.screenshots[locale];
  const store = cfg.app_store_url;
  const kept = keptFromPrevious(previous, locale);
  const legal = { privacy: kept.privacyHref };
  const aliases = cfg.fragment_aliases ?? {};
  const anchors = (key, extra = []) => [...(aliases[key] ?? []), ...extra].map((id) => `<span class="legacy-anchor" id="${e(id)}" aria-hidden="true"></span>`).join('');
  const ogOf = (code) => uiByLanguage[code]?.ogLocale ?? uiByLanguage[language(code)].ogLocale.replace(/_.*/, '') + '_' + (code.split('-')[1] ?? uiByLanguage[language(code)].ogLocale.split('_')[1]);
  const ownOg = ogOf(locale);
  const socialPath = images.socialFor(locale);
  const social = { url: `${cfg.base_url}${socialPath}`, ...images.size(socialPath) };
  const meta = [
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${e(cfg.app_name)}">`,
    `<meta property="og:locale" content="${ownOg}">`,
    ...[...new Set(cfg.locales.map(({ code }) => ogOf(code)))].filter((x) => x !== ownOg).map((x) => `<meta property="og:locale:alternate" content="${x}">`),
    `<meta property="og:title" content="${e(t.title)}">`,
    `<meta property="og:description" content="${e(t.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${social.url}">`,
    `<meta property="og:image:type" content="${imageType(socialPath)}">`,
    ...(social.width ? [`<meta property="og:image:width" content="${social.width}">`, `<meta property="og:image:height" content="${social.height}">`] : []),
    `<meta property="og:image:alt" content="${e(t.socialAlt ?? t.alts[app.heroShot ?? 0])}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${e(t.title)}">`,
    `<meta name="twitter:description" content="${e(t.description)}">`,
    `<meta name="twitter:image" content="${social.url}">`,
    `<meta name="twitter:image:alt" content="${e(t.socialAlt ?? t.alts[app.heroShot ?? 0])}">`,
  ];
  const alternates = [
    ...hreflangLinks(cfg).map(({ locale: l, url: u }) => `<link rel="alternate" hreflang="${l}" href="${u}">`),
    `<link rel="alternate" hreflang="x-default" href="${cfg.base_url}">`,
  ].join('');
  const languages = cfg.locales.map(({ code }) => `<a href="${localeUrl(cfg, code)}" hreflang="${code}" lang="${code}"${code === locale ? ' aria-current="page"' : ''}>${e(names[code] ?? code)}</a>`).join('');
  const related = (cfg.related_apps ?? []).map((r) => {
    const own = app.relatedTaglines?.[r.name];
    const tagline = own?.[locale] ?? r.tagline?.[locale] ?? r.tagline?.[lang] ?? r.tagline?.en ?? '';
    return `<li><a href="${e(r.site_url)}"><img src="${prefix}${e(r.icon_path)}" width="48" height="48" alt="" loading="lazy" decoding="async"><span><strong>${e(r.name)}</strong><small>${e(tagline)}</small></span></a></li>`;
  }).join('');
  const options = ui.categories.map((label, i) => `<option value="${e(ui.categoryValues[i])}">${e(label)}</option>`).join('');
  const nav = app.sections.filter((s) => t.sections[s.key]?.nav).map((s) => `<a href="#${s.id ?? s.key}">${e(t.sections[s.key].nav)}</a>`).join('');
  const hero = t.hero;
  const guide = app.guides?.[locale];
  const play = googlePlayBadge(locale);
  const styles = ['base.css', ...(images.has('assets/foundations.css') ? ['foundations.css'] : []), 'theme.css']
    .map((name) => `<link rel="stylesheet" href="${prefix}assets/${name}">`).join('');
  const heroShot = app.heroShot ?? 0;
  // Every screenshot of the store listing, in store order, hero first.
  const gallery = [heroShot, ...shots.map((_, i) => i).filter((i) => i !== heroShot && t.alts[i])];

  const html = `<!doctype html>
<html lang="${locale}" dir="ltr">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${e(t.title)}</title>
  <meta name="description" content="${e(t.description)}">
  <meta name="theme-color" content="${cfg.theme_color}"><meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${url}">${alternates}
  <meta name="apple-itunes-app" content="app-id=${app.appStoreId}"><link rel="icon" href="${prefix}assets/app-icon.png"><link rel="apple-touch-icon" href="${prefix}assets/app-icon.png"><link rel="manifest" href="${prefix}site.webmanifest">
  ${styles}<style>${LAYOUT_CSS}</style>
  <meta name="author" content="Benjamin Dupin"><link rel="author" href="${cfg.developer_profile_url}">
  ${meta.join('\n  ')}
  <script type="application/ld+json">${jsonLd(cfg, app, t, locale, url, social)}</script>
</head>
<body>
  <a class="skip-link" href="#main">${e(ui.skip)}</a>
  <header class="site-header">
    <a class="brand" href="./"><img src="${prefix}assets/app-icon.png" width="36" height="36" alt=""><span>${e(cfg.app_name)}</span></a>
    <nav class="site-nav" aria-label="${e(ui.navMain)}">${nav}<a href="#contact">${e(ui.support)}</a><a href="https://bnjdpn.com/">${e(ui.moreApps)} <span aria-hidden="true">↗</span></a></nav>
    ${cfg.locales.length > 1 ? `<details class="language-menu"><summary>${e(ui.language)}</summary><nav aria-label="${e(ui.language)}">${languages}</nav></details>` : ''}
  </header>
  <main id="main" class="ps-main">
    ${anchors('hero')}<section class="ps-hero" aria-labelledby="hero-title">
      <div class="ps-hero-text">
        <p class="ps-eyebrow">${e(hero.eyebrow)}</p>
        <h1 id="hero-title">${e(hero.h1)}</h1>
        <p class="ps-intro">${e(hero.intro)}</p>
        <div class="ps-actions"><a class="app-store-action" href="${e(store)}" rel="external"><img src="${prefix}${cfg.app_store_badges[locale]}" width="120" height="40" alt="${e(ui.badgeAlt)}"></a>${app.playUrl ? `<a class="app-store-action" href="${e(app.playUrl)}" rel="external"><img src="${play.src}" width="${play.width}" height="${play.height}" alt="${e(play.alt)}"></a>` : ''}${guide && hero.guide ? `<a class="ps-button" href="${cfg.base_url}${guide}">${e(hero.guide)} <span aria-hidden="true">→</span></a>` : ''}</div>
        <p class="ps-note">${e(hero.note)}</p>
      </div>
      ${device(prefix, shots[heroShot], t.alts[heroShot])}
    </section>
    <div class="ps-gallery" role="region" tabindex="0" aria-label="${e(ui.dialog)}">${gallery.map((i, n) => `<figure>${shotLink(prefix, shots[i], t.alts[i], n === 0)}</figure>`).join('')}</div>
    ${app.sections.map((s) => renderSection(s, { t, prefix, shots, store, play: app.playUrl, legal, anchors })).join('\n    ')}
    ${related ? `${anchors('related')}<section class="ps-section ps-related" id="more-apps" aria-labelledby="more-apps-title"><header class="ps-head"><h2 id="more-apps-title">${e(t.relatedTitle)}</h2></header><ul>${related}</ul></section>` : ''}
    ${anchors('contact')}<section class="ps-section ps-support" id="contact" aria-labelledby="contact-title">
      <header class="ps-head"><p class="ps-kicker">${e(ui.support)}</p><h2 id="contact-title">${e(t.supportTitle)}</h2><p>${e(t.supportIntro)}</p></header>
      ${kept.form}${t.formNote ? `\n      <p class="ps-small ps-form-note">${e(t.formNote)}</p>` : ''}
    </section>
  </main>
  <footer class="site-footer"><p><strong>${e(cfg.app_name)}</strong><br>${e(t.footer)}</p>${kept.legalNav}<nav class="seo-author-links" data-portfolio-seo-links aria-label="${e(ui.moreApps)}"><a href="https://bnjdpn.com/">${e(ui.moreApps)}</a><a href="${cfg.developer_profile_url}">Benjamin Dupin · App Store</a><a href="${PLAY_DEVELOPER_URL}">Benjamin Dupin · Google Play</a></nav>
<small class="trademark-notice">Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</small></footer>
  <dialog class="screenshot-dialog" aria-label="${e(ui.dialog)}"><form method="dialog"><button aria-label="${e(ui.close)}">×</button></form><img alt="" width="880" height="1912"></dialog>
  <script src="${prefix}assets/site.js" defer></script>${lazyScripts(kept.scripts)}
</body>
</html>
`;
  // Every fragment of the previous page keeps working: ids that the new page
  // no longer has become empty anchors before the first section.
  const ids = (text) => new Set([...text.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const now = ids(html);
  const missing = [...ids(previous)].filter((id) => !now.has(id));
  if (!missing.length) return html;
  const spans = missing.map((id) => `<span class="legacy-anchor" id="${e(id)}" aria-hidden="true"></span>`).join('');
  return html.replace('<section class="ps-section"', `${spans}<section class="ps-section"`);
}

// Third-party scripts kept from the previous page (Turnstile) load only when the
// support form comes near the screen, so they stay off the first paint.
function lazyScripts(tags) {
  const srcs = [...tags.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
  if (!srcs.length) return '';
  return `<script>(function(){var s=${JSON.stringify(srcs)},d=0,f=document.querySelectorAll('.support-form');function l(){if(d)return;d=1;s.forEach(function(u){var e=document.createElement('script');e.src=u;e.async=true;document.head.appendChild(e)})}if(!f.length||!('IntersectionObserver' in window))return l();var o=new IntersectionObserver(function(x){if(x.some(function(y){return y.isIntersecting})){o.disconnect();l()}},{rootMargin:'800px 0px'});f.forEach(function(e){o.observe(e);e.addEventListener('focusin',l)})})()</script>`;
}
