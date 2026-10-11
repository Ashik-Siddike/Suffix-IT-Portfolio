import fs from 'node:fs';
import path from 'node:path';
import { services, products } from '../src/data/catalog.js';

const root = process.cwd();
if (fs.existsSync(path.join(root, 'docs/generated-visual-replacements.json'))) {
  throw new Error(
    'This one-time migration has already run. Edit the generated references directly.',
  );
}
const generated = (name) => `generated/illustrations/${name}.webp`;
const product = (name) => `generated/products/${name}.webp`;
const preservedSvgBrands = new Set([
  'excel2-svgrepo-com.bf3d7d82.svg',
  'gsheet.f09a82ce.svg',
  'pdf.1c280ff7.svg',
]);
const replacements = {};
for (const file of fs
  .readdirSync(path.join(root, 'public/assets'))
  .filter((file) => file.endsWith('.svg') && !preservedSvgBrands.has(file))) {
  const key = file.toLowerCase();
  let next = generated('software');
  if (/team|office|telecommut/.test(key)) next = generated('team');
  else if (/server|memory|inventory|logistics|order_delivered/.test(key))
    next = /inventory|logistics|order/.test(key)
      ? product('inventory')
      : generated('infrastructure');
  else if (/hotel|booking|reservation/.test(key)) next = product('hotel');
  else if (/medicine/.test(key)) next = generated('hospital');
  else if (/fund|vault|invest|wallet/.test(key)) next = product('fund');
  else if (/erp|integrat|visual data|businessbenefit|chart/.test(key)) next = product('erp');
  else if (/commerce|ecom|shopping|purchase/.test(key)) next = product('commerce');
  else if (/billing|invoice|receipt|payable|processing/.test(key)) next = product('billing');
  else if (/pay|account|audit|sponsor|time|credit card|rain/.test(key)) next = product('payroll');
  else if (/^field|location/.test(key)) next = product('field');
  replacements[file] = next;
}
const routeArt = {
  'erp-consulting': product('erp'),
  'custom-applications': generated('software'),
  'mobile-apps': generated('software'),
  'it-ot-security-solution': generated('security'),
  'consultancy-system-integrator': generated('software'),
  'field-force-management': product('field'),
  'domain-hosting': generated('infrastructure'),
  'web-ecommerce': product('commerce'),
  'video-conferencing': 'generated/about/call-center.webp',
  'hospital-management': generated('hospital'),
  'learning-management': generated('learning'),
  'storage-backup': generated('infrastructure'),
  'bulk-sms': 'generated/about/call-center.webp',
  'it-infrastructure': generated('infrastructure'),
  'power-cooling': generated('infrastructure'),
  iot: generated('industrial'),
  'Industrial-Monitoring': generated('industrial'),
  'pos-system': product('commerce'),
  'rupantor-erp': product('erp'),
  'payroll-system': product('payroll'),
  'interconnect-billing': product('billing'),
  'provident-fund': product('fund'),
  'e-commerce': product('commerce'),
  'hotel-booking-system': product('hotel'),
  'rupantor-inventory': product('inventory'),
  'transformer-monitoring': generated('industrial'),
};
for (const item of [...services, ...products])
  replacements[path.basename(item.image)] = routeArt[item.slug];
Object.assign(replacements, {
  'company-original.png': generated('team'),
  'fieldForce.svg.815b7443.png': generated('software'),
  'banner_image.a079af09.png': generated('software'),
  'Dashboard_1.0929c23a.jpg': generated('industrial'),
  'Dashboard_2.543c09b5.jpg': generated('industrial'),
});
for (const name of fs
  .readdirSync(path.join(root, 'public/assets'))
  .filter((name) => /^image \(\d\)\./.test(name)))
  replacements[name] = generated('industrial');

// Check every replacement exists before altering references or retiring assets.
for (const next of Object.values(replacements))
  if (!fs.existsSync(path.join(root, 'public/assets', next)))
    throw Error(`Missing generated asset: ${next}`);
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (/\.(jsx|js|json)$/.test(file) && !file.endsWith('optimized-images.json')) {
      let source = fs.readFileSync(file, 'utf8');
      for (const [old, next] of Object.entries(replacements)) source = source.replaceAll(old, next);
      // Alt text must not describe conceptual art as real software or an actual team photo.
      source = source
        .replaceAll('illustration from the original website', 'conceptual technology illustration')
        .replaceAll('original product illustration', 'conceptual product illustration')
        .replaceAll(
          'illustration from the original product page',
          'conceptual technology illustration',
        )
        .replaceAll(
          'Suffix IT team at Corporate Day, 15 October 2022',
          'Technology team collaboration illustration',
        )
        .replaceAll(
          'Suffix IT team at Corporate Day 2022',
          'Technology team collaboration illustration',
        )
        .replaceAll(
          'Original Suffix Field Force mobile application screens',
          'Field Force Management concept illustration',
        )
        .replaceAll(
          'Suffix IT desktop dashboard and mobile applications',
          'Software and mobile application concept illustration',
        );
      fs.writeFileSync(file, source);
    }
  }
}
walk(path.join(root, 'src'));
const optimizedFile = path.join(root, 'src/data/optimized-images.json');
const optimized = JSON.parse(fs.readFileSync(optimizedFile, 'utf8'));
for (const name of Object.keys(replacements)) delete optimized[`/assets/${name}`];
fs.writeFileSync(optimizedFile, JSON.stringify(optimized, null, 2) + '\n');
fs.writeFileSync(
  path.join(root, 'docs/generated-visual-replacements.json'),
  JSON.stringify({ preservedSvgBrands: [...preservedSvgBrands], replacements }, null, 2) + '\n',
);
console.log(
  `Updated ${Object.keys(replacements).length} legacy visual references. Logo assets preserved.`,
);
