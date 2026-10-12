import SiteImage from './SiteImage';
import SoftwarePreview from './SoftwarePreview';

function Visual({ visual, product, primary }) {
  if (visual.screen) return <SoftwarePreview screen={visual.screen} to={product.path} />;
  return (
    <figure
      className={`software-visual-art ${visual.kind === 'diagram' ? 'is-diagram' : 'software-story-illustration'}`}
    >
      <SiteImage
        src={visual.src}
        alt={visual.alt || `${product.title}: ${visual.label} concept illustration`}
        width={visual.width || 1200}
        height={visual.height || 800}
        surface={false}
        reveal={false}
        loading="lazy"
        sizes={primary ? '(max-width: 800px) 90vw, 420px' : '(max-width: 800px) 45vw, 280px'}
      />
      <figcaption>
        <span>{visual.label}</span>
        {visual.kind !== 'diagram' && <span>Illustration</span>}
      </figcaption>
    </figure>
  );
}

export default function ProductVisualCluster({ product }) {
  const primary = product.screen
    ? { screen: product.screen }
    : { src: product.image, label: 'Product overview' };
  const supporting = product.supportingVisuals;
  const items = [primary, ...supporting];
  return (
    <div
      className={`software-visual-cluster ${supporting.length === 1 ? 'is-pair' : ''} ${supporting.some((visual) => visual.screen) ? 'is-dashboard-cluster' : ''}`}
      role="group"
      aria-label={`${product.title} visuals`}
    >
      {items.map((visual, index) => (
        <div
          key={visual.screen?.src || visual.src}
          className={`software-visual-item ${index === 0 ? 'is-primary' : 'is-supporting'}`}
        >
          <Visual visual={visual} product={product} primary={index === 0} />
        </div>
      ))}
    </div>
  );
}
