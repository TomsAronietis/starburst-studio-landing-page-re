import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import ProofStrip from './components/ProofStrip';
import ProofGallery from './components/ProofGallery';
import ProblemSection from './components/ProblemSection';
import Mechanism from './components/Mechanism';
import AudienceFit from './components/AudienceFit';
import Offer from './components/Offer';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import AdminVideoUpload from './components/AdminVideoUpload';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (currentPath === '/admin') {
    return <AdminVideoUpload />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ProofStrip />
      <ProofGallery />
      <Offer />
      <AudienceFit />
      <FAQ />
      <FinalCTA />
    </div>
  );
}

export default App;
