"""Regenerate OG assets with the real screenshot and typography only.
Build-time helper: Pillow, Node, and the OFL Sniglet/Lato TTF files are required.
python3 render-social.py --sniglet /path/Sniglet-Regular.ttf --lato /path/Lato-Regular.ttf
The website itself only serves the Latin WOFF2 subsets; this helper never fetches.
"""
import argparse
import json
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--sniglet', type=Path, required=True)
parser.add_argument('--lato', type=Path, required=True)
args = parser.parse_args()
base = Path(__file__).resolve().parent
copy = json.loads(subprocess.check_output([
    'node', '--input-type=module', '-e',
    "import copy from './copy.mjs'; console.log(JSON.stringify(copy));"
], cwd=base, text=True))
for lang, locale, lines in [
    ('fr', 'fr-FR', ['Notez le pot.', 'Passez les mots', 'à la crèche.']),
    ('en', 'en-US', ['Log the potty.', 'Pass the words', 'to daycare.']),
]:
    assert ' '.join(lines) == copy[lang]['h1']
    image = Image.new('RGB', (1200, 630), '#C6E8E2')
    text = ImageDraw.Draw(image)
    text.text((64, 60), 'Petits Besoins', font=ImageFont.truetype(str(args.lato), 26), fill='#342C2A')
    for index, line in enumerate(lines):
        text.text((64, 160 + index * 80), line, font=ImageFont.truetype(str(args.sniglet), 70), fill='#342C2A')
    screen = Image.open(base / 'media' / locale / '01-today-880.webp')
    screen = screen.resize((235, 522), Image.Resampling.LANCZOS)
    image.paste(screen, (900, 54))
    image.save(base / f'og-{lang}.jpg', quality=90)
