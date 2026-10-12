import { Mail, MapPin, Phone } from '../components/GeneratedIcons';
import { company } from '../data/company';
import { Container, PageHero, ScrollReveal } from '../components/ui';
import ContactForm from '../components/ContactForm';
import { TubesBackground } from '../components/ui/neon-flow';
import published from '../data/published-pages.json';
import copy from '../data/original-page-copy.json';

export default function ContactPage() {
  return (
    <>
      <TubesBackground>
        <PageHero
          title={copy['/contact'].title}
          description={published['/contact'].blocks[0].text}
          breadcrumbs={[{ label: 'Contact' }]}
        />
      </TubesBackground>
      <section className="section">
        <Container className="contact-grid">
          <ScrollReveal variant="left" className="contact-info">
            <h2>Our Location</h2>
            <div className="contact-method">
              <span className="icon-box">
                <Mail size={22} aria-hidden="true" />
              </span>
              <div>
                <h3>For more information:</h3>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </div>
            </div>
            <div className="contact-method">
              <span className="icon-box">
                <Phone size={22} aria-hidden="true" />
              </span>
              <div>
                <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
              </div>
            </div>
            <div className="contact-method">
              <span className="icon-box">
                <MapPin size={22} aria-hidden="true" />
              </span>
              <div>
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
