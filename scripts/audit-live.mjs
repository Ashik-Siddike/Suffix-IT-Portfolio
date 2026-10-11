import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const raw = JSON.parse(await fs.readFile('docs/live-audit/original-routes.json', 'utf8'));
const routes = [...new Set(raw.filter((p) => p !== '*' && !p.includes(':')))];
routes.push(
  '/career-detail/5',
  ...['Basic', 'Classic', 'Premium'].map((p) => `/web-e-commerce-detail/${p}`),
);
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  ignoreHTTPSErrors: true,
});
const results = [];
for (const path of routes) {
  const page = await context.newPage();
  try {
    await page.goto(`https://www.suffixit.com${path}`, {
      waitUntil: 'domcontentloaded',
      timeout: 45000,
    });
    await page.waitForSelector('#root h1, #root h2, #root iframe', {
      timeout: 20000,
      state: 'attached',
    });
    await page.waitForTimeout(800);
    const data = await page.evaluate(() => ({
      title: document.title,
      text: document.body.innerText,
      links: [...document.querySelectorAll('a')].map((a) => ({
        label: a.innerText.trim(),
        href: a.getAttribute('href'),
      })),
      images: [...document.querySelectorAll('img')].map((img) => ({
        src: img.getAttribute('src'),
        alt: img.alt,
      })),
      blocks: [
        ...document.querySelectorAll(
          '#root h1, #root h2, #root h3, #root h4, #root h5, #root h6, #root p, #root li, #root div, #root span, #root tr',
        ),
      ]
        .filter((el) => !el.closest('header, nav, footer, .site-header, .site-footer'))
        .filter(
          (el) =>
            !['DIV', 'SPAN'].includes(el.tagName) ||
            (!el.querySelector(
              'div, p, li, h1, h2, h3, h4, h5, h6, table, button, input, a, img',
            ) &&
              el.textContent.trim().length > 45),
        )
        .filter((el) => !el.closest('li') || el.tagName === 'LI')
        .map((el) => ({
          tag: ['DIV', 'SPAN', 'TR'].includes(el.tagName) ? 'p' : el.tagName.toLowerCase(),
          text: el.textContent.trim(),
        }))
        .filter((el) => el.text),
      frames: [...document.querySelectorAll('iframe')].map((frame) => frame.src),
      overflow: document.documentElement.scrollWidth > innerWidth,
    }));
    results.push({ path, ...data });
    await fs.writeFile(
      `docs/live-audit/${path === '/' ? 'home' : path.slice(1).replaceAll('/', '--')}.json`,
      JSON.stringify(data, null, 2),
    );
    if (path === '/') {
      await page.screenshot({ path: 'docs/live-audit/home-desktop.png', fullPage: true });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({ path: 'docs/live-audit/home-mobile.png', fullPage: true });
    }
    console.log(`Audited ${path}: ${data.blocks.length} blocks`);
  } catch (error) {
    results.push({ path, error: error.message });
    console.log(`LIMIT ${path}: ${error.message.split('\n')[0]}`);
  } finally {
    await page.close();
  }
}
await fs.writeFile('docs/live-audit/pages.json', JSON.stringify(results, null, 2));
await browser.close();
