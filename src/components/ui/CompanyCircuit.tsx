import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import SiteImage from '../SiteImage';
import useMotionPreference from './useMotionPreference';

type CompanyValue = { image: string; title: string };

const desktopRoutes = [
  'M20 60 H216 Q230 60 240 50 L272 18 Q282 8 296 8 H640 Q654 8 664 18 L730 84 Q740 94 754 94 H1180',
  'M96 132 H338 Q352 132 362 142 L386 166 Q396 176 410 176 H498',
  'M682 166 H782 Q796 166 806 156 L830 132 Q840 122 854 122 H1100',
];
const mobileRoutes = [
  'M18 8 V104 Q18 116 26 124 L38 136 Q46 144 46 156 V236 Q46 248 38 256 L26 268 Q18 276 18 288 V438 Q18 450 26 458 L38 470 Q46 478 46 490 V600 Q46 612 38 620 L26 632 Q18 640 18 652 V772 Q18 784 26 792 L38 804 Q46 812 46 824 V976',
  'M6 340 V372 Q6 380 12 386 L28 402',
  'M6 696 V722 Q6 730 12 736 L28 752',
];

function CircuitPath({ mobile = false }: { mobile?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const reduced = useMotionPreference();
  const inView = useInView(host, { once: true, amount: 0.2, margin: '0px 0px -80px 0px' });
  const shown = reduced || inView;
  const routes = mobile ? mobileRoutes : desktopRoutes;
  const nodes = mobile
    ? [
        [46, 167],
        [46, 500],
        [46, 833],
      ]
    : [
        [200, 60],
        [600, 8],
        [1000, 94],
      ];

  return (
    <div
      ref={host}
      className={`company-circuit-path ${mobile ? 'is-mobile' : 'is-desktop'}`}
      aria-hidden="true"
      data-revealed={shown}
    >
      <svg
        viewBox={mobile ? '0 0 64 1000' : '0 0 1200 190'}
        preserveAspectRatio="none"
        focusable="false"
      >
        {routes.map((route, index) => (
          <g key={route} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d={route} className="circuit-track" vectorEffect="non-scaling-stroke" />
            <motion.path
              d={route}
              className={`circuit-trace ${index ? 'is-branch' : ''}`}
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: shown ? 1 : 0, opacity: shown ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 2.2, delay: reduced ? 0 : index * 0.18 }}
            />
          </g>
        ))}
      </svg>
      {nodes.map(([cx, cy], index) => (
        <motion.span
          key={cx + ':' + cy}
          className="circuit-node"
          style={{
            left: `${(cx / (mobile ? 64 : 1200)) * 100}%`,
            top: mobile ? `${cy / 10}%` : cy,
          }}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: shown ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.4 + index * 0.6 }}
        />
      ))}
    </div>
  );
}

function CompanyCircuitItem({ item, index }: { item: CompanyValue; index: number }) {
  const host = useRef<HTMLElement>(null);
  const reduced = useMotionPreference();
  const inView = useInView(host, { once: true, amount: 0.25, margin: '0px 0px -80px 0px' });
  const shown = reduced || inView;

  return (
    <motion.article
      ref={host}
      className={`company-value-card company-circuit-card company-circuit-card-${index}`}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 22 }}
      transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : index * 0.12 }}
    >
      <SiteImage
        src={item.image}
        alt=""
        width="400"
        height="250"
        sizes="(max-width: 700px) 80vw, 30vw"
        loading="lazy"
        reveal={false}
      />
      <h3>{item.title}</h3>
    </motion.article>
  );
}

export default function CompanyCircuit({ items }: { items: CompanyValue[] }) {
  return (
    <div className="company-circuit-scene">
      <div className="company-circuit-values">
        {items.map((item, index) => (
          <CompanyCircuitItem item={item} index={index} key={item.title} />
        ))}
      </div>
      <CircuitPath />
      <CircuitPath mobile />
    </div>
  );
}
