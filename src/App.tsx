import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import EventDetailsPage from './pages/EventDetailsPage';
import Preloader from './components/Preloader';

// Ensure browser history always starts at top (0,0) on refresh/reload
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Immediately scroll to the top on initial mount/reload
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      {loading && (
        <Preloader
          onComplete={() => {
            setLoading(false);
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
        />
      )}
      <div className="min-h-screen flex flex-col bg-[#f5f3ef] text-[#111111] antialiased">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/event/:id" element={<EventDetailsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
