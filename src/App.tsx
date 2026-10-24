import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import LandingPage from './pages/LandingPage';
import EventDetailsPage from './pages/EventDetailsPage';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <Router>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      
      <Navbar />
      
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
        </Routes>
      </div>
      
      <Footer />
    </Router>
  );
}
