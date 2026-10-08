import {mkdir, writeFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {productCopy} from '../content/copy.mjs';
import {readFile} from 'node:fs/promises';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(await readFile(resolve(root, 'content/catalog.json'), 'utf8'));
const media = JSON.parse(await readFile(resolve(root, 'content/preview-media.json'), 'utf8'));
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const ui = {
  en: {
    title: 'Apps by Benjamin Dupin',
    description: 'Seventeen iOS apps by Benjamin Dupin. Training, household routines, baby journals, and two games.',
    skip: 'Skip to content',
    nav: 'Main navigation',
    languages: 'Languages',
    apps: 'Apps',
    h1: 'Seventeen apps',
    intro: 'Seventeen apps for iPhone, iPad, Mac, and Apple Watch. Prices and compatible devices are on the App Store.',
    contact: 'Contact',
    fallback: 'Without JavaScript, each app support page lists how to write.',
    open: 'Open',
    store: 'App Store',
    support: 'Support',
    privacy: 'Privacy policy',
    shot: 'Screen from the published app.',
    footerLine: 'iOS apps.',
    noTracking: 'No cookies. No analytics.',
    top: 'Back to top',
    back: 'All apps',
    count: n => `${n} apps`,
    categories: {training: 'Training', everyday: 'Everyday', family: 'Baby and family', play: 'Games'}
  },
  fr: {
    title: 'Applications de Benjamin Dupin',
    description: 'Dix-sept applications iOS de Benjamin Dupin. Sport, routines de la maison, carnets de bébé, et deux jeux.',
    skip: 'Aller au contenu',
    nav: 'Navigation principale',
    languages: 'Langues',
    apps: 'Apps',
    h1: 'Dix-sept applications',
    intro: 'Dix-sept applications pour iPhone, iPad, Mac et Apple Watch. Les prix et les appareils compatibles sont sur l\'App Store.',
    contact: 'Contact',
    fallback: 'Sans JavaScript, la page de support de chaque app indique comment écrire.',
    open: 'Ouvrir',
    store: 'App Store',
    support: 'Support',
    privacy: 'Politique de confidentialité',
    shot: 'Écran de l\'application publiée.',
    footerLine: 'Applications iOS.',
    noTracking: 'Sans cookies. Sans analytics.',
    top: 'Retour en haut',
    back: 'Toutes les apps',
    count: n => `${n} apps`,
    categories: {training: 'Sport', everyday: 'Quotidien', family: 'Bébé et famille', play: 'Jeux'}
  }
};

const order = ['training', 'everyday', 'family', 'play'];
const apps = catalog.map((app, index) => {
  const copy = productCopy[app.path];
  return {
    ...app,
    index: String(index + 1).padStart(2, '0'),
    category: copy.category,
    icon: `/assets/apps/${app.icon}.webp`,
    store: `https://apps.apple.com/app/id${app.id}`,
    support: copy.productSupport,
    privacy: copy.privacy,
    en: {...copy.en, shot: media[app.path].en},
    fr: {...copy.fr, shot: media[app.path].fr}
  };
});

const href = (dir, lang, leaf = '') => `/design-proposals/${dir}/${lang === 'fr' ? 'fr/' : ''}${leaf}`;
const homeHref = (dir, lang) => href(dir, lang);
const appHref = (dir, lang) => href(dir, lang, 'loadsense/');
const dest = (dir, lang, app) => app.path === 'LoadSense' ? appHref(dir, lang) : app.store;

function chrome(dir, lang, page) {
  const t = ui[lang];
  const home = homeHref(dir, lang);
  const other = lang === 'en' ? 'fr' : 'en';
  const otherHref = page === 'app' ? appHref(dir, other) : homeHref(dir, other);
  const here = page === 'app' ? appHref(dir, lang) : home;
  const navHref = page === 'app' ? home : `${here}#apps`;
  const navLabel = page === 'app' ? t.back : t.apps;
  return {t, home, other, otherHref, here, navHref, navLabel};
}

function head(dir, lang, title, description) {
  return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}">
<meta name="robots" content="noindex">
<link rel="stylesheet" href="/design-proposals/${dir}/styles.css"></head>`;
}

function header(dir, lang, page) {
  const {t, home, other, otherHref, navHref, navLabel} = chrome(dir, lang, page);
  return `<body id="top"><a class="skip" href="#main">${esc(t.skip)}</a>
<header class="bar"><a class="brand" href="${home}">bnjdpn</a>
<nav class="main-nav" aria-label="${esc(t.nav)}"><a href="${navHref}">${esc(navLabel)}</a></nav>
<nav class="languages" aria-label="${esc(t.languages)}"><a href="${lang === 'fr' ? herePath(dir, 'fr', page) : otherHref}" lang="fr" hreflang="fr"${lang === 'fr' ? ' aria-current="page"' : ''}>FR</a><a href="${lang === 'en' ? herePath(dir, 'en', page) : otherHref}" lang="en" hreflang="en"${lang === 'en' ? ' aria-current="page"' : ''}>EN</a></nav>
<button type="button" class="contact" data-contact>${esc(t.contact)}</button></header>
<noscript><p class="js-note">${esc(t.fallback)}</p></noscript>`;
}

function herePath(dir, lang, page) {
  return page === 'app' ? appHref(dir, lang) : homeHref(dir, lang);
}

function footer(dir, lang) {
  const t = ui[lang];
  return `<footer class="footer"><a class="who" href="${homeHref(dir, lang)}">Benjamin Dupin</a><p>© 2026 Benjamin Dupin</p><p>${esc(t.footerLine)}</p><p>${esc(t.noTracking)}</p><a href="#top">${esc(t.top)}</a></footer>
<script src="/design-proposals/contact.js" defer></script></body></html>`;
}

function shot(app, lang, eager) {
  const image = app[lang].shot;
  return `<img class="shot" src="${image.src}" width="${image.width}" height="${image.height}" alt=""${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}

function icon(app, eager) {
  return `<img class="icon" src="${app.icon}" width="512" height="512" alt=""${eager ? '' : ' loading="lazy"'} decoding="async">`;
}

function homeA(dir, lang) {
  const t = ui[lang];
  const items = apps.map((app, i) => `<li class="frame"><a href="${dest(dir, lang, app)}">${shot(app, lang, i < 2)}${caption(app, lang, t, false)}</a></li>`).join('');
  return `${head(dir, lang, t.title, t.description)}
${header(dir, lang, 'home')}
<main id="main"><div class="lede"><h1>${esc(t.h1)}</h1><p class="intro">${esc(t.intro)}</p></div>
<ol class="wall" id="apps">${items}</ol></main>
${footer(dir, lang)}`;
}

function caption(app, lang, t, withSummaryInName) {
  const text = app[lang];
  return `<span class="caption">${icon(app)}<span><span class="index">${app.index}</span> <span class="use">${esc(t.categories[app.category])}</span><span class="name">${esc(app.name)}</span><span class="summary">${esc(text.summary)}</span><span class="go">${esc(app.path === 'LoadSense' ? t.open : t.store)}</span></span></span>`;
}

function appA(dir, lang) {
  const t = ui[lang];
  const app = apps.find(item => item.path === 'LoadSense');
  const text = app[lang];
  const title = `LoadSense. ${t.title}`;
  return `${head(dir, lang, title, text.summary)}
${header(dir, lang, 'app')}
<main id="main"><article class="sheet"><figure class="shot-col">${shot(app, lang, true)}<figcaption>${esc(t.shot)}</figcaption></figure>
<div class="facts">${icon(app, true)}<h1>${esc(app.name)}</h1><p class="devices">${esc(text.devices)}</p>${text.body.map(p => `<p>${esc(p)}</p>`).join('')}${links(app, lang, t)}</div></article></main>
${footer(dir, lang)}`;
}

function links(app, lang, t) {
  return `<ul class="links"><li><a href="${app.store}">${esc(t.store)}</a></li><li><a href="${app.support[lang]}">${esc(t.support)}</a></li><li><a href="${app.privacy[lang]}">${esc(t.privacy)}</a></li></ul>`;
}

function homeB(dir, lang) {
  const t = ui[lang];
  const items = apps.map(app => {
    const text = app[lang];
    return `<li class="row"><a href="${dest(dir, lang, app)}"><span class="num">${app.index}</span>${icon(app)}<span class="name">${esc(app.name)}<span class="summary">${esc(text.summary)}</span></span><span class="use">${esc(t.categories[app.category])}</span><span class="go">${esc(app.path === 'LoadSense' ? t.open : t.store)}</span></a><figure class="preview">${shot(app, lang, app.path === 'LoadSense')}<figcaption>${esc(text.summary)}</figcaption></figure></li>`;
  }).join('');
  return `${head(dir, lang, t.title, t.description)}
${header(dir, lang, 'home')}
<main id="main"><div class="lede"><h1 class="catalogue">${esc(t.h1)}</h1><p class="intro">${esc(t.intro)}</p></div>
<ol class="index" id="apps">${items}</ol></main>
${footer(dir, lang)}`;
}

function appB(dir, lang) {
  const t = ui[lang];
  const app = apps.find(item => item.path === 'LoadSense');
  const text = app[lang];
  return `${head(dir, lang, `LoadSense. ${t.title}`, text.summary)}
${header(dir, lang, 'app')}
<main id="main"><article class="poster"><p class="kicker">${app.index} · ${esc(t.categories[app.category])}</p><h1>${esc(app.name)}</h1>${icon(app, true)}<figure>${shot(app, lang, true)}<figcaption>${esc(t.shot)}</figcaption></figure><p class="devices">${esc(text.devices)}</p><div class="prose">${text.body.map(p => `<p>${esc(p)}</p>`).join('')}</div>${links(app, lang, t)}</article></main>
${footer(dir, lang)}`;
}

function homeC(dir, lang) {
  const t = ui[lang];
  const bands = order.map(key => {
    const group = apps.filter(app => app.category === key);
    const items = group.map(app => `<li class="item"><a href="${dest(dir, lang, app)}">${shot(app, lang, app.path === 'LoadSense')}<span class="meta">${icon(app)}<span><span class="name">${esc(app.name)}</span><span class="summary">${esc(app[lang].summary)}</span><span class="go">${esc(app.path === 'LoadSense' ? t.open : t.store)}</span></span></span></a></li>`).join('');
    return `<section class="band ${key}" aria-labelledby="band-${key}"><h2 class="spine" id="band-${key}">${esc(t.categories[key])} <span class="count">${esc(t.count(group.length))}</span></h2><ul class="strip">${items}</ul></section>`;
  }).join('');
  return `${head(dir, lang, t.title, t.description)}
${header(dir, lang, 'home')}
<main id="main"><div class="lede"><h1 id="apps">${esc(t.h1)}</h1><p class="intro">${esc(t.intro)}</p></div>${bands}</main>
${footer(dir, lang)}`;
}

function appC(dir, lang) {
  const t = ui[lang];
  const app = apps.find(item => item.path === 'LoadSense');
  const text = app[lang];
  return `${head(dir, lang, `LoadSense. ${t.title}`, text.summary)}
<body id="top" class="app-training"><a class="skip" href="#main">${esc(t.skip)}</a>
<header class="bar"><a class="brand" href="${homeHref(dir, lang)}">bnjdpn</a>
<nav class="main-nav" aria-label="${esc(t.nav)}"><a href="${homeHref(dir, lang)}">${esc(t.back)}</a></nav>
<nav class="languages" aria-label="${esc(t.languages)}"><a href="${appHref(dir, 'fr')}" lang="fr" hreflang="fr"${lang === 'fr' ? ' aria-current="page"' : ''}>FR</a><a href="${appHref(dir, 'en')}" lang="en" hreflang="en"${lang === 'en' ? ' aria-current="page"' : ''}>EN</a></nav>
<button type="button" class="contact" data-contact>${esc(t.contact)}</button></header>
<noscript><p class="js-note">${esc(t.fallback)}</p></noscript>
<main id="main"><article class="spec training"><header class="spec-head">${icon(app, true)}<div><p class="kicker">${esc(t.categories[app.category])}</p><h1>${esc(app.name)}</h1><p class="devices">${esc(text.devices)}</p></div></header><figure class="stage">${shot(app, lang, true)}<figcaption>${esc(t.shot)}</figcaption></figure><div class="prose">${text.body.map(p => `<p>${esc(p)}</p>`).join('')}</div>${links(app, lang, t)}</article></main>
${footer(dir, lang)}`;
}

const pages = [
  ['a', 'en', 'index.html', homeA],
  ['a', 'fr', 'fr/index.html', homeA],
  ['a', 'en', 'loadsense/index.html', appA],
  ['a', 'fr', 'fr/loadsense/index.html', appA],
  ['b', 'en', 'index.html', homeB],
  ['b', 'fr', 'fr/index.html', homeB],
  ['b', 'en', 'loadsense/index.html', appB],
  ['b', 'fr', 'fr/loadsense/index.html', appB],
  ['c', 'en', 'index.html', homeC],
  ['c', 'fr', 'fr/index.html', homeC],
  ['c', 'en', 'loadsense/index.html', appC],
  ['c', 'fr', 'fr/loadsense/index.html', appC]
];

for (const [dir, lang, path, render] of pages) {
  const file = resolve(root, 'design-proposals', dir, path);
  await mkdir(dirname(file), {recursive: true});
  await writeFile(file, render(dir, lang));
}
console.log(`wrote ${pages.length} prototype pages`);
