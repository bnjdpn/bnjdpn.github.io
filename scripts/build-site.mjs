import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {productCopy} from '../content/copy.mjs';
import {studioCopy} from '../content/studio-copy.mjs';
import {guides} from '../content/guides.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const readJSON=async path=>JSON.parse(await readFile(resolve(root,path),'utf8'));
const [apps,profile,media]=await Promise.all(['content/catalog.json','content/profile.json','content/preview-media.json'].map(readJSON));
const origin='https://bnjdpn.github.io';
const versions=new Map(await Promise.all(['styles.css','assets/site.js','assets/social/og.jpg','assets/social/og-fr.jpg'].map(async path=>[path,createHash('sha256').update(await readFile(resolve(root,path))).digest('hex').slice(0,12)])));
const asset=path=>`/${path}?v=${versions.get(path)}`;
const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const mail='<a class="contact-mail" href="mailto:contact@bnjdpn.com">contact@bnjdpn.com</a>';
const withMail=text=>esc(text).replaceAll('contact@bnjdpn.com', mail);
const product=path=>apps.find(app=>app.path===path);
const slugOf=app=>app.path.toLowerCase();
const homeFor=lang=>lang==='fr'?'/fr/':'/';
const pagePath=(app,lang,leaf='')=>`${lang==='fr'?'/fr':''}/apps/${slugOf(app)}/${leaf}`;
const urlFor=(app,lang)=>`${origin}/${app.path}/${lang==='fr'?'fr-FR/':''}`;
const storeUrl=app=>`https://apps.apple.com/app/id${app.id}`;
const icon=(app,eager=false)=>`<img class="app-icon" src="/assets/apps/${app.icon}.${app.iconFormat||'webp'}" width="512" height="512" alt="" loading="${eager?'eager':'lazy'}" decoding="async">`;
for(const locales of Object.values(media))for(const item of Object.values(locales)){
 const [x,y,w,h]=item.frame||[0,0,1,1];
 if(![x,y,w,h].every(Number.isFinite)||x<0||y<0||w<=0||h<=0||x+w>1.000001||y+h>1.000001)throw new Error(`Invalid image frame: ${item.src}`);
}
function screen(path,lang,eager=false){
 const item=media[path][lang],[x,y,w,h]=item.frame||[0,0,1,1];
 return `<span class="screen" style="--ratio:${item.width*w/(item.height*h)};--image-width:${100/w}%;--image-left:${-100*x/w}%;--image-top:${-100*y/h}%"><img src="${item.src}" width="${item.width}" height="${item.height}" alt="${esc(product(path).name)}" ${eager?'fetchpriority="high"':'loading="lazy"'} decoding="async"></span>`;
}
function wideShot(path,lang){
 const item=media[path][lang];
 return item.width>item.height?' wide':'';
}
const outputs=new Map();
const guideLink=guide=>`/${guide.path.replace(/index\.html$/,'')}`;
function languages(lang, enHref, frHref){
 const t=studioCopy[lang];
 return `<nav class="languages" aria-label="${t.languages}"><a href="${frHref}" lang="fr" hreflang="fr" ${lang==='fr'?'aria-current="page"':''}>FR</a><a href="${enHref}" lang="en" hreflang="en" ${lang==='en'?'aria-current="page"':''}>EN</a></nav>`;
}
function header(lang, enHref, frHref){
 const t=studioCopy[lang], home=homeFor(lang);
 return `<a class="skip-link" href="#main">${t.skip}</a><header class="masthead wrap"><a class="brand" href="${home}">bnjdpn</a><nav class="main-nav" aria-label="${t.nav}"><a href="${home}#products">${t.apps}</a><a href="${home}#guides">${t.guidesNav}</a><a href="${home}#contact">${t.contactTitle}</a></nav>${mail}${languages(lang,enHref,frHref)}</header>`;
}
function footer(lang){
 const t=studioCopy[lang], home=homeFor(lang);
 return `<footer class="footer"><div class="wrap"><a class="footer-wordmark" href="${home}">Benjamin Dupin</a><div class="footer-bottom"><p>© 2026 Benjamin Dupin<span>${t.footerLine}</span></p><p>${mail}</p><p>${t.noTracking}</p><a href="#top">${t.top}</a></div></div></footer>`;
}
function head({lang,title,description,url,enHref,frHref,social,socialWidth,socialHeight,socialAlt,extra=''}){
 return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}">${extra}<meta name="theme-color" content="#f4f1ea"><meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}"><link rel="alternate" hreflang="en" href="${enHref}"><link rel="alternate" hreflang="fr" href="${frHref}"><link rel="alternate" hreflang="x-default" href="${enHref}"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="manifest" href="/site.webmanifest"><link rel="preload" href="/assets/fonts/instrument-serif-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${asset('styles.css')}">
<meta property="og:type" content="website"><meta property="og:locale" content="${lang==='fr'?'fr_FR':'en_US'}"><meta property="og:locale:alternate" content="${lang==='fr'?'en_US':'fr_FR'}"><meta property="og:site_name" content="bnjdpn"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${social}"><meta property="og:image:width" content="${socialWidth}"><meta property="og:image:height" content="${socialHeight}"><meta property="og:image:alt" content="${esc(socialAlt)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${social}">`;
}
const guideCards=lang=>guides.filter(g=>g.lang===lang).map(g=>`<li><a href="${guideLink(g)}">${esc(g.heading)}</a></li>`).join('');
for(const lang of ['en','fr']){
 const t=studioCopy[lang], home=homeFor(lang), url=origin+home, social=`${origin}${asset(`assets/social/og${lang==='fr'?'-fr':''}.jpg`)}`;
 const graph=[profile,{'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'bnjdpn',inLanguage:['en','fr'],publisher:{'@id':profile['@id']}},{'@type':'CollectionPage','@id':url+'#apps',url,name:t.title,description:t.description,inLanguage:lang,dateModified:'2026-10-08T00:00:00Z',mainEntity:{'@id':url+'#catalogue'}},{'@type':'ItemList','@id':url+'#catalogue',name:t.apps,numberOfItems:apps.length,itemListElement:apps.map((app,i)=>({'@type':'ListItem',position:i+1,name:app.name,url:origin+pagePath(app,lang)}))}];
 const catalog=apps.map(app=>{
  const copy=productCopy[app.path], text=copy[lang];
  const search=esc([app.name,text.devices,text.summary,...text.body].join(' '));
  return `<article class="product-row" data-app="${app.path}" data-category="${copy.category}" data-search="${search}"><a class="product-main" href="${pagePath(app,lang)}">${icon(app)}<span><p class="product-category">${t.categories[copy.category]}</p><h3>${esc(app.name)}</h3><p class="product-summary">${esc(text.summary)}</p><p class="product-platform">${esc(text.devices)}</p></span></a><a class="store-link" href="${storeUrl(app)}" aria-label="App Store, ${esc(app.name)}">App Store</a></article>`;
 }).join('\n');
 const directory=apps.map(app=>`<li><a href="${pagePath(app,lang,'support/')}">${esc(app.name)}</a></li>`).join('');
 outputs.set(lang==='en'?'index.html':'fr/index.html',`${head({lang,title:t.title,description:t.description,url,enHref:origin+'/',frHref:origin+'/fr/',social,socialWidth:1200,socialHeight:630,socialAlt:t.title,extra:'<meta name="google-site-verification" content="Bs6cO9WFohARbIFhvij399ZDgCetytfajAwoCQHBB48">'})}
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph})}</script><script src="${asset('assets/site.js')}" defer></script></head>
<body id="top">${header(lang,'/','/fr/')}
<main id="main" tabindex="-1"><section class="intro wrap" id="about" aria-labelledby="hero-title"><h1 id="hero-title">${t.h1}</h1><p>${t.intro}</p><p>${mail}</p></section>
<section class="catalog wrap" id="products" aria-labelledby="selected"><h2 id="selected">${t.catalogTitle}</h2><div class="catalog-tools" hidden><div class="filters" role="group" aria-label="${t.filterLabel}"><button type="button" data-filter="all" aria-pressed="true">${t.all}<span>${apps.length}</span></button>${Object.entries(t.categories).map(([key,label])=>`<button type="button" data-filter="${key}" aria-pressed="false">${label}<span>${apps.filter(app=>productCopy[app.path].category===key).length}</span></button>`).join('')}</div><label class="search"><span class="sr-only">${t.search}</span><input type="search" id="app-search" placeholder="${t.placeholder}" autocomplete="off"></label></div><div class="catalog-summary" hidden><p id="result-count" role="status" aria-live="polite" data-label="${t.results}" data-singular="${t.singular}">${apps.length} ${t.results}</p><button type="button" id="clear-filters">${t.clear}</button></div><div class="product-index" id="product-index">${catalog}</div><div id="no-results" hidden><h3>${t.empty}</h3><p>${t.emptyText}</p></div><p class="availability-note">${t.availability}</p></section>
<section class="guides-index wrap" id="guides" aria-labelledby="guides-title"><h2 id="guides-title">${t.guidesTitle}</h2><p>${t.guidesIntro}</p><ul class="guide-list">${guideCards(lang)}</ul></section>
<section class="contact wrap" id="contact" aria-labelledby="contact-title"><h2 id="contact-title">${t.contactTitle}</h2><p>${withMail(t.contactText)}</p><details class="support-directory"><summary>${t.supportDirectory}</summary><ul>${directory}</ul></details></section></main>
${footer(lang)}</body></html>
`);
 for(const app of apps){
  const copy=productCopy[app.path], text=copy[lang];
  const local=pagePath(app,lang), support=pagePath(app,lang,'support/'), privacy=pagePath(app,lang,'privacy/');
  const en=origin+pagePath(app,'en'), fr=origin+pagePath(app,'fr');
  const title=`${app.name}. ${t.title}`;
  const description=text.summary;
  const shot=media[app.path][lang];
  const socialAbs=origin+shot.src;
  const crumbs=`<p class="crumbs"><a href="${home}#products">${t.homeLabel}</a></p>`;
  const links=`<ul class="app-links"><li><a href="${storeUrl(app)}">${t.store}</a></li><li><a href="${support}">${t.support}</a></li><li><a href="${privacy}">${t.privacy}</a></li><li><a href="${urlFor(app,lang)}">${t.productSite}</a></li></ul>`;
  outputs.set((lang==='fr'?'fr/':'')+`apps/${slugOf(app)}/index.html`,`${head({lang,title,description,url:origin+local,enHref:en,frHref:fr,social:socialAbs,socialWidth:shot.width,socialHeight:shot.height,socialAlt:app.name})}
</head><body id="top">${header(lang,en,fr)}
<main id="main" tabindex="-1"><article class="app-page wrap">${crumbs}<p class="product-category">${t.categories[copy.category]}</p><div class="app-heading">${icon(app,true)}<div><h1>${esc(app.name)}</h1><p class="product-platform">${esc(text.devices)}</p></div></div><p>${mail}</p><figure class="app-shot${wideShot(app.path,lang)}">${screen(app.path,lang,true)}<figcaption>${t.shotCaption}</figcaption></figure>${text.body.map(paragraph=>`<p>${esc(paragraph)}</p>`).join('')}${links}</article></main>
${footer(lang)}</body></html>
`);
  outputs.set((lang==='fr'?'fr/':'')+`apps/${slugOf(app)}/support/index.html`,`${head({lang,title:`${t.support}. ${title}`,description:text.summary,url:origin+support,enHref:origin+pagePath(app,'en','support/'),frHref:origin+pagePath(app,'fr','support/'),social:socialAbs,socialWidth:shot.width,socialHeight:shot.height,socialAlt:app.name})}
</head><body id="top">${header(lang,origin+pagePath(app,'en','support/'),origin+pagePath(app,'fr','support/'))}
<main id="main" tabindex="-1"><article class="app-page wrap">${crumbs}<h1>${esc(app.name)}. ${t.support}</h1><p>${withMail(t.supportLead)}</p><p>${t.supportExisting}</p><p><a href="${copy.productSupport[lang]}">${esc(copy.productSupport[lang])}</a></p><p><a href="${local}">${esc(app.name)}</a></p></article></main>
${footer(lang)}</body></html>
`);
  outputs.set((lang==='fr'?'fr/':'')+`apps/${slugOf(app)}/privacy/index.html`,`${head({lang,title:`${t.privacy}. ${title}`,description:text.summary,url:origin+privacy,enHref:origin+pagePath(app,'en','privacy/'),frHref:origin+pagePath(app,'fr','privacy/'),social:socialAbs,socialWidth:shot.width,socialHeight:shot.height,socialAlt:app.name})}
</head><body id="top">${header(lang,origin+pagePath(app,'en','privacy/'),origin+pagePath(app,'fr','privacy/'))}
<main id="main" tabindex="-1"><article class="app-page wrap">${crumbs}<h1>${esc(app.name)}. ${t.privacy}</h1><p>${t.privacyLead}</p><p><a href="${copy.privacy[lang]}">${esc(copy.privacy[lang])}</a></p><p>${withMail(t.privacyMail)}</p><p><a href="${local}">${esc(app.name)}</a></p></article></main>
${footer(lang)}</body></html>
`);
 }
}
for(const guide of guides){
 const app=product(guide.app), url=origin+guideLink(guide), home=homeFor(guide.lang);
 const preview=media[app.path][guide.lang];
 const local=pagePath(app,guide.lang);
 const enHref=guide.lang==='en'?url:origin+'/'+guide.alternate;
 const frHref=guide.lang==='fr'?url:origin+'/'+guide.alternate;
 const alternatives=guide.alternate?`<link rel="alternate" hreflang="${guide.lang}" href="${url}"><link rel="alternate" hreflang="${guide.lang==='fr'?'en':'fr'}" href="${guide.lang==='fr'?enHref:frHref}">`:'';
 const sections=guide.sections.map((s,i)=>`<section class="guide-section" aria-labelledby="step-${i}"><span class="guide-step">${String(i+1).padStart(2,'0')}</span><div><h2 id="step-${i}">${esc(s.heading)}</h2><p>${esc(s.body)}</p></div></section>`).join('');
 const langNav=guide.alternate?`<nav class="languages" aria-label="${guide.lang==='fr'?'Langues':'Languages'}"><a href="/${guide.alternate}" lang="${guide.lang==='fr'?'en':'fr'}">${guide.lang==='fr'?'EN':'FR'}</a></nav>`:'';
 outputs.set(guide.path,`<!doctype html>
<html lang="${guide.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(guide.title)}</title><meta name="description" content="${esc(guide.description)}"><meta name="robots" content="index, follow, max-image-preview:large"><meta name="theme-color" content="#f4f1ea"><link rel="canonical" href="${url}">${alternatives}<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${asset('styles.css')}"><meta property="og:type" content="article"><meta property="og:locale" content="${guide.lang==='fr'?'fr_FR':'en_US'}"><meta property="og:site_name" content="bnjdpn"><meta property="og:title" content="${esc(guide.title)}"><meta property="og:description" content="${esc(guide.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin+preview.src}"><meta property="og:image:width" content="${preview.width}"><meta property="og:image:height" content="${preview.height}"><meta property="og:image:alt" content="${esc(guide.imageAlt)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(guide.title)}"><meta name="twitter:description" content="${esc(guide.description)}"><meta name="twitter:image" content="${origin+preview.src}"></head>
<body id="top"><a class="skip-link" href="#main">${guide.lang==='fr'?'Aller au contenu':'Skip to content'}</a><header class="masthead wrap"><a class="brand" href="${home}">bnjdpn</a><nav class="main-nav" aria-label="${guide.lang==='fr'?'Navigation principale':'Main navigation'}"><a href="${home}#products">${guide.back}</a><a href="${local}">${esc(app.name)}</a></nav>${mail}${langNav}</header>
<main id="main" tabindex="-1"><article class="guide wrap"><div class="guide-hero"><div><p class="product-category">${esc(guide.kicker)}</p><h1>${esc(guide.heading)}</h1><p class="guide-intro">${esc(guide.intro)}</p></div><figure class="app-shot${wideShot(app.path,guide.lang)}">${screen(app.path,guide.lang,true)}<figcaption>${guide.lang==='fr'?'Écran de l\'application publiée.':'Screen from the published app.'}</figcaption></figure></div><div class="guide-body" id="steps">${sections}<aside class="guide-note"><p>${esc(guide.note)}</p></aside><p class="app-links"><a href="${esc(guide.storeUrl)}">${esc(guide.storeLabel)}</a><a href="${local}">${esc(guide.productLabel)}</a></p></div></article></main>
${footer(guide.lang)}</body></html>
`);
}
const pageLocs=[];
for(const lang of ['en','fr']){
 pageLocs.push({loc:origin+homeFor(lang), en:origin+'/', fr:origin+'/fr/'});
}
for(const guide of guides){
 const loc=origin+guideLink(guide);
 pageLocs.push({loc, en:guide.alternate&&guide.lang==='fr'?origin+'/'+guide.alternate:guide.lang==='en'?loc:null, fr:guide.alternate&&guide.lang==='en'?origin+'/'+guide.alternate:guide.lang==='fr'?loc:null, solo:!guide.alternate});
}
for(const app of apps){
 for(const leaf of ['','support/','privacy/']){
  const en=origin+pagePath(app,'en',leaf), fr=origin+pagePath(app,'fr',leaf);
  pageLocs.push({loc:en, en, fr});
  pageLocs.push({loc:fr, en, fr});
 }
}
const seen=new Set();
const sitemapPages=pageLocs.filter(item=>{if(seen.has(item.loc))return false; seen.add(item.loc); return true;});
outputs.set('sitemap-pages.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapPages.map(item=>{
 if(item.solo)return `<url><loc>${item.loc}</loc></url>`;
 const links=[item.en?`<xhtml:link rel="alternate" hreflang="en" href="${item.en}"/>`:'', item.fr?`<xhtml:link rel="alternate" hreflang="fr" href="${item.fr}"/>`:''].filter(Boolean).join('');
 return `<url><loc>${item.loc}</loc>${links}</url>`;
}).join('\n')}\n</urlset>\n`);
outputs.set('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n<sitemap><loc>${origin}/sitemap-pages.xml</loc></sitemap>\n${apps.map(app=>`<sitemap><loc>${origin}/${app.path}/sitemap.xml</loc></sitemap>`).join('\n')}\n</sitemapindex>\n`);
let stale=false;
for(const [path,html] of outputs){if(process.argv.includes('--check')){if(await readFile(resolve(root,path),'utf8').catch(()=>null)!==html){console.error(`Stale generated output: ${path}. Run npm run build.`);stale=true;}}else{await mkdir(dirname(resolve(root,path)),{recursive:true});await writeFile(resolve(root,path),html);}}
if(stale)process.exit(1);
console.log(`✓ ${outputs.size} static outputs ${process.argv.includes('--check')?'are current':'generated'} (English + French, ${apps.length} products)`);
