"use client";

import { useEffect, useRef, useState } from "react";

type RealAdSize = "320x50" | "468x60" | "728x90" | "300x250";

interface RealAdProps {
  size: RealAdSize;
}

const AD_CONFIG = {
  "320x50": { width: 320, height: 50 },
  "468x60": { width: 468, height: 60 },
  "728x90": { width: 728, height: 90 },
  "300x250": { width: 300, height: 250 },
} as const;

export default function RealAd({ size }: RealAdProps) {
  const config = AD_CONFIG[size];
  const countedRef = useRef(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    countedRef.current = false;
    setLoaded(false);
  }, [size]);

  const handleLoad = () => {
    setLoaded(true);

    if (countedRef.current) return;

    countedRef.current = true;
    window.dispatchEvent(new Event("ad-seen"));
  };

  return (
    <section
      className={`real-ad real-ad-${size}${loaded ? " is-loaded" : ""}`}
      aria-label="Advertisement"
    >
      <div className="real-ad-label">
        <span>ADVERTISEMENT</span>
        <span>{size}</span>
      </div>

      <div className="real-ad-content">
        <iframe
          title={`Advertisement ${size}`}
          src={`/ads/${size}`}
          width={config.width}
          height={config.height}
          loading="lazy"
          scrolling="no"
          frameBorder="0"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={handleLoad}
        />

        {!loaded && (
          <div className="real-ad-loading" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
    </section>
  );
}
