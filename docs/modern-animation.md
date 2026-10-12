# Modern animation and card treatment

The project already has Framer Motion, Motion, TypeScript, Tailwind and a shadcn-compatible `src/components/ui` directory. The new components reuse the existing `motion/react` renderer rather than loading another animation engine.

- `src/components/ui/TypedHeroTitle.tsx`: types, holds and deletes three existing published phrases. Text and caret pause when outside the viewport or the browser tab is hidden. A live reduced-motion preference shows the original title immediately. The heading has a stable accessible name and hidden sizing copies prevent layout shifts.
- `src/pages/HomePage.jsx`: defines the three phrases from `home-original.json` and combines the curved backdrop with the existing title and 3D illustration.
- `src/components/ui/HeroCurves.tsx`: observes hero visibility and pauses the decorative curves outside the viewport, in hidden tabs or when reduced motion is enabled.
- `src/hero-curves.css`: large pale blue elliptical shapes adapted from the supplied hero reference. Only desktop animates their transforms; mobile uses a static composition. No video, canvas or pointer tracking is needed.
- `src/components/ui/HeroTechnologyStage.tsx`: keeps the illustration visible during its short entrance, without an opacity fade or delay, and follows live reduced-motion preferences.
- `src/components/ui/ModernCard.tsx`: spring hover lift and slight zoom, with no continuous animation loop.
- `src/components/ui.jsx`: applies ModernCard to service, product, company, feature, industry and career cards while keeping their entrance animation.
- `src/components/SolutionContent.jsx`: applies the same treatment to solution capability panels.
- `src/modern-motion.css`: pale blue backplate, small resting angle that straightens on hover, border glow and typography styling.
- `src/components/ui/useMotionPreference.ts`: live system preference subscription shared by the typing title, cards, hero illustration and curved backdrop.

Further design opportunities, in priority order:

1. About Vision/Mission: tighten the relationship between each original paragraph and illustration, with aligned reading widths and more consistent vertical rhythm.
2. Contact: refine the visual grouping of enquiry fields, contact methods and the existing email-draft result without adding marketing copy or a backend.
3. Long solution pages: improve scanability of feature lists with clearer dividers and balanced image/content spacing. Preserve all source wording and avoid turning every paragraph into a separate card.

Keep moving text in the hero only; other page headings benefit from the existing one-time word reveal. Avoid reintroducing a WebGL cursor effect or continuous animated blur surfaces.
