import catalog from '../../content/catalog.json' with { type: 'json' };
import { appDocuments } from '../../content/app-documents.mjs';

const allowedApps = new Set([...catalog, ...appDocuments].map(app => app.path.toLowerCase()));
const validEmail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

function redirect(request, locale, app, result) {
  const base = locale === 'fr' ? '/fr/contact/' : '/contact/';
  const target = new URL(base, request.url);
  target.searchParams.set('app', app);
  target.searchParams.set(result, '1');
  return Response.redirect(target, 303);
}

export async function onRequestPost({ request, env }) {
  const locale = new URL(request.url).pathname.startsWith('/fr/') ? 'fr' : 'en';
  const origin = request.headers.get('Origin');
  const pageUrl = new URL(request.url);
  if (origin !== pageUrl.origin || !request.headers.get('content-type')?.includes('application/x-www-form-urlencoded')) {
    return new Response('Invalid request', { status: 400 });
  }

  let form;
  try {
    if (Number(request.headers.get('content-length') || 0) > 8192) throw new Error('Too large');
    form = await request.formData();
  } catch {
    return new Response('Invalid form', { status: 400 });
  }

  const app = String(form.get('app') || '').toLowerCase();
  const email = String(form.get('email') || '').trim();
  const message = String(form.get('message') || '').trim();
  const token = String(form.get('cf-turnstile-response') || '');
  if (!allowedApps.has(app) || !validEmail.test(email) || email.length > 254 || message.length < 10 || message.length > 4000 || !token || !env.TURNSTILE_SECRET_KEY || !env.TURNSTILE_SITE_KEY) {
    return redirect(request, locale, app, 'error');
  }

  const verification = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
  const remoteIp = request.headers.get('CF-Connecting-IP');
  if (remoteIp) verification.set('remoteip', remoteIp);
  let challenge;
  try {
    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: verification
    });
    challenge = await result.json();
  } catch {
    return redirect(request, locale, app, 'error');
  }
  if (!challenge.success || challenge.hostname !== pageUrl.hostname || challenge.action !== 'contact') {
    return redirect(request, locale, app, 'error');
  }

  if (!env.EMAIL_SERVICE) return new Response('Contact delivery is not configured', { status: 503 });
  const delivery = await env.EMAIL_SERVICE.fetch('https://email-service/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ app, email, message })
  });
  if (!delivery.ok) return redirect(request, locale, app, 'error');
  const { messageId } = await delivery.json();
  if (typeof messageId !== 'string' || !messageId) return redirect(request, locale, app, 'error');
  console.info('contact_email_accepted', { app, status: delivery.status, messageId });
  return redirect(request, locale, app, 'sent');
}
