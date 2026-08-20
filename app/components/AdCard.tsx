"use client";

import { useEffect, useRef } from "react";

interface AdCardProps {
  label?: string;
}

export default function AdCard({
  label = "ADVERTISEMENT",
}: AdCardProps) {
  const adRef = useRef<HTMLElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const element = adRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
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

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={adRef}
      className="ad-card"
    >
      <div className="ad-label">
        {label}
      </div>

      <div className="ad-placeholder">
        <span>REAL ADVERTISEMENT</span>
        <small>Advertisement space</small>
      </div>
    </section>
  );
}