"use client";

import { useState } from "react";

import ParadiseHeader from "./components/ParadiseHeader";
import AdCard from "./components/AdCard";
import FakeAd from "./components/FakeAd";
import AdCounter from "./components/AdCounter";
import NativeAd from "./components/ads/NativeAd";
import RealAd from "./components/ads/RealAd";
import { fakeAds } from "./data/ads";

export default function Home() {
  const [currentAd, setCurrentAd] = useState(0);

  const nextFakeAd = () => {
    setCurrentAd(
      (current) =>
        (current + 1) % fakeAds.length
    );
  };

  const getAd = (offset: number) => {
    return fakeAds[
      (currentAd + offset) %
        fakeAds.length
    ];
  };

  return (
    <main>
      <AdCounter />

      <ParadiseHeader />

      <div className="container">
        <section className="hero">
          <p className="eyebrow">
            WELCOME TO THE PARADISE
          </p>

          <h1>
            You came for the internet.
            <br />
            We gave you ads.
          </h1>

          <p className="hero-description">
            Ads Paradise is a completely unnecessary
            website dedicated to the beautiful art of
            advertising.
          </p>
        </section>

        <NativeAd />

        <FakeAd ad={getAd(0)} />

        <RealAd size="728x90" />

        <FakeAd ad={getAd(1)} />

        <RealAd size="300x250" />

        <FakeAd ad={getAd(2)} />

        <RealAd size="468x60" />

        <FakeAd ad={getAd(3)} />

        <RealAd size="320x50" />

        <FakeAd ad={getAd(4)} />

        <AdCard />

        <FakeAd ad={getAd(5)} />

        <section className="stats">
          <div>
            <strong>
              {fakeAds.length}
            </strong>

            <span>
              FAKE ADS AVAILABLE
            </span>
          </div>

          <div>
            <strong>0</strong>

            <span>
              REASONS TO BE HERE
            </span>
          </div>

          <div>
            <strong>100%</strong>

            <span>
              ADVERTISEMENT
            </span>
          </div>
        </section>

        <footer>
          <p>ADS PARADISE™</p>

          <span>
            A completely unnecessary internet
            experience.
          </span>
        </footer>
      </div>
    </main>
  );
}