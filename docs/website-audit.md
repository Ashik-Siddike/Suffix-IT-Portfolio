# Website audit

Audited on **10 October 2026** from the empty local workspace and https://www.suffixit.com/.

## Evidence and discovery

Live index HTML, robots.txt, sitemap.xml, published JavaScript chunks (`main.30d79285`, `4.d2dd0499`), production router declarations, original media, search results and rendered Chromium DOMs were inspected. `live-audit/pages.json` stores 40 attempted URL captures; 39 rendered and the remaining webmail URL redirected to its external login service. The route table maps all 38 production route patterns, including two dynamic patterns, with concrete discovered values. All 36 URLs in the original sitemap match the finite router paths; no additional pages were found there. `/sitemap_index.xml` returns the SPA HTML, rather than a sitemap index.

The original GTM script raises `a is not defined`. Animation-hidden headings caused the initial visible-selector audit to time out; switching to attached DOM nodes and textContent recovered the page-specific copy. Some original CSS/image requests fail or are aborted. These limitations concern the original site; they are not used to infer missing content. The audit does not authenticate, submit original forms or probe private pages.

## Original navigation and page families

Header: Home, About, Products, IoT, Services, Career, Contact. Products, IoT and Services expose multi-item dropdowns; `/!` is used as a menu placeholder. Footer: company contact/address, About, Career, Contact, Facebook, LinkedIn, partner/organization logos and ISO marks. Legacy webmail redirects externally.

Catalogue: 18 service detail routes and 10 product routes. Field force and POS are exposed in both service and product namespaces. IoT includes automation, smart transformer monitoring and industrial energy monitoring. Web & e-commerce has Basic, Classic and Premium package detail pages with published prices of $399, $699 and $999. Current prices require company confirmation.

Other pages: About, Contact, Careers, archived career detail 5, Astha privacy policy (last updated 1 August 2022), an industry article and a catch-all 404. `/home` duplicates `/`. All paths and the `/about#whoWeAre` anchor are preserved; `/services` and `/products` are new overview pages.

## Brand and content

Original identity: blue wordmark, black orbit mark and gray tagline, “ultimate solutions…”. Sampling the original logo confirms opaque blue **#0072BC**. No approved brand guidelines were supplied. Original typography is largely Poppins/Calibri with inconsistent heading scales and repeated h1s.

Company content describes software and ICT solutions, application development, ERP, CRM, e-commerce and hosting. Contact data uses Cha-70,70/A, Rupayan Millennium Square (9A), Progoti Sharoni, North Badda, Gulshan, Dhaka-1212; info@suffixit.com; +88 01958 424000. Old index metadata gives a different historical address; the visible contact page/footer is the source used by the redesign.

The homepage contains 21 client logos, three attributed testimonial statements, Field Force screens, service/product carousels and an external call center action. All clients are retained on About and a subset appears in the homepage strip. Published testimonial excerpts remain attributed; their authenticity has not been independently confirmed with the individuals. Full original statements remain in the audit evidence. Do not present them as newly commissioned endorsements.

The homepage says “9+ years” and “Since 2017”; a testimonial mentions 2015. The redesign avoids asserting a founding year or unverified experience count. Its catalogue counts are computed from route data. ISO marks in the original footer are not certificates; the About page references them without asserting current certification.

The only discovered live job listing closes 18 December 2025. It is preserved as archived and does not present an expired application as open. The original Google Forms application URL remains in audit evidence; enquiries route to career@suffixit.com.

## Actions and interactions

Original actions include product/demo request modal/contact controls, navigation dropdowns, package details, carousels, career application link, call center link, Facebook/LinkedIn, Google Maps, reCAPTCHA, and three embedded IoT demonstration videos. No original form was submitted during audit. In the redesign, demo CTAs retain their product context; the contact form validates locally and prepares a mailto enquiry without claiming delivery. IoT videos link to their original YouTube videos, avoiding third-party iframe loading. Google Maps opens on explicit user action. External webmail remains an external service.

## Responsive and accessibility observations

Original desktop (1440px) and mobile (390px) homepage screenshots are retained in `live-audit/`. Repeated top-level headings, weak/default image alt text and animation-hidden content are visible in the DOM. The captured desktop pages report no horizontal overflow; this is a structural observation, not a full original-site mobile/keyboard conformance audit. Third-party login and form delivery were not tested.

## Redesign editorial boundaries

Original substantive detail copy is saved in `src/data/published-pages.json` with source/capture fields. Page banner/breadcrumb markup, duplicate flip-card headings, duplicate list children and the repeatedly incorrect Field Force demo copy on unrelated pages are replaced with shared accessible UI. Original replacement characters in industrial copy are normalized to spaces. Decorative images/icons are replaced or consolidated; original assets remain archived locally. Marketing headlines and short summaries are proposed copy, approved by the user for continued design work, and still require company editorial sign-off before release.

Discovery is complete for the production router and observed public links on this date. Unlinked server pages, future job IDs and private content cannot be guaranteed. See route and asset inventories for precise coverage.
