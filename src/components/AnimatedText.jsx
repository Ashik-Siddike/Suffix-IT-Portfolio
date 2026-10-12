import useMotionPreference from './ui/useMotionPreference';
import { motion as Motion } from 'motion/react';
import { Fragment } from 'react';

export default function AnimatedText({ text, className = '', onLoad = false }) {
  const reduced = useMotionPreference();
  const words = text.split(' ');
  return (
    <>
      <span className="animated-text-accessible">{text}</span>
      <Motion.span
        className={`animated-text ${className}`}
        aria-hidden="true"
        initial={reduced ? false : 'hidden'}
        {...(onLoad ? { animate: 'visible' } : { whileInView: 'visible' })}
        viewport={{ once: true, amount: 0.3, margin: '0px 0px -140px 0px' }}
        variants={{ visible: { transition: { staggerChildren: reduced ? 0 : 0.1 } } }}
      >
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span className="word-mask">
              <Motion.span
                variants={{ hidden: { y: '105%', opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                transition={{ duration: reduced ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </Motion.span>
            </span>
            {index < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </Motion.span>
    </>
  );
}
