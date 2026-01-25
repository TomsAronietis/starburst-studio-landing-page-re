import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

export default function BookingWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initCalendly = () => {
      if (window.Calendly && containerRef.current) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/starburststudiorealestate/30min',
          parentElement: containerRef.current,
        });
      }
    };

    if (window.Calendly) {
      initCalendly();
    } else {
      const checkCalendly = setInterval(() => {
        if (window.Calendly) {
          clearInterval(checkCalendly);
          initCalendly();
        }
      }, 100);

      return () => clearInterval(checkCalendly);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div
        ref={containerRef}
        className="w-full"
        style={{ minWidth: '320px', height: '700px' }}
      ></div>
    </div>
  );
}
