import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:5173/product/transformer-monitoring', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const heading = await page.$('h3:has-text("Easily Accissible"), [id*="section"]:has-text("Easily Accissible")');
  if (heading) {
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    // Scroll 250px down so the stage centers on the screen
    await page.evaluate(() => window.scrollBy(0, 250));
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'artifacts/transformer_scrolled_250.png' });

    // Scroll 600px down to test the zoom in action
    await page.evaluate(() => window.scrollBy(0, 450));
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'artifacts/transformer_scrolled_700.png' });

    console.log('Saved both scroll screenshots.');
  }
  
  await browser.close();
}

run().catch(console.error);
