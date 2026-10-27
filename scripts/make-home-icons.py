#!/usr/bin/env python3
"""128 px WebP icons for the home catalogue (shown at 56 px), from the 512 px store icons."""
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
sources = {a['path']: f"assets/apps/{a['icon']}.png" for a in json.loads((root / 'content/catalog.json').read_text())}
sources |= {'petits-besoins': 'assets/petits-besoins-icon.png', 'petits-pots': 'assets/petits-pots-icon.png', 'catminers': 'assets/catminers-icon.png'}
(root / 'assets/icons').mkdir(exist_ok=True)
for path, src in sources.items():
    Image.open(root / src).convert('RGBA').resize((128, 128), Image.LANCZOS).save(root / f'assets/icons/{path.lower()}-128.webp', 'WEBP', quality=88, method=6)
