import { motion as Motion, useReducedMotion } from 'motion/react';

export function TechnologyIcon({ kind = 'software', className = '' }) {
  const reduced = useReducedMotion();
  return (
    <Motion.svg
      className={`technology-icon ${className}`}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      initial={reduced ? false : { opacity: 0, scale: 0.8, rotate: -8 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -140px 0px' }}
      transition={{ duration: reduced ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <rect x="6" y="6" width="68" height="68" rx="20" fill="#edf7ff" />
      <g stroke="#0072bc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {kind === 'software' ? (
          <>
            <rect x="18" y="21" width="44" height="34" rx="5" fill="white" />
            <path d="M18 30h44M31 37l-5 5 5 5m18-10 5 5-5 5m-7-12-4 14M31 62h18M40 55v7" />
            <circle cx="24" cy="26" r="1" fill="#0072bc" stroke="none" />
          </>
        ) : kind === 'network' ? (
          <>
            <path d="M40 32v12m-20 7v-7h40v7" />
            <rect x="27" y="17" width="26" height="15" rx="4" fill="white" />
            <rect x="12" y="51" width="16" height="12" rx="3" fill="white" />
            <rect x="32" y="51" width="16" height="12" rx="3" fill="white" />
            <rect x="52" y="51" width="16" height="12" rx="3" fill="white" />
            <path d="M33 24h14M40 44v7" />
          </>
        ) : (
          <>
            <rect x="28" y="28" width="24" height="24" rx="6" fill="white" />
            <path d="M34 35h12v10H34zM34 19v9m12-9v9m-12 24v9m12-9v9M19 34h9m-9 12h9m24-12h9m-9 12h9" />
            <circle cx="61" cy="19" r="4" fill="#bce7fb" />
            <circle cx="19" cy="61" r="4" fill="#bce7fb" />
          </>
        )}
      </g>
    </Motion.svg>
  );
}

export default function TechnologyVector() {
  const reduced = useReducedMotion();
  return (
    <svg className="technology-connections" viewBox="0 0 640 520" fill="none" aria-hidden="true">
      <ellipse cx="320" cy="260" rx="300" ry="245" stroke="#b8dbee" />
      <ellipse cx="320" cy="260" rx="285" ry="230" stroke="#c8e3f4" strokeDasharray="4 8" />
      <g stroke="#0072bc" strokeWidth="2" opacity="0.45">
        <Motion.path
          className="connection-path"
          d="M70 45H190Q220 45 220 75V205M550 45H460Q430 45 430 75V205M100 475H200Q225 475 225 450V325M530 475H455Q430 475 430 450V325"
          initial={reduced ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '0px 0px -140px 0px' }}
          transition={{ duration: reduced ? 0 : 1.5, ease: 'easeInOut' }}
        />
      </g>
      {[
        [70, 45],
        [550, 45],
        [100, 475],
        [530, 475],
      ].map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="11" fill="white" stroke="#c8e3f4" />
          <circle cx={x} cy={y} r="4" fill="#0072bc" />
        </g>
      ))}
    </svg>
  );
}
