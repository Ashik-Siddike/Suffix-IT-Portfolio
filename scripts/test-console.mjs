import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

page.on('console', msg => console.log('BROWSER:', msg.text()));

await page.goto('http://127.0.0.1:5173/product/payroll-system', { waitUntil: 'networkidle' });

await page.evaluate(() => {
  // Let's check Motion values in window
  console.log('Testing scroll in browser...');
});

for (const y of [0, 300, 600, 900]) {
  await page.evaluate((pos) => window.scrollTo(0, pos), y);
  await page.waitForTimeout(300);
}

await browser.close();
