import { ArrowRight } from 'lucide-react';
import BookingWidget from './BookingWidget';

export default function FinalCTA() {
  const handleBookCall = () => {
    document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 flex justify-center">
          <div className="max-w-3xl text-center">
            <h2 className="font-serif text-3xl md:text-5xl text-black leading-tight mb-8">
              Don't settle for "good enough" videos that <span className="text-[#B89B4F]">undersell you</span>.
            </h2>

            <div className="space-y-4 text-xl md:text-2xl text-black mb-10">
              <p>Being a realtor is not easy.</p>
              <p>Your service isn't cheap.</p>
              <p className="font-semibold text-[#B89B4F]">We'll help your marketing show that.</p>
            </div>

            <button
              onClick={handleBookCall}
              className="bg-[#B89B4F] text-white px-8 py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-[#A68B3F] transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl mb-4 mx-auto"
            >
              Book My Free Sample Edit Call
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
            <p className="text-gray-600 max-w-md mx-auto">
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
