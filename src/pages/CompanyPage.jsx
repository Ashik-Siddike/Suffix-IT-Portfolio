import SiteImage from '../components/SiteImage';
import { Container, ScrollReveal } from '../components/ui';
import AnimatedText from '../components/AnimatedText';
import { CompanyValuesSection } from '../components/HomeRestoredSections';
import published from '../data/published-pages.json';
import { ChevronDown } from 'lucide-react';

const paragraphs = published['/about'].blocks.filter((block) => block.tag === 'p');
export default function CompanyPage() {
  return (
    <>
      <section className="about-original-hero">
        <Container>
          <h1>
            <AnimatedText text="About Us" onLoad />
          </h1>
          <a href="#whoWeAre" className="about-scroll-link" aria-label="Read our history">
            <ChevronDown size={28} aria-hidden="true" />
          </a>
        </Container>
        <svg
          className="about-wave"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 34 Q420 105 820 54 T1440 24 V90 H0Z" fill="#ffffff" opacity=".3" />
          <path d="M0 45 Q420 116 820 65 T1440 35 V90 H0Z" fill="#ffffff" opacity=".55" />
          <path d="M0 57 Q420 126 820 76 T1440 47 V90 H0Z" fill="#ffffff" />
        </svg>
      </section>
      <section className="section about-history" id="whoWeAre">
        <Container className="about-history-grid">
          <ScrollReveal variant="left" className="company-copy">
            <span className="eyebrow">Our History</span>
            <h2>Who we are?</h2>
            <p>{paragraphs[0].text}</p>
          </ScrollReveal>
          <ScrollReveal variant="right" className="company-photo">
            <SiteImage
              src="/assets/company-original.png"
              alt="Suffix IT team at Corporate Day, 15 October 2022"
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
                  src={`/assets/generated/about/${title.toLowerCase()}.webp`}
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
