import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import ProofStrip from './components/ProofStrip';
import ProofGallery from './components/ProofGallery';
import ProblemSection from './components/ProblemSection';
import Mechanism from './components/Mechanism';
import AudienceFit from './components/AudienceFit';
import Offer from './components/Offer';
import CTASection from './components/CTASection';
import CTASectionWhite from './components/CTASectionWhite';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import AdminVideoUpload from './components/AdminVideoUpload';
import QuizPopup from './components/QuizPopup';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    if (currentPath === '/admin') return;

    const hasSeenPopup = localStorage.getItem('hasSeenQuizPopup');
    if (hasSeenPopup) return;

    let timeoutId: NodeJS.Timeout;
    let hasTriggered = false;

    const handleScroll = () => {
      if (hasTriggered) return;

      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercentage > 50) {
        hasTriggered = true;
        setShowPopup(true);
        localStorage.setItem('hasSeenQuizPopup', 'true');
        window.removeEventListener('scroll', handleScroll);
      }
    };

    timeoutId = setTimeout(() => {
      if (!hasTriggered) {
        hasTriggered = true;
        setShowPopup(true);
        localStorage.setItem('hasSeenQuizPopup', 'true');
        window.removeEventListener('scroll', handleScroll);
      }
    }, 15000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPath]);

  if (currentPath === '/admin') {
    return <AdminVideoUpload />;
  }

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ProofStrip />
      <ProofGallery />
      <Offer />
      <AudienceFit />
      <CTASectionWhite />
      <FAQ />
      <FinalCTA />
      {showPopup && <QuizPopup onClose={handleClosePopup} />}
    </div>
  );
}

export default App;
