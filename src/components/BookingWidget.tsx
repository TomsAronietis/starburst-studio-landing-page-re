"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

export default function BookingWidget() {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const SCRIPT_SRC = "https://app.cal.com/embed/embed.js";
    const ORIGIN = "https://app.cal.com";
    const NAMESPACE = "free-sample-edit";
    const CAL_LINK = "starburststudio/free-sample-edit";
    const ELEMENT_ID = "my-cal-inline-free-sample-edit";

    // 1) Create Cal bootstrap/stub (same as Cal's official embed snippet)
    if (!window.Cal) {
      (function (C: any, A: any, L: any) {
        let p = function (a: any, ar: any) {
          a.q.push(ar);
        };
        let d = C.document;
        C.Cal =
          C.Cal ||
          function () {
            let cal = C.Cal;
            let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              d.head.appendChild(d.createElement("script")).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api = function () {
                p(api, arguments);
              };
              const namespace = ar[1];
              api.q = api.q || [];
              if (typeof namespace === "string") {
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initNamespace", namespace]);
              } else p(cal, ar);
              return;
            }
            p(cal, ar);
          };
      })(window, SCRIPT_SRC, "init");
    }

    // 2) Initialize + mount inline widget
    window.Cal("init", NAMESPACE, { origin: ORIGIN });

    window.Cal.ns[NAMESPACE]("inline", {
      elementOrSelector: `#${ELEMENT_ID}`, // selector is the most reliable in React
      calLink: CAL_LINK,
      config: {
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
        theme: "light",
      },
    });

    window.Cal.ns[NAMESPACE]("ui", {
      theme: "light",
      cssVarsPerTheme: {
        light: { "cal-brand": "#f6c92d" },
        dark: { "cal-brand": "#fdfea2" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div
        id="my-cal-inline-free-sample-edit"
        style={{
          width: "100%",
          height: "700px",
          overflow: "auto",
          minWidth: "320px",
        }}
      />
    </div>
  );
}
