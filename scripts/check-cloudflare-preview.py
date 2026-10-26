#!/usr/bin/env python3
"""Behaviour checks for candidate allowlists and the assembled-site checker."""
import importlib.util
import hashlib
import shutil
import json
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('assembler', ROOT / 'scripts/assemble-cloudflare-preview.py')
assembler = importlib.util.module_from_spec(spec)
spec.loader.exec_module(assembler)

with tempfile.TemporaryDirectory() as temp:
    base = Path(temp)
    # An incomplete explicit catalogue cannot silently omit a product.
    try:
        assembler.assemble([], base / 'incomplete')
        raise AssertionError('Incomplete catalogue accepted')
    except ValueError as error:
        assert 'exactly one' in str(error)
    assert not (base / 'incomplete').exists()

    # Reject a path which leaves docs and re-enters it, even though resolve()
    # lands on a valid source. No destination is created before validation ends.
    fixture = (base / 'fixture').resolve()
    (fixture / 'content').mkdir(parents=True)
    (fixture / 'content/catalog.json').write_text('[{"path":"Example"}]')
    (fixture / 'index.html').write_text('<html lang="en"></html>')
    repo = fixture / 'Example'
    stage = repo / 'docs'
    stage.mkdir(parents=True)
    (stage / 'index.html').write_text('<html lang="fr"></html>')
    (stage / 'internal.md').write_text('Excluded internal note')
    for name in assembler.SERVER_INPUTS:
        if name == 'content/catalog.json': continue
        target = fixture / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / name, target)
    legacy = []
    for name in sorted(assembler.LEGACY):
        root = fixture / name
        root.mkdir()
        output = fixture / '.local/legacy' / name
        output.mkdir(parents=True)
        (output / 'index.html').write_text('<html lang="en"></html>')
        legacy.append({'site': name, 'repo': str(root), 'stage': str(output), 'sha': 'a' * 40, 'kind': 'local-generator-stage'})
    original = assembler.ROOT, assembler.git, assembler.ecosystem.PUBLIC
    assembler.ROOT, assembler.git, assembler.ecosystem.PUBLIC = fixture, lambda *args: 'a' * 40 if 'rev-parse' in args else '', ['index.html']
    try:
        source = {'site': 'Example', 'repo': str(repo), 'stage': str(stage),
                  'sha': 'a' * 40, 'kind': 'local-generated-docs-not-staged'}
        for index, unsafe in enumerate(['../docs/index.html', str(stage / 'index.html')]):
            output = base / f'rejected-path-{index}'
            try:
                assembler.assemble([{**source, 'files': [unsafe]}, *legacy], output)
                raise AssertionError('Unsafe source path accepted')
            except ValueError as error:
                assert 'relative without parent segments' in str(error)
            assert not output.exists()
        accepted = base / 'accepted'
        result = assembler.assemble([{**source, 'files': ['./index.html']}, *legacy], accepted)
        assert result['files'] == 4
        assert (accepted / 'public/Example/index.html').is_file()
        assert not (accepted / 'public/Example/internal.md').exists()
        assert set(result['sources'][1]['files']) == {'index.html'}
        generated = fixture / '.local/exact-stage/Example'
        generated.mkdir(parents=True)
        (generated / 'index.html').write_text('<html lang="fr"></html>')
        result = assembler.assemble([{**source, 'stage': str(generated),
                                      'kind': 'local-generator-stage'}, *legacy], base / 'generated')
        assert result['files'] == 4
        assert not any('Ruby docs' in b for b in result['blockers'])
        assert (accepted / 'functions/api/contact.js').is_file()
        assert (accepted / 'functions/api/contact/config.js').is_file()
        assert (accepted / 'content/catalog.json').is_file()
        assert (accepted / 'content/app-documents.mjs').is_file()
        assert not (accepted / 'public/functions').exists() and not (accepted / 'public/content').exists()
        assert json.loads((accepted / 'public/_routes.json').read_text()) == assembler.FUNCTION_ROUTES
        assert (accepted / 'wrangler.toml').is_file()
        # Legacy entries are mandatory, never silently discarded or redirected.
        try:
            assembler.assemble([{**source, 'files': ['index.html']}], base / 'missing-legacy')
            raise AssertionError('Missing legacy roots accepted')
        except ValueError as error:
            assert 'historical RealmBox' in str(error)
        assert not (base / 'missing-legacy').exists()
        # Retired prefixes answer 410 from the middleware and never ship files.
        gone_root = fixture / '.local/legacy/TaskLane'
        gone_root.mkdir(parents=True)
        (gone_root / 'index.html').write_text('<html lang="en"></html>')
        try:
            assembler.assemble([{**source, 'files': ['index.html']}, *legacy,
                                {'site': 'TaskLane', 'repo': str(fixture), 'stage': str(gone_root), 'sha': 'a' * 40,
                                 'kind': 'local-generator-stage'}], base / 'gone-prefix')
            raise AssertionError('Retired prefix accepted')
        except ValueError as error:
            assert 'exactly one' in str(error) or '410' in str(error)
        assert not (base / 'gone-prefix').exists()
        assert all(f'/{name}/*' in assembler.FUNCTION_ROUTES['include'] for name in assembler.GONE)
        assert (accepted / 'functions/_middleware.js').is_file()
        # Declaring .json does not allow arbitrary stage documents.
        (generated / 'private.json').write_text('{"internal":true}')
        try:
            assembler.assemble([{**source, 'stage': str(generated), 'kind': 'local-generator-stage', 'extensions': ['.html', '.json']}, *legacy], base / 'private-json')
            raise AssertionError('Arbitrary JSON accepted')
        except ValueError as error:
            assert 'Disallowed public type' in str(error)
        assert not (base / 'private-json').exists()
        (generated / 'private.json').unlink()
        realm = next(item for item in legacy if item['site'] == 'RealmBox')
        (Path(realm['stage']) / 'release-manifest.json').write_text('{"release":"public"}')
        result = assembler.assemble([{**source, 'files': ['index.html']}, *legacy], base / 'public-release')
        assert (base / 'public-release/public/RealmBox/release-manifest.json').is_file()
        (generated / 'internal.md').write_text('Excluded source')
        try:
            assembler.assemble([{**source, 'stage': str(generated),
                                 'kind': 'local-generator-stage'}, *legacy], base / 'private-generated')
            raise AssertionError('Private stage file accepted')
        except ValueError as error:
            assert 'Disallowed public type' in str(error)
        assert not (base / 'private-generated').exists()
        # One reviewer video for Tempo does not open MP4 uploads generally.
        (fixture / 'content/catalog.json').write_text('[{"path":"TempoReps"}]')
        tempo = fixture / 'TempoReps'
        tempo.mkdir()
        video_stage = fixture / '.local/tempo-review'
        (video_stage / 'review').mkdir(parents=True)
        (video_stage / 'index.html').write_text('<html lang="en"></html>')
        video = video_stage / 'review/foreground-service-code10.mp4'
        video.write_bytes(b'unit-test bytes\x00')
        video_source = {**source, 'site': 'TempoReps', 'repo': str(tempo),
                        'stage': str(video_stage), 'kind': 'local-generator-stage'}
        assembler.assemble([video_source, *legacy], base / 'tempo-review')
        assert (base / 'tempo-review/public/TempoReps/review/foreground-service-code10.mp4').read_bytes() == video.read_bytes()
        video.rename(video_stage / 'review/other.mp4')
        try:
            assembler.assemble([video_source, *legacy], base / 'tempo-other-video')
            raise AssertionError('Other Tempo MP4 accepted')
        except ValueError as error:
            assert 'Disallowed public type' in str(error)
        assert not (base / 'tempo-other-video').exists()
        (video_stage / 'review/other.mp4').rename(video)
        (fixture / 'content/catalog.json').write_text('[{"path":"Example"}]')
        try:
            assembler.assemble([{**video_source, 'site': 'Example', 'repo': str(repo)}, *legacy], base / 'other-app-video')
            raise AssertionError('Tempo video path accepted for another app')
        except ValueError as error:
            assert 'Disallowed public type' in str(error)
        assert not (base / 'other-app-video').exists()
    finally:
        assembler.ROOT, assembler.git, assembler.ecosystem.PUBLIC = original

    artifact = base / 'public'
    artifact.mkdir()
    (artifact / 'index.html').write_text('<html lang="en"><a href="https://bnjdpn.com/fr/#contact">FR</a><a href="/contact/?app=petits-pots">Contact</a></html>')
    (artifact / 'fr').mkdir()
    target = artifact / 'fr/index.html'
    target.write_text('<html lang="fr"><section id="contact"></section></html>')
    (artifact / 'contact').mkdir()
    (artifact / 'contact/index.html').write_text('<html lang="en"></html>')
    catalogue = json.loads((ROOT / 'content/catalog.json').read_text())
    for app in catalogue:
        (artifact / app['path']).mkdir()
        (artifact / app['path'] / 'index.html').write_text('<html lang="ja"></html>')
    (artifact / 'sitemap.xml').write_text('<urlset><url><loc>https://bnjdpn.com/fr/</loc></url></urlset>')
    report = base / 'report.json'
    command = ['python3', str(ROOT / 'scripts/preview-ecosystem.py'), 'check', '--artifact', str(artifact), '--out', str(report)]
    assert subprocess.run(command, capture_output=True).returncode == 0
    assert json.loads(report.read_text())['references'] == 3
    target.write_text('<html lang="fr"></html>')
    assert subprocess.run(command, capture_output=True).returncode == 1
    assert any(e['error'] == 'Missing anchor' for e in json.loads(report.read_text())['errors'])
    target.write_text('<html lang="fr"><section id="contact"></section></html>')
    (artifact / 'sitemap.xml').write_text('<urlset><url><loc>https://bnjdpn.com/ColdLoad/missing-locale/</loc></url></urlset>')
    assert subprocess.run(command, capture_output=True).returncode == 1
    assert any(e['ref'].endswith('/missing-locale/') for e in json.loads(report.read_text())['errors'])
    # A complete artifact checker/preview resolves the historical prefix.
    for name in sorted(assembler.LEGACY):
        (artifact / name).mkdir()
        (artifact / name / 'index.html').write_text('<html lang="en"><a href="en/#ready">EN</a></html>')
        (artifact / name / 'en').mkdir()
        (artifact / name / 'en/index.html').write_text('<html lang="en"><section id="ready"></section></html>')
    (artifact / 'sitemap.xml').write_text('<urlset><url><loc>https://bnjdpn.com/RealmBox/en/#ready</loc></url></urlset>')
    server = {}
    for source, target in assembler.SERVER_INPUTS.items():
        dest = base / target
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / source, dest)
        server[target] = {'sha256': hashlib.sha256(dest.read_bytes()).hexdigest()}
    routing = artifact / '_routes.json'
    routing.write_text(json.dumps(assembler.FUNCTION_ROUTES))
    (base / 'manifest.json').write_text(json.dumps({'historical_prefixes': sorted(assembler.LEGACY), 'server_inputs': server,
        'routing_sha256': hashlib.sha256(routing.read_bytes()).hexdigest()}))
    assert subprocess.run(command, capture_output=True).returncode == 0
    checked = json.loads(report.read_text())
    assert set(checked['historicalPrefixes']) == assembler.LEGACY
    assert all(checked['htmlRoutes'][name] == 2 for name in assembler.LEGACY)
    (base / 'content/app-documents.mjs').unlink()
    assert subprocess.run(command, capture_output=True).returncode == 1
    assert any(e['error'] == 'Missing or changed Pages server input' for e in json.loads(report.read_text())['errors'])
    shutil.copyfile(ROOT / 'content/app-documents.mjs', base / 'content/app-documents.mjs')
    routing.write_text(json.dumps({**assembler.FUNCTION_ROUTES, 'include': ['/*']}))
    assert subprocess.run(command, capture_output=True).returncode == 1
    assert any('routing changed' in e['error'] for e in json.loads(report.read_text())['errors'])
    routing.write_text(json.dumps(assembler.FUNCTION_ROUTES))
    (artifact / 'RealmBox/en/index.html').write_text('<html lang="en"></html>')
    assert subprocess.run(command, capture_output=True).returncode == 1
    assert any(e['error'] == 'Missing anchor' for e in json.loads(report.read_text())['errors'])
print('Passed: mandatory RealmBox historical prefix, retired prefixes refused (410 middleware), safe explicit stages, narrow public JSON exceptions, server imports kept outside public, exact API routing, complete legacy links/anchors, missing dependency and wildcard-route refusal.')
