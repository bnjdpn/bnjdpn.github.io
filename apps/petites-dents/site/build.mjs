import {cpSync,mkdirSync,writeFileSync,existsSync} from 'node:fs';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {LOCALES,render} from './page.mjs';
const here=dirname(fileURLToPath(import.meta.url));
export function overlay(out){
 if(!existsSync(join(out,'privacy.html')))throw Error('Expected the Petites Dents generated stage');
 const dest=join(out,'assets','dentdates');mkdirSync(dest,{recursive:true});
 for(const f of ['dentdates.css','contact.js','fonts','badges'])cpSync(join(here,f),join(dest,f),{recursive:true});
 cpSync(join(here,'media'),dest,{recursive:true,filter:p=>!p.endsWith('.json')});
 for(const f of ['og-en.jpg','og-fr.jpg'])cpSync(join(here,f),join(dest,f));
 for(const loc of LOCALES){mkdirSync(join(out,loc.dir),{recursive:true});writeFileSync(join(out,loc.dir,'index.html'),render(loc));}
 return {app:'Petites Dents',locales:LOCALES.length,out};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const arg=n=>process.argv[process.argv.indexOf(n)+1];const base=arg('--base'),out=arg('--out');if(!base||!out)throw Error('Usage: --base <stage> --out <output>');if(resolve(base)!==resolve(out))cpSync(base,out,{recursive:true});console.log(overlay(out));}
