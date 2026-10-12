import SiteImage from './SiteImage';
import { ScrollReveal } from './ui';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Quote } from './GeneratedIcons';
import Icon from './Icon';
import { TechnologyIcon } from './TechnologyVector';

export function ServiceCard({ item, number }) {
  return (
    <ScrollReveal as="article" variant="unfold" className="service-card">
      <div className="card-top">
        <span className="icon-box">
          <Icon name={item.icon} />
        </span>
        {number && <span className="card-number">{String(number).padStart(2, '0')}</span>}
      </div>
      <h3>
        <Link to={item.path}>
          {item.title}
          <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </h3>
      <p>{item.description}</p>
      <span className="card-bottom">
        Explore service <ArrowUpRight size={16} aria-hidden="true" />
      </span>
    </ScrollReveal>
  );
}

export function ProductCard({ item, image = item.image }) {
  return (
    <ScrollReveal as="article" variant="unfold" className="product-card">
      <div className="product-image">
        <SiteImage
          src={image}
          alt={`${item.title} concept illustration`}
          loading="lazy"
          width="480"
          height="300"
        />
      </div>
      <div className="product-card-body">
        <span className="eyebrow">{item.category}</span>
        <h3>
          <Link to={item.path}>
            {item.title}
            <ArrowUpRight size={22} aria-hidden="true" />
          </Link>
        </h3>
        <p>{item.description}</p>
      </div>
    </ScrollReveal>
  );
}

export function FeatureCard({ title, description, icon, vectorKind }) {
  return (
    <ScrollReveal as="article" variant="unfold" className="feature-card">
      {vectorKind ? (
        <TechnologyIcon kind={vectorKind} />
      ) : (
        <span className="icon-box">
          <Icon name={icon} />
        </span>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </ScrollReveal>
  );
}

export function IndustryCard({ item }) {
  return (
    <ScrollReveal as="article" variant="unfold" className="industry-card">
      <Icon name={item.icon} size={26} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </ScrollReveal>
  );
}

export function TestimonialCard({ item }) {
  return (
    <ScrollReveal as="figure" variant="fade" className="testimonial-card">
      <Quote size={22} aria-hidden="true" />
      <blockquote>“{item.quote}”</blockquote>
      <figcaption>
        <strong>{item.name}</strong>
        <span>{item.role}</span>
        <span>{item.organization}</span>
      </figcaption>
    </ScrollReveal>
  );
}
