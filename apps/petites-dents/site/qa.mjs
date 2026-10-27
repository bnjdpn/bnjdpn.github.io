// Run from the repo root after building the preview stage. No messages are sent.
// PLAYWRIGHT_MODULE=/path/to/playwright node apps/petites-dents/site/qa.mjs --base http://127.0.0.1:4174 --out /path/to/evidence
import {createRequire} from 'node:module';
import {mkdirSync,writeFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
const require=createRequire(import.meta.url),{webkit}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const arg=(n,d)=>process.argv.includes(n)?process.argv[process.argv.indexOf(n)+1]:d;
const base=arg('--base','http://127.0.0.1:4174'),out=resolve(arg('--out','output/playwright/petites-dents'));
mkdirSync(out,{recursive:true});
const report={engine:'WebKit',zoom:'CSS zoom 1.2 (layout zoom emulation)',text:'-webkit-text-size-adjust:120%',results:[]};
let browser;
const loadImages=page=>page.evaluate(async()=>{
 await document.fonts.ready;
 for(const im of document.images)im.loading='eager';
 await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));
});
const measure=page=>page.evaluate(()=>{
 const box=document.querySelector('.pd-chart').getBoundingClientRect();
 return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),hero:box.toJSON(),heroVisible:Math.max(0,Math.min(innerHeight,box.bottom)-Math.max(0,box.top))};
});
const check=(result,firstScreen=false)=>{
 if(result.scrollWidth>result.width||result.broken.length)throw Error('Overflow or broken image: '+JSON.stringify(result));
 // Require a meaningful visible portion of the real screen, not a one-pixel edge.
 if(firstScreen&&result.heroVisible<200)throw Error('Less than 200px of the real app screen in the first viewport: '+JSON.stringify(result));
};
try{
 browser=await webkit.launch({headless:true,...(process.env.WEBKIT_EXECUTABLE?{executablePath:process.env.WEBKIT_EXECUTABLE}:{})});
 for(const locale of ['fr-FR/','','en-GB/']){
  for(const width of [375,390,430]){
   const context=await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});
   await context.route('**/*',route=>['GET','HEAD'].includes(route.request().method())?route.continue():route.abort());
   const page=await context.newPage();await page.goto(base+'/petites-dents/'+locale);await loadImages(page);
   const initial=await measure(page);report.results.push({...initial,locale:locale||'en-US',viewport:width,scale:'100%'});check(initial,locale==='fr-FR/'&&width===390);
   if(locale==='fr-FR/'&&width===390){await page.screenshot({path:join(out,'first-fr-390.png')});await page.screenshot({path:join(out,'full-fr-390.png'),fullPage:true});}
   await page.evaluate(()=>{document.documentElement.style.zoom='1.2';document.documentElement.style.webkitTextSizeAdjust='120%';});
   const result={...await measure(page),locale:locale||'en-US',viewport:width,scale:'120%',screenshot:`webkit-${locale.replace('/','')||'en-US'}-${width}-120.png`};report.results.push(result);
   await page.screenshot({path:join(out,result.screenshot),fullPage:true});check(result);await context.close();
  }
 }
 const page=await browser.newPage({viewport:{width:1440,height:1000}});await page.goto(base+'/petites-dents/fr-FR/');await loadImages(page);
 const desktop={...await measure(page),locale:'fr-FR',viewport:1440,scale:'100%'};report.results.push(desktop);check(desktop,true);
 await page.screenshot({path:join(out,'first-fr-1440.png')});await page.screenshot({path:join(out,'full-fr-1440.png'),fullPage:true});
}catch(error){report.error=error.stack;process.exitCode=1;}finally{if(browser)await browser.close();writeFileSync(join(out,'webkit-report.json'),JSON.stringify(report,null,2)+'\n');}
