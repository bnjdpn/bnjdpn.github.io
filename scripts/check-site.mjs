import {access,readFile,readdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {guides} from '../content/guides.mjs';
import {appDocuments} from '../content/app-documents.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const catalog=JSON.parse(await readFile(resolve(root,'content/catalog.json'),'utf8'));
// Links to migrated app sites point into other repositories; preview-ecosystem.py checks them after assembly.
const migrated=Object.keys(JSON.parse(await readFile(resolve(root,'content/product-sites/migrated.json'),'utf8')));
const appSiteRef=ref=>[...migrated,'Echappee'].some(path=>ref.replace(/^\//,'').startsWith(path+'/'));
const availableDocuments=appDocuments.filter(app=>app.catalogue);
const availableCatalogue=[...catalog,...availableDocuments];
const publicAndroid=new Map([['Echappee','com.bnjdpn.echappee'],['petits-pots','com.bnjdpn.petitspots'],['petits-besoins','com.bnjdpn.petitsbesoins'],['petites-gouttes','com.bnjdpn.petitesgouttes'],['VesperDrift','com.bnjdpn.vesperdrift'],['petites-bouchees','com.bnjdpn.petitesbouchees'],['petites-dents','com.bnjdpn.petitesdents'],['petites-nuits','com.bnjdpn.petitesnuits'],['BrewMeter','com.bnjdpn.brewmeter'],['ColdLoad','com.bnjdpn.coldload'],['FastZen','com.bnjdpn.fastzen'],['GrooveLog','com.bnjdpn.groovelog'],['MoveAtlas','com.bnjdpn.moveatlas'],['NoBuyCart','com.bnjdpn.nobuycart'],['PRVault','com.bnjdpn.prvault'],['NeatShift','com.bnjdpn.neatshift'],['TempoReps','com.bnjdpn.temporeps'],['catminers','com.bnjdpn.catminers']]);
const styles=await readFile(resolve(root,'styles.css'),'utf8');
const sitemap=await readFile(resolve(root,'sitemap.xml'),'utf8');
const pages=await readFile(resolve(root,'sitemap-pages.xml'),'utf8');
const failures=[]; let references=0;
const expect=(value,msg)=>{if(!value)failures.push(msg)};
const origin='https://bnjdpn.com';
const address=/[a-z0-9._%+-]+(?:@|&#64;)[a-z0-9-]+\.[a-z]{2,}/i;
const hasContact=html=>/<a class="contact" href="(?:\/fr)?\/contact\/(?:\?app=[a-z-]+)?">/.test(html)&&!address.test(html)&&!html.includes('mailto:')&&!/grok ?bot/i.test(html);
for(const [path,lang] of [['index.html','en'],['fr/index.html','fr']]) {
 const html=await readFile(resolve(root,path),'utf8');
 const prefix=`${path}: `;
 expect(html.includes(`<html lang="${lang}">`),prefix+'wrong document language');
 expect((html.match(/<h1\b/g)||[]).length===1,prefix+'one H1 required');
 for(const id of ['main','about','selected','products','contact']) expect(html.includes(`id="${id}"`),prefix+`missing #${id}`);
 expect(html.includes('<a class="skip-link" href="#main">'),prefix+'skip link missing');
 expect(html.includes('Bs6cO9WFohARbIFhvij399ZDgCetytfajAwoCQHBB48'),prefix+'Search Console verification missing');
 expect(html.includes(`rel="canonical" href="${origin}/${lang==='fr'?'fr/':''}"`),prefix+'canonical mismatch');
 for(const l of ['fr','en','x-default'])expect(html.includes(`hreflang="${l}"`),prefix+`hreflang ${l} missing`);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 expect(new Set(ids).size===ids.length,prefix+'duplicate IDs');
 for(const match of html.matchAll(/href="#([^"]+)"/g))expect(ids.includes(match[1]),prefix+'broken anchor '+match[1]);
 const rows=[...html.matchAll(/<article class="product-row"[\s\S]*?<\/article>/g)].map(m=>m[0]);
 expect(rows.length===availableCatalogue.length,prefix+'catalogue length mismatch');
 expect(rows.every(row=>row.includes('data-category=')&&row.includes('data-search=')),prefix+'uncategorized product');
 const storeIds=new Set([...html.matchAll(/apps\.apple\.com\/app\/id(\d+)/g)].map(m=>m[1]));
 const expectedIds=[...catalog.filter(a=>a.id).map(a=>a.id),...appDocuments.filter(a=>a.catalogue&&a.appStoreUrl).map(a=>a.appStoreUrl.match(/id(\d+)$/)[1])];
 expect(storeIds.size===expectedIds.length && expectedIds.every(id=>storeIds.has(id)),prefix+'store destinations drifted');
 expect(!html.includes('NovaStationPinball')&&!html.includes('6799920176'),prefix+'retired app reintroduced');
 const echappeeRow=rows.find(row=>row.includes('data-app="Echappee"'));
 expect(echappeeRow?.includes(lang==='fr'?'iPhone · iPad · Mac Apple silicon':'iPhone · iPad · Apple silicon Mac'),prefix+'Echappee released platforms missing');
 expect(echappeeRow?.includes('href="https://apps.apple.com/app/id6775410670"'),prefix+'Echappee universal App Store link missing');
 expect(!echappeeRow?.includes('?mt=12'),prefix+'Echappee store link still forces the Mac storefront');
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
 for(const type of ['Person','WebSite','CollectionPage','ItemList'])expect(graph.some(x=>x['@type']===type),prefix+'missing JSON-LD '+type);
 const list=graph.find(x=>x['@type']==='ItemList');
 expect(list.numberOfItems===availableCatalogue.length&&list.itemListElement.length===availableCatalogue.length,prefix+'structured catalogue count mismatch');
 expect(!JSON.stringify(graph).includes('"offers"'),prefix+'unverified offer in JSON-LD');
 expect(/^\d{4}-\d{2}-\d{2}T.*Z$/.test(graph.find(x=>x['@type']==='CollectionPage').dateModified),prefix+'invalid modification timestamp');
 expect(hasContact(html),prefix+'contact control missing or address exposed');
 expect(/<title>[^<]*Benjamin Dupin/.test(html),prefix+'Benjamin Dupin missing from the title');
 expect(html.includes('class="footer-wordmark" href="')&&html.includes('>Benjamin Dupin</a>'),prefix+'Benjamin Dupin missing from the footer');
 expect(!/target="_blank"/.test(html),prefix+'forced new tab');
 for(const img of html.matchAll(/<img\b[^>]+>/g)) expect(/\bwidth="\d+"/.test(img[0])&&/\bheight="\d+"/.test(img[0])&&/\balt="[^"]*"/.test(img[0]),prefix+'image lacks dimensions/alt');
 const refs=new Set([...html.matchAll(/(?:href|src)="([^"#]+)"/g)].map(m=>m[1]).filter(ref=>!/^(?:https?:|data:|mailto:)/.test(ref)));
 for(let ref of refs){if(appSiteRef(ref))continue;ref=ref.replace(/^\//,'').split('?')[0];if(ref===''||ref.endsWith('/'))ref+='index.html';try{await access(resolve(root,ref));references++;}catch{failures.push(prefix+'missing file '+ref);}}
 expect(html.includes('class="index"'),prefix+'catalogue index missing');
 for(const app of appDocuments){
  const row=rows.find(row=>row.includes(`data-app="${app.path}"`));
  if(app.catalogue){
   expect(row?.includes(app.catalogue.availability[lang]),prefix+app.path+' platform review status missing');
   expect(app.appStoreUrl?row?.includes(`href="${app.appStoreUrl}"`):!row?.includes('apps.apple.com'),prefix+app.path+(app.appStoreUrl?' App Store link missing':' unreleased Apple link'));
  }else expect(!row,prefix+'submission-only app leaked into home');
 }
 const playPackages=[...html.matchAll(/play\.google\.com\/store\/apps\/details\?id=([^"&]+)/g)].map(m=>m[1]);
 expect(playPackages.length===publicAndroid.size&&new Set(playPackages).size===publicAndroid.size&&[...publicAndroid.values()].every(p=>playPackages.includes(p)),prefix+'public Android catalogue destinations mismatch');
}
for(const lang of ['en','fr']){
 for(const app of [...catalog,...appDocuments]){
  const slug=app.path.toLowerCase();
  for(const leaf of ['','support/','privacy/']){
   if(appDocuments.includes(app)&&!app[lang][leaf===''?'landing':leaf.slice(0,-1)])continue;
   const path=`${lang==='fr'?'fr/':''}apps/${slug}/${leaf}index.html`;
   const html=await readFile(resolve(root,path),'utf8');
   const prefix=`${path}: `;
   if(leaf===''){
    const playHref=`https://play.google.com/store/apps/details?id=${publicAndroid.get(app.path)}`;
    expect(publicAndroid.has(app.path)?html.includes(`href="${playHref}"`):!html.includes('play.google.com/store/apps/details'),prefix+'public Android install link mismatch');
   }
   expect(html.includes(`<html lang="${lang}">`),prefix+'language mismatch');
   expect((html.match(/<h1\b/g)||[]).length===1,prefix+'one H1 required');
   expect(hasContact(html)&&!html.includes('data-contact'),prefix+'contact control missing or address exposed');
   expect(/<title>[^<]*Benjamin Dupin/.test(html),prefix+'Benjamin Dupin missing from the title');
   expect(html.includes('>Benjamin Dupin</a>'),prefix+'Benjamin Dupin missing from the footer');
   expect(!/target="_blank"/.test(html),prefix+'forced new tab');
   if(appDocuments.includes(app)){
    const url=`${origin}/${lang==='fr'?'fr/':''}apps/${slug}/${leaf}`;
    expect(html.includes(`rel="canonical" href="${url}"`),prefix+'canonical mismatch');
    if(app.sitemap===false){expect(!pages.includes(`<loc>${url}</loc>`),prefix+'unreleased app listed in sitemap');expect(html.includes('<meta name="robots" content="noindex, follow">'),prefix+'unreleased app must be noindex');}
    else if(app.path==='petits-pots' && leaf===''){
     const final=`${origin}/petits-pots/${lang==='fr'?'fr-FR/':''}`;
     expect(pages.includes(`<loc>${final}</loc>`)&&!pages.includes(`<loc>${url}</loc>`),prefix+'product sitemap must use final route');
     const redirects=await readFile(resolve(root,'_redirects'),'utf8');
     expect(redirects.includes(`${url.slice(origin.length)} ${final.slice(origin.length)} 301`),prefix+'product redirect missing');
    }else if(app.path==='petits-besoins'&&leaf==='') expect(!pages.includes(`<loc>${url}</loc>`),prefix+'redirected catalogue URL in sitemap');
    else expect(pages.includes(`<loc>${url}</loc>`),prefix+'sitemap entry missing');
    for(const alternate of ['en','fr'])expect(html.includes(`rel="alternate" hreflang="${alternate}" href="${origin}/${alternate==='fr'?'fr/':''}apps/${slug}/${leaf}"`),prefix+'alternate missing');
    const storeLinks=[...html.matchAll(/href="([^"]+)"/g)].map(match=>match[1]).filter(href=>/apps\.apple\.com|play\.google\.com\/store/.test(href));
    const publishedAndroid=leaf===''&&app.androidStoreUrl;
    if(publishedAndroid){
     expect(!/under review|en (?:cours d.examen|examen)|staged rollout|déploiement progressif/.test(html),prefix+'store procedure leaked into landing');
     expect(app.androidStoreUrl===`https://play.google.com/store/apps/details?id=${app.package}`,prefix+'Android package link mismatch');
     const expectedStores=[app.appStoreUrl,app.androidStoreUrl].filter(Boolean);
     expect(storeLinks.length===expectedStores.length&&expectedStores.every((href,i)=>storeLinks[i]===href),prefix+'published store links missing or unexpected store link');
    }else expect(storeLinks.length===0,prefix+'unpublished store link');
    expect(app.appStoreId&&leaf!==''?html.includes(`name="apple-itunes-app" content="app-id=${app.appStoreId}"`):!html.includes('apple-itunes-app'),prefix+'Smart App Banner mismatch');
    expect(!html.includes('?v=undefined'),prefix+'asset content hash missing');
    for(const key of ['og:image','og:image:alt','twitter:image','twitter:image:alt'])expect(html.includes(`"${key}"`),prefix+'social image metadata missing');
    const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    expect(schema['@type']==='SoftwareApplication'&&schema.name===app.name&&!schema.offers&&!schema.aggregateRating,prefix+'unsupported software claim');
    if(leaf==='privacy/')expect(html.includes(app.package)&&html.includes(`<time datetime="${app.policyDate}">${app.policyDate}</time>`),prefix+'policy identity/date missing');
    for(const match of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)){
     let ref=match[1].split(/[?#]/)[0].slice(1);if(!ref||ref.endsWith('/'))ref+='index.html';
     try{await access(resolve(root,ref));references++;}catch{failures.push(prefix+'missing file '+ref)}
    }
   }
   if(['petites-gouttes','petites-bouchees','petites-dents','petites-nuits'].includes(slug)&&leaf){
    expect(!/formspree/i.test(html),prefix+'obsolete form processor');
    for(const value of ['Cloudflare Turnstile','Workers','Email Routing','https://www.cloudflare.com/privacypolicy/','https://www.cloudflare.com/turnstile-privacy-policy/'])expect(html.includes(value),prefix+'missing Petites disclosure: '+value);
    if(leaf==='support/')expect(html.includes(`href="https://bnjdpn.com/${slug}/#contact"`),prefix+'noncanonical Petites form link');
   }
   if(leaf===''&&!appDocuments.includes(app))expect(html.includes(`https://apps.apple.com/app/id${app.id}`),prefix+'App Store link missing');
  }
 }
}
for(const guide of guides){
 const html=await readFile(resolve(root,guide.path),'utf8');
 const url=`${origin}/${guide.path.replace(/index\.html$/,'')}`;
 const prefix=`${guide.path}: `;
 expect(html.includes(`<html lang="${guide.lang}">`),prefix+'language mismatch');
 expect(html.includes(`rel="canonical" href="${url}"`),prefix+'canonical mismatch');
 expect((html.match(/<h1\b/g)||[]).length===1,prefix+'one H1 required');
 const campaign=new URL(guide.storeUrl);
 expect(campaign.origin==='https://apps.apple.com'&&campaign.pathname===`/app/apple-store/id${catalog.find(app=>app.path===guide.app)?.id}`,prefix+'wrong App Store destination');
 expect(campaign.searchParams.get('pt')==='128480256'&&campaign.searchParams.get('ct')===(guide.app==='TempoReps'?'Web Guide Tempo':'Web Guide Journal')&&campaign.searchParams.get('mt')==='8',prefix+'campaign attribution mismatch');
 expect(html.includes(`href="${guide.storeUrl.replaceAll('&','&amp;')}"`),prefix+'campaign link not preserved in HTML');
 expect(html.includes('property="og:image"')&&html.includes('property="og:url"'),prefix+'social preview missing');
 const scripts=[...html.matchAll(/<script\b([^>]*)>/gi)].map(match=>match[1]);
 expect(scripts.length===0,prefix+'guide should load no script');
 expect(hasContact(html),prefix+'contact control missing or address exposed');
 expect(!html.includes('guide-related'),prefix+'unrelated guide recommendation');
 for(const img of html.matchAll(/<img\b[^>]+>/g))expect(/\bwidth="\d+"/.test(img[0])&&/\bheight="\d+"/.test(img[0])&&/\balt="[^"]*"/.test(img[0]),prefix+'image lacks dimensions/alt');
 for(const match of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)){
  const ref=match[1].split(/[?#]/)[0];if(appSiteRef(ref))continue;let path=ref.slice(1);if(path.endsWith('/')||!path)path+='index.html';
  try{await access(resolve(root,path));references++;}catch{failures.push(prefix+'missing file '+ref)}
 }
 expect(pages.includes(`<loc>${url}</loc>`),prefix+'sitemap entry missing');
 if(guide.alternate){
  const alternate=guides.find(g=>g.path.replace(/index\.html$/,'')===guide.alternate);
  expect(alternate?.alternate===guide.path.replace(/index\.html$/,''),prefix+'non-reciprocal alternate');
  expect(html.includes(`hreflang="${alternate?.lang}" href="${origin}/${guide.alternate}"`),prefix+'alternate missing');
 }else expect(!html.includes('hreflang='),prefix+'false alternate');
}
// Petits Pots is generated in this repository, so its references must exist locally.
for(const [lang,route] of [['en','petits-pots/'],['fr','petits-pots/fr-FR/']]){
 const html=await readFile(resolve(root,route,'index.html'),'utf8'),prefix=route+': ';
 expect(html.includes(`<html lang="${lang}">`),prefix+'language mismatch');
 expect((html.match(/<h1\b/g)||[]).length===1,prefix+'one H1 required');
 expect(html.includes(`rel="canonical" href="${origin}/${route}"`),prefix+'canonical mismatch');
 expect(html.includes('"operatingSystem":"Android"')&&!/apps\.apple\.com/.test(html),prefix+'Android availability mismatch');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 expect(new Set(ids).size===ids.length,prefix+'duplicate IDs');
 for(const m of html.matchAll(/href="#([^"]+)"/g))expect(ids.includes(m[1]),prefix+'broken anchor '+m[1]);
 for(const m of html.matchAll(/(?:href|src)="(\/[^"#]+)"/g)){
  let ref=m[1].split(/[?#]/)[0].slice(1);if(!ref||ref.endsWith('/'))ref+='index.html';
  try{await access(resolve(root,ref));references++;}catch{failures.push(prefix+'missing file '+ref);}
 }
 for(const img of html.matchAll(/<img\b[^>]+>/g))expect(/\bwidth="\d+"/.test(img[0])&&/\bheight="\d+"/.test(img[0])&&/\balt="[^"]*"/.test(img[0]),prefix+'image lacks dimensions/alt');
}
// Independent catalogue site: check the assembled public paths, not its source directory.
const petitsRedirects=await readFile(resolve(root,'_redirects'),'utf8');
for(const [lang,dir] of [['en',''],['fr','fr-FR/']]){
 const route=`/petits-besoins/${dir}`, path=`${route.slice(1)}index.html`;
 const html=await readFile(resolve(root,path),'utf8'), prefix=path+': ';
 expect(html.includes(`<html lang="${lang}">`),prefix+'language mismatch');
 expect((html.match(/<h1\b/g)||[]).length===1,prefix+'one H1 required');
 expect(html.includes(`rel="canonical" href="${origin}${route}"`),prefix+'canonical mismatch');
 expect(pages.includes(`<loc>${origin}${route}</loc>`),prefix+'sitemap entry missing');
 expect(html.includes('id="contact"'),prefix+'contact anchor missing');
 expect(html.includes(`href="${lang==='fr'?'/fr':''}/contact/?app=petits-besoins"`),prefix+'protected contact route missing');
 expect(!html.includes('<form')&&!html.includes('challenges.cloudflare.com'),prefix+'contact form duplicated');
 expect(html.includes('id6820659968')&&html.includes('details?id=com.bnjdpn.petitsbesoins'),prefix+'store identity mismatch');
 for(const match of html.matchAll(/href="#([^"]+)"/g))expect(html.includes(`id="${match[1]}"`),prefix+'missing anchor '+match[1]);
 const from=`${lang==='fr'?'/fr':''}/apps/petits-besoins`;
 for(const suffix of ['','/','/index.html'])expect(petitsRedirects.includes(`${from}${suffix} ${route} 301`),prefix+'301 missing');
 for(const match of html.matchAll(/(?:href|src)="([^"#]+)"|srcset="([^"]+)"/g)){
  const refs=match[2]?match[2].split(',').map(s=>s.trim().split(' ')[0]):[match[1]];
  for(const ref of refs){
   const url=new URL(ref,origin+route);
   if(url.origin!==origin)continue;
   let local=url.pathname.slice(1);if(!local||local.endsWith('/'))local+='index.html';
   try{await access(resolve(root,local));references++;}catch{failures.push(prefix+'missing public file '+local);}
  }
 }
}
const petitsCss=await readFile(resolve(root,'petits-besoins/assets/relais.css'),'utf8');
for(const match of petitsCss.matchAll(/url\(['"]?([^)'"]+)/g)){
 try{await access(resolve(root,'petits-besoins/assets',match[1]));references++;}catch{failures.push('Petits Besoins missing CSS asset '+match[1]);}
}
expect((await readFile(resolve(root,'_headers'),'utf8')).includes('/petits-besoins/assets/*\n  Cache-Control: public, max-age=14400'), 'Petits Besoins asset cache missing');
expect(sitemap.match(/<sitemap>/g)?.length===catalog.length+1,'sitemap index count mismatch');
for(const app of catalog)expect(sitemap.includes(`${origin}/${app.path}/sitemap.xml`),'missing product sitemap '+app.path);
for(const url of [`${origin}/`,`${origin}/fr/`])expect(pages.includes(`<loc>${url}</loc>`),'missing page sitemap '+url);
expect((await readFile(resolve(root,'robots.txt'),'utf8')).includes(`Sitemap: ${origin}/sitemap.xml`),'robots sitemap missing');
expect((await readFile(resolve(root,'404.html'),'utf8')).includes('noindex'),'404 must be noindex');
JSON.parse(await readFile(resolve(root,'site.webmanifest'),'utf8'));
expect(styles.includes(':focus-visible')&&styles.includes('prefers-reduced-motion'),'focus/reduced motion handling missing');
expect(!/fonts\.(googleapis|gstatic)\.com/.test(styles),'remote font introduced');
if(failures.length){console.error(failures.map(x=>'✗ '+x).join('\n'));process.exit(1)}
console.log(`✓ EN/FR routes, ${guides.length} guides, ${availableCatalogue.length} products, all store IDs, structured data and sitemaps`);
console.log(`✓ ${references} local references, image dimensions, keyboard hooks, static fallback`);
