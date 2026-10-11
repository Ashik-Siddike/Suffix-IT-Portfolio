import visuals from '../data/unique-visuals.json';
import SonarGrid from '../components/ui/SonarGrid';
import AnimatedText from '../components/AnimatedText';
import HeroTechnologyStage from '../components/ui/HeroTechnologyStage';
import HeroNeonFlow from '../components/ui/HeroNeonFlow';
import SiteImage from '../components/SiteImage';
import { Container, PrimaryButton, ScrollReveal, SectionHeading } from '../components/ui';
import { FeatureCard } from '../components/cards';
import { ClientLogoStrip } from '../components/sections';
import {
  WhyChooseSection,
  FieldForceSection,
  TestimonialsSection,
} from '../components/HomeRestoredSections';
import ProductsSection from '../components/ProductsSection';
import ServicesBento from '../components/ServicesBento';
import original from '../data/home-original.json';

export default function HomePage() {
  return (
    <>
      <SonarGrid as="section" className="home-hero home-hero-premium">
        <HeroNeonFlow />
        <Container className="hero-grid">
          <div className="hero-copy">
            <h1>
              <AnimatedText text={original.hero} onLoad />
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
              width="2000"
              height="1300"
              fetchPriority="high"
              reveal={false}
              surface={false}
              sizes="(max-width: 900px) 90vw, 640px"
            />
          </HeroTechnologyStage>
        </Container>
      </SonarGrid>
      <WhyChooseSection />
      <FieldForceSection />
      <section className="section call-center-section">
        <Container>
          <div className="call-center-intro">
            <SectionHeading title={original.callTitle} description={original.callDescription} />
            <ScrollReveal variant="right">
              <SiteImage
                src={visuals.static.homeCall}
                alt=""
                width="1200"
                height="675"
                loading="lazy"
                sizes="(max-width: 800px) 90vw, 520px"
              />
            </ScrollReveal>
          </div>
          <div className="three-grid">
            {original.calls.map((item, index) => (
              <FeatureCard
                key={item.title}
                icon={['Phone', 'Radio', 'MessageSquare'][index]}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
          <div className="original-more">
            <PrimaryButton href="http://suffixcallcenter.com/" target="_blank" rel="noreferrer">
              More Info
            </PrimaryButton>
          </div>
        </Container>
      </section>
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
      <TestimonialsSection />
      <ClientLogoStrip />
    </>
  );
}
