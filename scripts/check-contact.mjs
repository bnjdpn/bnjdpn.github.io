import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {contactCopy} from '../content/contact-page.mjs';

const code = await readFile(new URL('../assets/contact.js', import.meta.url), 'utf8');
// No network: exercise the shipped handler against browser-API doubles.
function page(search='', response=async()=>({ok:true,json:async()=>({ok:true})})) {
  const inputs=Object.fromEntries(['app','category','email','message','_gotcha','app_version','os_version'].map(name=>[name,{value:''}]));
  Object.assign(inputs.app,{value:'petits-pots'}); inputs.category.value='other'; inputs.email.value='qa@example.invalid'; inputs.message.value='Test message';
  let submit, widget, resetCount=0;
  const calls=[], scripts=[], timers=new Map();
  const form={action:'https://petites-forms.bnjdpn.com/contact',dataset:{messages:JSON.stringify(contactCopy.en.messages)},elements:{namedItem:name=>inputs[name]},reportValidity:()=>true,addEventListener:(event,handler)=>{if(event==='submit')submit=handler;}};
  const elements={'support-form':form,'form-status':{textContent:''},'send-message':{disabled:true},'app-version-label':{textContent:''},'os-version-label':{textContent:''}};
  const links=[{href:'https://bnjdpn.com/fr/contact/'},{href:'https://bnjdpn.com/contact/'}];
  const window={location:{search},turnstile:{render:(_target,options)=>{widget=options;return 'widget';},reset:()=>{resetCount++;}}};
  class FormDataDouble extends Map {constructor(){super(Object.entries(inputs).map(([k,v])=>[k,v.value]));}}
  vm.runInNewContext(code,{window,document:{documentElement:{lang:'en'},getElementById:id=>elements[id],querySelectorAll:()=>links,createElement:()=>({}),head:{appendChild:script=>scripts.push(script)}},URL,URLSearchParams,FormData:FormDataDouble,AbortController,setTimeout:(fn,ms)=>{timers.set(ms,fn);return ms;},clearTimeout:id=>timers.delete(id),fetch:async(url,options)=>{calls.push({url,options});return response(options);}});
  return {inputs,elements,links,calls,scripts,timers,init:()=>window.supportTurnstileReady?.(),token:value=>widget.callback(value),expire:()=>widget['expired-callback'](),verificationError:()=>widget['error-callback'](),verificationTimeout:()=>widget['timeout-callback'](),send:()=>submit({preventDefault(){}}),get resets(){return resetCount;}};
}

const metadata=page('?app=petits-pots&category=purchase&app_version=%3Cscript%3Ebad%3C%2Fscript%3E%0A1.0&os_version='+ 'x'.repeat(100)+'&email=secret&message=secret&redirect=https://evil.invalid');
assert.equal(metadata.inputs.category.value,'purchase');
assert.equal(metadata.elements['app-version-label'].textContent,'<script>bad</script> 1.0');
assert.equal(metadata.inputs.os_version.value.length,64);
assert.equal(metadata.inputs.email.value,'qa@example.invalid');
assert(metadata.links.every(link=>!link.href.includes('secret')&&!link.href.includes('redirect')));
await metadata.send(); assert.equal(metadata.calls.length,0);
metadata.init(); metadata.token('single-use'); await metadata.send();
assert.equal(metadata.calls.length,1); assert.equal(metadata.calls[0].url,'https://petites-forms.bnjdpn.com/contact');
assert.equal(metadata.calls[0].options.body.get('cf-turnstile-response'),'single-use');
assert.equal(metadata.calls[0].options.credentials,'omit'); assert.equal(metadata.inputs.message.value,'');
assert.equal(metadata.resets,1); assert.equal(metadata.elements['form-status'].textContent,contactCopy.en.messages.success);
metadata.token('renewed'); assert.equal(metadata.elements['form-status'].textContent,contactCopy.en.messages.success);

for (const search of ['?app=other','?app=petits-pots%3Cscript%3E']) {
  const invalid=page(search); await invalid.send(); assert.equal(invalid.scripts.length,0); assert.equal(invalid.calls.length,0);
}
for (const response of [async()=>({ok:false,json:async()=>({ok:false,error:'send'})}),async()=>({ok:true,json:async()=>({ok:false})}),async()=>{throw new Error('network');},async()=>({ok:true,json:async()=>{throw new Error('invalid JSON');}})]) {
  const failure=page('',response); failure.init(); failure.token('used'); await failure.send();
  assert.equal(failure.inputs.message.value,'Test message'); assert.equal(failure.elements['form-status'].textContent,contactCopy.en.messages.error);
  await failure.send(); assert.equal(failure.calls.length,1); assert.equal(failure.resets,1);
}
let release;
const pending=page('',()=>new Promise(resolve=>{release=resolve;})); pending.init(); pending.token('once');
const first=pending.send(); await pending.send(); assert.equal(pending.calls.length,1);
release({ok:true,json:async()=>({ok:true})}); await first;
const expired=page(); expired.init(); expired.token('old'); expired.expire(); await expired.send(); assert.equal(expired.calls.length,0);
const blocked=page(); blocked.scripts[0].onerror(); assert.equal(blocked.elements['form-status'].textContent,contactCopy.en.messages.unavailable);
assert.equal(blocked.scripts[0].src,'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=supportTurnstileReady&render=explicit');
const timedOut=page('',options=>new Promise((_resolve,reject)=>options.signal.addEventListener('abort',()=>reject(new Error('aborted')))));
timedOut.init(); timedOut.token('used'); const timedRequest=timedOut.send(); timedOut.timers.get(20000)(); await timedRequest;
assert(timedOut.calls[0].options.signal.aborted); assert.equal(timedOut.inputs.message.value,'Test message');
timedOut.verificationError(); assert(timedOut.elements['form-status'].textContent.includes(contactCopy.en.messages.unavailable));
timedOut.verificationTimeout(); assert(timedOut.elements['form-status'].textContent.includes(contactCopy.en.messages.verify));
assert.equal(timedOut.calls.length,1);
for (const lang of ['en','fr']) {
  const prefix=lang==='fr'?'fr/':'';
  const html=await readFile(new URL(`../${prefix}contact/index.html`,import.meta.url),'utf8');
  assert(html.includes(`<html lang="${lang}">`)); assert(html.includes('name="_gotcha"')); assert(html.includes('maxlength="5000"'));
  assert(html.includes('type="submit" disabled')); assert(html.includes('mailto:petites@bnjdpn.com'));
  assert(html.includes('role="status"')); assert(html.includes(`<link rel="canonical" href="https://bnjdpn.com/${prefix}contact/">`));
}
assert((await readFile(new URL('../.github/workflows/pages.yml',import.meta.url),'utf8')).includes('cp -R contact _site/contact'));
console.log('✓ Contact EN/FR: safe context, fixed destination, token requirement/renewal, duplicate submit, failure recovery, expiry and blocked script; no real requests');
