"use client";

import { useEffect, useState } from "react";

export default function AdCounter() {
  const [adsSeen, setAdsSeen] = useState(0);

  useEffect(() => {
    const handleAdSeen = () => {
      setAdsSeen((current) => current + 1);
    };

    window.addEventListener("ad-seen", handleAdSeen);

    return () => {
      window.removeEventListener("ad-seen", handleAdSeen);
    };
  }, []);

  return (
    <div className="ad-counter">
      <span>ADS SEEN</span>

      <strong>
        {adsSeen.toString().padStart(3, "0")}
      </strong>
    </div>
  );
}