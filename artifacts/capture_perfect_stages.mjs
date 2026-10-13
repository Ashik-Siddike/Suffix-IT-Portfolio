import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://127.0.0.1:5173/product/transformer-monitoring', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Stage 0: Initial View
  await page.screenshot({ path: 'artifacts/stage_0_initial.png' });
  console.log('Saved stage_0_initial.png');

  // Stage 1: Scroll to 350px (Title smoothly fading, banner appearing, cards flying in)
  await page.mouse.wheel(0, 350);
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'artifacts/stage_1_lifting.png' });
  console.log('Saved stage_1_lifting.png');

  // Stage 2: Scroll 400px more (Total 750px: Full Cockpit view with cards, sync beam, status banner)
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'artifacts/stage_2_cockpit_wings.png' });
  console.log('Saved stage_2_cockpit_wings.png');

  // Stage 3: Scroll 400px more (Total 1150px: Locked active ecosystem view)
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'artifacts/stage_3_full_system.png' });
  console.log('Saved stage_3_full_system.png');

  // Stage 4: Scroll 450px more (Total 1600px: Seamless docking into Comprehensive System Overview)
  await page.mouse.wheel(0, 450);
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'artifacts/stage_4_docking.png' });
  console.log('Saved stage_4_docking.png');

  // Also test a mobile viewport to ensure responsiveness
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://127.0.0.1:5173/product/transformer-monitoring', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  await mobilePage.mouse.wheel(0, 450);
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: 'artifacts/stage_mobile_cockpit.png' });
  console.log('Saved stage_mobile_cockpit.png');

  await browser.close();
  console.log('All stages captured successfully!');
}

run().catch(console.error);
