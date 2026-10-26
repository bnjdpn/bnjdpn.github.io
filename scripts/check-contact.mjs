import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {contactApps, contactCopy} from '../content/contact-page.mjs';
import {petitsPotsFormPrivacy} from '../content/petites-contact.mjs';

const code = await readFile(new URL('../assets/contact.js', import.meta.url), 'utf8');
// No network: exercise the shipped handler against browser-API doubles.
function page(search='', response=async()=>({ok:true,json:async()=>({ok:true})}), configResponse=async()=>({ok:true,json:async()=>({sitekey:'fixture-public-key'})})) {
  const inputs=Object.fromEntries(['app','category','email','message','_gotcha','app_version','os_version'].map(name=>[name,{value:''}]));
  Object.assign(inputs.app,{value:'petits-pots'}); inputs.category.value='other'; inputs.email.value='qa@example.invalid'; inputs.message.value='Test message';
  let submit, widget, resetCount=0, resetThrows=false;
  const calls=[], scripts=[], timers=new Map();
  const form={action:'/api/contact',dataset:{messages:JSON.stringify(contactCopy.en.messages),apps:JSON.stringify(contactApps)},elements:{namedItem:name=>inputs[name]},reportValidity:()=>true,addEventListener:(event,handler)=>{if(event==='submit')submit=handler;}};
  const elements={'contact-title':{textContent:'',dataset:{template:contactCopy.en.title}},'contact-privacy':{href:''},'support-form':form,'form-status':{textContent:''},'send-message':{disabled:true},'app-version-label':{textContent:''},'os-version-label':{textContent:''}};
  const links=[{href:'https://bnjdpn.com/fr/contact/'},{href:'https://bnjdpn.com/contact/'}];
  const window={location:{search},turnstile:{render:(_target,options)=>{widget=options;return 'widget';},reset:()=>{resetCount++;if(resetThrows)throw new Error('widget reset failed');}}};
  class FormDataDouble extends Map {constructor(){super(Object.entries(inputs).map(([k,v])=>[k,v.value]));}}
  vm.runInNewContext(code,{window,document:{documentElement:{lang:'en'},getElementById:id=>elements[id],querySelectorAll:()=>links,createElement:()=>({}),head:{appendChild:script=>scripts.push(script)}},URL,URLSearchParams,FormData:FormDataDouble,AbortController,setTimeout:(fn,ms)=>{timers.set(ms,fn);return ms;},clearTimeout:id=>timers.delete(id),fetch:async(url,options)=>{if(url==='/api/contact/config')return configResponse();calls.push({url,options});return response(options);}});
  return {inputs,elements,links,calls,scripts,timers,init:async()=>{await new Promise(setImmediate);window.supportTurnstileReady?.();assert.equal(widget.action,'contact');assert.equal(widget.sitekey,'fixture-public-key');},token:value=>widget.callback(value),failReset:()=>{resetThrows=true;},expire:()=>widget['expired-callback'](),verificationError:()=>widget['error-callback'](),verificationTimeout:()=>widget['timeout-callback'](),send:()=>submit({preventDefault(){}}),get resets(){return resetCount;}};
}

const metadata=page('?app=petits-pots&category=purchase&app_version=%3Cscript%3Ebad%3C%2Fscript%3E%0A1.0&os_version='+ 'x'.repeat(100)+'&email=secret&message=secret&redirect=https://evil.invalid');
assert.equal(metadata.inputs.category.value,'purchase');
assert.equal(metadata.elements['app-version-label'].textContent,'<script>bad</script> 1.0');
assert.equal(metadata.inputs.os_version.value.length,64);
assert.equal(metadata.inputs.email.value,'qa@example.invalid');
assert(metadata.links.every(link=>!link.href.includes('secret')&&!link.href.includes('redirect')));
await metadata.send(); assert.equal(metadata.calls.length,0);
await metadata.init(); metadata.token('single-use'); await metadata.send();
assert.equal(metadata.calls.length,1); assert.equal(metadata.calls[0].url,'/api/contact');
assert.equal(metadata.calls[0].options.body.get('cf-turnstile-response'),'single-use');
assert.equal(metadata.calls[0].options.credentials,'omit'); assert.equal(metadata.inputs.message.value,'');
assert.equal(metadata.resets,1); assert.equal(metadata.elements['form-status'].textContent,contactCopy.en.messages.success);
metadata.token('renewed'); assert.equal(metadata.elements['form-status'].textContent,contactCopy.en.messages.success);

for (const search of ['?app=other','?app=petits-pots%3Cscript%3E','?app=','?app=__proto__']) {
  const invalid=page(search); await invalid.send(); assert.equal(invalid.scripts.length,0); assert.equal(invalid.calls.length,0);
}
for (const response of [async()=>({ok:false,json:async()=>({ok:false,error:'send'})}),async()=>({ok:true,json:async()=>({ok:false})}),async()=>{throw new Error('network');},async()=>({ok:true,json:async()=>{throw new Error('invalid JSON');}})]) {
  const failure=page('',response); await failure.init(); failure.token('used'); await failure.send();
  assert.equal(failure.inputs.message.value,'Test message'); assert.equal(failure.elements['form-status'].textContent,contactCopy.en.messages.error);
  await failure.send(); assert.equal(failure.calls.length,1); assert.equal(failure.resets,1);
}
let release;
const resetFailure=page('',async()=>({ok:false,json:async()=>({ok:false})}));
await resetFailure.init(); resetFailure.failReset(); resetFailure.token('once'); await resetFailure.send();
assert.equal(resetFailure.inputs.message.value,'Test message'); assert.equal(resetFailure.elements['send-message'].disabled,true);
resetFailure.token('renewed'); assert.equal(resetFailure.elements['send-message'].disabled,false);
await resetFailure.send(); assert.equal(resetFailure.calls.length,2);
const pending=page('',()=>new Promise(resolve=>{release=resolve;})); await pending.init(); pending.token('once');
const first=pending.send(); await pending.send(); assert.equal(pending.calls.length,1);
release({ok:true,json:async()=>({ok:true})}); await first;
const expired=page(); await expired.init(); expired.token('old'); expired.expire(); await expired.send(); assert.equal(expired.calls.length,0);
const blocked=page(); await new Promise(setImmediate); blocked.scripts[0].onerror(); assert.equal(blocked.elements['form-status'].textContent,contactCopy.en.messages.unavailable);
assert.equal(blocked.scripts[0].src,'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=supportTurnstileReady&render=explicit');
for (const configResponse of [async()=>({ok:false}), async()=>({ok:true,json:async()=>({})}), async()=>{throw new Error('offline');}]) {
  const noConfig=page('',undefined,configResponse); await new Promise(setImmediate);
  assert.equal(noConfig.scripts.length,0); assert.equal(noConfig.elements['send-message'].disabled,true);
  assert.equal(noConfig.elements['form-status'].textContent,contactCopy.en.messages.unavailable);
  assert.equal(noConfig.inputs.message.value,'Test message');
}
const timedOut=page('',options=>new Promise((_resolve,reject)=>options.signal.addEventListener('abort',()=>reject(new Error('aborted')))));
await timedOut.init(); timedOut.token('used'); const timedRequest=timedOut.send(); timedOut.timers.get(20000)(); await timedRequest;
assert(timedOut.calls[0].options.signal.aborted); assert.equal(timedOut.inputs.message.value,'Test message');
timedOut.verificationError(); assert(timedOut.elements['form-status'].textContent.includes(contactCopy.en.messages.unavailable));
timedOut.verificationTimeout(); assert(timedOut.elements['form-status'].textContent.includes(contactCopy.en.messages.verify));
assert.equal(timedOut.calls.length,1);
for (const lang of ['en','fr']) {
  const prefix=lang==='fr'?'fr/':'';
  const html=await readFile(new URL(`../${prefix}contact/index.html`,import.meta.url),'utf8');
  assert(html.includes(`<html lang="${lang}">`)); assert(html.includes('name="_gotcha"')); assert(html.includes('maxlength="5000"'));
  assert(html.includes('action="/api/contact"'));
  assert(html.includes('type="submit" disabled')); assert(html.includes('mailto:contact@bnjdpn.com'));
  assert(html.includes('role="status"')); assert(html.includes(`<link rel="canonical" href="https://bnjdpn.com/${prefix}contact/">`));
}
console.log('✓ Contact EN/FR: safe context, fixed destination, token requirement/renewal, duplicate submit, failure recovery, expiry and blocked script; no real requests');

const received=[];
const server=createServer(async(req,res)=>{
  let body=''; for await(const part of req) body+=part;
  received.push({method:req.method,path:req.url,fields:Object.fromEntries(new URLSearchParams(body))});
  res.writeHead(200,{'Content-Type':'application/json'}); res.end(JSON.stringify({ok:true}));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
try {
  const endpoint=`http://127.0.0.1:${server.address().port}/api/contact`;
  for(const system of ['iOS 27.1','Android 16']) {
    const support=page('?app=petits-besoins&category=bug&app_version=1.0.0%20(5)&os_version='+encodeURIComponent(system), options=>fetch(endpoint,{method:options.method,body:new URLSearchParams(options.body)}));
    assert.equal(support.elements['contact-title'].textContent,'Contact Petits Besoins');
    assert.equal(support.elements['contact-privacy'].href,'/apps/petits-besoins/privacy/');
    assert(support.links.every(link=>new URL(link.href).searchParams.get('app')==='petits-besoins'));
    await support.init(); support.token('fixture-only'); await support.send();
    assert.equal(support.elements['form-status'].textContent,contactCopy.en.messages.success);
    const sent=received.at(-1); assert.equal(sent.method,'POST'); assert.equal(sent.path,'/api/contact');
    assert.deepEqual(sent.fields,{app:'petits-besoins',category:'bug',email:'qa@example.invalid',message:'Test message',_gotcha:'',app_version:'1.0.0 (5)',os_version:system,'cf-turnstile-response':'fixture-only'});
  }
} finally { await new Promise(resolve=>server.close(resolve)); }
console.log('✓ Petits Besoins: iOS/Android context submitted to local fake server only');

for (const lang of ['en','fr']) {
  const prefix=lang==='fr'?'fr/':'';
  const esc=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  for (const app of ['petits-pots','petits-besoins']) {
    for (const leaf of ['','support/','privacy/']) {
      const html=await readFile(new URL(`../${prefix}apps/${app}/${leaf}index.html`,import.meta.url),'utf8');
      assert(html.includes(esc(petitsPotsFormPrivacy[lang])),`${lang}/${app}/${leaf}: approved contact notice missing`);
    }
  }
}
console.log('✓ Exact approved support notice shared only by Petits Pots and Petits Besoins');
