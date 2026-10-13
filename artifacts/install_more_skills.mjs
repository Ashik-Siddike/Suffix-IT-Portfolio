import { execSync } from 'child_process';

const pkgs = [
  'anthropics/skills@frontend-design',
  'vercel-labs/agent-skills@vercel-react-best-practices',
  'shadcn-ui/ui@shadcn',
  'vercel-labs/skills@find-skills',
  'anthropics/skills@mcp-builder'
];

for (const pkg of pkgs) {
  console.log(`\n=== Installing ${pkg} ===`);
  try {
    execSync(`npx -y skills add "${pkg}" -g -y --copy`, {
      stdio: 'inherit',
      cwd: 'e:/projects/Suffex_IT/Suffex-IT'
    });
    console.log(`Successfully installed ${pkg}`);
  } catch (err) {
    console.error(`Error installing ${pkg}:`, err.message);
  }
}
console.log('\nAll packages processed.');
