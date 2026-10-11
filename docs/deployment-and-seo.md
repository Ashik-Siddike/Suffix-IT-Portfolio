# Local preview, deployment and SEO

Run `npm install`, then `npm run dev`. The Vite server defaults to http://127.0.0.1:5173/. `npm run build` creates `dist/`; `npm run preview` serves the production build. Node 22.13+ or Node 24 is supported by the installed Vite stack. Exact dependency versions are pinned in package-lock.json.

This task is local-only. Nothing has been deployed or connected to a production backend.

Any static host must rewrite unknown paths to `/index.html` so direct visits to preserved routes work. Use HTTPS, compress JS/CSS/fonts, and cache hashed assets immutably. Browser-rendered 404s cannot return HTTP 404 status without host configuration. No backend framework is needed.

Route titles, descriptions, canonical links, robots directives and Open Graph metadata are updated after navigation. This React SPA requires JavaScript for content and route metadata. Crawlers and social link preview bots that do not execute JavaScript may see the generic index metadata. No Lighthouse score or measured Core Web Vitals is claimed.

A release improvement is a frontend build-time prerender step using a browser/static snapshot plugin for every finite route in the inventory, keeping React Router hydration/navigation and per-route static meta tags. Evaluate that separately before deployment; do not silently add a backend. The built assets and existing APIs remain independent. A 41-URL sitemap and robots.txt are included in public/; `/home` is omitted from the sitemap because it redirects to the canonical homepage.

Images and the original logo are local; below-the-fold visuals load lazily with explicit dimensions. Local WOFF2 fonts use swap and Latin subsets. SiteImage serves responsive WebP via picture/srcset with original fallbacks. The optimizer generated 139 variants for 49 original raster images; the original three-phone image has a 29,622-byte 640px derivative versus its 62,650-byte source; the refined desktop/mobile montage also has responsive variants. The original logo remains untouched. SVG illustrations remain vector assets. Original screenshots may include UI colors outside the website’s token palette; the website itself stays white/soft blue. The full historical asset archive is currently copied to dist, although only referenced files are fetched by browsers. A release asset allowlist can reduce packaging size without discarding originals.

Before release: company copy/price approval, current certificate documentation, testimonial reuse confirmation, archive job review, privacy review of the unchanged Astha policy, host rewrites, and an approved contact delivery service if actual web submission is required.
