import ParadiseHeader from "./components/ParadiseHeader";
import AdCard from "./components/AdCard";
import FakeAd from "./components/FakeAd";
import AdCounter from "./components/AdCounter";
import NativeAd from "./components/ads/NativeAd";
import { fakeAds } from "./data/ads";

export default function Home() {
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

        {fakeAds.map((ad, index) => (
          <div key={ad.id}>
            <FakeAd ad={ad} />

            {(index + 1) % 5 === 0 &&
              index !== fakeAds.length - 1 && (
                <AdCard />
              )}
          </div>
        ))}

        <section className="stats">
          <div>
            <strong>{fakeAds.length}</strong>
            <span>FAKE ADS</span>
          </div>

          <div>
            <strong>∞</strong>
            <span>BAD DECISIONS</span>
          </div>

          <div>
            <strong>100%</strong>
            <span>ADVERTISEMENT</span>
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