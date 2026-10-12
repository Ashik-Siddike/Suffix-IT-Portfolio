import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/manrope/wght.css';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import App from './App';
import './styles.css';
import './refinements.css';
import './interactions.css';
import './homepage.css';
import './clients-footer.css';
import './products-carousel.css';
import './home-restored.css';
import './about-original.css';
import './generated-visuals.css';
import './premium-effects.css';
import './hero-premium.css';
import './image-surfaces.css';
import './site-polish.css';
import './home-showcases.css';
import './marquee-effects.css';
import './home-final-treatments.css';
import './modern-motion.css';
import './hero-curves.css';
import './company-circuit.css';
import './sticky-showcases.css';
import './text-hover-effect.css';
import './presentation-polish.css';
import './software-story.css';

const root = document.getElementById('root');
const application = (
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>
);
if (root.dataset.prerender === 'home') hydrateRoot(root, application);
else createRoot(root).render(application);
