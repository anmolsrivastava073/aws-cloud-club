import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import LandingPage from './pages/LandingPage';
import EventDetailsPage from './pages/EventDetailsPage';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  // Lock scrolling while the preloader is active
  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showPreloader]);

  return (
    <Router>
      {/* THIS is what actually renders your preloader! */}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      
      <Navbar />
      
      <div className="min-h-[100dvh]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
        </Routes>
      </div>
      
      <Footer />
    </Router>
  );
}
