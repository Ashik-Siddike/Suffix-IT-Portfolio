import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:5173/product/transformer-monitoring', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const zoomEl = await page.$('.zoom-parallax');
  if (zoomEl) {
    // 1. Initial position before zoom starts
    await zoomEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'artifacts/transformer_zoom_initial.png' });
    console.log('Saved transformer_zoom_initial.png');

    // 2. Scroll 400px down inside the zoom effect
    await page.evaluate(() => window.scrollBy(0, 450));
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'artifacts/transformer_zoom_progress.png' });
    console.log('Saved transformer_zoom_progress.png');
  }
  await browser.close();
}

run().catch(console.error);
