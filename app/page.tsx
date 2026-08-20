"use client";

import { useState } from "react";

import ParadiseHeader from "./components/ParadiseHeader";
import AdCard from "./components/AdCard";
import FakeAd from "./components/FakeAd";
import AdCounter from "./components/AdCounter";
import NativeAd from "./components/ads/NativeAd";
import { fakeAds } from "./data/ads";

export default function Home() {
  const [currentAd, setCurrentAd] = useState(0);

  const nextFakeAd = () => {
    setCurrentAd((current) => {
      return (current + 1) % fakeAds.length;
    });
  };

  const getAd = (offset: number) => {
    return fakeAds[
      (currentAd + offset) % fakeAds.length
    ];
  };

  const ad1 = getAd(0);
  const ad2 = getAd(1);
  const ad3 = getAd(2);
  const ad4 = getAd(3);

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

        <FakeAd
          title={ad1.title}
          description={ad1.description}
          button={ad1.button}
          action={ad1.action}
          onNext={nextFakeAd}
        />

        <AdCard />

        <FakeAd
          title={ad2.title}
          description={ad2.description}
          button={ad2.button}
          action={ad2.action}
          onNext={nextFakeAd}
        />

        <AdCard />

        <FakeAd
          title={ad3.title}
          description={ad3.description}
          button={ad3.button}
          action={ad3.action}
          onNext={nextFakeAd}
        />

        <AdCard />

        <FakeAd
          title={ad4.title}
          description={ad4.description}
          button={ad4.button}
          action={ad4.action}
          onNext={nextFakeAd}
        />

        <AdCard />

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
            <strong>
              0
            </strong>

            <span>
              REASONS TO BE HERE
            </span>
          </div>

          <div>
            <strong>
              100%
            </strong>

            <span>
              ADVERTISEMENT
            </span>
          </div>
        </section>

        <footer>
          <p>
            ADS PARADISE™
          </p>

          <span>
            A completely unnecessary internet
            experience.
          </span>
        </footer>
      </div>
    </main>
  );
}