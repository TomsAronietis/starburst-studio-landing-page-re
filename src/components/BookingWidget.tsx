import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const DEFAULT_EMBED = `<!-- Calendly inline widget begin -->
<div class="calendly-inline-widget" data-url="https://calendly.com/starburstcraftstudio" style="min-width:320px;height:700px;"></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
<!-- Calendly inline widget end -->`;

export default function BookingWidget() {
  const [embedCode, setEmbedCode] = useState(DEFAULT_EMBED);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookingWidget();

    const subscription = supabase
      .channel('booking_widget_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'booking_widget',
        },
        () => {
          loadBookingWidget();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadBookingWidget = async () => {
    try {
      const { data, error } = await supabase
        .from('booking_widget')
        .select('embed_code')
        .eq('id', 1)
        .maybeSingle();

      if (error) throw error;

      if (data?.embed_code) {
        setEmbedCode(data.embed_code);
      }
    } catch (error) {
      console.error('Error loading booking widget:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderEmbedCode = (code: string) => {
    return (
      <div
        className="w-full"
        dangerouslySetInnerHTML={{ __html: code }}
      />
    );
  };

  if (loading) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 min-h-[500px] animate-pulse" />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {renderEmbedCode(embedCode)}
    </div>
  );
}
