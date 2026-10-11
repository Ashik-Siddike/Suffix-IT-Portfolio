# QA results

Executed locally on 10 October 2026.

| Check                          | Result                                                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| npm install / dependency audit | Completed, zero reported vulnerabilities                                                                                                   |
| npm run lint                   | Passed with no errors or warnings, including supported ESLint 10                                                                           |
| npm run test                   | 3 contact-boundary tests passed                                                                                                            |
| npm run build                  | Passed; route pages split into lazy chunks                                                                                                 |
| Production Playwright suite    | Final run: 12 tests passed in 56.0 seconds after WebP integration and original team photograph                                             |
| Responsive widths              | 360, 390, 768, 1024, 1440px; no overflow on representative home, catalogue, contact, ERP, industrial monitoring, privacy and package pages |
| Routes                         | 41 canonical page URLs; all rendered a single main h1, loaded images, correct canonical metadata and valid internal links                  |
| Interaction                    | Desktop disclosure keyboard operation/Escape; mobile open, navigate and Escape; catalogue search/empty state                               |
| Contact                        | Required errors, focus to first invalid field, email preparation, zero POST requests                                                       |
| 404 behavior                   | Unknown route, solution slug, career ID and package type correctly render the 404                                                          |
| Axe WCAG tags                  | Zero violations on homepage, contact, ERP, privacy, and open mobile navigation for wcag2a/wcag2aa/wcag21aa/wcag22aa                        |

Manual code review covers semantic landmarks, heading normalization, skip link, focus styles, reduced-motion handling, image alt text, link/button semantics and local-only enquiry behavior. Original logo and homepage compositions were visually inspected in Chromium at desktop and mobile sizes. This is not a claim of full WCAG certification or a substitute for assistive-technology testing.

Legacy /home redirect and /about#whoWeAre scroll anchor were also explicitly verified.

Initial issues fixed: card-number contrast, audit selectors blocked by original animation styles, lazy-image test waiting, a test interrupted by Vite HMR, and preservation of product/demo context in contact enquiries. Final browser tests use the production preview to avoid reloads during development.

No Lighthouse run, field Core Web Vitals measurement, real email delivery, third-party webmail login or production deployment was performed. Editorial and release follow-ups are in progress.md and deployment-and-seo.md.

## Screenshot-led refinement QA

Latest production run: **14 browser tests passed in 52.8 seconds**. Added explicit keyboard product-tab selection/CTA checks and Products/Services/IoT mega-menu viewport and axe checks. All original route, responsive, form and keyboard checks still pass. Three unit tests, lint and build also passed. Refined desktop/mobile screenshots were captured and visually reviewed.
