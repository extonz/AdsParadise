"use client";

import { useEffect, useState } from "react";

const formatCount = (count: number) => count.toLocaleString("en-US");

export default function GlobalAdCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    fetch("/api/global-ads", { signal: controller.signal, cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (alive && typeof data.count === "number") setCount(data.count);
      })
      .catch(() => undefined);

    const queue: { amount: number } = { amount: 0 };
    let timer: number | undefined;

    const flush = () => {
      if (queue.amount <= 0) return;
      const amount = Math.min(queue.amount, 25);
      queue.amount -= amount;

      fetch("/api/global-ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
        keepalive: true,
      })
        .then((response) => response.json())
        .then((data) => {
          if (alive && typeof data.count === "number") setCount(data.count);
        })
        .catch(() => undefined);
    };

    const handleAdSeen = () => {
      setCount((current) => current === null ? current : current + 1);
      queue.amount += 1;
      if (timer === undefined) {
        timer = window.setTimeout(() => {
          timer = undefined;
          flush();
        }, 1200);
      }
    };

    window.addEventListener("ad-seen", handleAdSeen);

    return () => {
      alive = false;
      controller.abort();
      window.removeEventListener("ad-seen", handleAdSeen);
      if (timer !== undefined) window.clearTimeout(timer);
      flush();
    };
  }, []);

  return (
    <aside className="global-ad-counter" aria-live="polite">
      <span className="global-ad-counter-dot" />
      <div>
        <small>ADS PARADISE — TODAY</small>
        <strong>
          {count === null ? "..." : formatCount(count)}
        </strong>
        <span>people have seen ads today</span>
      </div>
      <style jsx>{`
        .global-ad-counter {
          position: fixed;
          top: 18px;
          left: 18px;
          z-index: 8999;
          display: flex;
          align-items: center;
          gap: 10px;
          max-width: 245px;
          padding: 10px 13px;
          background: #111;
          color: #fff;
          border: 2px solid #111;
          box-shadow: 5px 5px 0 #ffef00;
        }
        .global-ad-counter-dot {
          width: 8px;
          height: 8px;
          flex: 0 0 8px;
          border-radius: 50%;
          background: #43ff78;
          box-shadow: 0 0 10px #43ff78;
          animation: pulse 1.5s infinite;
        }
        .global-ad-counter small,
        .global-ad-counter strong,
        .global-ad-counter span { display: block; }
        .global-ad-counter small {
          font: 800 8px/1 monospace;
          letter-spacing: .1em;
          opacity: .55;
        }
        .global-ad-counter strong {
          margin: 3px 0 1px;
          font: 900 23px/1 monospace;
          letter-spacing: -.04em;
        }
        .global-ad-counter span {
          font-size: 9px;
          opacity: .7;
        }
        @keyframes pulse {
          50% { opacity: .35; transform: scale(.75); }
        }
        @media (max-width: 600px) {
          .global-ad-counter {
            top: 10px;
            left: 10px;
            padding: 8px 10px;
            max-width: 190px;
          }
          .global-ad-counter strong { font-size: 18px; }
        }
      `}</style>
    </aside>
  );
}
