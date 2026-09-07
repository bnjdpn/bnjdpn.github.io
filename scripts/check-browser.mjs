#!/usr/bin/env node
/** Optional browser QA. Requires Playwright (no dependency shipped to visitors).
 * node scripts/check-browser.mjs --base http://127.0.0.1:8765 --routes routes.json --out output/playwright
 * routes.json: [{path:'/fr/',name:'portfolio',capture:true}]. All POSTs are mocked.
 * PLAYWRIGHT_MODULE can select an already installed module in the QA environment.
 */
import {createRequire} from 'node:module';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const args=process.argv.slice(2);const arg=(key,fallback)=>args.includes(key)?args[args.indexOf(key)+1]:fallback;
const base=arg('--base','http://127.0.0.1:8765');
if(args.includes('--help')||!arg('--routes')) {console.log('Usage: node scripts/check-browser.mjs --routes routes.json [--base http://127.0.0.1:8765] [--out output/playwright]');process.exit(args.includes('--help')?0:2)}
const routes=JSON.parse(readFileSync(arg('--routes'),'utf8'));
const out=resolve(arg('--out','output/playwright'));mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
let interceptedPosts=0;
await context.route('**/*',async route=>{
 const req=route.request();
 if(!['GET','HEAD'].includes(req.method())) {interceptedPosts++;return route.fulfill({status:503,contentType:'application/json',body:'{"error":"Local QA fixture"}'});}
 const u=new URL(req.url());
 if(u.origin==='https://bnjdpn.github.io') {const response=await context.request.get(base+u.pathname+u.search);return route.fulfill({response});}
 return route.continue();
});
const page=await context.newPage();
const results=[];let errors=[];
page.on('pageerror',err=>errors.push(err.message));
page.on('console',message=>{if(message.type()==='error')errors.push(message.text())});
try {
 for(const item of routes) {
  errors=[];
  const response=await page.goto(base+item.path,{waitUntil:'networkidle'});
  await page.evaluate(async()=>{await Promise.all([...document.images].map(img=>{img.loading='eager';return img.decode().catch(()=>{})}))});
  const row={path:item.path,url:page.url(),status:response?.status(),widths:[],issues:[]};
  if(!response?.ok()) row.issues.push('HTTP '+response?.status());
  for(const width of [390,768,1440]) {
   await page.setViewportSize({width,height:width===390?844:1000});
   const observed=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,images:[...document.images].filter(img=>img.complete&&img.naturalWidth===0&&!(img.closest('dialog:not([open])')&&!img.hasAttribute('src')&&!img.hasAttribute('srcset'))).map(img=>img.getAttribute('src')),title:document.title,lang:document.documentElement.lang}));
   row.widths.push({width,...observed});
   if(observed.overflow)row.issues.push('Horizontal overflow at '+width);
   if(observed.images.length)row.issues.push('Broken images at '+width+': '+observed.images.join(', '));
   if(!observed.title||!observed.lang)row.issues.push('Missing title/lang');
   if(item.capture)await page.screenshot({path:join(out,`${item.name}-${width}.png`),fullPage:width===1440});
  }
  // Check that the first keyboard stop is a visible control, not a hidden trap.
  if(item.capture){await page.goto(base+item.path,{waitUntil:'networkidle'});await page.keyboard.press('Tab');row.firstKeyboardStop=await page.evaluate(()=>({tag:document.activeElement?.tagName,text:document.activeElement?.textContent?.trim().slice(0,80)}));}
  row.console=[...new Set(errors)];if(row.console.length)row.issues.push('Console errors');
  results.push(row);
  if(results.length%25===0)console.log(`${results.length}/${routes.length} routes`);
 }
 const report={base,executedAt:new Date().toISOString(),routes:results.length,viewports:[390,768,1440],interceptedPosts,failures:results.filter(r=>r.issues.length),results};
 writeFileSync(join(out,'browser-report.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({routes:report.routes,failures:report.failures.map(r=>({path:r.path,issues:r.issues})),interceptedPosts}));
 if(report.failures.length)process.exitCode=1;
} finally {await browser.close();}
