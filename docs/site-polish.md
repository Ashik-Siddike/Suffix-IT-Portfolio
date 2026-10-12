# Content, mobile and performance polish

## Completed changes

- Product/service page titles come from original captured banner headings. Catalogue descriptions come from original Home cards or the original page's paragraph. Contact uses the original heading, quote and location labels. Catalogue landing pages use Home's original Products/Services introduction. Career uses the original Career/Find a job headings. Detail pages remove invented marketing notes/highlight summaries and retain source paragraphs and capabilities; the original demo heading/copy is restored where published. Utility labels, filters, archived-status notes and the authorized email-draft form remain functional UI.
- Product categories combine with search and can be cleared together: ERP/Inventory, HR/Workforce, Commerce, Telecommunications, Hospitality and IoT. These are navigation groupings, not new product claims.
- Mobile hero uses a smaller title, tighter spacing and a 270px illustration stage; its artwork now fits in the opening screen at 390 × 844.
- All 119 generated artwork sources have responsive WebP candidates. Originals and alpha remain. Existing image manifest entries are preserved. Carousel/gallery pictures use these candidates as well. The smallest candidates total 2,814,714 bytes versus 22,335,332 original bytes (87% lower); actual browser transfer depends on viewport, DPR and the images viewed.
- Neon renderer loads only after pointer movement on a visible desktop hero. Reduced motion/touch-only devices do not load it. Lower-core devices use fewer tubes/segments. Multiply compositing with blue color correction makes it visible on the light hero without a black overlay. React libraries have their own cacheable bundle; route loading stays lazy.
- Image surfaces, card typography, original detail introductions and mobile filter controls share consistent spacing. Product hover now ignores stationary-pointer events caused by panel resizing, so expansion does not accidentally select adjacent products.
- Contact continues preparing an email draft, per the user's choice. No backend or email send service was added.

## Editing map

`original-page-copy.json` is derived by `scripts/prepare-original-copy.mjs` from `docs/live-audit/pages.json`; existing structured body copy stays in `published-pages.json`. `scripts/optimize-generated.py` merges responsive candidates into `optimized-images.json`. `site-polish.css` holds layout/category/neon adjustments. `CataloguePage.jsx` owns filter/search/reset state. `HeroNeonFlow.tsx` owns renderer activation and disposal. `vite.config.js` separates the React vendor bundle using [Rolldown code splitting](https://rolldown.rs/reference/OutputOptions.codeSplitting).

Source content is based on the original captured site and spot-checked against its live payroll/e-commerce pages. There are no original `/products` or `/services` catalogue pages in the captured inventory; their introductions therefore reuse the original Home copy. Design/layout and functional controls are adapted; this is not a pixel-for-pixel recreation.

New browser checks cover source headings/paragraphs, combined filters/reset and responsive mobile hero/image candidates. Existing checks cover all routes, artwork uniqueness, image loading, motion, keyboard navigation, responsive overflow and accessibility. Captures: `artifacts/polish-mobile-hero.png`, `artifacts/polish-product-filter-mobile.png`, `artifacts/neon-light-polish-candidate.png`.
Verification: 33 browser tests and 3 unit tests passed. ESLint, TypeScript, formatting and final production build passed.
