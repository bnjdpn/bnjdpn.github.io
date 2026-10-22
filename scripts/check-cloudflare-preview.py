#!/usr/bin/env python3
"""Behaviour checks for candidate allowlists and the assembled-site checker."""
import importlib.util
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
    original = assembler.ROOT, assembler.git, assembler.ecosystem.PUBLIC
    assembler.ROOT, assembler.git, assembler.ecosystem.PUBLIC = fixture, lambda *args: 'sha', ['index.html']
    try:
        source = {'site': 'Example', 'repo': str(repo), 'stage': str(stage),
                  'sha': 'sha', 'kind': 'local-generated-docs-not-staged'}
        for index, unsafe in enumerate(['../docs/index.html', str(stage / 'index.html')]):
            output = base / f'rejected-path-{index}'
            try:
                assembler.assemble([{**source, 'files': [unsafe]}], output)
                raise AssertionError('Unsafe source path accepted')
            except ValueError as error:
                assert 'relative without parent segments' in str(error)
            assert not output.exists()
        accepted = base / 'accepted'
        result = assembler.assemble([{**source, 'files': ['./index.html']}], accepted)
        assert result['files'] == 2
        assert (accepted / 'public/Example/index.html').is_file()
        assert not (accepted / 'public/Example/internal.md').exists()
        assert set(result['sources'][1]['files']) == {'index.html'}
        generated = fixture / '.local/exact-stage/Example'
        generated.mkdir(parents=True)
        (generated / 'index.html').write_text('<html lang="fr"></html>')
        result = assembler.assemble([{**source, 'stage': str(generated),
                                      'kind': 'local-generator-stage'}], base / 'generated')
        assert result['files'] == 2
        assert not any('Ruby docs' in b for b in result['blockers'])
        (generated / 'internal.md').write_text('Excluded source')
        try:
            assembler.assemble([{**source, 'stage': str(generated),
                                 'kind': 'local-generator-stage'}], base / 'private-generated')
            raise AssertionError('Private stage file accepted')
        except ValueError as error:
            assert 'Disallowed public type' in str(error)
        assert not (base / 'private-generated').exists()
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
print('Passed: parent/absolute path refusal before creation, canonical allowlist, incomplete catalogue refusal, assembled contact/query route, bnjdpn.com anchor, sitemap locale target.')
