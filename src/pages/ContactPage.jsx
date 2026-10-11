import { Mail, MapPin, Phone } from '../components/GeneratedIcons';
import { company } from '../data/company';
import { Container, PageHero, ScrollReveal } from '../components/ui';
import ContactForm from '../components/ContactForm';
import { TubesBackground } from '../components/ui/neon-flow';

export default function ContactPage() {
  return (
    <>
      <TubesBackground>
        <PageHero
          eyebrow="LET’S START A CONVERSATION"
          title="Good things start with hello."
          description="A new project, a product demo, or a technology challenge. Tell us what’s on your mind."
          breadcrumbs={[{ label: 'Contact' }]}
        />
      </TubesBackground>
      <section className="section">
        <Container className="contact-grid">
          <ScrollReveal variant="left" className="contact-info">
            <span className="eyebrow">GET IN TOUCH</span>
            <h2>
              Let’s move your
              <br />
              business forward.
            </h2>
            <p>Connect directly with the Suffix IT team to discuss your requirements.</p>
            <div className="contact-method">
              <span className="icon-box">
                <Mail size={22} aria-hidden="true" />
              </span>
              <div>
                <h3>Email us</h3>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </div>
            </div>
            <div className="contact-method">
              <span className="icon-box">
                <Phone size={22} aria-hidden="true" />
              </span>
              <div>
                <h3>Call us</h3>
                <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
              </div>
            </div>
            <div className="contact-method">
              <span className="icon-box">
                <MapPin size={22} aria-hidden="true" />
              </span>
              <div>
                <h3>Find us in Dhaka</h3>
                <p>{company.address}</p>
                <a
                  className="text-link"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="right" delay={0.1}>
            <ContactForm />
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
