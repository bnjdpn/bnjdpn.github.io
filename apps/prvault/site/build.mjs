// Product-site build calls overlay(out) after generating the shared stage.
import { cpSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { LOCALES, render } from './page.mjs';
const here=dirname(fileURLToPath(import.meta.url));
export function overlay(out){
 if(!existsSync(join(out,'en-US/privacy.html'))) throw new Error(`${out} is not a PRVault stage`);
 const dest=join(out,'assets/personal-best');mkdirSync(dest,{recursive:true});
 cpSync(join(here,'personal-best.css'),join(dest,'personal-best.css'));
 cpSync(join(here,'fonts'),join(dest,'fonts'),{recursive:true});
 cpSync(join(here,'media'),dest,{recursive:true});
 cpSync(join(here,'badges'),join(out,'assets/app-store-badges'),{recursive:true});
 for(const lang of ['fr','en'])cpSync(join(here,`og-${lang}.jpg`),join(dest,`og-${lang}.jpg`));
 for(const loc of LOCALES){mkdirSync(join(out,loc.dir),{recursive:true});writeFileSync(join(out,loc.dir,'index.html'),render(loc));}
 return {app:'PRVault',locales:LOCALES.length,out};
}
if(import.meta.url===pathToFileURL(process.argv[1]).href){
 const arg=n=>process.argv[process.argv.indexOf(n)+1],base=arg('--base'),out=arg('--out');
 if(!process.argv.includes('--base')||!process.argv.includes('--out'))throw new Error('usage: build.mjs --base <PRVault stage> --out <dir>');
 if(resolve(base)!==resolve(out))cpSync(base,out,{recursive:true});console.log(JSON.stringify(overlay(out)));
}
