export default function BookingWidget() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div
        className="calendly-inline-widget w-full"
        data-url="https://calendly.com/starburstcraftstudio"
        style={{ minWidth: '320px', height: '700px' }}
      />
    </div>
  );
}
