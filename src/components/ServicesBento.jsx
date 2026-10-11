import original from '../data/home-original.json';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/catalog';
import Icon from './Icon';
import SiteImage from './SiteImage';
import { ScrollReveal } from './ui';

const tiles = [
  ['erp-consulting', 'erp'],
  ['custom-applications', 'custom'],
  ['web-ecommerce', 'web'],
  ['domain-hosting', 'hosting'],
  ['mobile-apps', 'mobile'],
  ['video-conferencing', 'video'],
  ['hospital-management', 'hospital'],
  ['learning-management', 'learning'],
  ['storage-backup', 'backup'],
];

export default function ServicesBento() {
  return (
    <div className="services-bento">
      {tiles.map(([slug, area], index) => {
        const service = services.find((service) => service.slug === slug);
        const source =
          original.services[
            {
              hosting: 0,
              erp: 1,
              web: 2,
              custom: 3,
              video: 4,
              mobile: 5,
              hospital: 6,
              learning: 7,
              backup: 8,
            }[area]
          ];
        const item = { ...service, ...source };
        return (
          <ScrollReveal
            as="article"
            className={`bento-service bento-${area}`}
            variant={index % 2 ? 'right' : 'left'}
            delay={(index % 2) * 0.12}
            key={slug}
          >
            <div className="bento-service-copy">
              <span className="bento-icon">
                <Icon name={item.icon} size={26} />
              </span>
              <h3>
                <Link to={item.path}>
                  {item.title}
                  <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              </h3>
              <p>{item.description}</p>
            </div>
            {['erp', 'custom', 'web'].includes(area) && (
              <div className="bento-art">
                <SiteImage
                  src={item.image}
                  alt={`${item.title} illustration from the original website`}
                  width="480"
                  height="300"
                  loading="lazy"
                  sizes="(max-width: 600px) 85vw, 420px"
                />
              </div>
            )}
          </ScrollReveal>
        );
      })}
    </div>
  );
}
