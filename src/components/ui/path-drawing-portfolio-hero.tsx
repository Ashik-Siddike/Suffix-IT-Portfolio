'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import useMotionPreference from './useMotionPreference';

export type PathDrawingPortfolioHeroProps = {
  brand: string;
  tagline?: string;
  eyebrow?: string;
  fromColor?: string;
  toColor?: string;
  children?: ReactNode;
  className?: string;
  decorative?: boolean;
};

/** Native SVG stroke drawing. No raster probing or per-frame JavaScript. */
export default function PathDrawingPortfolioHero({
  brand,
  tagline,
  eyebrow,
  fromColor = '#78c9ff',
  toColor = '#0072bc',
  children,
  className = '',
  decorative = false,
}: PathDrawingPortfolioHeroProps) {
  const id = useId().replace(/:/g, '');
  const host = useRef<HTMLDivElement>(null);
  const reduced = useMotionPreference();
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (reduced) return;
    let visible = false;
    const update = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    if (host.current) observer.observe(host.current);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, [reduced]);
  if (!brand.trim()) return null;
  return (
    <div
      ref={host}
      className={`path-drawing-brand ${className}`}
      data-path-drawing-hero
      data-motion={reduced ? 'reduced' : active ? 'active' : 'paused'}
      aria-hidden={decorative || undefined}
    >
      {eyebrow && <p>{eyebrow}</p>}
      <svg
        viewBox="0 0 1100 200"
        role={decorative ? undefined : 'img'}
        aria-label={decorative ? undefined : brand}
      >
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="52%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="1.5"
          fontSize="174"
          fontWeight="800"
          fontFamily="Manrope Variable, Arial, sans-serif"
          textLength="1030"
          lengthAdjust="spacingAndGlyphs"
          className="path-drawing-base"
        >
          {brand}
        </text>
        <text
          x="50%"
          y="52%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="2.2"
          fontSize="174"
          fontWeight="800"
          fontFamily="Manrope Variable, Arial, sans-serif"
          textLength="1030"
          lengthAdjust="spacingAndGlyphs"
          className="path-drawing-ink"
        >
          {brand}
        </text>
      </svg>
      {tagline && <p>{tagline}</p>}
      {children}
    </div>
  );
}
