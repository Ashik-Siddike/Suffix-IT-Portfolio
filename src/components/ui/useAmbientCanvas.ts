import { useEffect, useRef } from 'react';

export interface CanvasScene {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  elapsed: number;
  pointer: { x: number; y: number };
  staticFrame: boolean;
}

export function useAmbientCanvas(draw: (scene: CanvasScene) => void) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const context = canvas?.getContext('2d');
    if (!canvas || !host || !context) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let visible = false;
    let elapsed = 0;
    let previous = 0;
    let width = 1;
    let height = 1;
    const pointer = { x: 0.72, y: 0.48 };
    const render = (staticFrame: boolean) => {
      context.clearRect(0, 0, width, height);
      draw({ context, width, height, elapsed, pointer, staticFrame });
      canvas.dataset.motion = staticFrame ? 'static' : 'animated';
    };
    const tick = (time: number) => {
      elapsed += previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      render(false);
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      if (preference.matches) render(true);
      else if (visible && !document.hidden) frame = requestAnimationFrame(tick);
      else canvas.dataset.motion = 'paused';
    };
    const resize = new ResizeObserver(() => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      render(preference.matches);
      sync();
    });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || preference.matches) return;
      const rect = host.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / width;
      pointer.y = (event.clientY - rect.top) / height;
      canvas.dataset.pointer = 'active';
    };
    resize.observe(host);
    intersection.observe(host);
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    host.addEventListener('pointermove', move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      preference.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      host.removeEventListener('pointermove', move);
    };
  }, [draw]);
  return ref;
}
