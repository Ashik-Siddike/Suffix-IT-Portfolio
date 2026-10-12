import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import App from './App';
import { StrictMode } from 'react';

// Same components and original content as the interactive homepage.
// React hydrates this markup; the hero image is kept in place during startup.
export function renderHomepagePreview() {
  return renderToString(
    <StrictMode>
      <StaticRouter location="/">
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </StaticRouter>
    </StrictMode>,
  );
}
