"""Create responsive WebP variants while preserving original art and alpha."""
from pathlib import Path
from PIL import Image
import hashlib
import json
from concurrent.futures import ThreadPoolExecutor

root = Path(__file__).resolve().parents[1]
manifest_path = root / 'src/data/optimized-images.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
destination = root / 'public/optimized/generated'
destination.mkdir(parents=True, exist_ok=True)
def optimize(source):
    path = '/' + source.relative_to(root / 'public').as_posix()
    original = Image.open(source).convert('RGBA')
    widths = sorted({min(width, original.width) for width in [320, 640, 960]} | {original.width})
    key = source.stem + '-' + hashlib.sha256(path.encode()).hexdigest()[:8]
    entries = []
    for width in widths:
        output = destination / f'{key}-{width}.webp'
        if width == original.width:
            entries.append({'src': path, 'width': width})
            continue
        if not output.exists() or output.stat().st_size == 0:
            resized = original.resize((width, round(original.height * width / original.width)), Image.Resampling.LANCZOS)
            temporary = output.with_suffix('.tmp.webp')
            resized.save(temporary, 'WEBP', quality=82, method=4, exact=True)
            temporary.replace(output)
        entries.append({'src': '/' + output.relative_to(root / 'public').as_posix(), 'width': width})
    return path, entries
sources = [source for source in (root / 'public/assets/generated').rglob('*.webp') if source.stem != 'icon-atlas']
with ThreadPoolExecutor(max_workers=4) as pool:
    for path, entries in pool.map(optimize, sources):
        manifest[path] = entries
count = len(sources)
manifest_path.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(f'Responsive image sets generated: {count}')
