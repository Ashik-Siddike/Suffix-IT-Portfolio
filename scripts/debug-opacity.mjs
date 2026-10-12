import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://127.0.0.1:5173/product/payroll-system', { waitUntil: 'networkidle' });

await page.evaluate(() => window.scrollTo(0, 800));
await page.waitForTimeout(500);

const result = await page.evaluate(() => {
  // Check the motion div for keyboard
  const allMotion = Array.from(document.querySelectorAll('div')).map(d => ({
    class: d.className,
    style: d.getAttribute('style')
  })).filter(d => d.style);
  return allMotion;
});

console.log(result);
await browser.close();
