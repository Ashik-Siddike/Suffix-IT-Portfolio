'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useAmbientCanvas, type CanvasScene } from './useAmbientCanvas';

function drawBloom({ context: ctx, width, height, elapsed, pointer, staticFrame }: CanvasScene) {
  const depthLimit = staticFrame ? 8 : Math.min(8, elapsed / 650);
  const branch = (x: number, y: number, angle: number, length: number, depth: number) => {
    if (depth > depthLimit) return;
    const growth = Math.min(1, depthLimit - depth);
    const endX = x + Math.cos(angle) * length * growth;
    const endY = y + Math.sin(angle) * length * growth;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = `rgba(194, 239, 255, ${0.5 - depth * 0.047})`;
    ctx.lineWidth = Math.max(0.6, 2.5 - depth * 0.25);
    ctx.stroke();
    const distance = Math.hypot(endX - pointer.x * width, endY - pointer.y * height);
    const influence = staticFrame ? 0 : Math.max(0, 1 - distance / height) * 0.16;
    branch(endX, endY, angle - 0.34 - influence, length * 0.76, depth + 1);
    branch(endX, endY, angle + 0.34 + influence, length * 0.76, depth + 1);
  };
  branch(width * 0.19, height + 8, -Math.PI / 2 + 0.12, height * 0.25, 0);
  branch(width * 0.81, height + 8, -Math.PI / 2 - 0.12, height * 0.25, 0);
}

export function FractalBloomCanvas() {
  const ref = useAmbientCanvas(drawBloom);
  return <canvas ref={ref} className="ambient-canvas fractal-bloom-canvas" aria-hidden="true" />;
}

export default function FractalBloomHero({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('fractal-bloom-hero', className)}>
      <FractalBloomCanvas />
      {children}
    </section>
  );
}
