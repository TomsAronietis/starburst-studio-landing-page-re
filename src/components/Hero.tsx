import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const handleBookCall = () => {
    document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWatchExamples = () => {
    document.getElementById('proof-gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-32">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <img src="/image.png" alt="Starburst Studio" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
          </div>

          <p className="text-xs md:text-sm font-semibold tracking-[0.15em] text-black mb-6 uppercase">
            USA Realtors, Brokers and Property Managers!
          </p>

          <div className="mb-6 flex flex-col items-center">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-black leading-[1.2] md:leading-[1.1] mb-3 max-w-4xl">
              Look like a <span className="text-[#B89B4F]">luxury top-producer</span>, without the headache.
            </h1>
            <svg className="w-32 md:w-48 h-6" viewBox="0 0 200 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 15 Q10 8, 18 15 T34 15 T50 15 T66 15 T82 15 T98 15 T114 15 T130 15 T146 15 T162 15 T178 15 T200 15"
                stroke="#B89B4F"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="text-xs md:text-2xl text-black leading-relaxed mb-6 max-w-3xl font-light">
            We'll turn your raw real estate clips into clean, premium videos that attract clients, keep you smiling and wanting to post again.
          </p>

          <p className="text-lg md:text-xl text-black mb-8 max-w-2xl font-semibold">
            No guesswork. No hours of editing. No babysitting. Guaranteed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
            <button
              onClick={handleBookCall}
              className="bg-[#B89B4F] text-white px-8 py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-[#A68B3F] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Book My Free Sample Edit Call
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={handleWatchExamples}
              className="text-black px-8 py-4 font-semibold text-base md:text-lg hover:text-[#B89B4F] transition-colors duration-300 underline underline-offset-4"
            >
              Watch 3 quick examples
            </button>
          </div>

          <p className="text-sm md:text-base text-gray-600 italic">
            Book a quick call → upload your clips → get your free sample edit in 48 hours
          </p>
        </div>
      </div>
    </section>
  );
}
