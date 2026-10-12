import { useEffect, useRef, useState } from 'react';
import original from '../data/home-original.json';
import { Marquee } from './ui/marquee';
import { Link } from 'react-router-dom';
import { TextHoverEffect } from './ui/text-hover-effect';

const serviceSlugs = [
  'domain-hosting',
  'erp-consulting',
  'web-ecommerce',
  'custom-applications',
  'video-conferencing',
  'mobile-apps',
  'hospital-management',
  'learning-management',
  'storage-backup',
];
const productSlugs = [
  'payroll-system',
  'interconnect-billing',
  'e-commerce',
  'rupantor-erp',
  'provident-fund',
  'hotel-booking-system',
  'rupantor-inventory',
  'field-force-management',
];
export default function CapabilityMarquee() {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(sectionRef.current);
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    onVisibility();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
  const rows = [
    original.services.map((item, index) => ({
      name: item.title,
      href: `/service/${serviceSlugs[index]}`,
    })),
    original.products.map((item, index) => ({
      name: item.title,
      href: `/product/${productSlugs[index]}`,
    })),
    original.calls
      .map((item) => item.title)
      .concat([
        'Live Tracking',
        'Task Management',
        'Chat and Collaboration',
        'Offline data synchronization',
      ])
      .map((name, index) => ({
        name,
        href: index < 3 ? 'https://suffixcallcenter.com/' : '/product/field-force-management',
      })),
  ];
  return (
    <section
      ref={sectionRef}
      className={`capability-marquee capability-marquee-three ${paused || !visible || hidden ? 'is-paused' : ''}`}
      aria-label="Services, products and features"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === ' ' && event.target === event.currentTarget) {
          event.preventDefault();
          setPaused((value) => !value);
        }
      }}
    >
      <div className="capability-brand-wash" aria-hidden="true">
        <TextHoverEffect text="SUFFIX IT" targetRef={sectionRef} duration={0.18} />
      </div>
      <div className="capability-rows">
        {rows.map((names, index) => (
          <Marquee
            key={index}
            reverse={index === 1}
            pauseOnHover
            speed={index === 2 ? 'slow' : 'normal'}
            className={`capability-row capability-row-${index + 1}`}
          >
            {names.map(({ name, href }) => (
              <Link className="capability-badge" to={href} key={name}>
                <i aria-hidden="true" />
                {name}
              </Link>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
