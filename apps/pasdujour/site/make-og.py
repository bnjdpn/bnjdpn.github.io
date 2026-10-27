#!/usr/bin/env python3
"""Compose share cards from typography and the unaltered app screenshot only.
Dev tool: Python + Pillow, no production dependency. Fonts are Google Fonts OFL.
"""
from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.request import urlretrieve
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
with TemporaryDirectory(prefix='pasdujour-og-') as tmp:
    font = Path(tmp) / 'chakra.ttf'
    urlretrieve('https://fonts.gstatic.com/s/chakrapetch/v13/cIflMapbsEk7TDLdtEz1BwkeQI5FQA.ttf', font)
    for lang, locale, lines in [('fr', 'fr-FR', ['Vos pas du jour,', 'votre objectif.']), ('en', 'en-US', ['Your daily steps,', 'your goal.'])]:
        card = Image.new('RGB', (1200, 630), '#101818')
        text = ImageDraw.Draw(card)
        text.text((65, 95), 'Pas du Jour', font=ImageFont.truetype(str(font), 30), fill='#FFFFFF')
        for i, line in enumerate(lines):
            text.text((65, 210 + i * 78), line, font=ImageFont.truetype(str(font), 65), fill='#FFFFFF')
        text.text((65, 450), 'Apple Watch sous watchOS 26' if lang == 'fr' else 'Apple Watch running watchOS 26', font=ImageFont.truetype(str(font), 27), fill='#00CDBB')
        screenshot = Image.open(ROOT / 'media' / locale / 'home-goal.webp').convert('RGB')
        screenshot.thumbnail((365, 500), Image.Resampling.LANCZOS)
        card.paste(screenshot, (770, (630 - screenshot.height) // 2))
        card.save(ROOT / f'og-{lang}.jpg', quality=91)
