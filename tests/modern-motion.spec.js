import { test, expect } from '@playwright/test';

test('hero types, deletes and rotates copy without changing layout, and pauses offscreen', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const title = page.locator('.hero-typewriter-visible');
  const heading = page.locator('.hero-copy h1');
  await expect(title).toHaveText('We care about the IT Solution you need', { timeout: 6000 });
  const before = await heading.boundingBox();
  await expect(title).toHaveText('We Dream Big and  Win Together', { timeout: 12000 });
  const after = await heading.boundingBox();
  expect(after.height).toBeCloseTo(before.height, 0);
  await page.locator('#services').scrollIntoViewIfNeeded();
  const paused = await title.textContent();
  await page.waitForTimeout(350);
  expect(await title.textContent()).toBe(paused);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(title).toHaveText('We care about the IT Solution you need');
  await expect(page.locator('.hero-typewriter-caret')).toHaveCount(0);
});

test('card background straightens on hover and motion is disabled for reduced preferences', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/services');
  const card = page.locator('.modern-card-shell').first();
  await card.scrollIntoViewIfNeeded();
  const back = () => card.evaluate((el) => getComputedStyle(el, '::before').transform);
  const initial = await back();
  await card.hover();
  await expect.poll(back).not.toBe(initial);
  await expect
    .poll(() => card.evaluate((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).a))
    .toBeGreaterThan(1.005);
  await page.screenshot({ path: 'artifacts/modern-services-cards.png' });
  await page.mouse.move(0, 0);
  await expect
    .poll(() => card.evaluate((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).a))
    .toBe(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await card.hover();
  await expect
    .poll(() => card.evaluate((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).a))
    .toBe(1);
});
