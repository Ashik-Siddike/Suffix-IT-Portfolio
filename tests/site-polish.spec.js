import { test, expect } from '@playwright/test';
import fs from 'node:fs';

const copy = JSON.parse(fs.readFileSync('src/data/original-page-copy.json', 'utf8'));
const published = JSON.parse(fs.readFileSync('src/data/published-pages.json', 'utf8'));

test('source headings and original body paragraphs replace marketing copy', async ({ page }) => {
  for (const route of ['/contact', '/product/payroll-system', '/product/e-commerce', '/career']) {
    await page.goto(route);
    await expect(
      page.getByRole('heading', { level: 1, name: copy[route].title, exact: true }),
    ).toBeVisible();
    if (route.includes('/product/')) {
      for (const block of published[route].blocks.filter((block) => block.tag === 'p')) {
        await expect(page.locator('main')).toContainText(block.text);
      }
      await expect(page.getByText('Built around your requirements.', { exact: true })).toHaveCount(
        0,
      );
    }
  }
});

test('product category combines with search and clears both filters', async ({ page }) => {
  await page.goto('/products');
  await page.getByLabel('Category').selectOption('HR & Workforce');
  await expect(page.locator('.product-card')).toHaveCount(3);
  await page.getByRole('searchbox').fill('Payroll');
  await expect(page.locator('.product-card')).toHaveCount(1);
  await page.getByLabel('Category').selectOption('Hospitality');
  await expect(page.locator('.product-card')).toHaveCount(0);
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('.product-card')).toHaveCount(10);
});

test('mobile hero fits and generated art uses responsive image candidates', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const image = page.locator('.hero-stage-object img');
  await image.evaluate((img) => img.decode());
  expect(await image.evaluate((img) => img.currentSrc)).toContain('/optimized/presentation-');
  await expect(page.locator('.hero-stage-object picture source')).toHaveAttribute(
    'srcset',
    /320w.*640w.*960w/,
  );
  const hero = await page.locator('.home-hero').boundingBox();
  expect(hero.height).toBeLessThan(750);
  await expect(page.locator('.hero-neon-canvas')).toHaveCount(0);
});
