import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { services, products } from '../src/data/catalog.js';

for (const preference of ['no-preference', 'reduce']) {
  test(`scroll controls and product interactions work with motion ${preference}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: preference });
    await page.goto('/');
    const headline = page.getByRole('heading', {
      level: 1,
      name: 'We care about the IT Solution you need',
      exact: true,
    });
    await expect(headline).toBeVisible();
    await expect(headline.locator('.hero-typewriter-visible')).toHaveText(
      'We care about the IT Solution you need',
    );
    const tabs = page.getByRole('tab');
    await tabs.first().scrollIntoViewIfNeeded();
    await tabs.first().focus();
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel')).toHaveCount(1);
    await expect(page.getByRole('tabpanel').getByRole('link')).toHaveAttribute(
      'href',
      '/product/interconnect-billing',
    );
    await expect(page.getByRole('button', { name: 'Back to top' })).toBeVisible();
    await page.getByRole('button', { name: 'Back to top' }).click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(page.locator('#main-content')).toBeFocused();
    await expect(page.getByRole('button', { name: 'Back to top' })).toHaveCount(0);
    if (preference === 'reduce') {
      await expect(page.locator('.scroll-progress')).toBeHidden();
      await page.goto('/services');
      const card = page.locator('.service-card').first();
      await card.getByRole('link').focus();
      await expect(card).toHaveCSS('transform', 'none');
    }
  });
}

const keyRoutes = [
  '/',
  '/about',
  '/services',
  '/products',
  '/contact',
  '/career',
  '/career-detail/5',
  '/astha-policy',
  '/webmail',
  '/top-10-software-company-in-bangladesh',
  '/web-e-commerce-detail/Basic',
  '/web-e-commerce-detail/Classic',
  '/web-e-commerce-detail/Premium',
  ...services.map((item) => item.path),
  ...products.map((item) => item.path),
];

test('restored homepage sections and staggered testimonial cards preserve original content', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('#why-choose-us .restored-checks li')).toHaveCount(6);
  await expect(page.locator('#why-choose-us')).toContainText('9+');
  await expect(page.locator('#our-company')).toHaveCount(0);
  await expect(page.locator('#field-force .restored-checks li')).toHaveCount(7);
  await expect(page.locator('#field-force')).toContainText('Chat and Collaboration');
  const testimonials = page.getByRole('region', { name: 'Client testimonials' });
  await expect(testimonials).toContainText('Awesome Design');
  await expect(testimonials.locator('.testimonial-story')).toHaveCount(3);
  await expect(testimonials).toContainText('Great Flexibility');
  await expect(testimonials).toContainText('Super Support!');
  await expect(testimonials.locator('blockquote')).toHaveCount(3);
  await expect(testimonials.locator('img.testimonial-avatar')).toHaveCount(3);
  await expect(page.locator('.brand img').first()).toHaveAttribute(
    'src',
    '/assets/Suffix-Logo.73142c9b.png',
  );
  await expect(page.locator('.marquee-group:not([aria-hidden]) .marquee-logo')).toHaveCount(21);
  await expect(page.locator('.footer-credentials img')).toHaveCount(6);
  expect(
    await page
      .locator('#testimonials')
      .evaluate(
        (section) =>
          section.compareDocumentPosition(document.querySelector('.client-marquee')) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ),
  ).toBeTruthy();
});

test('About navigation and original About copy are preserved with moved company cards', async ({
  page,
}) => {
  await page.goto('/');
  const about = page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'About', exact: true });
  await expect(about).toHaveAttribute('href', '/about');
  await about.click();
  await expect(
    page.getByRole('heading', { level: 1, name: 'About Us', exact: true }),
  ).toBeVisible();
  await expect(page.locator('#whoWeAre')).toContainText(
    'Among a plethora of services, web design and development, tailor made applications, ERPs, CRMs',
  );
  await expect(page.locator('.about-purpose')).toContainText(
    "contributes favorably to humanity's interests.",
  );
  await expect(page.locator('.about-purpose')).toContainText('and thereby serve humanity.');
  await expect(page.locator('#our-company .company-value-card')).toHaveCount(3);
  await expect(page.locator('#our-company')).toContainText(
    'Working In Software Industry Since 2017',
  );
});

test('products autoplay every two seconds and pause for hover, controls and reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/#products');
  const carousel = page.getByRole('region', { name: 'Our products' });
  await carousel.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const selected = () =>
    carousel.locator('[role="tab"][aria-selected="true"]').getAttribute('aria-label');
  const first = await selected();
  await expect.poll(selected, { timeout: 4500 }).not.toBe(first);
  await carousel.hover();
  const hovered = await selected();
  await page.waitForTimeout(2300);
  expect(await selected()).toBe(hovered);
  await carousel.getByRole('tab').first().focus();
  await page.keyboard.press('Space');
  await page.evaluate(() => document.activeElement?.blur());
  await page.mouse.move(0, 0);
  const paused = await selected();
  await page.waitForTimeout(2300);
  expect(await selected()).toBe(paused);
  await carousel.getByRole('tab').first().focus();
  await page.keyboard.press('Space');
  await page.evaluate(() => document.activeElement?.blur());
  await page.mouse.move(0, 0);
  await expect.poll(selected, { timeout: 4500 }).not.toBe(paused);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(carousel.getByRole('button', { name: 'Pause product autoplay' })).toHaveCount(0);
  const reduced = await selected();
  await page.waitForTimeout(2300);
  expect(await selected()).toBe(reduced);
});

test('testimonial border light follows the pointer and keeps client portraits', async ({
  page,
}) => {
  await page.goto('/');
  const group = page.getByRole('region', { name: 'Client testimonials' });
  await group.scrollIntoViewIfNeeded();
  const card = group.locator('.testimonial-story').first();
  const rect = await card.boundingBox();
  await page.mouse.move(rect.x + 12, rect.y + 8);
  await expect(group).toHaveAttribute('data-glow-active', 'true');
  await expect
    .poll(() => card.evaluate((el) => parseFloat(el.style.getPropertyValue('--glow-x'))))
    .toBeCloseTo(12, 0);
  await page.mouse.move(rect.x + rect.width - 15, rect.y + rect.height - 10);
  await expect
    .poll(() => card.evaluate((el) => parseFloat(el.style.getPropertyValue('--glow-x'))))
    .toBeCloseTo(rect.width - 15, 0);
  await expect(card.locator('img.testimonial-avatar')).toHaveAttribute(
    'src',
    '/assets/testimonials/rafique.jpg',
  );
  await page.mouse.move(0, 0);
  await expect(group).toHaveAttribute('data-glow-active', 'false');
});

test('hero has no cursor renderer and keeps its explore navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.mouse.move(450, 350);
  await expect(page.locator('.home-hero canvas')).toHaveCount(0);
  await expect(page.locator('.hero-neon-flow')).toHaveCount(0);
  await page.getByRole('link', { name: "LET'S EXPLORE", exact: true }).click();
  await expect(page).toHaveURL(/#why-choose-us$/);
});

test('scroll reveal waits until the section moves beyond the bottom edge', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const photo = page.locator('#services > .container > [data-reveal]').first();
  await photo.waitFor({ state: 'attached' });
  await page.evaluate(() => document.fonts.ready);
  const top = await photo.evaluate(
    (element) => element.getBoundingClientRect().top + window.scrollY,
  );
  await page.evaluate(
    (sectionTop) =>
      window.scrollTo({ top: sectionTop - window.innerHeight + 50, behavior: 'instant' }),
    top,
  );
  await expect(photo).toHaveCSS('opacity', '0');
  await page.waitForTimeout(400);
  await expect(photo).toHaveCSS('opacity', '0');
  await page.evaluate(
    (sectionTop) =>
      window.scrollTo({ top: sectionTop - window.innerHeight * 0.45, behavior: 'instant' }),
    top,
  );
  await expect(photo).toHaveCSS('opacity', '1');
});

test('client marquee moves in opposite directions and can pause or respect reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const section = page.locator('.client-marquee');
  await section.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const tracks = section.locator('.marquee-track');
  const positions = () =>
    tracks.evaluateAll((elements) =>
      elements.map((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m41),
    );
  const before = await positions();
  await expect
    .poll(async () => {
      const after = await positions();
      return after[0] < before[0] && after[1] > before[1];
    })
    .toBe(true);
  await section.focus();
  await page.keyboard.press('Space');
  await expect(tracks.first()).toHaveCSS('animation-play-state', 'paused');
  await page.keyboard.press('Space');
  await section.evaluate((el) => el.blur());
  await expect(tracks.first()).toHaveCSS('animation-play-state', 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(tracks.first()).toHaveCSS('animation-name', 'none');
  await expect(section.locator('.marquee-group[aria-hidden="true"]').first()).toBeHidden();
  await expect(page.locator('.footer-credentials img')).toHaveCount(6);
});

test('scroll entrances settle visibly without overflow in normal motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const [path, selector] of [
    ['/', '.restored-why-art'],
    ['/about', '.company-copy'],
    ['/product/payroll-system', '.capability-copy'],
    ['/contact', '.contact-info'],
  ]) {
    await page.goto(path);
    const block = page.locator(selector).first();
    await block.scrollIntoViewIfNeeded();
    await expect(block).toHaveCSS('opacity', '1');
    await expect(block).toHaveCSS('transform', 'none');
    const image = page.locator('main img').first();
    if (await image.count()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveCSS('opacity', '1');
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
  }
});

test('all public routes render, images load, metadata and internal links resolve', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const allowed = new Set([...keyRoutes, '/home']);
  const artworkLocations = new Map();
  for (const path of keyRoutes) {
    await page.goto(path);
    await expect(page.locator('main h1')).toHaveCount(1);
    // Authored circuit paths and requested brand text effects are allowed;
    // legacy SVG icons and icon libraries remain absent.
    const legacySvg = await page
      .locator('svg')
      .evaluateAll(
        (nodes) =>
          nodes.filter(
            (node) =>
              !node.matches('.bent-circuit, .text-hover-effect, .software-story-circuit') &&
              !node.closest('.company-circuit-path, .path-drawing-brand'),
          ).length,
      );
    expect(legacySvg).toBe(0);
    await expect(page.locator('main h1')).not.toContainText('back on track');
    await expect(page).toHaveTitle(/Suffix IT Limited/);
    expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe(
      `https://www.suffixit.com${path}`,
    );
    const links = await page
      .locator('a[href^="/"]')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href').split(/[?#]/)[0]));
    expect(
      links.filter((href) => !allowed.has(href)),
      path,
    ).toEqual([]);
    const brokenImages = await page.locator('img').evaluateAll(async (images) => {
      images.forEach((image) => {
        image.loading = 'eager';
      });
      await Promise.all(images.map((image) => image.decode().catch(() => null)));
      return images.filter((image) => !image.naturalWidth).map((image) => image.src);
    });
    expect(brokenImages, path).toEqual([]);
    const artwork = await page
      .locator('main img[src*="/assets/generated/"]')
      .evaluateAll((images) =>
        images
          // The software story deliberately previews the existing catalog illustrations.
          // Other sections and routes retain their individually authored artwork.
          .filter((image) => !image.closest('.software-story-illustration'))
          .map((image) => image.getAttribute('src')),
      );
    for (const src of artwork) {
      expect(
        artworkLocations.has(src),
        `${src} reused on ${path}; previously on ${artworkLocations.get(src)}`,
      ).toBe(false);
      artworkLocations.set(src, path);
    }
  }
  await page.goto('/home');
  await expect(page).toHaveURL('http://127.0.0.1:4173/');
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'We care about the IT Solution you need',
      exact: true,
    }),
  ).toBeVisible();
  await page.goto('/about#whoWeAre');
  await expect(page.locator('#whoWeAre')).toBeInViewport();
  expect(errors).toEqual([]);
});

for (const width of [360, 390, 768, 1024, 1440]) {
  test(`responsive pages have no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      '/',
      '/services',
      '/products',
      '/contact',
      '/product/rupantor-erp',
      '/service/Industrial-Monitoring',
      '/astha-policy',
      '/web-e-commerce-detail/Premium',
    ]) {
      await page.goto(path);
      await expect(page.locator('h1')).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${path} at ${width}`,
      ).toBe(true);
    }
  });
}

test('desktop disclosure supports keyboard operation and Escape', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Services', exact: true });
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(page.locator('.dropdown-overview')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(button).toBeFocused();
});

test('mobile navigation opens, routes and closes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const nav = page.getByRole('navigation', { name: 'Mobile navigation' });
  await expect(nav).toBeVisible();
  await nav.locator('summary').filter({ hasText: 'Services' }).click();
  await nav.getByRole('link', { name: 'ERP Consulting', exact: true }).click();
  await expect(page).toHaveURL(/service\/erp-consulting/);
  await expect(nav).toHaveCount(0);
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
});

test('catalogue search provides filtered results and an empty state', async ({ page }) => {
  await page.goto('/products');
  await page.getByRole('searchbox').fill('Rupantor ERP');
  await expect(page.locator('main .product-card')).toHaveCount(1);
  await page.getByRole('searchbox').fill('nonexistent solution');
  await expect(page.getByRole('heading', { name: 'No results found' })).toBeVisible();
});

test('squeeze product carousel covers all original products and supports keyboard and controls', async ({
  page,
}) => {
  await page.goto('/#products');
  const carousel = page.getByRole('region', { name: 'Our products' });
  // Mobile hides inactive previews; retain stable product indexes across widths.
  const tabs = carousel.locator('[role="tab"]');
  await expect(tabs).toHaveCount(8);
  await tabs.first().focus();
  const slugs = [
    'payroll-system',
    'interconnect-billing',
    'e-commerce',
    'rupantor-erp',
    'provident-fund',
    'hotel-booking-system',
    'rupantor-inventory',
    'field-force-management',
  ];
  for (let index = 0; index < slugs.length; index++) {
    await expect(tabs.nth(index)).toHaveAttribute('aria-selected', 'true');
    await expect(carousel.getByRole('tabpanel').getByRole('link')).toHaveAttribute(
      'href',
      `/product/${slugs[index]}`,
    );
    await page.keyboard.press('ArrowRight');
  }
  await expect(tabs.first()).toBeFocused();
  await page.keyboard.press('End');
  await expect(tabs.last()).toBeFocused();
  await page.keyboard.press('Home');
  await expect(tabs.first()).toBeFocused();
  await carousel.getByRole('button', { name: 'Next product', exact: true }).click();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await carousel.getByRole('button', { name: 'Previous product', exact: true }).click();
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
  await carousel.getByRole('button', { name: 'Show Provident Fund' }).click();
  await expect(tabs.nth(4)).toHaveAttribute('aria-selected', 'true');
  await page.setViewportSize({ width: 390, height: 844 });
  await tabs.nth(4).focus();
  await page.keyboard.press('End');
  await expect(tabs.last()).toBeFocused();
  await page.keyboard.press('Home');
  await expect(tabs.first()).toBeFocused();
  await carousel.locator('.squeeze-panels').evaluate((element) => {
    const start = new Event('touchstart', { bubbles: true });
    Object.defineProperty(start, 'touches', { value: [{ clientX: 250, clientY: 150 }] });
    element.dispatchEvent(start);
    const end = new Event('touchend', { bubbles: true });
    Object.defineProperty(end, 'changedTouches', { value: [{ clientX: 120, clientY: 155 }] });
    element.dispatchEvent(end);
  });
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
});

test('Products, Services and IoT mega menus remain inside the viewport and are accessible', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  for (const name of ['Products', 'Services', 'IoT']) {
    await page.getByRole('button', { name, exact: true }).click();
    const menu = page.locator('.mega-menu');
    await expect(menu).toBeVisible();
    expect(
      await menu.evaluate((element) => {
        const r = element.getBoundingClientRect();
        return r.left >= 0 && r.right <= innerWidth;
      }),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.keyboard.press('Escape');
  }
});

test('contact validates, focuses errors, and prepares email without sending', async ({ page }) => {
  let requests = 0;
  page.on('request', (request) => {
    if (request.method() === 'POST') requests += 1;
  });
  await page.goto('/contact?intent=demo');
  await page.getByRole('button', { name: 'Prepare email enquiry' }).click();
  await expect(page.getByLabel('Full name')).toBeFocused();
  await expect(page.getByText('Please enter your name.')).toBeVisible();
  await page.getByLabel('Full name').fill('Asha Rahman');
  await page.getByLabel('Email address').fill('asha@example.com');
  await page.getByLabel('Your requirements').fill('We would like to discuss ERP for our business.');
  await page.getByRole('button', { name: 'Prepare email enquiry' }).click();
  await expect(page.getByRole('status')).toContainText('Nothing has been sent');
  await expect(page.getByRole('link', { name: 'Open email app' })).toHaveAttribute(
    'href',
    /^mailto:info@suffixit.com\?/,
  );
  expect(requests).toBe(0);
});

test('unknown pages and unknown detail IDs render a genuine 404', async ({ page }) => {
  for (const path of [
    '/missing',
    '/service/missing',
    '/career-detail/999',
    '/web-e-commerce-detail/Missing',
  ]) {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: 'Let’s get you back on track.' })).toBeVisible();
  }
});

test('representative pages and open menus pass automated WCAG AA checks', async ({ page }) => {
  for (const path of ['/', '/about', '/contact', '/product/rupantor-erp', '/astha-policy']) {
    await page.goto(path);
    await expect(page.locator('main h1')).toBeVisible();
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations, path).toEqual([]);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
