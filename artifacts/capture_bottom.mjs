import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://127.0.0.1:5173/product/e-commerce', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to find #related-products or the products section
  const relatedSection = await page.$('.related-products-section, #related-products, section:has(h2)');
  console.log('Finding bottom section...');
  
  await page.evaluate(() => {
    const el = document.querySelector('.related-products-section') || Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Products'))?.closest('section');
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    } else {
      window.scrollTo(0, document.body.scrollHeight - 1200);
    }
  });
  
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'artifacts/new_ecommerce_bottom_products.png' });
  console.log('Bottom products screenshot saved.');

  await browser.close();
}

run().catch(console.error);
