export function solutionSections(blocks = [], introText) {
  const groups = [];
  for (const block of blocks) {
    if (block.tag.startsWith('h')) groups.push({ title: block.text, blocks: [] });
    else {
      if (!groups.length) groups.push({ title: 'Solution details', blocks: [] });
      groups[groups.length - 1].blocks.push(block);
    }
  }
  if (groups[0]?.blocks.length === 1 && groups[0].blocks[0].text === introText) groups.shift();
  return groups;
}
