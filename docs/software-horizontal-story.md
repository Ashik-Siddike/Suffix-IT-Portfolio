# Software in action: horizontal product story

The existing homepage section remains after Our Products and before What They Said. Its desktop interaction now pins below the actual navbar, converts native vertical scroll into right-to-left product movement, draws a circuit from the same progress, and releases into testimonials. The three earlier white/blue/light-blue sticky panels retain their own native overlap behavior.

## Files

- `src/components/SoftwareCircuitSection.jsx`: prerendered section, alternating product chapters, actual images and CTAs, lazy controller, desktop/reduced-motion eligibility.
- `src/components/ProductVisualCluster.jsx`: a primary visual and one or two supporting visuals, with full-screen previews for authentic screens and explicit illustration captions.
- `src/components/ui/SoftwareScrollController.jsx`: `useGSAP`, ScrollTrigger, media contexts, fit checks, measured distances, short holds, SVG/counter/node synchronization and cleanup.
- `src/components/ui/SoftwareCircuitProgress.jsx`: original geometric SVG route with controlled bends, branches and one numbered node per chapter.
- `src/data/software-story.js`: all ten existing catalog products plus the existing IEMS software platform; names, features and routes are sourced from the current catalog.
- `src/software-story.css`: light-theme canvas, constrained inner scene layouts, device presentation, circuit styling and mobile vertical layouts.
- `tests/software-story.spec.js`: native scroll geometry, reverse motion, complete first/final scenes, exit, resizing, keyboard, previews, route cleanup and mobile imagery.

No backend code or other homepage section implementation is changed. Obsolete CSS for the former two-column software section has been removed from `presentation-polish.css`; the shared preview/dialog styles remain for product detail pages.

## Scroll geometry

The actual travel is `track.scrollWidth - viewport.clientWidth`. The pin starts at the section top minus the measured header height. The pin occupies `100svh - header height`. Its vertical duration is the measured horizontal travel plus two holds, each `min(140px, usable viewport height * 0.16)`.

A single GSAP timeline drives the horizontal track with `scrub: true` and linear movement. SVG dash offset, milestone states and the counter are derived from the track's same normalized movement. Chapter offsets and focus bounds are measured at refresh, not on each scroll frame. Nodes correspond to the chapter order and the current chapter nearest the main viewing area; drawing and activation reverse during upward scrolling.

Functional start/end/X values and `invalidateOnRefresh` recalculate geometry. Font/image completion and ResizeObserver trigger a debounced rebuild when needed. Fixed mosaic dimensions reserve space before loading; an image load with unchanged scene heights does not rebuild the pin. Removing the spacer unnecessarily near the final chapter would clamp document scroll. Rebuilds also wait for native scrolling and pending input to settle: smooth Back to top navigation can begin before the browser emits its first scroll event. Passive activity observation delays measurement only; it does not drive animation or intercept input. Native document scrolling remains in control: there are no wheel handlers, snapping, nested journey scrollbars or application calls that force the user's scroll position.

The implementation follows [GSAP's React lifecycle guidance](https://gsap.com/resources/React/) and [ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/). `gsap` 3.15.0 and `@gsap/react` 2.1.2 are installed. The controller uses the media context's own safe wrapper; re-entering the outer React context from inside it caused a circular cleanup reference in development Strict Mode and has been corrected.

## Content and available assets

The first chapter uses the original Field Force mobile application screen plus two existing Field Force concept visuals. The last chapter uses both original IEMS dashboards and the original IEMS diagram. All three authentic screen previews retain related-page links and full-screen native dialogs. The POS chapter uses the first two original introductory sentences; the complete description remains on its product page.

Verified screenshots are still unavailable for Rupantor ERP, Payroll, Interconnect Billing, E-Commerce, Provident Fund, Hotel Booking, Rupantor Inventory, Smart POS and Transformer Monitoring. Those nine chapters use existing product-specific illustrations, explicitly captioned **Illustration**. ERP's supporting visuals come from its General Ledger and Inventory Management sections, Payroll's from HR and attendance, Commerce's from reservation and payment options, and Transformer's from its gallery. Products with fewer distinct assets use a two-image composition. No fictional application UI has been generated. Approved screenshots can be added to `src/data/software-screens.json` without restructuring the journey.

## Composition refinement

The text/visual split is approximately 42/58, mirrored in alternate chapters. Visuals use a consistent two-column mosaic with a dominant primary image and smaller supporting views. Image frames are lightly tinted and outlined; the scene itself has no surrounding product card. The heading, content and circuit share the same 1280px alignment and close spacing.

The full-height pin and horizontal chapter widths are retained. Inside it, the content zone is capped at 540px and visual clusters at 440px, rather than stretching all three zones across a tall viewport. On shorter desktops the dimensions adapt to available height. The circuit's viewBox is reduced from 110 to 76 units, connector stubs join the composition, and the current node has a static emphasized ring. No secondary animation, new scroll choreography or extra scrub delay has been added.

Tablet copy stacks above the wide image cluster. At 360/390px, the main image sits above two supporting images; two-image products use a compact pair. The IEMS diagram has 320/640/960px WebP variants (11/30/52KB) instead of transferring the 1.64MB original into a small supporting frame.

## Responsive, performance and accessibility

Horizontal mode is eligible at widths of at least 1000px with reduced motion off, and only when all content fits. Short screens fall back to readable normal flow. At 360/390/768px the scene copy and imagery stack vertically without pinning. A live reduced-motion change removes the timeline, pin spacer, offscreen ARIA states and managed tab indices; switching back restores the effect.

Only links actually within the canvas enter the desktop keyboard tab order. Arrow/Page Down and scrolling remain native. Our Products is always reachable, and normal-flow layouts expose every chapter link. Authentic screen dialogs retain focus, Escape dismissal and zoom.

The GSAP chunk is loaded only near the section entrance for eligible users. Observing the entrance probe rather than the full vertical transcript prevents a direct jump to the footer from activating a late pin above the reader. It is not on the hero's initial critical path and is not fetched for mobile/reduced-motion browsing. The main content remains server-prerendered and readable before animation code loads. Only transform and SVG drawing are updated during the journey; no React state updates run on scroll.

## Verification

For this composition refinement, `npm run build`, `npm run lint`, `npm run typecheck` and `npm run format:check` passed. All three existing Vitest tests passed during the initial rollout; the contact functionality they cover was not changed here.

The initial horizontal implementation passed the complete Playwright suite: **65/65 tests**. Composition refinement added geometry assertions for distinct cluster images and close content/circuit alignment, plus a delayed-image regression. The delayed-image and Back to top cases also passed three consecutive runs.

The final composition code passed **31/31 focused Playwright checks**, covering all software chapters, delayed assets, first/final holds, reverse travel, natural exit, previews, resize/reduced motion, the earlier native sticky panels, Back to top, every public route and its images, responsive overflow, and automated accessibility checks.

Browser geometry was checked at 1024×768, 1280×720, 1440×1000 and 1920×1080, with vertical layouts at 360/390/768px and short 500px-high desktops. At 1440×1000, the actual horizontal travel is 14,400px and total pin duration is 14,680px (two 140px holds). Pinning aligns below the measured 97px header, the final chapter aligns at X=0, progress reaches 100%, and normal scrolling then resumes into testimonials. Upward scrolling reverses both the track and the circuit.

The Vite development server was also inspected with React Strict Mode enabled: scrolling through the section, repeated desktop/mobile resizing, live reduced-motion changes, preview dismissal and navigation to Products produced no console errors, and navigation removes the pin spacer. Back to top completes its native smooth scroll even when the animation chunk loads near the section.

Updated browser captures are in `artifacts/software-cluster-{field,erp,payroll,billing,iems}-desktop.png`, `software-cluster-1280.png`, `software-cluster-1024.png`, `software-cluster-tablet.png` and `software-cluster-mobile.png`. The production controller chunk is 46.22KB gzipped and remains deferred; the initial homepage script is 46.39KB gzipped.
