// The home and contact pages: a desktop seen through a CRT monitor.
// Every window is in the HTML. Without JavaScript, :target opens it; with
// assets/desk.js the windows stack, minimize to the taskbar and keep focus.
import { googlePlayBadge, PLAY_DEVELOPER_URL } from './product-site/google-play.mjs';

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const wallpaper = (asset) => `<picture class="wall"><source type="image/avif" media="(max-width: 999px) and (orientation: portrait)" srcset="${asset('assets/desk/hills-tall-480.avif')} 480w, ${asset('assets/desk/hills-tall-720.avif')} 720w" sizes="100vw"><source type="image/webp" media="(max-width: 999px) and (orientation: portrait)" srcset="${asset('assets/desk/hills-tall-480.webp')} 480w, ${asset('assets/desk/hills-tall-720.webp')} 720w" sizes="100vw"><source type="image/avif" srcset="${asset('assets/desk/hills-wide-960.avif')} 960w, ${asset('assets/desk/hills-wide-1280.avif')} 1280w" sizes="(min-width: 1000px) 1140px, 100vw"><img src="${asset('assets/desk/hills-wide-1280.webp')}" srcset="${asset('assets/desk/hills-wide-960.webp')} 960w, ${asset('assets/desk/hills-wide-1280.webp')} 1280w" sizes="(min-width: 1000px) 1140px, 100vw" width="1280" height="720" alt="" fetchpriority="high" decoding="async"></picture>`;

const titleBar = ({ id, icon, title, d, closeHref, minimize = true, cls = '' }) => `<div class="win-bar${cls}">${icon ? `<img src="${icon}" width="16" height="16" alt="">` : '<span class="win-glyph" aria-hidden="true"></span>'}<span class="win-title" id="${id}-bar">${esc(title)}</span>${minimize ? `<a class="win-btn win-min" href="${closeHref}" data-min="${id}" aria-label="${esc(d.minimize)}" title="${esc(d.minimize)}"></a>` : ''}<a class="win-btn win-close" href="${closeHref}" data-close="${id}" aria-label="${esc(d.close)}" title="${esc(d.close)}"></a></div>`;

function appWindow(app, { lang, d, asset, closeHref }) {
  const play = googlePlayBadge(lang);
  const badges = [
    app.appStore ? `<a class="badge" href="${app.appStore}" aria-label="${esc(`App Store, ${app.name}`)}"><img src="${asset(`assets/badges/app-store/${lang}.svg`)}" width="${lang === 'fr' ? 127 : 120}" height="40" alt="${esc(d.appStoreAlt)}"></a>` : '',
    app.play ? `<a class="badge" href="${app.play}" aria-label="${esc(`Google Play, ${app.name}`)}"><img src="${play.src}" width="135" height="40" alt="${esc(play.alt)}"></a>` : '',
  ].join('');
  return `<div class="win win-app" id="${app.id}" role="dialog" aria-labelledby="${app.id}-title">${titleBar({ id: app.id, icon: `/assets/icons/${app.slug}-128.webp`, title: app.name, d, closeHref })}
<article class="product-row" data-app="${app.path}" data-category="${app.category}" data-search="${esc(app.search)}"><div class="win-body"><div class="app-head"><img class="app-icon" src="/assets/icons/${app.slug}-128.webp" width="64" height="64" alt="" loading="lazy" decoding="async"><div><h2 id="${app.id}-title"><a class="row-link" href="${app.href}">${esc(app.name)}</a></h2><p class="devices">${esc(app.devices)}</p></div></div><p class="row-line">${esc(app.line)}</p>${app.availability ? `<p class="note">${esc(app.availability)}</p>` : ''}<p class="badges">${badges || `<span class="note">${esc(d.noStore)}</span>`}</p><p class="win-actions"><a class="xp-button xp-default" href="${app.href}">${esc(d.appPage)}</a><a class="xp-button" href="${app.supportHref}">${esc(d.support)}</a></p></div></article></div>`;
}

const icon = (app, href, eager) => `<li><a class="icon" href="${href}" data-open="${app.id}"><img src="/assets/icons/${app.slug}-128.webp" width="48" height="48" alt="" ${eager ? 'fetchpriority="low"' : 'loading="lazy"'} decoding="async"><span>${esc(app.name)}</span></a></li>`;

function startMenu({ groups, d, t, homeHref, contactHref, onHome, guidesHref }) {
  const target = (id) => (onHome ? `#${id}` : `${homeHref}#${id}`);
  const cats = groups.map((g) => `<li class="sm-cat"><button type="button" class="sm-row" aria-expanded="false" aria-controls="sm-${g.key}"><span>${esc(g.name)}</span><span class="sm-count">${g.apps.length}</span></button><ul class="sm-sub" id="sm-${g.key}">${g.apps.map((a) => `<li><a class="sm-row" href="${target(a.id)}" data-open="${a.id}"><img src="/assets/icons/${a.slug}-128.webp" width="24" height="24" alt="" loading="lazy" decoding="async"><span>${esc(a.name)}</span></a></li>`).join('')}</ul></li>`).join('');
  return `<div class="start-menu" id="start-menu" hidden><div class="sm-head"><span class="sm-mark" aria-hidden="true">b</span><span>Benjamin Dupin</span></div><div class="sm-cols"><nav class="sm-left" aria-label="${esc(d.appsMenu)}"><p class="sm-label">${esc(d.appsMenu)}</p><ul>${cats}</ul></nav><nav class="sm-right" aria-label="${esc(t.nav)}"><ul><li><a class="sm-row" href="${target('about')}" data-open="about">${esc(d.aboutTitle)}</a></li><li><a class="sm-row" href="${guidesHref}" data-open="guides">${esc(d.guides)}</a></li><li><a class="sm-row" href="${contactHref}" data-open="contact">${esc(d.contact)}</a></li></ul><p class="sm-label">${esc(d.stores)}</p><ul><li><a class="sm-row" href="https://apps.apple.com/fr/developer/benjamin-dupin/id1871474236">App Store</a></li><li><a class="sm-row" href="${PLAY_DEVELOPER_URL}">Google Play</a></li></ul></nav></div></div>`;
}

export function renderDesk(o) {
  const { lang, mode, head, jsonLd, groups, upcoming, guideLinks, h, t, d, languagesNav, contactForm, homeHref, asset, footer } = o;
  const onHome = mode === 'home';
  const closeHref = onHome ? '#products' : homeHref;
  const contactHref = `${lang === 'fr' ? '/fr' : ''}/contact/`;
  const apps = groups.flatMap((g) => g.apps);
  let n = 0;
  // On phones each group is a folder: its title bar only shows there.
  const iconGroups = groups.map((g) => `<section class="group" id="${g.key}" aria-labelledby="${g.key}-title">${titleBar({ id: g.key, icon: asset('assets/desk/folder.svg'), title: g.name, d, closeHref, cls: ' folder-bar' })}<h2 class="group-label" id="${g.key}-title">${esc(g.name)}</h2><ol class="apps">${g.apps.map((a) => icon(a, onHome ? `#${a.id}` : `${homeHref}#${a.id}`, n++ < 8)).join('')}</ol></section>`).join('');
  const homeLink = (id) => (onHome ? `#${id}` : `${homeHref}#${id}`);
  const phoneIcon = (href, id, sys, label, folder) => `<li><a class="icon icon-sys" href="${href}" data-open="${id}"${folder ? ' data-folder' : ''}><span class="sys sys-${sys}" aria-hidden="true"></span><span>${esc(label)}</span></a></li>`;
  // Phone desktop (<= 700px): About, one folder per group, Guides, Contact.
  const phoneDesk = `<ul class="apps phone-desk" aria-label="${esc(d.desktop)}">${phoneIcon(homeLink('about'), 'about', 'about', d.aboutTitle)}${groups.map((g) => phoneIcon(homeLink(g.key), g.key, 'folder', g.name, true)).join('')}${phoneIcon(homeLink('guides'), 'guides', 'help', d.guides)}${phoneIcon(onHome ? '#contact' : contactHref, 'contact', 'mail', d.contact)}</ul>`;
  const shortcuts = `<ul class="apps sys-icons" aria-label="${esc(d.shortcuts)}"><li><a class="icon icon-sys" href="${onHome ? '#guides' : `${homeHref}#guides`}" data-open="guides"><span class="sys sys-guides" aria-hidden="true"></span><span>${esc(d.guides)}</span></a></li><li><a class="icon icon-sys" href="${onHome ? '#contact' : contactHref}" data-open="contact"><span class="sys sys-mail" aria-hidden="true"></span><span>${esc(d.contact)}</span></a></li></ul>`;
  const about = onHome ? `<section class="win win-about is-open" id="about" aria-labelledby="hero-title">${titleBar({ id: 'about', title: d.aboutWindow, d, closeHref: '#products' })}<div class="win-body"><h1 id="hero-title">${esc(h.h1)}</h1><p class="intro">${esc(h.intro)}</p><p class="win-actions"><a class="xp-button xp-default" href="${contactHref}" data-open="contact">${esc(h.contactCta)}</a><a class="xp-button" href="#guides" data-open="guides">${esc(d.guides)}</a></p><p class="note">${esc(t.availability)}</p><p class="balloon-hint">${esc(d.balloonHint)}</p></div></section>` : '';
  const guidesWin = onHome ? `<div class="win win-list" id="guides" role="dialog" aria-labelledby="guides-title">${titleBar({ id: 'guides', icon: asset('assets/desk/folder.svg'), title: d.guides, d, closeHref })}<div class="win-body"><h2 id="guides-title">${esc(d.guides)}</h2><ul class="guide-list">${guideLinks}</ul>${upcoming.length ? `<h3>${esc(d.upcoming)}</h3><ul class="guide-list">${upcoming.map((a) => `<li><a href="${a.href}">${esc(a.name)}</a><span>${esc(a.subtitle)}</span></li>`).join('')}</ul>` : ''}</div></div>` : '';
  const directory = apps.concat(upcoming).map((a) => `<li><a href="${a.supportHref}">${esc(a.name)}</a></li>`).join('');
  const contactWin = `<div class="win win-contact${onHome ? '' : ' is-open'}" id="contact" role="dialog" aria-labelledby="contact-title">${titleBar({ id: 'contact', icon: asset('assets/desk/mail.svg'), title: d.contact, d, closeHref, minimize: onHome })}<div class="win-body">${onHome ? `<h2 id="contact-title" data-template="${esc(o.contactTemplate)}" data-generic="${esc(o.contactGeneric)}">${esc(o.contactGeneric)}</h2>` : `<h1 id="contact-title" data-template="${esc(o.contactTemplate)}" data-generic="${esc(o.contactGeneric)}">${esc(o.contactGeneric)}</h1>`}<p>${o.contactIntro}</p>${contactForm}<p class="form-fallback"><button type="button" class="contact" data-contact>${esc(d.formFallback)}</button></p><details class="support-directory"><summary>${esc(h.supportDirectory)}</summary><ul>${directory}</ul></details></div></div>`;
  return `${head}${jsonLd}
<link rel="preload" href="/assets/fonts/pt-sans-400.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/pt-sans-700.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${asset('assets/desk.css')}"><script>(function(r){r.classList.add('js');var w=Math.min(1290,(innerHeight-70)*1.39,innerWidth-48);r.style.setProperty('--z',Math.max(.7,Math.min(1.12,w/1153)).toFixed(3))})(document.documentElement)</script><script src="${asset('assets/desk.js')}" defer></script>${onHome ? `<link rel="prefetch" href="${asset('assets/contact.js')}" as="script">` : `<script src="${asset('assets/contact.js')}" defer></script>`}</head>
<body id="top" class="desk-page" data-page="${mode}" data-contact-script="${asset('assets/contact.js')}">
<a class="skip-link" href="#main">${esc(t.skip)}</a>
<div class="room"><div class="crt"><div class="crt-screen">${wallpaper(asset)}
<main id="main" class="desktop" tabindex="-1">${about}
<section class="icons" id="products" aria-label="${esc(t.apps)}"><div class="index" id="selected">${iconGroups}</div></section>
${shortcuts}
${phoneDesk}
${apps.map((a) => appWindow(a, { lang, d, asset, closeHref })).join('\n')}
${guidesWin}
${contactWin}
</main>
<div class="taskbar"><button type="button" class="start" aria-expanded="false" aria-controls="start-menu"><span class="start-orb" aria-hidden="true">b</span><span class="start-word">${esc(d.start)}</span></button><div class="tasks" role="group" aria-label="${esc(d.openWindows)}"></div><div class="tray">${languagesNav}<time class="clock" aria-label="${esc(d.clock)}"></time></div></div>
${startMenu({ groups, d, t, homeHref, contactHref, onHome, guidesHref: onHome ? '#guides' : `${homeHref}#guides` })}
<div class="glass" aria-hidden="true"></div></div><div class="crt-chin" aria-hidden="true"><span class="crt-brand">bnjdpn</span><span class="crt-vents"></span><span class="crt-power"><span class="crt-led"></span></span></div></div></div>
${footer}
</body></html>
`;
}
