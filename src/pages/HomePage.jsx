import visuals from '../data/unique-visuals.json';
import TypedHeroTitle from '../components/ui/TypedHeroTitle';
import HeroTechnologyStage from '../components/ui/HeroTechnologyStage';
import HeroCurves from '../components/ui/HeroCurves';
import ShapeGrid from '../components/ui/ShapeGrid';
import SiteImage from '../components/SiteImage';
import { Container, PrimaryButton, ScrollReveal, SectionHeading } from '../components/ui';
import { ClientLogoStrip } from '../components/sections';
import {
  WhyChooseSection,
  FieldForceSection,
  CallCenterSection,
  TestimonialsSection,
} from '../components/HomeRestoredSections';
import ProductsSection from '../components/ProductsSection';
import ServicesBento from '../components/ServicesBento';
import original from '../data/home-original.json';
import CapabilityMarquee from '../components/CapabilityMarquee';
import { StickyShowcaseStack } from '../components/ui/StickyShowcase';
import SoftwareCircuitSection from '../components/SoftwareCircuitSection';
import BentCircuit from '../components/ui/BentCircuit';

const heroPhrases = [original.hero, original.companyCards[2], original.companyCards[0]];
const heroLines = [
  ['We care about the ', 'IT Solution ', 'you need'],
  ['We Dream Big ', 'and  Win Together'],
  ['Team Of Highly ', 'Experienced ', 'Professionals'],
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero home-hero-premium">
        <ShapeGrid
          className="hero-shape-grid-background"
          shape="square"
          direction="diagonal"
          lineColor="#cfe6f8"
          hoverColor="#0072bc"
          hoverFillColor="#38bdf8"
          fillOpacity={0.14}
          cellSize={44}
          speed={0.35}
          glow={0.45}
          trail={0.65}
          radius={1.8}
          clickCascade={true}
          intro={true}
          fade={0.85}
        />
        <HeroCurves />
        <BentCircuit className="hero-brand-circuit" />
        <Container className="hero-grid">
          <div className="hero-copy">
            <h1 aria-label={original.hero}>
              <TypedHeroTitle phrases={heroPhrases} lines={heroLines} />
            </h1>
            <p className="hero-description">{original.heroDescription}</p>
            <div className="button-row">
              <PrimaryButton to="#why-choose-us">LET'S EXPLORE</PrimaryButton>
            </div>
          </div>
          <HeroTechnologyStage>
            <SiteImage
              src={visuals.static.homeHero}
              alt="Software and mobile application concept illustration"
              width="1200"
              height="800"
              fetchPriority="high"
              loading="eager"
              reveal={false}
              surface={false}
              sizes="(max-width: 900px) 90vw, 640px"
            />
          </HeroTechnologyStage>
        </Container>
      </section>
      <CapabilityMarquee />
      <StickyShowcaseStack>
        <WhyChooseSection />
        <FieldForceSection />
        <CallCenterSection />
      </StickyShowcaseStack>
      <section className="section" id="services">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={original.servicesTitle}
              description={original.servicesDescription}
            />
          </ScrollReveal>
          <ServicesBento />
        </Container>
      </section>
      <ProductsSection />
      <SoftwareCircuitSection />
      <TestimonialsSection />
      <ClientLogoStrip />
    </>
  );
}
