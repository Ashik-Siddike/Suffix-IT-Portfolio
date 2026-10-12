import visuals from '../data/unique-visuals.json';
import SourceContent from './SourceContent';
import { ScrollReveal } from './ui';
import SiteImage from './SiteImage';
import { solutionSections } from '../lib/solution-sections';
import {
  CreditCard,
  ShoppingBag,
  PackageCheck,
  ShieldCheck,
  Workflow,
  BarChart3,
  Radio,
  Database,
  Sliders,
  Sparkles,
  Zap,
  Layers,
  Cpu,
} from 'lucide-react';

function getSectionIcon(title = '') {
  const t = title.toLowerCase();
  if (/payment|billing|card|checkout|paypal/i.test(t)) return CreditCard;
  if (/reservation|booking|order|cart|ecommerce|shop/i.test(t)) return ShoppingBag;
  if (/inventory|stock|warehouse|barcode/i.test(t)) return PackageCheck;
  if (/security|compliance|protect|auth/i.test(t)) return ShieldCheck;
  if (/workflow|process|automation/i.test(t)) return Workflow;
  if (/report|analytic|dashboard|chart/i.test(t)) return BarChart3;
  if (/scada|iot|sensor|telemetry/i.test(t)) return Radio;
  if (/database|integration|api|cloud/i.test(t)) return Database;
  if (/feature|module|manage|admin/i.test(t)) return Sliders;
  if (/system|hardware|terminal/i.test(t)) return Cpu;
  return Sparkles;
}

export default function SolutionContent({ blocks = [], slug, introText }) {
  const groups = solutionSections(blocks, introText);
  return (
    <div className="solution-capabilities w-full">
      <div className="flex flex-col gap-8 w-full">
        {groups.map((group, index) => {
          const compact =
            /features|integrates|benefits|key features/i.test(group.title) ||
            group.blocks.filter((block) => block.tag === 'li').length > 5;
          const image = compact ? null : visuals.capabilities[`${slug}:${index}`];
          const visual = image ? { image } : null;
          const SectionIcon = getSectionIcon(group.title);

          if (!group.blocks.length)
            return (
              <div
                id={`${slug}-section-${index}`}
                key={`${group.title}-${index}`}
                className="scroll-mt-32 pt-6 pb-2"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
                  <Zap className="h-3.5 w-3.5 text-sky-600" />
                  <span>Architecture Overview</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {group.title}
                </h3>
              </div>
            );

          return (
            <article
              key={`${group.title}-${index}`}
              id={`${slug}-section-${index}`}
              className="scroll-mt-32 relative rounded-3xl bg-white border border-slate-200/90 hover:border-sky-300 p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 overflow-hidden group"
            >
              {/* Top ambient glowing line */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

              {/* Decorative subtle ambient corner glow */}
              <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 bg-sky-300/10 rounded-full blur-2xl group-hover:bg-sky-400/15 transition-all" />

              {/* Card Meta & Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/70 text-sky-700 text-xs font-mono font-bold tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
                  <span>// MODULE {String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Enterprise Capability
                </div>
              </div>

              {/* Title & Section Icon */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
                  <SectionIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {group.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Integrated enterprise module specifications and components.
                  </p>
                </div>
              </div>

              {/* Content Layout: 1-col or 2-col if illustration present */}
              {visual ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <SourceContent blocks={group.blocks} />
                  </div>
                  <div className="lg:col-span-5">
                    <div className="relative rounded-2xl bg-gradient-to-tr from-sky-50/80 via-white to-blue-50/50 p-4 border border-sky-200/70 shadow-lg shadow-sky-500/10 overflow-hidden group/img">
                      <SiteImage
                        src={visual.image}
                        alt={`${group.title} — conceptual technology illustration`}
                        width="480"
                        height="320"
                        loading="lazy"
                        reveal={false}
                        className="rounded-xl w-full h-auto object-cover transition-transform duration-500 group-hover/img:scale-105"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <SourceContent blocks={group.blocks} />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
