import useMotionPreference from './ui/useMotionPreference';
import { Link } from 'react-router-dom';
import AnimatedText from './AnimatedText';
import { motion as Motion } from 'motion/react';
import { ArrowRight, ChevronRight, CircleAlert } from './GeneratedIcons';
import ModernCard from './ui/ModernCard';

export function Container({ as: Tag = 'div', children, className = '', ...props }) {
  return (
    <Tag className={`container ${className}`} {...props}>
      {children}
    </Tag>
  );
}

export function PrimaryButton({ children, to, href, className = '', ...props }) {
  const content = (
    <>
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </>
  );
  if (to)
    return (
      <Link className={`button button-primary ${className}`} to={to} {...props}>
        {content}
      </Link>
    );
  if (href)
    return (
      <a className={`button button-primary ${className}`} href={href} {...props}>
        {content}
      </a>
    );
  return (
    <button className={`button button-primary ${className}`} {...props}>
      {content}
    </button>
  );
}

export function SecondaryButton({ children, to, href, className = '', ...props }) {
  if (to)
    return (
      <Link className={`button button-secondary ${className}`} to={to} {...props}>
        {children}
        <ArrowRight size={17} aria-hidden="true" />
      </Link>
    );
  return (
    <a className={`button button-secondary ${className}`} href={href} {...props}>
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  variant = 'rise',
  as = 'div',
}) {
  const reduced = useMotionPreference();
  const Element = Motion[as];
  const entrances = {
    rise: { opacity: 0, y: 24 },
    left: { opacity: 0, x: -32 },
    right: { opacity: 0, x: 32 },
    zoom: { opacity: 0, scale: 0.94, y: 12 },
    unfold: { opacity: 0, clipPath: 'inset(0 0 18% 0 round 12px)' },
    fade: { opacity: 0 },
  };
  const card = (
    <Element
      className={className}
      data-reveal={variant}
      initial={reduced ? false : entrances[variant] || entrances.rise}
      whileInView={
        variant === 'fade' || variant === 'unfold'
          ? {
              opacity: 1,
              clipPath: 'inset(0 0 0% 0 round 0px)',
              transitionEnd: { clipPath: 'none' },
            }
          : { opacity: 1, x: 0, y: 0, scale: 1 }
      }
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -140px 0px' }}
      transition={{
        duration: reduced ? 0 : 1.05,
        delay: reduced ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </Element>
  );
  return /\b(service-card|product-card|company-value-card|feature-card|industry-card|job-card)\b/.test(
    className,
  ) ? (
    <ModernCard>{card}</ModernCard>
  ) : (
    card
  );
}

export function SectionHeading({ eyebrow, title, description, children }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{typeof title === 'string' ? <AnimatedText text={title} /> : title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label}>
            <ChevronRight size={13} aria-hidden="true" />
            {item.path && index < items.length - 1 ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ eyebrow, title, description, breadcrumbs, children, visual }) {
  return (
    <section className={`page-hero ${visual ? 'page-hero-illustrated' : ''}`}>
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        <div className="page-hero-inner">
          <ScrollReveal variant="left">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h1>{title}</h1>
            {description && <p className="lead">{description}</p>}
            {children}
          </ScrollReveal>
          {visual && (
            <ScrollReveal variant="right" delay={0.12} className="page-hero-visual">
              {visual}
            </ScrollReveal>
          )}
        </div>
      </Container>
    </section>
  );
}

export function Accordion({ items }) {
  return (
    <div className="accordion">
      {items.map(({ title, content }) => (
        <details key={title}>
          <summary>
            {title}
            <ChevronRight size={18} aria-hidden="true" />
          </summary>
          <div>{content}</div>
        </details>
      ))}
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="brand-loading-screen" role="status" aria-label="Loading Suffix IT">
      <img
        className="brand-loading-logo"
        src="/assets/Suffix-Logo.73142c9b.png"
        alt="Suffix IT"
        width="2083"
        height="789"
        fetchPriority="high"
      />
      <div className="brand-loading-balls" aria-hidden="true">
        {[0, 1, 2, 3].map((index) => (
          <span
            className="brand-loading-lane"
            key={index}
            style={{ '--bounce-delay': `${index * -0.18}s` }}
          >
            <i />
            <b />
          </span>
        ))}
      </div>
      <span className="brand-loading-label">Loading page…</span>
    </div>
  );
}
export function EmptyState({ title = 'No results found', description = 'Try another search.' }) {
  return (
    <div className="state">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
export function ErrorState({
  title = 'This page could not load',
  description = 'Please reload the page to try again.',
}) {
  return (
    <div className="state" role="alert">
      <CircleAlert aria-hidden="true" />
      <h2>{title}</h2>
      <p>{description}</p>
      <SecondaryButton href="/">Return home</SecondaryButton>
    </div>
  );
}
