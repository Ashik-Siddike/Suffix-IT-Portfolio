import original from '../data/home-original.json';
import { products } from '../data/catalog';
import { Container, ScrollReveal, SectionHeading } from './ui';
import SqueezeCarousel from './ui/SqueezeCarousel';

const productSlugs = [
  'payroll-system',
  'interconnect-billing',
  'e-commerce',
  'rupantor-erp',
  'provident-fund',
  'hotel-booking-system',
  'rupantor-inventory',
  'field-force-management',
];
const images = ['payroll', 'billing', 'commerce', 'erp', 'fund', 'hotel', 'inventory', 'field'];
const slides = productSlugs.map((slug, index) => {
  const product = products.find((item) => item.slug === slug);
  return {
    ...product,
    ...original.products[index],
    id: slug,
    href: product.path,
    image: `/assets/generated/products/${images[index]}.webp`,
  };
});

export default function ProductsSection() {
  return (
    <section className="section products-section squeeze-products-section" id="products">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title={original.productsTitle}
            description={original.productsDescription}
          />
        </ScrollReveal>
        <ScrollReveal variant="fade">
          <SqueezeCarousel slides={slides} />
        </ScrollReveal>
      </Container>
    </section>
  );
}
