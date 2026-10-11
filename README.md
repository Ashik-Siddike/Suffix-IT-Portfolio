# Suffix IT website redesign

Frontend-only React / JavaScript / Vite / Tailwind CSS v4 redesign. Preserves the live Suffix IT route families and original identity. No backend or live form delivery.

```sh
npm install
npm run dev
```

Local URL: http://127.0.0.1:5173/

```sh
npm run lint
npm run test
npm run test:e2e
npm run build
npm run format:check
```

Browser tests require `npx playwright install chromium`. The installed browser and packages are available in the current workspace environment.

The browser test command builds first and runs against the stable production preview on port 4173. Node 22.13+ or Node 24 is recommended. To regenerate responsive image derivatives, run `node scripts/optimize-images.mjs` while the local preview is serving on port 5173.

Start with [audit](docs/website-audit.md), [routes](docs/route-inventory.md), [design system](docs/design-system.md), and [progress](docs/progress.md). Content lives under `src/data`, shared components under `src/components`, page modules under `src/pages`. See [API contract](docs/api-contract.md) and [deployment/SEO](docs/deployment-and-seo.md).

`scripts/audit-live.mjs` reads the original public site without submitting forms. `scripts/prepare-content.mjs` rebuilds structured content from captured evidence; review diffs if rerunning after the live site changes.
