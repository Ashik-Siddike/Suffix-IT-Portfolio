# Home hero redesign and animation locations

Home now uses a spacious headline beside a sculpted deep-blue technology stage. Its existing unique software illustration is framed by fine orbital rings and a light platform; code, hardware and network glyphs are decorative satellites. Pointer movement shifts the illustration and satellites in opposite directions. The stage enters on page load; reduced motion disables entrance/parallax. Existing headline, description and CTA words are preserved.

Files: `src/pages/HomePage.jsx` composes the section, `src/components/ui/HeroTechnologyStage.tsx` handles entrance/pointer/reset, `src/hero-premium.css` controls desktop/mobile appearance. The illustration path remains in `src/data/unique-visuals.json`.

| Animation                              | Where to see it                                                               | Source                                           |
| -------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------ |
| Fractal bloom                          | `/about`, opening hero                                                        | `ui/fractal-bloom-tree.tsx`                      |
| Neon flow adaptation                   | `/contact`, opening hero                                                      | `ui/neon-flow.tsx`                               |
| Zoom parallax                          | `/product/transformer-monitoring`, seven-image gallery; desktop normal motion | `ui/zoom-parallax.tsx`                           |
| Sonar waves + pointer technology stage | `/`, opening hero                                                             | `ui/SonarGrid.jsx`, `ui/HeroTechnologyStage.tsx` |
| Word entrances                         | Home title and section titles                                                 | `AnimatedText.jsx`                               |
| Scroll/image entrances                 | Sections throughout the site                                                  | `ui.jsx`, `SiteImage.jsx`                        |
| Liquid blue hover                      | Home Services cards                                                           | `ServicesBento.jsx`, `homepage.css`              |
| Product change every 2 seconds         | Home Products                                                                 | `ui/SqueezeCarousel.jsx`                         |
| Opposite client marquee rows           | Home client section                                                           | `ClientMarquee.jsx`, `clients-footer.css`        |
| Pointer border glow                    | Home What They Said cards                                                     | `useBorderGlow.js`, `generated-visuals.css`      |

Some effects depend on a desktop pointer or normal motion preferences. Mobile/reduced-motion fallbacks preserve readable content and static layouts. The supplied demo copy and generic stock images are not added to the site.
`npm run build`, typecheck and lint passed. The existing 26 browser checks passed, followed by the new focused Home pointer/reset/reduced-motion test. Desktop/mobile captures: `artifacts/home-hero-premium-desktop.png` and `artifacts/home-hero-premium-mobile.png`.
