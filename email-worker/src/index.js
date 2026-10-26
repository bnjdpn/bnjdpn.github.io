// Existing bnjdpn-contact-email service, retained with its deployed 204 acknowledgment.
import { EmailMessage } from 'cloudflare:email';

const appNames = {
  loadsense: 'LoadSense', temporeps: 'TempoReps', prvault: 'PRVault', groovelog: 'GrooveLog', fastzen: 'FastZen',
  coldload: 'ColdLoad', moveatlas: 'MoveAtlas', neatshift: 'NeatShift', brewmeter: 'BrewMeter', nobuycart: 'NoBuy Cart',
  pasdujour: 'Pas du Jour', vesperdrift: 'Vesper Drift', 'petites-gouttes': 'Petites Gouttes',
  'petites-bouchees': 'Petites Bouchées', 'petites-nuits': 'Petites Nuits', 'petites-dents': 'Petites Dents',
  echappee: 'Échappée', 'petits-besoins': 'Petits Besoins', 'petits-pots': 'Petits Pots',
  catminers: 'Catminers', novastationpinball: 'Nova Station Pinball'
};
const limits = { category: 80, app_version: 64, os_version: 64, platform: 64, device_model: 64, ui_language: 64, trainer_model: 64, source_page: 300, country: 16 };
const oneLine = (value, max) => String(value || '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

export default {
  async fetch(request, env) {
    if (request.method !== 'POST' || new URL(request.url).pathname !== '/contact') return new Response('Not found', { status: 404 });
    let payload;
    try {
      const reader = request.body?.getReader(); const chunks = []; let length = 0;
      if (reader) for (;;) {
        const { done, value } = await reader.read(); if (done) break;
        length += value.byteLength;
        if (length > 32768) { await reader.cancel().catch(() => {}); return new Response('Too large', { status: 413 }); }
        chunks.push(value);
      }
      const bytes = new Uint8Array(length); let offset = 0;
      for (const part of chunks) { bytes.set(part, offset); offset += part.byteLength; }
      payload = JSON.parse(new TextDecoder().decode(bytes));
      if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('payload');
    } catch { return new Response('Invalid payload', { status: 400 }); }
    const app = String(payload.app || '').toLowerCase();
    const email = String(payload.email || '').trim();
    const message = String(payload.message || '').trim();
    if (!Object.hasOwn(appNames, app) || email.length > 254 || !/^[^\s@<>()",;:\\[\]]+@[^\s@<>()",;:\\[\]]+\.[^\s@<>()",;:\\[\]]+$/.test(email) || /[\r\n]/.test(email) || message.length < 2 || message.length > 5000) return new Response('Invalid payload', { status: 400 });
    const destination = env.CONTACT_DESTINATION_ADDRESS;
    if (!env.CONTACT_EMAIL || !env.CONTACT_FROM || /[\r\n]/.test(env.CONTACT_FROM) || !destination || /[\r\n]/.test(destination)) return new Response('Unavailable', { status: 503 });
    const context = Object.entries(limits).map(([key, max]) => `${key}: ${oneLine(payload[key], max) || '—'}`);
    // The private envelope follows the configured verified mailbox; never a form field.
    // The public To address remains the support identity.
    const subject = `bnjdpn.com contact: ${appNames[app]}`;
    const raw = [`From: ${env.CONTACT_FROM}`, 'To: contact@bnjdpn.com', `Reply-To: ${email}`, `Subject: ${subject}`,
      'MIME-Version: 1.0', 'Content-Type: text/plain; charset=UTF-8', '', `App: ${appNames[app]}`,
      `Reply to: ${email}`, ...context, '', message.replace(/\r\n?/g, '\n')].join('\r\n');
    try { await env.CONTACT_EMAIL.send(new EmailMessage(env.CONTACT_FROM, destination, raw)); }
    catch { return new Response('Delivery unconfirmed', { status: 502 }); }
    return new Response(null, { status: 204 });
  }
};
