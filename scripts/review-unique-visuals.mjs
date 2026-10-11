import fs from 'node:fs';
import { chromium } from 'playwright';

const jobs = JSON.parse(fs.readFileSync('docs/unique-visual-generation-jobs.json', 'utf8')).jobs;
const ready = jobs.filter((job) => fs.existsSync('public' + job.file));
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1600, height: 1200 },
  reducedMotion: 'reduce',
});
for (let offset = 0; offset < ready.length; offset += 16) {
  const group = ready.slice(offset, offset + 16);
  await page.setContent(
    `<style>body{margin:0;background:#eef5fa;font-family:Arial,sans-serif}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:12px}figure{margin:0;background:#fff;border:1px solid #d8e5ed;border-radius:12px;overflow:hidden}img{width:100%;height:235px;object-fit:contain;display:block;background-color:white;background-image:linear-gradient(45deg,#e7eef4 25%,transparent 25%),linear-gradient(-45deg,#e7eef4 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e7eef4 75%),linear-gradient(-45deg,transparent 75%,#e7eef4 75%);background-size:20px 20px;background-position:0 0,0 10px,10px -10px,-10px 0}figcaption{padding:12px;font-size:12px;color:#16334a;min-height:30px}</style><div class="grid">${group.map((job) => `<figure><img src="http://127.0.0.1:5173${job.file}" alt=""><figcaption>${job.id}</figcaption></figure>`).join('')}</div>`,
  );
  await page.locator('img').evaluateAll(async (images) => {
    await Promise.all(images.map((image) => image.decode()));
  });
  await page.screenshot({
    path: `artifacts/unique-art-review-${Math.floor(offset / 16) + 1}.png`,
    fullPage: true,
  });
}
await browser.close();
console.log(
  `Reviewed ${ready.length} available assets in ${Math.ceil(ready.length / 16)} contact sheets.`,
);
