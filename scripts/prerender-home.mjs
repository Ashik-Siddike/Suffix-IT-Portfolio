import fs from 'node:fs/promises';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { renderHomepagePreview } = await server.ssrLoadModule('/src/entry-preview.jsx');
  const preview = renderHomepagePreview().replace(/<link\b[^>]*rel="preload"[^>]*\/>/g, '');
  const file = 'dist/index.html';
  let html = await fs.readFile(file, 'utf8');
  const loader = html.match(/<!-- root-content-start -->([\s\S]*?)<!-- root-content-end -->/)?.[1];
  if (!loader) throw new Error('Homepage prerender markers are missing from index.html.');
  html = html.replace(/<!-- root-content-start -->[\s\S]*?<!-- root-content-end -->/, preview);
  html = html.replace(
    '</head>',
    `<style>html[data-initial-page="other"] #root { visibility: hidden; }</style>
  <script>document.documentElement.dataset.initialPage = location.pathname === '/' ? 'home' : 'other';</script>
  </head>`,
  );
  html = html.replace(
    '</body>',
    `<script>
    if (location.pathname === '/') {
      document.getElementById('root').dataset.prerender = 'home';
    } else {
      document.getElementById('root').innerHTML = ${JSON.stringify(loader).replace(/</g, '\\u003c')};
      document.getElementById('root').style.visibility = 'visible';
    }
  </script>
  </body>`,
  );
  await fs.writeFile(file, html);
  console.log('Homepage first frame prerendered from the existing React components.');
} finally {
  await server.close();
}
