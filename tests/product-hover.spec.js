import { test, expect } from '@playwright/test';

test('hover expands the product and updates its details without a click', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const carousel = page.locator('.squeeze-carousel');
  await carousel.scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Pause product autoplay' }).click();
  const products = carousel.getByRole('tab');
  const target = products.nth(2);
  const title = await target.getAttribute('aria-label');
  await target.hover();
  await expect(target).toHaveAttribute('aria-selected', 'true');
  await expect(carousel.getByRole('tabpanel').getByRole('heading')).toHaveText(title);
  await expect.poll(async () => (await target.boundingBox()).width).toBeGreaterThan(300);
  await products.nth(4).hover();
  await expect(products.nth(4)).toHaveAttribute('aria-selected', 'true');
  await expect.poll(async () => (await target.boundingBox()).width).toBeLessThan(150);
});
