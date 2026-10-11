import optimized from '../data/optimized-images.json';
import { motion as Motion, useReducedMotion } from 'motion/react';

export default function SiteImage({
  src,
  sizes = '(max-width: 600px) 90vw, (max-width: 900px) 45vw, 420px',
  reveal = true,
  revealDelay = 0,
  ...props
}) {
  const reduced = useReducedMotion();
  const entrance = {
    initial: reduced || !reveal ? false : { opacity: 0, clipPath: 'inset(8% 0 8% 0 round 12px)' },
    whileInView: { opacity: 1, clipPath: 'inset(0% 0 0% 0 round 0px)' },
    viewport: { once: true, amount: 0.12, margin: '0px 0px -140px 0px' },
    transition: {
      duration: reduced ? 0 : 1.1,
      delay: reduced ? 0 : revealDelay,
      ease: [0.25, 0.1, 0.25, 1],
    },
  };
  const variants = optimized[src];
  if (!variants) return <Motion.img src={src} {...entrance} {...props} />;
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={variants.map((image) => `${image.src} ${image.width}w`).join(', ')}
        sizes={sizes}
      />
      <Motion.img src={src} {...entrance} {...props} />
    </picture>
  );
}
