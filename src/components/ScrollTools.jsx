import { useState } from 'react';
import { motion as Motion, useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react';
import { ArrowUp } from './GeneratedIcons';

export default function ScrollTools() {
  const { scrollY, scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, 'change', (value) => setVisible(value > 600));

  return (
    <>
      <Motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      {visible && (
        <Motion.button
          type="button"
          className="back-to-top"
          aria-label="Back to top"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          onClick={() => {
            document.getElementById('main-content')?.focus({ preventScroll: true });
            window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' });
          }}
        >
          <ArrowUp size={20} aria-hidden="true" />
        </Motion.button>
      )}
    </>
  );
}
