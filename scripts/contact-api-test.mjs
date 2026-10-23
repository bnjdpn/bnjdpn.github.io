// Local request/service/email doubles only. Never contacts Cloudflare or sends mail.
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { onRequestPost } from '../functions/api/contact.js';
import { onRequestGet } from '../functions/api/contact/config.js';

registerHooks({ resolve(specifier, context, next) {
  if (specifier === 'cloudflare:email') return { shortCircuit: true, url: 'data:text/javascript,export class EmailMessage { constructor(from,to,raw) { Object.assign(this,{from,to,raw}); } }' };
  return next(specifier, context);
} });
const { default: emailWorker } = await import('../email-worker/src/index.js');
const originalFetch = globalThis.fetch;
const good = { app: 'Petits Pots', email: 'qa@example.invalid', message: 'Local fixture only', category: 'Bug',
  app_version: '1.0 (5)', os_version: 'Android 16', platform: 'Android', device_model: 'Fixture phone',
  ui_language: 'fr', trainer_model: 'Fixture', 'cf-turnstile-response': 'fixture-token', _gotcha: '' };
let challenge, verificationCalls, deliveries, deliveryStatus, deliveryError;
const env = { TURNSTILE_SECRET_KEY: 'fixture-secret', TURNSTILE_SITE_KEY: 'fixture-public', EMAIL_SERVICE: {
  async fetch(url, init) { deliveries.push({ url, payload: JSON.parse(init.body) });
    if (deliveryError) throw new Error('fixture unavailable');
    return deliveryStatus === 204 ? new Response(null, { status: 204 }) : Response.json({ messageId: 'not-a-valid-ack' }, { status: deliveryStatus }); }
} };
function reset() {
  challenge = { success: true, hostname: 'bnjdpn.com', action: 'contact' };
  verificationCalls = []; deliveries = []; deliveryStatus = 204; deliveryError = false;
}
globalThis.fetch = async (url, init) => {
  assert.equal(url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
  verificationCalls.push(new URLSearchParams(init.body));
  return Response.json(challenge);
};
function request(fields = good, format = 'multipart', headers = {}) {
  let body, type;
  if (format === 'multipart') { body = new FormData(); for (const [k, v] of Object.entries(fields)) body.append(k, v); }
  else if (format === 'json') { body = JSON.stringify(fields); type = 'application/json'; }
  else { body = new URLSearchParams(fields); type = 'application/x-www-form-urlencoded'; }
  return new Request('https://bnjdpn.com/api/contact', { method: 'POST', body,
    headers: { Origin: 'https://bnjdpn.com', Accept: 'application/json', ...(type ? { 'Content-Type': type } : {}), ...headers } });
}
async function post(req, bindings = env) { return onRequestPost({ request: req, env: bindings }); }
async function refused(req, status, bindings = env) {
  const response = await post(req, bindings); assert.equal(response.status, status);
  assert.equal((await response.json()).ok, false); assert.equal(deliveries.length, 0);
}

try {
  for (const format of ['multipart', 'urlencoded', 'json']) {
    reset();
    const response = await post(request(good, format));
    assert.equal(response.status, 200); assert.deepEqual(await response.json(), { ok: true });
    assert.equal(response.headers.get('location'), null);
    assert.equal(deliveries.length, 1); assert.equal(deliveries[0].payload.app, 'petits-pots');
    for (const key of ['category', 'app_version', 'os_version', 'platform', 'device_model', 'ui_language', 'trainer_model']) assert.equal(deliveries[0].payload[key], good[key]);
    assert.equal(verificationCalls[0].get('response'), good['cf-turnstile-response']);
    assert.equal(verificationCalls[0].get('secret'), env.TURNSTILE_SECRET_KEY);
    assert(!JSON.stringify(await onRequestGet({ env }).then(r => r.json())).includes('fixture-secret'));
  }
  for (const [alias, canonical] of [['NoBuy Cart', 'nobuycart'], ['Pas du Jour', 'pasdujour'], ['Échappée', 'echappee'], ['PRVault', 'prvault'], ['NovaStationPinball', 'novastationpinball']]) {
    reset(); assert.equal((await post(request({ ...good, app: alias }))).status, 200);
    assert.equal(deliveries[0].payload.app, canonical);
  }
  reset();
  const contextRequest = request({ ...good, country: 'spoofed', source_page: 'spoofed' }, 'json', { Referer: 'https://bnjdpn.com/fr/contact/?email=private#draft' });
  Object.defineProperty(contextRequest, 'cf', { value: { country: 'FR' } });
  assert.equal((await post(contextRequest)).status, 200);
  assert.equal(deliveries[0].payload.country, 'FR');
  assert.equal(deliveries[0].payload.source_page, 'https://bnjdpn.com/fr/contact/');
  assert(!JSON.stringify(deliveries[0]).includes('private'));
  reset(); await refused(request(good, 'json', { Origin: 'https://evil.invalid' }), 403);
  reset(); await refused(request({ ...good, app: 'not-a-studio-app' }), 400);
  reset(); await refused(request({ ...good, app: '__proto__' }), 400);
  reset(); await refused(request({ ...good, email: 'qa@example.invalid\r\nBcc: other@example.invalid' }), 400);
  reset(); await refused(request({ ...good, message: 'x' }), 400);
  reset(); await refused(request({ ...good, message: 'x'.repeat(5001) }), 400);
  reset(); await refused(request({ ...good, 'cf-turnstile-response': '' }), 403);
  reset(); await refused(request(good), 503, { ...env, EMAIL_SERVICE: undefined });
  reset(); await refused(request(good), 503, { ...env, TURNSTILE_SECRET_KEY: undefined });
  for (const invalid of [{ success: false }, { success: 'true' }, { hostname: 'evil.invalid' }, { action: 'another-form' }]) {
    reset(); Object.assign(challenge, invalid); await refused(request(good), 403);
  }
  reset(); const trap = await post(request({ ...good, _gotcha: 'bot', 'cf-turnstile-response': '' }));
  assert.deepEqual(await trap.json(), { ok: true }); assert.equal(verificationCalls.length, 0); assert.equal(deliveries.length, 0);
  reset(); await refused(request([], 'json'), 400);
  reset(); const duplicate = new URLSearchParams(good); duplicate.append('app', 'prvault');
  await refused(new Request('https://bnjdpn.com/api/contact', { method: 'POST', headers: { Origin: 'https://bnjdpn.com', Accept: 'application/json' }, body: duplicate }), 400);
  reset(); await refused(new Request('https://bnjdpn.com/api/contact', { method: 'POST', body: 'plain', headers: { Origin: 'https://bnjdpn.com', Accept: 'application/json', 'Content-Type': 'text/plain' } }), 415);
  reset(); let cancelled = false;
  const stream = new ReadableStream({ start(c) { c.enqueue(new Uint8Array(32769)); }, cancel() { cancelled = true; } });
  await refused(new Request('https://bnjdpn.com/api/contact', { method: 'POST', duplex: 'half', body: stream,
    headers: { Origin: 'https://bnjdpn.com', Accept: 'application/json', 'Content-Type': 'application/json', 'Content-Length': '1' } }), 413);
  assert(cancelled); assert.equal(verificationCalls.length, 0);
  reset(); deliveryStatus = 200;
  const wrongAck = await post(request()); assert.equal(wrongAck.status, 502); assert.equal((await wrongAck.json()).ok, false);
  reset(); deliveryError = true;
  const unavailable = await post(request()); assert.equal(unavailable.status, 502); assert.equal((await unavailable.json()).ok, false);
  reset(); const fr = await post(request({ ...good, locale: 'fr', _next: 'https://evil.invalid' }, 'urlencoded', { Accept: 'text/html' }));
  assert.equal(fr.status, 303); assert.equal(new URL(fr.headers.get('location')).pathname, '/fr/contact/');
  assert.equal(new URL(fr.headers.get('location')).origin, 'https://bnjdpn.com');
  assert(!JSON.stringify(deliveries[0]).includes('_next'));
  const config = await onRequestGet({ env }); assert.equal(config.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await config.json(), { sitekey: 'fixture-public' });
  assert.equal((await onRequestGet({ env: {} })).status, 503);

  // Exercise the actual Worker module with a local Cloudflare EmailMessage stand-in.
  const sent = []; const mailEnv = { CONTACT_FROM: 'contact@example.invalid', CONTACT_DESTINATION_ADDRESS: 'verified@example.invalid', CONTACT_EMAIL: { send: async message => sent.push(message) } };
  const payload = { ...good, app: 'echappee', category: 'Bug\r\nBcc: attacker@example.invalid', _subject: 'Injected', to: 'attacker@example.invalid' };
  const mail = value => new Request('https://email-service/contact', { method: 'POST', body: JSON.stringify(value) });
  const accepted = await emailWorker.fetch(mail(payload), mailEnv);
  assert.equal(accepted.status, 204); assert.equal(await accepted.text(), ''); assert.equal(sent.length, 1);
  assert.equal(sent[0].to, mailEnv.CONTACT_DESTINATION_ADDRESS);
  const [headers, body] = sent[0].raw.split('\r\n\r\n');
  assert(headers.includes('To: contact@bnjdpn.com')); assert(headers.includes('Reply-To: qa@example.invalid'));
  assert(!headers.includes('attacker') && !headers.includes('Injected') && !headers.includes('Bcc:'));
  for (const key of ['category', 'app_version', 'os_version', 'platform', 'device_model', 'ui_language', 'trainer_model']) assert(body.includes(key + ': '));
  assert(body.includes('category: Bug  Bcc: attacker@example.invalid'));
  assert.equal((await emailWorker.fetch(mail({ ...payload, email: 'qa@example.invalid\r\nBcc: evil' }), mailEnv)).status, 400);
  assert.equal((await emailWorker.fetch(mail({ ...payload, app: '__proto__' }), mailEnv)).status, 400);
  assert.equal((await emailWorker.fetch(mail(payload), { ...mailEnv, CONTACT_DESTINATION_ADDRESS: undefined })).status, 503);
  assert.equal(sent.length, 1);
  assert.equal((await emailWorker.fetch(mail(payload), { ...mailEnv, CONTACT_EMAIL: { send: async () => { throw new Error('offline'); } } })).status, 502);
  reset();
  const integrated = await post(request({ ...good, app: 'PRVault' }), { ...env, EMAIL_SERVICE: {
    fetch: (url, options) => emailWorker.fetch(new Request(url, options), mailEnv)
  } });
  assert.equal(integrated.status, 200); assert.deepEqual(await integrated.json(), { ok: true });
  assert.equal(sent.length, 2); assert(sent[1].raw.includes('App: PRVault'));
  reset();
  const legacy = await post(request({ ...good, app: 'Nova Station Pinball' }), { ...env, EMAIL_SERVICE: {
    fetch: (url, options) => emailWorker.fetch(new Request(url, options), mailEnv)
  } });
  assert.deepEqual(await legacy.json(), { ok: true }); assert.equal(sent.length, 3);
  assert(sent[2].raw.includes('App: Nova Station Pinball'));
  console.log('✓ Contact API/Worker: 3 form encodings, aliases, real streaming cap, origin/Turnstile/refusals, 204 acceptance, safe context/envelope and honest failures; local doubles only');
} finally { globalThis.fetch = originalFetch; }
