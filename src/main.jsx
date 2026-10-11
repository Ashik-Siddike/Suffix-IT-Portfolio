import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import '@fontsource/manrope/latin-800.css';
import './styles.css';
import './refinements.css';
import './interactions.css';
import './homepage.css';
import './clients-footer.css';
import './products-carousel.css';
import './home-restored.css';
import './about-original.css';
import PageLayout from './components/PageLayout';
import { LoadingState } from './components/ui';

const HomePage = lazy(() => import('./pages/HomePage'));
const CataloguePage = lazy(() => import('./pages/CataloguePage'));
const SolutionPage = lazy(() => import('./pages/SolutionPage'));
const CompanyPage = lazy(() => import('./pages/CompanyPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ContentPage = lazy(() => import('./pages/ContentPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <Suspense fallback={<LoadingState />}>
          <Routes>
            <Route element={<PageLayout />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="about" element={<CompanyPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="services" element={<CataloguePage type="services" />} />
              <Route path="products" element={<CataloguePage type="products" />} />
              <Route path="service/:slug" element={<SolutionPage />} />
              <Route path="product/:slug" element={<SolutionPage />} />
              <Route path="career" element={<ContentPage kind="career" />} />
              <Route path="career-detail/:id" element={<ContentPage kind="career-detail" />} />
              <Route path="astha-policy" element={<ContentPage kind="policy" />} />
              <Route path="webmail" element={<ContentPage kind="webmail" />} />
              <Route
                path="top-10-software-company-in-bangladesh"
                element={<ContentPage kind="article" />}
              />
              <Route path="web-e-commerce-detail/:type" element={<ContentPage kind="package" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
);
