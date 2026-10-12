'use client';

import { motion } from 'motion/react';
import useMotionPreference from './useMotionPreference';

const routes = [
  'M0 52 H310 Q328 52 340 65 L392 117 Q404 130 422 130 H800 Q818 130 830 117 L887 60 Q899 47 917 47 H1200',
  'M130 100 H242 Q260 100 272 113 L312 153 Q324 166 342 166 H544',
  'M596 190 H712 Q730 190 742 177 L780 139 Q792 126 810 126 H950',
];

export default function BentCircuit({ className = '' }: { className?: string }) {
  const reduced = useMotionPreference();
  return (
    <svg
      className={`bent-circuit ${className}`}
      viewBox="0 0 1200 210"
      fill="none"
      aria-hidden="true"
    >
      {routes.map((d, index) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={index ? 2 : 3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduced ? 0 : 1.8, delay: reduced ? 0 : index * 0.12 }}
        />
      ))}
      {[
        [18, 52],
        [296, 80],
        [552, 166],
        [906, 72],
        [972, 126],
        [1178, 47],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill="currentColor" />
      ))}
    </svg>
  );
}
