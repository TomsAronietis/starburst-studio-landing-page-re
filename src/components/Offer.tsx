import { CheckCircle, ArrowRight, Play } from 'lucide-react';

export default function Offer() {
  const bullets = [
    '1 free edited video (your footage, your style)',
    'Up to 3 revisions',
    '48-hour delivery',
    'Clear workflow and updates in one place',
  ];

  const steps = [
    'Book a quick call',
    'Send 1 clip',
    'Receive your edited sample',
  ];

  const handleBookCall = () => {
    document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="offer" className="bg-[#B89B4F] py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-4">
            Free Sample Edit
          </h2>
          <p className="text-xl md:text-2xl text-white font-semibold">
            <span className="relative inline-block">
              (Delivered in 48 hours)
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden group cursor-pointer mx-auto w-full max-w-sm">
            <img
              src="https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Example edited reel"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-white fill-current" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-sm font-semibold text-black inline-block">
                Example Final Edit
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-4 mb-8">
              {bullets.map((bullet, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <p className="text-lg text-white leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/15 backdrop-blur-sm rounded-lg p-6 mb-8">
              <p className="text-white font-semibold mb-4 text-lg">How it works:</p>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <span className="text-white font-bold text-xl">{index + 1}.</span>
                    <p className="text-white">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleBookCall}
              className="bg-white text-[#B89B4F] px-8 py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl w-full"
            >
              Book My Free Sample Edit Call
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-white/80 text-sm mt-6 text-center italic">
              If you love the edit, we can talk about working together. If not — no pressure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
