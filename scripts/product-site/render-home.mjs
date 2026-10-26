// Renders one localized home page of a product site.
// Data: the app's marketing/site.json (cfg), its page copy in
// content/product-sites/<App>.mjs (app), shared interface strings (ui).
import { escapeHtml as e, hreflangLinks, localeUrl } from './stage-common.mjs';

const PERSON_ID = 'https://bnjdpn.com/#benjamin-dupin';

// Small additions to the app theme: a plain definition list for modes,
// feature items without numbers, the privacy line.
const INLINE_CSS = '.mode-list{margin:0;display:grid}.mode-list div{border-top:1px solid var(--line);padding:16px 0}.mode-list div:last-child{border-bottom:1px solid var(--line)}.mode-list dt{font:600 .85rem/1.4 ui-monospace,monospace;letter-spacing:.04em;color:var(--accent)}.mode-list dd{margin:6px 0 0;color:var(--muted);line-height:1.6}.feature-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:48px}.feature-grid .feature-item{grid-template-columns:1fr}@media (max-width:760px){.feature-grid{grid-template-columns:1fr}}.offer-privacy a{color:inherit}';

export function language(locale) {
  return locale.split('-')[0];
}

function picture(prefix, shot, alt, { sizes, eager }) {
  const v = (fmt, w) => `${shot.base}-${w}.${fmt}`;
  const set = (fmt) => [440, 880].map((w) => `${prefix}${v(fmt, w)} ${w}w`).join(', ');
  const load = eager ? 'decoding="async" fetchpriority="high"' : 'decoding="async" loading="lazy"';
  return `<picture><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><img src="${prefix}${v('webp', 880)}" srcset="${set('webp')}" sizes="${sizes}" width="880" height="1912" alt="${e(alt)}" ${load}></picture>`;
}

function shotLink(prefix, shot, alt, options) {
  const large = `${prefix}${shot.base}-880.webp`;
  return `<a class="shot-link" href="${large}" data-screenshot data-caption="${e(alt)}" aria-label="${e(alt)}">${picture(prefix, shot, alt, options)}</a>`;
}

function jsonLd(cfg, app, t, locale, url) {
  const base = cfg.base_url;
  const store = cfg.app_store_url;
  const graph = [
    { '@type': 'Person', '@id': PERSON_ID, name: 'Benjamin Dupin', url: 'https://bnjdpn.com/', sameAs: [cfg.developer_profile_url] },
    { '@type': 'WebSite', '@id': `${base}#website`, url: base, name: cfg.app_name, publisher: { '@id': PERSON_ID } },
    {
      '@type': 'SoftwareApplication',
      '@id': `${base}#software`,
      name: cfg.app_name,
      alternateName: app.storeNames?.[locale] ?? cfg.app_name,
      description: t.description,
      url: base,
      image: `${base}${cfg.social_image_path}`,
      applicationCategory: app.applicationCategory,
      operatingSystem: app.operatingSystem,
      offers: { '@type': 'Offer', price: '0', priceCurrency: app.currency[locale], url: store },
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

export function renderHome({ cfg, app, ui: uiByLanguage, names, locale }) {
  const lang = language(locale);
  const t = app.locales[lang];
  const ui = uiByLanguage[lang];
  if (!t || !ui) throw new Error(`Missing copy for ${locale}`);
  const primary = locale === cfg.primary_locale;
  const prefix = primary ? '' : '../';
  const url = localeUrl(cfg, locale);
  const shots = cfg.screenshots[locale];
  const store = cfg.app_store_url;
  const ogLocales = cfg.locales.map(({ code }) => uiByLanguage[language(code)].ogLocale);
  const ownOg = ui.ogLocale;
  const legal = (kind) => primary ? `${cfg.base_url}${kind}` : `${cfg.base_url}${locale}/${kind}`;
  const guide = app.guides?.[locale];
  const aliases = cfg.fragment_aliases ?? {};
  const anchors = (key) => (aliases[key] ?? []).map((id) => `<span class="legacy-anchor" id="${e(id)}" aria-hidden="true"></span>`).join('');
  const meta = [
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${e(cfg.app_name)}">`,
    `<meta property="og:locale" content="${ownOg}">`,
    ...ogLocales.filter((x) => x !== ownOg).map((x) => `<meta property="og:locale:alternate" content="${x}">`),
    `<meta property="og:title" content="${e(t.title)}">`,
    `<meta property="og:description" content="${e(t.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${cfg.base_url}${cfg.social_image_path}">`,
    `<meta property="og:image:type" content="image/jpeg">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${e(t.alts[0])}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${e(t.title)}">`,
    `<meta name="twitter:description" content="${e(t.description)}">`,
    `<meta name="twitter:image" content="${cfg.base_url}${cfg.social_image_path}">`,
    `<meta name="twitter:image:alt" content="${e(t.alts[0])}">`,
  ];
  const alternates = [
    ...hreflangLinks(cfg).map(({ locale: l, url: u }) => `<link rel="alternate" hreflang="${l}" href="${u}">`),
    `<link rel="alternate" hreflang="x-default" href="${cfg.base_url}">`,
  ].join('');
  const languages = cfg.locales.map(({ code }) => `<a href="${localeUrl(cfg, code)}" hreflang="${code}" lang="${code}"${code === locale ? ' aria-current="page"' : ''}>${e(names[code])}</a>`).join('');
  const related = (cfg.related_apps ?? []).map((r) => {
    const tagline = r.tagline?.[lang] ?? r.tagline?.en ?? '';
    return `<li><a href="${e(r.site_url)}"><img src="${prefix}${e(r.icon_path)}" width="48" height="48" alt="" loading="lazy" decoding="async"><span><strong>${e(r.name)}</strong><small>${e(tagline)}</small></span><span aria-hidden="true">↗</span></a></li>`;
  }).join('');
  const options = ui.categories.map((label, i) => `<option value="${e(ui.categoryValues[i])}">${e(label)}</option>`).join('');
  const shotSizes = { sizes: '(max-width: 760px) 78vw, 300px', eager: false };

  return `<!doctype html>
<html lang="${locale}" dir="ltr">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${e(t.title)}</title>
  <meta name="description" content="${e(t.description)}">
  <meta name="theme-color" content="${cfg.theme_color}"><meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${url}">${alternates}
  <meta name="apple-itunes-app" content="app-id=${app.appStoreId}"><link rel="icon" href="${prefix}assets/app-icon.png"><link rel="apple-touch-icon" href="${prefix}assets/app-icon.png"><link rel="manifest" href="${prefix}site.webmanifest">
  <link rel="stylesheet" href="${prefix}assets/base.css"><link rel="stylesheet" href="${prefix}assets/theme.css"><style>${INLINE_CSS}</style>
  <meta name="author" content="Benjamin Dupin"><link rel="author" href="${cfg.developer_profile_url}">
  ${meta.join('\n  ')}
  <script type="application/ld+json">${jsonLd(cfg, app, t, locale, url)}</script>
</head>
<body>
  <a class="skip-link" href="#main">${e(ui.skip)}</a>
  <header class="site-header">
    <a class="brand" href="./"><img src="${prefix}assets/app-icon.png" width="36" height="36" alt=""><span>${e(cfg.app_name)}</span></a>
    <nav class="site-nav" aria-label="${e(ui.navMain)}"><a href="#features">${e(t.navModes)}</a><a href="#free-and-pro">${e(t.navOffer)}</a><a href="#contact">${e(ui.support)}</a><a href="https://bnjdpn.com/">${e(ui.moreApps)} <span aria-hidden="true">↗</span></a></nav>
    <details class="language-menu"><summary>${e(ui.language)}</summary><nav aria-label="${e(ui.language)}">${languages}</nav></details>
  </header>
  <main id="main">
    ${anchors('hero')}
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">${e(t.eyebrow)}</p>
        <h1 id="hero-title">${e(t.h1)}</h1>
        <p class="hero-intro">${e(t.intro)}</p>
        <div class="hero-actions"><a class="app-store-action" href="${e(store)}" rel="external"><img src="${prefix}${cfg.app_store_badges[locale]}" width="120" height="40" alt="${e(ui.badgeAlt)}"></a>${guide ? `<a class="text-link" href="${cfg.base_url}${guide}">${e(ui.guide)}<span aria-hidden="true">↗</span></a>` : ''}</div>
        <p class="store-note">${e(t.storeNote)}</p>
      </div>
      <figure class="hero-visual">${shotLink(prefix, shots[0], t.alts[0], { sizes: '(max-width: 700px) 76vw, 300px', eager: true })}</figure>
    </section>

    ${anchors('features')}
    <section class="story" id="features" aria-labelledby="features-title">
      <header class="story-heading"><p class="section-kicker">${e(t.modesKicker)}</p><h2 id="features-title">${e(t.modesTitle)}</h2></header>
      <div class="timer-workbench">
        <dl class="mode-list">${t.modes.map(([name, text]) => `<div><dt>${e(name)}</dt><dd>${e(text)}</dd></div>`).join('')}</dl>
        <div class="timer-pair">${[1, 2].map((i) => `<figure class="product-shot"><figcaption class="shot-caption">${e(app.shotCaptions[i - 1])}</figcaption>${shotLink(prefix, shots[i], t.alts[i], shotSizes)}</figure>`).join('')}</div>
      </div>
    </section>

    <section class="story" id="workout" aria-labelledby="workout-title">
      <header class="story-heading"><p class="section-kicker">${e(t.workoutKicker)}</p><h2 id="workout-title">${e(t.workoutTitle)}</h2></header>
      <div class="feature-list feature-grid">${t.workout.map(([title, text]) => `<article class="feature-item"><div><h3>${e(title)}</h3><p>${e(text)}</p></div></article>`).join('')}</div>
    </section>

    <div class="story">
      <section class="offer-comparison" id="free-and-pro" aria-labelledby="offer-title">
        <header><p class="section-kicker">${e(t.navOffer)}</p><h2 id="offer-title">${e(t.offerTitle)}</h2><p class="offer-intro">${e(t.offerIntro)}</p></header>
        <div class="offer-options">
          <article class="offer-option"><h3>${e(t.freeTitle)}</h3><ul>${t.free.map((x) => `<li>${e(x)}</li>`).join('')}</ul></article>
          <article class="offer-option"><h3>${e(t.proTitle)}</h3><ul>${t.pro.map((x) => `<li>${e(x)}</li>`).join('')}</ul></article>
        </div>
        <p class="offer-terms">${e(t.prices)} ${e(t.terms)}</p>
        <p class="offer-terms offer-privacy">${e(t.privacy)} <a href="${legal('privacy')}">${e(t.privacyLink)}</a></p>
        <a class="text-link" href="${e(store)}" rel="external">${e(t.cta)}<span aria-hidden="true">↗</span></a>
      </section>
    </div>

    ${anchors('related')}
    <section class="related-section" id="more-apps" aria-labelledby="related-title"><h2 id="related-title">${e(t.relatedTitle)}</h2><ul class="related-links">${related}</ul></section>

    ${anchors('contact')}
    <section class="support-section" id="contact" aria-labelledby="contact-title">
      <header><p class="section-kicker">${e(ui.support)}</p><h2 id="contact-title">${e(t.supportTitle)}</h2><p>${e(t.supportIntro)}</p></header>
      <form class="support-form" action="/api/contact" method="POST" data-sending="${e(ui.formSending)}" data-success="${e(ui.formSuccess)}" data-error="${e(ui.formError)}">
        <input type="hidden" name="app" value="${e(cfg.app_name)}"><input type="hidden" name="_subject" value="${e(cfg.app_name)} support request"><label class="honeypot" aria-hidden="true">Leave empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>
        <label><span>${e(ui.labels.category)}</span><select name="category" required><option value="" selected disabled>—</option>${options}</select></label>
        <label><span>${e(ui.labels.email)}</span><input type="email" name="email" autocomplete="email" required></label>
        <label><span>${e(ui.labels.appVersion)}</span><input type="text" name="app_version"></label><label><span>${e(ui.labels.osVersion)}</span><input type="text" name="os_version"></label>
        <label class="message-field"><span>${e(ui.labels.message)}</span><textarea name="message" required></textarea></label>
        <div class="cf-turnstile" data-sitekey="0x4AAAAAAFb8sZbCULV4skmB" data-action="contact"></div>
        <button type="submit">${e(ui.send)}</button><p class="form-status" role="status" aria-live="polite"></p>
      </form>
    </section>
  </main>
  <footer class="site-footer"><p><strong>${e(cfg.app_name)}</strong><br>${e(t.footer)}</p><nav aria-label="${e(ui.legalNav)}"><a href="${legal('privacy')}">${e(ui.privacy)}</a><a href="${legal('terms')}">${e(ui.terms)}</a><a href="#contact">${e(ui.support)}</a></nav><nav class="seo-author-links" data-portfolio-seo-links aria-label="${e(ui.moreApps)}"><a href="https://bnjdpn.com/">${e(ui.moreApps)}</a><a href="${cfg.developer_profile_url}">Benjamin Dupin · App Store</a></nav>
<small class="trademark-notice">Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc.</small></footer>
  <dialog class="screenshot-dialog" aria-label="${e(ui.dialog)}"><form method="dialog"><button aria-label="${e(ui.close)}">×</button></form><img alt="" width="880" height="1912"></dialog>
  <script src="${prefix}assets/site.js" defer></script>
</body>
</html>
`;
}
