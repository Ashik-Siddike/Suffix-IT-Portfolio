import visuals from '../data/unique-visuals.json';
import { ZoomParallax } from '../components/ui/zoom-parallax';
import SiteImage from '../components/SiteImage';
import { useLocation } from 'react-router-dom';
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
import { TextLink } from '../components/sections';
import pageCopy from '../data/original-page-copy.json';
import SourceContent from '../components/SourceContent';
import { ProductCard, ServiceCard } from '../components/cards';
import SolutionContent from '../components/SolutionContent';
import NotFoundPage from './NotFoundPage';
import { solutionSections } from '../lib/solution-sections';
import screens from '../data/software-screens.json';
import SoftwarePreview from '../components/SoftwarePreview';

export default function SolutionPage() {
  const { pathname } = useLocation();
  const item = findSolution(pathname);
  if (!item) return <NotFoundPage />;
  const isProduct = pathname.startsWith('/product/');
  const original = published[pathname] || {};
  const gallery = visuals.galleries[pathname] || [];
  const related = (isProduct ? products : services)
    .filter((other) => other.path !== pathname)
    .slice(0, 3);
  const sourceIntro = original.blocks?.find(
    (block) => block.tag === 'p' && block.text.length > 100,
  );
  const sections = solutionSections(original.blocks, sourceIntro?.text);
  const softwareScreens = screens[item.slug] || [];
  return (
    <>
      <PageHero
        title={item.title}
        visual={
          <div className="solution-hero-art">
            <SiteImage
              src={item.image}
              alt={`${item.title} — conceptual product illustration`}
              width="600"
              height="440"
              sizes="(max-width: 900px) 90vw, 550px"
              fetchPriority="high"
            />
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
      {sourceIntro && (
        <section className="section">
          <Container className="solution-original-intro">
            <ScrollReveal variant="left">
              <h2>{original.introTitle || item.title}</h2>
              <p>{sourceIntro.text}</p>
            </ScrollReveal>
          </Container>
        </section>
      )}
      {softwareScreens.length > 0 && (
        <section
          className="section solution-software"
          aria-label={`${item.title} software screens`}
        >
          <Container className="solution-software-grid">
            {softwareScreens.map((screen) => (
              <SoftwarePreview key={screen.src} screen={screen} />
            ))}
          </Container>
        </section>
      )}
      <section id="capabilities" className="content-section solution-details-section">
        <Container className="solution-details-layout">
          {sections.length > 0 && (
            <nav className="solution-section-nav" aria-label="On this page">
              <h2>On this page</h2>
              <div>
                {sections.map((section, index) => (
                  <a key={index} href={`#${item.slug}-section-${index}`}>
                    {section.title}
                  </a>
                ))}
              </div>
            </nav>
          )}
          <div className="solution-details-body">
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
            {gallery.length === 7 ? (
              <ZoomParallax images={gallery} label={`${item.title} illustration gallery`} />
            ) : (
              gallery.length > 0 && (
                <div className="source-gallery">
                  {gallery
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
                      </figure>
                    ))}
                </div>
              )
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
                  Prices reproduced from the original website. Contact us to confirm current
                  pricing.
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
          </div>
        </Container>
      </section>
      <section className="section products-section">
        <Container>
          <SectionHeading title={isProduct ? 'Our Products' : 'Our Services'} />
          <div className="three-grid">
            {related.map((other) =>
              isProduct ? (
                <ProductCard
                  item={other}
                  key={other.path}
                  image={visuals.relatedCards[pathname][other.path]}
                />
              ) : (
                <ServiceCard item={other} key={other.path} />
              ),
            )}
          </div>
        </Container>
      </section>
      {pageCopy[pathname]?.demo.length > 0 && (
        <section className="section original-demo">
          <Container>
            <SourceContent blocks={pageCopy[pathname].demo} />
            <PrimaryButton to={`/contact?intent=demo&solution=${encodeURIComponent(item.title)}`}>
              REQUEST FOR A DEMO
            </PrimaryButton>
          </Container>
        </section>
      )}
    </>
  );
}
