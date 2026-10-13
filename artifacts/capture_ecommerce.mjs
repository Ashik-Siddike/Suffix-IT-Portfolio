import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  console.log('Navigating...');
  await page.goto('http://127.0.0.1:5173/product/e-commerce', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  console.log('Page loaded, taking screenshots...');
  
  // 1. Executive Intro section
  await page.evaluate(() => window.scrollTo(0, 1400));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'artifacts/new_ecommerce_intro.png' });
  console.log('Intro saved.');

  // 2. Capability cards & Directory sidebar
  await page.evaluate(() => window.scrollTo(0, 2200));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'artifacts/new_ecommerce_details.png' });
  console.log('Details saved.');

  // 3. Capability card with 3D illustration
  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'artifacts/new_ecommerce_illustration.png' });
  console.log('Illustration saved.');

  // 4. Products section
  await page.evaluate(() => window.scrollTo(0, 3800));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'artifacts/new_ecommerce_products.png' });
  console.log('Products saved.');

  await browser.close();
  console.log('Done.');
}

run().catch(err => {
  console.error('Run failed:', err);
  process.exit(1);
});
