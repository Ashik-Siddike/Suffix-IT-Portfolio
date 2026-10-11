'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface GalleryImage {
  src: string;
  alt?: string;
}
interface ZoomParallaxProps {
  images: GalleryImage[];
  label?: string;
}

function ZoomImage({
  image,
  index,
  progress,
}: {
  image: GalleryImage;
  index: number;
  progress: MotionValue<number>;
}) {
  const scale = useTransform(progress, [0, 1], [1, index === 0 ? 2.4 : 1.35 + index * 0.13]);
  const opacity = useTransform(progress, [0, 0.7, 1], [1, 1, index === 0 ? 1 : 0.2]);
  return (
    <motion.figure className={`zoom-tile zoom-tile-${index}`} style={{ scale, opacity }}>
      <span className="image-surface">
        <img src={image.src} alt={image.alt || ''} width="1200" height="800" loading="lazy" />
      </span>
    </motion.figure>
  );
}

export function ZoomParallax({
  images,
  label = 'Solution illustration gallery',
}: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });
  useEffect(() => {
    const query = window.matchMedia(
      '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
    );
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return (
    <div
      ref={container}
      className={`zoom-parallax ${enabled ? 'is-zooming' : 'is-static'}`}
      role="region"
      aria-label={label}
    >
      <div className="zoom-parallax-stage">
        {images.slice(0, 7).map((image, index) =>
          enabled ? (
            <ZoomImage key={image.src} image={image} index={index} progress={scrollYProgress} />
          ) : (
            <figure key={image.src}>
              <span className="image-surface">
                <img
                  src={image.src}
                  alt={image.alt || ''}
                  width="1200"
                  height="800"
                  loading="lazy"
                />
              </span>
            </figure>
          ),
        )}
      </div>
    </div>
  );
}
