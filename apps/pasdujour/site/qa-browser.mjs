// Local acceptance runner. No production messages are sent.
// PLAYWRIGHT_MODULE=/path/to/playwright node apps/pasdujour/site/qa-browser.mjs
import {createRequire} from 'node:module';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const require=createRequire(import.meta.url);
const {webkit}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const out=resolve(process.env.QA_OUT||'/Users/benjamin/Documents/Studio/_studio/.local/site-pasdujour');
const origin=process.env.QA_ORIGIN||'http://127.0.0.1:8765/.local/public/PasDuJour/';
mkdirSync(out,{recursive:true});
const results=[];
let browser;
try{
 browser=await webkit.launch({headless:true,executablePath:process.env.WEBKIT_EXECUTABLE||'/Users/benjamin/Library/Caches/ms-playwright/webkit-2359/pw_run.sh'});
 for(const lang of ['fr','en'])for(const width of [375,390,430])for(const mode of ['normal','zoom120','text120','zoom-text120']){
  const context=await browser.newContext({viewport:{width,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
  const page=await context.newPage();
  await page.goto(origin+(lang==='fr'?'fr-FR/':''),{waitUntil:'networkidle'});
  await page.evaluate(async()=>{await document.fonts.ready;for(const i of document.images){i.loading='eager';await i.decode();if(!i.complete||!i.naturalWidth)throw new Error('Image failed: '+i.src)}});
  await page.evaluate(mode=>{if(mode.includes('zoom'))document.body.style.zoom='1.2';if(mode.includes('text'))document.documentElement.style.fontSize='120%'},mode);
  await page.screenshot({path:resolve(out,`webkit-${lang}-${width}-${mode}-full.png`),fullPage:true});
  if(lang==='fr'&&width===390&&mode==='normal')await page.screenshot({path:resolve(out,'first-fr-390.png')});
  const proof=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),hero:document.querySelector('.pd-today img').getBoundingClientRect().toJSON()}));
  if(proof.scroll>proof.width||proof.broken.length)throw new Error(JSON.stringify({lang,width,mode,...proof}));
  if(mode==='normal'&&proof.hero.top>=844)throw new Error('App screen missing from first viewport');
  results.push({lang,width,mode,...proof});await context.close();
 }
 const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 await page.goto(origin+'fr-FR/',{waitUntil:'networkidle'});await page.evaluate(async()=>{await document.fonts.ready;for(const i of document.images){i.loading='eager';await i.decode();if(!i.complete||!i.naturalWidth)throw new Error('Image failed: '+i.src)}});
 await page.screenshot({path:resolve(out,'first-fr-1440.png')});await page.screenshot({path:resolve(out,'webkit-fr-1440-full.png'),fullPage:true});
 writeFileSync(resolve(out,'browser-results.json'),JSON.stringify(results,null,2)+'\n');
}catch(error){writeFileSync(resolve(out,'browser-blocked.log'),String(error.stack||error)+'\n');throw error}
finally{if(browser)await browser.close()}
