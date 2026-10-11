# Premium motion components

The three supplied references are integrated as blue-theme adaptations. Existing page copy, portraits, logos and artwork assignments are preserved. No stock images or additional marketing sections are needed.

| Component                                  | Placement                                          | Adaptation                                                                                                              |
| ------------------------------------------ | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `src/components/ui/fractal-bloom-tree.tsx` | About hero                                         | Two growing trees frame the existing title; blue/white palette, local pointer influence and bounded canvas              |
| `src/components/ui/neon-flow.tsx`          | Contact hero                                       | Locally drawn blue flowing ribbons inspired by the neon tubes reference; existing copy remains clickable                |
| `src/components/ui/zoom-parallax.tsx`      | Smart Transformer Monitoring's seven-image gallery | Scroll-linked collage zoom on desktop; existing seven distinct transparent images; static grid on mobile/reduced motion |

The supplied demos' text, stock photography and full-screen scroll scaffolding are not part of the site's content. The neon reference's remotely imported WebGL implementation is replaced by a compact local 2D renderer, so the result is an adaptation of the visual style rather than an exact 3D recreation. There is no random color change: the company blue palette stays consistent.

`useAmbientCanvas.ts` manages resize/DPR, pointer coordinates, visibility, offscreen pausing, dynamic reduced-motion preference and cleanup. Neither decorative canvas intercepts pointer events. `premium-effects.css` contains placement styles, gallery geometry and responsive rules. Existing Home effects remain in their original files.

## Project support and paths

The project already used Tailwind v4 with the Vite plugin and `src/styles.css`, and already had `src/components/ui/`. This is the project's `/components/ui` location under its `src` source root; a second root-level components directory is unnecessary. Keeping shared components here gives the CLI and imports one consistent destination.

Added `components.json` with shadcn aliases, `@` resolution in Vite, `src/lib/utils.ts` (`clsx` + `tailwind-merge`) and blue semantic Tailwind tokens. Added TypeScript, React types and `tsconfig.json` with strict checking for new TS/TSX and `allowJs` for the existing JSX app. Existing JSX pages are not fully converted. `npm run typecheck` checks the TypeScript additions; ESLint now parses TS/TSX as well.

Installed requested `framer-motion` and `lucide-react`, plus the utility/type tooling. Zoom uses Framer Motion's `useScroll`/`useTransform`. Existing Motion components continue using their established package. Lucide is available for future shadcn components; these effects require no new SVG icons or logos. No context provider or global state store is required.

The setup is complete in this project. To add a shadcn component later, run `npx shadcn@latest add <component>` from the project root, then review generated styles against the existing theme. For a fresh project, follow the [official Vite setup](https://ui.shadcn.com/docs/installation/vite) and run `npx shadcn@latest init`. Tailwind v4 uses an empty config field in [components.json](https://ui.shadcn.com/docs/components-json). Scroll transforms follow the [Motion scroll API](https://motion.dev/docs/react-use-scroll).

Validation covers canvas pointer interaction/offscreen pause/live reduced-motion changes, desktop gallery scaling and mobile/static grid behavior, alongside the existing full website tests. Preview captures are `artifacts/premium-*.png`.
`npm run build`, `npm run typecheck`, ESLint and all 26 Playwright browser tests passed. Desktop and mobile captures were visually reviewed.
