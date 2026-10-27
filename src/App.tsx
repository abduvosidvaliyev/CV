import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useParams, useLocation } from 'react-router-dom';
import { Background } from './components/Background';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ContactPage } from './pages/ContactPage';
import { ServicesPage } from './pages/ServicesPage';
import { LegalPage } from './pages/LegalPage';
import type { Locale } from './data/translations';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Route wrapper that guarantees currentLocale matches the active URL parameter
const PageWithLocale: React.FC<{ Component: React.FC<{ currentLocale: Locale }> }> = ({ Component }) => {
  const { lang } = useParams<{ lang?: string }>();
  const activeLocale = (lang && ['uz', 'en', 'ru'].includes(lang)) ? (lang as Locale) : 'uz';
  return <Component currentLocale={activeLocale} />;
};

const LegalWithLocale: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const { lang } = useParams<{ lang?: string }>();
  const activeLocale = (lang && ['uz', 'en', 'ru'].includes(lang)) ? (lang as Locale) : 'uz';
  return <LegalPage currentLocale={activeLocale} type={type} />;
};

// Root Layout component wrapping all routes
const AppLayout: React.FC<{ locale: Locale; setLocale: (l: Locale) => void }> = ({ locale, setLocale }) => {
  const { lang } = useParams<{ lang?: string }>();

  useEffect(() => {
    if (lang && ['uz', 'en', 'ru'].includes(lang)) {
      setLocale(lang as Locale);
    }
  }, [lang, setLocale]);

  const activeLocale = (lang && ['uz', 'en', 'ru'].includes(lang)) ? (lang as Locale) : locale;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Background />
      <Navbar currentLocale={activeLocale} onLocaleChange={setLocale} />
      <main style={{ flex: 1, position: 'relative', zIndex: 1, paddingTop: 'var(--nav-height)' }}>
        <Outlet />
      </main>
      <Footer currentLocale={activeLocale} />
    </div>
  );
};

export function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem('preferred-locale');
    return (saved && ['uz', 'en', 'ru'].includes(saved)) ? (saved as Locale) : 'uz';
  });

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('preferred-locale', newLocale);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Default route redirect to current saved locale or /uz */}
        <Route path="/" element={<Navigate to={`/${locale}`} replace />} />

        {/* Main Routes under /:lang */}
        <Route path="/:lang" element={<AppLayout locale={locale} setLocale={handleLocaleChange} />}>
          <Route index element={<PageWithLocale Component={HomePage} />} />
          <Route path="services" element={<PageWithLocale Component={ServicesPage} />} />
          <Route path="projects" element={<PageWithLocale Component={ProjectsPage} />} />
          <Route path="apps" element={<Navigate to="../projects" replace />} />
          <Route path="blog" element={<PageWithLocale Component={BlogPage} />} />
          <Route path="blog/:slug" element={<PageWithLocale Component={BlogDetailPage} />} />
          <Route path="contact" element={<PageWithLocale Component={ContactPage} />} />
          <Route path="privacy-policy" element={<LegalWithLocale type="privacy" />} />
          <Route path="privacy-policy/:slug" element={<LegalWithLocale type="privacy" />} />
          <Route path="terms-of-service" element={<LegalWithLocale type="terms" />} />
          <Route path="terms-of-service/:slug" element={<LegalWithLocale type="terms" />} />
        </Route>

        {/* Catch all fallback */}
        <Route path="*" element={<Navigate to="/uz" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
