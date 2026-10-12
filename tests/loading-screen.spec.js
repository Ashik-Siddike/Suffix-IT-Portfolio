import { test, expect } from '@playwright/test';

test('reload shows branded bouncing loader while application code loads', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  let release;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  await page.route('**/assets/index-*.js', async (route) => {
    await gate;
    await route.continue();
  });
  await page.goto('/about', { waitUntil: 'commit' });
  const loader = page.getByRole('status', { name: 'Loading Suffix IT' });
  try {
    await expect(loader).toBeVisible();
    await expect(loader.locator('img')).toHaveAttribute('alt', 'Suffix IT');
    await expect(loader.locator('.brand-loading-lane')).toHaveCount(4);
    const ball = loader.locator('.brand-loading-lane i').first();
    const before = await ball.evaluate((el) => getComputedStyle(el).transform);
    await expect.poll(() => ball.evaluate((el) => getComputedStyle(el).transform)).not.toBe(before);
    await page.screenshot({ path: 'artifacts/brand-loading-screen.png' });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(ball).toHaveCSS('animation-name', 'none');
  } finally {
    release();
  }
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(loader).toHaveCount(0);
});

for (const width of [390, 1440]) {
  test(`client ribbon logos are compact and contained at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.locator('.client-marquee').scrollIntoViewIfNeeded();
    const card = page.locator('.marquee-logo').first();
    const sizes = await card.evaluate((el) => {
      const frame = el.getBoundingClientRect();
      const image = el.querySelector('img').getBoundingClientRect();
      return {
        height: frame.height,
        imageHeight: image.height,
        fits: image.width < frame.width && image.height < frame.height,
      };
    });
    expect(sizes.height).toBeLessThanOrEqual(84);
    expect(sizes.height).toBeGreaterThanOrEqual(44);
    expect(sizes.imageHeight).toBeLessThanOrEqual(48);
    await expect(card.locator('.client-name')).toHaveText('AKT');
    expect(sizes.fits).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  });
}
