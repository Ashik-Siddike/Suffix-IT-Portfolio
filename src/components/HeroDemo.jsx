import { useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
// Source: the captured original /service/iot demonstration, not an invented hero video.
const demo = { url: 'https://www.youtube.com/watch?v=wufBLKnsFLE' };
const videoId = new URL(demo.url).searchParams.get('v');

export default function HeroDemo() {
  const dialog = useRef(null);
  const trigger = useRef(null);
  const [opened, setOpened] = useState(false);
  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="hero-demo-trigger"
        onClick={() => {
          setOpened(true);
          dialog.current.showModal();
        }}
      >
        <span>
          <Play size={18} aria-hidden="true" />
        </span>
        Watch an IoT demo
      </button>
      <dialog
        ref={dialog}
        className="hero-demo-dialog"
        aria-labelledby="hero-demo-title"
        onClose={() => {
          setOpened(false);
          trigger.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="hero-demo-heading">
          <h2 id="hero-demo-title">See our connected solutions</h2>
          <button
            type="button"
            aria-label="Close demonstration"
            onClick={() => dialog.current.close()}
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        {opened && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title="Suffix IT original IoT demonstration"
            allow="encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
        <p>
          An IoT demonstration published on the original Suffix IT website.{' '}
          <a href={demo.url} target="_blank" rel="noreferrer">
            Watch on YouTube
          </a>
        </p>
      </dialog>
    </>
  );
}
