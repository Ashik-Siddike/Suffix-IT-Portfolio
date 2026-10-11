# Home and About content alignment — 11 October 2026

The user's original text is the content authority. Layout, imagery and motion can change; original wording must remain intact unless the user requests a copy change.

## Sources and scope

- Home copy: `docs/live-audit/home.json`, extracted into `src/data/home-original.json` without rewriting, including punctuation and original capitalization.
- About history, Vision and Mission: `src/data/published-pages.json`, `/about`, captured from the original site. All three full paragraphs are preserved.
- Original team image and three company illustrations are retained. Generated illustrations are decorative conceptual visuals; they do not replace team portraits, client logos or software screenshots.

## Changes

- Shared navbar now exposes a direct About link; visible order is Home, About, Products, IoT, Services, Career, followed by Contact.
- The company/team introduction is now on About. The original three-card Our Company section moved from Home to About, following Vision and Mission.
- Removed extra homepage capability links, industry cards, invented process copy and added marketing CTA. Removed the unverified hero-video substitute from Home.
- Home hero, Why Choose Us, Field Force, Call Center, Services, Products, testimonials and client headings/descriptions use original wording.
- Product carousel titles and descriptions preserve the original eight-product copy; service bento tiles use all nine original homepage excerpts, including ellipses.
- Testimonials preserve original headings, quotation punctuation, complete author role/company strings and original portraits.
- About uses a blue gradient wave hero, original team photo, alternating Vision/Mission illustrations, and the moved company cards. Existing scroll reveals and reduced-motion handling remain.
- Added generated blue illustrations to Vision, Mission and Call Center. Optimized WebP assets are in `public/assets/generated/about/`. Exact prompts and generator provenance: `about-image-prompts.json`.
- Shared footer contact/partnership copy and three quick links are aligned with the supplied original screenshot.

## Editing map

`HomePage.jsx` and `CompanyPage.jsx` control page order. `HomeRestoredSections.jsx` implements the shared original sections. `about-original.css` styles the About redesign and Call Center art. `home-original.json` is the homepage wording source.

Original route/detail-page data outside Home/About remains in its existing files; this change does not assert a new word-for-word audit of every other page.

## Validation

Production build, ESLint and changed-file formatting passed. Browser checks verified all public routes/images/internal links, desktop/mobile navigation, product/testimonial controls, scroll motion, responsive overflow and automated WCAG AA, including the redesigned About page. Obsolete headline/control expectations were updated to the restored original wording and rechecked. The final menu change passed focused route, navigation and accessibility checks.

A separate browser comparison against the captured original audit verified all nine service excerpts, all eight product descriptions and all three About paragraphs. Desktop/mobile About captures and the Call Center illustration were visually inspected in `artifacts/`.
