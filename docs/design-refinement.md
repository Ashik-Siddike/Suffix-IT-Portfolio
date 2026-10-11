# Reference-led design refinement

10 October 2026. The user supplied original homepage, About, Payroll, E-Commerce, Careers and mega-menu screenshots and requested a stronger visual result.

Research combined those screenshots with a fresh rendered-browser inspection of the homepage, About, Payroll, E-Commerce and IoT pages. Fresh headings/image references are retained in `live-audit/design-research-oct10.json`; the earlier full route, sitemap and content audit remains valid. No new routes or company claims were inferred from decorative visuals.

## Findings and implementation

| Original strength / redesign gap                                                  | Result                                                                                                                                                                    |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Illustrated, spacious original mega menus; first redesign used small text menus   | Wide illustrated Products, Services and IoT menus with Lucide icons, overview links and a useful contact action; click, keyboard, Escape and mobile disclosures preserved |
| Real desktop/mobile product montage; previous hero showed only one phone product  | Original desktop/mobile montage placed in a light framed hero with clear hierarchy and restrained technical details                                                       |
| Original page-specific illustrations; first migration overused uniform text cards | Illustrated detail heroes and alternating sections matched to original Payroll, E-Commerce and ERP assets                                                                 |
| Long pages with repeated headings and duplicated introductory copy                | Empty parent cards become section dividers; introductory copy appears once, preserving substantive detail content                                                         |
| Product carousel offered weak comparison                                          | Accessible ERP/Field Force/Payroll tabs, product-specific copy, original visuals and correct CTAs                                                                         |
| Small body copy and uniform white grids                                           | Larger text, stronger blue accents, varied section rhythm, clearer product panels and restrained testimonial blocks                                                       |
| Careers had a distinctive visual; redesign was plain text                         | Genuine original Corporate Day 2022 team photograph, without presenting an expired vacancy as open                                                                        |

Full original logo, sampled #0072BC blue, light-only sections, source copy, URL paths, enquiry delivery boundary and reduced-motion support remain in place. Screenshot UI colors remain original image content. No fabricated product dashboards, metrics, customer claims or new stock images.

Files: `src/refinements.css`, navigation/header, ProductShowcase, shared PageHero, HomePage, CompanyPage, SolutionPage, SolutionContent, ContentPage and source-specific solution visual mappings. Hero responsive WebP variants added by the existing asset optimizer. Client strip adjusted to use BIWTA's actual logo from the original client collection.

QA: existing route/responsive/keyboard/form/axe tests plus new tab and mega-menu tests. Final measured results are appended to progress.md after execution. No subjective design ranking or Lighthouse score is claimed.
