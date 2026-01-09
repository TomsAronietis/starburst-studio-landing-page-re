import Hero from './components/Hero';
import ProofStrip from './components/ProofStrip';
import ProofGallery from './components/ProofGallery';
import ProblemSection from './components/ProblemSection';
import Mechanism from './components/Mechanism';
import AudienceFit from './components/AudienceFit';
import Offer from './components/Offer';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';

function App() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Hero />
      <ProofStrip />
      <ProofGallery />
      <ProblemSection />
      <Mechanism />
      <AudienceFit />
      <Offer />
      <FAQ />
      <FinalCTA />
    </div>
  );
}

export default App;
