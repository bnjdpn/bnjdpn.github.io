import {readFile,readdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
// Inspect the shipped surface and editorial sources, never policy documentation.
const forbidden=/RealmBox|TaskLane|NovaStationPinball|6799920176|Technical Leader|professional portfolio|professional work|parcours professionnel|software architecture|architecture logicielle|Yomoni|Fnac Darty|Shodo|Société Générale|linkedin\.com|"(?:jobTitle|worksFor|alumniOf|hasOccupation|knowsAbout)"|id="experience"/i;
const hasExcludedContent=text=>forbidden.test(text);
assert(hasExcludedContent('<meta name="description" content="RealmBox">'));
assert(hasExcludedContent('{"name":"TaskLane"}'));
assert(hasExcludedContent('<h2>Parcours professionnel</h2>'));
assert(!hasExcludedContent('Apps pour le sport · Benjamin Dupin · Échappée'));
async function walk(path){const entries=await readdir(resolve(root,path),{withFileTypes:true});return (await Promise.all(entries.map(e=>e.isDirectory()?walk(`${path}/${e.name}`):`${path}/${e.name}`))).flat();}
const files=['index.html','404.html','sitemap.xml','sitemap-pages.xml','robots.txt','styles.css','site.webmanifest',...(await walk('fr')),...(await walk('assets')),...(await walk('content')),'scripts/og-card.html'];
const failures=[];
for(const path of files){
 if(hasExcludedContent(path)) failures.push(`${path}: excluded asset or route`);
 if(/\.(?:html|json|mjs|js|css|xml|txt|webmanifest|svg)$/.test(path)&&hasExcludedContent(await readFile(resolve(root,path),'utf8')))failures.push(`${path}: excluded public content`);
}
if(failures.length)throw new Error(failures.join('\n'));
console.log(`✓ Catalogue boundary: ${files.length} public/source files, metadata, routes and asset names; internal instructions excluded`);
