import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:5173/product/transformer-monitoring', { waitUntil: 'networkidle' });

  for (const scrollDelta of [300, 400, 500, 500]) {
    await page.mouse.wheel(0, scrollDelta);
    await page.waitForTimeout(500);
    const state = await page.evaluate(() => {
      const banner = document.querySelector('.mb-3.hidden.sm\\:inline-flex');
      const card1 = document.querySelector('.rounded-2xl.border.border-sky-200\\/90');
      const title = document.querySelector('h1')?.closest('div.mb-2');
      return {
        scrollY: window.scrollY,
        titleOpacity: title ? getComputedStyle(title).opacity : null,
        bannerOpacity: banner ? getComputedStyle(banner).opacity : null,
        bannerTransform: banner ? getComputedStyle(banner).transform : null,
        card1Opacity: card1 ? getComputedStyle(card1).opacity : null,
        card1Transform: card1 ? getComputedStyle(card1).transform : null,
      };
    });
    console.log('Scroll state at', state.scrollY, state);
  }

  await browser.close();
}

run().catch(console.error);
