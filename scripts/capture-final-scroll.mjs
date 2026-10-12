import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://127.0.0.1:5173/product/payroll-system', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

// Stage 0: Initial resting 90-degree laptop + phone
await page.screenshot({ path: 'artifacts/final_00_initial_90deg.png' });

// Stage 1: Scroll 450px (Lifting off hinge, morphing to tablet)
await page.evaluate(() => window.scrollTo(0, 450));
await page.waitForTimeout(600);
await page.screenshot({ path: 'artifacts/final_01_lifting.png' });

// Stage 2: Scroll 950px (Full Hero Tablet + Phone Zoom)
await page.evaluate(() => window.scrollTo(0, 950));
await page.waitForTimeout(600);
await page.screenshot({ path: 'artifacts/final_02_hero_tablet_phone.png' });

// Stage 3: Scroll 1600px (Content section flow)
await page.evaluate(() => window.scrollTo(0, 1600));
await page.waitForTimeout(600);
await page.screenshot({ path: 'artifacts/final_03_details_flow.png' });

await browser.close();
console.log('Final screenshots captured successfully.');
