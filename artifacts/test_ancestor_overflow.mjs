import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:5173/product/transformer-monitoring', { waitUntil: 'networkidle' });

  const parentOverflow = await page.evaluate(() => {
    const refEl = document.querySelector('.relative.h-\\[180vh\\]');
    let curr = refEl ? refEl.parentElement : null;
    const path = [];
    while (curr) {
      const s = getComputedStyle(curr);
      path.push({
        tag: curr.tagName,
        className: curr.className,
        overflow: s.overflow,
        overflowX: s.overflowX,
        overflowY: s.overflowY,
      });
      curr = curr.parentElement;
    }
    return path;
  });
  console.log('Ancestor styles:', parentOverflow);
  await browser.close();
}

run().catch(console.error);
