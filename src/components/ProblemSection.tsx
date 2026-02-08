export default function ProblemSection() {
  return (
    <section className="bg-white pt-16 md:pt-24 pb-2 md:pb-2">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 flex flex-col items-center">
        <h2 className="font-serif text-3xl md:text-5xl text-black leading-tight mb-8 max-w-3xl text-center">
          You've heard this a thousand times already: <span className="text-[#B89B4F]">social media matters</span>.
        </h2>

        <div className="max-w-3xl space-y-6 text-base md:text-lg text-black leading-relaxed text-center">
          <p>
            But, as a realtor, you already have 101 things on your to-do list.
          </p>

          <p>
            So content becomes a side quest you never get to… or something you always overthink:
          </p>

          <div className="space-y-3 my-8 inline-block">
            <p className="italic text-black">
              Does this video look amateur?
            </p>
            <p className="italic text-black">
              Do I look desperate?
            </p>
            <p className="italic text-black">
              Is this the best use of my time?
            </p>
          </div>

          <p className="text-[#B89B4F] text-base md:text-lg">
            Here's the truth: posting only feels awkward when you approach it the wrong way, with the wrong set up.
          </p>

          <div className="mt-12 flex justify-center">
            <svg width="32" height="40" viewBox="0 0 32 40" className="text-[#B89B4F]" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2 Q 20 12 16 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M10 18 L16 28 L22 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
