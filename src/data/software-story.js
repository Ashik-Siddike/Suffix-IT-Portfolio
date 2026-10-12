import { products, services } from './catalog';
import screens from './software-screens.json';
import visuals from './unique-visuals.json';

// Supporting art is selected from the same product's existing detail page or gallery.
// These are concept illustrations, not application screenshots.
const supportingArt = {
  'field-force-management': [
    { src: visuals.heroes['/product/field-force-management'], label: 'Live tracking' },
    { ...visuals.galleries['/product/field-force-management'][0], label: 'Field operations' },
  ],
  'rupantor-erp': [
    { src: visuals.capabilities['rupantor-erp:1'], label: 'General Ledger' },
    { src: visuals.capabilities['rupantor-erp:10'], label: 'Inventory Management' },
  ],
  'payroll-system': [
    { src: visuals.capabilities['payroll-system:1'], label: 'HR & Payroll' },
    { src: visuals.capabilities['payroll-system:5'], label: 'Time & Attendance' },
  ],
  'e-commerce': [
    { src: visuals.capabilities['e-commerce:1'], label: 'Integrated reservation' },
    { src: visuals.capabilities['e-commerce:2'], label: 'Multiple payment options' },
  ],
  'transformer-monitoring': [
    { ...visuals.galleries['/product/transformer-monitoring'][0], label: 'Remote monitoring' },
    { ...visuals.galleries['/product/transformer-monitoring'][2], label: 'Connected equipment' },
  ],
};

// Lead with a verified live-app visual, then show every product in the existing catalog.
const order = [
  'field-force-management',
  'rupantor-erp',
  'payroll-system',
  'interconnect-billing',
  'e-commerce',
  'provident-fund',
  'hotel-booking-system',
  'rupantor-inventory',
  'pos-system',
  'transformer-monitoring',
];
const catalogChapters = order.map((slug) => {
  const product = products.find((product) => product.slug === slug);
  return {
    ...product,
    // This chapter uses the original introduction; the complete overview stays on its product page.
    description:
      slug === 'pos-system'
        ? product.description
            .split(/(?<=\.)\s+/)
            .slice(0, 2)
            .join(' ')
        : product.description,
    screen: screens[slug]?.[0],
    supportingVisuals: supportingArt[slug] || [
      { src: visuals.productCards[product.path], label: product.category },
    ],
  };
});
const monitoring = services.find((service) => service.slug === 'Industrial-Monitoring');
export const softwareChapters = [
  ...catalogChapters,
  {
    ...monitoring,
    category: 'Industrial monitoring',
    description: 'Monitor. Detect Faults. Analyze Energy Meters',
    screen: screens['Industrial-Monitoring'][0],
    supportingVisuals: [
      { screen: screens['Industrial-Monitoring'][1] },
      {
        src: '/assets/IEMS Diagram.d39e87e4.png',
        label: 'IEMS Diagram',
        alt: 'Original Suffix IT IEMS diagram connecting energy meters to the monitoring dashboard',
        width: 3056,
        height: 3031,
        kind: 'diagram',
      },
    ],
  },
];
