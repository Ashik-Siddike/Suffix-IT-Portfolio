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
    <article className="product-card group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 hover:border-sky-300 p-5 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
      {/* Top glowing ambient highlight */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="relative rounded-2xl bg-gradient-to-b from-[#f2f8fc] to-[#e4f1fa] p-4 flex items-center justify-center overflow-hidden border border-sky-100/60 mb-4 group-hover:bg-gradient-to-b group-hover:from-sky-50 group-hover:to-blue-100/50 transition-colors">
          <SiteImage
            src={image}
            alt={`${item.title} concept illustration`}
            loading="lazy"
            width="480"
            height="300"
            className="h-40 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="product-card-body">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200/70 text-[11px] font-bold uppercase tracking-wider text-sky-700 mb-2">
            {item.category}
          </span>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors flex items-center justify-between">
            <Link to={item.path} className="stretched-link">
              {item.title}
            </Link>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-sm">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </div>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 line-clamp-3">
            {item.description}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-bold text-sky-600 flex items-center gap-1 group-hover:gap-2 transition-all">
          Explore Solution &rarr;
        </span>
        <span className="text-[11px] font-semibold text-slate-400">Enterprise Ready</span>
      </div>
    </article>
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
