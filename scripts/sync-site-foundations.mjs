#!/usr/bin/env node
// Explicit adopters only; no repository discovery or remote branch dependency.
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const args=process.argv.slice(2),idx=args.indexOf('--repos');
const parent=idx<0?resolve(root,'..'):resolve(args[idx+1]);
const adopters=['BrewMeter','FastZen','GrooveLog','NeatShift','NoBuyCart','PasDuJour'];
const source=await readFile(resolve(root,'scripts/site-foundations.css'),'utf8');let failed=false;
for(const name of adopters){const path=resolve(parent,name,'marketing/foundations.css');if(args.includes('--check')){if(await readFile(path,'utf8').catch(()=>null)!==source){console.error(`${name}: foundations differ`);failed=true}}else{await writeFile(path,source)}}
for(const file of ['render-product-social.mjs','optimize-related-icons.mjs']){
 const source=await readFile(resolve(root,'scripts',file),'utf8');
 for(const name of adopters){const path=resolve(parent,name,'scripts',file);if(args.includes('--check')){if(await readFile(path,'utf8').catch(()=>null)!==source){console.error(`${name}: ${file} differs`);failed=true}}else await writeFile(path,source)}
}
if(failed)process.exit(1);console.log(`✓ ${adopters.length} independent local copies ${args.includes('--check')?'match':'updated'}`);
