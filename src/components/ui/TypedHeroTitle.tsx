import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import useMotionPreference from './useMotionPreference';

export default function TypedHeroTitle({
  phrases,
  lines,
}: {
  phrases: string[];
  lines?: string[][];
}) {
  const reduced = useMotionPreference();
  const host = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(phrases[0] || '');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (reduced || !phrases.length) return;
    let index = 0,
      position = phrases[0].length,
      deleting = true,
      visible = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const stop = () => {
      clearTimeout(timer);
      timer = undefined;
    };
    const tick = () => {
      timer = undefined;
      if (!visible || document.hidden) return;
      const phrase = phrases[index];
      position += deleting ? -1 : 1;
      setText(phrase.slice(0, Math.max(0, position)));
      let wait = deleting ? 25 : 55;
      if (!deleting && position === phrase.length) {
        deleting = true;
        wait = 2600;
      } else if (deleting && position === 0) {
        deleting = false;
        index = (index + 1) % phrases.length;
        setPhraseIndex(index);
        wait = 450;
      }
      timer = setTimeout(tick, wait);
    };
    const update = () => {
      stop();
      setActive(visible && !document.hidden);
      if (visible && !document.hidden) timer = setTimeout(tick, 2600);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    if (host.current) observer.observe(host.current);
    document.addEventListener('visibilitychange', update);
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, [phrases, reduced]);
  const caret = !reduced && (
    <motion.span
      className="hero-typewriter-caret"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: active ? [1, 0, 1] : 1 }}
      transition={{ duration: 1.1, repeat: active ? Infinity : 0, ease: 'linear' }}
    />
  );
  const renderLines = (value: string, index: number, showCaret = false) => {
    if (!lines?.[index]) return value;
    let start = 0;
    return lines[index].map((line, i) => {
      const segment = value.slice(start, start + line.length);
      const atEnd =
        value.length >= start &&
        (value.length < start + line.length || i === lines[index].length - 1);
      start += line.length;
      return (
        <span className="hero-title-line" key={i}>
          {segment || (showCaret && atEnd ? '' : '\u00a0')}
          {showCaret && atEnd ? caret : null}
        </span>
      );
    });
  };
  return (
    <span ref={host} className="hero-typewriter" aria-hidden="true">
      {phrases.map((phrase, index) => (
        <span className="hero-typewriter-sizer" key={phrase}>
          {renderLines(phrase, index)}
        </span>
      ))}
      <span className="hero-typewriter-visible">
        {renderLines(reduced ? phrases[0] : text, reduced ? 0 : phraseIndex, true)}
      </span>
    </span>
  );
}
