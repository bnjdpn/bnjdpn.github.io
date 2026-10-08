import {access,readFile,readdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {guides} from '../content/guides.mjs';
import {appDocuments} from '../content/app-documents.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const catalog=JSON.parse(await readFile(resolve(root,'content/catalog.json'),'utf8'));
const styles=await readFile(resolve(root,'styles.css'),'utf8');
const workflow=await readFile(resolve(root,'.github/workflows/pages.yml'),'utf8');
const sitemap=await readFile(resolve(root,'sitemap.xml'),'utf8');
const pages=await readFile(resolve(root,'sitemap-pages.xml'),'utf8');
const failures=[]; let references=0;
const expect=(value,msg)=>{if(!value)failures.push(msg)};
const origin='https://bnjdpn.com';
const exposed=[...'contact'].join('')+String.fromCharCode(64);
const hasContact=html=>html.includes('data-contact')&&html.includes('<noscript>')&&!html.includes(exposed)&&!html.includes('mailto:');
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
 expect(rows.length===catalog.length,prefix+'catalogue length mismatch');
 expect(rows.every(row=>row.includes('data-category=')&&row.includes('data-search=')),prefix+'uncategorized product');
 const storeIds=new Set([...html.matchAll(/apps\.apple\.com\/app\/id(\d+)/g)].map(m=>m[1]));
 const expectedIds=catalog.filter(a=>a.id).map(a=>a.id);
 expect(storeIds.size===expectedIds.length && expectedIds.every(id=>storeIds.has(id)),prefix+'store destinations drifted');
 expect(!html.includes('NovaStationPinball')&&!html.includes('6799920176'),prefix+'retired app reintroduced');
 const echappeeRow=rows.find(row=>row.includes('data-app="Echappee"'));
 expect(echappeeRow?.includes(lang==='fr'?'iPhone · iPad · Mac Apple silicon':'iPhone · iPad · Apple silicon Mac'),prefix+'Echappee released platforms missing');
 expect(echappeeRow?.includes('href="https://apps.apple.com/app/id6775410670"'),prefix+'Echappee universal App Store link missing');
 expect(!echappeeRow?.includes('?mt=12'),prefix+'Echappee store link still forces the Mac storefront');
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
 for(const type of ['Person','WebSite','CollectionPage','ItemList'])expect(graph.some(x=>x['@type']===type),prefix+'missing JSON-LD '+type);
 const list=graph.find(x=>x['@type']==='ItemList');
 expect(list.numberOfItems===catalog.length&&list.itemListElement.length===catalog.length,prefix+'structured catalogue count mismatch');
 expect(!JSON.stringify(graph).includes('"offers"'),prefix+'unverified offer in JSON-LD');
 expect(/^\d{4}-\d{2}-\d{2}T.*Z$/.test(graph.find(x=>x['@type']==='CollectionPage').dateModified),prefix+'invalid modification timestamp');
 expect(hasContact(html),prefix+'contact control missing or address exposed');
 expect(/<title>[^<]*Benjamin Dupin/.test(html),prefix+'Benjamin Dupin missing from the title');
 expect(html.includes('class="footer-wordmark" href="')&&html.includes('>Benjamin Dupin</a>'),prefix+'Benjamin Dupin missing from the footer');
 expect(!/target="_blank"/.test(html),prefix+'forced new tab');
 for(const img of html.matchAll(/<img\b[^>]+>/g)) expect(/\bwidth="\d+"/.test(img[0])&&/\bheight="\d+"/.test(img[0])&&/\balt="[^"]*"/.test(img[0]),prefix+'image lacks dimensions/alt');
 const refs=new Set([...html.matchAll(/(?:href|src)="([^"#]+)"/g)].map(m=>m[1]).filter(ref=>!/^(?:https?:|data:|mailto:)/.test(ref)));
 for(let ref of refs){ref=ref.replace(/^\//,'').split('?')[0];if(ref===''||ref.endsWith('/'))ref+='index.html';try{await access(resolve(root,ref));references++;}catch{failures.push(prefix+'missing file '+ref);}}
 expect(html.includes('class="index"'),prefix+'catalogue index missing');
 for(const app of appDocuments)expect(!html.includes(app.name)&&!html.includes(`/apps/${app.path}/`),prefix+'submission-only app leaked into home');
}
for(const lang of ['en','fr']){
 for(const app of [...catalog,...appDocuments]){
  const slug=app.path.toLowerCase();
  for(const leaf of appDocuments.includes(app)?['support/','privacy/']:['','support/','privacy/']){
   const path=`${lang==='fr'?'fr/':''}apps/${slug}/${leaf}index.html`;
   const html=await readFile(resolve(root,path),'utf8');
   const prefix=`${path}: `;
   expect(html.includes(`<html lang="${lang}">`),prefix+'language mismatch');
   expect((html.match(/<h1\b/g)||[]).length===1,prefix+'one H1 required');
   expect(hasContact(html),prefix+'contact control missing or address exposed');
   expect(/<title>[^<]*Benjamin Dupin/.test(html),prefix+'Benjamin Dupin missing from the title');
   expect(html.includes('>Benjamin Dupin</a>'),prefix+'Benjamin Dupin missing from the footer');
   expect(!/target="_blank"/.test(html),prefix+'forced new tab');
   if(appDocuments.includes(app)){
    const url=`${origin}/${lang==='fr'?'fr/':''}apps/${slug}/${leaf}`;
    expect(html.includes(`rel="canonical" href="${url}"`),prefix+'canonical mismatch');
    expect(pages.includes(`<loc>${url}</loc>`),prefix+'sitemap entry missing');
    for(const alternate of ['en','fr'])expect(html.includes(`rel="alternate" hreflang="${alternate}" href="${origin}/${alternate==='fr'?'fr/':''}apps/${slug}/${leaf}"`),prefix+'alternate missing');
    expect(!/apps\.apple\.com|play\.google\.com\/store|class="store-button"/.test(html),prefix+'unpublished store link');
    if(leaf==='privacy/')expect(html.includes(app.package)&&html.includes(`<time datetime="${app.policyDate}">${app.policyDate}</time>`),prefix+'policy identity/date missing');
    for(const match of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)){
     let ref=match[1].split(/[?#]/)[0].slice(1);if(!ref||ref.endsWith('/'))ref+='index.html';
     try{await access(resolve(root,ref));references++;}catch{failures.push(prefix+'missing file '+ref)}
    }
   }
   if(leaf==='')expect(html.includes(`https://apps.apple.com/app/id${app.id}`),prefix+'App Store link missing');
  }
 }
}
expect(workflow.includes('cp -R apps'),'app pages missing from Pages allowlist');
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
 expect(scripts.length===1&&/src="\/assets\/site\.js/.test(scripts[0]),prefix+'guide should only load the contact script');
 expect(hasContact(html),prefix+'contact control missing or address exposed');
 expect(!html.includes('guide-related'),prefix+'unrelated guide recommendation');
 for(const img of html.matchAll(/<img\b[^>]+>/g))expect(/\bwidth="\d+"/.test(img[0])&&/\bheight="\d+"/.test(img[0])&&/\balt="[^"]*"/.test(img[0]),prefix+'image lacks dimensions/alt');
 for(const match of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)){
  const ref=match[1].split(/[?#]/)[0];let path=ref.slice(1);if(path.endsWith('/')||!path)path+='index.html';
  try{await access(resolve(root,path));references++;}catch{failures.push(prefix+'missing file '+ref)}
 }
 expect(pages.includes(`<loc>${url}</loc>`),prefix+'sitemap entry missing');
 if(guide.alternate){
  const alternate=guides.find(g=>g.path.replace(/index\.html$/,'')===guide.alternate);
  expect(alternate?.alternate===guide.path.replace(/index\.html$/,''),prefix+'non-reciprocal alternate');
  expect(html.includes(`hreflang="${alternate?.lang}" href="${origin}/${guide.alternate}"`),prefix+'alternate missing');
 }else expect(!html.includes('hreflang='),prefix+'false alternate');
}
expect(sitemap.match(/<sitemap>/g)?.length===catalog.length+1,'sitemap index count mismatch');
for(const app of catalog)expect(sitemap.includes(`${origin}/${app.path}/sitemap.xml`),'missing product sitemap '+app.path);
for(const url of [`${origin}/`,`${origin}/fr/`])expect(pages.includes(`<loc>${url}</loc>`),'missing page sitemap '+url);
expect((await readFile(resolve(root,'robots.txt'),'utf8')).includes(`Sitemap: ${origin}/sitemap.xml`),'robots sitemap missing');
expect((await readFile(resolve(root,'404.html'),'utf8')).includes('noindex'),'404 must be noindex');
JSON.parse(await readFile(resolve(root,'site.webmanifest'),'utf8'));
expect(styles.includes(':focus-visible')&&styles.includes('prefers-reduced-motion'),'focus/reduced motion handling missing');
expect(!/fonts\.(googleapis|gstatic)\.com/.test(styles),'remote font introduced');
expect(!workflow.includes('rsync'),'Pages must retain public-file allowlist');
expect(workflow.includes('cp -R assets'),'assets missing from deployment');
expect(/cp[^\n]+\bfr\b/.test(workflow),'French routes missing from Pages allowlist');
const actions=[...workflow.matchAll(/uses:\s+([^@\s]+)@([^\s]+)/g)];
expect(actions.length>=5&&actions.every(([, ,rev])=>/^[0-9a-f]{40}$/.test(rev)),'GitHub Actions must be pinned');
if(failures.length){console.error(failures.map(x=>'✗ '+x).join('\n'));process.exit(1)}
console.log(`✓ EN/FR routes, ${guides.length} guides, ${catalog.length} products, all store IDs, structured data and sitemaps`);
console.log(`✓ ${references} local references, image dimensions, keyboard hooks, static fallback and deployment allowlist`);
