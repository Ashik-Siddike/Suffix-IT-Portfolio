import SiteImage from '../components/SiteImage';
import { useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import { findSolution, products, services } from '../data/catalog';
import published from '../data/published-pages.json';
import {
  Container,
  PageHero,
  PrimaryButton,
  SecondaryButton,
  SectionHeading,
  ScrollReveal,
} from '../components/ui';
import { CTASection, TextLink } from '../components/sections';
import { ProductCard, ServiceCard } from '../components/cards';
import SolutionContent from '../components/SolutionContent';
import NotFoundPage from './NotFoundPage';

export default function SolutionPage() {
  const { pathname } = useLocation();
  const item = findSolution(pathname);
  if (!item) return <NotFoundPage />;
  const isProduct = pathname.startsWith('/product/');
  const original = published[pathname] || {};
  const related = (isProduct ? products : services)
    .filter((other) => other.path !== pathname)
    .slice(0, 3);
  const sourceIntro = original.blocks?.find(
    (block) => block.tag === 'p' && block.text.length > 100,
  );
  return (
    <>
      <PageHero
        eyebrow={item.category || (isProduct ? 'SUFFIX IT SOFTWARE' : 'SUFFIX IT SERVICES')}
        title={item.title}
        description={item.description}
        visual={
          <div className="solution-hero-art">
            <span className="solution-art-label">
              SUFFIX IT · {isProduct ? 'SOFTWARE SOLUTIONS' : 'TECHNOLOGY SERVICES'}
            </span>
            <SiteImage
              src={item.image}
              alt={`${item.title} — original product illustration`}
              width="600"
              height="440"
              sizes="(max-width: 900px) 90vw, 550px"
              fetchPriority="high"
            />
            <span className="solution-art-caption">{item.category || item.title}</span>
          </div>
        }
        breadcrumbs={[
          {
            label: isProduct ? 'Products' : 'Services',
            path: isProduct ? '/products' : '/services',
          },
          { label: item.title },
        ]}
      >
        <div className="button-row">
          <PrimaryButton
            to={`/contact?${isProduct ? 'intent=demo&' : ''}solution=${encodeURIComponent(item.title)}`}
          >
            {isProduct ? 'Request a demo' : 'Discuss your requirements'}
          </PrimaryButton>
          <SecondaryButton href="#capabilities">Explore capabilities</SecondaryButton>
        </div>
      </PageHero>
      <section className="section">
        <Container className="solution-intro">
          <ScrollReveal variant="left">
            <span className="eyebrow">BUILT AROUND YOUR OPERATIONS</span>
            <h2>{original.introTitle || `Explore ${item.title}.`}</h2>
            <p>{sourceIntro?.text || item.description}</p>
            {!!item.features.length && (
              <div className="solution-highlights">
                {item.features.map((feature) => (
                  <div key={feature} className="solution-highlight">
                    <Check size={18} aria-hidden="true" />
                    {feature}
                  </div>
                ))}
              </div>
            )}
          </ScrollReveal>
          <ScrollReveal variant="right" className="solution-overview-note">
            <span className="eyebrow">LET’S FIND THE RIGHT FIT</span>
            <h3>Built around your requirements.</h3>
            <p>Explore the capabilities below, then talk to our team about your operations.</p>
            <TextLink to={`/contact?solution=${encodeURIComponent(item.title)}`}>
              Discuss this solution
            </TextLink>
          </ScrollReveal>
        </Container>
      </section>
      <section id="capabilities" className="content-section">
        <Container>
          {original.blocks?.length ? (
            <SolutionContent
              blocks={original.blocks}
              slug={item.slug}
              introText={sourceIntro?.text}
            />
          ) : (
            <div className="source-content">
              <h2>Explore this solution with our team.</h2>
              <p>{item.description}</p>
              <TextLink to={`/contact?solution=${encodeURIComponent(item.title)}`}>
                Discuss your requirements
              </TextLink>
            </div>
          )}
          {original.gallery?.length > 0 && (
            <div className="source-gallery">
              {original.gallery
                .filter((img) => img.src !== item.image)
                .map((img) => (
                  <figure key={img.src}>
                    <SiteImage
                      src={img.src}
                      alt={img.alt}
                      width="900"
                      height="500"
                      loading="lazy"
                    />
                    <figcaption>{img.alt}</figcaption>
                  </figure>
                ))}
            </div>
          )}
          {item.slug === 'web-ecommerce' && (
            <div className="package-links">
              <h2>Explore our web packages</h2>
              {['Basic', 'Classic', 'Premium'].map((type, index) => (
                <div key={type} className="package-summary">
                  <h3>{type}</h3>
                  <p>Published price: ${[399, 699, 999][index]}</p>
                  <TextLink to={`/web-e-commerce-detail/${type}`}>Explore {type}</TextLink>
                </div>
              ))}
              <p>
                Prices reproduced from the original website. Contact us to confirm current pricing.
              </p>
            </div>
          )}
          {original.videos?.length > 0 && (
            <div className="package-links">
              <h2>See IoT in action</h2>
              {original.videos.map((video, index) => (
                <a
                  className="text-link"
                  href={video.url}
                  key={video.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch demonstration {index + 1}
                </a>
              ))}
            </div>
          )}
        </Container>
      </section>
      <section className="section products-section">
        <Container>
          <SectionHeading
            eyebrow="KEEP EXPLORING"
            title={isProduct ? 'More ways to move forward.' : 'Related expertise.'}
          />
          <div className="three-grid">
            {related.map((other) =>
              isProduct ? (
                <ProductCard item={other} key={other.path} />
              ) : (
                <ServiceCard item={other} key={other.path} />
              ),
            )}
          </div>
        </Container>
      </section>
      <CTASection
        title={`Let’s talk about ${item.title}.`}
        description="Discuss your requirements with our team and explore the right next step for your business."
      />
    </>
  );
}
