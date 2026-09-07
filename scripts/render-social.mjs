// Reproduce the social preview from its HTML source using the optional QA runtime.
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
 await page.goto(new URL('./og-card.html',import.meta.url).href);
 await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(image=>image.decode()));});
 await page.screenshot({path:fileURLToPath(new URL('../assets/social/og.jpg',import.meta.url)),type:'jpeg',quality:92});
}finally{await browser.close();}
