import { useRef } from 'react';
import visuals from '../data/unique-visuals.json';
import original from '../data/home-original.json';
import { Check, Quote, Users, Cpu } from './GeneratedIcons';
import { Container, PrimaryButton, ScrollReveal, SectionHeading } from './ui';
import SiteImage from './SiteImage';
import testimonials from '../data/home-testimonials.json';
import useBorderGlow from './useBorderGlow';
import CompanyCircuit from './ui/CompanyCircuit';
import StickyShowcase from './ui/StickyShowcase';
import Icon from './Icon';
import { TextHoverEffect } from './ui/text-hover-effect';

const promises = [
  '24/7 support service',
  'On-time Delivery',
  'Within Budget',
  'Creating ideas with passion',
  'Assure best quality',
  'Solution for revolution',
];
const fieldFeatures = [
  'Invoice and Payment',
  'Live Tracking',
  'Task Management',
  'Attendance Management',
  'Expense Management',
  'Chat and Collaboration',
  'Offline data synchronization',
];

export function WhyChooseSection() {
  return (
    <StickyShowcase
      id="why-choose-us"
      className="restored-why"
      index={0}
      side="left"
      image={
        <div className="restored-why-art">
          <SiteImage
            src={visuals.static.homeWhy}
            alt="Technology engineering team illustration"
            width="2000"
            height="1300"
            loading="lazy"
            reveal={false}
            sizes="(max-width: 800px) 80vw, 540px"
          />
        </div>
      }
    >
      <SectionHeading
        eyebrow="Why Choose Us"
        title={<span id="why-choose-us-title">{original.whyTitle}</span>}
        description={original.whyDescription}
      />
      <div className="restored-values">
        <span>
          <Users size={20} aria-hidden="true" />
          Client Focused
        </span>
        <span>
          <Cpu size={20} aria-hidden="true" />
          Next Gen Technology Provider
        </span>
      </div>
      <ul className="restored-checks why-benefits">
        {promises.map((text) => (
          <li key={text}>
            <Check size={18} aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
      <PrimaryButton to="/about">Learn More</PrimaryButton>
    </StickyShowcase>
  );
}

export function CompanyValuesSection() {
  const values = [
    visuals.static.aboutTeam,
    visuals.static.aboutSoftware,
    visuals.static.aboutAmbition,
  ].map((image, index) => ({ image, title: original.companyCards[index] }));
  return (
    <section className="section restored-company" id="our-company">
      <Container>
        <ScrollReveal>
          <SectionHeading title={original.companyTitle} description={original.companyDescription} />
        </ScrollReveal>
        <CompanyCircuit items={values} />
      </Container>
    </section>
  );
}

function FieldFeatureChips({ items }) {
  const listRef = useRef(null);

  const handleMouseEnter = (index) => {
    const list = listRef.current;
    if (!list) return;
    const chips = Array.from(list.children);
    if (!chips[index]) return;

    const hoveredTop = chips[index].offsetTop;
    const hoveredLeft = chips[index].offsetLeft;
    const hoveredWidth = chips[index].offsetWidth;
    const hx = hoveredLeft + hoveredWidth / 2;

    chips.forEach((chip, i) => {
      if (i === index) {
        chip.style.setProperty('--chip-scale', '1.14');
        chip.style.setProperty('--chip-tx', '0px');
        chip.style.setProperty('--chip-ty', '-3px');
        chip.style.setProperty('z-index', '10');
        chip.dataset.hovered = 'true';
      } else {
        const cx = chip.offsetLeft + chip.offsetWidth / 2;
        const dx = cx - hx;
        const rowDiff = chip.offsetTop - hoveredTop;

        let tx = 0;
        let ty = 0;

        // Same row: offsetTop matches within 10px
        if (Math.abs(rowDiff) < 10) {
          tx = dx < 0 ? -16 : 16;
          ty = 0;
        } else if (Math.abs(rowDiff) < 60) {
          // Immediately adjacent row (above or below)
          tx = dx < 0 ? -10 : 10;
          ty = rowDiff > 0 ? 6 : -6;
        } else {
          // Two rows away
          tx = dx < 0 ? -6 : 6;
          ty = rowDiff > 0 ? 10 : -10;
        }

        chip.style.setProperty('--chip-scale', '0.96');
        chip.style.setProperty('--chip-tx', `${tx}px`);
        chip.style.setProperty('--chip-ty', `${ty}px`);
        chip.style.setProperty('z-index', '1');
        delete chip.dataset.hovered;
      }
    });
  };

  const handleMouseLeave = () => {
    const list = listRef.current;
    if (!list) return;
    const chips = Array.from(list.children);
    chips.forEach((chip) => {
      chip.style.removeProperty('--chip-scale');
      chip.style.removeProperty('--chip-tx');
      chip.style.removeProperty('--chip-ty');
      chip.style.removeProperty('z-index');
      delete chip.dataset.hovered;
    });
  };

  return (
    <ul ref={listRef} className="restored-checks field-feature-chips" onMouseLeave={handleMouseLeave}>
      {items.map((text, index) => (
        <li
          key={text}
          onMouseEnter={() => handleMouseEnter(index)}
          onFocus={() => handleMouseEnter(index)}
          onBlur={handleMouseLeave}
          tabIndex={0}
        >
          <Check size={18} aria-hidden="true" />
          {text}
        </li>
      ))}
    </ul>
  );
}

export function FieldForceSection() {
  return (
    <StickyShowcase
      id="field-force"
      className="restored-field"
      index={1}
      side="right"
      image={
        <SiteImage
          src={visuals.static.homeField}
          alt="Field Force Management concept illustration"
          width="650"
          height="500"
          loading="lazy"
          reveal={false}
          sizes="(max-width: 800px) 80vw, 540px"
        />
      }
    >
      <SectionHeading title={<span id="field-force-title">{original.fieldTitle}</span>} />
      <FieldFeatureChips items={fieldFeatures} />
      <PrimaryButton to="/product/field-force-management">VIEW MORE DETAILS</PrimaryButton>
    </StickyShowcase>
  );
}

export function CallCenterSection() {
  return (
    <StickyShowcase
      id="call-center"
      className="call-center-section"
      index={2}
      side="left"
      image={
        <div className="sticky-call-art">
          <SiteImage
            src={visuals.static.homeCall}
            alt=""
            width="1200"
            height="675"
            loading="lazy"
            sizes="(max-width: 800px) 80vw, 540px"
            reveal={false}
            surface={false}
          />
        </div>
      }
    >
      <SectionHeading
        title={<span id="call-center-title">{original.callTitle}</span>}
        description={original.callDescription}
      />
      <div className="sticky-call-services">
        {original.calls.map((item, index) => (
          <article key={item.title}>
            <span className="icon-box" aria-hidden="true">
              <Icon name={['Phone', 'Radio', 'MessageSquare'][index]} size={20} />
            </span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
      <PrimaryButton href="http://suffixcallcenter.com/" target="_blank" rel="noreferrer">
        More Info
      </PrimaryButton>
    </StickyShowcase>
  );
}

export function TestimonialsSection() {
  const sectionRef = useRef(null);
  const glow = useBorderGlow();
  return (
    <section ref={sectionRef} className="section restored-testimonials" id="testimonials">
      <div className="testimonials-brand-wash" aria-hidden="true">
        <TextHoverEffect text="SUFFIX IT" targetRef={sectionRef} duration={0.18} />
      </div>
      <Container>
        <div
          className="testimonials-editorial"
          role="region"
          aria-label="Client testimonials"
          {...glow}
        >
          <ScrollReveal variant="left" className="testimonials-intro">
            <SectionHeading
              title={original.testimonialTitle}
              description={original.testimonialDescription}
            />
          </ScrollReveal>
          {testimonials.map((item, index) => (
            <ScrollReveal
              as="figure"
              variant={index === 0 ? 'rise' : 'right'}
              delay={index * 0.1}
              className={`testimonial-story testimonial-story-${index + 1}`}
              key={item.name}
            >
              <Quote size={20} aria-hidden="true" />
              <h3>{item.title}</h3>
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <SiteImage
                  src={item.image}
                  alt={item.name}
                  className="testimonial-avatar"
                  width="48"
                  height="48"
                  loading="lazy"
                  reveal={false}
                />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </figcaption>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
