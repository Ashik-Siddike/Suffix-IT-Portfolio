import { useEffect, useRef, type ReactNode, type PointerEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { RasterIcon } from '../GeneratedIcons';

export default function HeroTechnologyStage({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType === 'touch') return;
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty('--stage-x', `${x * 14}px`);
      element.style.setProperty('--stage-y', `${y * 12}px`);
      element.style.setProperty('--stage-angle', `${x * 3}deg`);
    });
  };
  const reset = (event: PointerEvent<HTMLDivElement>) => {
    cancelAnimationFrame(frame.current);
    event.currentTarget.style.setProperty('--stage-x', '0px');
    event.currentTarget.style.setProperty('--stage-y', '0px');
    event.currentTarget.style.setProperty('--stage-angle', '0deg');
  };
  return (
    <motion.div
      className="hero-technology-stage"
      onPointerMove={move}
      onPointerLeave={reset}
      initial={reduced ? false : { opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduced ? 0 : 1.2, delay: 0.2 }}
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
