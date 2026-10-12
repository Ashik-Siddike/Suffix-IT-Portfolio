import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import useMotionPreference from './useMotionPreference';

export default function ModernCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useMotionPreference();
  return (
    <motion.div
      className={`modern-card-shell ${className}`}
      initial={false}
      whileHover={reduced ? undefined : { y: -4, scale: 1.012 }}
      transition={{ type: 'spring', stiffness: 240, damping: 24 }}
    >
      <span className="modern-card-layer modern-card-layer-fill" aria-hidden="true" />
      <span className="modern-card-layer modern-card-layer-stroke" aria-hidden="true" />
      {children}
    </motion.div>
  );
}
