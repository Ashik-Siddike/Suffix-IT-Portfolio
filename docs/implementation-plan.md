# Implementation plan

Scope: local-only, frontend-only React/JavaScript website. No existing project files or backend were present in the workspace on 10 October 2026.

1. **Discovery:** inspect live HTML, published route declarations, all discoverable page DOMs and original media. Save evidence in `live-audit/`, map existing paths, distinguish expired content and external utilities.
2. **Foundation:** React 19, Vite 8, Tailwind 4, React Router 7, Motion, Lucide, local Latin font subsets. Shared layout, content files, CSS tokens, accessible navigation, route metadata and lazy pages.
3. **Homepage milestone:** editorial light composition, original logo, genuine field-force imagery, verified client logos, services, products, sectors, published testimonial excerpts, contact CTA. Proposed marketing copy remains subject to company review.
4. **Remaining pages:** reusable catalogue and solution templates with original page-specific body content and assets; company, contact, careers, privacy, article, package and webmail routes; meaningful 404s.
5. **QA:** formatting, lint, unit tests, production build, browser route checks, five representative widths, navigation/form keyboard behavior and axe checks. Record limitations rather than asserting unmeasured Lighthouse or WCAG certification.

Architecture: data lives under `src/data`; shared presentation under `src/components`; page modules under `src/pages`; future form contract under `src/lib`. BrowserRouter requires a deployment rewrite to index.html. No publishing is part of this local workspace request.

Review points: homepage design; full route and content review; release readiness. Continue useful implementation while optional review is pending. Do not connect form delivery without an approved endpoint.
