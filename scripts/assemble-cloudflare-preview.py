#!/usr/bin/env python3
"""Assemble explicit local public outputs; never build, fetch, or deploy."""
import argparse
import hashlib
import importlib.util
import json
import re
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
module = importlib.util.spec_from_file_location('ecosystem', ROOT / 'scripts/preview-ecosystem.py')
ecosystem = importlib.util.module_from_spec(module)
module.loader.exec_module(ecosystem)
# Same public types as marketing_seo.rb SAFE_STAGE_EXTENSIONS; no source/config types.
EXTENSIONS = set('.avif .css .html .ico .jpeg .jpg .js .png .svg .txt .webmanifest .webp .woff2 .xml'.split())
LEGACY = {'RealmBox'}
# Retired prefixes: no public file, functions/_middleware.js answers 410 Gone.
GONE = ['NovaStationPinball', 'TaskLane', 'onigiri-exit-calculator', 'poop-price-calculator']
PUBLIC_JSON = {'VesperDrift': {'press/media/manifest.json'}, 'RealmBox': {'release-manifest.json'}}
SERVER_INPUTS = {'functions/_middleware.js': 'functions/_middleware.js',
                 'functions/api/contact.js': 'functions/api/contact.js',
                 'functions/api/contact/config.js': 'functions/api/contact/config.js',
                 'content/catalog.json': 'content/catalog.json',
                 'content/app-documents.mjs': 'content/app-documents.mjs',
                 'cloudflare/pages-upload.toml': 'wrangler.toml'}
FUNCTION_ROUTES = {'version': 1, 'include': ['/api/contact', '/api/contact/config',
                                             *[route for name in GONE for route in (f'/{name}', f'/{name}/*')]],
                   'exclude': ['/_asc-hooks/*', '/_funnel/*']}

def git(repo, *args):
    return subprocess.check_output(['git', '-C', str(repo), *args], text=True).strip()

def assemble(spec, output):
    catalogue = json.loads((ROOT / 'content/catalog.json').read_text())
    expected = {x['path'] for x in catalogue} | LEGACY
    if len(spec) != len(expected) or {x['site'] for x in spec} != expected:
        raise ValueError('Spec must contain exactly one explicit output for every catalogue site and the historical RealmBox prefix')
    if output.exists():
        raise ValueError('Refusing to replace an existing output; choose a fresh candidate directory')
    sources = [{'site': 'Portfolio', 'repo': str(ROOT), 'stage': str(ROOT),
                'sha': git(ROOT, 'rev-parse', 'HEAD'), 'kind': 'local-generated-root'}, *spec]
    plan, provenance = [], []
    for source in sources:
        if not re.fullmatch('[0-9a-f]{40}', source['sha']):
            raise ValueError('Every source SHA must be a full lowercase Git commit SHA')
        repo, stage = Path(source['repo']).resolve(), Path(source['stage']).resolve()
        if git(repo, 'rev-parse', 'HEAD') != source['sha']:
            raise ValueError(f"Source HEAD changed: {source['site']}")
        generated = source['kind'] == 'local-generator-stage'
        if source['site'] in GONE:
            raise ValueError(f"Retired prefix answers 410 and takes no public output: {source['site']}")
        if source['site'] in LEGACY and not generated:
            raise ValueError('Historical sites require an explicit verified public stage under central .local/')
        if not (stage.is_relative_to(ROOT / '.local') if generated else stage.is_relative_to(repo)) or not (stage / 'index.html').is_file():
            raise ValueError(f"Invalid public output: {source['site']}")
        if source['site'] != 'Portfolio' and source['kind'] not in ['local-generated-docs-not-staged', 'existing-staged-output', 'local-generator-stage']:
            raise ValueError('Unknown source kind')
        if source['site'] != 'Portfolio' and ((stage.name == 'docs') != (source['kind'] == 'local-generated-docs-not-staged')):
            raise ValueError('docs are candidate sources and require a generator-derived allowlist')
        if source['site'] != 'Portfolio' and not generated and stage.relative_to(repo).as_posix() not in ['docs', '_site', '_pages']:
            raise ValueError('Only existing docs/_site/_pages outputs may be assembled')
        candidates = []
        if source['site'] == 'Portfolio':
            for name in ecosystem.PUBLIC:
                entry = stage / name
                if not entry.exists():
                    raise ValueError(f'Missing root public output: {name}')
                candidates.extend(entry.rglob('*') if entry.is_dir() else [entry])
        elif source['kind'] == 'local-generated-docs-not-staged':
            if not source.get('files'):
                raise ValueError('docs require an explicit generator-derived file allowlist')
            for name in source['files']:
                relative = Path(name)
                if relative.is_absolute() or '..' in relative.parts:
                    raise ValueError(f'Generator output must be relative without parent segments: {name}')
                path = stage / relative
                if not path.is_file() or not path.resolve().is_relative_to(stage):
                    raise ValueError(f"Missing/unsafe generator output: {source['site']}")
                # Canonical relative paths enter the copy plan; input spelling never does.
                canonical = path.resolve().relative_to(stage)
                if canonical != relative:
                    raise ValueError(f'Noncanonical generator output: {name}')
                candidates.append(stage / canonical)
        else:
            candidates = stage.rglob('*')
        files, languages = {}, set()
        for path in sorted(candidates):
            if path.is_symlink():
                raise ValueError(f'Symlink in public output: {path}')
            if not path.is_file():
                continue
            relative = path.resolve().relative_to(stage)
            if any(p.startswith('.') for p in relative.parts) and relative.as_posix() != '.nojekyll':
                raise ValueError(f'Hidden public path: {path}')
            special = (relative.as_posix() in PUBLIC_JSON.get(source['site'], set()) or
                       (source['site'] == 'TempoReps' and relative.as_posix() == 'review/foreground-service-code10.mp4') or
                       (source['site'] in {'Echappee', 'VesperDrift'} and path.suffix == '.mp4') or
                       (source['site'] == 'Portfolio' and relative.as_posix() == '_redirects'))
            if any(part in {'node_modules', '_src', 'src', 'scripts', 'tools', 'tests', 'proofs', 'evidence', 'functions', 'email-worker'} for part in relative.parts):
                raise ValueError(f'Technical source in public output: {path}')
            if ((path.suffix.lower() not in EXTENSIONS and not special) or
                (path.suffix.lower() not in set(source.get('extensions', EXTENSIONS)) and not special)) and relative.as_posix() != '.nojekyll':
                raise ValueError(f'Disallowed public type: {path}')
            data = path.read_bytes()
            if path.suffix in ['.html', '.js', '.txt', '.xml', '.css', '.json']:
                if re.search(rb'-----BEGIN [A-Z ]*PRIVATE KEY-----|\bgh[pousr]_[A-Za-z0-9]{20,}|\bxox[baprs]-[A-Za-z0-9-]{10,}', data):
                    raise ValueError(f'Credential pattern in output: {path}')
            if path.suffix in ['.html', '.js', '.txt', '.xml', '.css', '.json', '.webmanifest'] and re.search(rb'bnjdpn\.github\.io|formspree', data, re.I):
                raise ValueError(f'Obsolete hosting/contact dependency in public output: {path}')
            if path.suffix == '.html':
                hit = re.search(rb'<html\b[^>]*\blang=[\"\x27]([^\"\x27]+)', data, re.I)
                if hit: languages.add(hit[1].decode())
            target = relative if source['site'] == 'Portfolio' else Path(source['site']) / relative
            files[relative.as_posix()] = hashlib.sha256(data).hexdigest()
            plan.append((path, target))
        provenance.append({**source, 'workingTreeStatus': git(repo, 'status', '--porcelain', '--untracked-files=no'),
                           'languages': sorted(languages), 'files': files})
    targets = [target.as_posix() for _, target in plan]
    if len(targets) != len(set(targets)):
        raise ValueError('Overlapping public source paths')
    # Compile-time function imports and configuration stay beside, never inside, public/.
    server = {}
    for name, target in SERVER_INPUTS.items():
        path = ROOT / name
        if path.is_symlink() or not path.resolve().is_relative_to(ROOT.resolve()) or not path.is_file() or not path.stat().st_size:
            raise ValueError(f'Missing/unsafe server input: {name}')
        server[target] = {'source': name, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}
    # Validate everything before creating a candidate. Manifest stays outside the public directory.
    artifact = output / 'public'
    artifact.mkdir(parents=True)
    for source, relative in plan:
        target = artifact / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, target)
    (artifact / '_routes.json').write_text(json.dumps(FUNCTION_ROUTES, indent=2) + '\n')
    for target, record in server.items():
        path = output / target
        path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / record['source'], path)
    report = {'publishable': False, 'qualification': 'Local candidate only; no served-byte, store URL, contact delivery or provider qualification.',
              'sources': provenance, 'files': len(plan) + 1, 'historical_prefixes': sorted(LEGACY), 'gone_prefixes': GONE,
              'server_inputs': server, 'function_routes': FUNCTION_ROUTES,
              'routing_sha256': hashlib.sha256((artifact / '_routes.json').read_bytes()).hexdigest(),
              'direct_upload': {'cwd': str(output), 'assets': 'public', 'project': 'bnjdpn-site-506',
                                'note': 'Root must review and explicitly choose the branch. Existing dashboard secrets and Worker routes stay outside this artifact.'},
              'blockers': (['Ruby docs outputs are not qualified exact Pages stages.'] if any(x['kind'] == 'local-generated-docs-not-staged' for x in sources) else []) + [
                           'Existing www Worker routes and Pages runtime bindings need live preservation/readback.',
                           'Current production equivalence and store URLs need readback before any cutover.']}
    (output / 'manifest.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    return report

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--spec', type=Path, required=True, help='JSON list: site, repo, stage, sha, kind')
    parser.add_argument('--out', type=Path, required=True, help='New candidate directory, with public/ and a private manifest')
    args = parser.parse_args()
    report = assemble(json.loads(args.spec.read_text()), args.out.resolve())
    print(json.dumps({'publishable': report['publishable'], 'files': report['files'], 'out': str(args.out)}))
