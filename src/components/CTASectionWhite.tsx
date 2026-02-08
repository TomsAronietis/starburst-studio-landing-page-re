interface CTASectionWhiteProps {
  onOpenPopup: () => void;
}

export default function CTASectionWhite({ onOpenPopup }: CTASectionWhiteProps) {
  return (
    <section className="bg-white py-0 md:py-0">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 flex justify-center">
        <button
          onClick={onOpenPopup}
          className="bg-[#B89B4F] text-white px-10 py-5 rounded-lg font-semibold text-xl md:text-2xl hover:scale-105 transition-transform duration-300 shadow-xl"
        >
          Get My Free Sample Edit
        </button>
      </div>
    </section>
  );
}
