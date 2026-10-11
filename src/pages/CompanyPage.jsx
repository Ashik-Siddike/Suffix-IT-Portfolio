import visuals from '../data/unique-visuals.json';
import FractalBloomHero from '../components/ui/fractal-bloom-tree';
import SiteImage from '../components/SiteImage';
import { Container, ScrollReveal } from '../components/ui';
import AnimatedText from '../components/AnimatedText';
import { CompanyValuesSection } from '../components/HomeRestoredSections';
import published from '../data/published-pages.json';
import { ChevronDown } from '../components/GeneratedIcons';

const paragraphs = published['/about'].blocks.filter((block) => block.tag === 'p');
export default function CompanyPage() {
  return (
    <>
      <FractalBloomHero className="about-original-hero">
        <Container>
          <h1>
            <AnimatedText text="About Us" onLoad />
          </h1>
          <a href="#whoWeAre" className="about-scroll-link" aria-label="Read our history">
            <ChevronDown size={28} aria-hidden="true" />
          </a>
        </Container>
        <div className="about-wave" aria-hidden="true" />
      </FractalBloomHero>
      <section className="section about-history" id="whoWeAre">
        <Container className="about-history-grid">
          <ScrollReveal variant="left" className="company-copy">
            <span className="eyebrow">Our History</span>
            <h2>Who we are?</h2>
            <p>{paragraphs[0].text}</p>
          </ScrollReveal>
          <ScrollReveal variant="right" className="company-photo">
            <SiteImage
              src={visuals.static.aboutHistory}
              alt="Technology team collaboration illustration"
              width="2032"
              height="1335"
              sizes="(max-width: 800px) 90vw, 620px"
            />
          </ScrollReveal>
        </Container>
      </section>
      <section className="section about-purpose">
        <Container>
          {['Vision', 'Mission'].map((title, index) => (
            <div className={`about-purpose-row ${index ? 'is-reversed' : ''}`} key={title}>
              <ScrollReveal variant={index ? 'right' : 'left'} className="about-purpose-copy">
                <h2>{title}</h2>
                <p>{paragraphs[index + 1].text}</p>
              </ScrollReveal>
              <ScrollReveal variant={index ? 'left' : 'right'} className="about-purpose-art">
                <SiteImage
                  src={index ? visuals.static.aboutMission : visuals.static.aboutVision}
                  alt=""
                  width="1536"
                  height="1024"
                  loading="lazy"
                  sizes="(max-width: 800px) 90vw, 560px"
                />
              </ScrollReveal>
            </div>
          ))}
        </Container>
      </section>
      <CompanyValuesSection />
    </>
  );
}
