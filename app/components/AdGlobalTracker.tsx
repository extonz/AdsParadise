"use client";

import { useEffect } from "react";

export default function AdGlobalTracker() {
  useEffect(() => {
    const handleAdSeen = () => {
      void fetch("/api/global-ads", {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "fake-ad-impression" }),
      }).catch(() => undefined);
    };

    window.addEventListener("ad-seen", handleAdSeen);
    return () => window.removeEventListener("ad-seen", handleAdSeen);
  }, []);

  return null;
}
