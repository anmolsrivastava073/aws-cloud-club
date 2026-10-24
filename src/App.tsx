import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import LandingPage from './pages/LandingPage';
import EventDetailsPage from './pages/EventDetailsPage';

export default function App() {
  // Only show the preloader if the user lands exactly on the root homepage
  const [showPreloader, setShowPreloader] = useState(() => {
    return window.location.pathname === '/';
  });

  return (
    <Router>
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
