"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

export default function BookingWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const SCRIPT_SRC = "https://app.cal.com/embed/embed.js";
    const NAMESPACE = "free-sample-edit";
    const CAL_LINK = "starburststudio/free-sample-edit";
    const ORIGIN = "https://app.cal.com";

    let intervalId: number | null = null;

    const initCal = () => {
      if (!containerRef.current || !window.Cal) return;

      // Ensure container is empty before mounting (prevents duplicates on re-render)
      containerRef.current.innerHTML = "";

      // Init Cal namespace
      window.Cal("init", NAMESPACE, { origin: ORIGIN });

      // Inline embed
      window.Cal.ns[NAMESPACE]("inline", {
        elementOrSelector: containerRef.current, // pass the actual element (safer in React)
        calLink: CAL_LINK,
        config: {
          layout: "month_view",
          useSlotsViewOnSmallScreen: true,
          theme: "light",
        },
      });

      // UI options
      window.Cal.ns[NAMESPACE]("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#f6c92d" },
          dark: { "cal-brand": "#fdfea2" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    };

    const loadScriptIfNeeded = () => {
      // Already loaded
      if (window.Cal) {
        initCal();
        return;
      }

      // Script tag already exists (maybe loaded elsewhere)
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${SCRIPT_SRC}"]`
      );

      if (!existing) {
        const script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        script.onload = initCal;
        document.head.appendChild(script);
      }

      // Fallback: poll until Cal is available (covers cases where onload doesn't fire as expected)
      intervalId = window.setInterval(() => {
        if (window.Cal) {
          if (intervalId) window.clearInterval(intervalId);
          intervalId = null;
          initCal();
        }
      }, 100);
    };

    loadScriptIfNeeded();

    return () => {
      if (intervalId) window.clearInterval(intervalId);
      intervalId = null;

      // Clean up the container on unmount
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div
        ref={containerRef}
        className="w-full"
        style={{ minWidth: "320px", height: "700px", overflow: "auto" }}
      />
    </div>
  );
}
