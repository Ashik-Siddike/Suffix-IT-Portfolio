import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:5173/product/transformer-monitoring', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // 1. Initial State
  await page.screenshot({ path: 'artifacts/flow_0_initial.png' });
  console.log('Saved flow_0_initial.png');

  // 2. Wheel 400px down (transition begins)
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'artifacts/flow_1_transition.png' });
  console.log('Saved flow_1_transition.png');

  // 3. Wheel 400px more down (total 800px, cards flown in, cockpit active)
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'artifacts/flow_2_cockpit_active.png' });
  console.log('Saved flow_2_cockpit_active.png');

  // 4. Wheel 400px more down (total 1200px, fully expanded)
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'artifacts/flow_3_expanded.png' });
  console.log('Saved flow_3_expanded.png');

  // 5. Wheel 400px more down (total 1600px, docking into details)
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'artifacts/flow_4_docking.png' });
  console.log('Saved flow_4_docking.png');

  await browser.close();
  console.log('Finished capturing system flow!');
}

run().catch(console.error);
