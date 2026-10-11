import { useId, useLayoutEffect, useRef, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PrimaryButton } from '../ui';

// Adapted to the existing JSX project from the supplied carousel-squeeze reference.
export default function SqueezeCarousel({ slides, label = 'Our products', duration = 1000 }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const focusIntent = useRef(null);
  const tabs = useRef([]);
  const gesture = useRef(null);
  const reduced = useReducedMotion();
  const id = useId();
  const wrap = (index) => (index + slides.length) % slides.length;
  const select = (index, focus = false) => {
    const next = wrap(index);
    setActive(next);
    if (focus) focusIntent.current = next;
  };
  useLayoutEffect(() => {
    if (focusIntent.current !== null) {
      tabs.current[focusIntent.current]?.focus({ preventScroll: true });
      focusIntent.current = null;
    }
  }, [active]);
  const keyboard = (event) => {
    const next =
      event.key === 'ArrowRight'
        ? active + 1
        : event.key === 'ArrowLeft'
          ? active - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? slides.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next, true);
  };
  if (!slides.length) return null;
  const slide = slides[active];
  return (
    <div
      className="squeeze-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      style={{ '--squeeze-duration': reduced ? '0ms' : `${duration}ms` }}
    >
      <div className="squeeze-toolbar">
        <p aria-live="polite">
          <span>{String(active + 1).padStart(2, '0')}</span> /{' '}
          {String(slides.length).padStart(2, '0')} products
        </p>
        <div>
          <button type="button" aria-label="Previous product" onClick={() => select(active - 1)}>
            <ArrowLeft size={19} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next product" onClick={() => select(active + 1)}>
            <ArrowRight size={19} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        className="squeeze-panels"
        role="tablist"
        aria-label="Choose a software product"
        onKeyDown={keyboard}
        onTouchStart={(event) => {
          gesture.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }}
        onTouchEnd={(event) => {
          if (!gesture.current) return;
          const dx = event.changedTouches[0].clientX - gesture.current.x;
          const dy = event.changedTouches[0].clientY - gesture.current.y;
          gesture.current = null;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5)
            select(active + (dx < 0 ? 1 : -1));
        }}
      >
        {slides.map((item, index) => {
          const distance = index - active;
          const weight =
            index === active
              ? 6
              : distance === 1
                ? 2.2
                : distance === 2
                  ? 1.3
                  : distance === 3
                    ? 0.7
                    : 0.15;
          return (
            <button
              type="button"
              role="tab"
              key={item.id}
              id={`${id}-tab-${index}`}
              aria-selected={index === active}
              aria-controls={`${id}-panel`}
              aria-label={item.title}
              tabIndex={index === active ? 0 : -1}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              onClick={() => select(index)}
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') setHovered(index);
              }}
              onPointerLeave={() => setHovered(null)}
              className={`squeeze-panel ${index === active ? 'is-active' : ''} ${index === wrap(active + 1) ? 'is-adjacent' : ''}`}
              style={{ '--panel-weight': weight + (hovered === index && !reduced ? 0.3 : 0) }}
            >
              <img
                src={item.image}
                alt=""
                width="1280"
                height="720"
                loading="lazy"
                draggable={false}
              />
              <span className="squeeze-overlay" aria-hidden="true">
                <strong>{item.title}</strong>
              </span>
            </button>
          );
        })}
      </div>
      <div
        className="squeeze-details"
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
      >
        <Motion.div
          key={slide.id}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.5 }}
        >
          <h3>{slide.title}</h3>
          <p>{slide.description}</p>
        </Motion.div>
        <PrimaryButton to={slide.href}>VIEW MORE DETAILS</PrimaryButton>
      </div>
      <div className="squeeze-pagination" aria-label="Product navigation">
        {slides.map((item, index) => (
          <button
            type="button"
            key={item.id}
            aria-label={`Show ${item.title}`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => select(index)}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}
