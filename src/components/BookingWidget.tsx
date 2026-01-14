const CALENDLY_EMBED = `<!-- Calendly inline widget begin -->
<div class="calendly-inline-widget" data-url="https://calendly.com/starburstcraftstudio" style="min-width:320px;height:700px;"></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
<!-- Calendly inline widget end -->`;

export default function BookingWidget() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div
        className="w-full"
        dangerouslySetInnerHTML={{ __html: CALENDLY_EMBED }}
      />
    </div>
  );
}
