import { motion as Motion, useReducedMotion } from 'motion/react';
import { RasterIcon } from './GeneratedIcons';
export function TechnologyIcon({ kind = 'software', className = '' }) {
  const reduced = useReducedMotion();
  return (
    <Motion.span
      className={`technology-icon ${className}`}
      initial={reduced ? false : { opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -140px 0px' }}
      transition={{ duration: reduced ? 0 : 1 }}
    >
      <RasterIcon
        name={{ software: 'Code2', network: 'Network', connected: 'Cpu' }[kind] || 'Code2'}
        size={64}
      />
    </Motion.span>
  );
}
export default function TechnologyVector() {
  return (
    <div className="generated-tech-aura" aria-hidden="true">
      <i />
      <i />
    </div>
  );
}
