// Confirms addresses that already existed still respond.
// Local paths are fetched from --base. Support and privacy URLs are fetched on the network.
import {writeFile} from 'node:fs/promises';
const args=process.argv.slice(2);
const arg=(flag,fallback)=>{const i=args.indexOf(flag);return i>=0?args[i+1]:fallback;};
const base=arg('--base','http://127.0.0.1:4173').replace(/\/$/,'');
const out=arg('--out','');
const local=[
 '/','/fr/','/guides/tempo-timer/','/fr/guides/minuteur-tempo/','/fr/guides/journal-diversification/',
 '/404.html','/robots.txt','/sitemap.xml','/sitemap-pages.xml','/site.webmanifest','/styles.css','/assets/site.js','/assets/favicon.svg'
];
const anchors=['main','about','selected','products','contact'];
const remote=[
 'LoadSense','TempoReps','PRVault','GrooveLog','FastZen','ColdLoad','MoveAtlas','NeatShift','BrewMeter','NoBuyCart','petites-gouttes','petites-bouchees','petites-nuits'
].flatMap(path=>[
 `https://bnjdpn.github.io/${path}/#contact`,
 `https://bnjdpn.github.io/${path}/fr-FR/#contact`,
 `https://bnjdpn.github.io/${path}/en-US/privacy.html`,
 `https://bnjdpn.github.io/${path}/fr-FR/privacy.html`
]).concat([
 'https://bnjdpn.github.io/PasDuJour/#contact',
 'https://bnjdpn.github.io/PasDuJour/fr-FR/#contact',
 'https://bnjdpn.github.io/PasDuJour/privacy.html',
 'https://bnjdpn.github.io/VesperDrift/#contact',
 'https://bnjdpn.github.io/VesperDrift/fr-FR/#contact',
 'https://bnjdpn.github.io/VesperDrift/privacy.html',
 'https://bnjdpn.github.io/petites-dents/#contact',
 'https://bnjdpn.github.io/petites-dents/fr-FR/#contact',
 'https://bnjdpn.github.io/petites-dents/privacy.html',
 'https://bnjdpn.github.io/Echappee/support.html',
 'https://bnjdpn.github.io/Echappee/fr-FR/support.html',
 'https://bnjdpn.github.io/Echappee/privacy.html',
 'https://bnjdpn.github.io/Echappee/fr-FR/privacy.html'
]);
const lines=[];
let failed=0;
async function hit(url, note){
 try{
  const response=await fetch(url,{redirect:'follow',headers:{'user-agent':'bnjdpn-url-check'}});
  const ok=response.status>=200&&response.status<400;
  if(!ok)failed++;
  lines.push(`${ok?'OK':'FAIL'} ${response.status} ${note||url} -> ${response.url}`);
  return response;
 }catch(error){
  failed++;
  lines.push(`FAIL ${note||url} ${error.message}`);
  return null;
 }
}
lines.push(`# Local ${base}`);
for(const path of local){
 const response=await hit(base+path, path);
 if(response&&(path==='/'||path==='/fr/')){
  const html=await response.text();
  for(const id of anchors){
   const present=html.includes(`id="${id}"`);
   if(!present)failed++;
   lines.push(`${present?'OK':'FAIL'} anchor #${id} on ${path}`);
  }
  const contact=html.includes('data-contact')&&html.includes('<noscript>')&&!html.includes('mailto:');
  if(!contact)failed++;
  lines.push(`${contact?'OK':'FAIL'} contact control on ${path}`);
  const name=html.includes('Benjamin Dupin');
  if(!name)failed++;
  lines.push(`${name?'OK':'FAIL'} Benjamin Dupin on ${path}`);
 }
}
lines.push('# Remote support and privacy');
for(const url of remote)await hit(url);
lines.push(`# ${failed===0?'PASS':'FAIL'} ${lines.length} lines, ${failed} failures`);
const text=lines.join('\n')+'\n';
if(out)await writeFile(out,text);
console.log(text);
if(failed)process.exit(1);
