import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to transformer-monitoring...');
  await page.goto('http://127.0.0.1:5173/product/transformer-monitoring', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Initial State (scroll 0)
  await page.screenshot({ path: 'artifacts/system_stage_0_initial.png' });
  console.log('Captured stage 0 initial.');

  // 2. Scroll 250px
  await page.evaluate(() => window.scrollTo(0, 250));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'artifacts/system_stage_1_lifting.png' });
  console.log('Captured stage 1 lifting.');

  // 3. Scroll 550px (Cohesive System view with HUD wings and sync beam)
  await page.evaluate(() => window.scrollTo(0, 550));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'artifacts/system_stage_2_system_cockpit.png' });
  console.log('Captured stage 2 system cockpit.');

  // 4. Scroll 850px (Docking into overview)
  await page.evaluate(() => window.scrollTo(0, 850));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'artifacts/system_stage_3_docking.png' });
  console.log('Captured stage 3 docking.');

  // Also test e-commerce
  console.log('Navigating to e-commerce...');
  await page.goto('http://127.0.0.1:5173/product/e-commerce', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 550));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'artifacts/system_stage_ecommerce.png' });
  console.log('Captured ecommerce system.');

  await browser.close();
  console.log('All tests completed successfully!');
}

run().catch((err) => {
  console.error('Error running test:', err);
  process.exit(1);
});
