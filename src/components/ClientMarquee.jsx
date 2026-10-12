import { useEffect, useRef, useState } from 'react';
import logos from '../data/client-logos.json';
import SiteImage from './SiteImage';
import { Container } from './ui';
export default function ClientMarquee({ compact = false }) {
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  useEffect(() => {
    let visible = false;
    const update = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(sectionRef.current);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);
  const middle = Math.ceil(logos.length / 2);
  return (
    <section
      ref={sectionRef}
      className={`client-marquee ${paused || !active ? 'is-paused' : ''} ${compact ? 'is-compact' : ''}`}
      aria-label="Suffix IT clients"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === ' ' && event.target === event.currentTarget) {
          event.preventDefault();
          setPaused((value) => !value);
        }
      }}
    >
      {!compact && (
        <Container>
          <div className="marquee-heading">
            <div>
              <h2>Our Happy Clients</h2>
              <p>We Work Only For The Best.</p>
            </div>
          </div>
        </Container>
      )}
      <div className="client-marquee-frame">
        <div className="marquee-window">
          {[logos.slice(0, middle), logos.slice(middle)].map((row, index) => (
            <div className={`marquee-row ${index ? 'marquee-reverse' : ''}`} key={index}>
              <div className="marquee-track">
                {[0, 1].map((copy) => (
                  <div className="marquee-group" key={copy} aria-hidden={copy ? true : undefined}>
                    {row.map((logo) => (
                      <div className="marquee-logo" key={logo.src}>
                        <SiteImage
                          src={logo.src}
                          alt=""
                          width="64"
                          height="64"
                          sizes="64px"
                          loading="lazy"
                          reveal={false}
                        />
                        <span className="client-name">{logo.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
