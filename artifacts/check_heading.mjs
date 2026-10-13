import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:5173/product/transformer-monitoring', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  // Find heading for Easily Accissible
  const heading = await page.$('h3:has-text("Easily Accissible"), [id*="section"]:has-text("Easily Accissible")');
  console.log('Heading found:', !!heading);
  if (heading) {
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'artifacts/transformer_heading_view.png' });
    console.log('Saved transformer_heading_view.png');
  }
  
  await browser.close();
}

run().catch(console.error);
