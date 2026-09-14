// Reproduce both localized previews from versioned HTML, fonts and real product images.
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'});
try{
 for(const lang of ['en','fr']){
  const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
  const url=new URL('./og-card.html',import.meta.url);url.searchParams.set('lang',lang);
  await page.goto(url.href);
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(image=>image.decode()))});
  await page.screenshot({path:fileURLToPath(new URL(`../assets/social/og${lang==='fr'?'-fr':''}.jpg`,import.meta.url)),type:'jpeg',quality:90});
  await page.close();
 }
}finally{await browser.close()}
