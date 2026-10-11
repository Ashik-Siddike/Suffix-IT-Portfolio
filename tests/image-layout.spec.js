import { test, expect } from '@playwright/test';

for (const width of [390, 1440]) {
  test(`illustration frames contain images and leave text spacing at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      '/',
      '/about',
      '/products',
      '/career',
      '/product/payroll-system',
      '/product/e-commerce',
    ]) {
      await page.goto(route);
      await page.locator('main h1').waitFor();
      const problems = await page.locator('main .image-surface').evaluateAll((frames) =>
        frames.flatMap((frame) => {
          const f = frame.getBoundingClientRect();
          const i = frame.querySelector('img').getBoundingClientRect();
          return f.width < 40 ||
            f.height > f.width * 1.5 ||
            i.left < f.left - 1 ||
            i.right > f.right + 1 ||
            i.top < f.top - 1 ||
            i.bottom > f.bottom + 1
            ? [frame.querySelector('img').src]
            : [];
        }),
      );
      expect(problems, route).toEqual([]);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        route,
      ).toBe(true);
      if (route === '/about') {
        const gaps = await page
          .locator('.company-value-card')
          .evaluateAll((cards) =>
            cards.map(
              (card) =>
                card.querySelector('h3').getBoundingClientRect().top -
                card.querySelector('.image-surface').getBoundingClientRect().bottom,
            ),
          );
        expect(gaps.every((gap) => gap >= 20)).toBe(true);
      }
    }
  });
}
