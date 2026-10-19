import { EmailMessage } from 'cloudflare:email';

const appNames = {
  'loadsense': 'LoadSense', 'temporeps': 'TempoReps', 'prvault': 'PRVault', 'groovelog': 'GrooveLog',
  'fastzen': 'FastZen', 'coldload': 'ColdLoad', 'moveatlas': 'MoveAtlas', 'neatshift': 'NeatShift',
  'brewmeter': 'BrewMeter', 'nobuycart': 'NoBuy Cart', 'pasdujour': 'Pas du Jour', 'vesperdrift': 'Vesper Drift',
  'petites-gouttes': 'Petites Gouttes', 'petites-bouchees': 'Petites Bouchées', 'petites-nuits': 'Petites Nuits',
  'petites-dents': 'Petites Dents', 'echappee': 'Échappée', 'petits-besoins': 'Petits Besoins', 'petits-pots': 'Petits Pots'
};

export default {
  async fetch(request, env) {
    if (request.method !== 'POST' || new URL(request.url).pathname !== '/contact') {
      return new Response('Not found', { status: 404 });
    }
    let payload;
    try {
      payload = await request.json();
    } catch {
      return new Response('Invalid payload', { status: 400 });
    }
    const app = String(payload.app || '').toLowerCase();
    const email = String(payload.email || '').trim();
    const message = String(payload.message || '').trim();
    if (!appNames[app] || email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || /[\r\n]/.test(email) || message.length < 10 || message.length > 4000) {
      return new Response('Invalid payload', { status: 400 });
    }

    const safeMessage = message.replace(/\r\n?/g, '\n');
    const subject = `bnjdpn.com contact: ${appNames[app]}`;
    const raw = [
      `From: ${env.CONTACT_FROM}`,
      'To: contact@bnjdpn.com',
      `Reply-To: ${email}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8',
      '',
      `App: ${appNames[app]}`,
      `Reply to: ${email}`,
      '',
      safeMessage
    ].join('\r\n');
    await env.CONTACT_EMAIL.send(new EmailMessage(env.CONTACT_FROM, 'contact@bnjdpn.com', raw));
    console.info('contact_email_accepted', { app });
    return new Response(null, { status: 204 });
  }
};
