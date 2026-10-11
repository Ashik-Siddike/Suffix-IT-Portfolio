# Unique artwork and pointer border glow — 11 October 2026

The user requested different artwork for every illustration placement, consistent background treatment within a section, and a border highlight that follows the pointer on testimonial cards.

## Artwork mapping

The generation plan contains 98 new illustrations. Each has its own built-in image_gen request, subject, composition and destination file. This includes Home/About/company cards, menu artwork, detail-page heroes, catalogue product cards, every related-product card on each product page, illustrated detail sections and gallery positions.

Existing generated artwork that can be retained without repetition is assigned to one placement only. The eight original generated carousel scenes remain exclusive to the Home Products carousel. Shared company/client/partner logos, true client portraits and functional UI glyphs remain unchanged.

The new files live in `public/assets/generated/unique/`. Exact per-image prompts and output paths are in `unique-visual-generation-jobs.json`; application mapping is in `src/data/unique-visuals.json`.

## Background policy

- All 98 new assets are generated with true transparent backgrounds and saved as alpha-preserving WebP.
- Company cards, service bento illustrations, product catalogue cards, related-product cards, detail capabilities, galleries and menu illustrations use transparent art consistently.
- The eight carousel scenes use full backgrounds consistently. About's Vision/Mission pair retains its two matching full-background illustrations.
- Each saved image must contain transparency. The save helper rejects opaque output rather than mixing it into a transparent group.
- Original portraits are circular photographs; company/client/partner logos retain their original pixels.

## Pointer glow

`src/components/useBorderGlow.js` tracks the pointer relative to all three testimonial cards. One animation frame updates CSS coordinates. A radial light masked to the rounded border creates the blue edge highlight; nearby card borders can also light up when the pointer is close. A faint surface glow accompanies the border. Pointer leave fades the highlight. Touch interaction keeps the static border; reduced motion removes the fade transition. Tracking does not re-render React on every pointer movement.

The visual styling is in `src/generated-visuals.css`, and the handlers are attached to the testimonial group in `HomeRestoredSections.jsx`.

## Tools and scripts

| File                                | Responsibility                                                                                                            |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `scripts/plan-unique-visuals.mjs`   | Builds the placement manifest and exact generation jobs                                                                   |
| `scripts/save-unique-visual.py`     | Copies a generated output into the project, optimizes WebP and preserves alpha                                            |
| `scripts/apply-unique-visuals.mjs`  | Verifies all assets and unique paths, then applies the artwork mapping; `--check` checks source bindings without mutation |
| `scripts/review-unique-visuals.mjs` | Generates browser contact sheets over checkerboards for visual review                                                     |
| `src/data/unique-visuals.json`      | Single editing point for placement-specific image paths                                                                   |

Browser checks verify pointer-coordinate changes, original portraits, generated-image uniqueness across public page renders, image loading, navigation, motion, responsive overflow and accessibility.

## Completed verification

All 98 images were generated and installed. Alpha inspection found no opaque outputs; SHA-256 inspection found 98 distinct files. All seven checkerboard contact sheets were visually reviewed. Desktop/mobile captures cover the bento, company cards, catalogue, payroll page and testimonial pointer glow.

Production build, ESLint and formatting pass. All 24 Playwright checks pass, including generated artwork uniqueness across all public routes, loaded images, original testimonial portraits, pointer-coordinate tracking, carousel timing, responsive overflow and automated WCAG AA coverage. The asset inspection report is `artifacts/unique-art-validation.json`.
