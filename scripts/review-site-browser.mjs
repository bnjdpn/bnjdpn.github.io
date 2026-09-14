#!/usr/bin/env node
// Optional QA tool shared by the catalogue and independent static sites. No visitor dependency.
import {createRequire} from 'node:module';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
const require=createRequire(import.meta.url),args=process.argv.slice(2);
const arg=(key,fallback)=>args.includes(key)?args[args.indexOf(key)+1]:fallback;
if(args.includes('--help')){console.log('PLAYWRIGHT_MODULE=/path/to/playwright AXE_PATH=/path/to/axe.min.js node scripts/review-site-browser.mjs --routes routes.json --base http://127.0.0.1:4174 --out output/playwright/review [--baseline]');process.exit(0)}
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const routes=JSON.parse(readFileSync(arg('--routes'),'utf8')),base=arg('--base','http://127.0.0.1:4174'),out=resolve(arg('--out','output/playwright/review')),baseline=args.includes('--baseline');
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'});
const report={date:new Date().toISOString(),base,baseline,scope:'Local laboratory observations; no field or conversion data.',interceptedWrites:0,results:[]};
const context=await browser.newContext({reducedMotion:'reduce',viewport:{width:1440,height:1000}});
await context.route('**/*',async route=>{const req=route.request();if(!['GET','HEAD'].includes(req.method())){report.interceptedWrites++;return route.fulfill({status:503,contentType:'application/json',body:'{"error":"QA interception"}'})}const url=new URL(req.url());if(url.origin==='https://bnjdpn.github.io')return route.fulfill({response:await context.request.get(base+url.pathname+url.search)});return route.continue()});
await context.addInitScript(()=>{window.__qaVitals={lcp:0,cls:0};new PerformanceObserver(l=>{for(const e of l.getEntries())window.__qaVitals.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__qaVitals.cls+=e.value}).observe({type:'layout-shift',buffered:true})});
const page=await context.newPage();let errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
for(const item of routes){
 const row={...item,issues:[],screenshots:[],layouts:[]};report.results.push(row);errors=[];
 await page.setViewportSize({width:1440,height:1000});
 const response=await page.goto(base+item.path,{waitUntil:'networkidle'});row.status=response?.status();row.finalURL=page.url();
 if(!response?.ok())row.issues.push('HTTP '+response?.status());
 row.localMetrics=await page.evaluate(()=>({lcpMs:Math.round(window.__qaVitals.lcp),cls:window.__qaVitals.cls,domContentLoadedMs:Math.round(performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd),resourceBytes:performance.getEntriesByType('resource').reduce((n,e)=>n+e.encodedBodySize,0),requests:performance.getEntriesByType('resource').length}));
 await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{})}))});
 for(const width of (item.capture?[1440,390]:[320,768,1440])){
  await page.setViewportSize({width,height:width<500?844:1000});
  const layout=await page.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,brokenImages:[...document.images].filter(i=>i.getAttribute('src')&&i.naturalWidth===0).map(i=>i.getAttribute('src')),headings:[...document.querySelectorAll('h1,h2,h3')].filter(e=>e.scrollWidth>e.clientWidth+2).map(e=>e.textContent.trim())}));row.layouts.push(layout);
  if(layout.overflow)row.issues.push('Overflow '+width);if(layout.brokenImages.length)row.issues.push('Broken images '+width);
  if(item.capture){const name=`${item.name}-${width}.png`;await page.screenshot({path:join(out,name),fullPage:true});row.screenshots.push(name)}
 }
 if(item.capture&&!baseline){
  await page.setViewportSize({width:320,height:844});
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  const zoom=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,width:document.documentElement.scrollWidth}));row.text200=zoom;if(zoom.overflow)row.issues.push('Text 200% overflow at 320');
  await page.evaluate(()=>document.documentElement.style.fontSize='');
  if(process.env.AXE_PATH){await page.addScriptTag({path:process.env.AXE_PATH});const axe=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return{violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:r.incomplete.map(v=>v.id)}});row.axe=axe;if(axe.violations.length)row.issues.push('axe '+axe.violations.map(v=>v.id).join(','))}
  await page.goto(base+item.path,{waitUntil:'networkidle'});await page.keyboard.press('Tab');row.firstKeyboardStop=await page.evaluate(()=>({tag:document.activeElement.tagName,text:document.activeElement.textContent.trim().slice(0,80)}));
 }
 row.errors=[...new Set(errors)];if(row.errors.length)row.issues.push('Page errors');
 if(report.results.length%10===0)console.log(`${report.results.length}/${routes.length}`);
}
}finally{await browser.close();report.failures=report.results.filter(r=>r.issues.length).map(r=>({path:r.path,issues:r.issues}));writeFileSync(join(out,'report.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({routes:report.results.length,failures:report.failures,interceptedWrites:report.interceptedWrites}));if(report.failures.length)process.exitCode=1}
