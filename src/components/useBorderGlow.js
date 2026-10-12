import { useEffect, useRef } from 'react';

// One animation frame updates the light source for all cards, including nearby borders.
export default function useBorderGlow(selector = '.testimonial-story') {
  const frame = useRef(0);
  const point = useRef(null);
  useEffect(() => () => window.cancelAnimationFrame(frame.current), []);
  return {
    onPointerMove(event) {
      if (event.pointerType === 'touch') return;
      const group = event.currentTarget;
      point.current = { x: event.clientX, y: event.clientY };
      group.dataset.glowActive = 'true';
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = 0;
        if (!point.current || !group.isConnected) return;
        for (const card of group.querySelectorAll(selector)) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--glow-x', `${point.current.x - rect.left}px`);
          card.style.setProperty('--glow-y', `${point.current.y - rect.top}px`);
        }
      });
    },
    onPointerLeave(event) {
      event.currentTarget.dataset.glowActive = 'false';
      point.current = null;
      window.cancelAnimationFrame(frame.current);
      frame.current = 0;
    },
  };
}
