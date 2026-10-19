export async function onRequestGet({ env }) {
  if (!env.TURNSTILE_SITE_KEY) {
    return Response.json({ error: 'contact_unavailable' }, { status: 503 });
  }
  return Response.json({ sitekey: env.TURNSTILE_SITE_KEY }, {
    headers: { 'Cache-Control': 'no-store' }
  });
}
