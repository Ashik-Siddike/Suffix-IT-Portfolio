import { useEffect, useRef } from 'react';
import useMotionPreference from './useMotionPreference';

// Lightweight adaptation of the reference's curved backdrop. No video or canvas.
export default function HeroCurves() {
  const host = useRef<HTMLDivElement>(null);
  const reduced = useMotionPreference();
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let visible = false;
    const update = () => {
      element.dataset.motion = visible && !document.hidden && !reduced ? 'active' : 'static';
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      element.dataset.motion = 'static';
    };
  }, [reduced]);
  return (
    <div ref={host} className="hero-curves" aria-hidden="true" data-motion="static">
      <div className="hero-curve hero-curve-right" />
      <div className="hero-curve hero-curve-left" />
    </div>
  );
}
