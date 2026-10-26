// Retired historical prefixes answer 410 Gone. _routes.json only sends these
// prefixes and the contact API here; every other path stays a static asset.
const GONE = ['/NovaStationPinball', '/TaskLane', '/onigiri-exit-calculator', '/poop-price-calculator'];

const PAGE = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gone · Benjamin Dupin</title></head>
<body><h1>This page has been removed</h1>
<p><a href="https://bnjdpn.com/">Apps by Benjamin Dupin</a></p></body></html>
`;

export const isGone = (pathname) =>
  GONE.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

export async function onRequest({ request, next }) {
  if (!isGone(new URL(request.url).pathname)) return next();
  return new Response(request.method === 'HEAD' ? null : PAGE, {
    status: 410,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
