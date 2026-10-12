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
      className={`modern-card-shell relative rounded-3xl transition-all duration-300 ${className}`}
      initial={false}
      whileHover={reduced ? undefined : { y: -4, scale: 1.008 }}
      transition={{ type: 'spring', stiffness: 260, damping: 25 }}
    >
      {/* Subtle modern ambient highlight glow */}
      <span
        className="pointer-events-none absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-sky-400/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10"
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}
