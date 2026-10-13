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
import ProductDualDeviceShowcase from '../components/ProductDualDeviceShowcase';
import { Sparkles, Zap, ShieldCheck, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

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
      {isProduct ? (
        <ProductDualDeviceShowcase item={item} />
      ) : (
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
              label: 'Services',
              path: '/services',
            },
            { label: item.title },
          ]}
        >
          <div className="button-row">
            <PrimaryButton
              to={`/contact?solution=${encodeURIComponent(item.title)}`}
            >
              Discuss your requirements
            </PrimaryButton>
            <SecondaryButton href="#capabilities">Explore capabilities</SecondaryButton>
          </div>
        </PageHero>
      )}
      {sourceIntro && (
        <section className="relative py-12 md:py-16 bg-gradient-to-b from-[#edf6fc]/50 via-white to-white overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-sky-400/10 to-transparent blur-3xl" />
          
          <Container>
            <div className="relative rounded-3xl bg-gradient-to-br from-white via-sky-50/40 to-blue-50/30 border border-sky-200/80 p-8 sm:p-10 md:p-12 shadow-xl shadow-sky-950/[0.03] backdrop-blur-md overflow-hidden">
              {/* Top accent highlight */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400" />
              
              <div className="flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/90 border border-sky-300/60 text-sky-800 text-xs font-bold uppercase tracking-wider w-fit shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                  <span>Executive Architecture Overview</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {original.introTitle || item.title}
                </h2>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-4xl font-normal">
                  {sourceIntro.text}
                </p>

                {/* Key architectural pillar badges */}
                <div className="mt-4 pt-6 border-t border-sky-100/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/80 border border-slate-200/80 rounded-xl px-3 py-2.5 shadow-sm">
                    <Zap className="h-4 w-4 text-sky-600 shrink-0" />
                    <span>High Throughput</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/80 border border-slate-200/80 rounded-xl px-3 py-2.5 shadow-sm">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Enterprise Security</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/80 border border-slate-200/80 rounded-xl px-3 py-2.5 shadow-sm">
                    <Layers className="h-4 w-4 text-indigo-600 shrink-0" />
                    <span>Modular Suite</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/80 border border-slate-200/80 rounded-xl px-3 py-2.5 shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0" />
                    <span>Cloud &amp; Mobile Ready</span>
                  </div>
                </div>
              </div>
            </div>
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
      <section id="capabilities" className="content-section solution-details-section py-12 md:py-16">
        <Container className="solution-details-layout">
          {sections.length > 0 && (
            <nav className="solution-section-nav sticky top-28 self-start" aria-label="On this page">
              <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-sky-200/80 p-4 sm:p-5 shadow-lg shadow-sky-950/[0.04]">
                <div className="flex items-center gap-2 px-1 mb-3.5 pb-2.5 border-b border-slate-100">
                  <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 m-0">
                    On this page
                  </h2>
                </div>
                <div className="flex flex-col gap-1.5 max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
                  {sections.map((section, index) => (
                    <a
                      key={index}
                      href={`#${item.slug}-section-${index}`}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-sky-700 hover:bg-sky-50/90 transition-all border border-transparent hover:border-sky-200 group"
                    >
                      <span className="font-mono text-[10px] font-bold text-sky-600 bg-sky-100/80 px-1.5 py-0.5 rounded group-hover:bg-sky-600 group-hover:text-white transition-colors">
                        0{index + 1}
                      </span>
                      <span className="line-clamp-1">{section.title}</span>
                    </a>
                  ))}
                </div>
                <div className="mt-4 pt-3.5 border-t border-slate-100">
                  <a
                    href={`/contact?intent=demo&solution=${encodeURIComponent(item.title)}`}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 hover:from-sky-600 hover:to-blue-700 transition-all"
                  >
                    <Zap className="h-3.5 w-3.5" />
                    Request Live Demo
                  </a>
                </div>
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
      <section className="section products-section bg-gradient-to-b from-white via-sky-50/20 to-[#edf6fc] py-16 md:py-24 border-t border-slate-200/80">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/90 border border-sky-300/60 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Layers className="h-3.5 w-3.5 text-sky-600" />
              <span>{isProduct ? 'Suffix IT Ecosystem' : 'Professional Services'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {isProduct ? 'Explore Our Complementary Products' : 'Enterprise Services Portfolio'}
            </h2>
            <p className="mt-2.5 text-slate-600 text-base leading-relaxed">
              {isProduct
                ? 'Discover seamlessly connected enterprise software solutions designed for high performance.'
                : 'Accelerate your digital transformation with our specialized engineering capabilities.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {related.map((other) =>
              isProduct ? (
                <ProductCard
                  item={other}
                  key={other.path}
                  image={visuals.relatedCards[pathname]?.[other.path]}
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
