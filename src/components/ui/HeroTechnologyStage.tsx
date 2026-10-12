import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import useMotionPreference from './useMotionPreference';
import { RasterIcon } from '../GeneratedIcons';

export default function HeroTechnologyStage({ children }: { children: ReactNode }) {
  const reduced = useMotionPreference();
  return (
    <motion.div
      className="hero-technology-stage"
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduced ? 0 : 0.65 }}
    >
      <div className="hero-stage-backdrop" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="hero-stage-object">{children}</div>
      <div className="hero-stage-satellites" aria-hidden="true">
        {['Code2', 'Cpu', 'Network'].map((name, index) => (
          <span className={`hero-satellite hero-satellite-${index}`} key={name}>
            <RasterIcon name={name} size={28} style={{}} />
          </span>
        ))}
      </div>
      <div className="hero-stage-base" aria-hidden="true" />
    </motion.div>
  );
}
