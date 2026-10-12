import { test, expect } from '@playwright/test';
import fs from 'node:fs';

const original = JSON.parse(fs.readFileSync('src/data/home-original.json', 'utf8'));

test('company circuit reveals on scroll and reduced motion shows all original values immediately', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/about');
  await expect(page.getByRole('heading', { level: 1, name: 'About Us' })).toBeVisible();
  const path = page.locator('.company-circuit-path.is-desktop');
  await expect(path).toHaveAttribute('data-revealed', 'false');
  await path.scrollIntoViewIfNeeded();
  await expect(path).toHaveAttribute('data-revealed', 'true');
  await expect(path.locator('.circuit-trace').first()).toHaveCSS('opacity', '1');
  await expect(path.locator('.circuit-node').last()).toHaveCSS('opacity', '1');
  const titles = await page.locator('#our-company h3').allTextContents();
  expect(titles).toEqual(original.companyCards);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.company-circuit-card').first()).toHaveCSS('opacity', '1');
  await expect(page.locator('.company-circuit-card').last()).toHaveCSS('opacity', '1');
  await expect(page.locator('.company-circuit-path.is-mobile')).toHaveAttribute(
    'data-revealed',
    'true',
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(path).toBeHidden();
  await expect(page.locator('.company-circuit-path.is-mobile')).toBeVisible();
});
