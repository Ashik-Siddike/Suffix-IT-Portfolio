import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERR:', err.message));

  await page.goto('http://127.0.0.1:5173/product/transformer-monitoring', { waitUntil: 'networkidle' });
  
  // Check initial styles
  const initial = await page.evaluate(() => {
    const el = document.querySelector('.sticky');
    return el ? { text: el.innerText.slice(0, 100), html: el.outerHTML.slice(0, 300) } : null;
  });
  console.log('Initial sticky:', initial);

  // Scroll to 800
  await page.evaluate(() => {
    window.scrollTo(0, 800);
    window.dispatchEvent(new Event('scroll'));
  });
  await page.waitForTimeout(600);

  const afterScroll = await page.evaluate(() => {
    const motionDivs = Array.from(document.querySelectorAll('div')).filter(d => d.style.transform || d.style.opacity);
    return motionDivs.map(d => ({
      classes: d.className,
      style: d.getAttribute('style')
    }));
  });
  console.log('After scroll motion elements count:', afterScroll.length);
  console.log('Samples:', afterScroll.slice(0, 8));

  await browser.close();
}

run().catch(console.error);
