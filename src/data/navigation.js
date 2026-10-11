import { services, products } from './catalog';

// Preserve the original visible menu labels without changing detail-page data.
const menuEntries = (pairs, catalogue) =>
  pairs.map(([slug, title]) => ({ ...catalogue.find((item) => item.slug === slug), title }));

export const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Services',
    path: '/services',
    items: menuEntries(
      [
        ['domain-hosting', 'Domain & Hosting'],
        ['erp-consulting', 'ERP Consulting'],
        ['learning-management', 'Learning Management System'],
        ['custom-applications', 'Custom Applications'],
        ['video-conferencing', 'Suffix Video Conferencing'],
        ['consultancy-system-integrator', 'Consultancy System Integrator'],
        ['power-cooling', 'Infrastructure Power & Cooling'],
        ['hospital-management', 'Hospital Management'],
        ['web-ecommerce', 'Web & E-Commerce'],
        ['storage-backup', 'Storage & Backup Services'],
        ['bulk-sms', 'Bulk SMS'],
        ['it-infrastructure', 'IT Infrastructure'],
        ['it-ot-security-solution', 'IT OT Security Solutions'],
        ['mobile-apps', 'Mobile Apps'],
      ],
      services,
    ),
    visual: '/assets/Visual data-cuate.e5c31c08.svg',
    featuredTitle: 'Expertise with purpose.',
    description:
      'Software, consulting, infrastructure and security. Find the right expertise for your business.',
  },
  {
    label: 'Products',
    path: '/products',
    items: menuEntries(
      [
        ['payroll-system', 'Payroll System'],
        ['provident-fund', 'Provident Fund'],
        ['e-commerce', 'E-Commerce'],
        ['rupantor-erp', 'Rupantor ERP'],
        ['hotel-booking-system', 'Hotel Booking System'],
        ['field-force-management', 'Field Force Management'],
        ['interconnect-billing', 'Interconnect Billing'],
        ['rupantor-inventory', 'Rupantor Inventory'],
      ],
      products,
    ),
    visual: '/assets/field-force.497227c8.png',
    featuredTitle: 'A better way to work.',
    description: 'Explore software that connects your people, processes and everyday operations.',
  },
  {
    label: 'IoT',
    path: '/service/iot',
    items: [
      products.find((item) => item.slug === 'transformer-monitoring'),
      ...menuEntries(
        [
          ['Industrial-Monitoring', 'Industrial Energy Monitoring'],
          ['iot', 'Automation & IoT'],
        ],
        services,
      ),
    ],
    visual: '/assets/iot.5d017fa2.png',
    featuredTitle: 'See your operations clearly.',
    description: 'Discover automation, transformer monitoring and industrial energy monitoring.',
  },
  { label: 'Career', path: '/career' },
];

// Preserve the original site's visible navigation order.
navigation.sort(
  (a, b) =>
    ['Home', 'About', 'Products', 'IoT', 'Services', 'Career'].indexOf(a.label) -
    ['Home', 'About', 'Products', 'IoT', 'Services', 'Career'].indexOf(b.label),
);
