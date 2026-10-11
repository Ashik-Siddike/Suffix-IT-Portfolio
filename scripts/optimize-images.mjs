// Frontend asset compression only; originals remain unchanged for provenance.
import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { services, products } from '../src/data/catalog.js';
import { clients } from '../src/data/company.js';

const pages = JSON.parse(await fs.readFile('src/data/published-pages.json', 'utf8'));
const clientLogos = JSON.parse(await fs.readFile('src/data/client-logos.json', 'utf8'));
const sources = [
  ...new Set([
    ...services.map((item) => item.image),
    ...products.map((item) => item.image),
    ...clients.map((item) => item.image),
    ...clientLogos.map((item) => item.src),
    ...Object.values(pages).flatMap((page) => page.gallery.map((image) => image.src)),
    '/assets/company-original.png',
    '/assets/fieldForce.svg.815b7443.png',
  ]),
].filter((src) => /\.(png|jpe?g)$/i.test(src));
await fs.mkdir('public/optimized', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(process.env.ASSET_PREVIEW_URL || 'http://127.0.0.1:5173/');
const manifest = {};
for (const src of sources) {
  const images = await page.evaluate(async (src) => {
    const original = new Image();
    original.src = src;
    await original.decode();
    const widths = [
      ...new Set([320, 640, 960, 1280].map((width) => Math.min(width, original.naturalWidth))),
    ];
    return widths.map((width) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = Math.round((width * original.naturalHeight) / original.naturalWidth);
      canvas.getContext('2d').drawImage(original, 0, 0, canvas.width, canvas.height);
      return { width, data: canvas.toDataURL('image/webp', 0.84).split(',')[1] };
    });
  }, src);
  const filename = path.basename(src).replace(/\.[^.]+$/, '');
  manifest[src] = [];
  for (const image of images) {
    const local = `/optimized/${filename}-${image.width}.webp`;
    await fs.writeFile(`public${local}`, Buffer.from(image.data, 'base64'));
    manifest[src].push({ src: local, width: image.width });
  }
}
await browser.close();
await fs.writeFile('src/data/optimized-images.json', JSON.stringify(manifest, null, 2));
console.log(
  `Generated responsive WebP variants for ${Object.keys(manifest).length} original images.`,
);
