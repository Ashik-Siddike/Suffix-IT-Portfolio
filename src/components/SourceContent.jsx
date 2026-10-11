// Original published body copy, preserved as structured text. Never render remote HTML.
import { ScrollReveal } from './ui';
export default function SourceContent({ blocks = [] }) {
  const output = [];
  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    if (block.tag === 'li') {
      const items = [block];
      while (blocks[index + 1]?.tag === 'li') items.push(blocks[++index]);
      output.push(
        <ScrollReveal as="ul" variant="fade" key={`list-${index}`}>
          {items.map((item, childIndex) => (
            <li key={childIndex}>{item.text}</li>
          ))}
        </ScrollReveal>,
      );
    } else if (block.tag.startsWith('h')) {
      // Existing pages use multiple h1s; normalize to an accessible page outline.
      const Heading = block.tag === 'h1' || block.tag === 'h2' ? 'h2' : 'h3';
      output.push(
        <ScrollReveal as={Heading} variant="fade" key={index}>
          {block.text}
        </ScrollReveal>,
      );
    } else
      output.push(
        <ScrollReveal as="p" variant="fade" key={index}>
          {block.text}
        </ScrollReveal>,
      );
  }
  return <div className="source-content">{output}</div>;
}
