import visuals from '../data/unique-visuals.json';
import SourceContent from './SourceContent';
import { ScrollReveal } from './ui';
import SiteImage from './SiteImage';
import ModernCard from './ui/ModernCard';
import { solutionSections } from '../lib/solution-sections';

export default function SolutionContent({ blocks = [], slug, introText }) {
  const groups = solutionSections(blocks, introText);
  return (
    <div className="solution-capabilities">
      <div className="capability-grid">
        {groups.map((group, index) => {
          const compact =
            /features|integrates|benefits|key features/i.test(group.title) ||
            group.blocks.filter((block) => block.tag === 'li').length > 5;
          const image = compact ? null : visuals.capabilities[`${slug}:${index}`];
          const visual = image ? { image } : null;
          if (!group.blocks.length)
            return (
              <h3
                id={`${slug}-section-${index}`}
                className="capability-divider"
                key={`${group.title}-${index}`}
              >
                {group.title}
              </h3>
            );
          return (
            <ModernCard
              key={`${group.title}-${index}`}
              className={`modern-capability-shell ${compact ? 'is-compact-capability' : 'is-main-capability'}`}
            >
              <section
                key={`${group.title}-${index}`}
                id={`${slug}-section-${index}`}
                className={`capability-panel ${visual ? 'capability-illustrated' : ''} ${compact ? 'capability-text-only' : ''}`}
              >
                <ScrollReveal variant={index % 2 ? 'right' : 'left'} className="capability-copy">
                  <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{group.title}</h3>
                  <SourceContent blocks={group.blocks} />
                </ScrollReveal>
                {visual && (
                  <ScrollReveal variant={index % 2 ? 'left' : 'right'} delay={0.1}>
                    <SiteImage
                      src={visual.image}
                      alt={`${group.title} — conceptual technology illustration`}
                      width="480"
                      height="320"
                      loading="lazy"
                      reveal={false}
                    />
                  </ScrollReveal>
                )}
              </section>
            </ModernCard>
          );
        })}
      </div>
    </div>
  );
}
