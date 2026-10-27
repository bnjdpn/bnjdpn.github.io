import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {productCopy} from '../content/copy.mjs';
import {studioCopy} from '../content/studio-copy.mjs';
import {homeCopy, appLines} from '../content/home-copy.mjs';
import {guides} from '../content/guides.mjs';
import {contactApps, formApps, contactCopy, contactBody} from '../content/contact-page.mjs';
import {appDocuments} from '../content/app-documents.mjs';
import {petitesFormApps, petitesFormPrivacy, petitsPotsFormPrivacy} from '../content/petites-contact.mjs';
import {googlePlayBadge, PLAY_DEVELOPER_URL} from './product-site/google-play.mjs';
import {renderDesk} from './desk.mjs';
import {files as petitsBesoinsFiles} from '../apps/petits-besoins/site/build.mjs';
import {deskCopy} from '../content/desk-copy.mjs';
import {files as petitsPotsFiles} from '../apps/petits-pots/site/build.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const readJSON=async path=>JSON.parse(await readFile(resolve(root,path),'utf8'));
const [apps,profile,media,migrated]=await Promise.all(['content/catalog.json','content/profile.json','content/preview-media.json','content/product-sites/migrated.json'].map(readJSON));
const GROUPS=['training','everyday','family','play'];
const groupOf=app=>app.catalogue?app.catalogue.category:productCopy[app.path].category;
// Home order: by use, then catalogue order inside each group.
const catalogue=GROUPS.flatMap(key=>[...apps,...appDocuments.filter(app=>app.catalogue)].filter(app=>groupOf(app)===key));
const origin='https://bnjdpn.com';
const versions=new Map(await Promise.all(['assets/contact.css','assets/contact.js','assets/desk.css','assets/desk.js','assets/badges/app-store/en.svg','assets/badges/app-store/fr.svg',...['tall-480','tall-720','wide-960','wide-1280'].flatMap(n=>[`assets/desk/hills-${n}.avif`,`assets/desk/hills-${n}.webp`]),'styles.css','assets/social/og.jpg','assets/social/og-fr.jpg'].map(async path=>[path,createHash('sha256').update(await readFile(resolve(root,path))).digest('hex').slice(0,12)])));
for (const path of new Set(appDocuments.map(app=>app.socialImage).filter(Boolean))) {
 versions.set(path,createHash('sha256').update(await readFile(resolve(root,path))).digest('hex').slice(0,12));
}
const asset=path=>`/${path}?v=${versions.get(path)}`;
const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const contactButton=label=>`<button type="button" class="contact" data-contact>${label}</button>`;
const contactNote=text=>`<noscript><p class="js-note">${esc(text)}</p></noscript>`;
const product=path=>apps.find(app=>app.path===path);
const slugOf=app=>app.path.toLowerCase();
const homeFor=lang=>lang==='fr'?'/fr/':'/';
const pagePath=(app,lang,leaf='')=>`${lang==='fr'?'/fr':''}/apps/${slugOf(app)}/${leaf}`;
// Apps whose own site is built by scripts/product-site: their /apps/<slug>/ pages
// answer 301 (see _redirects) and every link points to the app site directly.
// Échappée has its own site but keeps /apps/echappee/support/ and privacy/: Google Play links to them.
const ownSites={'petits-besoins':{en:'/petits-besoins/',fr:'/petits-besoins/fr-FR/'},'petits-pots':{en:'/petits-pots/',fr:'/petits-pots/fr-FR/'},Echappee:{en:'/Echappee/',fr:'/Echappee/fr-FR/'}};
const appHref=(app,lang,leaf='')=>{const m=migrated[app.path];if(!m)return !leaf&&ownSites[app.path]?ownSites[app.path][lang]:pagePath(app,lang,leaf);const base=lang==='fr'?m.fr:m.en;return leaf==='support/'?base+'#contact':leaf==='privacy/'?(lang==='fr'?m.privacyFr:m.privacyEn):base;};
const urlFor=(app,lang)=>`${origin}/${app.path}/${lang==='fr'?'fr-FR/':''}`;
const storeUrl=app=>`https://apps.apple.com/app/id${app.id}`;
const iconPath=app=>app.catalogue?.icon||`assets/apps/${app.icon}.${app.iconFormat||'webp'}`;
const icon=(app,eager=false)=>`<img class="app-icon" src="/${iconPath(app)}" width="512" height="512" alt="" ${eager?'loading="eager" decoding="sync"':'loading="lazy" decoding="async"'}>`;
const playUrl=app=>app.package?`https://play.google.com/store/apps/details?id=${app.package}`:null;
const storeLinks=(app,kind,lang)=>[
 app.id?`<a class="${kind}" href="${storeUrl(app)}"${kind==='store-link'?` aria-label="App Store, ${esc(app.name)}"`:''}>${studioCopy[lang].store}</a>`:'',
 playUrl(app)?`<a class="${kind}" href="${playUrl(app)}" aria-label="Google Play, ${esc(app.name)}">Google Play</a>`:''
].filter(Boolean).join(kind==='store-link'?'<br>':' ');
const devicesFor=(app,lang)=>(productCopy[app.path][lang].devices+(app.package?' · Android':'')).replaceAll(', ',' · ');
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
const petitesDisclosure=(app,lang)=>petitesFormApps.has(app.path)?`<p>${esc((['petits-pots','petits-besoins'].includes(app.path)?petitsPotsFormPrivacy:petitesFormPrivacy)[lang])}</p><p><a href="https://www.cloudflare.com/privacypolicy/">${lang==='fr'?'Politique de confidentialité de Cloudflare':'Cloudflare privacy policy'}</a> · <a href="https://www.cloudflare.com/turnstile-privacy-policy/">${lang==='fr'?'Confidentialité de Turnstile':'Turnstile privacy policy'}</a></p>`:'';
const guideLink=guide=>`/${guide.path.replace(/index\.html$/,'')}`;
function languages(lang, enHref, frHref, withHreflang=true){
 const t=studioCopy[lang];
 const fr=withHreflang?' hreflang="fr"':'';
 const en=withHreflang?' hreflang="en"':'';
 return `<nav class="languages" aria-label="${t.languages}"><a href="${frHref}" lang="fr"${fr} ${lang==='fr'?'aria-current="page"':''}>FR</a><a href="${enHref}" lang="en"${en} ${lang==='en'?'aria-current="page"':''}>EN</a></nav>`;
}
function header(lang, enHref, frHref, nav, withHreflang=true, contactFallback=studioCopy[lang].contactFallback){
 const t=studioCopy[lang], home=homeFor(lang);
 const links=nav||`<a href="${home}#products">${t.apps}</a>`;
 return `<a class="skip-link" href="#main">${t.skip}</a><header class="bar"><a class="brand" href="${home}">Benjamin Dupin</a><nav class="main-nav" aria-label="${t.nav}">${links}${contactButton(t.contactTitle)}</nav>${languages(lang,enHref,frHref,withHreflang)}</header>${contactNote(contactFallback)}`;
}
function footer(lang, enHref, frHref, withHreflang=true, footerLine=studioCopy[lang].footerLine){
 const t=studioCopy[lang], home=homeFor(lang);
 return `<footer class="footer"><div class="footer-id"><a class="footer-wordmark" href="${home}">Benjamin Dupin</a><p>${esc(footerLine)}</p></div><nav class="footer-nav" aria-label="${t.nav}"><a href="${home}#products">${t.apps}</a><a href="${home}#guides">${t.guidesNav}</a>${contactButton(t.contactTitle)}<a href="#top">${t.top}</a></nav>${languages(lang,enHref,frHref,withHreflang)}<p class="footer-small">© 2026 Benjamin Dupin. ${t.noTracking}</p></footer>`;
}
function head({lang,title,description,url,enHref,frHref,social,socialWidth,socialHeight,socialAlt,extra='',robots='index, follow, max-image-preview:large',icon,desk=false}){
 return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}">${extra}<meta name="theme-color" content="#f5f2ea"><meta name="robots" content="${robots}">
<link rel="canonical" href="${url}"><link rel="alternate" hreflang="en" href="${enHref}"><link rel="alternate" hreflang="fr" href="${frHref}"><link rel="alternate" hreflang="x-default" href="${enHref}">${icon?`<link rel="icon" href="/assets/icons/${icon}-128.webp" type="image/webp"><link rel="apple-touch-icon" href="/assets/icons/${icon}-180.png">`:'<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">'}<link rel="manifest" href="/site.webmanifest">${desk?'':`<link rel="preload" href="/assets/fonts/instrument-serif-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/dm-sans-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${asset('styles.css')}">`}
<meta property="og:type" content="website"><meta property="og:locale" content="${lang==='fr'?'fr_FR':'en_US'}"><meta property="og:locale:alternate" content="${lang==='fr'?'en_US':'fr_FR'}"><meta property="og:site_name" content="Benjamin Dupin"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${social}"><meta property="og:image:width" content="${socialWidth}"><meta property="og:image:height" content="${socialHeight}"><meta property="og:image:alt" content="${esc(socialAlt)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${social}">`;
}
const APP_STORE_DEVELOPER='https://apps.apple.com/fr/developer/benjamin-dupin/id1871474236';
const deskGroups=lang=>GROUPS.map(key=>({key,name:homeCopy[lang].groups[key][0],apps:catalogue.filter(app=>groupOf(app)===key).map(app=>{
 const doc=Boolean(app.catalogue), line=appLines[app.path][lang==='fr'?1:0], devices=doc?(app.appStoreUrl?'iPhone · iPad · Android':'Android'):devicesFor(app,lang);
 return {id:`app-${slugOf(app)}`,slug:slugOf(app),path:app.path,name:app.name,category:key,line,devices,search:[app.name,line,devices].join(' '),href:appHref(app,lang),supportHref:appHref(app,lang,'support/'),appStore:doc?app.appStoreUrl||null:app.id?storeUrl(app):null,play:doc?app.androidStoreUrl||null:playUrl(app),availability:doc?app.catalogue.availability[lang]:''};
})}));
const deskUpcoming=lang=>appDocuments.filter(app=>app.upcoming).map(app=>({name:app.name,subtitle:app[lang].landing.subtitle,href:pagePath(app,lang),supportHref:appHref(app,lang,'support/')}));
const deskFooter=(lang,line)=>{const t=studioCopy[lang], home=homeFor(lang), d=deskCopy[lang];return `<footer class="footer desk-footer"><div class="footer-id"><a class="footer-wordmark" href="${home}">Benjamin Dupin</a><p>${esc(line)}</p></div><nav class="footer-nav" aria-label="${t.nav}"><a href="${APP_STORE_DEVELOPER}">${esc(d.appStorePage)}</a><a href="${PLAY_DEVELOPER_URL}">${esc(d.playPage)}</a>${contactButton(t.contactTitle)}</nav><p class="footer-small">© 2026 Benjamin Dupin. ${t.noTracking}</p><p class="footer-small">Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</p></footer>`;};
const deskForm=lang=>contactBody(lang,esc).match(/<form id="support-form"[\s\S]*?<\/form>/)[0];
for (const lang of ['en','fr']) {
 const t=contactCopy[lang], en=origin+'/contact/', fr=origin+'/fr/contact/';
 outputs.set(`${lang==='fr'?'fr/':''}contact/index.html`,renderDesk({lang,mode:'contact',head:head({lang,title:t.pageTitle,description:t.intro,url:lang==='fr'?fr:en,enHref:en,frHref:fr,social:origin+asset('assets/social/og.jpg'),socialWidth:1200,socialHeight:630,socialAlt:'Benjamin Dupin',desk:true,extra:'<meta name="referrer" content="strict-origin-when-cross-origin">'}),jsonLd:'',groups:deskGroups(lang),upcoming:deskUpcoming(lang),guideLinks:'',h:homeCopy[lang],t:studioCopy[lang],d:deskCopy[lang],languagesNav:languages(lang,en,fr),contactForm:deskForm(lang),contactTemplate:t.title,contactGeneric:t.genericTitle,contactIntro:t.intro,homeHref:homeFor(lang),asset,footer:deskFooter(lang,studioCopy[lang].footerLine)}));
}
const guideCards=lang=>guides.filter(g=>g.lang===lang).map(g=>`<li><a href="${guideLink(g)}">${esc(g.heading)}</a><span>${esc(g.description)}</span></li>`).join('');
for(const lang of ['en','fr']){
 const t=studioCopy[lang], home=homeFor(lang), url=origin+home, social=`${origin}${asset(`assets/social/og${lang==='fr'?'-fr':''}.jpg`)}`;
 const graph=[profile,{'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'Benjamin Dupin',inLanguage:['en','fr'],publisher:{'@id':profile['@id']}},{'@type':'CollectionPage','@id':url+'#apps',url,name:homeCopy[lang].title,description:homeCopy[lang].description,inLanguage:lang,dateModified:'2026-10-26T00:00:00Z',mainEntity:{'@id':url+'#catalogue'}},{'@type':'ItemList','@id':url+'#catalogue',name:t.apps,numberOfItems:catalogue.length,itemListElement:catalogue.map((app,i)=>({'@type':'ListItem',position:i+1,name:app.name,url:origin+appHref(app,lang)}))}];

 const h=homeCopy[lang];
 outputs.set(lang==='en'?'index.html':'fr/index.html',renderDesk({lang,mode:'home',head:head({lang,title:h.title,description:h.description,url,enHref:origin+'/',frHref:origin+'/fr/',social,socialWidth:1200,socialHeight:630,socialAlt:h.title,desk:true,extra:'<meta name="google-site-verification" content="Bs6cO9WFohARbIFhvij399ZDgCetytfajAwoCQHBB48">'}),jsonLd:`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph})}</script>`,groups:deskGroups(lang),upcoming:deskUpcoming(lang),guideLinks:guideCards(lang),h,t,d:deskCopy[lang],languagesNav:languages(lang,'/','/fr/'),contactForm:deskForm(lang),contactTemplate:contactCopy[lang].title,contactGeneric:contactCopy[lang].genericTitle,contactIntro:contactCopy[lang].intro,homeHref:home,asset,footer:deskFooter(lang,h.footerLine)}));
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
</head><body id="top">${header(lang,en,fr)}
<main id="main" tabindex="-1"><article class="poster">${crumbs}<div class="title-row">${icon(app,true)}<div class="title-copy"><p class="kicker">${t.categories[copy.category]}</p><h1>${esc(app.name)}</h1></div></div><p class="devices">${esc(devicesFor(app,lang))}</p><p class="store-row">${storeLinks(app,'store-button',lang)}</p><figure>${screen(app.path,lang,true)}<figcaption>${t.shotCaption}</figcaption></figure><div class="prose">${text.body.map(paragraph=>`<p>${esc(paragraph)}</p>`).join('')}</div>${links}</article></main>
${footer(lang,en,fr,true,app.package?t.catalogueFooterLine:t.footerLine)}</body></html>
`);
  outputs.set((lang==='fr'?'fr/':'')+`apps/${slugOf(app)}/support/index.html`,`${head({lang,title:`${t.support}. ${title}`,description:text.summary,url:origin+support,enHref:origin+pagePath(app,'en','support/'),frHref:origin+pagePath(app,'fr','support/'),social:socialAbs,socialWidth:shot.width,socialHeight:shot.height,socialAlt:app.name})}
</head><body id="top">${header(lang,origin+pagePath(app,'en','support/'),origin+pagePath(app,'fr','support/'))}
<main id="main" tabindex="-1"><article class="plain">${crumbs}<h1>${esc(app.name)}. ${t.support}</h1><p>${esc(t.supportLead)}</p><p>${t.supportExisting}</p><p><a href="${copy.productSupport[lang]}">${esc(copy.productSupport[lang])}</a></p>${petitesDisclosure(app,lang)}<p><a href="${local}">${esc(app.name)}</a></p></article></main>
${footer(lang,origin+pagePath(app,'en','support/'),origin+pagePath(app,'fr','support/'))}</body></html>
`);
  outputs.set((lang==='fr'?'fr/':'')+`apps/${slugOf(app)}/privacy/index.html`,`${head({lang,title:`${t.privacy}. ${title}`,description:text.summary,url:origin+privacy,enHref:origin+pagePath(app,'en','privacy/'),frHref:origin+pagePath(app,'fr','privacy/'),social:socialAbs,socialWidth:shot.width,socialHeight:shot.height,socialAlt:app.name})}
</head><body id="top">${header(lang,origin+pagePath(app,'en','privacy/'),origin+pagePath(app,'fr','privacy/'))}
<main id="main" tabindex="-1"><article class="plain">${crumbs}<h1>${esc(app.name)}. ${t.privacy}</h1>${copy.privacyParagraphs?.[lang] ? `<p><a href="${copy.privacy[lang]}">${t.privacy} — iPhone, iPad, Mac</a></p><h2>Android</h2>${copy.privacyParagraphs[lang].map(paragraph=>`<p>${paragraph}</p>`).join('')}` : `<p>${t.privacyLead}</p><p><a href="${copy.privacy[lang]}">${esc(copy.privacy[lang])}</a></p><p>${esc(t.privacyMail)}</p>`}${petitesDisclosure(app,lang)}<p><a href="${local}">${esc(app.name)}</a></p></article></main>
${footer(lang,origin+pagePath(app,'en','privacy/'),origin+pagePath(app,'fr','privacy/'))}</body></html>
`);
 }
}
// Documents keep their existing routes; published Android entries also appear in the catalogue.
for(const app of appDocuments){
 for(const lang of ['en','fr']){
  const t=studioCopy[lang], text=app[lang];
  for(const leaf of ['landing','support','privacy']){
   const document=text[leaf];
   if(!document)continue;
   const label=leaf==='landing'?app.name:t[leaf], route=leaf==='landing'?'':leaf+'/';
   const en=origin+pagePath(app,'en',route), fr=origin+pagePath(app,'fr',route);
   const sections=document.sections.map(section=>`<section><h2>${esc(section.heading)}</h2>${section.paragraphs.map(paragraph=>`<p>${esc(paragraph)}</p>`).join('')}</section>`).join('\n');
   const links=['landing','support','privacy'].filter(other=>text[other]&&other!==leaf).map(other=>`<li><a href="${pagePath(app,lang,other==='landing'?'':other+'/')}">${other==='landing'?app.name:t[other]}</a></li>`).join('');
   outputs.set(`${lang==='fr'?'fr/':''}apps/${slugOf(app)}/${route}index.html`,`${head({lang,title:leaf==='landing'?`${app.name}. ${document.subtitle}. Benjamin Dupin`:`${label}. ${app.name}. Benjamin Dupin`,description:leaf==='landing'&&app.catalogue?`${app.name}. ${document.subtitle}. ${app.catalogue.availability[lang]}`:document.description,url:lang==='fr'?fr:en,enHref:en,frHref:fr,social:origin+asset(app.socialImage||`assets/social/og${lang==='fr'?'-fr':''}.jpg`),socialWidth:app.socialImage?1024:1200,socialHeight:app.socialImage?1024:630,socialAlt:app.socialImage?app.name:'Benjamin Dupin',robots:app.sitemap===false?'noindex, follow':undefined,icon:slugOf(app),extra:`${app.appStoreId&&leaf!=='landing'?`<meta name="apple-itunes-app" content="app-id=${app.appStoreId}">`:''}<meta name="twitter:image:alt" content="${esc(app.socialImage?app.name:'Benjamin Dupin')}"><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'SoftwareApplication',name:app.name,operatingSystem:app.operatingSystem||(leaf==='landing'&&app.androidStoreUrl&&!app.appStoreUrl?'Android 8 or later':'iOS 17 or later; Android 8 or later'),applicationCategory:app.applicationCategory||'LifestyleApplication',url:lang==='fr'?fr:en,publisher:{'@type':'Person',name:'Benjamin Dupin'},description:leaf==='landing'&&app.catalogue?app.catalogue.availability[lang]:text.status})}</script>`})}
</head><body id="top">${header(lang,en,fr,undefined,true,text.contactFallback)}
<main id="main" tabindex="-1"><article class="plain"><p class="crumbs"><a href="${homeFor(lang)}#products">${t.homeLabel}</a></p><h1>${leaf==='landing'?esc(app.name):esc(app.name)+'. '+label}</h1><p>${esc(leaf==='landing'&&app.catalogue?app.catalogue.availability[lang]:text.status)}</p>${leaf==='landing'&&app.androidStoreUrl?`<p class="app-links">${app.appStoreUrl?`<a class="store-badge" href="${esc(app.appStoreUrl)}"><img src="${asset(`assets/badges/app-store/${lang}.svg`)}" width="${lang==='fr'?152:144}" height="48" alt="${lang==='fr'?'Télécharger dans l’App Store':'Download on the App Store'}"></a>`:''}<a class="store-badge" href="${esc(app.androidStoreUrl)}"><img src="${googlePlayBadge(lang).src}" width="${googlePlayBadge(lang).width}" height="${googlePlayBadge(lang).height}" alt="${esc(googlePlayBadge(lang).alt)}"></a></p>`:''}${leaf==='privacy'?`<p>${esc(text.dateLabel)}${lang==='fr'?'\u00a0':''}: <time datetime="${app.policyDate}">${app.policyDate}</time></p>`:''}
${sections}<section id="contact"><h2>${t.contactTitle}</h2><p>${esc(text.contact)}</p>${contactButton(t.contactTitle)}</section>${links?`<ul class="links">${links}</ul>`:''}</article></main>
${footer(lang,en,fr,true,leaf==='landing'&&app.catalogue?app.catalogue.availability[lang]:text.footerLine)}</body></html>
`);
  }
 }
}
for(const guide of guides){
 const app=product(guide.app), url=origin+guideLink(guide), home=homeFor(guide.lang);
 const preview=media[app.path][guide.lang];
 const local=appHref(app,guide.lang);
 const enHref=guide.lang==='en'?url:origin+'/'+guide.alternate;
 const frHref=guide.lang==='fr'?url:origin+'/'+guide.alternate;
 const alternatives=guide.alternate?`<link rel="alternate" hreflang="${guide.lang}" href="${url}"><link rel="alternate" hreflang="${guide.lang==='fr'?'en':'fr'}" href="${guide.lang==='fr'?enHref:frHref}">`:'';
 const sections=guide.sections.map((s,i)=>`<section class="guide-section" aria-labelledby="step-${i}"><span class="guide-step">${String(i+1).padStart(2,'0')}</span><div><h2 id="step-${i}">${esc(s.heading)}</h2><p>${esc(s.body)}</p></div></section>`).join('');
 const guideNav=`<a href="${home}#products">${guide.back}</a><a href="${local}">${esc(app.name)}</a>`;
 const guideEn=guide.alternate&&guide.lang==='fr'?'/'+guide.alternate:guide.lang==='en'?guideLink(guide):homeFor('en');
 const guideFr=guide.alternate&&guide.lang==='en'?'/'+guide.alternate:guide.lang==='fr'?guideLink(guide):homeFor('fr');
 outputs.set(guide.path,`<!doctype html>
<html lang="${guide.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(guide.title)}</title><meta name="description" content="${esc(guide.description)}"><meta name="robots" content="index, follow, max-image-preview:large"><meta name="theme-color" content="#f5f2ea"><link rel="canonical" href="${url}">${alternatives}<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${asset('styles.css')}"><meta property="og:type" content="article"><meta property="og:locale" content="${guide.lang==='fr'?'fr_FR':'en_US'}"><meta property="og:site_name" content="Benjamin Dupin"><meta property="og:title" content="${esc(guide.title)}"><meta property="og:description" content="${esc(guide.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin+preview.src}"><meta property="og:image:width" content="${preview.width}"><meta property="og:image:height" content="${preview.height}"><meta property="og:image:alt" content="${esc(guide.imageAlt)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(guide.title)}"><meta name="twitter:description" content="${esc(guide.description)}"><meta name="twitter:image" content="${origin+preview.src}"></head>
<body id="top">${header(guide.lang,guideEn,guideFr,guideNav,Boolean(guide.alternate))}
<main id="main" tabindex="-1"><article class="guide"><div class="guide-hero"><div><p class="kicker">${esc(guide.kicker)}</p><h1>${esc(guide.heading)}</h1><p class="guide-intro">${esc(guide.intro)}</p></div><figure>${screen(app.path,guide.lang,true)}<figcaption>${guide.lang==='fr'?'Écran de l\'application publiée.':'Screen from the published app.'}</figcaption></figure></div><div class="guide-body" id="steps">${sections}<aside class="guide-note"><p>${esc(guide.note)}</p></aside><p class="app-links"><a href="${esc(guide.storeUrl)}">${esc(guide.storeLabel)}</a><a href="${local}">${esc(guide.productLabel)}</a></p></div></article></main>
${footer(guide.lang,guideEn,guideFr,Boolean(guide.alternate))}</body></html>
`);
}
outputs.set('404.html',`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><meta name="theme-color" content="#f5f2ea"><title>Page not found. Benjamin Dupin</title><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${asset('styles.css')}"></head>
<body id="top"><a class="skip-link" href="#main">Skip to content</a><header class="bar"><a class="brand" href="/">bnjdpn</a><div class="bar-tools">${contactButton('Contact')}</div></header>${contactNote(studioCopy.en.contactFallback)}
<main id="main" class="missing" tabindex="-1"><h1>Page not found.</h1><p>This address does not match a page on the site.</p><p><a href="/#products">Apps in English</a></p><section lang="fr"><h2>Page introuvable.</h2><p>Cette adresse ne correspond à aucune page du site.</p><p><a href="/fr/#products">Applications en français</a></p></section></main>
<footer class="footer"><a class="footer-wordmark" href="/">Benjamin Dupin</a>${contactButton('Contact')}<nav class="languages" aria-label="Languages"><a href="/fr/" lang="fr" hreflang="fr">FR</a><a href="/" lang="en" hreflang="en" aria-current="page">EN</a></nav><p>© 2026 Benjamin Dupin</p><p>${studioCopy.en.noTracking}</p></footer></body></html>
`);
const pageLocs=[{loc:origin+'/contact/',en:origin+'/contact/',fr:origin+'/fr/contact/'},{loc:origin+'/fr/contact/',en:origin+'/contact/',fr:origin+'/fr/contact/'}];
for(const lang of ['en','fr']){
 pageLocs.push({loc:origin+homeFor(lang), en:origin+'/', fr:origin+'/fr/'});
}
for(const guide of guides){
 const loc=origin+guideLink(guide);
 pageLocs.push({loc, en:guide.alternate&&guide.lang==='fr'?origin+'/'+guide.alternate:guide.lang==='en'?loc:null, fr:guide.alternate&&guide.lang==='en'?origin+'/'+guide.alternate:guide.lang==='fr'?loc:null, solo:!guide.alternate});
}
for(const app of apps.filter(app=>!migrated[app.path])){
 for(const leaf of ['','support/','privacy/']){
  const en=origin+pagePath(app,'en',leaf), fr=origin+pagePath(app,'fr',leaf);
  pageLocs.push({loc:en, en, fr});
  pageLocs.push({loc:fr, en, fr});
 }
}
for(const loc of ['','fr-FR/']) pageLocs.push({loc:origin+'/petits-besoins/'+loc,en:origin+'/petits-besoins/',fr:origin+'/petits-besoins/fr-FR/'});
const seen=new Set();
for(const app of appDocuments.filter(app=>app.sitemap!==false)){
 for(const leaf of ['landing','support','privacy'].filter(key=>app.en[key]).map(key=>key==='landing'?'':key+'/')){
  const en=origin+appHref(app,'en',leaf), fr=origin+appHref(app,'fr',leaf);
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
// Android privacy notices declared in Google Play (the app's in-app notice, content/android-privacy/<App>/<lang>.md).
// Served under /apps/<slug>/android/privacy/; the declared URLs under /<App>/ answer 308 there.
const androidPrivacy={BrewMeter:{en:['/BrewMeter/android/privacy.html','/BrewMeter/android/privacy'],fr:['/BrewMeter/fr-FR/android/privacy.html','/BrewMeter/fr-FR/android/privacy','/BrewMeter/android/privacy-fr.html','/BrewMeter/android/privacy-fr']}};
const mdLink=s=>esc(s).replace(/https:\/\/[^\s<]+[^\s<.,;:)]/g,u=>`<a href="${u}">${u}</a>`);
const mdHtml=md=>md.trim().split(/\n{2,}/).map(block=>{const text=block.replace(/\s*\n\s*/g,' ').trim();return text.startsWith('## ')?`<h2>${esc(text.slice(3))}</h2>`:text.startsWith('# ')?`<h1>${esc(text.slice(2))}</h1>`:`<p>${mdLink(text)}</p>`;}).join('');
for(const name of Object.keys(androidPrivacy)){
 const slug=name.toLowerCase(), en=`${origin}/apps/${slug}/android/privacy/`, fr=`${origin}/fr/apps/${slug}/android/privacy/`;
 for(const lang of ['en','fr']){
  const md=await readFile(resolve(root,`content/android-privacy/${name}/${lang}.md`),'utf8'), title=md.split('\n')[0].replace(/^# /,'');
  outputs.set(`${lang==='fr'?'fr/':''}apps/${slug}/android/privacy/index.html`,`${head({lang,title:`${title}. Benjamin Dupin`,description:md.split(/\n{2,}/)[2].replace(/\s*\n\s*/g,' '),url:lang==='fr'?fr:en,enHref:en,frHref:fr,social:origin+asset(`assets/social/og${lang==='fr'?'-fr':''}.jpg`),socialWidth:1200,socialHeight:630,socialAlt:'Benjamin Dupin'})}
</head><body id="top">${header(lang,en,fr)}
<main id="main" tabindex="-1"><article class="plain">${mdHtml(md)}</article></main>
${footer(lang,en,fr)}</body></html>
`);
 }
}
for(const [path,html] of outputs){
 if (!path.endsWith('.html')) continue;
 // Every Contact control opens the protected form; no page publishes an address.
 const lang=path.startsWith('fr/')?'fr':'en';
 const pageApp=path.match(/^(?:fr\/)?apps\/([^/]+)\//)?.[1];
 const contactPath=`${lang==='fr'?'/fr':''}/contact/${Object.hasOwn(formApps,pageApp)?`?app=${pageApp}`:''}`;
 let page=html.replaceAll(/<button type="button" class="contact" data-contact>([^<]*)<\/button>/g,`<a class="contact" href="${contactPath}">$1</a>`).replaceAll(/<noscript><p class="js-note">[^<]*<\/p><\/noscript>/g,'');
 if (Object.hasOwn(contactApps,pageApp)) page=page.replace(/(<section id="contact"><h2>[^<]*<\/h2><p>[^<]*<\/p>)/,`$1${petitesDisclosure({path:pageApp},lang)}`);
 outputs.set(path,page);

}
const redirects=Object.entries(migrated).flatMap(([path,m])=>{
 const slug=path.toLowerCase();
 return ['en','fr'].flatMap(lang=>{
  const base=lang==='fr'?m.fr:m.en, from=`${lang==='fr'?'/fr':''}/apps/${slug}/`;
  return [['',base],['support/',base+'#contact'],['privacy/',lang==='fr'?m.privacyFr:m.privacyEn]].flatMap(([leaf,to])=>
   [`${from}${leaf}`,`${from}${leaf}index.html`,`${from}${leaf}`.replace(/\/$/,'')].map(src=>`${src} ${to} 301`));
 });
});
// Petits Pots keeps its privacy/support routes and only redirects catalogue landings.
redirects.push(...['en','fr'].flatMap(lang=>{const from=`${lang==='fr'?'/fr':''}/apps/petits-pots`;return [from,from+'/',from+'/index.html'].map(src=>`${src} ${ownSites['petits-pots'][lang]} 301`);}));
// Preserve legal/support routes; only catalogue landings move to the independent site.
for(const [from,to] of [['/apps/petits-besoins','/petits-besoins/'],['/fr/apps/petits-besoins','/petits-besoins/fr-FR/']])
 redirects.push(...['','/','/index.html'].map(suffix=>`${from}${suffix} ${to} 301`));
// Échappée's own app list (/Echappee/<locale>/apps) duplicated this catalogue; it now points here.
const echappeeDirs=['','da/','de-DE/','es-ES/','fr-FR/','it/','nl-NL/','pt-BR/','sv/'];
redirects.push(...echappeeDirs.flatMap(dir=>['apps','apps.html'].map(leaf=>`/Echappee/${dir}${leaf} ${dir==='fr-FR/'?'/fr/':'/'} 301`)));
// Short entry point for Catminers, whose pages live under /apps/catminers/.
redirects.push(...['/Catminers/','/Catminers','/catminers/','/catminers'].map(src=>`${src} /apps/catminers/ 301`));
for(const [name,routes] of Object.entries(androidPrivacy)) for(const lang of ['en','fr']) redirects.push(...routes[lang].map(src=>`${src} ${lang==='fr'?'/fr':''}/apps/${name.toLowerCase()}/android/privacy/ 308`));
outputs.set('_redirects',`# Generated by scripts/build-site.mjs from content/product-sites/migrated.json and the retired Échappée app list.\n${redirects.join('\n')}\n`);
for(const [path,data] of petitsBesoinsFiles()) outputs.set('petits-besoins/'+path,data);
for(const [path,data] of petitsPotsFiles()) outputs.set('petits-pots/'+path,data);
// Scoped cache policy for GrooveLog’s content-hashed product stylesheet.
outputs.set('_headers', '/GrooveLog/assets/rhythm/rhythm.css\n  Cache-Control: public, max-age=14400\n/petites-dents/assets/dentdates/dentdates.css\n  Cache-Control: public, max-age=14400\n/petits-pots/assets/*\n  Cache-Control: public, max-age=14400\n/petits-besoins/assets/*\n  Cache-Control: public, max-age=14400\n/PasDuJour/assets/glance/*\n  Cache-Control: public, max-age=14400\n');
let stale=false;
for(const [path,html] of outputs){if(process.argv.includes('--check')){if(!(await readFile(resolve(root,path)).catch(()=>null))?.equals(Buffer.isBuffer(html)?html:Buffer.from(html))){console.error(`Stale generated output: ${path}. Run npm run build.`);stale=true;}}else{await mkdir(dirname(resolve(root,path)),{recursive:true});await writeFile(resolve(root,path),html);}}
if(stale)process.exit(1);
console.log(`✓ ${outputs.size} static outputs ${process.argv.includes('--check')?'are current':'generated'} (English + French, ${catalogue.length} products)`);
