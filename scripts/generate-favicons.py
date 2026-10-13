import base64
import io
import os
from PIL import Image, ImageDraw

def generate():
    # Source is the high-res 2083x789 dark logo
    src_path = 'public/assets/Suffix-Logo-Dark.png'
    im_src = Image.open(src_path).convert('RGBA')

    # Crop the mark precisely: 0 to 966 horizontally, 0 to 789 vertically
    crop_mark = im_src.crop((0, 0, 966, 789))
    bbox = crop_mark.getbbox()
    tight_mark = crop_mark.crop(bbox)
    tw, th = tight_mark.size

    # Background color matching the Suffix IT logo in dark headers / footers (#063858)
    bg_color = (6, 56, 88, 255)

    def create_icon_img(size, bg=bg_color, corner_ratio=0.22, padding_factor=0.80):
        canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(canvas)
        r = int(size * corner_ratio)
        draw.rounded_rectangle([(0, 0), (size - 1, size - 1)], radius=r, fill=bg)

        target_inner = int(size * padding_factor)
        scale = min(target_inner / tw, target_inner / th)
        nw = max(1, int(tw * scale))
        nh = max(1, int(th * scale))

        resized_mark = tight_mark.resize((nw, nh), Image.Resampling.LANCZOS)
        px = (size - nw) // 2
        py = (size - nh) // 2
        canvas.paste(resized_mark, (px, py), resized_mark)
        return canvas

    # Generate standard PNGs
    icon_512 = create_icon_img(512)
    icon_192 = create_icon_img(192)
    icon_180 = create_icon_img(180)
    icon_48  = create_icon_img(48)
    icon_32  = create_icon_img(32)
    icon_16  = create_icon_img(16)

    # Save to public/
    icon_512.save('public/android-chrome-512x512.png', 'PNG')
    icon_192.save('public/android-chrome-192x192.png', 'PNG')
    icon_180.save('public/apple-touch-icon.png', 'PNG')
    icon_48.save('public/favicon-48x48.png', 'PNG')
    icon_32.save('public/favicon-32x32.png', 'PNG')
    icon_16.save('public/favicon-16x16.png', 'PNG')
    icon_512.save('public/assets/suffix-favicon.png', 'PNG')

    # Save multi-size favicon.ico
    icon_512.save('public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])

    # Generate SVG favicon
    # 512 canvas for embedded image
    buf = io.BytesIO()
    icon_512.save(buf, format='PNG')
    b64_str = base64.b64encode(buf.getvalue()).decode('utf-8')

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="suffixBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#084268" />
      <stop offset="100%" stop-color="#052c46" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#suffixBg)" />
  <image href="data:image/png;base64,{b64_str}" width="512" height="512" />
</svg>
'''
    with open('public/favicon.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)

    print('All favicon assets generated successfully!')

if __name__ == '__main__':
    generate()
