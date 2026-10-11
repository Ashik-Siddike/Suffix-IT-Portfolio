import visuals from '../data/unique-visuals.json';
import original from '../data/home-original.json';
import { Check, Quote, Users, Cpu } from './GeneratedIcons';
import { Container, PrimaryButton, ScrollReveal, SectionHeading } from './ui';
import SiteImage from './SiteImage';
import testimonials from '../data/home-testimonials.json';
import useBorderGlow from './useBorderGlow';

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
            src={visuals.static.homeWhy}
            alt="Technology engineering team illustration"
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
  const values = [
    visuals.static.aboutTeam,
    visuals.static.aboutSoftware,
    visuals.static.aboutAmbition,
  ].map((image, index) => [image, original.companyCards[index]]);
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
              <SiteImage src={image} alt="" width="400" height="250" loading="lazy" />
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
            src={visuals.static.homeField}
            alt="Field Force Management concept illustration"
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
  const glow = useBorderGlow();
  return (
    <section className="section restored-testimonials" id="testimonials">
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
              <Quote size={30} aria-hidden="true" />
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
