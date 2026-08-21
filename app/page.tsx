"use client";

import { useEffect, useMemo, useState } from "react";

import ParadiseHeader from "./components/ParadiseHeader";
import AdCard from "./components/AdCard";
import FakeAd from "./components/FakeAd";
import AdCounter from "./components/AdCounter";
import PopupPolish from "./components/PopupPolish";
import NativeAd from "./components/ads/NativeAd";
import RealAd from "./components/ads/RealAd";
import { fakeAds as fallbackAds, type FakeAd as FakeAdData } from "./data/ads";
import { loadAds } from "./lib/ads";

const realAdSizes = ["728x90", "300x250", "468x60", "320x50"] as const;
const INITIAL_VISIBLE = 18;
const LOAD_MORE = 12;

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function Home() {
  const [ads, setAds] = useState<FakeAdData[]>(fallbackAds);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [source, setSource] = useState<"supabase" | "local">("local");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    loadAds().then((result) => {
      if (cancelled) return;
      setAds(shuffle(result.ads));
      setSource(result.source);
      setVisibleCount(INITIAL_VISIBLE);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    // FakeAd fires this event once when at least 50% of an ad enters the viewport.
    // Each event is one genuine fake-ad impression; the component itself guards
    // against duplicate renders/re-observations of the same ad.
    const handleAdSeen = () => {
      fetch("/api/global-ads", {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "fake-ad-impression" }),
      }).catch(() => {});
    };

    window.addEventListener("ad-seen", handleAdSeen);
    return () => window.removeEventListener("ad-seen", handleAdSeen);
  }, []);

  const visibleAds = useMemo(() => ads.slice(0, visibleCount), [ads, visibleCount]);

  const shuffleFeed = () => {
    setAds((current) => shuffle(current));
    setVisibleCount(INITIAL_VISIBLE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadMore = () => {
    setVisibleCount((current) => Math.min(current + LOAD_MORE, ads.length));
  };

  return (
    <main>
      <PopupPolish />
      <AdCounter />
      <ParadiseHeader />
      <div className="container">
        <section className="hero">
          <p className="eyebrow">WELCOME TO THE PARADISE</p>
          <h1>You came for the internet.<br />We gave you ads.</h1>
          <p className="hero-description">Ads Paradise is a completely unnecessary website dedicated to the beautiful art of advertising.</p>
          <div className="hero-meta">
            <span>{ads.length.toLocaleString()} FAKE ADS</span>
            <span>{source === "supabase" ? "LIVE DATABASE" : "LOCAL FALLBACK"}</span>
            <span>ZERO PURPOSE</span>
          </div>
        </section>
        <NativeAd />
        <section className="ad-feed" aria-label="Advertisement gallery">
          {visibleAds.map((ad, index) => (
            <div className="ad-feed-item" key={`${ad.id}-${index}`}>
              <FakeAd ad={ad} />
              {index % 4 === 3 && <RealAd size={realAdSizes[Math.floor(index / 4) % realAdSizes.length]} />}
            </div>
          ))}
        </section>
        <section className="paradise-break" aria-label="Advertisement feed controls">
          <div><span>THE FEED</span><strong>{loading ? "LOADING..." : "NEVER ENDS."}</strong></div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button type="button" onClick={shuffleFeed}>SHUFFLE ADS</button>
            {visibleCount < ads.length && <button type="button" onClick={loadMore}>LOAD MORE</button>}
          </div>
        </section>
        <AdCard />
        <section className="stats">
          <div><strong>{ads.length.toLocaleString()}</strong><span>FAKE ADS AVAILABLE</span></div>
          <div><strong>∞</strong><span>SCROLLING REQUIRED</span></div>
          <div><strong>100%</strong><span>ADVERTISEMENT</span></div>
        </section>
        <footer><p>ADS PARADISE™</p><span>A completely unnecessary internet experience.</span></footer>
      </div>
    </main>
  );
}
