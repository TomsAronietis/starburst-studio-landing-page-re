"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function BookingWidget() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "free-sample-edit" });

      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": "#f6c92d" },
          dark: { "cal-brand": "#fdfea2" },
        },
      });
    })();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <Cal
        namespace="free-sample-edit"
        calLink="starburststudio/free-sample-edit"
        style={{ width: "100%", height: "700px", overflow: "auto", minWidth: "320px" }}
        config={{ layout: "month_view", useSlotsViewOnSmallScreen: true, theme: "light" }}
      />
    </div>
  );
}
