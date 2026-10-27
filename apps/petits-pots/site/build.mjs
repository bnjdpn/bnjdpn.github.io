// Standalone catalogue app: no app-repository marketing config is needed.
import {readFileSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {LOCALES,render} from './page.mjs';
const here=dirname(fileURLToPath(import.meta.url));
export function files(){
 const result=new Map();
 const copy=(dir,prefix)=>{for(const item of readdirSync(join(here,dir),{withFileTypes:true})){const from=join(dir,item.name),to=join(prefix,item.name);if(item.isDirectory())copy(from,to);else result.set(to,readFileSync(join(here,from)));}};
 result.set('assets/pantry/pantry.css',readFileSync(join(here,'pantry.css')));
 for(const dir of ['fonts','badges'])copy(dir,`assets/pantry/${dir}`);
 copy('media','assets/pantry');
 for(const name of ['og-fr.jpg','og-en.jpg','icon.png'])result.set(`assets/pantry/${name}`,readFileSync(join(here,name)));
 for(const loc of LOCALES)result.set(loc.dir+'index.html',render(loc));
 return result;
}
export function overlay(out){for(const [name,data] of files()){const target=join(out,name);mkdirSync(dirname(target),{recursive:true});writeFileSync(target,data);}return {app:'Petits Pots',locales:LOCALES.length,out};}
if(import.meta.url===pathToFileURL(process.argv[1]).href){const i=process.argv.indexOf('--out');if(i<0)throw new Error('Usage: node build.mjs --out <directory>');console.log(JSON.stringify(overlay(process.argv[i+1])));}
