"use client";

import { useMemo, useState } from "react";

import ParadiseHeader from "./components/ParadiseHeader";
import AdCard from "./components/AdCard";
import FakeAd from "./components/FakeAd";
import AdCounter from "./components/AdCounter";
import NativeAd from "./components/ads/NativeAd";
import RealAd from "./components/ads/RealAd";
import { fakeAds } from "./data/ads";

const realAdSizes = ["728x90", "300x250", "468x60", "320x50"] as const;

export default function Home() {
  const [currentAd, setCurrentAd] = useState(0);

  const visibleAds = useMemo(
    () => Array.from({ length: 12 }, (_, index) => fakeAds[(currentAd + index) % fakeAds.length]),
    [currentAd],
  );

  const nextFakeAd = () => {
    setCurrentAd((current) => (current + 1) % fakeAds.length);
  };

  return (
    <main>
      <AdCounter />
      <ParadiseHeader />

      <div className="container">
        <section className="hero">
          <p className="eyebrow">WELCOME TO THE PARADISE</p>
          <h1>
            You came for the internet.
            <br />
            We gave you ads.
          </h1>
          <p className="hero-description">
            Ads Paradise is a completely unnecessary website dedicated to the beautiful art of advertising.
          </p>
          <div className="hero-meta" aria-hidden="true">
            <span>50+ FAKE ADS</span>
            <span>REAL ADS</span>
            <span>ZERO PURPOSE</span>
          </div>
        </section>

        <NativeAd />

        <section className="ad-feed" aria-label="Advertisement gallery">
          {visibleAds.map((ad, index) => (
            <div className="ad-feed-item" key={`${ad.id}-${index}`}>
              <FakeAd ad={ad} />

              {index % 3 === 2 && (
                <RealAd size={realAdSizes[Math.floor(index / 3) % realAdSizes.length]} />
              )}
            </div>
          ))}
        </section>

        <section className="paradise-break" aria-label="Advertisement statistics">
          <div>
            <span>THE FEED</span>
            <strong>NEVER ENDS.</strong>
          </div>
          <button type="button" onClick={nextFakeAd}>
            SHUFFLE ADS
          </button>
        </section>

        <AdCard />

        <section className="stats">
          <div>
            <strong>{fakeAds.length}</strong>
            <span>FAKE ADS AVAILABLE</span>
          </div>
          <div>
            <strong>∞</strong>
            <span>SCROLLING REQUIRED</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>ADVERTISEMENT</span>
          </div>
        </section>

        <footer>
          <p>ADS PARADISE™</p>
          <span>A completely unnecessary internet experience.</span>
        </footer>
      </div>
    </main>
  );
}
