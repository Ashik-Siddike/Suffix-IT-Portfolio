import { Component, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import ScrollTools from './ScrollTools';
import { ErrorState } from './ui';
import { findSolution } from '../data/catalog';

class PageErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? <ErrorState /> : this.props.children;
  }
}

const pageMetadata = {
  '/': [
    'Technology that moves business forward',
    'Enterprise software, technology consulting and ICT solutions from Suffix IT Limited in Bangladesh.',
  ],
  '/about': [
    'About Suffix IT',
    'Meet Suffix IT Limited, a Bangladesh-based provider of software and ICT solutions.',
  ],
  '/services': [
    'Technology services',
    'Explore Suffix IT consulting, application development, infrastructure, security and connected technology services.',
  ],
  '/products': [
    'Software products',
    'Explore Rupantor ERP, Suffix Payroll, Field Force, POS and other Suffix IT software products.',
  ],
  '/contact': [
    'Contact Suffix IT',
    'Discuss your business requirements with Suffix IT Limited in Dhaka, Bangladesh.',
  ],
  '/career': ['Careers', 'Explore published career opportunities at Suffix IT Limited.'],
  '/astha-policy': [
    'Astha privacy policy',
    'Read the published privacy policy for the Astha application.',
  ],
  '/webmail': ['Webmail', 'Access the original Suffix IT webmail service.'],
  '/top-10-software-company-in-bangladesh': [
    'Software companies in Bangladesh',
    'Read the original Suffix IT industry article about software companies in Bangladesh.',
  ],
};

function updateMeta(key, value, property = false) {
  let element = document.head.querySelector(`meta[${property ? 'property' : 'name'}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(property ? 'property' : 'name', key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
}

export default function PageLayout() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const solution = findSolution(pathname);
    const metadata = solution
      ? [solution.title, solution.description]
      : pageMetadata[pathname] || [
          pathname === '/career-detail/5'
            ? 'Head of Business Development — archived opportunity'
            : [
                  '/web-e-commerce-detail/Basic',
                  '/web-e-commerce-detail/Classic',
                  '/web-e-commerce-detail/Premium',
                ].includes(pathname)
              ? `${pathname.split('/').pop()} web & e-commerce package`
              : 'Page not found',
          'Suffix IT Limited — software and ICT solutions.',
        ];
    const title = `${metadata[0]} | Suffix IT Limited`;
    document.title = title;
    updateMeta('description', metadata[1]);
    updateMeta('og:title', title, true);
    updateMeta('og:description', metadata[1], true);
    updateMeta('og:type', 'website', true);
    updateMeta('og:url', `https://www.suffixit.com${pathname}`, true);
    updateMeta('og:image', 'https://www.suffixit.com/static/media/Suffix-Logo.73142c9b.png', true);
    updateMeta('twitter:card', 'summary');
    updateMeta('robots', metadata[0] === 'Page not found' ? 'noindex, follow' : 'index, follow');
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `https://www.suffixit.com${pathname}`;
    if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    else window.scrollTo({ top: 0, behavior: 'instant' });
    // Preserve a user's early keyboard focus while the prerendered page hydrates.
    if (previousPath.current !== pathname || document.activeElement === document.body)
      document.getElementById('main-content')?.focus({ preventScroll: true });
    previousPath.current = pathname;
  }, [pathname, hash]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <PageErrorBoundary key={pathname}>
          <Outlet />
        </PageErrorBoundary>
      </main>
      <SiteFooter />
      <ScrollTools />
    </>
  );
}
