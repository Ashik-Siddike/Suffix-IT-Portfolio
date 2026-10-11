import fs from 'node:fs';

const manifest = JSON.parse(fs.readFileSync('src/data/unique-visuals.json', 'utf8'));
const artSources = [];
function collectSources(value) {
  if (typeof value === 'string' && value.startsWith('/assets/generated/')) artSources.push(value);
  else if (value && typeof value === 'object')
    for (const child of Object.values(value)) collectSources(child);
}
collectSources(manifest);
if (new Set(artSources).size !== artSources.length)
  throw Error('Unique artwork manifest contains reused image paths.');
const jobs = JSON.parse(fs.readFileSync('docs/unique-visual-generation-jobs.json', 'utf8')).jobs;
const dryRun = process.argv.includes('--check');
const missing = jobs.filter((job) => !fs.existsSync('public' + job.file));
if (missing.length && !dryRun)
  throw Error(
    `${missing.length} generated assets are still missing. Generation must finish before applying.`,
  );
const edits = new Map();
function replace(file, before, after) {
  const source = (edits.get(file) ?? fs.readFileSync(file, 'utf8')).replace(/\r\n/g, '\n');
  if (!source.includes(before))
    throw Error(`Expected source not found in ${file}: ${before.slice(0, 100)}`);
  edits.set(file, source.replace(before, after));
}
function prepend(file, text) {
  edits.set(file, text + (edits.get(file) ?? fs.readFileSync(file, 'utf8')));
}

prepend('src/data/catalog.js', "import visuals from './unique-visuals.json';\n");
replace(
  'src/data/catalog.js',
  'image: `/assets/${image}`,',
  'image: visuals.heroes[`/service/${slug}`] || `/assets/${image}`,',
);
replace(
  'src/data/catalog.js',
  'image: `/assets/${image}`,',
  'image: visuals.heroes[`/product/${slug}`] || `/assets/${image}`,',
);

prepend('src/pages/HomePage.jsx', "import visuals from '../data/unique-visuals.json';\n");
replace(
  'src/pages/HomePage.jsx',
  'src="/assets/generated/illustrations/software.webp"',
  'src={visuals.static.homeHero}',
);
replace(
  'src/pages/HomePage.jsx',
  'src="/assets/generated/about/call-center.webp"',
  'src={visuals.static.homeCall}',
);

prepend(
  'src/components/HomeRestoredSections.jsx',
  "import visuals from '../data/unique-visuals.json';\n",
);
replace(
  'src/components/HomeRestoredSections.jsx',
  'src="/assets/generated/illustrations/team.webp"',
  'src={visuals.static.homeWhy}',
);
replace(
  'src/components/HomeRestoredSections.jsx',
  'alt="Software and mobile application concept illustration"',
  'alt="Technology engineering team illustration"',
);
replace(
  'src/components/HomeRestoredSections.jsx',
  "'generated/illustrations/team.webp',\n    'generated/illustrations/software.webp',\n    'generated/illustrations/growth.webp',",
  'visuals.static.aboutTeam,\n    visuals.static.aboutSoftware,\n    visuals.static.aboutAmbition,',
);
replace('src/components/HomeRestoredSections.jsx', 'src={`/assets/${image}`}', 'src={image}');
replace(
  'src/components/HomeRestoredSections.jsx',
  'src="/assets/generated/products/field.webp"',
  'src={visuals.static.homeField}',
);

prepend('src/pages/CompanyPage.jsx', "import visuals from '../data/unique-visuals.json';\n");
replace(
  'src/pages/CompanyPage.jsx',
  'src="/assets/generated/illustrations/team.webp"',
  'src={visuals.static.aboutHistory}',
);
replace(
  'src/pages/CompanyPage.jsx',
  'src={`/assets/generated/about/${title.toLowerCase()}.webp`}',
  'src={index ? visuals.static.aboutMission : visuals.static.aboutVision}',
);

prepend('src/pages/ContentPage.jsx', "import visuals from '../data/unique-visuals.json';\n");
replace(
  'src/pages/ContentPage.jsx',
  'src="/assets/generated/illustrations/team.webp"',
  'src={visuals.static.career}',
);

prepend('src/data/navigation.js', "import visuals from './unique-visuals.json';\n");
replace(
  'src/data/navigation.js',
  "visual: '/assets/generated/products/erp.webp',",
  'visual: visuals.static.menuServices,',
);
replace(
  'src/data/navigation.js',
  "visual: '/assets/generated/products/field.webp',",
  'visual: visuals.static.menuProducts,',
);
replace(
  'src/data/navigation.js',
  "visual: '/assets/generated/illustrations/industrial.webp',",
  'visual: visuals.static.menuIoT,',
);

prepend('src/components/ServicesBento.jsx', "import visuals from '../data/unique-visuals.json';\n");
replace(
  'src/components/ServicesBento.jsx',
  'src={item.image}',
  'src={{ erp: visuals.static.bentoErp, custom: visuals.static.bentoCustom, web: visuals.static.bentoWeb }[area]}',
);

replace(
  'src/components/cards.jsx',
  'export function ProductCard({ item }) {',
  'export function ProductCard({ item, image = item.image }) {',
);
replace('src/components/cards.jsx', 'src={item.image}', 'src={image}');
replace(
  'src/components/cards.jsx',
  'alt={`${item.title} — original product visual`}',
  'alt={`${item.title} concept illustration`}',
);
prepend('src/pages/CataloguePage.jsx', "import visuals from '../data/unique-visuals.json';\n");
replace(
  'src/pages/CataloguePage.jsx',
  '<ProductCard key={item.path} item={item} />',
  '<ProductCard key={item.path} item={item} image={visuals.productCards[item.path]} />',
);

prepend('src/pages/SolutionPage.jsx', "import visuals from '../data/unique-visuals.json';\n");
replace(
  'src/pages/SolutionPage.jsx',
  'const original = published[pathname] || {};',
  'const original = published[pathname] || {};\n  const gallery = visuals.galleries[pathname] || [];',
);
replace(
  'src/pages/SolutionPage.jsx',
  '{original.gallery?.length > 0 && (',
  '{gallery.length > 0 && (',
);
replace(
  'src/pages/SolutionPage.jsx',
  '{original.gallery\n                .filter((img) => img.src !== item.image)',
  '{gallery\n                .filter((img) => img.src !== item.image)',
);
replace('src/pages/SolutionPage.jsx', '<figcaption>{img.alt}</figcaption>', '');
replace(
  'src/pages/SolutionPage.jsx',
  '<ProductCard item={other} key={other.path} />',
  '<ProductCard item={other} key={other.path} image={visuals.relatedCards[pathname][other.path]} />',
);

prepend(
  'src/components/SolutionContent.jsx',
  "import visuals from '../data/unique-visuals.json';\n",
);
replace(
  'src/components/SolutionContent.jsx',
  "import { solutionVisuals } from '../data/solution-visuals';\n",
  '',
);
replace(
  'src/components/SolutionContent.jsx',
  'const visual = solutionVisuals[slug]?.find((item) => item.match.test(group.title));',
  'const image = visuals.capabilities[`${slug}:${index}`];\n          const visual = image ? { image } : null;',
);

if (!dryRun) for (const [file, source] of edits) fs.writeFileSync(file, source);
console.log(
  dryRun
    ? `Verified bindings in ${edits.size} source files; ${missing.length} assets still pending. No source files changed.`
    : `Applied unique art mapping to ${edits.size} source files; ${jobs.length} new assets verified.`,
);
// Preserve the renderer's original words. All changes above affect artwork or image metadata.
