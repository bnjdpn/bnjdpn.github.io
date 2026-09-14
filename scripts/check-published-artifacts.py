#!/usr/bin/env python3
"""Compare a local Pages artifact with served bytes. Read-only, explicit sites."""
import argparse
import hashlib
import json
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import quote, urlsplit
from urllib.request import Request, urlopen

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--spec', type=Path, required=True, help='JSON list: site, stage, base_url, sha')
parser.add_argument('--out', type=Path, required=True)
args = parser.parse_args()
spec = json.loads(args.spec.read_text())
tasks = []
for site in spec:
    base = site['base_url']
    if urlsplit(base).scheme != 'https' or not base.endswith('/'):
        parser.error('Each explicit base_url must be HTTPS and end with /')
    stage = Path(site['stage'])
    if not (stage / 'index.html').is_file(): parser.error(f'Missing stage: {stage}')
    # All documents, styles, scripts, sitemaps and manifests; shared previews,
    # icons and one real image per screenshot locale are checked as well.
    selected = {p for p in stage.rglob('*') if p.is_file() and p.suffix in {'.html', '.css', '.js', '.xml', '.webmanifest'}}
    for pattern in ['**/social*.jpg', '**/og*.jpg', '**/app-icon.png', '**/01-*.webp']:
        selected.update(stage.glob(pattern))
    for relative in site.get('extra_paths', []): selected.add(stage / relative)
    for path in sorted(selected):
        tasks.append((site, path, path.relative_to(stage).as_posix()))

def check(task):
    site, path, relative = task
    expected = hashlib.sha256(path.read_bytes()).hexdigest()
    url = site['base_url'] + quote(relative, safe='/') + '?site_readback=' + site['sha'][:12]
    row = {'site': site['site'], 'path': relative, 'url': url, 'expected_sha256': expected}
    try:
        with urlopen(Request(url, headers={'User-Agent': 'Site-release-readback/1.0', 'Cache-Control': 'no-cache'}), timeout=30) as response:
            actual = hashlib.sha256(response.read()).hexdigest()
            row.update(status=response.status, final_url=response.url, served_sha256=actual, match=actual == expected)
    except Exception as error:
        row.update(match=False, error=str(error))
    return row

with ThreadPoolExecutor(max_workers=8) as pool: results = list(pool.map(check, tasks))
report = {'scope': 'Served-byte comparison for explicit prepared artifacts; not a browser or store validation.',
          'sites': spec, 'checked': len(results), 'failures': [r for r in results if not r['match']], 'results': results}
args.out.parent.mkdir(parents=True, exist_ok=True)
args.out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'checked': len(results), 'failures': report['failures']}, ensure_ascii=False, indent=2))
if report['failures']: raise SystemExit(1)
