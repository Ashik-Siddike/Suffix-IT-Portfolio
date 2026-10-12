# Presentation updates — 12 October 2026

## New homepage section

`Software in action` is a new section **after Our Products and before What They Said!**. It is rendered by `src/components/SoftwareCircuitSection.jsx`, with rounded, branching blue routes in `src/components/ui/BentCircuit.tsx`. The earlier circuit implementation on About → Our Company remains in place; that was a redesign of an existing About section, not a new homepage section.

The new section shows authentic software visuals from the company's published asset archive:

- Field Force: `/assets/field-force.497227c8.png`, confirmed against `docs/live-audit/product--field-force-management.json`.
- IEMS dashboard: `/assets/Dashboard_2.543c09b5.jpg`, confirmed against `docs/live-audit/service--Industrial-Monitoring.json`.
- The additional IEMS water/flow dashboard appears on its related detail page.

The screens link to their related pages. `SoftwarePreview.jsx` also provides a keyboard-accessible native dialog, Escape dismissal, return focus and a zoom control for inspecting the original UI. The data and provenance live in `src/data/software-screens.json`.

Payroll and Rupantor ERP have no verified software screenshots in the available archive. Their concept artwork remains labelled as concept artwork; no fabricated dashboard or unrelated product screen was substituted. The user asked to continue the other work while those assets remain unavailable. Add approved screenshots to the screen manifest when they are available; detail pages already read this manifest.

## Hero and loading

- Every phrase uses explicit editorial line breaks with a shared size reservation. Original wording is unchanged.
- The first phrase is fully visible immediately. Typing/deleting starts after the first reading pause.
- The responsive hero candidate and two variable font files are preloaded from the initial document. The hero starts visible and uses eager loading.
- Images without reveal animation use native `img` elements rather than Motion wrappers; this especially reduces the duplicated client-logo rendering overhead.
- The decorative blue circuit motif is shared with the new software section. It draws once and respects reduced motion.
- `npm run build` runs `scripts/prerender-home.mjs` after Vite. The homepage is rendered from the same shared `App.jsx` and component tree, then `hydrateRoot` preserves its original hero image when interactivity starts. There is no separate hardcoded marketing page and no artificial loader timer.
- Non-home routes keep the branded bouncing loader and their lazy page chunks. The initial homepage preview is hidden and replaced with the loader before those routes paint.
- Inter and Manrope use their self-hosted variable packages, preserving the font families while consolidating weight files. See [Fontsource variable-font documentation](https://fontsource.org/docs/getting-started/variable).
- The generated icon atlas is served at 640px for normal displays and 864px at DPR 3+, rather than downloading the original 1254px / 245KB atlas. Company and client logos are unchanged.

`scripts/optimize-presentation-assets.py` recreates the responsive hero, authentic screen/team variants and icon-atlas variants. It preserves transparency and the original software colors. It is not run on each normal build.

## Layout and detail pages

- Three contrasting sticky panels retain their original wording and alternating image layout. White/light-blue/deep-blue backgrounds are distinct, and Call Center text has readable contrast.
- Products have a more prominent pale-blue showcase band. Supporting sections use more compact spacing on mobile.
- About history now uses the real Suffix IT Corporate Day team photograph from 15 October 2022, with the exact company story. Vision and Mission share a balanced pair of cards, stacked on smaller screens.
- `solution-sections.js` groups the original headings once for both section rendering and navigation. Desktop uses a sticky index; mobile uses an overflow-contained horizontal index. Anchors clear the navbar.
- Feature/benefit/integration lists use smaller text panels; major modules keep the larger illustration panels. All original paragraphs and lists remain present.
- Contact groups personal and project fields, styles the selected topic, and provides an email-draft summary, email-app link and copy action. Preparing a draft makes no delivery request and stores nothing in a backend.
- Initial hydration respects early keyboard focus. Client route navigation still moves focus to the new main content.

## Footer component integration

The supplied drawing style is adapted in `src/components/ui/path-drawing-portfolio-hero.tsx` and rendered behind the existing footer as **SUFFIX IT**. Footer columns, social/contact links and all six original credential/partner marks remain. Blue replaces the near-black footer background.

The adaptation uses native SVG/CSS drawing instead of repeated SVG rasterization and pixel-count searches. Animation pauses outside the viewport or in a hidden tab and becomes static for reduced motion. It does not use a perpetual JavaScript animation-frame loop.

The project already supports TypeScript, Tailwind CSS 4 and the shadcn-compatible `components.json` structure. The correct UI folder is **`src/components/ui`**, exposed as `@/components/ui`; creating a duplicate root-level `/components/ui` would bypass the project's existing alias. Base styles are `src/styles.css`; this update's scoped styles are `src/presentation-polish.css`, imported from `src/main.jsx`. Motion is already installed.

## Verification

Production audit reports are kept in `artifacts/`. Compare the same local preview server and default Lighthouse mobile simulation; these are lab measurements, not field data or a guarantee for every device.

Before this update: performance **65**, LCP **5.42s**, TBT **388ms**, accessibility **100**. Original earlier review was **64 / 5.84s**. The final production audit is `artifacts/mobile-final-presentation.json`.

The browser suite covers all published routes, original copy, working image URLs, mobile overflow, keyboard menus, reduced motion, sticky cards, original portraits/logos, draft-only contact behavior and WCAG checks. The new checks cover first-paint hydration, linked authentic screens, dialog zoom, original-heading navigation and the footer drawing lifecycle.

### Final production result

| Metric             | Before this turn | Final |
| ------------------ | ---------------- | ----- |
| Mobile performance | 65               | 86    |
| LCP                | 5.42s            | 3.84s |
| FCP                | 2.84s            | 2.15s |
| TBT                | 388ms            | 0ms   |
| CLS                | 0.00067          | 0     |
| Accessibility      | 100              | 100   |
| Best practices     | 100              | 100   |
| SEO                | 92               | 92    |

LCP improved but remains above the 2.5s good threshold under the simulated mobile profile; real-device/hosting performance has not been measured. No claim of a 100/100 performance result is made.

Validation: production build/prerender, lint, TypeScript, formatting and 3 contact unit checks passed. The complete 52-test browser suite passed. After adding the software-preview zoom control, its 5 focused browser checks passed again. Final desktop/mobile visual artifacts are prefixed `artifacts/final-`. Company/client marks and original testimonial faces remain.
