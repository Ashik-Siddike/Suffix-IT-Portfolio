import { useEffect, useRef } from 'react';

interface TubesApp {
  dispose: () => void;
  three: { minPixelRatio: number; maxPixelRatio: number; resize: () => void; isDisposed: boolean };
}

// The exact tubes renderer from the supplied reference, served locally.
export default function HeroNeonFlow() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = matchMedia('(hover: hover) and (pointer: fine)');
    let app: TubesApp | undefined;
    let generation = 0;
    let visible = false;
    let pointerIntent = false;
    const stop = () => {
      generation++;
      app?.dispose();
      app = undefined;
      element.replaceChildren();
      element.dataset.state = 'static';
    };
    const start = async () => {
      if (
        app ||
        !pointerIntent ||
        !visible ||
        document.hidden ||
        preference.matches ||
        !pointer.matches
      )
        return;
      const current = ++generation;
      try {
        const path = new URL('/vendor/neon-tubes.js', window.location.origin).href;
        const { default: TubesCursor } = await import(/* @vite-ignore */ path);
        if (current !== generation) return;
        const canvas = document.createElement('canvas');
        canvas.className = 'hero-neon-canvas';
        canvas.setAttribute('aria-hidden', 'true');
        element.append(canvas);
        const lightweight = navigator.hardwareConcurrency <= 4;
        app = TubesCursor(canvas, {
          bloom: { threshold: 0.1, strength: 0.7, radius: 0.4 },
          sleepRadiusX: 150,
          sleepRadiusY: 75,
          tubes: {
            count: lightweight ? 4 : 8,
            colors: ['#0072bc', '#079acf', '#35c9e6'],
            minRadius: 0.008,
            maxRadius: 0.025,
            minTubularSegments: 32,
            maxTubularSegments: lightweight ? 40 : 64,
            lights: { intensity: 40, colors: ['#0072bc', '#57d6f5', '#0b8cc7', '#9ceaff'] },
          },
        }) as TubesApp;
        app.three.minPixelRatio = 1;
        app.three.maxPixelRatio = 1.5;
        app.three.resize();
        element.dataset.state = 'animated';
      } catch {
        stop();
        element.dataset.state = 'fallback';
      }
    };
    const sync = () => {
      if (!visible || document.hidden || preference.matches || !pointer.matches) stop();
      else void start();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    const activate = () => {
      pointerIntent = true;
      void start();
    };
    element.parentElement?.addEventListener('pointermove', activate, { passive: true });
    preference.addEventListener('change', sync);
    pointer.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      element.parentElement?.removeEventListener('pointermove', activate);
      preference.removeEventListener('change', sync);
      pointer.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      stop();
    };
  }, []);
  return <div ref={host} className="hero-neon-flow" aria-hidden="true" />;
}
