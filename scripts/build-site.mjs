import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {productCopy} from '../content/copy.mjs';
import {studioCopy} from '../content/studio-copy.mjs';
import {guides} from '../content/guides.mjs';
import {appDocuments} from '../content/app-documents.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const readJSON=async path=>JSON.parse(await readFile(resolve(root,path),'utf8'));
const [apps,profile,media]=await Promise.all(['content/catalog.json','content/profile.json','content/preview-media.json'].map(readJSON));
const origin='https://bnjdpn.com';
const versions=new Map(await Promise.all(['styles.css','assets/site.js','assets/social/og.jpg','assets/social/og-fr.jpg'].map(async path=>[path,createHash('sha256').update(await readFile(resolve(root,path))).digest('hex').slice(0,12)])));
const asset=path=>`/${path}?v=${versions.get(path)}`;
const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const contactButton=label=>`<button type="button" class="contact" data-contact>${label}</button>`;
const contactNote=text=>`<noscript><p class="js-note">${esc(text)}</p></noscript>`;
const product=path=>apps.find(app=>app.path===path);
const slugOf=app=>app.path.toLowerCase();
const homeFor=lang=>lang==='fr'?'/fr/':'/';
const pagePath=(app,lang,leaf='')=>`${lang==='fr'?'/fr':''}/apps/${slugOf(app)}/${leaf}`;
const urlFor=(app,lang)=>`${origin}/${app.path}/${lang==='fr'?'fr-FR/':''}`;
const storeUrl=app=>`https://apps.apple.com/app/id${app.id}`;
const icon=(app,eager=false)=>`<img class="app-icon" src="/assets/apps/${app.icon}.${app.iconFormat||'webp'}" width="512" height="512" alt="" ${eager?'loading="eager" decoding="sync"':'loading="lazy" decoding="async"'}>`;
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
function languages(lang, enHref, frHref, withHreflang=true){
 const t=studioCopy[lang];
 const fr=withHreflang?' hreflang="fr"':'';
 const en=withHreflang?' hreflang="en"':'';
 return `<nav class="languages" aria-label="${t.languages}"><a href="${frHref}" lang="fr"${fr} ${lang==='fr'?'aria-current="page"':''}>FR</a><a href="${enHref}" lang="en"${en} ${lang==='en'?'aria-current="page"':''}>EN</a></nav>`;
}
function header(lang, enHref, frHref, nav, withHreflang=true, contactFallback=studioCopy[lang].contactFallback){
 const t=studioCopy[lang], home=homeFor(lang);
 const links=nav||`<a href="${home}#products">${t.apps}</a><a href="${home}#guides">${t.guidesNav}</a>`;
 return `<a class="skip-link" href="#main">${t.skip}</a><header class="bar"><a class="brand" href="${home}">bnjdpn</a><nav class="main-nav" aria-label="${t.nav}">${links}</nav><div class="bar-tools">${languages(lang,enHref,frHref,withHreflang)}${contactButton(t.contactTitle)}</div></header>${contactNote(contactFallback)}`;
}
function footer(lang, enHref, frHref, withHreflang=true, footerLine=studioCopy[lang].footerLine){
 const t=studioCopy[lang], home=homeFor(lang);
 return `<footer class="footer"><a class="footer-wordmark" href="${home}">Benjamin Dupin</a>${contactButton(t.contactTitle)}${languages(lang,enHref,frHref,withHreflang)}<p>© 2026 Benjamin Dupin</p><p>${esc(footerLine)}</p><p>${t.noTracking}</p><a href="#top">${t.top}</a></footer>`;
}
function head({lang,title,description,url,enHref,frHref,social,socialWidth,socialHeight,socialAlt,extra=''}){
 return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}">${extra}<meta name="theme-color" content="#121712"><meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}"><link rel="alternate" hreflang="en" href="${enHref}"><link rel="alternate" hreflang="fr" href="${frHref}"><link rel="alternate" hreflang="x-default" href="${enHref}"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="manifest" href="/site.webmanifest"><link rel="preload" href="/assets/fonts/bricolage-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${asset('styles.css')}">
<meta property="og:type" content="website"><meta property="og:locale" content="${lang==='fr'?'fr_FR':'en_US'}"><meta property="og:locale:alternate" content="${lang==='fr'?'en_US':'fr_FR'}"><meta property="og:site_name" content="bnjdpn"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${social}"><meta property="og:image:width" content="${socialWidth}"><meta property="og:image:height" content="${socialHeight}"><meta property="og:image:alt" content="${esc(socialAlt)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${social}">`;
}
const guideCards=lang=>guides.filter(g=>g.lang===lang).map(g=>`<li><a href="${guideLink(g)}">${esc(g.heading)}</a></li>`).join('');
for(const lang of ['en','fr']){
 const t=studioCopy[lang], home=homeFor(lang), url=origin+home, social=`${origin}${asset(`assets/social/og${lang==='fr'?'-fr':''}.jpg`)}`;
 const graph=[profile,{'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'bnjdpn',inLanguage:['en','fr'],publisher:{'@id':profile['@id']}},{'@type':'CollectionPage','@id':url+'#apps',url,name:t.title,description:t.description,inLanguage:lang,dateModified:'2026-10-08T00:00:00Z',mainEntity:{'@id':url+'#catalogue'}},{'@type':'ItemList','@id':url+'#catalogue',name:t.apps,numberOfItems:apps.length,itemListElement:apps.map((app,i)=>({'@type':'ListItem',position:i+1,name:app.name,url:origin+pagePath(app,lang)}))}];
 const catalog=apps.map((app,index)=>{
  const copy=productCopy[app.path], text=copy[lang];
  const search=esc([app.name,text.devices,text.summary,...text.body].join(' '));
  const num=String(index+1).padStart(2,'0');
  return `<li class="entry"><article class="product-row" data-app="${app.path}" data-category="${copy.category}" data-search="${search}"><a class="row-link" href="${pagePath(app,lang)}"><span class="num">${num}</span>${icon(app,index<10)}<span class="name">${esc(app.name)}</span><span class="use">${t.categories[copy.category]}</span></a><a class="store-link" href="${storeUrl(app)}" aria-label="App Store, ${esc(app.name)}">${t.store}</a><figure class="preview">${screen(app.path,lang,index===0)}<figcaption>${esc(text.summary)} ${esc(text.devices)}</figcaption></figure></article></li>`;
 }).join('\n');
 const directory=apps.map(app=>`<li><a href="${pagePath(app,lang,'support/')}">${esc(app.name)}</a></li>`).join('');
 outputs.set(lang==='en'?'index.html':'fr/index.html',`${head({lang,title:t.title,description:t.description,url,enHref:origin+'/',frHref:origin+'/fr/',social,socialWidth:1200,socialHeight:630,socialAlt:t.title,extra:'<meta name="google-site-verification" content="Bs6cO9WFohARbIFhvij399ZDgCetytfajAwoCQHBB48">'})}
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph})}</script><script src="${asset('assets/site.js')}" defer></script></head>
<body id="top">${header(lang,'/','/fr/')}
<main id="main" tabindex="-1"><section class="lede" id="about" aria-labelledby="hero-title"><h1 id="hero-title">${t.h1}</h1><p class="intro">${t.intro}</p></section>
<section class="catalog" id="products"><ol class="index" id="selected">${catalog}</ol><p class="availability-note">${t.availability}</p></section>
<section class="guides-index" id="guides" aria-labelledby="guides-title"><h2 id="guides-title">${t.guidesTitle}</h2><p>${t.guidesIntro}</p><ul class="guide-list">${guideCards(lang)}</ul></section>
<section class="contact-block" id="contact" aria-labelledby="contact-title"><h2 id="contact-title">${t.contactTitle}</h2><p>${esc(t.contactText)}</p>${contactButton(t.contactTitle)}<details class="support-directory"><summary>${t.supportDirectory}</summary><ul>${directory}</ul></details></section></main>
${footer(lang,'/','/fr/')}</body></html>
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
  const links=`<ul class="links"><li><a href="${support}">${t.support}</a></li><li><a href="${privacy}">${t.privacy}</a></li><li><a href="${urlFor(app,lang)}">${t.productSite}</a></li></ul>`;
  outputs.set((lang==='fr'?'fr/':'')+`apps/${slugOf(app)}/index.html`,`${head({lang,title,description,url:origin+local,enHref:en,frHref:fr,social:socialAbs,socialWidth:shot.width,socialHeight:shot.height,socialAlt:app.name})}
<script src="${asset('assets/site.js')}" defer></script></head><body id="top">${header(lang,en,fr)}
<main id="main" tabindex="-1"><article class="poster">${crumbs}<div class="title-row">${icon(app,true)}<div class="title-copy"><p class="kicker">${t.categories[copy.category]}</p><h1>${esc(app.name)}</h1></div></div><p class="devices">${esc(text.devices)}</p><p class="store-row"><a class="store-button" href="${storeUrl(app)}">${t.store}</a></p><figure>${screen(app.path,lang,true)}<figcaption>${t.shotCaption}</figcaption></figure><div class="prose">${text.body.map(paragraph=>`<p>${esc(paragraph)}</p>`).join('')}</div>${links}</article></main>
${footer(lang,en,fr)}</body></html>
`);
  outputs.set((lang==='fr'?'fr/':'')+`apps/${slugOf(app)}/support/index.html`,`${head({lang,title:`${t.support}. ${title}`,description:text.summary,url:origin+support,enHref:origin+pagePath(app,'en','support/'),frHref:origin+pagePath(app,'fr','support/'),social:socialAbs,socialWidth:shot.width,socialHeight:shot.height,socialAlt:app.name})}
<script src="${asset('assets/site.js')}" defer></script></head><body id="top">${header(lang,origin+pagePath(app,'en','support/'),origin+pagePath(app,'fr','support/'))}
<main id="main" tabindex="-1"><article class="plain">${crumbs}<h1>${esc(app.name)}. ${t.support}</h1><p>${esc(t.supportLead)}</p><p>${t.supportExisting}</p><p><a href="${copy.productSupport[lang]}">${esc(copy.productSupport[lang])}</a></p><p><a href="${local}">${esc(app.name)}</a></p></article></main>
${footer(lang,origin+pagePath(app,'en','support/'),origin+pagePath(app,'fr','support/'))}</body></html>
`);
  outputs.set((lang==='fr'?'fr/':'')+`apps/${slugOf(app)}/privacy/index.html`,`${head({lang,title:`${t.privacy}. ${title}`,description:text.summary,url:origin+privacy,enHref:origin+pagePath(app,'en','privacy/'),frHref:origin+pagePath(app,'fr','privacy/'),social:socialAbs,socialWidth:shot.width,socialHeight:shot.height,socialAlt:app.name})}
<script src="${asset('assets/site.js')}" defer></script></head><body id="top">${header(lang,origin+pagePath(app,'en','privacy/'),origin+pagePath(app,'fr','privacy/'))}
<main id="main" tabindex="-1"><article class="plain">${crumbs}<h1>${esc(app.name)}. ${t.privacy}</h1><p>${t.privacyLead}</p><p><a href="${copy.privacy[lang]}">${esc(copy.privacy[lang])}</a></p><p>${esc(t.privacyMail)}</p><p><a href="${local}">${esc(app.name)}</a></p></article></main>
${footer(lang,origin+pagePath(app,'en','privacy/'),origin+pagePath(app,'fr','privacy/'))}</body></html>
`);
 }
}
// These documents do not create a product page, catalogue row or store link.
for(const app of appDocuments){
 for(const lang of ['en','fr']){
  const t=studioCopy[lang], text=app[lang];
  for(const leaf of ['support','privacy']){
   const document=text[leaf], label=t[leaf];
   const en=origin+pagePath(app,'en',leaf+'/'), fr=origin+pagePath(app,'fr',leaf+'/');
   const sections=document.sections.map(section=>`<section><h2>${esc(section.heading)}</h2>${section.paragraphs.map(paragraph=>`<p>${esc(paragraph)}</p>`).join('')}</section>`).join('\n');
   const links=['support','privacy'].filter(other=>other!==leaf).map(other=>`<li><a href="${pagePath(app,lang,other+'/')}">${t[other]}</a></li>`).join('');
   outputs.set(`${lang==='fr'?'fr/':''}apps/${slugOf(app)}/${leaf}/index.html`,`${head({lang,title:`${label}. ${app.name}. Benjamin Dupin`,description:document.description,url:lang==='fr'?fr:en,enHref:en,frHref:fr,social:origin+asset(`assets/social/og${lang==='fr'?'-fr':''}.jpg`),socialWidth:1200,socialHeight:630,socialAlt:t.title})}
<script src="${asset('assets/site.js')}" defer></script></head><body id="top">${header(lang,en,fr,undefined,true,text.contactFallback)}
<main id="main" tabindex="-1"><article class="plain"><p class="crumbs"><a href="${homeFor(lang)}#products">${t.homeLabel}</a></p><h1>${esc(app.name)}. ${label}</h1><p>${esc(text.status)}</p>${leaf==='privacy'?`<p>${esc(text.dateLabel)}${lang==='fr'?'\u00a0':''}: <time datetime="${app.policyDate}">${app.policyDate}</time></p>`:''}
${sections}<section id="contact"><h2>${t.contactTitle}</h2><p>${esc(text.contact)}</p>${contactButton(t.contactTitle)}</section><ul class="links">${links}</ul></article></main>
${footer(lang,en,fr,true,text.footerLine)}</body></html>
`);
  }
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
 const guideNav=`<a href="${home}#products">${guide.back}</a><a href="${local}">${esc(app.name)}</a>`;
 const guideEn=guide.alternate&&guide.lang==='fr'?'/'+guide.alternate:guide.lang==='en'?guideLink(guide):homeFor('en');
 const guideFr=guide.alternate&&guide.lang==='en'?'/'+guide.alternate:guide.lang==='fr'?guideLink(guide):homeFor('fr');
 outputs.set(guide.path,`<!doctype html>
<html lang="${guide.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(guide.title)}</title><meta name="description" content="${esc(guide.description)}"><meta name="robots" content="index, follow, max-image-preview:large"><meta name="theme-color" content="#121712"><link rel="canonical" href="${url}">${alternatives}<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${asset('styles.css')}"><meta property="og:type" content="article"><meta property="og:locale" content="${guide.lang==='fr'?'fr_FR':'en_US'}"><meta property="og:site_name" content="bnjdpn"><meta property="og:title" content="${esc(guide.title)}"><meta property="og:description" content="${esc(guide.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin+preview.src}"><meta property="og:image:width" content="${preview.width}"><meta property="og:image:height" content="${preview.height}"><meta property="og:image:alt" content="${esc(guide.imageAlt)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(guide.title)}"><meta name="twitter:description" content="${esc(guide.description)}"><meta name="twitter:image" content="${origin+preview.src}"><script src="${asset('assets/site.js')}" defer></script></head>
<body id="top">${header(guide.lang,guideEn,guideFr,guideNav,Boolean(guide.alternate))}
<main id="main" tabindex="-1"><article class="guide"><div class="guide-hero"><div><p class="kicker">${esc(guide.kicker)}</p><h1>${esc(guide.heading)}</h1><p class="guide-intro">${esc(guide.intro)}</p></div><figure>${screen(app.path,guide.lang,true)}<figcaption>${guide.lang==='fr'?'Écran de l\'application publiée.':'Screen from the published app.'}</figcaption></figure></div><div class="guide-body" id="steps">${sections}<aside class="guide-note"><p>${esc(guide.note)}</p></aside><p class="app-links"><a href="${esc(guide.storeUrl)}">${esc(guide.storeLabel)}</a><a href="${local}">${esc(guide.productLabel)}</a></p></div></article></main>
${footer(guide.lang,guideEn,guideFr,Boolean(guide.alternate))}</body></html>
`);
}
outputs.set('404.html',`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><meta name="theme-color" content="#121712"><title>Page not found. Benjamin Dupin</title><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${asset('styles.css')}"><script src="${asset('assets/site.js')}" defer></script></head>
<body id="top"><a class="skip-link" href="#main">Skip to content</a><header class="bar"><a class="brand" href="/">bnjdpn</a><div class="bar-tools">${contactButton('Contact')}</div></header>${contactNote(studioCopy.en.contactFallback)}
<main id="main" class="missing" tabindex="-1"><h1>Page not found.</h1><p>This address does not match a page on the site.</p><p><a href="/#products">Apps in English</a></p><section lang="fr"><h2>Page introuvable.</h2><p>Cette adresse ne correspond à aucune page du site.</p><p><a href="/fr/#products">Applications en français</a></p></section></main>
<footer class="footer"><a class="footer-wordmark" href="/">Benjamin Dupin</a>${contactButton('Contact')}<nav class="languages" aria-label="Languages"><a href="/fr/" lang="fr" hreflang="fr">FR</a><a href="/" lang="en" hreflang="en" aria-current="page">EN</a></nav><p>© 2026 Benjamin Dupin</p><p>${studioCopy.en.noTracking}</p></footer></body></html>
`);
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
for(const app of appDocuments){
 for(const leaf of ['support/','privacy/']){
  const en=origin+pagePath(app,'en',leaf), fr=origin+pagePath(app,'fr',leaf);
  pageLocs.push({loc:en,en,fr},{loc:fr,en,fr});
 }
}
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
