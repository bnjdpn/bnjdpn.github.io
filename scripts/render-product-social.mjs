// Optional build-time renderer, copied to explicit adopters. No runtime dependency.
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
const require=createRequire(import.meta.url);
const root=resolve(process.argv[2]||fileURLToPath(new URL('../',import.meta.url)));
const c=JSON.parse(await readFile(resolve(root,'marketing/site.json'),'utf8'));
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'});
const esc=s=>String(s).replace(/[&<>"']/g,v=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[v]));
try{
 for(const {code} of c.locales){
  const lang=code.split('-')[0], data=c.content_overrides[code];
  const heading=c.presentation.headline[code]||c.presentation.headline[lang]||data.subtitle||c.truth_points?.[lang]?.[0]||data.name;
  const shots=c.screenshots[code]||c.screenshots[c.primary_locale];
  const shot=shots[Math.min(c.social_presentation.screenshot_index,shots.length-1)];
  const width=shot.variants.at(-1).w,shotPath=`${shot.base}-${width}.webp`;
  const source=c.local_assets.find(x=>x.path===shotPath)?.source;
  if(!source)throw Error(`No local screenshot source: ${code} ${shotPath}`);
  const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
  await page.goto(pathToFileURL(resolve(root,'marketing/site.json')).href);
  const base=pathToFileURL(resolve(root,'marketing')+'/').href;
  await page.setContent(`<!doctype html><html lang="${esc(code)}"><meta charset="utf-8"><base href="${base}"><style>
   @font-face{font-family:Bricolage;src:url(fonts/bricolage-latin.woff2)}@font-face{font-family:DM;src:url(fonts/dm-sans-latin.woff2)}
   *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:${c.social_presentation.background};color:${c.social_presentation.ink};font-family:Bricolage,system-ui,sans-serif}main{display:grid;grid-template-columns:1fr 280px;gap:60px;align-items:center;height:100%;padding:40px 70px}.identity{display:flex;gap:20px;align-items:center} .icon{width:76px;height:76px;border-radius:18px}h1{font-size:30px;line-height:1.15;margin:0}h2{font-size:56px;line-height:1.12;letter-spacing:-1.6px;margin:34px 0}p{font:21px DM,system-ui,sans-serif;margin:0}.screen{max-width:280px;max-height:550px;width:auto;height:auto;display:block;margin:auto;box-shadow:0 12px 32px #0002}
   </style><main><div><div class="identity"><img class="icon" src="web/app-icon-192.png" alt=""><h1>${esc(data.name)}</h1></div><h2>${esc(heading)}</h2><p>Benjamin Dupin · App Store</p></div><img class="screen" src="${pathToFileURL(resolve(root,source)).href}" alt=""></main></html>`);
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(x=>x.decode()))});
  const overflow=await page.evaluate(()=>document.querySelector('main').scrollHeight>630||document.querySelector('h2').getBoundingClientRect().right>850);
  if(overflow)throw Error(`Social composition overflows: ${code}`);
  const out=c.local_assets.find(x=>x.path===c.social_images[code]).source;
  await page.screenshot({path:resolve(root,out),type:'jpeg',quality:90});await page.close();
 }
}finally{await browser.close()}
console.log(`${c.app_name}: ${c.locales.length} localized social previews generated`);
