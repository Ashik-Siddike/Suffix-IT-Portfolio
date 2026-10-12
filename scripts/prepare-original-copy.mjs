import fs from 'node:fs';

const audit = JSON.parse(fs.readFileSync('docs/live-audit/pages.json', 'utf8'));
const output = {};
for (const page of audit) {
  if (page.error || !page.blocks?.length) continue;
  const title = page.blocks.find((block) => block.tag.startsWith('h'))?.text;
  const index = page.blocks.findIndex((block) => block.text === 'Schedule a Live Demo');
  const demo =
    index >= 0
      ? page.blocks.slice(index, index + 3).filter((block) => !block.text.startsWith('We maintain'))
      : [];
  const description =
    page.blocks.find(
      (block) => block.tag === 'p' && !block.text.startsWith('We maintain strategic partnerships'),
    )?.text || '';
  output[page.path] = { title, demo, description };
}
fs.writeFileSync('src/data/original-page-copy.json', JSON.stringify(output, null, 2) + '\n');
