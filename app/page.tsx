import ParadiseHeader from "./components/ParadiseHeader";
import AdCard from "./components/AdCard";
import FakeAd from "./components/FakeAd";
import AdCounter from "./components/AdCounter";
import NativeAd from "./components/ads/NativeAd";

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
            Ads Paradise is a completely unnecessary website
            dedicated to the beautiful art of advertising.
          </p>
        </section>


        {/* NATIVE AD */}

        <NativeAd />


        {/* FAKE AD */}

        <FakeAd
          title="BECOME 37% MORE PRODUCTIVE"
          description="Our revolutionary productivity system does absolutely nothing."
          button="LEARN MORE"
        />


        {/* ADVERTISEMENT */}

        <AdCard />


        {/* FAKE AD */}

        <FakeAd
          title="YOU HAVE WON €4,827,391"
          description="Congratulations! You probably haven't, but it's worth checking."
          button="CLAIM NOW"
        />


        {/* ADVERTISEMENT */}

        <AdCard />


        {/* FAKE AD */}

        <FakeAd
          title="BUY INVISIBLE PENCILS"
          description="Write things without anyone knowing you're writing."
          button="SHOP NOW"
        />


        {/* ADVERTISEMENT */}

        <AdCard />


        {/* STATS */}

        <section className="stats">

          <div>
            <strong>∞</strong>
            <span>ADS AVAILABLE</span>
          </div>

          <div>
            <strong>0</strong>
            <span>REASONS TO BE HERE</span>
          </div>

          <div>
            <strong>100%</strong>
            <span>ADVERTISEMENT</span>
          </div>

        </section>


        {/* FOOTER */}

        <footer>

          <p>
            ADS PARADISE™
          </p>

          <span>
            A completely unnecessary internet experience.
          </span>

        </footer>

      </div>

    </main>
  );
}