import { ArrowRight } from 'lucide-react';
import BookingWidget from './BookingWidget';
import { useState, useEffect } from 'react';

interface FinalCTAProps {
  onOpenPopup: () => void;
}

export default function FinalCTA({ onOpenPopup }: FinalCTAProps) {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section');
      const footer = document.querySelector('footer');

      if (heroSection && footer) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrolledPastHero = window.scrollY > heroBottom;

        // Calculate distance from bottom of viewport to footer
        const footerTop = footer.offsetTop;
        const viewportBottom = window.scrollY + window.innerHeight;
        const distanceToFooter = footerTop - viewportBottom;

        // Hide sticky CTA when within 200px of footer
        const nearFooter = distanceToFooter < 200;

        setShowStickyCTA(scrolledPastHero && !nearFooter);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sticky CTA for mobile */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-lg p-4 transition-transform duration-300 ease-in-out ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
        <button
          onClick={onOpenPopup}
          className="w-full bg-[#B89B4F] text-white px-6 py-4 rounded-lg font-semibold text-base hover:bg-[#A68B3F] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
        >
          Get My Free Sample Edit
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <section className="bg-gray-50 py-16 md:py-24 pb-32 md:pb-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 flex justify-center">
          <div className="max-w-3xl text-center">
            <h2 className="font-serif text-3xl md:text-5xl text-black leading-tight mb-8">
              Don't settle for "good enough" videos that <span className="text-[#B89B4F]">undersell you</span>.
            </h2>

            <div className="space-y-4 text-base md:text-lg text-black mb-10">
              <p>Being a realtor is not easy.</p>
              <p>Your service isn't cheap.</p>
              <p className="text-[#B89B4F]">We'll help your marketing show that.</p>
            </div>

            <button
              onClick={onOpenPopup}
              className="bg-[#B89B4F] text-white px-8 py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-[#A68B3F] transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl mb-4 mx-auto"
            >
              Get My Free Sample Edit
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-sm text-gray-600">
              Free sample edit • Up to 3 revisions • 48-hour delivery
            </p>
          </div>
        </div>
      </section>

      <section id="booking-widget" className="bg-white py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl md:text-3xl text-black mb-2">
              Ready to get started?
            </h3>
            <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto">
              Schedule your free consultation below
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <BookingWidget />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#B89B4F] py-8">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 text-center">
          <img src="/image.png" alt="Starburst Studio" className="h-10 w-10 mx-auto mb-4 opacity-80 rounded-full object-cover" />
          <p className="text-white text-sm">
            2026. Starburst Studio. Premium video editing for real estate professionals.
          </p>
        </div>
      </footer>
    </>
  );
}
