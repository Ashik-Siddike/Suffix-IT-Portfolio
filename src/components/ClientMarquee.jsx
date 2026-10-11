import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import logos from '../data/client-logos.json';
import SiteImage from './SiteImage';
import { Container } from './ui';
export default function ClientMarquee({ compact = false }) {
  const [paused, setPaused] = useState(false);
  const middle = Math.ceil(logos.length / 2);
  return (
    <section
      className={`client-marquee ${paused ? 'is-paused' : ''} ${compact ? 'is-compact' : ''}`}
      aria-label="Suffix IT clients"
    >
      <Container>
        <div className="marquee-heading">
          {!compact && (
            <div>
              <h2>Our Happy Clients</h2>
              <p>We Work Only For The Best.</p>
            </div>
          )}
          <button
            type="button"
            className="marquee-control"
            aria-pressed={paused}
            aria-label={paused ? 'Resume client logo animation' : 'Pause client logo animation'}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <Play size={16} aria-hidden="true" />
            ) : (
              <Pause size={16} aria-hidden="true" />
            )}
            {paused ? 'Resume' : 'Pause'}
          </button>
        </div>
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
                          alt={copy ? '' : logo.alt}
                          width="160"
                          height="90"
                          sizes="160px"
                          loading="lazy"
                          reveal={false}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
