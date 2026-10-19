import {readFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2);
const index=args.indexOf('--base');
const base=(index>=0?args[index+1]:process.env.PREVIEW_URL||'').replace(/\/$/,'');
if(!base){console.error('Usage: node scripts/check-preview-pages.mjs --base <preview-url>');process.exit(2);}
const sitemap=await readFile(resolve(root,'sitemap-pages.xml'),'utf8');
const urls=[...sitemap.matchAll(/<loc>(https:\/\/bnjdpn\.com[^<]*)<\/loc>/g)].map(match=>new URL(match[1]).pathname);
if(!urls.length)throw new Error('No bnjdpn.com pages found in sitemap-pages.xml');
let next=0, failures=0;
const workers=Array.from({length:Math.min(8,urls.length)},async()=>{
 while(next<urls.length){
  const path=urls[next++];
  try{
   const response=await fetch(base+path,{redirect:'follow',headers:{'user-agent':'bnjdpn-preview-page-check'}});
   if(response.status!==200){failures++;console.log(`FAIL ${response.status} ${path} -> ${response.url}`);}
   else console.log(`OK ${response.status} ${path}`);
  }catch(error){failures++;console.log(`FAIL ${path} ${error.message}`);}
 }
});
await Promise.all(workers);
console.log(`${failures?'FAIL':'PASS'} ${urls.length} sitemap pages, ${failures} failures`);
if(failures)process.exit(1);
