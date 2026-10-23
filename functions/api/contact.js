// Adapted from feat/506-cloudflare: keep the existing Pages -> email service chain.
import catalog from '../../content/catalog.json' with { type: 'json' };
import { appDocuments } from '../../content/app-documents.mjs';

const MAX_BODY = 32 * 1024;
const contextLimits = { category: 80, app_version: 64, os_version: 64, platform: 64, device_model: 64, ui_language: 64, trainer_model: 64 };
const appKey = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const apps = new Map([...catalog, ...appDocuments].flatMap(app =>
  [app.path, app.name].map(alias => [appKey(alias), app.path.toLowerCase()])));
// Preserve this historical site's support without restoring it to the commercial catalogue.
apps.set(appKey('NovaStationPinball'), 'novastationpinball');
const oneLine = (value, max) => String(value || '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
const validEmail = /^[^\s@<>()",;:\\[\]]+@[^\s@<>()",;:\\[\]]+\.[^\s@<>()",;:\\[\]]+$/;

async function fields(request) {
  const type = (request.headers.get('content-type') || '').split(';', 1)[0].toLowerCase().trim();
  if (!['application/json', 'application/x-www-form-urlencoded', 'multipart/form-data'].includes(type)) {
    throw Object.assign(new Error('content-type'), { status: 415 });
  }
  if (Number(request.headers.get('content-length')) > MAX_BODY) throw Object.assign(new Error('too-large'), { status: 413 });
  const reader = request.body?.getReader();
  const chunks = []; let length = 0;
  if (reader) for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_BODY) { await reader.cancel().catch(() => {}); throw Object.assign(new Error('too-large'), { status: 413 }); }
    chunks.push(value);
  }
  const body = new Uint8Array(length); let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
  if (type === 'application/json') {
    const value = JSON.parse(new TextDecoder().decode(body));
    if (!value || typeof value !== 'object' || Array.isArray(value) || Object.values(value).some(v => typeof v !== 'string')) throw new Error('payload');
    return value;
  }
  const data = await new Response(body, { headers: { 'content-type': request.headers.get('content-type') } }).formData();
  const value = Object.create(null);
  for (const [key, field] of data) {
    if (typeof field !== 'string' || Object.hasOwn(value, key)) throw new Error('payload');
    value[key] = field;
  }
  return value;
}

export async function onRequestPost({ request, env }) {
  const url = new URL(request.url);
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');
  let form = {};
  const reply = (status, error) => {
    if (wantsJson || !form.app) return Response.json(error ? { ok: false, error } : { ok: true }, { status, headers: { 'Cache-Control': 'no-store' } });
    const target = new URL(form.locale === 'fr' ? '/fr/contact/' : '/contact/', url);
    target.searchParams.set('app', apps.get(appKey(form.app)) || 'unsupported');
    target.searchParams.set(error ? 'error' : 'sent', '1');
    return Response.redirect(target, 303);
  };
  if (request.headers.get('origin') !== url.origin) return reply(403, 'origin');
  try { form = await fields(request); } catch (error) { return reply(error.status || 400, error.status === 413 ? 'too-large' : 'payload'); }
  if (String(form._gotcha || '').trim()) return reply(200);
  const app = apps.get(appKey(form.app));
  const email = String(form.email || '').trim();
  const message = String(form.message || '').replace(/\r\n?/g, '\n').trim();
  const token = String(form['cf-turnstile-response'] || '');
  if (!app || email.length > 254 || !validEmail.test(email) || /[\r\n]/.test(email) || message.length < 2 || message.length > 5000) return reply(400, 'fields');
  if (!token || token.length > 2048) return reply(403, 'turnstile');
  if (!env.TURNSTILE_SECRET_KEY || !env.TURNSTILE_SITE_KEY || !env.EMAIL_SERVICE) return reply(503, 'unavailable');
  const verification = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) verification.set('remoteip', ip);
  let challenge;
  try {
    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: verification });
    if (!result.ok) return reply(502, 'verification');
    challenge = await result.json();
  } catch { return reply(502, 'verification'); }
  if (challenge.success !== true || challenge.hostname !== url.hostname || challenge.action !== 'contact') return reply(403, 'turnstile');
  const context = Object.fromEntries(Object.entries(contextLimits).map(([key, limit]) => [key, oneLine(form[key], limit)]));
  // Preserve the disclosed support context without forwarding query strings or IPs.
  let sourcePage = '';
  try { const referrer = new URL(request.headers.get('referer')); sourcePage = oneLine(referrer.origin + referrer.pathname, 300); } catch {}
  context.source_page = sourcePage;
  context.country = oneLine(request.cf?.country, 16);
  try {
    const delivery = await env.EMAIL_SERVICE.fetch('https://email-service/contact', {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ app, email, message, ...context })
    });
    // The existing deployed Worker acknowledges CONTACT_EMAIL.send with an empty 204.
    // No provider message ID is returned, and acceptance is not inbox delivery proof.
    if (delivery.status !== 204) return reply(502, 'send');
  } catch { return reply(502, 'send'); }
  return reply(200);
}
