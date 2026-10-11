import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ClientMarquee from './ClientMarquee';
import { Container, PrimaryButton, ScrollReveal } from './ui';

export function ClientLogoStrip() {
  return <ClientMarquee />;
}

export function ClientLogoGrid() {
  return <ClientMarquee compact />;
}

// Catalogue counts, rather than invented company performance metrics.
export function StatsSection({ serviceCount, productCount }) {
  return (
    <div className="stats-row">
      <div>
        <strong>{serviceCount}</strong>
        <span>Specialist services</span>
      </div>
      <div>
        <strong>{productCount}</strong>
        <span>Software solutions</span>
      </div>
      <div>
        <strong>One</strong>
        <span>Technology partner</span>
      </div>
    </div>
  );
}

export function CTASection({
  title = 'Your next chapter starts with the right technology.',
  description = 'Tell us what you’re working towards. Let’s explore how Suffix IT can help.',
}) {
  return (
    <section className="cta-section">
      <Container>
        <ScrollReveal variant="zoom" className="cta-inner">
          <div>
            <span className="eyebrow">LET’S BUILD WHAT’S NEXT</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <PrimaryButton to="/contact">Start a conversation</PrimaryButton>
        </ScrollReveal>
      </Container>
    </section>
  );
}

export function TextLink({ to, children }) {
  return (
    <Link to={to} className="text-link">
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}
