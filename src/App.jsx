import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PageLayout from './components/PageLayout';
import { LoadingState } from './components/ui';

const CataloguePage = lazy(() => import('./pages/CataloguePage'));
const SolutionPage = lazy(() => import('./pages/SolutionPage'));
const CompanyPage = lazy(() => import('./pages/CompanyPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ContentPage = lazy(() => import('./pages/ContentPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
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
  );
}
