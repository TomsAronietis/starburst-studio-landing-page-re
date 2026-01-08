export default function ProofStrip() {
  const items = [
    'Thousands of videos edited',
    '48-hour delivery',
    'Same-day revisions',
    'Style-matched to your brand',
  ];

  const doubledItems = [...items, ...items, ...items];

  return (
    <div className="bg-black py-4 overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap">
        {doubledItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="text-white text-lg md:text-xl font-semibold px-8">
              {item}
            </span>
            <span className="text-[#B89B4F] text-2xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
