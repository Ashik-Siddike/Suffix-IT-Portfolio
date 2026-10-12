import { useRef, useState, useId } from 'react';
import { Link } from 'react-router-dom';
import SiteImage from './SiteImage';

export default function SoftwarePreview({ screen, to }) {
  const dialog = useRef(null);
  const [zoom, setZoom] = useState(1);
  const zoomId = useId();
  const image = (
    <SiteImage
      src={screen.src}
      alt={screen.alt}
      width={screen.width}
      height={screen.height}
      surface={false}
      reveal={false}
      loading="lazy"
      sizes="(max-width: 800px) 90vw, 620px"
    />
  );
  return (
    <figure className={`software-preview is-${screen.device}`}>
      <div className="software-device">
        {screen.device === 'browser' && (
          <div className="software-browser-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>Suffix IT</span>
          </div>
        )}
        {to ? (
          <Link to={to} className="software-screen-link" aria-label={`Explore ${screen.label}`}>
            {image}
          </Link>
        ) : (
          image
        )}
      </div>
      <figcaption>
        <span>{screen.label}</span>
        <button
          type="button"
          onClick={() => {
            setZoom(1);
            dialog.current?.showModal();
          }}
        >
          View full screen
        </button>
      </figcaption>
      <dialog
        ref={dialog}
        className="software-lightbox"
        aria-label={screen.label}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="software-lightbox-toolbar">
          <h2>{screen.label}</h2>
          <button type="button" autoFocus onClick={() => dialog.current?.close()}>
            Close preview
          </button>
        </div>
        <label className="software-preview-zoom" htmlFor={zoomId}>
          Zoom
          <input
            id={zoomId}
            type="range"
            min="1"
            max="2.5"
            step="0.25"
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
          />
          <span>{Math.round(zoom * 100)}%</span>
        </label>
        <div className="software-lightbox-viewport">
          <img
            src={screen.src}
            width={screen.width}
            height={screen.height}
            alt={screen.alt}
            loading="lazy"
            style={{ width: `${zoom * 100}%`, maxWidth: 'none', maxHeight: 'none' }}
          />
        </div>
      </dialog>
    </figure>
  );
}
