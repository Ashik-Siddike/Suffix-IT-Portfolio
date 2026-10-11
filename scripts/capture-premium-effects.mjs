import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'no-preference',
});
for (const [route, selector, name] of [
  ['/about', '.about-original-hero', 'premium-fractal-about'],
  ['/contact', '.neon-flow', 'premium-flow-contact'],
  ['/product/transformer-monitoring', '.zoom-parallax-stage', 'premium-zoom-transformer'],
]) {
  await page.goto('http://127.0.0.1:5173' + route);
  const section = page.locator(selector);
  await section.waitFor();
  if (name.includes('zoom')) {
    await page
      .locator('.zoom-parallax')
      .evaluate((el) => window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - 110));
  }
  await section.locator('img').evaluateAll(async (images) => {
    images.forEach((image) => {
      image.loading = 'eager';
    });
    await Promise.all(images.map((image) => image.decode()));
  });
  await page.waitForTimeout(name.includes('fractal') ? 6000 : 1200);
  await section.screenshot({ path: `artifacts/${name}.png` });
}
await page.setViewportSize({ width: 390, height: 844 });
await page.locator('.zoom-parallax').scrollIntoViewIfNeeded();
await page.locator('.zoom-parallax').screenshot({ path: 'artifacts/premium-gallery-mobile.png' });
await browser.close();
