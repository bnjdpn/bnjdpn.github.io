// Transformations shared by every product site.
// Ported from the Ruby generator copied in each app repository
// (marketing_seo.rb and marketing_clean_urls.rb), so legal pages and
// guides keep the exact bytes they had before the migration.

export const TEXT_EXTENSIONS = new Set(['.html', '.xml', '.txt', '.webmanifest']);

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function escapeXml(value) {
  return escapeHtml(value).replaceAll("'", '&apos;');
}

// Cloudflare Pages serves x.html at x and answers x.html with a 308.
// Every URL a crawler reads must be the final one.
function cleanPath(path, relative = false) {
  if (path === 'index' || path.endsWith('/index')) {
    const trimmed = path.slice(0, -'index'.length);
    return relative && trimmed === '' ? './' : trimmed;
  }
  return path;
}

const ABSOLUTE = /(["'])(https:\/\/(?:www\.)?bnjdpn\.com\/[^"'\s<>#?]*?)\.html([#?][^"'\s<>]*)?\1/g;
const LOC = /<loc>(https:\/\/(?:www\.)?bnjdpn\.com\/[^<\s#?]*?)\.html<\/loc>/g;
const RELATIVE = /(\b(?:href|action)=)(["'])(?!(?:[a-z][a-z0-9+.-]*:|\/\/|#))([^"'\s<>#?]*?)\.html([#?][^"'\s<>]*)?\2/gi;

export function cleanUrls(text) {
  return text
    .replace(ABSOLUTE, (_, q, url, rest = '') => `${q}${cleanPath(url)}${rest}${q}`)
    .replace(LOC, (_, url) => `<loc>${cleanPath(url)}</loc>`)
    .replace(RELATIVE, (_, attr, q, path, rest = '') => `${attr}${q}${cleanPath(path, true)}${rest}${q}`);
}

export function isLegalPath(relative) {
  return /^(?:privacy|terms)\.html$/.test(relative)
    || /^[^/]+\/(?:privacy|terms)\.html$/.test(relative)
    || /^(?:privacy|terms)\/index\.html$/.test(relative);
}

// Legal pages stay reachable but out of the index, without marketing metadata.
export function noindexLegal(html) {
  const tag = '<meta name="robots" content="noindex,follow">';
  let out = html
    .replace(/<link\b[^>]*rel=["'](?:canonical|alternate)["'][^>]*>\s*/gi, '')
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi, '');
  if (/<meta\b[^>]*name=["']robots["'][^>]*>/i.test(out)) {
    return out.replace(/<meta\b[^>]*name=["']robots["'][^>]*>/i, tag);
  }
  if (!/<head(?:\s[^>]*)?>/i.test(out)) throw new Error('Legal page has no head element');
  return out.replace(/<head(?:\s[^>]*)?>/i, (head) => `${head}\n  ${tag}`);
}

export function localeUrl(cfg, locale) {
  return locale === cfg.primary_locale ? cfg.base_url : `${cfg.base_url}${locale}/`;
}

export function hreflangLinks(cfg) {
  const links = cfg.locales.map(({ code }) => ({ locale: code, url: localeUrl(cfg, code) }));
  for (const [language, target] of Object.entries(cfg.hreflang_defaults ?? {})) {
    if (!links.some((link) => link.locale === language)) links.push({ locale: language, url: localeUrl(cfg, target) });
  }
  return links;
}

// The primary locale also lives at the site root; its own folder redirects there.
export function primaryRedirect(cfg, locale) {
  const base = escapeHtml(cfg.base_url);
  const name = escapeHtml(cfg.app_name);
  return `<!doctype html>\n<html lang="${escapeHtml(locale)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0; url=${base}"><link rel="canonical" href="${base}"><title>${name}</title></head><body><p><a href="${base}">Continue to ${name}</a></p></body></html>\n`;
}

export function sitemapXml(cfg, lastmod) {
  const links = hreflangLinks(cfg);
  const alternates = [
    ...links.map(({ locale, url }) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(locale)}" href="${escapeXml(url)}" />`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(cfg.base_url)}" />`,
  ];
  const urls = cfg.locales.map(({ code }) => localeUrl(cfg, code));
  const ordered = [cfg.base_url, ...urls.filter((url) => url !== cfg.base_url)];
  let body = ordered
    .map((url) => ['  <url>', `    <loc>${escapeXml(url)}</loc>`, `    <lastmod>${escapeXml(lastmod)}</lastmod>`, ...alternates, '  </url>'].join('\n'))
    .join('\n');
  const guides = (cfg.extra_sitemap_paths ?? []).map((path) => `${cfg.base_url}${path}`);
  if (guides.length) {
    const guideLinks = [
      `    <xhtml:link rel="alternate" hreflang="en-US" href="${escapeXml(guides[0])}" />`,
      `    <xhtml:link rel="alternate" hreflang="fr-FR" href="${escapeXml(guides[1])}" />`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(guides[0])}" />`,
    ];
    body += '\n' + guides
      .map((url) => ['  <url>', `    <loc>${escapeXml(url)}</loc>`, `    <lastmod>${escapeXml(lastmod)}</lastmod>`, ...guideLinks, '  </url>'].join('\n'))
      .join('\n');
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`;
}

export function webManifest(cfg) {
  return JSON.stringify({
    name: cfg.app_name,
    short_name: cfg.app_name,
    start_url: './',
    display: 'standalone',
    background_color: cfg.background_color,
    theme_color: cfg.theme_color,
    icons: [
      { src: 'assets/app-icon.png', sizes: '192x192', type: 'image/png' },
      { src: 'assets/app-icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }, null, 2) + '\n';
}

export function robotsTxt(cfg) {
  return `User-agent: *\nAllow: /\nSitemap: ${cfg.base_url}sitemap.xml\n`;
}
