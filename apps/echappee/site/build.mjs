// Overlay only the verified FR/EN home pages; keep all other URLs and form bytes.
import {cpSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {LOCALES,render} from './page.mjs';
const here=dirname(fileURLToPath(import.meta.url));
export function overlay(out){
 if(!existsSync(join(out,'fr-FR/support.html'))||!existsSync(join(out,'privacy.html')))throw new Error('Échappée overlay requires the existing _pages stage (support and privacy).');
 const dest=join(out,'assets/route');mkdirSync(dest,{recursive:true});
 for(const name of ['route.css','fonts','badges'])cpSync(join(here,name),join(dest,name),{recursive:true});
 for(const loc of LOCALES){cpSync(join(here,'media',loc.code),join(dest,loc.code),{recursive:true});cpSync(join(here,`og-${loc.code}.jpg`),join(dest,`og-${loc.code}.jpg`));writeFileSync(join(out,loc.dir,'index.html'),render(loc));}
 // Hash-versioned CSS uses the existing Pages cache policy (4 hours).
 return {app:'Echappee',locales:LOCALES.length,out};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const arg=k=>process.argv[process.argv.indexOf(k)+1];const base=arg('--base'),out=arg('--out');if(!process.argv.includes('--base')||!process.argv.includes('--out'))throw new Error('Use --base <existing _pages stage> --out <candidate>');if(resolve(base)!==resolve(out))cpSync(base,out,{recursive:true});console.log(JSON.stringify(overlay(out)));}
