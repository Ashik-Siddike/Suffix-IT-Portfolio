import { test, expect } from '@playwright/test';

test('homepage restores footer, removes pause buttons, and keeps lightweight hover effects', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.getByRole('button', { name: /pause|resume|play marquee/i })).toHaveCount(0);
  await expect(page.locator('.cinematic-footer')).toHaveCount(0);
  await expect(page.locator('footer .footer-credentials img')).toHaveCount(6);
  await expect(page.locator('.capability-row')).toHaveCount(3);
  const chip = page.locator('.field-feature-chips li').first();
  await chip.hover();
  await expect
    .poll(() => chip.evaluate((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).a))
    .toBe(1);
  await expect(chip).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await page.locator('.client-marquee').scrollIntoViewIfNeeded();
  const logo = page.locator('.marquee-logo').filter({ visible: true }).nth(2);
  await logo.hover();
  await expect(logo.locator('.client-name')).toHaveCSS('color', 'rgb(0, 114, 188)');
  await expect(page.locator('.client-marquee .marquee-row').first()).toHaveCSS(
    'border-top-color',
    'rgb(0, 114, 188)',
  );
  await expect(page.locator('.client-marquee .marquee-track').first()).toHaveCSS(
    'animation-play-state',
    'paused',
  );
  await page.screenshot({ path: 'artifacts/client-ribbon-hover.png' });
  await page.locator('.capability-marquee-three').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'artifacts/capability-cinematic-panel.png' });
});
