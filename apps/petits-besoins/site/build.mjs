// Independent site sources; shared by the portfolio build and product-site stages.
import {readFileSync,readdirSync,mkdirSync,writeFileSync,statSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {LOCALES,render} from './page.mjs';
const here=dirname(fileURLToPath(import.meta.url));
export function files() {
 const output=new Map(LOCALES.map(loc=>[`${loc.dir}index.html`,render(loc)]));
 const walk=(dir,rel='')=>{for(const name of readdirSync(join(here,dir,rel))){const path=join(rel,name);if(statSync(join(here,dir,path)).isDirectory())walk(dir,path);else output.set(`assets/${dir}/${path}`,readFileSync(join(here,dir,path)));}};
 for(const dir of ['fonts','media','badges'])walk(dir);
 for(const name of ['relais.css','og-fr.jpg','og-en.jpg'])output.set(`assets/${name}`,readFileSync(join(here,name)));
 output.set('assets/icon.png',readFileSync(join(here,'../../../assets/petits-besoins-icon.png')));
 return output;
}
export function overlay(out) {
 for(const [path,data] of files()){const dest=join(out,path);mkdirSync(dirname(dest),{recursive:true});writeFileSync(dest,data);}
 return {app:'Petits Besoins',locales:LOCALES.length,out};
}
