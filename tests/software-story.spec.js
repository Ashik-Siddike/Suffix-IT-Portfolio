import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function prepare(page, width = 1440, height = 1000) {
  await page.setViewportSize({ width, height });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('.hero-curves')).toHaveAttribute('data-motion', 'active');
  await page.evaluate(() => document.fonts.ready);
  const root = page.locator('#software-in-action');
  const top = await root.evaluate((root) => root.getBoundingClientRect().top + scrollY);
  await page.evaluate((top) => scrollTo({ top: top - 1200, behavior: 'instant' }), top);
  await root.locator('img').evaluateAll((images) =>
    Promise.all(
      images.map((image) => {
        image.loading = 'eager';
        return image.decode();
      }),
    ),
  );
  await expect(root).toHaveAttribute('data-story-mode', width >= 1000 ? 'horizontal' : 'vertical');
  if (width >= 1000) {
    await expect(root).toHaveAttribute('data-story-start', /^\d+(\.\d+)?$/);
    await expect(root).toHaveAttribute('data-story-end', /^\d+(\.\d+)?$/);
  }
  return root;
}

async function geometry(root) {
  return root.evaluate((root) => {
    const viewport = root.querySelector('.software-story-viewport');
    const track = root.querySelector('.software-story-track');
    const pin = root.querySelector('.software-story-pin').getBoundingClientRect();
    const header = document.querySelector('.site-header').getBoundingClientRect();
    return {
      start: Number(root.dataset.storyStart),
      end: Number(root.dataset.storyEnd),
      distance: track.scrollWidth - viewport.clientWidth,
      width: viewport.clientWidth,
      height: pin.height,
      pinTop: pin.top,
      headerBottom: header.bottom,
      nextTop: root.nextElementSibling.getBoundingClientRect().top,
      progress: Number(root.dataset.storyProgress),
      hold: Math.min(140, root.querySelector('.software-story-size-probe').clientHeight * 0.16),
      x: new DOMMatrixReadOnly(getComputedStyle(track).transform).m41,
      path: parseFloat(
        getComputedStyle(root.querySelector('.software-circuit-progress')).strokeDashoffset,
      ),
    };
  });
}

async function scrollTo(page, top) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), top);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(Math.round(top));
  await page.evaluate(() => new Promise(requestAnimationFrame));
}

function near(actual, expected, tolerance = 2) {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);
}

for (const [width, height] of [
  [1024, 768],
  [1440, 1000],
  [1920, 1080],
]) {
  test(`pinned horizontal software journey follows native scroll and reverses at ${width}x${height}`, async ({
    page,
  }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    const root = await prepare(page, width, height);
    const initial = await geometry(root);
    const chapters = root.locator('.software-story-scene');
    await expect(chapters).toHaveCount(11);
    near(initial.end - initial.start, initial.distance + initial.hold * 2);
    const slugs = await chapters.evaluateAll((scenes) =>
      scenes.map((scene) => scene.dataset.product),
    );
    expect(slugs).toEqual([
      'field-force-management',
      'rupantor-erp',
      'payroll-system',
      'interconnect-billing',
      'e-commerce',
      'provident-fund',
      'hotel-booking-system',
      'rupantor-inventory',
      'pos-system',
      'transformer-monitoring',
      'Industrial-Monitoring',
    ]);
    await expect(root.locator('.is-primary .software-story-illustration figcaption')).toHaveCount(
      9,
    );
    for (const index of [0, 1, 5, 9, 10]) {
      const progress = index / 10;
      await scrollTo(page, initial.start + initial.hold + initial.distance * progress);
      await expect(root).toHaveAttribute('data-story-current-index', String(index));
      const frame = await geometry(root);
      near(frame.pinTop, frame.headerBottom);
      near(frame.x, -initial.distance * progress);
      near(frame.path, 1 - progress, 0.001);
      near(frame.progress, progress, 0.001);
      near((await chapters.nth(index).boundingBox()).x, 0);
      await expect(root.locator('[data-story-counter]')).toHaveText(
        String(index + 1).padStart(2, '0'),
      );
      await expect(root.locator('.software-circuit-node[data-active="true"]')).toHaveCount(
        index + 1,
      );
      const scene = chapters.nth(index);
      const visuals = scene.locator('.software-visual-item');
      expect(await visuals.count()).toBeGreaterThanOrEqual(2);
      const imageSources = await visuals
        .locator('figure > picture > img, figure > img, .software-device img')
        .evaluateAll((images) => images.map((image) => image.getAttribute('src')));
      expect(new Set(imageSources).size).toBe(imageSources.length);
      const content = await scene.locator('.software-story-scene-inner').boundingBox();
      expect(content.x).toBeGreaterThanOrEqual(20);
      expect(content.x + content.width).toBeLessThanOrEqual(width - 20);
      expect(content.y).toBeGreaterThan(frame.headerBottom);
      expect(content.y + content.height).toBeLessThan(height);
      const footer = await root.locator('.software-story-footer').boundingBox();
      expect(footer.y - (content.y + content.height)).toBeLessThanOrEqual(64);
      const link = scene.locator('.software-story-copy > a');
      await expect(link).toHaveAttribute('tabindex', '0');
      await expect(link).toHaveAttribute(
        'href',
        index === 10 ? '/service/Industrial-Monitoring' : `/product/${slugs[index]}`,
      );
    }
    // Beginning and final holds keep the complete chapter visible, without autoplay.
    await scrollTo(page, initial.start + initial.hold / 2);
    near((await geometry(root)).x, 0);
    await scrollTo(page, initial.end - initial.hold / 2);
    near((await geometry(root)).x, -initial.distance);
    const beforeExit = await geometry(root);
    await scrollTo(page, initial.end + 180);
    const exited = await geometry(root);
    near(exited.pinTop, beforeExit.pinTop - 180);
    near(exited.nextTop, height - 180);
    await scrollTo(page, initial.start + initial.hold + initial.distance * 0.2);
    const reversed = await geometry(root);
    near(reversed.x, -initial.distance * 0.2);
    near(reversed.path, 0.8, 0.001);
    await expect(root).toHaveAttribute('data-story-current-index', '2');
    await expect(root.locator('.pin-spacer')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    expect(errors).toEqual([]);
  });
}

test('wheel and keyboard advance the same timeline, previews work and route cleanup leaves no errors', async ({
  page,
}) => {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  const root = await prepare(page, 1280, 720);
  const initial = await geometry(root);
  await scrollTo(page, initial.start + initial.hold);
  await page.mouse.move(10, 250);
  await page.mouse.wheel(0, 200);
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBe(Math.round(initial.start + initial.hold) + 200);
  near((await geometry(root)).x, -200);
  await page.keyboard.press('ArrowDown');
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBe(Math.round(initial.start + initial.hold) + 240);
  near((await geometry(root)).x, -240);
  await scrollTo(page, initial.start + initial.hold / 2);
  await root.getByRole('button', { name: 'View full screen' }).first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  const result = await new AxeBuilder({ page })
    .include('#software-in-action')
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  expect(result.violations).toEqual([]);
  await root.locator('.software-story-copy > a').first().click();
  await expect(page).toHaveURL(/\/product\/field-force-management$/);
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('resize, short heights and live reduced motion cleanly restore readable vertical chapters', async ({
  page,
}) => {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  const root = await prepare(page);
  for (const [width, height] of [
    [390, 844],
    [1440, 500],
    [1440, 1000],
  ]) {
    await page.setViewportSize({ width, height });
    await expect(root).toHaveAttribute(
      'data-story-mode',
      height === 1000 ? 'horizontal' : 'vertical',
    );
    await expect(root.locator('.pin-spacer')).toHaveCount(height === 1000 ? 1 : 0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(root).toHaveAttribute('data-story-mode', 'vertical');
  await expect(root.locator('.pin-spacer')).toHaveCount(0);
  await expect(root.locator('.software-story-scene[aria-hidden="true"]')).toHaveCount(0);
  await expect(root.locator('a[tabindex="-1"]')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(root).toHaveAttribute('data-story-mode', 'horizontal');
  await expect(root.locator('.pin-spacer')).toHaveCount(1);
  expect(errors).toEqual([]);
});

for (const width of [360, 390, 768]) {
  test(`mobile software stories preserve all chapters and usable imagery at ${width}px`, async ({
    page,
  }) => {
    const root = await prepare(page, width, width === 768 ? 1024 : 844);
    await expect(root.locator('.software-story-scene')).toHaveCount(11);
    await expect(root.locator('.pin-spacer')).toHaveCount(0);
    for (const scene of await root.locator('.software-story-scene').all()) {
      await scene.scrollIntoViewIfNeeded();
      const copy = await scene.locator('.software-story-copy').boundingBox();
      const image = await scene.locator('.software-story-visual').boundingBox();
      expect(image.width).toBeGreaterThan(width * 0.7);
      expect(image.y).toBeGreaterThanOrEqual(copy.y + copy.height);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  });
}

test('homepage content and software links remain readable before the animation chunk loads', async ({
  page,
}) => {
  const requests = [];
  page.on('request', (request) => {
    if (/SoftwareScrollController/.test(request.url())) requests.push(request.url());
  });
  await page.goto('/');
  await expect(page.locator('.home-hero h1')).toBeVisible();
  await expect(page.locator('#software-in-action .software-story-scene')).toHaveCount(11);
  expect(requests).toEqual([]);
});

test('fast scrolling past an uninitialized story keeps the footer in normal flow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const footer = page.locator('footer');
  await footer.scrollIntoViewIfNeeded();
  await expect(footer).toBeInViewport();
  await expect(page.locator('#software-in-action')).toHaveAttribute('data-story-mode', 'vertical');
  await expect(page.locator('#software-in-action .pin-spacer')).toHaveCount(0);
  await expect(footer.getByRole('link', { name: 'Contact Us' })).toBeInViewport();
});

test('a late-loading diagram preserves the final chapter and native scroll position', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  let release;
  let requested = false;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  await page.route('**/optimized/presentation-iems-diagram-*.webp', async (route) => {
    requested = true;
    await gate;
    await route.continue();
  });
  try {
    await page.goto('/');
    await expect(page.locator('.hero-curves')).toHaveAttribute('data-motion', 'active');
    await page.evaluate(() => document.fonts.ready);
    const root = page.locator('#software-in-action');
    const top = await root.evaluate((root) => root.getBoundingClientRect().top + scrollY);
    await scrollTo(page, top - 1200);
    await expect(root).toHaveAttribute('data-story-end', /^\d+(\.\d+)?$/);
    const initial = await geometry(root);
    const finalScroll = Math.round(initial.end - initial.hold / 2);
    await scrollTo(page, finalScroll);
    await expect.poll(() => requested).toBe(true);
    release();
    await root.locator('.is-diagram img').evaluate((image) => image.decode());
    // Let native scroll settle and all delayed image handlers complete.
    await page.waitForLoadState('networkidle');
    expect(await page.evaluate(() => scrollY)).toBe(finalScroll);
    await expect(root).toHaveAttribute('data-story-current-index', '10');
    const final = await geometry(root);
    near(final.x, -initial.distance);
    near(final.path, 0, 0.001);
  } finally {
    release();
  }
});
