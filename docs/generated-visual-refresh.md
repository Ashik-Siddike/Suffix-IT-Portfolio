# Generated visual refresh — 11 October 2026

## Behavior and layout

Our Products retains the eight original products and squeeze layout. It advances every 2,000 ms while visible. Hover, keyboard focus, an explicit pause button, an inactive browser tab or reduced-motion preference stop autoplay. Manual controls, wrapping, swipe and arrow/Home/End navigation remain available. A live media-query listener stops autoplay when the user's motion preference changes during the session. Timers/listeners clean up on unmount.

What They Said now follows the supplied staggered reference: heading/copy on the left, one centered testimonial card in the middle, two stacked cards on the right. Tablet uses two columns and mobile stacks all cards. Full original quotations, titles, names and role/company text are unchanged. Original client portraits are restored following the user correction; generated quote icons decorate the cards. No new rating claims or testimonial text were added.

## Visual assets

- Generated ten transparent illustrations: team, software, infrastructure, learning, security, hospital, industrial, payments, time and growth.
- Generated one transparent 6×6 raster atlas with 36 new action/technology icons. `GeneratedIcons.jsx` provides compatible named components; `Icon.jsx` maps catalogue icons into the atlas. No inline SVG icon library is rendered, and the Lucide dependency was removed.
- All eleven new assets are saved in `public/assets/generated/illustrations/` as alpha-preserving WebP. Each asset's alpha range was verified as 0–255. The built-in image generator created transparency directly; no background-removal fallback was necessary.
- Earlier generated product and About illustrations are reused where relevant. Company, client and credential/partner logos are unchanged.
- Replaced 95 legacy illustration/image references across catalogue/detail pages, menus, Home, About and careers. The final section-specific mappings add distinct payments/time/growth art to payroll and company content.
- Removed 71 old SVG files from `public/assets/`, including three unused document-format icons. About's old SVG wave and hero connection drawing now use CSS shapes. No SVG is rendered on the tested public routes.
- Original audit captures remain in docs for content provenance. Unused raster source captures are not presented in the website.

Exact prompts and saved paths: `generated-visual-prompts.json`. Initial migration mapping: `generated-visual-replacements.json`; later payroll/company topic overrides are in `solution-visuals.js` and `HomeRestoredSections.jsx`. `replace-legacy-visuals.mjs` is a one-time migration and rejects repeat execution.

## Editing map

| Concern                                                | File                                                           |
| ------------------------------------------------------ | -------------------------------------------------------------- |
| Autoplay, pause, visibility and live motion preference | `src/components/ui/SqueezeCarousel.jsx`                        |
| Testimonial card content and order                     | `src/components/HomeRestoredSections.jsx`                      |
| New icon components                                    | `src/components/GeneratedIcons.jsx`, `src/components/Icon.jsx` |
| Icon atlas crop, testimonial grid, CSS wave/aura       | `src/generated-visuals.css`                                    |
| Catalogue illustration paths                           | `src/data/catalog.js`                                          |
| Section-specific detail illustrations                  | `src/data/solution-visuals.js`                                 |
| New illustration assets                                | `public/assets/generated/illustrations/`                       |

Desktop/mobile Home, testimonials, menus, company cards and healthcare detail captures were inspected in artifacts. Browser tests cover the two-second timer, pause/resume, hover and dynamic reduced motion; original text/logo preservation; all routes/images and absence of inline SVG; responsive overflow and WCAG AA.

Validation: build and ESLint passed without warnings. The full browser run passed 22 checks and found a dynamic reduced-motion update issue in autoplay; a live media-query listener fixed it. Final focused autoplay and carousel tests both passed. The preceding successful checks covered all public routes/images, no inline SVG, preserved logos, 360–1440px layouts, menus and automated WCAG AA.
