"""Draws an invented SMS screenshot for testing screenshot reading.

Usage: python scripts/make-sample-screenshot.py samples/sms-falso-banco.png
"""
import sys
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

FONT = "C:/Windows/Fonts/segoeui.ttf"
out = Path(sys.argv[1] if len(sys.argv) > 1 else "samples/sms-falso-banco.png")
out.parent.mkdir(parents=True, exist_ok=True)

img = Image.new("RGB", (720, 1100), "#f2f2f7")
d = ImageDraw.Draw(img)
title = ImageFont.truetype(FONT, 34)
small = ImageFont.truetype(FONT, 24)
body = ImageFont.truetype(FONT, 30)

d.rectangle([0, 0, 720, 150], fill="#ffffff")
d.text((360, 60), "89211", font=title, fill="#000000", anchor="mm")
d.text((360, 105), "Mensaje de texto", font=small, fill="#8e8e93", anchor="mm")
d.text((360, 200), "Hoy 10:42", font=small, fill="#8e8e93", anchor="mm")

message = (
    "BBVA Mexico: Detectamos un cargo no reconocido por $8,749.00 MXN en tu tarjeta "
    "terminacion 4417. Si no reconoces esta compra cancela de inmediato en "
    "https://bbva-mx-seguridad.com/cancelar o comunicate al 55 7890 3321. "
    "Tu cuenta sera bloqueada en 2 horas."
)
lines = textwrap.wrap(message, width=34)
height = 40 + len(lines) * 42
d.rounded_rectangle([30, 240, 600, 240 + height], radius=28, fill="#e5e5ea")
for i, line in enumerate(lines):
    d.text((55, 260 + i * 42), line, font=body, fill="#000000")

img.save(out)
print(out)
