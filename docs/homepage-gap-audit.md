# Homepage gap audit — 11 October 2026

Historical audit snapshot. The products carousel and missing homepage content have now been restored. See `products-squeeze.md` and `homepage-restoration.md` for current status; the table below records the earlier comparison.

Compared the user's full original-homepage screenshot, pasted Products HTML, captured original homepage text and the current HomePage/components. Confirmed the rendered local homepage contains nine service tiles and main-content product links to Field Force, ERP, Payroll and POS. Header/footer navigation was excluded when assessing homepage product coverage.

| Original section       | Current implementation                                                  | Gap                                                                                                                                                      |
| ---------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header                 | Shared SiteHeader with original logo and grouped menus                  | Different navigation arrangement; sections remain accessible                                                                                             |
| Hero                   | Original-brand hero with product imagery and sonar background           | Original play control is absent; original text/photo treatment replaced                                                                                  |
| Why Choose Us          | Three Suffix-difference benefit cards                                   | Original 9+ years statement, Client Focused/Next Gen labels and six explicit promises are not preserved as the same block                                |
| Our Company            | Team photo/introduction plus related benefits                           | Original three illustrated tiles are not reproduced; Since 2017 and Dream Big/Win Together statements are absent                                         |
| Field Force Management | Hero link, featured-product tab and product card                        | No standalone equivalent seven-feature section; homepage tab has four features, omitting Invoice and Payment, Expense Management, Chat and Collaboration |
| Call Center Service    | Inbound, outbound and live-chat cards plus external link                | Present; original illustrations and copy abbreviated                                                                                                     |
| Our Services           | Nine-service bento grid                                                 | All nine screenshot categories present; redesigned arrangement                                                                                           |
| Our Products           | Three featured tabs plus cards for Field Force, Payroll and POS         | Missing original eight-product carousel, swipe/loop/pagination behavior; five original products have no homepage showcase card                           |
| What They Said         | Three testimonials with original people and short quote excerpts        | Original carousel, titles, portraits and full quotes are not reproduced                                                                                  |
| Our Happy Clients      | Complete logo collection in top two-row marquee                         | Present, relocated; no separate original-position client section after testimonials                                                                      |
| Footer                 | Original contact/social links and six original credential/partner marks | Present with redesigned styling                                                                                                                          |

## Original product coverage

The supplied HTML has eight unique routes, ignoring Swiper duplicate slides:

| Product                | Current homepage showcase coverage                                                     |
| ---------------------- | -------------------------------------------------------------------------------------- |
| Payroll System         | Featured tab + product card                                                            |
| Interconnect Billing   | Missing homepage showcase; catalogue/detail route exists                               |
| E-Commerce             | Missing homepage product showcase; separate service tile is not the same product route |
| Rupantor ERP           | Featured tab                                                                           |
| Provident Fund         | Missing homepage showcase; catalogue/detail route exists                               |
| Hotel Booking System   | Missing homepage showcase; catalogue/detail route exists                               |
| Rupantor Inventory     | Missing homepage showcase; catalogue/detail route exists                               |
| Field Force Management | Hero link + featured tab + product card                                                |

POS is an additional current homepage product, not one of the original eight pasted carousel items. `/products` and individual product pages retain the missing products; these are homepage presentation gaps, not missing site routes. The original `#products` homepage anchor is also absent.

The original six Why Choose Us promises are 24/7 support, On-time Delivery, Within Budget, Creating ideas with passion, Assure best quality and Solution for revolution. Some meanings are paraphrased in the redesign; the original explicit list is absent.

Priority for a future restoration: eight-product coverage/carousel, dedicated Field Force seven-feature block, original company milestone and explicit Why Choose Us details. Testimonial carousel/portraits and original section placement are separate presentation choices. This audit does not change implementation or assert that the original hero play control currently works.
