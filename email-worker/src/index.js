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
    const destination = env.CONTACT_DESTINATION_ADDRESS;
    if (!destination) return new Response('Contact delivery is not configured', { status: 503 });
    if (!appNames[app] || email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || /[\r\n]/.test(email) || message.length < 10 || message.length > 4000) {
      return new Response('Invalid payload', { status: 400 });
    }

    const result = await env.CONTACT_EMAIL.send({
      from: env.CONTACT_FROM,
      to: destination,
      replyTo: email,
      subject: `bnjdpn.com contact: ${appNames[app]}`,
      text: `App: ${appNames[app]}\nReply to: ${email}\n\n${message.replace(/\r\n?/g, '\n')}`
    });
    console.info('contact_email_accepted', { app, messageId: result.messageId });
    return Response.json({ messageId: result.messageId });
  }
};
