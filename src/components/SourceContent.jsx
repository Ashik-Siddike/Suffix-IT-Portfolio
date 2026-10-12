// Original published body copy, preserved as structured text. Never render remote HTML.
import { ScrollReveal } from './ui';
import { Check } from 'lucide-react';

export default function SourceContent({ blocks = [] }) {
  const output = [];
  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    if (block.tag === 'li') {
      const items = [block];
      while (blocks[index + 1]?.tag === 'li') items.push(blocks[++index]);
      output.push(
        <ScrollReveal as="ul" variant="fade" key={`list-${index}`} className="modern-feature-list">
          {items.map((item, childIndex) => (
            <li key={childIndex} className="modern-feature-item group/item">
              <span className="feature-item-icon">
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              </span>
              <span className="feature-item-text">{item.text}</span>
            </li>
          ))}
        </ScrollReveal>,
      );
    } else if (block.tag.startsWith('h')) {
      // Existing pages use multiple h1s; normalize to an accessible page outline.
      const Heading = block.tag === 'h1' || block.tag === 'h2' ? 'h2' : 'h3';
      output.push(
        <ScrollReveal as={Heading} variant="fade" key={index} className="modern-content-heading">
          {block.text}
        </ScrollReveal>,
      );
    } else {
      output.push(
        <ScrollReveal as="p" variant="fade" key={index} className="modern-content-p">
          {block.text}
        </ScrollReveal>,
      );
    }
  }
  return <div className="source-content">{output}</div>;
}
