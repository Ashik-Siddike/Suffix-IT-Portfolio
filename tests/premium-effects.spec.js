import { test, expect } from '@playwright/test';

test('Home hero reacts to the pointer, resets on leave and stays still with reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const stage = page.locator('.hero-technology-stage');
  await expect(stage).toHaveCSS('opacity', '1');
  const rect = await stage.boundingBox();
  await page.mouse.move(rect.x + rect.width * 0.9, rect.y + rect.height * 0.3);
  await expect
    .poll(() => stage.evaluate((el) => parseFloat(el.style.getPropertyValue('--stage-x'))))
    .toBeGreaterThan(4);
  await page.mouse.move(0, 0);
  await expect
    .poll(() => stage.evaluate((el) => el.style.getPropertyValue('--stage-x')))
    .toBe('0px');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.mouse.move(rect.x + rect.width * 0.9, rect.y + rect.height * 0.3);
  await expect(page.locator('.hero-stage-object')).toHaveCSS('transform', 'none');
});

test('ambient canvases respond, pause offscreen and follow live motion preferences', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const [route, selector] of [
    ['/about', '.fractal-bloom-canvas'],
    ['/contact', '.neon-flow-canvas'],
  ]) {
    await page.goto(route);
    const canvas = page.locator(selector);
    await expect(canvas).toHaveAttribute('data-motion', 'animated');
    const rect = await canvas.boundingBox();
    await page.mouse.move(rect.x + rect.width * 0.8, rect.y + rect.height * 0.4);
    await expect(canvas).toHaveAttribute('data-pointer', 'active');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(canvas).toHaveAttribute('data-motion', 'paused');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(canvas).toHaveAttribute('data-motion', 'static');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
  }
});

test('transformer gallery zooms on desktop scroll and becomes a grid on mobile or reduced motion', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/product/transformer-monitoring');
  const gallery = page.locator('.zoom-parallax');
  await expect(gallery).toHaveClass(/is-zooming/);
  await expect(gallery.locator('img')).toHaveCount(7);
  const initial = await page
    .locator('.zoom-tile-0')
    .evaluate((el) => getComputedStyle(el).transform);
  await gallery.evaluate((el) =>
    window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top + el.clientHeight * 0.4),
  );
  await expect
    .poll(() => page.locator('.zoom-tile-0').evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(initial);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(gallery).toHaveClass(/is-static/);
  await expect(gallery.locator('.zoom-tile')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(gallery).toHaveClass(/is-static/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});
