"use client";

import { useEffect, useRef, useState } from "react";

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

let adsterraQueue: Promise<void> = Promise.resolve();

function loadAdsterra(
  mount: HTMLDivElement,
  key: string,
  width: number,
  height: number,
) {
  adsterraQueue = adsterraQueue.then(
    () =>
      new Promise<void>((resolve) => {
        if (!mount.isConnected) {
          resolve();
          return;
        }

        mount.replaceChildren();

        const optionsScript = document.createElement("script");
        optionsScript.type = "text/javascript";
        optionsScript.text = `window.atOptions = {
  key: '${key}',
  format: 'iframe',
  height: ${height},
  width: ${width},
  params: {}
};`;

        const invokeScript = document.createElement("script");
        invokeScript.type = "text/javascript";
        invokeScript.async = false;
        invokeScript.src =
          `https://www.highperformanceformat.com/${key}/invoke.js`;

        const finish = () => {
          window.clearTimeout(timeout);
          invokeScript.removeEventListener("load", finish);
          invokeScript.removeEventListener("error", finish);
          resolve();
        };

        const timeout = window.setTimeout(finish, 9000);

        invokeScript.addEventListener("load", finish, { once: true });
        invokeScript.addEventListener("error", finish, { once: true });

        mount.append(optionsScript, invokeScript);
      }),
  );

  return adsterraQueue;
}

export default function RealAd({ size }: RealAdProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const countedRef = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const config = AD_CONFIG[size];

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;
    countedRef.current = false;
    setLoaded(false);
    setFailed(false);

    loadAdsterra(
      mount,
      config.key,
      config.width,
      config.height,
    ).then(() => {
      if (cancelled || !mount.isConnected) return;

      const hasIframe = Boolean(mount.querySelector("iframe"));

      setLoaded(hasIframe);
      setFailed(!hasIframe);
    });

    return () => {
      cancelled = true;
    };
  }, [config.height, config.key, config.width]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const hasRealAd = Boolean(mount.querySelector("iframe"));

        if (
          entry.isIntersecting &&
          hasRealAd &&
          !countedRef.current
        ) {
          countedRef.current = true;
          window.dispatchEvent(new Event("ad-seen"));
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(mount);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`real-ad real-ad-${size}${
        loaded ? " is-loaded" : ""
      }${failed ? " is-failed" : ""}`}
      aria-label="Advertisement"
    >
      <div className="real-ad-label">
        <span>ADVERTISEMENT</span>
        <span>{size}</span>
      </div>

      <div className="real-ad-content">
        <div
          ref={mountRef}
          className="real-ad-mount"
          aria-hidden="true"
        />

        {!loaded && !failed && (
          <div className="real-ad-loading" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}

        {failed && (
          <div className="real-ad-fallback" role="status">
            <span>ADVERTISEMENT UNAVAILABLE</span>
            <small>Moving on.</small>
          </div>
        )}
      </div>
    </section>
  );
}
