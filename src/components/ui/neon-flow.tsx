'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useAmbientCanvas, type CanvasScene } from './useAmbientCanvas';

// A locally rendered blue adaptation of the supplied neon tubes; no remote runtime.
function drawFlow({ context: ctx, width, height, elapsed, pointer, staticFrame }: CanvasScene) {
  const phase = staticFrame ? 0 : elapsed / 3800;
  const targetX = width * (0.64 + pointer.x * 0.17);
  const targetY = height * (0.22 + pointer.y * 0.55);
  for (let ribbon = 0; ribbon < 3; ribbon++) {
    const offset = ribbon * 26;
    const wave = Math.sin(phase + ribbon * 0.8) * height * 0.06;
    const gradient = ctx.createLinearGradient(width * 0.45, 0, width, height);
    gradient.addColorStop(0, '#0072bc00');
    gradient.addColorStop(0.5, '#0072bc65');
    gradient.addColorStop(0.8, '#41c5df90');
    gradient.addColorStop(1, '#0072bc08');
    ctx.beginPath();
    ctx.moveTo(width * 0.5 + offset, -30);
    ctx.bezierCurveTo(
      width * 0.96,
      height * 0.1 + wave,
      targetX - 160,
      targetY - offset,
      targetX,
      targetY,
    );
    ctx.bezierCurveTo(
      targetX + 170,
      targetY + offset,
      width * 0.52,
      height * 0.9 - wave,
      width * 0.96,
      height + 40,
    );
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 14 - ribbon * 3;
    ctx.lineCap = 'round';
    ctx.shadowColor = '#41c5df40';
    ctx.shadowBlur = 16;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}

export function TubesBackground({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useAmbientCanvas(drawFlow);
  return (
    <div className={cn('neon-flow', className)}>
      <canvas ref={ref} className="ambient-canvas neon-flow-canvas" aria-hidden="true" />
      <div className="neon-flow-content">{children}</div>
    </div>
  );
}

export default TubesBackground;
