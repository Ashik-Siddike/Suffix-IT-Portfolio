import { test, expect } from '@playwright/test';
import { services, products } from '../src/data/catalog.js';

test('marquee links route correctly and middle badges switch from blue to light', async ({
  page,
}) => {
  await page.goto('/');
  const section = page.locator('.capability-marquee-three');
  await section.scrollIntoViewIfNeeded();
  const hrefs = await section
    .locator('.ui-marquee-group:first-child a')
    .evaluateAll((es) => es.map((e) => e.getAttribute('href')));
  const valid = new Set([...services, ...products].map((item) => item.path));
  expect(hrefs.filter((href) => href.startsWith('/') && !valid.has(href))).toEqual([]);
  const badge = section.locator('.capability-row-2 .ui-marquee-group').first().locator('a').first();
  await expect(badge).toHaveCSS('background-color', 'rgb(0, 114, 188)');
  await badge.hover();
  await expect(badge).toHaveCSS('color', 'rgb(7, 90, 145)');
  await section
    .locator('.capability-row-1 .ui-marquee-group')
    .first()
    .getByRole('link', { name: 'ERP Consulting', exact: true })
    .click();
  await expect(page).toHaveURL(/\/service\/erp-consulting$/);
  await expect(page.locator('main h1')).toBeVisible();
});

test('desktop dropdown opens on hover and keeps links reachable across the gap', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  for (const name of ['Products', 'IoT', 'Services']) {
    const trigger = page.locator('.desktop-nav').getByRole('button', { name, exact: true });
    await trigger.hover();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const menu = page.locator(`#desktop-${name.toLowerCase()}`);
    await menu.locator('.dropdown-links a').first().hover();
    await expect(menu).toBeVisible();
    await page.mouse.move(0, 450);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  }
});

test('product image click opens the related detail page', async ({ page }) => {
  await page.goto('/');
  const preview = page.locator('.squeeze-panel').first();
  await preview.scrollIntoViewIfNeeded();
  await preview.click();
  await expect(page).toHaveURL(/\/product\/payroll-system$/);
  await expect(page.locator('main h1')).toHaveText('HR & Payroll Modules');
});
