# Suffix IT — internal presentation design review

Reviewed 11 October 2026. The objective is a polished company website for the Suffix IT boss to review alongside other employees' designs. This is an internal presentation, not a formal award submission. No website design was changed during this review.

## Evidence

- Visually reviewed Home, About, Products, Payroll and Contact at desktop width; Home and Contact also at mobile width.
- Screenshots: `artifacts/audit-home-full.png`, `audit-about-full.png`, `audit-products-full.png`, `audit-payroll-full.png`, `audit-contact-full.png` and mobile captures.
- Production-build Lighthouse mobile simulation: performance **64**, accessibility **100**, best practices **100**, SEO **92**. LCP **5.8 s**, FCP **3.0 s**, TBT **290 ms**, CLS **0**, total transfer about **928 KiB**. Full report: `artifacts/competition-mobile-lighthouse.json`.
- These are local lab results, not real-user Core Web Vitals or a guarantee about all devices. Automated accessibility scores do not cover every interaction or visible/accessible text mismatch.
- The LCP element was the hero illustration. The report flags late discovery through JavaScript and element render delay. Hero entrance animation, lazy route loading and render-blocking styles are candidates for targeted improvement. Image delivery also has estimated savings; verify with before/after tests rather than treating estimates as guaranteed.

## Recommended priorities

| Priority | Current gap                                                                    | Proposed improvement                                                                                                                                                                 | Completion evidence                                                    |
| -------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| P0       | Initial load is slower under simulated mobile conditions                       | Make the hero visual immediately discoverable and visible; preload the actual responsive candidate, shorten initial reveal, reduce blocking CSS and review image sizes               | Comparable production Lighthouse runs plus a real midrange-phone check |
| P0       | Many visuals show concepts rather than the company's software                  | Feature real Payroll, Field Force and ERP screens in consistent branded device frames; keep illustrations as supporting art                                                          | Authentic screenshots and working related-page navigation              |
| P1       | Homepage sections have a similar pale-blue visual rhythm                       | Give the products area stronger emphasis, balance compact supporting sections with larger product panels, standardize section spacing                                                | Desktop and mobile full-page review                                    |
| P1       | Hero is attractive but has generic technology imagery and uneven text wrapping | Refine headline width and line breaks; derive a restrained decorative connector motif from the existing Suffix identity, without changing the logo or adding a heavy cursor renderer | Every rotating phrase fits cleanly without layout movement             |
| P1       | About mostly uses conceptual illustrations                                     | Place the original real team photograph prominently with the exact company story; present Vision and Mission as a tighter paired composition                                         | Original text and authentic company imagery preserved                  |
| P1       | Payroll and other solution pages repeat large text/image panels                | Introduce an original-heading section index, balance image/text density and add actual UI closeups where available                                                                   | Existing words retained; mobile anchors clear the sticky navbar        |
| P1       | Card layers look similar across very different content                         | Keep the layered treatment, but distinguish major product cards from supporting service/feature cards through scale and spacing                                                      | Stable hover, readable content, no overflow                            |
| P2       | Contact is functional but visually conventional                                | Improve field grouping, selected-topic styling and email-draft result presentation                                                                                                   | Validation and draft-only behavior preserved; no backend added         |
| P2       | Sharing uses a logo thumbnail and client-rendered metadata                     | Create a polished branded share image and evaluate static route metadata for presentation links                                                                                      | Correct preview on an external sharing service after publishing        |

## Presentation strategy

Show a short, reliable journey: Home → Products → Payroll or Field Force → Contact. Demonstrate the same journey on mobile. Explain three decisions plainly: original company wording is preserved, product visuals are relevant, and effects remain responsive without the old WebGL cursor load. Bring the before/after screenshots and a repeatable performance result.

Real product screenshots, project outcomes and additional company material must come from verified company sources. Do not invent client projects, success percentages or new testimonials. The email draft remains the agreed contact workflow; a backend is outside this review's scope.

General reference: [Webby judging criteria](https://www.webbyawards.com/judging-criteria/) cover content, navigation, visual design, functionality, interaction and the overall experience. [Google's Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals) defines performance targets. These are quality references, not the boss's formal judging rules.
