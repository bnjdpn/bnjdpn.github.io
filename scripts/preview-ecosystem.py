#!/usr/bin/env python3
"""Local preview and read-only cross-site reference checks for the explicit catalogue."""
import argparse
import http.server
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

ORIGIN = 'https://bnjdpn.github.io'
PUBLIC = ['404.html', 'index.html', 'robots.txt', 'sitemap.xml', 'sitemap-pages.xml',
          'site.webmanifest', 'styles.css', 'assets', 'fr']

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
        if a.get('srcset'):
            self.refs.extend(x.strip().split()[0] for x in a['srcset'].split(',') if x.strip())
        if tag == 'meta' and a.get('property', a.get('name')) in ['og:image', 'twitter:image']:
            self.refs.append(a.get('content', ''))

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=['check', 'serve'])
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
    if args.staged: portfolio = portfolio / '_site'
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
        return p / 'index.html' if p.is_dir() else p

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

    errors, checked, counts, pages = [], 0, {}, {}
    files = [(portfolio / f, '/' + f) for f in PUBLIC if (portfolio / f).is_file()]
    for folder in ['assets', 'fr']:
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
            if canonical and any(not x.startswith(ORIGIN + '/') for x in canonical):
                errors.append({'from': route, 'error': 'Unexpected canonical', 'value': canonical})
        elif path.suffix == '.css':
            refs = re.findall(r'url\([\s\"\']*([^\)\"\']+)', path.read_text())
        elif path.suffix == '.xml':
            refs = re.findall(r'<loc>([^<]+)</loc>|href="([^"]+)"', path.read_text())
            refs = [a or b for a, b in refs]
        elif path.suffix == '.webmanifest':
            m = json.loads(path.read_text()); refs = [x['src'] for x in m.get('icons', [])] + [m.get('start_url', './')]
        for ref in refs:
            if not ref or ref.startswith(('data:', 'mailto:', 'tel:', 'javascript:')): continue
            url = urljoin(ORIGIN + route, ref); parsed = urlsplit(url)
            if parsed.netloc != 'bnjdpn.github.io': continue
            target = local(url); checked += 1
            if target is None or not target.is_file():
                errors.append({'from': route, 'ref': ref, 'error': 'Missing local target'}); continue
            if parsed.fragment and target.suffix == '.html':
                target_page = pages.get(target) or Page(target.read_text())
                if unquote(parsed.fragment) not in target_page.ids:
                    errors.append({'from': route, 'ref': ref, 'error': 'Missing anchor'})
    report = {'scope': 'Local generated HTML, CSS URLs, sitemap links, manifest assets, metadata targets and cross-site anchors. External services are excluded.',
              'htmlRoutes': counts, 'references': checked, 'errors': errors}
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    if errors: sys.exit(1)

if __name__ == '__main__': main()
