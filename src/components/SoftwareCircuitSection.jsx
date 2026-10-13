import { lazy, Suspense, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Container, PrimaryButton } from './ui';
import { ChevronDown, Check, ArrowLeft, ArrowRight } from './GeneratedIcons';
import ProductVisualCluster from './ProductVisualCluster';
import SoftwareCircuitProgress from './ui/SoftwareCircuitProgress';
import { softwareChapters } from '../data/software-story';

// Keep GSAP off the hero's initial loading path. Content itself is always prerendered.
const SoftwareScrollController = lazy(() => import('./ui/SoftwareScrollController'));
const storyQuery = '(min-width: 1000px) and (prefers-reduced-motion: no-preference)';
const subscribeToStoryMode = (notify) => {
  const media = window.matchMedia(storyQuery);
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
};
const storyModeSnapshot = () => window.matchMedia(storyQuery).matches;

function SoftwareScene({ product, index }) {
  return (
    <article
      className={`software-story-scene ${index % 2 ? 'is-reversed' : ''}`}
      aria-labelledby={`software-chapter-${product.slug}`}
      data-product={product.slug}
    >
      <div className="software-story-scene-inner">
        <div className="software-story-copy">
          <p className="software-story-category">
            <span>{String(index + 1).padStart(2, '0')}</span>
            {product.category}
          </p>
          <h3 id={`software-chapter-${product.slug}`}>{product.title}</h3>
          {product.description && (
            <p className="software-story-description">{product.description}</p>
          )}
          {product.features.length > 0 && (
            <ul className="software-story-features">
              {product.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
          <PrimaryButton to={product.path}>Explore {product.title}</PrimaryButton>
        </div>
        <div className="software-story-visual">
          <ProductVisualCluster product={product} />
        </div>
      </div>
    </article>
  );
}

export default function SoftwareCircuitSection() {
  const section = useRef(null);
  const eligible = useSyncExternalStore(subscribeToStoryMode, storyModeSnapshot, () => false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Activate controller on client mount once eligible
    setReady(true);
  }, []);

  const handlePrev = () => {
    const currentIndex = Number(section.current?.dataset.storyCurrentIndex || 0);
    const targetIndex = Math.max(0, currentIndex - 1);
    const event = new CustomEvent('circuit-node-jump', {
      bubbles: true,
      detail: { index: targetIndex },
    });
    section.current?.dispatchEvent(event);
  };

  const handleNext = () => {
    const currentIndex = Number(section.current?.dataset.storyCurrentIndex || 0);
    const targetIndex = Math.min(softwareChapters.length - 1, currentIndex + 1);
    const event = new CustomEvent('circuit-node-jump', {
      bubbles: true,
      detail: { index: targetIndex },
    });
    section.current?.dispatchEvent(event);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (!section.current) return;
      const rect = section.current.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight * 0.7 && rect.bottom >= window.innerHeight * 0.3;
      if (!inView) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section
      ref={section}
      className="software-story"
      id="software-in-action"
      aria-labelledby="software-in-action-title"
      data-story-mode={eligible ? 'horizontal' : 'vertical'}
    >
      <span className="software-story-size-probe" aria-hidden="true" />
      <div className="software-story-pin">
        <Container className="software-story-heading">
          <h2 id="software-in-action-title">Software in action</h2>
          <PrimaryButton to="/products">Our Products</PrimaryButton>
        </Container>
        <div className="software-story-viewport">
          <div className="software-story-track">
            {softwareChapters.map((product, index) => (
              <SoftwareScene key={product.slug} product={product} index={index} />
            ))}
          </div>
        </div>
        <Container className="software-story-footer">
          <SoftwareCircuitProgress chapters={softwareChapters} />
          <div className="software-story-status">
            <div className="software-story-nav-buttons" aria-label="Chapter quick navigation">
              <button
                type="button"
                className="software-story-nav-arrow is-prev"
                onClick={handlePrev}
                aria-label="Previous product chapter"
                title="Previous product"
              >
                <ArrowLeft size={13} />
              </button>
              <button
                type="button"
                className="software-story-nav-arrow is-next"
                onClick={handleNext}
                aria-label="Next product chapter"
                title="Next product"
              >
                <ArrowRight size={13} />
              </button>
            </div>
            <span className="software-story-counter">
              <span data-story-counter>01</span>
              <span> / {String(softwareChapters.length).padStart(2, '0')}</span>
            </span>
            <span data-story-current>{softwareChapters[0].title}</span>
            <span className="software-story-hint">
              Scroll to explore <ChevronDown size={15} />
            </span>
          </div>
        </Container>
      </div>
      {ready && eligible && (
        <Suspense fallback={null}>
          <SoftwareScrollController section={section} />
        </Suspense>
      )}
    </section>
  );
}
