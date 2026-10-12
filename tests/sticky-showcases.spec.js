import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';

const original = JSON.parse(fs.readFileSync('src/data/home-original.json', 'utf8'));
const panelIds = ['why-choose-us', 'field-force', 'call-center'];

async function prepare(page, width = 1440, height = 1000) {
  await page.setViewportSize({ width, height });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const images = page.locator('.home-sticky-showcases img');
  await images.evaluateAll((images) => images.forEach((image) => (image.loading = 'eager')));
  await images.evaluateAll((images) => Promise.all(images.map((image) => image.decode())));
  await page.mouse.move(0, 0);
}

async function geometry(page) {
  return page.evaluate(() => {
    const stack = document.querySelector('.home-sticky-showcases');
    const header = document.querySelector('.site-header').getBoundingClientRect();
    const panels = [...stack.querySelectorAll('.sticky-showcase-panel')];
    const bounds = stack.getBoundingClientRect();
    return {
      start: bounds.top + scrollY - header.bottom,
      headerBottom: header.bottom,
      height: innerHeight - header.bottom,
      stackHeight: bounds.height,
      viewportWidth: innerWidth,
      viewportHeight: innerHeight,
      panels: panels.map((panel) => {
        const rect = panel.getBoundingClientRect();
        const style = getComputedStyle(panel);
        const content = panel.querySelector('.sticky-showcase-grid').getBoundingClientRect();
        return {
          id: panel.id,
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          bottom: rect.bottom,
          contentTop: content.top,
          contentBottom: content.bottom,
          background: style.backgroundColor,
          transform: style.transform,
          opacity: style.opacity,
          radius: style.borderRadius,
          shadow: style.boxShadow,
        };
      }),
      nextTop: document.querySelector('#services').getBoundingClientRect().top,
    };
  });
}

async function scrollTo(page, top) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), top);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(Math.round(top));
  // Wait for a browser frame so bounding boxes and hit testing use the same scroll position.
  await page.evaluate(() => new Promise(requestAnimationFrame));
}

async function visiblePanel(page, y) {
  return page.evaluate(
    (y) => document.elementFromPoint(10, y)?.closest('.sticky-showcase-panel')?.id,
    y,
  );
}

for (const [width, height] of [
  [1440, 1000],
  [1366, 768],
  [1024, 768],
]) {
  test(`native full-width panels cover each other and exit without gaps at ${width}x${height}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await prepare(page, width, height);
    await expect(page.locator('.home-sticky-showcases')).toHaveAttribute(
      'data-scroll-mode',
      'sticky',
    );
    const initial = await geometry(page);
    const { start, headerBottom: top, height: panelHeight } = initial;
    expect(initial.stackHeight).toBeCloseTo(3 * panelHeight, 0);
    expect(initial.panels.map((panel) => panel.background)).toEqual([
      'rgb(255, 255, 255)',
      'rgb(7, 90, 145)',
      'rgb(231, 243, 252)',
    ]);
    const ancestors = await page.locator('.home-sticky-showcases').evaluate((stack) => {
      const result = [];
      for (let element = stack; element; element = element.parentElement) {
        const style = getComputedStyle(element);
        result.push({
          overflowX: style.overflowX,
          overflowY: style.overflowY,
          transform: style.transform,
        });
      }
      return result;
    });
    for (const ancestor of ancestors) {
      expect(['hidden', 'auto', 'scroll']).not.toContain(ancestor.overflowX);
      expect(['hidden', 'auto', 'scroll']).not.toContain(ancestor.overflowY);
      expect(ancestor.transform).toBe('none');
    }

    for (const index of [0, 1, 2]) {
      await scrollTo(page, start + index * panelHeight);
      const state = await geometry(page);
      const current = state.panels[index];
      expect(current.y).toBeCloseTo(top, 0);
      expect(current.bottom).toBeCloseTo(height, 0);
      expect(current.x).toBe(0);
      expect(current.width).toBe(width);
      expect(current.contentTop).toBeGreaterThanOrEqual(top);
      expect(current.contentBottom).toBeLessThanOrEqual(height);
      expect(current.transform).toBe('none');
      expect(current.opacity).toBe('1');
      expect(current.radius).toBe('0px');
      expect(current.shadow).toBe('none');
      for (const y of [top + 2, top + panelHeight / 2, height - 2]) {
        expect(await visiblePanel(page, y)).toBe(panelIds[index]);
      }
      // Header remains above the complete stack, with usable navigation.
      expect(
        await page.evaluate(() => !!document.elementFromPoint(10, 20)?.closest('.site-header')),
      ).toBe(true);
      if (index === 2) continue;
      for (const progress of [0.25, 0.5, 0.75, 0.95]) {
        await scrollTo(page, start + (index + progress) * panelHeight);
        const frame = await geometry(page);
        expect(frame.panels[index].y).toBeCloseTo(top, 0);
        const incomingTop = frame.panels[index + 1].y;
        expect(Math.abs(incomingTop - (height - progress * panelHeight))).toBeLessThanOrEqual(1);
        expect(await visiblePanel(page, incomingTop - 2)).toBe(panelIds[index]);
        expect(await visiblePanel(page, incomingTop + 2)).toBe(panelIds[index + 1]);
      }
    }

    // The final panel exits at the same rate as document scrolling; earlier panels stay covered.
    await scrollTo(page, start + 2 * panelHeight + 160);
    let state = await geometry(page);
    expect(state.panels[2].y).toBeCloseTo(top - 160, 0);
    expect(state.nextTop).toBeCloseTo(height - 160, 0);
    expect(await visiblePanel(page, state.nextTop - 2)).toBe('call-center');
    expect(await visiblePanel(page, state.nextTop + 2)).toBeUndefined();
    await scrollTo(page, start + 3 * panelHeight);
    state = await geometry(page);
    expect(state.nextTop).toBeCloseTo(top, 0);
    expect(state.panels[2].bottom).toBeCloseTo(top, 0);
    expect(await visiblePanel(page, top + 2)).toBeUndefined();

    // Reverse scroll returns through the same covering geometry.
    for (const index of [1, 0]) {
      await scrollTo(page, start + (index + 0.5) * panelHeight);
      const frame = await geometry(page);
      expect(frame.panels[index].y).toBeCloseTo(top, 0);
      expect(Math.abs(frame.panels[index + 1].y - (top + panelHeight / 2))).toBeLessThanOrEqual(1);
      expect(await visiblePanel(page, top + 2)).toBe(panelIds[index]);
      expect(await visiblePanel(page, height - 2)).toBe(panelIds[index + 1]);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  });
}

test('wheel, keyboard, reduced motion and covered-link focus use accessible native scrolling', async ({
  page,
}) => {
  await prepare(page, 1280, 720);
  await expect(page.locator('.home-sticky-showcases')).toHaveAttribute(
    'data-scroll-mode',
    'sticky',
  );
  const { start, height, headerBottom } = await geometry(page);
  await scrollTo(page, start);
  await page.mouse.wheel(0, 200);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(Math.round(start) + 200);
  expect((await geometry(page)).panels[0].y).toBe(headerBottom);
  await page.keyboard.press('ArrowDown');
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(Math.round(start) + 240);
  await scrollTo(page, start + 2 * height);
  const errors = [];
  for (const [index, id] of panelIds.entries()) {
    await scrollTo(page, start + index * height);
    const result = await new AxeBuilder({ page })
      .include(`#${id}`)
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    errors.push(...result.violations);
  }
  expect(errors).toEqual([]);
  const firstLink = page.locator('#why-choose-us').getByRole('link', { name: 'Learn More' });
  await firstLink.focus();
  expect(await visiblePanel(page, headerBottom + 2)).toBe('why-choose-us');
  await firstLink.click();
  await expect(page).toHaveURL(/\/about$/);
});

test('short viewports and mobile fall back according to actual content fit, then restore pinning on resize', async ({
  page,
}) => {
  await prepare(page);
  const stack = page.locator('.home-sticky-showcases');
  await expect(stack).toHaveAttribute('data-scroll-mode', 'sticky');
  for (const [width, height] of [
    [360, 740],
    [390, 844],
    [768, 1024],
    [1440, 500],
  ]) {
    await page.setViewportSize({ width, height });
    await scrollTo(page, 0);
    await expect
      .poll(async () => {
        const state = await geometry(page);
        return state.panels.every(
          (panel) => panel.contentTop >= panel.y && panel.contentBottom <= panel.bottom,
        );
      })
      .toBe(true);
    const panels = page.locator('.sticky-showcase-panel');
    expect(await panels.locator('h2').allTextContents()).toEqual([
      original.whyTitle,
      original.fieldTitle,
      original.callTitle,
    ]);
    if (width === 768) {
      await expect(stack).toHaveAttribute('data-scroll-mode', 'sticky');
    } else {
      await expect(stack).toHaveAttribute('data-scroll-mode', 'flow');
      for (const panel of await panels.all()) {
        await expect(panel).toHaveCSS('position', 'relative');
        const natural = await panel.evaluate((el) => el.getBoundingClientRect().top + scrollY);
        await scrollTo(page, natural);
        expect((await panel.boundingBox()).y).toBeCloseTo(0, 0);
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(stack).toHaveAttribute('data-scroll-mode', 'sticky');
  // A real header-height change must move every sticky top together.
  await page.locator('.header-inner').evaluate((header) => (header.style.minHeight = '120px'));
  await expect
    .poll(() =>
      stack.evaluate((el) => getComputedStyle(el).getPropertyValue('--sticky-header-height')),
    )
    .toBe('121px');
  const updated = await geometry(page);
  await scrollTo(page, updated.start + updated.height);
  expect((await geometry(page)).panels[1].y).toBe(121);
});

test('Suffix IT watermark follows the pointer and stops reacting when reduced motion is enabled', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const section = page.locator('.capability-marquee-three');
  await section.scrollIntoViewIfNeeded();
  const svg = section.locator('.text-hover-effect');
  await expect(svg).toHaveAttribute('aria-hidden', 'true');
  await expect(svg.locator('text').first()).toHaveText('SUFFIX IT');
  const bounds = await svg.boundingBox();
  const gradient = svg.locator('radialGradient');
  await page.mouse.move(bounds.x + bounds.width * 0.15, bounds.y + bounds.height * 0.4);
  await expect(svg).toHaveAttribute('data-hovered', 'true');
  await expect.poll(async () => Number(await gradient.getAttribute('cx'))).toBeLessThan(200);
  await page.mouse.move(bounds.x + bounds.width * 0.8, bounds.y + bounds.height * 0.4);
  await expect.poll(async () => Number(await gradient.getAttribute('cx'))).toBeGreaterThan(400);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(svg).toHaveAttribute('data-hovered', 'false');
  await expect(gradient).toHaveAttribute('cx', '300');
});
