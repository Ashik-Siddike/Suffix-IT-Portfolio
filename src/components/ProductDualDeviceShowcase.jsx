import { useRef } from 'react';
import { MacbookScroll } from './ui/macbook-scroll';
import { PrimaryButton, SecondaryButton, Container } from './ui';
import { Check, Smartphone, Monitor, ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react';

// Product device screen assets & mobile capability definitions
export const productDeviceScreens = {
  'field-force-management': {
    hasMobile: true,
    desktop: '/assets/generated/unique/hero-product-field-force-management.webp',
    mobile: '/assets/field-force.497227c8.png',
    mobileLabel: 'Field Force Mobile App (Android & iOS)',
    desktopLabel: 'Central Operations Command Web Suite',
    badgeText: 'Field Mobility Ready',
  },
  'rupantor-erp': {
    hasMobile: true,
    desktop: '/assets/generated/unique/hero-product-rupantor-erp.webp',
    mobile: '/assets/generated/unique/detail-rupantor-erp-1.webp',
    mobileLabel: 'Executive Mobile Analytics',
    desktopLabel: 'Enterprise ERP Management Suite',
    badgeText: 'Multi-Module ERP',
  },
  'pos-system': {
    hasMobile: true,
    desktop: '/assets/generated/unique/hero-product-pos-system.webp',
    mobile: '/assets/generated/unique/catalogue-pos-system.webp',
    mobileLabel: 'Mobile POS & Handheld Billing',
    desktopLabel: 'Cloud Retail & Inventory Terminal',
    badgeText: 'Smart Retail & Billing',
  },
  'e-commerce': {
    hasMobile: true,
    desktop: '/assets/generated/unique/hero-product-e-commerce.webp',
    mobile: '/assets/generated/unique/detail-e-commerce-1.webp',
    mobileLabel: 'Customer Mobile Shopping App',
    desktopLabel: 'Full-Cycle Web Storefront & CMS',
    badgeText: 'Omnichannel Commerce',
  },
  'transformer-monitoring': {
    hasMobile: true,
    desktop: '/assets/generated/unique/hero-product-transformer-monitoring.webp',
    mobile: '/assets/generated/unique/gallery-product-transformer-monitoring-0.webp',
    mobileLabel: 'Real-Time SCADA Mobile Alerts',
    desktopLabel: 'Industrial Telemetry & SCADA Portal',
    badgeText: 'IoT & Edge Connected',
  },
  'payroll-system': {
    hasMobile: true,
    desktop: '/assets/generated/unique/hero-product-payroll-system.webp',
    mobile: '/assets/generated/unique/detail-payroll-system-1.webp',
    mobileLabel: 'Employee Self-Service Mobile Portal',
    desktopLabel: 'HR & Payroll Central Command',
    badgeText: 'Automated HRMS',
  },
  'hotel-booking-system': {
    hasMobile: true,
    desktop: '/assets/generated/unique/hero-product-hotel-booking-system.webp',
    mobile: '/assets/generated/unique/catalogue-hotel-booking-system.webp',
    mobileLabel: 'Guest Mobile Booking & Check-in',
    desktopLabel: 'Property Management & Front Desk Web',
    badgeText: 'Cloud Hospitality',
  },
  'rupantor-inventory': {
    hasMobile: true,
    desktop: '/assets/generated/unique/hero-product-rupantor-inventory.webp',
    mobile: '/assets/generated/unique/catalogue-rupantor-inventory.webp',
    mobileLabel: 'Warehouse Barcode Scanner App',
    desktopLabel: 'Supply Chain & Inventory Portal',
    badgeText: 'Real-Time Stock Audit',
  },
  'interconnect-billing': {
    hasMobile: false,
    desktop: '/assets/generated/unique/hero-product-interconnect-billing.webp',
    mobile: null,
    mobileLabel: 'Telecom Carrier Console',
    desktopLabel: 'Carrier Rating & Settlement Engine',
    badgeText: 'High-Throughput Telecom',
  },
  'provident-fund': {
    hasMobile: true,
    desktop: '/assets/generated/unique/hero-product-provident-fund.webp',
    mobile: '/assets/generated/unique/catalogue-provident-fund.webp',
    mobileLabel: 'Member Fund Passbook Mobile',
    desktopLabel: 'Trustee Accounting & Investment System',
    badgeText: 'Automated Fund Management',
  },
  'Industrial-Monitoring': {
    hasMobile: true,
    desktop: '/assets/Dashboard_2.543c09b5.jpg',
    mobile: '/assets/Dashboard_1.0929c23a.jpg',
    mobileLabel: 'Sensor Telemetry Mobile App',
    desktopLabel: 'IEMS Power & Water SCADA System',
    badgeText: 'Industrial 4.0 Platform',
  },
};

export default function ProductDualDeviceShowcase({ item }) {
  const detailsRef = useRef(null);
  const screenConfig = productDeviceScreens[item.slug] || {
    hasMobile: Boolean(item.features?.some((f) => /mobile|phone|app/i.test(f))),
    desktop: item.image || '/assets/generated/illustrations/software.webp',
    mobile: item.image,
    mobileLabel: 'Mobile Companion Experience',
    desktopLabel: `${item.title} Web Console`,
    badgeText: 'Cloud Ready',
  };

  const hasMobile = screenConfig.hasMobile;

  return (
    <div className="relative w-full bg-gradient-to-b from-white via-[#f6fbff] to-[#edf6fc] text-slate-900 overflow-x-clip">
      {/* Decorative ambient background glows matching site theme */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-sky-400/20 via-sky-300/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-80 left-1/4 w-[500px] h-[500px] bg-sky-400/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute top-80 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full" />

      {/* Breadcrumb strip */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-2">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-500">
          <a href="/" className="hover:text-sky-600 transition-colors">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-sky-600 transition-colors">Products</a>
          <span>/</span>
          <span className="font-semibold text-slate-800">{item.title}</span>
        </nav>
      </div>

      {/* Macbook + Mobile Scroll Zoom Section */}
      <div className="relative w-full">
        <MacbookScroll
          src={screenConfig.desktop}
          hasMobile={hasMobile}
          mobileSrc={screenConfig.mobile}
          mobileLabel={screenConfig.mobileLabel}
          title={
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-sky-100/90 border border-sky-300/60 text-sky-800 text-[11px] font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="h-3 w-3 text-sky-600" />
                <span>{item.category || 'Enterprise Solution'}</span>
                <span className="h-1 w-1 rounded-full bg-sky-400" />
                <span className="text-[10px] font-medium text-sky-700">
                  {hasMobile ? 'Web & Mobile Suite' : 'Cloud Enterprise Edition'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-[1.14]">
                {item.title}
              </h1>

              <p className="mt-2.5 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed text-balance">
                {item.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/90 border border-slate-200/90 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
                  <Monitor className="h-3.5 w-3.5 text-sky-600" />
                  <span>Desktop Web Console</span>
                </div>
                {hasMobile && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/90 border border-slate-200/90 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
                    <Smartphone className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Native Mobile App</span>
                  </div>
                )}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/90 border border-slate-200/90 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Enterprise Security</span>
                </div>
              </div>
            </div>
          }
        />
      </div>

      {/* Typography & Deep Details Section (revealed as scroll progresses) */}
      <section ref={detailsRef} className="relative z-20 pb-20 pt-16 bg-white/95 border-t border-slate-200/80 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
        <Container className="max-w-6xl">
          {/* Header & Quick Action Row */}
          <div className="rounded-3xl border border-sky-100 bg-white/95 p-8 sm:p-10 md:p-12 shadow-xl shadow-sky-950/5 backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">
                  <Zap className="h-4 w-4" />
                  Comprehensive System Overview
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                  Engineered for agility, scalability &amp; seamless mobility.
                </h2>
                <p className="mt-3 text-slate-600 text-base leading-relaxed">
                  {item.title} brings together high-speed data processing, centralized role-based controls, and intuitive interfaces across desktop computers and handheld devices.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <PrimaryButton
                  to={`/contact?intent=demo&solution=${encodeURIComponent(item.title)}`}
                  className="w-full justify-center text-center shadow-lg shadow-sky-600/25"
                >
                  Request a live demo
                </PrimaryButton>
                <SecondaryButton
                  href="#capabilities"
                  className="w-full justify-center text-center"
                >
                  Explore capabilities
                </SecondaryButton>
              </div>
            </div>

            {/* Architecture Feature Cards */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border-t border-slate-100 pt-8">
              <div className="rounded-2xl bg-sky-50/70 p-5 border border-sky-100/90 transition-all hover:border-sky-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Web Command Center
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Real-time analytics, bulk operations, deep audit logging, and configurable settings in one unified workspace.
                </p>
              </div>

              <div className="rounded-2xl bg-sky-50/70 p-5 border border-sky-100/90 transition-all hover:border-sky-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {hasMobile ? 'Native Handheld App' : 'Full Mobile Responsiveness'}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {hasMobile
                    ? 'Field operations and on-the-go managers stay connected with instant mobile notifications and offline capability.'
                    : 'Adaptive layouts optimized for smartphones, tablets, and lightweight field access with touch-optimized controls.'}
                </p>
              </div>

              <div className="rounded-2xl bg-sky-50/70 p-5 border border-sky-100/90 transition-all hover:border-sky-300 sm:col-span-2 md:col-span-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Seamless Integration
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  REST APIs, automated exports, ERP linkage, and high-availability database replication ready for scale.
                </p>
              </div>
            </div>

            {/* Key Features Pill Matrix */}
            {item.features?.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Core Capabilities &amp; Built-In Modules
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {item.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-100/90 px-3.5 py-2 text-xs font-medium text-slate-800 border border-slate-200 transition-all hover:border-sky-400 hover:bg-sky-50"
                    >
                      <Check className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
