import { CheckCircle, ArrowRight } from 'lucide-react';

export default function Mechanism() {
  const steps = [
    'You show us the style and what you want your videos to look like.',
    'Upload your video clips into our system.',
    'We edit with professional software and review against our quality standards.',
    'You see status, updates, and changes without chasing.',
    'Request changes and we fix them within 48 hours.',
  ];

  const handleBookCall = () => {
    document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-[#FAF8F5] py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <h2 className="font-serif text-3xl md:text-5xl text-black leading-tight mb-12 text-center">
          Video edits <span className="text-[#B89B4F]">that feel premium</span> and keep you top of mind
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 300 200"
                preserveAspectRatio="none"
              >
                <path
                  d="M 8,12 L 280,8 Q 295,8 295,20 L 298,180 Q 298,192 285,195 L 15,192 Q 8,192 8,185 Z"
                  stroke="#B89B4F"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.7"
                />
              </svg>
              <div className="relative bg-[#FAF8F5] p-6 h-full flex flex-col justify-center">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#B89B4F] text-white flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-lg text-black leading-relaxed pt-0.5">{step}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleBookCall}
            className="bg-[#B89B4F] text-white px-8 py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-[#A68B3F] transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            Book My Free Sample Edit Call
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
