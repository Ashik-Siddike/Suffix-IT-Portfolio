import fs from 'node:fs';
import { services, products } from '../src/data/catalog.js';
import { solutionVisuals } from '../src/data/solution-visuals.js';

const published = JSON.parse(fs.readFileSync('src/data/published-pages.json', 'utf8'));
const subject = {
  'erp-consulting':
    'Interconnected business modules and a consulting workstation, coordinated enterprise planning.',
  'custom-applications':
    'An elegant abstract browser application assembled from bespoke modular components and coding tiles.',
  'mobile-apps':
    'A smartphone with floating application modules, mobile testing and responsive app development.',
  'it-ot-security-solution': 'A protective shield securing industrial and computer network nodes.',
  'consultancy-system-integrator':
    'Different business technology modules connected by a precise integration hub.',
  'field-force-management':
    'Mobile workforce coordination, location pins, route paths, scheduling and a connected handheld device.',
  'domain-hosting': 'Cloud hosting, an elegant server enclosure and connected domain network.',
  'web-ecommerce': 'A browser storefront, shopping basket and connected order-management modules.',
  'video-conferencing':
    'A desktop monitor, webcam and three abstract video-call tiles connected by communication rings.',
  'hospital-management': 'A modern hospital and connected healthcare operations modules.',
  'learning-management': 'An open book, a learning tablet and graduation cap.',
  'storage-backup': 'A protected data storage cylinder, backup cloud and redundant drive modules.',
  'bulk-sms':
    'A mobile message broadcaster sending three abstract speech-bubble tokens to connected phones.',
  'it-infrastructure':
    'An enterprise server rack, network switch and structured cable connections.',
  'power-cooling': 'A compact data-center cooling unit, power module and clean airflow ribbons.',
  iot: 'Industrial automation modules with connected sensors and an energy transformer.',
  'Industrial-Monitoring':
    'An industrial energy meter, factory machinery and connected monitoring sensors.',
  'pos-system':
    'An elegant retail point-of-sale terminal with a receipt printer, barcode token and payment device.',
  'rupantor-erp':
    'A luminous central enterprise core surrounded by finance, people, inventory and procurement modules.',
  'payroll-system':
    'A payroll calendar, employee tokens, payment records and precise salary-management modules.',
  'interconnect-billing':
    'A telecom network and a billing ledger linked by transparent data pathways.',
  'provident-fund':
    'A secure savings vault, employee tokens and a carefully balanced fund-management arrangement.',
  'e-commerce':
    'A modern retail shopping bag, storefront module, product parcel and payment token.',
  'hotel-booking-system': 'A refined hotel entrance model, room key and reservation calendar.',
  'rupantor-inventory':
    'Inventory shelves, accurately arranged parcels, scanning device and stock-management modules.',
  'transformer-monitoring':
    'A smart transformer model, a measurement sensor and remote alarm token.',
};
const base =
  'Premium Suffix IT enterprise website 3D illustration. Azure #0072bc, cyan, white porcelain and translucent blue glass. Sophisticated studio light, carefully sculpted materials, horizontal 3:2 composition, whole subject centered with ample clear padding. TRUE transparent alpha background, no background rectangle, no lettering, no words, no numbers, no logos, no actual software screenshots, no real people. ';
const arrangements = [
  'an asymmetrical three-part arrangement around a curved transparent plinth',
  'a floating exploded arrangement along a diagonal path',
  'a layered composition passing through an open glass arch',
  'a stepped porcelain platform with suspended blue modules',
  'a circular arrangement with a small elevated focal object',
  'a balanced pair of transparent rings around a distinctive focal module',
];
const jobs = [];
const manifest = {
  static: {},
  heroes: {},
  productCards: {},
  relatedCards: {},
  capabilities: {},
  galleries: {},
};
const existing = (name) => `/assets/generated/illustrations/${name}.webp`;
function add(id, topic, role) {
  const file = `/assets/generated/unique/${id}.webp`;
  jobs.push({
    id,
    file,
    role,
    transparent_background: true,
    prompt:
      base +
      topic +
      ' Composition: ' +
      arrangements[jobs.length % arrangements.length] +
      '. Make this a distinctive image for this specific placement: ' +
      role +
      '.',
  });
  return file;
}
manifest.static = {
  homeHero: existing('software'),
  homeWhy: existing('team'),
  homeCall: '/assets/generated/about/call-center.webp',
  homeField: add(
    'home-field',
    'Three connected mobile workforce devices on different heights, location paths and a scheduling token.',
    'Home standalone Field Force section',
  ),
  aboutHistory: add(
    'about-history',
    'Two abstract faceless porcelain professionals building a connected technology system together.',
    'About history introduction',
  ),
  aboutTeam: add(
    'about-team',
    'A small abstract faceless team collaborating around an open semicircular technology desk.',
    'About experienced professionals card',
  ),
  aboutSoftware: add(
    'about-software',
    'A large stylized desktop application surrounded by successive software-building modules.',
    'About software industry card',
  ),
  aboutAmbition: existing('growth'),
  aboutVision: '/assets/generated/about/vision.webp',
  aboutMission: '/assets/generated/about/mission.webp',
  career: add(
    'career-team',
    'An inviting modern collaborative workspace, two abstract faceless professionals and a growth pathway.',
    'Career introduction',
  ),
  bentoErp: add('home-service-erp', subject['erp-consulting'], 'Home services ERP Consulting card'),
  bentoCustom: add(
    'home-service-custom',
    subject['custom-applications'],
    'Home services Custom Applications card',
  ),
  bentoWeb: add(
    'home-service-web',
    subject['web-ecommerce'],
    'Home services Web & E-Commerce card',
  ),
  menuProducts: add(
    'menu-products',
    'A collection of enterprise software product modules surrounding a mobile and desktop application.',
    'Products navigation menu',
  ),
  menuServices: add(
    'menu-services',
    'Three complementary technology services: development workstation, server network and consulting hub.',
    'Services navigation menu',
  ),
  menuIoT: add(
    'menu-iot',
    'A small factory module, automation controller and three interconnected sensor nodes.',
    'IoT navigation menu',
  ),
};
const kept = {
  '/service/it-ot-security-solution': 'security',
  '/service/domain-hosting': 'infrastructure',
  '/service/hospital-management': 'hospital',
  '/service/learning-management': 'learning',
  '/service/iot': 'industrial',
};
for (const item of [...services, ...products])
  manifest.heroes[item.path] = kept[item.path]
    ? existing(kept[item.path])
    : add(
        `hero-${item.path.split('/')[1]}-${item.slug.toLowerCase()}`,
        subject[item.slug],
        `${item.path} introduction hero`,
      );
for (const item of products)
  manifest.productCards[item.path] = add(
    `catalogue-${item.slug}`,
    subject[item.slug],
    `Products catalogue ${item.title} card`,
  );
for (const page of products) {
  manifest.relatedCards[page.path] = {};
  for (const item of products.filter((item) => item.path !== page.path).slice(0, 3))
    manifest.relatedCards[page.path][item.path] = add(
      `related-${page.slug}-${item.slug}`,
      subject[item.slug],
      `Related ${item.title} card on ${page.path}`,
    );
}
const sectionTopics = {
  'The ‘HR & Payroll’ module integrates to':
    'Bank payment records linked to payroll modules and a finance ledger.',
  'Benefits of HR & Payroll':
    'Organized payroll records, a completed salary workflow and an employee benefit token.',
  'Features of HR & Payroll':
    'A modular payroll workspace with branch, employee and payment controls.',
  'Time & Attendance': 'A precise clock and attendance calendar with employee time tokens.',
  'How it works ?':
    'A clear three-stage attendance workflow linking time input, approved records and salary output.',
  Features: 'Attendance scheduling modules with a calendar, clock and task tokens.',
  'The integrated reservation':
    'Retail inventory, order tracking and an abstract commerce content module connected together.',
  'Multiple Payment options':
    'Different payment cards and secure checkout tokens arranged around an e-commerce payment terminal.',
  'More Information':
    'A browser commerce storefront supported by order and customer-service modules.',
  'General Ledger': 'A financial ledger, organized account records and balanced finance tokens.',
  'HR & Payroll Modules': 'Employee records, salary modules and a branch-management arrangement.',
  'Inventory Management': 'An inventory scanning station, stock shelves and warehouse parcels.',
  Procurement:
    'A procurement workspace with supplier parcels, purchase-order tokens and connected sourcing modules.',
};
for (const slug of Object.keys(solutionVisuals)) {
  const page = published['/product/' + slug],
    intro = page.blocks.find((block) => block.tag === 'p' && block.text.length > 100)?.text,
    groups = [];
  for (const block of page.blocks) {
    if (block.tag.startsWith('h')) groups.push({ title: block.text, blocks: [] });
    else {
      if (!groups.length) groups.push({ title: 'Solution details', blocks: [] });
      groups.at(-1).blocks.push(block);
    }
  }
  if (groups[0]?.blocks.length === 1 && groups[0].blocks[0].text === intro) groups.shift();
  for (const [index, group] of groups.entries())
    if (group.blocks.length && solutionVisuals[slug].some((item) => item.match.test(group.title))) {
      const key = `${slug}:${index}`;
      manifest.capabilities[key] =
        slug === 'payroll-system' && index === 0
          ? existing('payments')
          : slug === 'payroll-system' && group.title === 'Time & Attendance'
            ? existing('time')
            : add(
                `detail-${slug}-${index}`,
                sectionTopics[group.title] || subject[slug],
                `${slug} ${group.title} detail section`,
              );
    }
}
for (const item of [...services, ...products]) {
  const page = published[item.path];
  if (!page?.gallery?.length) continue;
  manifest.galleries[item.path] = page.gallery.map((image, index) => ({
    src: add(
      `gallery-${item.path.split('/')[1]}-${item.slug.toLowerCase()}-${index}`,
      subject[item.slug] +
        ` Emphasize ${['connected mobile access', 'remote control console', 'measurement sensor', 'alert notification module', 'energy monitoring core', 'historical records', 'communications gateway'][index % 7]}.`,
      `${item.path} gallery illustration ${index + 1}`,
    ),
    alt: `${item.title} concept illustration ${index + 1}`,
  }));
}
fs.mkdirSync('public/assets/generated/unique', { recursive: true });
fs.writeFileSync('src/data/unique-visuals.json', JSON.stringify(manifest, null, 2) + '\n');
fs.writeFileSync(
  'docs/unique-visual-generation-jobs.json',
  JSON.stringify({ generator: 'Built-in image_gen', jobs }, null, 2) + '\n',
);
console.log(
  `${jobs.length} unique illustration jobs planned. All new jobs use transparent backgrounds.`,
);
