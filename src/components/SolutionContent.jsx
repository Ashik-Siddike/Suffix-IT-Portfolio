import SourceContent from './SourceContent';
import { SectionHeading, ScrollReveal } from './ui';
import SiteImage from './SiteImage';
import { solutionVisuals } from '../data/solution-visuals';

export default function SolutionContent({ blocks = [], slug, introText }) {
  const groups = [];
  for (const block of blocks) {
    if (block.tag.startsWith('h')) groups.push({ title: block.text, blocks: [] });
    else {
      if (!groups.length) groups.push({ title: 'Solution details', blocks: [] });
      groups[groups.length - 1].blocks.push(block);
    }
  }
  if (groups[0]?.blocks.length === 1 && groups[0].blocks[0].text === introText) groups.shift();
  return (
    <div className="solution-capabilities">
      <SectionHeading eyebrow="INSIDE THE SOLUTION" title="A closer look at the capabilities." />
      <div className="capability-grid">
        {groups.map((group, index) => {
          const visual = solutionVisuals[slug]?.find((item) => item.match.test(group.title));
          if (!group.blocks.length)
            return (
              <h3 className="capability-divider" key={`${group.title}-${index}`}>
                {group.title}
              </h3>
            );
          return (
            <section
              key={`${group.title}-${index}`}
              className={`capability-panel ${visual ? 'capability-illustrated' : ''} ${group.blocks.length > 12 ? 'capability-panel-wide' : ''}`}
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
                    alt={`${group.title} — illustration from the original product page`}
                    width="480"
                    height="320"
                    loading="lazy"
                    reveal={false}
                  />
                </ScrollReveal>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
