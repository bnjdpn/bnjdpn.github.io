// Reproducible 2x derivatives of the existing 48px related-app icons.
// Original PNG routes and source files remain available.
import {readFile,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
const require=createRequire(import.meta.url),sharp=require(process.env.SHARP_MODULE||'sharp');
const root=resolve(process.argv[2]||'.');
const config=JSON.parse(await readFile(resolve(root,'marketing/site.json'),'utf8'));
for(const app of config.related_apps||[]){
 const asset=config.local_assets.find(x=>x.path===app.icon_path);
 if(!asset?.source.endsWith('.webp'))continue;
 await sharp(resolve(root,asset.source.replace(/\.webp$/,'.png'))).resize(96,96).webp({quality:90}).toFile(resolve(root,asset.source));
}
