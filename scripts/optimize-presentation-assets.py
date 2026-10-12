from pathlib import Path
from PIL import Image
import json

manifest_path = Path("src/data/optimized-images.json")
manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
sources = [
    '/assets/generated/illustrations/software.webp',
    '/assets/company-original.png',
    '/assets/field-force.497227c8.png',
    '/assets/Dashboard_2.543c09b5.jpg',
    '/assets/Dashboard_1.0929c23a.jpg',
]
for source in sources:
    image = Image.open("public" + source)
    widths = [320, 480, 640, 768, 960, 1200] if source.endswith("software.webp") else [320, 640, 960, 1280]
    variants = []
    for width in widths:
        if width > image.width:
            continue
        target = f"/optimized/presentation-{Path(source).stem}-{width}.webp"
        path = Path("public" + target)
        if not path.exists() or not path.stat().st_size:
            resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
            resized.save(path, "WEBP", quality=78, method=6)
        variants.append({"src": target, "width": width})
    manifest[source] = variants
atlas = Image.open('public/assets/generated/illustrations/icon-atlas.webp')
for width in [640, 864]:
    target = Path(f'public/optimized/presentation-icon-atlas-{width}.webp')
    if not target.exists() or not target.stat().st_size:
        atlas.resize((width, width), Image.Resampling.LANCZOS).save(
            target, 'WEBP', quality=82, method=6
        )
manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
