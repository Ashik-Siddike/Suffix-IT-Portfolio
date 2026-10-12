import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';

const published = JSON.parse(fs.readFileSync('src/data/published-pages.json', 'utf8'));

test('production hero paints before application code and keeps the same image during hydration', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  let release;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  await page.route('**/assets/index-*.js', async (route) => {
    await gate;
    await route.continue();
  });
  try {
    await page.goto('/', { waitUntil: 'commit' });
    await expect(page.locator('.home-hero h1')).toBeVisible();
    await expect(page.locator('.hero-stage-object img')).toBeVisible();
    await page.evaluate(() => {
      window.firstHeroImage = document.querySelector('.hero-stage-object img');
    });
  } finally {
    release();
  }
  await expect(page.locator('.hero-curves')).toHaveAttribute('data-motion', 'active');
  expect(
    await page.evaluate(
      () => window.firstHeroImage === document.querySelector('.hero-stage-object img'),
    ),
  ).toBe(true);
});

test('new homepage software section uses authentic linked screens and accessible previews', async ({
  page,
}) => {
  await page.goto('/');
  const section = page.locator('#software-in-action');
  await section.scrollIntoViewIfNeeded();
  await expect(section.locator('.software-preview')).toHaveCount(3);
  await expect(section.locator('.software-story-circuit .software-circuit-node')).toHaveCount(11);
  await expect(
    section.getByRole('link', { name: 'Explore Field Force Management Platform' }),
  ).toHaveAttribute('href', '/product/field-force-management');
  await expect(section.getByRole('link', { name: 'Explore IEMS Dashboard' })).toHaveAttribute(
    'href',
    '/service/Industrial-Monitoring',
  );
  expect(
    await section.evaluate((el) =>
      Boolean(
        document.querySelector('#products').compareDocumentPosition(el) &
        Node.DOCUMENT_POSITION_FOLLOWING,
      ),
    ),
  ).toBe(true);
  await section.getByRole('button', { name: 'View full screen' }).first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog').locator('img')).toHaveAttribute(
    'src',
    '/assets/field-force.497227c8.png',
  );
  await expect(page.getByRole('button', { name: 'Close preview' }).first()).toBeFocused();
  await page.getByRole('dialog').getByRole('slider', { name: 'Zoom' }).fill('2');
  await expect(page.getByRole('dialog').locator('.software-preview-zoom')).toContainText('200%');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(section.getByRole('button', { name: 'View full screen' }).first()).toBeFocused();
  expect(
    (await new AxeBuilder({ page }).include('#software-in-action').analyze()).violations,
  ).toEqual([]);
});

test('original product headings navigate to visible sections below the fixed header', async ({
  page,
}) => {
  for (const path of [
    '/product/payroll-system',
    '/product/rupantor-erp',
    '/product/field-force-management',
  ]) {
    await page.goto(path);
    const nav = page.getByRole('navigation', { name: 'On this page' });
    await expect(nav).toBeVisible();
    for (const block of published[path].blocks.filter((block) => block.tag === 'p'))
      await expect(page.locator('main')).toContainText(block.text);
    const link = nav.getByRole('link').nth(2);
    const hash = await link.getAttribute('href');
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${hash}$`));
    const destination = page.locator(hash);
    await expect(destination).toBeInViewport();
    expect((await destination.boundingBox()).y).toBeGreaterThanOrEqual(100);
  }
});

test('hero first frame is complete and mobile layouts stay within the viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('.hero-typewriter-visible')).toHaveText(
    'We care about the IT Solution you need',
  );
  await expect(page.locator('link[rel="preload"][as="image"]')).toHaveAttribute(
    'imagesrcset',
    /320w.*768w.*1200w/,
  );
  for (const path of ['/', '/about', '/product/payroll-system', '/contact']) {
    await page.goto(path);
    await page.locator('main h1').waitFor();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      path,
    ).toBe(true);
  }
  await page.goto('/about');
  await expect(page.locator('.company-photo img')).toHaveAttribute(
    'src',
    '/assets/company-original.png',
  );
});

test('footer drawing pauses out of view and honors a live reduced-motion change', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const drawing = page.locator('.footer-drawing-background');
  await expect(drawing).toHaveAttribute('data-motion', 'paused');
  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(drawing).toHaveAttribute('data-motion', 'active');
  await expect(drawing.locator('.path-drawing-ink')).toHaveCSS('animation-play-state', 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(drawing.locator('.path-drawing-ink')).toHaveCSS('animation-name', 'none');
  expect((await new AxeBuilder({ page }).include('footer').analyze()).violations).toEqual([]);
});
