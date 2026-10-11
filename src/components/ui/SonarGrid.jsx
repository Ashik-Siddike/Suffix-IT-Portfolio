import { useEffect, useRef } from 'react';

// Adapted from the supplied SonarGrid: canvas decoration behind the existing hero.
export default function SonarGrid({
  as: Element = 'div',
  children,
  className = '',
  color = '#0072bc',
  spacing = 28,
  dotRadius = 1.3,
  baseOpacity = 0.14,
  pingEvery = 4.5,
  speed = 170,
  ringWidth = 75,
  amplitude = 1.7,
  interactive = true,
  maxRings = 3,
  ...props
}) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!host || !context) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0,
      height = 0,
      frame = 0,
      timer = 0;
    let visible = false,
      seeded = false,
      rings = [],
      lastPaint = 0;
    let nextPing = performance.now() + pingEvery * 1000;
    const gap = Math.max(12, spacing);
    const velocity = Math.max(40, speed);

    function addRing(x, y, born = performance.now()) {
      rings.push({ x, y, born });
      rings = rings.slice(-Math.max(1, maxRings));
    }
    function draw(now) {
      const lifetime = (Math.hypot(width, height) + ringWidth) / velocity;
      rings = reduced.matches ? [] : rings.filter((ring) => (now - ring.born) / 1000 < lifetime);
      const live = rings.map((ring) => ({
        ...ring,
        radius: ((now - ring.born) / 1000) * velocity,
        fade: 1 - (now - ring.born) / 1000 / lifetime,
      }));
      context.clearRect(0, 0, width, height);
      context.fillStyle = color;
      context.globalAlpha = baseOpacity;
      context.beginPath();
      const hot = [];
      for (let x = gap / 2; x < width; x += gap) {
        for (let y = gap / 2; y < height; y += gap) {
          let energy = 0;
          for (const ring of live) {
            const distance = Math.abs(Math.hypot(x - ring.x, y - ring.y) - ring.radius);
            if (distance < ringWidth) {
              const t = 1 - distance / ringWidth;
              energy = Math.max(energy, t * t * (3 - 2 * t) * ring.fade);
            }
          }
          if (energy > 0.01) hot.push({ x, y, energy });
          else {
            context.moveTo(x + dotRadius, y);
            context.arc(x, y, dotRadius, 0, Math.PI * 2);
          }
        }
      }
      context.fill();
      for (const dot of hot) {
        context.globalAlpha = baseOpacity + (0.65 - baseOpacity) * dot.energy;
        context.beginPath();
        context.arc(dot.x, dot.y, dotRadius * (1 + amplitude * dot.energy), 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    }
    function stop() {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      frame = 0;
      timer = 0;
    }
    function tick(now) {
      frame = 0;
      if (!visible || document.hidden) return;
      if (reduced.matches) {
        draw(now);
        return;
      }
      if (pingEvery > 0 && now >= nextPing) {
        addRing(width * (0.25 + Math.random() * 0.6), height * (0.2 + Math.random() * 0.6), now);
        nextPing = now + pingEvery * 1000;
      }
      if (now - lastPaint >= 1000 / 30) {
        draw(now);
        lastPaint = now;
      }
      if (rings.length) frame = requestAnimationFrame(tick);
      else if (pingEvery > 0) timer = window.setTimeout(wake, Math.max(16, nextPing - now));
    }
    function wake() {
      stop();
      if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    }
    function resize() {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!seeded && !reduced.matches) {
        addRing(width * 0.65, height * 0.4, performance.now() - 650);
        seeded = true;
      }
      draw(performance.now());
      wake();
    }
    function onPointer(event) {
      if (
        !interactive ||
        reduced.matches ||
        event.target.closest('a, button, input, select, textarea')
      )
        return;
      const rect = host.getBoundingClientRect();
      addRing(event.clientX - rect.left, event.clientY - rect.top);
      wake();
    }
    function onPreference() {
      rings = [];
      draw(performance.now());
      wake();
    }
    const resizeObserver = new ResizeObserver(resize);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else stop();
    });
    resize();
    resizeObserver.observe(host);
    observer.observe(host);
    host.addEventListener('pointerdown', onPointer);
    document.addEventListener('visibilitychange', wake);
    reduced.addEventListener('change', onPreference);
    return () => {
      stop();
      resizeObserver.disconnect();
      observer.disconnect();
      host.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('visibilitychange', wake);
      reduced.removeEventListener('change', onPreference);
    };
  }, [
    color,
    spacing,
    dotRadius,
    baseOpacity,
    pingEvery,
    speed,
    ringWidth,
    amplitude,
    interactive,
    maxRings,
  ]);

  return (
    <Element ref={hostRef} className={`sonar-grid ${className}`} data-slot="sonar-grid" {...props}>
      <canvas ref={canvasRef} className="sonar-canvas" aria-hidden="true" />
      {children}
    </Element>
  );
}
