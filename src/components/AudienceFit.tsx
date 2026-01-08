import { CheckCircle } from 'lucide-react';

export default function AudienceFit() {
  const bullets = [
    'Save hours every week',
    'Post consistently without it feeling like a chore',
    'Get more from their marketing without adding more work',
    'Build a brand that looks like the top producer in their area',
    'Stop babysitting editors or waiting all day for updates',
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 flex flex-col items-center text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-black leading-tight mb-12">
          Ideal for agents who want to:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {bullets.map((bullet, index) => (
            <div key={index} className="flex gap-4 items-start">
              <CheckCircle className="w-6 h-6 text-[#B89B4F] flex-shrink-0 mt-1" />
              <p className="text-base md:text-lg text-black leading-relaxed text-left">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
