"use client";

import { useEffect, useRef } from "react";

type RealAdSize = "320x50" | "468x60" | "728x90" | "300x250";

interface RealAdProps {
  size: RealAdSize;
}

const AD_CONFIG = {
  "320x50": {
    key: "00a142de1f48d2a82566fd877d92254b",
    width: 320,
    height: 50,
  },

  "468x60": {
    key: "3ba9ceaa4f7b364be0b63a6069931c15",
    width: 468,
    height: 60,
  },

  "728x90": {
    key: "7af1ff7df3cc1746c78756943a6129de",
    width: 728,
    height: 90,
  },

  "300x250": {
    key: "adf8424bf6f43e6b6fd5cf6b4a9917d0",
    width: 300,
    height: 250,
  },
} as const;

export default function RealAd({
  size,
}: RealAdProps) {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const countedRef = useRef(false);

  const config = AD_CONFIG[size];

  useEffect(() => {
    const container = adContainerRef.current;

    if (!container) {
      return;
    }

    container.innerHTML = "";

    const optionsScript =
      document.createElement("script");

    optionsScript.type = "text/javascript";

    optionsScript.textContent = `
      atOptions = {
        'key': '${config.key}',
        'format': 'iframe',
        'height': ${config.height},
        'width': ${config.width},
        'params': {}
      };
    `;

    const invokeScript =
      document.createElement("script");

    invokeScript.type = "text/javascript";
    invokeScript.src =
      `https://www.highperformanceformat.com/${config.key}/invoke.js`;

    container.appendChild(optionsScript);
    container.appendChild(invokeScript);

    return () => {
      container.innerHTML = "";
    };
  }, [config]);

  useEffect(() => {
    const container = adContainerRef.current;

    if (!container) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            !countedRef.current
          ) {
            countedRef.current = true;

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
    };
  }, []);

  return (
    <section
      className={`real-ad real-ad-${size}`}
      aria-label="Advertisement"
    >
      <div className="real-ad-label">
        ADVERTISEMENT
      </div>

      <div
        ref={adContainerRef}
        className="real-ad-content"
      />
    </section>
  );
}