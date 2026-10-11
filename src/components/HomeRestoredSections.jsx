import original from '../data/home-original.json';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Quote, Users, Cpu } from 'lucide-react';
import { motion as Motion, useReducedMotion } from 'motion/react';
import { Container, PrimaryButton, ScrollReveal, SectionHeading } from './ui';
import SiteImage from './SiteImage';
import testimonials from '../data/home-testimonials.json';

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
    <section className="section restored-why" id="why-choose-us">
      <Container className="restored-split">
        <ScrollReveal variant="left" className="restored-why-art">
          <SiteImage
            src="/assets/fieldForce.svg.815b7443.png"
            alt="Suffix IT desktop dashboard and mobile applications"
            width="2000"
            height="1300"
            loading="lazy"
          />
        </ScrollReveal>
        <ScrollReveal variant="right">
          <SectionHeading
            eyebrow="Why Choose Us"
            title={original.whyTitle}
            description="We consist of a great team of professional and highly skilled engineers with excellent technical knowledge and experience for developing quality software."
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
          <ul className="restored-checks">
            {promises.map((text) => (
              <li key={text}>
                <Check size={18} aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
          <PrimaryButton to="/about">Learn More</PrimaryButton>
        </ScrollReveal>
      </Container>
    </section>
  );
}

export function CompanyValuesSection() {
  const values = ['team.2ef9cf98.svg', 'software.0c032998.svg', 'web.88ae012d.svg'].map(
    (image, index) => [image, original.companyCards[index]],
  );
  return (
    <section className="section restored-company" id="our-company">
      <Container>
        <ScrollReveal>
          <SectionHeading title={original.companyTitle} description={original.companyDescription} />
        </ScrollReveal>
        <div className="three-grid">
          {values.map(([image, title], index) => (
            <ScrollReveal
              as="article"
              variant={['left', 'rise', 'right'][index]}
              className="company-value-card"
              delay={index * 0.1}
              key={title}
            >
              <SiteImage src={`/assets/${image}`} alt="" width="400" height="250" loading="lazy" />
              <h3>{title}</h3>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FieldForceSection() {
  return (
    <section className="section restored-field" id="field-force">
      <Container className="restored-split">
        <ScrollReveal variant="left">
          <SectionHeading title={original.fieldTitle} />
          <ul className="restored-checks">
            {fieldFeatures.map((text) => (
              <li key={text}>
                <Check size={18} aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
          <PrimaryButton to="/product/field-force-management">VIEW MORE DETAILS</PrimaryButton>
        </ScrollReveal>
        <ScrollReveal variant="right">
          <SiteImage
            src="/assets/field-force.497227c8.png"
            alt="Original Suffix Field Force mobile application screens"
            width="650"
            height="500"
            loading="lazy"
          />
        </ScrollReveal>
      </Container>
    </section>
  );
}

export function TestimonialsSection() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const select = (index) => setSelected((index + testimonials.length) % testimonials.length);
  const item = testimonials[selected];
  return (
    <section className="section restored-testimonials" id="testimonials">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title={original.testimonialTitle}
            description={original.testimonialDescription}
          />
        </ScrollReveal>
        <ScrollReveal variant="fade">
          <div
            className="testimonial-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
          >
            <div className="testimonial-controls">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => select(selected - 1)}
              >
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
              <p role="status">
                {selected + 1} / {testimonials.length}
              </p>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => select(selected + 1)}
              >
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
            <Motion.figure
              key={item.name}
              className="restored-quote"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.6 }}
            >
              <Quote size={34} aria-hidden="true" />
              <h3>{item.title}</h3>
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <SiteImage src={item.image} alt={item.name} width="64" height="64" reveal={false} />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                  <span>{item.organization}</span>
                </div>
              </figcaption>
            </Motion.figure>
            <div className="testimonial-dots">
              {testimonials.map((person, index) => (
                <button
                  type="button"
                  key={person.name}
                  aria-label={`Show testimonial from ${person.name}`}
                  aria-current={selected === index ? 'true' : undefined}
                  onClick={() => select(index)}
                >
                  <span />
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
