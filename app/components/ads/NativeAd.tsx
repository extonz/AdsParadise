"use client";

import { useEffect, useRef } from "react";

export default function NativeAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const script = document.createElement("script");

    script.async = true;
    script.setAttribute("data-cfasync", "false");

    script.src =
      "https://pl30943125.effectivecpmnetwork.com/1dc76dab6e9ca754d1e2c4cc3db1fb9f/invoke.js";

    container.appendChild(script);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !counted.current
        ) {
          counted.current = true;

          window.dispatchEvent(
            new Event("ad-seen")
          );
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      container.innerHTML = "";
    };
  }, []);

  return (
    <section className="native-ad">

      <div className="ad-label">
        ADVERTISEMENT
      </div>

      <div
        ref={containerRef}
        id="container-1dc76dab6e9ca754d1e2c4cc3db1fb9f"
        className="native-ad-container"
      />

    </section>
  );
}