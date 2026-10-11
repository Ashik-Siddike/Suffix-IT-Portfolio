import { useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { motion as Motion, useReducedMotion } from 'motion/react';
import { products } from '../data/catalog';
import SiteImage from './SiteImage';
import { PrimaryButton } from './ui';

const featured = products.slice(0, 3);
// Payroll fallback bullets are verbatim benefits from /product/payroll-system in the captured audit.
export default function ProductShowcase() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const entrance = {
    initial: reduced ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] },
  };
  const tabs = useRef([]);
  const product = featured[selected];
  const features = product.features.length
    ? product.features
    : [
        'Tight integration with all other modules',
        'User defined pay slips',
        'Detailed audit trails for all master data and financial changes',
        'Time savings with simple payroll calculation',
      ];
  const move = (event) => {
    const next =
      event.key === 'ArrowRight'
        ? (selected + 1) % featured.length
        : event.key === 'ArrowLeft'
          ? (selected + featured.length - 1) % featured.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? featured.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  };
  return (
    <div className="product-showcase">
      <div className="showcase-tabs" role="tablist" aria-label="Featured software products">
        {featured.map((item, index) => (
          <button
            key={item.path}
            type="button"
            role="tab"
            id={`product-tab-${index}`}
            aria-selected={selected === index}
            aria-controls="featured-product-panel"
            tabIndex={selected === index ? 0 : -1}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            onClick={() => setSelected(index)}
            onKeyDown={move}
          >
            <span className="tab-index">0{index + 1}</span>
            {item.title}
            {selected === index && (
              <Motion.span
                className="tab-indicator"
                layoutId="featured-product-indicator"
                aria-hidden="true"
                transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>
        ))}
      </div>
      <div
        className="featured-product"
        id="featured-product-panel"
        role="tabpanel"
        aria-labelledby={`product-tab-${selected}`}
        tabIndex={0}
      >
        <Motion.div key={`${product.path}-copy`} className="featured-product-copy" {...entrance}>
          <span className="pill">{product.category.toUpperCase()}</span>
          <h3>
            {selected === 0 ? (
              <>
                Your business.
                <br />
                Working as one.
              </>
            ) : selected === 1 ? (
              <>
                Your people.
                <br />
                Connected in the field.
              </>
            ) : (
              <>
                Your HR.
                <br />A simpler way to work.
              </>
            )}
          </h3>
          <p>{product.description}</p>
          <ul>
            {features.map((feature) => (
              <li key={feature}>
                <Check size={18} aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
          <PrimaryButton to={product.path}>Explore {product.title}</PrimaryButton>
        </Motion.div>
        <Motion.div
          key={`${product.path}-visual`}
          className="featured-product-visual"
          {...entrance}
        >
          <span className="showcase-visual-name">{product.title}</span>
          <SiteImage
            src={product.image}
            alt={`${product.title} — visual from the original website`}
            width="600"
            height="430"
            loading="lazy"
            sizes="(max-width: 900px) 90vw, 600px"
          />
          <span>{product.category.toUpperCase()}</span>
        </Motion.div>
      </div>
    </div>
  );
}
