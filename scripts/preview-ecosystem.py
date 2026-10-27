#!/usr/bin/env python3
"""Local preview and read-only cross-site reference checks for the explicit catalogue."""
import argparse
import hashlib
import http.server
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

ORIGIN = 'https://bnjdpn.github.io'
PUBLIC = ['404.html', 'index.html', 'robots.txt', 'sitemap.xml', 'sitemap-pages.xml', '_redirects', '_headers', 'petits-pots',
          'site.webmanifest', 'styles.css', 'assets', 'fr', 'apps', 'guides', 'contact']
LEGACY = {'RealmBox'}
GONE = ['NovaStationPinball', 'TaskLane', 'onigiri-exit-calculator', 'poop-price-calculator']
SERVER_INPUTS = {'functions/_middleware.js', 'functions/api/contact.js', 'functions/api/contact/config.js',
                 'content/catalog.json', 'content/app-documents.mjs', 'wrangler.toml'}

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.refs, self.ids, self.meta, self.links = [], set(), {}, []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'): self.ids.add(a['id'])
        if tag == 'a' and a.get('name'): self.ids.add(a['name'])
        if tag == 'meta': self.meta[a.get('name', a.get('property', ''))] = a.get('content', '')
        if tag == 'link': self.links.append(a)
        for key in ['href', 'src', 'poster']:
            if a.get(key): self.refs.append(a[key])
        if tag == 'form' and a.get('action'): self.refs.append(a['action'])
        if a.get('srcset'):
            self.refs.extend(x.strip().split()[0] for x in a['srcset'].split(',') if x.strip())
        if tag == 'meta' and a.get('property', a.get('name')) in ['og:image', 'twitter:image']:
            self.refs.append(a.get('content', ''))

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=['check', 'serve'])
    parser.add_argument('--artifact', type=Path, help='Check/serve one assembled public artifact instead of separate repositories')
    parser.add_argument('--apps', type=Path, default=Path(__file__).resolve().parents[2])
    parser.add_argument('--echappee', type=Path)
    parser.add_argument('--port', type=int, default=4174)
    parser.add_argument('--staged', action='store_true', help='Use local _site artifacts, and _pages for Echappee')
    parser.add_argument('--out', type=Path, default=Path('output/playwright/ecosystem-links.json'))
    args = parser.parse_args()
    portfolio = Path(__file__).resolve().parents[1]
    catalogue = json.loads((portfolio / 'content/catalog.json').read_text())
    roots = {row['path']: (args.echappee or args.apps.parent / 'Echappee') / '_pages'
             if row['path'] == 'Echappee' else args.apps / row['path'] / ('_site' if args.staged else 'docs') for row in catalogue}
    historical, server_routes, setup_errors = [], set(), []
    if args.artifact:
        portfolio = args.artifact.resolve()
        roots = {row['path']: portfolio / row['path'] for row in catalogue}
        manifest_path = portfolio.parent / 'manifest.json'
        if manifest_path.is_file():
            manifest = json.loads(manifest_path.read_text())
            historical = manifest.get('historical_prefixes', [])
            if historical and (set(historical) != LEGACY or len(historical) != len(LEGACY)):
                parser.error('Artifact must declare exactly the historical RealmBox prefix')
            roots.update({name: portfolio / name for name in historical})
            server = manifest.get('server_inputs', {})
            if historical:
                if set(server) != SERVER_INPUTS:
                    setup_errors.append({'error': 'Incomplete Pages server inputs'})
                for name in SERVER_INPUTS:
                    path = portfolio.parent / name
                    if (not path.is_file() or path.is_symlink() or
                        hashlib.sha256(path.read_bytes()).hexdigest() != server.get(name, {}).get('sha256')):
                        setup_errors.append({'error': 'Missing or changed Pages server input', 'path': name})
                routes_file = portfolio / '_routes.json'
                expected = {'version': 1, 'include': ['/api/contact', '/api/contact/config',
                                                      *[r for name in GONE for r in (f'/{name}', f'/{name}/*')]],
                            'exclude': ['/_asc-hooks/*', '/_funnel/*']}
                if (not routes_file.is_file() or json.loads(routes_file.read_text()) != expected or
                    hashlib.sha256(routes_file.read_bytes()).hexdigest() != manifest.get('routing_sha256')):
                    setup_errors.append({'error': 'Pages function routing changed or missing'})
                else: server_routes = {'/api/contact', '/api/contact/config'}
    elif args.staged: portfolio = portfolio / '_site'
    else:
        if all((portfolio / name).is_file() for name in SERVER_INPUTS - {'wrangler.toml'}):
            server_routes = {'/api/contact', '/api/contact/config'}
    if not (portfolio / 'index.html').is_file():
        parser.error(f'Missing portfolio output: {portfolio}')

    def local(url):
        parts = [x for x in unquote(urlsplit(url).path).split('/') if x]
        if any(x in ['.', '..'] for x in parts): return None
        if parts and parts[0] in roots:
            p = roots[parts[0]].joinpath(*parts[1:])
        else:
            if parts and parts[0] not in PUBLIC: return None
            p = portfolio.joinpath(*parts)
        if p.is_dir(): return p / 'index.html'
        # Cloudflare Pages serves x.html at the extensionless URL x.
        if not p.exists() and p.suffix == '' and p.with_name(p.name + '.html').is_file(): return p.with_name(p.name + '.html')
        return p

    if args.command == 'serve':
        class Handler(http.server.SimpleHTTPRequestHandler):
            def translate_path(self, path):
                return str(local(path) or portfolio / '__not_a_public_path__')
            def end_headers(self):
                self.send_header('Cache-Control', 'no-store')
                super().end_headers()
        server = http.server.ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
        print(f'Preview: http://127.0.0.1:{args.port} (public outputs only)', flush=True)
        try: server.serve_forever()
        except KeyboardInterrupt: pass
        finally: server.server_close()
        return

    errors, checked, counts, pages = setup_errors, 0, {}, {}
    files = [(portfolio / f, '/' + f) for f in PUBLIC if (portfolio / f).is_file()]
    for folder in [name for name in PUBLIC if (portfolio / name).is_dir()]:
        files += [(p, '/' + p.relative_to(portfolio).as_posix()) for p in (portfolio / folder).rglob('*') if p.is_file()]
    for slug, root in roots.items():
        if not root.is_dir(): errors.append({'site': slug, 'error': 'Missing generated root', 'path': str(root)}); continue
        files += [(p, '/' + slug + '/' + p.relative_to(root).as_posix()) for p in root.rglob('*') if p.is_file()]
    for path, route in files:
        if path.suffix == '.html': pages[path] = Page(path.read_text())
    for path, route in files:
        refs = []
        if path.suffix == '.html':
            page = pages[path]; refs = page.refs
            slug = route.split('/')[1] if route.split('/')[1] in roots else 'Portfolio'
            counts[slug] = counts.get(slug, 0) + 1
            if path.name == '404.html' and 'noindex' not in page.meta.get('robots', ''):
                errors.append({'from': route, 'error': '404 missing noindex'})
            canonical = [x.get('href', '') for x in page.links if x.get('rel') == 'canonical']
            if canonical and any(not x.startswith((ORIGIN + '/', 'https://bnjdpn.com/')) for x in canonical):
                errors.append({'from': route, 'error': 'Unexpected canonical', 'value': canonical})
        elif path.suffix == '.css':
            refs = re.findall(r'url\([\s\"\']*([^\)\"\']+)', path.read_text())
        elif path.suffix == '.xml':
            refs = re.findall(r'<loc>([^<]+)</loc>|href="([^"]+)"', path.read_text())
            refs = [a or b for a, b in refs]
        elif path.name == '_redirects':
            # Every 301 target must exist (anchors included) in the assembled artifact.
            refs = [line.split()[1] for line in path.read_text().splitlines() if line.strip() and not line.startswith('#')]
        elif path.suffix == '.webmanifest':
            m = json.loads(path.read_text()); refs = [x['src'] for x in m.get('icons', [])] + [m.get('start_url', './')]
        for ref in refs:
            if not ref or ref.startswith(('data:', 'mailto:', 'tel:', 'javascript:')): continue
            url = urljoin(ORIGIN + route, ref); parsed = urlsplit(url)
            if parsed.netloc not in ['bnjdpn.github.io', 'bnjdpn.com', 'www.bnjdpn.com']: continue
            if parsed.path in server_routes:
                checked += 1
                continue
            target = local(url); checked += 1
            if target is None or not target.is_file():
                errors.append({'from': route, 'ref': ref, 'error': 'Missing local target'}); continue
            if parsed.fragment and target.suffix == '.html':
                target_page = pages.get(target) or Page(target.read_text())
                if unquote(parsed.fragment) not in target_page.ids:
                    errors.append({'from': route, 'ref': ref, 'error': 'Missing anchor'})
    report = {'scope': 'Local generated HTML, CSS URLs, sitemap links, manifest assets, metadata targets and cross-site anchors. External services are excluded.',
              'htmlRoutes': counts, 'historicalPrefixes': historical,
              'serverRoutes': sorted(server_routes), 'references': checked, 'errors': errors}
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    if errors: sys.exit(1)

if __name__ == '__main__': main()
