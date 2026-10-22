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

def git(repo, *args):
    return subprocess.check_output(['git', '-C', str(repo), *args], text=True).strip()

def assemble(spec, output):
    catalogue = json.loads((ROOT / 'content/catalog.json').read_text())
    expected = {x['path'] for x in catalogue}
    if len(spec) != len(expected) or {x['site'] for x in spec} != expected:
        raise ValueError('Spec must contain exactly one explicit output for every catalogue site')
    if output.exists():
        raise ValueError('Refusing to replace an existing output; choose a fresh candidate directory')
    sources = [{'site': 'Portfolio', 'repo': str(ROOT), 'stage': str(ROOT),
                'sha': git(ROOT, 'rev-parse', 'HEAD'), 'kind': 'local-generated-root'}, *spec]
    plan, provenance = [], []
    for source in sources:
        repo, stage = Path(source['repo']).resolve(), Path(source['stage']).resolve()
        if git(repo, 'rev-parse', 'HEAD') != source['sha']:
            raise ValueError(f"Source HEAD changed: {source['site']}")
        if not stage.is_relative_to(repo) or not (stage / 'index.html').is_file():
            raise ValueError(f"Invalid public output: {source['site']}")
        if source['site'] != 'Portfolio' and source['kind'] not in ['local-generated-docs-not-staged', 'existing-staged-output']:
            raise ValueError('Unknown source kind')
        if source['site'] != 'Portfolio' and ((stage.name == 'docs') != (source['kind'] == 'local-generated-docs-not-staged')):
            raise ValueError('docs are candidate sources and require a generator-derived allowlist')
        if source['site'] != 'Portfolio' and stage.relative_to(repo).as_posix() not in ['docs', '_site', '_pages']:
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
            if path.suffix.lower() not in set(source.get('extensions', EXTENSIONS)) and relative.as_posix() != '.nojekyll' and not (source['site'] == 'Echappee' and path.suffix == '.mp4'):
                raise ValueError(f'Disallowed public type: {path}')
            data = path.read_bytes()
            if path.suffix in ['.html', '.js', '.txt', '.xml', '.css']:
                if re.search(rb'-----BEGIN [A-Z ]*PRIVATE KEY-----|\bgh[pousr]_[A-Za-z0-9]{20,}|\bxox[baprs]-[A-Za-z0-9-]{10,}', data):
                    raise ValueError(f'Credential pattern in output: {path}')
            if path.suffix == '.html':
                hit = re.search(rb'<html\b[^>]*\blang=[\"\x27]([^\"\x27]+)', data, re.I)
                if hit: languages.add(hit[1].decode())
            target = relative if source['site'] == 'Portfolio' else Path(source['site']) / relative
            files[relative.as_posix()] = hashlib.sha256(data).hexdigest()
            plan.append((path, target))
        provenance.append({**source, 'workingTreeStatus': git(repo, 'status', '--porcelain', '--untracked-files=no'),
                           'languages': sorted(languages), 'files': files})
    # Validate everything before creating a candidate. Manifest stays outside the public directory.
    artifact = output / 'public'
    artifact.mkdir(parents=True)
    for source, relative in plan:
        target = artifact / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, target)
    report = {'publishable': False, 'qualification': 'Local candidate only; no served-byte, store URL, contact delivery or provider qualification.',
              'sources': provenance, 'files': len(plan),
              'blockers': ['Ruby docs outputs are not qualified exact Pages stages.',
                           'Independent legacy sites outside the catalogue and www Worker routes need a migration decision.',
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
