# Suffix IT project: কোথায় কী আছে

এই guide বর্তমান implementation অনুযায়ী লেখা। Project React + Vite frontend; routing-এর জন্য React Router, animation-এর জন্য Motion, icons-এর জন্য Lucide, styling-এর জন্য Tailwind integration ও custom CSS আছে। Backend, database বা CMS এখন যুক্ত নেই।

## ১. একটি page কীভাবে তৈরি হয়

```text
index.html
  → src/main.jsx: React চালু, fonts/CSS load, URL অনুযায়ী page নির্বাচন
  → components/PageLayout.jsx: header + selected page + footer + scroll tools
  → pages/*.jsx: page-এর sections সাজানো
  → components/*.jsx: reusable section, card, form, animation
  → data/*: service/product/company content ও image paths
  → public/assets ও public/optimized: original ও optimized images
```

`main.jsx`-এর lazy loading প্রয়োজনমতো page code load করে। `PageLayout.jsx`-এর `Outlet`-এ নির্বাচিত page দেখানো হয়। Header/footer আলাদা করে প্রতিটি page-এ লিখতে হয় না।

## ২. মূল folders

| Folder              | কাজ                                                             |
| ------------------- | --------------------------------------------------------------- |
| `src/pages/`        | সম্পূর্ণ page-এর layout ও section order                         |
| `src/components/`   | একাধিক page-এ ব্যবহৃত UI, sections এবং interactions             |
| `src/data/`         | Content, navigation, logos, original page copy ও image mapping  |
| `src/lib/`          | UI থেকে আলাদা reusable logic; বর্তমানে contact validation/email |
| `public/assets/`    | Original images, logos, illustrations; URL শুরু `/assets/` দিয়ে |
| `public/optimized/` | Generated responsive WebP images                                |
| `scripts/`          | Original site audit, content preparation ও image optimization   |
| `tests/`            | Browser tests                                                   |
| `docs/`             | Design decisions, audit evidence, guides ও QA records           |
| `artifacts/`        | Local preview screenshots                                       |
| `dist/`             | Build-এর generated output; সরাসরি edit করার জায়গা নয়            |
| `node_modules/`     | Installed dependencies; নিজস্ব code edit করার জায়গা নয়          |
| `test-results/`     | Browser test output ও failure traces                            |

## ৩. Page ও route mapping

সব route ঘোষণা `src/main.jsx`-এ।

| URL                                      | Page file                     | কী দেখায়                                                     |
| ---------------------------------------- | ----------------------------- | ------------------------------------------------------------ |
| `/`                                      | `src/pages/HomePage.jsx`      | সম্পূর্ণ homepage                                            |
| `/home`                                  | `src/main.jsx`                | `/`-এ redirect                                               |
| `/about`                                 | `src/pages/CompanyPage.jsx`   | Original history, Vision/Mission, team photo ও company cards |
| `/services`                              | `src/pages/CataloguePage.jsx` | Services listing ও search                                    |
| `/products`                              | `src/pages/CataloguePage.jsx` | Products listing ও search                                    |
| `/service/:slug`                         | `src/pages/SolutionPage.jsx`  | নির্দিষ্ট service-এর detail                                  |
| `/product/:slug`                         | `src/pages/SolutionPage.jsx`  | নির্দিষ্ট product-এর detail                                  |
| `/contact`                               | `src/pages/ContactPage.jsx`   | Contact information ও enquiry form                           |
| `/career`                                | `src/pages/ContentPage.jsx`   | Published archived job listing                               |
| `/career-detail/:id`                     | `src/pages/ContentPage.jsx`   | Job detail; captured ID `5`                                  |
| `/astha-policy`                          | `src/pages/ContentPage.jsx`   | Original privacy policy                                      |
| `/webmail`                               | `src/pages/ContentPage.jsx`   | Original external webmail-এর link                            |
| `/top-10-software-company-in-bangladesh` | `src/pages/ContentPage.jsx`   | Original article                                             |
| `/web-e-commerce-detail/:type`           | `src/pages/ContentPage.jsx`   | Basic, Classic, Premium package details                      |
| Unknown URL/ID                           | `src/pages/NotFoundPage.jsx`  | 404 page                                                     |

Service/product detail-এর জন্য আলাদা আলাদা JSX page নেই। একই `SolutionPage.jsx` URL অনুযায়ী `catalog.js` থেকে item নিয়ে সংশ্লিষ্ট content ও illustration দেখায়।

## ৪. Homepage-এর section order ও files

Section-এর অবস্থান ও order-এর মূল file `src/pages/HomePage.jsx`।

| Section                                                    | Current file/location                                                  |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| Original Home hero, images, vector and sonar               | HomePage.jsx, AnimatedText.jsx, TechnologyVector.jsx, ui/SonarGrid.jsx |
| Why Choose Us and Field Force                              | HomeRestoredSections.jsx                                               |
| Call Center and generated illustration                     | HomePage.jsx; about-original.css                                       |
| Nine-service bento and liquid hover                        | ServicesBento.jsx; homepage.css                                        |
| Eight-product squeeze carousel                             | ProductsSection.jsx, ui/SqueezeCarousel.jsx; products-carousel.css     |
| Full original testimonials                                 | HomeRestoredSections.jsx; data/home-testimonials.json                  |
| Two-row client marquee                                     | ClientMarquee.jsx                                                      |
| About gradient hero, original history/team, Vision/Mission | CompanyPage.jsx; about-original.css                                    |
| Company introduction and three cards moved to About        | HomeRestoredSections.jsx: CompanyValuesSection                         |
| Shared navigation and footer                               | SiteHeader.jsx, data/navigation.js, SiteFooter.jsx                     |
| Original homepage wording                                  | data/home-original.json                                                |
| New decorative illustrations                               | public/assets/generated/about/                                         |

Home no longer contains the extra capability links, industry cards, invented process block, added marketing CTA or substituted hero demo. Legacy ProductShowcase.jsx and HeroDemo.jsx remain unused. Current change details: about-original-redesign.md; exact image prompts: about-image-prompts.json.

## ৫. Shared components ও functionality

| File                                       | দায়িত্ব                                                                                   |
| ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `PageLayout.jsx`                           | Shared header/footer, metadata, canonical URL, route/hash scroll ও main-content focus     |
| `SiteHeader.jsx`                           | Desktop mega menus, direct About link, mobile navigation, Escape ও outside-click handling |
| `SiteFooter.jsx`                           | Original contact information, social links, quick links ও ছয়টি credential/partner mark    |
| `ui.jsx`                                   | Container, buttons, section headings ও ScrollReveal                                       |
| `AnimatedText.jsx`                         | Word-by-word heading animation; accessible full text ও reduced-motion handling            |
| `SiteImage.jsx`                            | Responsive image source, optimized fallback ও image reveal                                |
| `TechnologyVector.jsx`                     | SVG technology icons ও connection-path animation                                          |
| `ui/SonarGrid.jsx`                         | Hero canvas waves, pointer interaction, resize ও offscreen/reduced-motion handling        |
| `ClientMarquee.jsx`                        | দুই সারির opposite-direction logo animation, pause/resume ও reduced-motion layout         |
| `ui/SqueezeCarousel.jsx`                   | Product selection, keyboard arrows/Home/End, swipe, pagination ও wrapping controls        |
| `HomeRestoredSections.jsx`                 | Original Why Choose Us, company cards, Field Force ও testimonial slider                   |
| `cards.jsx`                                | Reusable service, product ও feature cards                                                 |
| `sections.jsx`                             | Reusable marquee wrapper, CTA ও stats; Home/About-এ বাড়তি CTA/stats এখন ব্যবহার হয় না     |
| `ScrollTools.jsx`                          | Scroll progress ও back-to-top control                                                     |
| `SolutionContent.jsx`, `SourceContent.jsx` | Original detail/article content render ও section animation                                |

## ৬. Content ও assets কোথায় বদলাবে

`src/data/catalog.js`-এ service/product catalogue ও detail route mapping। `navigation.js`-এ menu order ও destination। `company.js`-এ shared company contact data। `published-pages.json`-এ original About/detail/article copy আছে। Home-এর exact copy এখন `home-original.json` থেকে আসে; পূর্ণ testimonials `home-testimonials.json`-এ এবং logos `client-logos.json`-এ।

Original images `public/assets/`-এ। Responsive optimized images `public/optimized/`-এ। Generated product art `public/assets/generated/products/`-এ; নতুন About/Call Center art `public/assets/generated/about/`-এ। Team/client identity বদলাতে generated image ব্যবহার করা হয়নি।

## ৭. CSS file map

| File                    | কী style করে                                                        |
| ----------------------- | ------------------------------------------------------------------- |
| `styles.css`            | Base layout, typography, buttons, forms ও shared components         |
| `refinements.css`       | Shared layout/design refinements                                    |
| `interactions.css`      | Interaction ও motion styling                                        |
| `homepage.css`          | Home hero sonar ও services bento/liquid hover                       |
| `clients-footer.css`    | Client marquee ও dark footer                                        |
| `products-carousel.css` | Squeeze carousel desktop/mobile layout                              |
| `home-restored.css`     | Why Choose Us, company cards, Field Force ও testimonial slider      |
| `about-original.css`    | About wave hero/history/Vision/Mission এবং Call Center illustration |

CSS import order `main.jsx`-এ আছে। `dist/` edit করবে না; source edit করে build করবে।

## ৮. Contact form ও backend

`ContactPage.jsx` এবং `src/lib/`-এর contact logic required fields validate করে, error focus দেয় এবং email draft-এর জন্য mailto তৈরি করে। Email নিজে থেকে send হয় না। Backend, database, CMS বা form storage যুক্ত নেই।

## ৯. Run ও verification

`npm run dev` local preview চালায়। `npm run build` production output তৈরি করে; `npm run preview` সেটি দেখায়। `npm run lint` code lint এবং `npm run format:check` formatting যাচাই করে। `npm test` unit tests; `npm run test:e2e` browser tests চালায়। Browser tests `tests/website.spec.js`-এ; route/image coverage, responsive overflow, navigation, animation, carousel, contact validation ও accessibility checks রয়েছে।

Audit evidence ও design notes `docs/`-এ, preview captures `artifacts/`-এ। নতুন Home/About পরিবর্তনের পূর্ণ map `docs/about-original-redesign.md`-এ এবং image prompts `docs/about-image-prompts.json`-এ আছে।
