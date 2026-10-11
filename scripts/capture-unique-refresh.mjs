import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
});
for (const [route, selector, name] of [
  ['/', '.services-bento', 'unique-services-desktop'],
  ['/', '.testimonials-editorial', 'unique-testimonials-desktop'],
  ['/about', '.company-value-card', 'unique-company-desktop'],
  ['/products', 'main', 'unique-catalogue-desktop'],
  ['/product/payroll-system', 'main', 'unique-payroll-desktop'],
]) {
  await page.goto('http://127.0.0.1:5173' + route);
  await page.locator('main').waitFor();
  const section = page.locator(selector).first();
  if (!(await section.count())) continue;
  await section.scrollIntoViewIfNeeded();
  await section.locator('img').evaluateAll(async (images) => {
    images.forEach((image) => {
      image.loading = 'eager';
    });
    await Promise.all(images.map((image) => image.decode().catch(() => {})));
  });
  if (name.includes('testimonials')) {
    const rect = await page.locator('.testimonial-story').first().boundingBox();
    await page.mouse.move(rect.x + 10, rect.y + 12);
    await page.waitForTimeout(250);
  }
  await section.screenshot({ path: `artifacts/${name}.png` });
}
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://127.0.0.1:5173/');
await page.locator('.services-bento').scrollIntoViewIfNeeded();
await page.locator('.services-bento').screenshot({ path: 'artifacts/unique-services-mobile.png' });
await browser.close();
