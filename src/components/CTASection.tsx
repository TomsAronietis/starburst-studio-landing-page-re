export default function CTASection() {
  const handleBookCall = () => {
    document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-[#B89B4F] py-0 md:py-0">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 flex justify-center">
        <button
          onClick={handleBookCall}
          className="bg-white text-[#B89B4F] px-10 py-5 rounded-lg font-semibold text-xl md:text-2xl hover:scale-105 transition-transform duration-300 shadow-xl"
        >
          Get My Free Sample Edit
        </button>
      </div>
    </section>
  );
}
