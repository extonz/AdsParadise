"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const formatCount = (count: number) => count.toLocaleString("en-US");

export default function GlobalCounterPage() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        const response = await fetch("/api/global-ads", { cache: "no-store" });
        if (!response.ok) throw new Error("Counter unavailable");

        const data: unknown = await response.json();
        if (
          alive &&
          typeof data === "object" &&
          data !== null &&
          "count" in data &&
          typeof data.count === "number"
        ) {
          setCount(data.count);
        }
      } catch {
        // Keep the page usable if the counter API is unavailable.
      } finally {
        if (alive) setLoading(false);
      }
    };

    load();
    const interval = window.setInterval(load, 5000);

    return () => {
      alive = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <main className="counter-page">
      <div className="counter-shell">
        <Link href="/" className="back">← BACK TO ADS PARADISE</Link>

        <header className="counter-header">
          <p>ADS PARADISE / LIVE DATA</p>
          <h1>GLOBAL AD COUNTER</h1>
          <span>A completely unnecessary statistic for a completely unnecessary website.</span>
        </header>

        <section className="counter-card" aria-live="polite">
          <div className="live"><i /> LIVE COUNTER</div>
          <div className="number">{loading ? "..." : count === null ? "—" : formatCount(count)}</div>
          <h2>GLOBAL ADS SEEN</h2>
          <p>Every fake ad that reaches a visitor's screen contributes to this completely unnecessary global number.</p>
        </section>

        <section className="counter-info">
          <div><strong>01</strong><span>THE INTERNET</span><p>Visitors from all over the internet contribute impressions to the Paradise.</p></div>
          <div><strong>02</strong><span>THE COUNTER</span><p>The number is stored globally and refreshes while you watch it.</p></div>
          <div><strong>03</strong><span>THE PURPOSE</span><p>There isn't one. But it does look pretty cool going up.</p></div>
        </section>

        <Link href="/" className="return-button">ENTER ADS PARADISE →</Link>
      </div>

      <style jsx>{`
        .counter-page{min-height:100vh;background:#f4f1e8;color:#111;padding:32px 20px 70px}.counter-shell{width:min(1000px,100%);margin:auto}.back{display:inline-block;color:#111;font:800 11px monospace;letter-spacing:.08em;text-decoration:none;border-bottom:2px solid #111;padding-bottom:4px}.counter-header{margin:90px 0 48px;max-width:760px}.counter-header p{font:800 10px monospace;letter-spacing:.16em;opacity:.55;margin:0 0 15px}.counter-header h1{font-size:clamp(42px,8vw,92px);line-height:.88;letter-spacing:-.07em;margin:0 0 24px;max-width:700px}.counter-header span{font-size:16px;line-height:1.5;opacity:.65}.counter-card{background:#111;color:#fff;padding:clamp(30px,7vw,75px);text-align:center;border:3px solid #111;box-shadow:14px 14px 0 #ffef00}.live{display:inline-flex;align-items:center;gap:8px;font:800 10px monospace;letter-spacing:.14em;opacity:.7}.live i{width:8px;height:8px;border-radius:50%;background:#43ff78;box-shadow:0 0 12px #43ff78;animation:pulse 1.5s infinite}.number{margin:28px 0 8px;font:900 clamp(54px,13vw,140px)/.9 monospace;letter-spacing:-.08em;word-break:break-word}.counter-card h2{font:900 15px monospace;letter-spacing:.14em;margin:0 0 18px}.counter-card p{max-width:560px;margin:0 auto;font-size:13px;line-height:1.5;opacity:.55}.counter-info{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:60px;background:#111;border:2px solid #111}.counter-info>div{background:#f4f1e8;padding:30px;min-height:190px}.counter-info strong{font:900 12px monospace;opacity:.35}.counter-info span{display:block;margin:35px 0 12px;font:900 14px monospace;letter-spacing:.08em}.counter-info p{font-size:12px;line-height:1.55;opacity:.6;margin:0}.return-button{display:block;width:max-content;margin:55px auto 0;background:#ffef00;color:#111;border:2px solid #111;box-shadow:6px 6px 0 #111;padding:14px 18px;text-decoration:none;font:900 11px monospace;letter-spacing:.08em}@keyframes pulse{50%{opacity:.35;transform:scale(.75)}}@media(max-width:700px){.counter-page{padding:20px 14px 50px}.counter-header{margin-top:65px}.counter-info{grid-template-columns:1fr}.counter-info>div{min-height:auto}}
      `}</style>
    </main>
  );
}
