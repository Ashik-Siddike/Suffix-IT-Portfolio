import fs from 'node:fs/promises';
import path from 'node:path';

const pages = JSON.parse(await fs.readFile('docs/live-audit/pages.json', 'utf8'));
const excludedImages = /Suffix-Logo|try2\.|try5\.|try8\.|certificate|navimage|ISO|site logo/i;
const out = {};
const manifest = JSON.parse(await fs.readFile('docs/asset-manifest.json', 'utf8'));

for (const page of pages) {
  if (page.error || page.path === '/home' || page.path === '/webmail') continue;
  let blocks = [...page.blocks];
  const start = blocks.findIndex((block) => block.tag.startsWith('h'));
  if (start > 0) blocks = blocks.slice(start);
  // Replace original banner and breadcrumbs with the shared page hero.
  if (blocks[0]?.tag.startsWith('h')) blocks.shift();
  if (blocks[0]?.tag === 'li' && blocks[0]?.text === 'Home') {
    blocks.shift();
    blocks.shift();
  }
  const ctaIndex = blocks.findIndex((block) => block.text === 'Schedule a Live Demo');
  if (ctaIndex >= 0) blocks = blocks.slice(0, ctaIndex);
  const footerIndex = blocks.findIndex((block) =>
    block.text.startsWith('We maintain strategic partnerships'),
  );
  if (footerIndex >= 0) blocks = blocks.slice(0, footerIndex);
  // Remove exact adjacent heading duplicates caused by original flip-card fronts/backs.
  blocks = blocks.filter(
    (block, index) => !(block.tag.startsWith('h') && block.text === blocks[index - 1]?.text),
  );
  blocks = blocks.map((block) => ({ ...block, text: block.text.replaceAll('\uFFFD', ' ') }));
  if (page.path === '/service/Industrial-Monitoring') {
    const featureStart = blocks.findIndex((block) => block.text === 'IEMS Features');
    const headings = new Set([
      'IEMS Features',
      'Air Compressor',
      'Generator',
      'ETP',
      'Boiler',
      '11KV / 33KV Substation',
      'IEMS Diagram',
      'IEMS Dashboard',
      'Benefits of IEMS',
    ]);
    blocks = blocks.map((block, index) =>
      index < featureStart
        ? block
        : headings.has(block.text)
          ? { ...block, tag: 'h2' }
          : block.tag === 'p'
            ? { ...block, tag: 'li' }
            : block,
    );
  }
  // Company copy and historical/legal body are not editorially rewritten here.
  const images = [];
  for (const image of page.images || []) {
    if (excludedImages.test(`${image.src} ${image.alt}`)) continue;
    if (!image.src?.startsWith('/static/media/')) continue;
    const filename = decodeURIComponent(image.src.split('/').pop());
    try {
      const bytes = (await fs.stat(path.join('public/assets', filename))).size;
      // Large original diagrams/product screenshots, not tiny service icons.
      if (
        bytes > 45000 &&
        /STMS|Dashboard_|field-force|learning-management-system|IEMS Diagram|^image \(|^banner_image|^dash\./i.test(
          filename,
        )
      )
        images.push({
          src: `/assets/${filename}`,
          alt: `${image.alt && image.alt !== 'loading' ? image.alt : 'Product'} — original Suffix IT visual`,
        });
    } catch {
      /* Broken original source assets are documented, not rendered. */
    }
  }
  out[page.path] = {
    source: `https://www.suffixit.com${page.path}`,
    captured: '2026-10-10',
    introTitle: blocks.find((block) => block.tag.startsWith('h'))?.text,
    blocks,
    gallery: [...new Map(images.map((img) => [img.src, img])).values()],
    videos: (page.frames || [])
      .filter((src) => src.startsWith('https://www.youtube.com/embed/'))
      .map((src) => ({
        url: src.replace('/embed/', '/watch?v='),
        title: 'Original IoT demonstration video',
      })),
  };
}

const homepage =
  pages.find((page) => page.path === '/') || pages.find((page) => page.path === '/home');
const clientLogos = [];
for (const [index, image] of homepage.images
  .filter((image) => image.alt.startsWith('logo-'))
  .entries()) {
  let src = image.src;
  if (src.startsWith('data:')) {
    const data = Buffer.from(src.split(',')[1], 'base64');
    const extension = data[0] === 0x89 ? 'png' : 'jpg';
    src = `/assets/original-client-${index + 1}.${extension}`;
    await fs.writeFile(`public${src}`, data);
    manifest.push({
      source: `Embedded homepage client image ${image.alt}`,
      local: src,
      bytes: data.length,
    });
  } else src = src.replace('/static/media/', '/assets/');
  clientLogos.push({ src, alt: `Client logo ${index + 1}, published by Suffix IT` });
}
await fs.writeFile('src/data/client-logos.json', JSON.stringify(clientLogos, null, 2));
await fs.writeFile('src/data/published-pages.json', JSON.stringify(out, null, 2));
await fs.writeFile(
  'docs/asset-manifest.json',
  JSON.stringify(
    [...new Map(manifest.map((asset) => [asset.local || asset.source, asset])).values()],
    null,
    2,
  ),
);
console.log(
  `Prepared ${Object.keys(out).length} original content pages and ${clientLogos.length} client logos.`,
);

const routes = JSON.parse(await fs.readFile('docs/live-audit/original-routes.json', 'utf8')).filter(
  (route) => route !== '*',
);
const routeTable = routes.map((route) => {
  const component =
    route.startsWith('/service/') || route.startsWith('/product/')
      ? 'SolutionPage'
      : route === '/' || route === '/home'
        ? 'HomePage (/home redirects to /)'
        : route === '/contact'
          ? 'ContactPage'
          : route === '/about'
            ? 'CompanyPage'
            : 'ContentPage';
  const status = route.includes(':')
    ? 'Pattern preserved; discovered values listed below'
    : route === '/webmail'
      ? 'External destination preserved; remote login not audited'
      : pages.find((page) => page.path === route)?.error
        ? 'Access limitation'
        : 'Rendered DOM captured';
  return `| https://www.suffixit.com${route} | ${component} | ${status} |`;
});
await fs.writeFile(
  'docs/route-inventory.md',
  `# Route inventory\n\nAudit date: 10 October 2026. Discovered from the live production router and navigation, not only the user’s sample URLs.\n\n| Original URL | New React page | Evidence |\n| --- | --- | --- |\n${routeTable.join('\n')}\n\nDiscovered concrete dynamic URLs: /career-detail/5, /web-e-commerce-detail/Basic, /web-e-commerce-detail/Classic, /web-e-commerce-detail/Premium. All preserved. Unknown IDs/types render a 404. Added /services and /products overview pages. /about#whoWeAre anchor preserved.\n\nThe original navigation uses /! as a menu trigger, not a page. /MO appears in encoded image data; it is not a route. /service/ and /product/ are path construction prefixes. No pages are invented for those strings.\n\nWebmail’s original router redirects to https://sg2plzcpnl505697.prod.sin2.secureserver.net:2096/. The redesigned /webmail page links directly to that existing service without collecting credentials.\n\nDiscovery is complete for production router declarations and observed public navigation as captured on this date. Unlinked server content and future dynamic job IDs cannot be guaranteed. The published bundle and index HTML were inspected; no additional public router declarations were found.\n`,
);

await fs.writeFile(
  'docs/asset-inventory.md',
  `# Asset inventory\n\nOriginal published bundle media were downloaded locally without modifying the company logo. Exact source URLs, local paths, byte sizes, and failed downloads are in [asset-manifest.json](asset-manifest.json). Original bundle asset strings are in [source-assets.json](source-assets.json).\n\n- Logo: /assets/Suffix-Logo.73142c9b.png (2083 × 789); full wordmark and tagline retained.\n- Primary hero: /assets/field-force.497227c8.png, genuine three-phone mobile product screenshot.\n- ERP: /assets/erp.d84b0931.svg, original product illustration.\n- Monitoring: STMS, IEMS diagram, Dashboard_1, Dashboard_2 and source-specific visuals; keep original UI colors as evidence inside images. Site sections remain light.\n- About: /assets/company-original.png, downloaded from the original About page’s i.ibb.co image.\n- Clients: all ${clientLogos.length} homepage logos, including embedded data images, preserved on About. Five identified originals appear in the homepage strip.\n- Original ISO marks retained on About as references published by the original site; current certificates were not provided or verified.\n- Lucide replaces decorative legacy icon families. No new stock photography, customer logos or AI product screenshots.\n\nSome original files are generic illustrations rather than product screenshots; label them as original visuals rather than claiming actual UI. All asset provenance remains traceable. The complete public media archive is retained; browsers only request images used by a visited route.\n`,
);
