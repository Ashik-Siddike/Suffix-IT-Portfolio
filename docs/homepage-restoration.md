# Homepage content restoration ? 11 October 2026

Restored the missing original homepage blocks using captured source content in docs/live-audit/home.json and original public/assets illustrations.

- Why Choose Us: original dashboard image, 9+ years, Client Focused/Next Gen labels and six promises.
- Our Company: three original illustrations, experienced team, since 2017 and dream big/win together statements.
- Field Force Management: standalone image, seven original features and original detail route.
- Testimonials: three original titles, full quotations, author roles and original JPEG portraits recovered from the audit's embedded images. Previous/next wrap and pagination controls; no autoplay.
- Clients: existing complete two-row marquee now follows testimonials.
- Call Center: existing section moved before Services to preserve the original relative order.
- Hero play control: the original hero video could not be verified. The clearly labelled IoT demo opens the existing published IoT YouTube demonstration in a native dialog, with Escape, focus return and an external fallback link. The iframe loads only after opening.

Implementation: src/components/HomeRestoredSections.jsx, src/components/HeroDemo.jsx, src/data/home-testimonials.json, src/home-restored.css and src/pages/HomePage.jsx.

Validation: production build, 22 Playwright browser tests including route/image coverage, mobile overflow, restored content, slider controls, dialog keyboard behavior and automated WCAG AA checks. Desktop and mobile section screenshots inspected in artifacts/restored-*.png.
