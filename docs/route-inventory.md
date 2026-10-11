# Route inventory

Audit date: 10 October 2026. Discovered from the live production router and navigation, not only the user’s sample URLs.

| Original URL                                                   | New React page                  | Evidence                                                 |
| -------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------- |
| https://www.suffixit.com/home                                  | HomePage (/home redirects to /) | Rendered DOM captured                                    |
| https://www.suffixit.com/webmail                               | ContentPage                     | External destination preserved; remote login not audited |
| https://www.suffixit.com/contact                               | ContactPage                     | Rendered DOM captured                                    |
| https://www.suffixit.com/about                                 | CompanyPage                     | Rendered DOM captured                                    |
| https://www.suffixit.com/astha-policy                          | ContentPage                     | Rendered DOM captured                                    |
| https://www.suffixit.com/career                                | ContentPage                     | Rendered DOM captured                                    |
| https://www.suffixit.com/service/domain-hosting                | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/erp-consulting                | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/web-ecommerce                 | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/custom-applications           | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/video-conferencing            | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/it-infrastructure             | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/mobile-apps                   | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/hospital-management           | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/learning-management           | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/storage-backup                | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/bulk-sms                      | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/consultancy-system-integrator | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/it-ot-security-solution       | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/power-cooling                 | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/pos-system                    | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/field-force-management        | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/iot                           | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/service/Industrial-Monitoring         | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/product/payroll-system                | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/product/interconnect-billing          | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/product/e-commerce                    | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/product/rupantor-erp                  | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/product/provident-fund                | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/product/hotel-booking-system          | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/product/rupantor-inventory            | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/product/transformer-monitoring        | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/product/field-force-management        | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/product/pos-system                    | SolutionPage                    | Rendered DOM captured                                    |
| https://www.suffixit.com/top-10-software-company-in-bangladesh | ContentPage                     | Rendered DOM captured                                    |
| https://www.suffixit.com/web-e-commerce-detail/:type           | ContentPage                     | Pattern preserved; discovered values listed below        |
| https://www.suffixit.com/career-detail/:id                     | ContentPage                     | Pattern preserved; discovered values listed below        |
| https://www.suffixit.com/                                      | HomePage (/home redirects to /) | Rendered DOM captured                                    |

Discovered concrete dynamic URLs: /career-detail/5, /web-e-commerce-detail/Basic, /web-e-commerce-detail/Classic, /web-e-commerce-detail/Premium. All preserved. Unknown IDs/types render a 404. Added /services and /products overview pages. /about#whoWeAre anchor preserved.

The original navigation uses /! as a menu trigger, not a page. /MO appears in encoded image data; it is not a route. /service/ and /product/ are path construction prefixes. No pages are invented for those strings.

Webmail’s original router redirects to https://sg2plzcpnl505697.prod.sin2.secureserver.net:2096/. The redesigned /webmail page links directly to that existing service without collecting credentials.

Discovery is complete for production router declarations and observed public navigation as captured on this date. Unlinked server content and future dynamic job IDs cannot be guaranteed. The published bundle and index HTML were inspected; no additional public router declarations were found.
