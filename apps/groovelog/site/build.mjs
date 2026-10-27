// Overlay only the product landing pages. Legal documents, guides, contact
// endpoint and the existing site.js are kept byte for byte from the stage.
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCALES, render } from './page.mjs';
import { forms, legacyIds } from './support.mjs';
const here=dirname(fileURLToPath(import.meta.url));
export function overlay(out){
 for(const loc of LOCALES){
  const file=join(out,loc.dir,'index.html');
  const old=readFileSync(file,'utf8');
  const form=old.match(/<form class="support-form"[\s\S]*?<\/form>/)?.[0];
  if(form!==forms[loc.code]) throw new Error(`GrooveLog ${loc.code}: existing support form changed; refresh the exact source snapshot before overlay`);
  const html=render(loc, [...old.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  for(const id of [...legacyIds[loc.code],...[...old.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1])]){
   if(!ids.has(id))throw new Error(`GrooveLog ${loc.code}: missing existing anchor #${id}`);
  }
  writeFileSync(file,html);
 }
 const dest=join(out,'assets','rhythm');mkdirSync(dest,{recursive:true});
 cpSync(join(here,'rhythm.css'),join(dest,'rhythm.css'));
 for(const dir of ['fonts','badges'])cpSync(join(here,dir),join(dest,dir),{recursive:true});
 cpSync(join(here,'media'),dest,{recursive:true});
 for(const loc of LOCALES)cpSync(join(here,`og-${loc.key}.jpg`),join(dest,`og-${loc.key}.jpg`));
 return {app:'GrooveLog',locales:LOCALES.length,out};
}
