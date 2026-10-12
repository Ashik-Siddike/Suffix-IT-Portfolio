import { useEffect, useId, useRef, useState, type RefObject } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import useMotionPreference from './useMotionPreference';

export function TextHoverEffect({
  text,
  duration = 0.2,
  automatic = false,
  targetRef,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  targetRef?: RefObject<HTMLElement | null>;
}) {
  const host = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, '');
  const reduced = useMotionPreference();
  const visible = useInView(host, { once: true, amount: 0.15 });
  const [hovered, setHovered] = useState(false);
  const pointerX = useMotionValue(300);
  const pointerY = useMotionValue(80);
  const spring = { stiffness: 60 / Math.max(duration, 0.08), damping: 34 };
  const maskX = useSpring(pointerX, spring);
  const maskY = useSpring(pointerY, spring);

  useEffect(() => {
    const target = targetRef?.current ?? host.current;
    if (!target || reduced) {
      pointerX.set(300);
      pointerY.set(80);
      return;
    }
    let frame = 0;
    let point = { x: 0, y: 0 };
    const enter = (event: Event) => {
      if (event instanceof PointerEvent && event.pointerType !== 'touch') setHovered(true);
    };
    const move = (event: Event) => {
      if (!(event instanceof PointerEvent) || event.pointerType === 'touch') return;
      setHovered(true);
      point = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const bounds = host.current?.getBoundingClientRect();
        if (!bounds?.width || !bounds.height) return;
        pointerX.set(Math.max(0, Math.min(600, ((point.x - bounds.x) / bounds.width) * 600)));
        pointerY.set(Math.max(0, Math.min(160, ((point.y - bounds.y) / bounds.height) * 160)));
      });
    };
    const leave = () => {
      setHovered(false);
      cancelAnimationFrame(frame);
      frame = 0;
    };
    target.addEventListener('pointerenter', enter);
    target.addEventListener('pointermove', move, { passive: true });
    target.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      target.removeEventListener('pointerenter', enter);
      target.removeEventListener('pointermove', move);
      target.removeEventListener('pointerleave', leave);
    };
  }, [reduced, targetRef, pointerX, pointerY]);

  return (
    <svg
      ref={host}
      className="text-hover-effect"
      viewBox="0 0 600 160"
      width="100%"
      height="100%"
      aria-hidden="true"
      focusable="false"
      data-hovered={hovered && !reduced}
    >
      <defs>
        <linearGradient id={`${id}-color`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#075a91" />
          <stop offset="35%" stopColor="#0072bc" />
          <stop offset="70%" stopColor="#39b9f4" />
          <stop offset="100%" stopColor="#078fd0" />
        </linearGradient>
        <motion.radialGradient
          id={`${id}-reveal`}
          gradientUnits="userSpaceOnUse"
          r="140"
          cx={reduced || duration === 0 ? pointerX : maskX}
          cy={reduced || duration === 0 ? pointerY : maskY}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={`${id}-mask`}>
          <rect width="600" height="160" fill={`url(#${id}-reveal)`} />
        </mask>
      </defs>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-hover-outline"
        initial={reduced ? false : { strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: reduced || visible ? 0 : 1000, strokeDasharray: 1000 }}
        transition={{ duration: reduced ? 0 : 3.2, ease: 'easeInOut' }}
      >
        {text}
      </motion.text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-hover-reveal"
        stroke={`url(#${id}-color)`}
        mask={`url(#${id}-mask)`}
        initial={false}
        animate={{ opacity: !reduced && (hovered || automatic) ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.25 }}
      >
        {text}
      </motion.text>
    </svg>
  );
}
