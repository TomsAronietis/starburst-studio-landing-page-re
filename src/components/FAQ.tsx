import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Will hiring a video editor actually get me clients?',
      answer: "Editing alone isn't magic, but premium videos help you stand out and look credible instead of blending in.",
    },
    {
      question: "I tried content before and it didn't work.",
      answer: "Doing it alone is hard. With a team, consistency becomes easier and results start compounding.",
    },
    {
      question: 'Why not hire someone on Fiverr?',
      answer: "Cheap often means missed instructions, templates, and babysitting. We're built for reliability and quality.",
    },
    {
      question: "I don't have time to film.",
      answer: 'One walkthrough or a few clips per week is enough to create multiple pieces of content.',
    },
    {
      question: 'I feel uncomfortable posting.',
      answer: "Most of the time, it's because the videos don't match who you are. We lock your style first so your content feels right.",
    },
    {
      question: "I don't want generic edits.",
      answer: 'We lock your style before editing to avoid templates.',
    },
    {
      question: "How do I know you'll hit deadlines?",
      answer: 'You can see progress in the system. Delivery is 48 hours and revisions are handled quickly.',
    },
    {
      question: 'Can you handle volume every week?',
      answer: "Yes. We're a boutique agency with systems and multiple editors.",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 flex flex-col items-center">
        <h2 className="font-serif text-3xl md:text-5xl text-black leading-tight mb-12 text-center">
          Frequently asked questions
        </h2>

        <div className="max-w-3xl space-y-4 w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#B89B4F] transition-colors duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-300"
              >
                <span className="text-lg font-semibold text-black pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-[#B89B4F] flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-black flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
