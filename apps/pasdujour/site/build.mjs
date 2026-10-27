// Overlay only landing pages and app-owned assets; keep support/privacy intact.
import {cpSync,mkdirSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {LOCALES,render} from './page.mjs';
const here=dirname(fileURLToPath(import.meta.url));
export function overlay(out){
 if(!existsSync(join(out,'privacy.html')))throw new Error('Expected a PasDuJour stage');
 const dest=join(out,'assets/glance');mkdirSync(dest,{recursive:true});
 cpSync(join(here,'glance.css'),join(dest,'glance.css'));
 for(const d of ['fonts','media'])cpSync(join(here,d),d==='media'?dest:join(dest,d),{recursive:true,filter:p=>!p.endsWith('SOURCES.json')});
 cpSync(join(here,'badges'),join(out,'assets/app-store-badges'),{recursive:true});
 for(const l of LOCALES){
  cpSync(join(here,`og-${l.key}.jpg`),join(dest,`og-${l.key}.jpg`));
  const file=join(out,l.dir,'index.html'),previous=readFileSync(file,'utf8');
  const form=previous.match(/<form class="support-form"[\s\S]*?<\/form>/)?.[0];
  if(!form)throw new Error(`Missing protected form for ${l.code}`);
  writeFileSync(file,render(l,{form,ids:[...previous.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1])}));
 }
 return {app:'PasDuJour',locales:LOCALES.length,out};
}
if(import.meta.url===pathToFileURL(process.argv[1]).href){
 const arg=n=>process.argv[process.argv.indexOf(n)+1];const base=arg('--base'),out=arg('--out');
 if(!process.argv.includes('--base')||!process.argv.includes('--out'))throw new Error('Usage: --base <stage> --out <output>');
 if(resolve(base)!==resolve(out))cpSync(base,out,{recursive:true});
 console.log(JSON.stringify(overlay(out)));
}
