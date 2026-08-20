"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import type { AdEffect, FakeAd as FakeAdData } from "../data/ads";

interface FakeAdProps {
  ad: FakeAdData;
}

type Experience = {
  effect: AdEffect;
  progress: number;
  value: number;
};

const effectMessages: Record<AdEffect, string> = {
  productivity: "PRODUCTIVITY INCREASED.",
  lottery: "MONEY HAS BEEN DETECTED.",
  pencil: "THE PENCIL IS NOW INVISIBLE.",
  ram: "RAM HAS BEEN DOWNLOADED.",
  cat: "YOUR CAT HAS BEEN NOTIFIED.",
  "nothing-subscription": "YOU ARE NOW SUBSCRIBED TO NOTHING.",
  "premium-air": "PREMIUM AIR ACTIVATED.",
  "zero-cost": "THE AD IS STILL FREE.",
  "ad-social": "THREE PEOPLE HAVE BEEN FOUND.",
  sleep: "SLEEP MODE: NOT AVAILABLE.",
  rock: "ROCK ACQUIRED.",
  "computer-scan": "YOUR COMPUTER REMAINS FINE.",
  celebrity: "CELEBRITY STATUS: ABSOLUTELY NOT.",
  "premium-nothing": "NOTHING HAS BEEN UPGRADED.",
  "stop-scroll": "SCROLLING HAS BEEN ENCOURAGED.",
  "internet-misses": "THE INTERNET MISSES YOU EVEN MORE.",
  rich: "YOUR BANK ACCOUNT IS STILL THE SAME.",
  "meta-ad": "YOU ARE NOW MORE AWARE OF ADS.",
  "second-internet": "SECOND INTERNET CONNECTED.",
  celebration: "ANOTHER AD HAS BEEN COMPLETED.",
  wifi: "PASSWORD: probably123",
  millionaire: "MILLIONAIRE STATUS: REJECTED.",
  chair: "INVISIBLE CHAIR DEPLOYED.",
  speed: "INTERNET SPEED: QUESTIONABLE.",
  mouse: "MOUSE REST COMPLETED.",
  ai: "AI RESPONDED WITH NOTHING.",
  height: "HEIGHT REMAINS UNCHANGED.",
  pixel: "PIXEL SUCCESSFULLY CLAIMED.",
  unlock: "WEBSITE UNLOCKED.",
  secret: "SECRET DISCOVERED.",
  button: "BUTTON QUALITY: UNPRECEDENTED.",
  "free-nothing": "NOTHING HAS BEEN CLAIMED.",
  oxygen: "PREMIUM OXYGEN DETECTED.",
  busy: "BUSINESS MODE ACTIVATED.",
  ceo: "CEO STATUS ISSUED.",
  "weird-trick": "THE WEIRD TRICK WAS WEIRD.",
  surprise: "SURPRISE DELIVERED.",
  insurance: "YOU ARE NOW INSURED AGAINST NOTHING.",
  "guaranteed-nothing": "NOTHING HAS BEEN GUARANTEED.",
  rectangle: "RECTANGLE PURCHASE COMPLETE.",
  browser: "BROWSER FED SUCCESSFULLY.",
  reality: "REALITY UPDATE FAILED.",
  tabs: "MORE TABS: DEPLOYED.",
  "money-generator": "€0.00 GENERATED SUCCESSFULLY.",
  "premium-plus": "ADVERTISEMENT PREMIUM PLUS ACTIVATED.",
  "stop-ads": "ADS STOPPED FOR EXACTLY 0 SECONDS.",
  millionth: "YOU WERE NOT THE MILLIONTH VISITOR.",
  "download-internet": "THE INTERNET HAS BEEN DOWNLOADED.",
  "absolute-nothing": "NOTHING HAPPENED.",
  final: "THAT WAS THE FINAL ADVERTISEMENT. MAYBE.",
};

const effectColors: Record<AdEffect, string> = {
  productivity: "#00d084",
  lottery: "#ffd000",
  pencil: "#ffffff",
  ram: "#8b5cf6",
  cat: "#ff9f43",
  "nothing-subscription": "#c7c7c7",
  "premium-air": "#9ee7ff",
  "zero-cost": "#111111",
  "ad-social": "#ff5c8a",
  sleep: "#4c6fff",
  rock: "#9b8068",
  "computer-scan": "#40ff8c",
  celebrity: "#ff4ecd",
  "premium-nothing": "#d4af37",
  "stop-scroll": "#ff4a4a",
  "internet-misses": "#7c83fd",
  rich: "#48c774",
  "meta-ad": "#111111",
  "second-internet": "#00c2ff",
  celebration: "#ffef00",
  wifi: "#00aaff",
  millionaire: "#55d66b",
  chair: "#b59cff",
  speed: "#ff6b35",
  mouse: "#9aa7b8",
  ai: "#00f0ff",
  height: "#ff8acb",
  pixel: "#ff3b30",
  unlock: "#00ff66",
  secret: "#00ff66",
  button: "#ffef00",
  "free-nothing": "#f3f3f3",
  oxygen: "#a8ecff",
  busy: "#e0e0e0",
  ceo: "#b08d57",
  "weird-trick": "#ff4f81",
  surprise: "#ffef00",
  insurance: "#9bd7ff",
  "guaranteed-nothing": "#ffffff",
  rectangle: "#ff5a36",
  browser: "#baff6a",
  reality: "#ff58d2",
  tabs: "#63a4ff",
  "money-generator": "#64ff87",
  "premium-plus": "#d7b66c",
  "stop-ads": "#ff3030",
  millionth: "#ffd23f",
  "download-internet": "#8c7cff",
  "absolute-nothing": "#eeeeee",
  final: "#ffef00",
};

export default function FakeAd({ ad }: FakeAdProps) {
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);
  const [open, setOpen] = useState(false);
  const [experience, setExperience] =
    useState<Experience>({
      effect: ad.effect,
      progress: 0,
      value: 0,
    });

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          window.dispatchEvent(new Event("ad-seen"));
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const close = () => {
    setOpen(false);
    setExperience({
      effect: ad.effect,
      progress: 0,
      value: 0,
    });
  };

  const runProgress = (duration = 2200) => {
    setOpen(true);
    const started = Date.now();

    const timer = window.setInterval(() => {
      const elapsed = Date.now() - started;
      const progress = Math.min(
        Math.round((elapsed / duration) * 100),
        100
      );

      setExperience((current) => ({
        ...current,
        progress,
      }));

      if (progress >= 100) {
        window.clearInterval(timer);
      }
    }, 35);
  };

  const interact = () => {
    setOpen(true);

    if (
      ad.effect === "download-internet" ||
      ad.effect === "ram" ||
      ad.effect === "download-internet"
    ) {
      runProgress(2600);
      return;
    }

    if (
      ad.effect === "computer-scan" ||
      ad.effect === "speed"
    ) {
      runProgress(3000);
      return;
    }

    if (
      ad.effect === "celebration" ||
      ad.effect === "millionth" ||
      ad.effect === "lottery"
    ) {
      setExperience((current) => ({
        ...current,
        value: Math.floor(
          Math.random() * 9000000
        ) + 1000,
      }));
      return;
    }

    if (ad.effect === "counter") {
      setExperience((current) => ({
        ...current,
        value: current.value + 1,
      }));
    }
  };

  const renderExperience = () => {
    const accent = effectColors[ad.effect];

    switch (ad.effect) {
      case "productivity":
        return (
          <section
            className="xp-productivity"
            style={{ "--accent": accent } as CSSProperties}
          >
            <div className="xp-productivity-ring">
              <span>37%</span>
            </div>

            <p>PRODUCTIVITY BOOST</p>

            <h3>
              YOU ARE NOW
              <br />
              EXTREMELY PRODUCTIVE.
            </h3>

            <div className="xp-productivity-bars">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </section>
        );

      case "lottery":
        return (
          <section className="xp-lottery">
            <div className="xp-lottery-ticket">
              <span>VOID LOTTERY</span>
              <strong>
                €{experience.value.toLocaleString()}
              </strong>
              <small>PROBABLY YOURS</small>
            </div>

            <div className="xp-lottery-flare">
              ✦
            </div>
          </section>
        );

      case "pencil":
        return (
          <section className="xp-pencil">
            <div className="xp-pencil-page">
              <div className="xp-pencil-line" />
              <div className="xp-pencil-line" />
              <div className="xp-pencil-line" />
            </div>

            <div className="xp-pencil-cursor">
              ✎
            </div>

            <strong>
              THE PENCIL IS WORKING.
            </strong>
          </section>
        );

      case "ram":
        return (
          <section className="xp-ram">
            <div className="xp-ram-chip">
              RAM
              <strong>
                {experience.progress || 128} GB
              </strong>
            </div>

            <div className="xp-ram-meter">
              <span
                style={{
                  width: `${
                    experience.progress || 35
                  }%`,
                }}
              />
            </div>

            <small>
              MEMORY UPGRADE IN PROGRESS
            </small>
          </section>
        );

      case "cat":
        return (
          <section className="xp-cat">
            <div className="xp-cat-sky">
              <span>☁</span>
              <span>☁</span>
              <span>☁</span>
            </div>

            <div className="xp-cat-body">
              <div className="xp-cat-ears">
                ▲ ▲
              </div>

              <div className="xp-cat-face">
                =^.^=
              </div>

              <small>
                YOUR CAT HAS ACCEPTED.
              </small>
            </div>
          </section>
        );

      case "nothing-subscription":
        return (
          <section className="xp-subscribe">
            <div className="xp-mailbox">
              0
            </div>

            <h3>
              SUBSCRIBED.
            </h3>

            <p>
              Your inbox will now receive
              nothing.
            </p>

            <div className="xp-subscribe-wave" />
          </section>
        );

      case "premium-air":
        return (
          <section className="xp-air">
            <div className="xp-air-orbit">
              <span>O₂</span>
            </div>

            <strong>
              PREMIUM AIR
            </strong>

            <small>
              BOTTLED EMOTIONALLY
            </small>
          </section>
        );

      case "zero-cost":
        return (
          <section className="xp-free">
            <div className="xp-free-price">
              €0.00
            </div>

            <div className="xp-free-stamp">
              FREE
            </div>

            <p>
              THIS AD COST US NOTHING.
            </p>
          </section>
        );

      case "ad-social":
        return (
          <section className="xp-social">
            <div className="xp-avatar-stack">
              <span>●</span>
              <span>●</span>
              <span>●</span>
            </div>

            <h3>
              3 PEOPLE
              <br />
              ALSO LIKE ADS.
            </h3>

            <div className="xp-social-online">
              ● ONLINE
            </div>
          </section>
        );

      case "sleep":
        return (
          <section className="xp-sleep">
            <div className="xp-moon">
              ☾
            </div>

            <div className="xp-sleep-stars">
              · ✦ ·
            </div>

            <h3>
              GO TO SLEEP.
            </h3>

            <small>
              STOP LOOKING AT ADS.
            </small>
          </section>
        );

      case "rock":
        return (
          <section className="xp-rock">
            <div className="xp-rock-shadow" />

            <div className="xp-rock-object">
              ◆
            </div>

            <strong>
              ROCK ACQUIRED
            </strong>

            <small>
              €49.99
            </small>
          </section>
        );

      case "computer-scan":
        return (
          <section className="xp-scan">
            <div className="xp-scan-circle">
              {experience.progress}%
            </div>

            <div className="xp-scan-lines">
              <i />
              <i />
              <i />
              <i />
            </div>

            <strong>
              {experience.progress < 100
                ? "SCANNING"
                : "CLEAN"}
            </strong>
          </section>
        );

      case "celebrity":
        return (
          <section className="xp-celebrity">
            <div className="xp-star">
              ★
            </div>

            <div className="xp-paparazzi">
              FLASH FLASH FLASH
            </div>

            <h3>
              YOU ARE FAMOUS
            </h3>

            <small>
              FOR ABOUT 4 SECONDS
            </small>
          </section>
        );

      case "premium-nothing":
        return (
          <section className="xp-premium-nothing">
            <div className="xp-premium-seal">
              ✦
            </div>

            <span>
              PREMIUM
            </span>

            <h3>
              NOTHING™
            </h3>

            <small>
              NOW WITH LESS FEATURES
            </small>
          </section>
        );

      case "stop-scroll":
        return (
          <section className="xp-stop-scroll">
            <div className="xp-stop-wheel">
              ↓
            </div>

            <h3>
              KEEP SCROLLING.
            </h3>

            <p>
              WE HAVE CHANGED OUR MIND.
            </p>
          </section>
        );

      case "internet-misses":
        return (
          <section className="xp-misses">
            <div className="xp-misses-signal">
              ~ ~ ~
            </div>

            <h3>
              HELLO?
            </h3>

            <p>
              THE INTERNET MISSES YOU.
            </p>
          </section>
        );

      case "rich":
        return (
          <section className="xp-rich">
            <div className="xp-rich-number">
              €1,000,000
            </div>

            <div className="xp-rich-bar">
              <span />
            </div>

            <small>
              YOUR PROGRESS TOWARD RICH
            </small>
          </section>
        );

      case "meta-ad":
        return (
          <section className="xp-meta">
            <span>
              YOU ARE READING AN AD
            </span>

            <div>
              AD
              <b>AD</b>
              <b>AD</b>
            </div>

            <small>
              THIS IS AN AD ABOUT ADS.
            </small>
          </section>
        );

      case "second-internet":
        return (
          <section className="xp-second-internet">
            <div>
              INTERNET
            </div>

            <div className="xp-internet-plus">
              +
            </div>

            <div>
              INTERNET
            </div>

            <strong>
              TWO INTERNET CONNECTIONS.
            </strong>
          </section>
        );

      case "celebration":
        return (
          <section className="xp-celebrate">
            <div className="xp-celebrate-burst">
              ✦ ✦ ✦
            </div>

            <h3>
              CONGRATULATIONS!
            </h3>

            <p>
              YOU SAW ANOTHER AD.
            </p>
          </section>
        );

      case "wifi":
        return (
          <section className="xp-wifi">
            <div className="xp-wifi-rings">
              ))) 
            </div>

            <strong>
              WIFI FOUND
            </strong>

            <code>
              probably123
            </code>

            <small>
              SECURITY: LOL
            </small>
          </section>
        );

      case "millionaire":
        return (
          <section className="xp-millionaire">
            <div className="xp-calc">
              <div>999999 + 1</div>
              <strong>€1,000,000</strong>
            </div>

            <div className="xp-calc-light" />

            <small>
              RESULTS MAY BE EMOTIONALLY INACCURATE.
            </small>
          </section>
        );

      case "chair":
        return (
          <section className="xp-chair">
            <div className="xp-chair-ghost">
              ┌────┐
              <br />
              │    │
              <br />
              └────┘
            </div>

            <strong>
              CHAIR DEPLOYED
            </strong>

            <small>
              PLEASE SIT CAREFULLY.
            </small>
          </section>
        );

      case "speed":
        return (
          <section className="xp-speed">
            <div className="xp-speedometer">
              {experience.progress}%
            </div>

            <div className="xp-speed-wave">
              ~~~~~~~
            </div>

            <strong>
              INTERNET SPEED TEST
            </strong>
          </section>
        );

      case "mouse":
        return (
          <section className="xp-mouse">
            <div className="xp-mouse-object">
              🖱
            </div>

            <div className="xp-mouse-bed">
              Z Z Z
            </div>

            <small>
              MOUSE IS RESTING.
            </small>
          </section>
        );

      case "ai":
        return (
          <section className="xp-ai">
            <div className="xp-ai-brain">
              AI
            </div>

            <div className="xp-ai-chat">
              <span>
                WHAT SHOULD I DO?
              </span>

              <b>
                NOTHING.
              </b>
            </div>
          </section>
        );

      case "height":
        return (
          <section className="xp-height">
            <div className="xp-ruler">
              <span>0</span>
              <i />
              <span>12%</span>
              <i />
              <span>100%</span>
            </div>

            <div className="xp-height-person">
              ●
              <br />
              ╱│╲
              <br />
              ╱ ╲
            </div>

            <strong>
              HEIGHT: IDENTICAL
            </strong>
          </section>
        );

      case "pixel":
        return (
          <section className="xp-pixel">
            <div className="xp-single-pixel" />

            <span>
              YOUR PIXEL
            </span>

            <small>
              1 × 1
            </small>
          </section>
        );

      case "unlock":
        return (
          <section className="xp-unlock">
            <div className="xp-lock">
              🔓
            </div>

            <div className="xp-unlock-line">
              ACCESS RESTORED
            </div>

            <small>
              THE WEBSITE WAS NEVER LOCKED.
            </small>
          </section>
        );

      case "secret":
        return (
          <section className="xp-secret">
            <div className="xp-secret-terminal">
              {"> ACCESSING..."}
              <br />
              {"> BYPASSING..."}
              <br />
              {"> SUCCESS."}
            </div>

            <h3>
              YOU SHOULD NOT BE HERE.
            </h3>

            <span>
              THERE IS NOTHING SECRET.
            </span>
          </section>
        );

      case "button":
        return (
          <section className="xp-button">
            <button
              type="button"
              onClick={() => setExperience((c) => ({
                ...c,
                value: c.value + 1,
              }))}
            >
              {experience.value
                ? `YOU CLICKED IT ${experience.value} TIME${
                    experience.value === 1 ? "" : "S"
                  }`
                : "BEST BUTTON"}
            </button>

            <small>
              KEEP PRESSING.
            </small>
          </section>
        );

      case "free-nothing":
        return (
          <section className="xp-free-nothing">
            <div className="xp-empty-box" />

            <h3>
              NOTHING CLAIMED.
            </h3>

            <small>
              IT'S YOURS NOW.
            </small>
          </section>
        );

      case "oxygen":
        return (
          <section className="xp-oxygen">
            <div className="xp-oxygen-bubble">
              O₂
            </div>

            <div className="xp-oxygen-ripples" />

            <strong>
              PREMIUM OXYGEN
            </strong>
          </section>
        );

      case "busy":
        return (
          <section className="xp-busy">
            <div className="xp-busy-terminal">
              <span>
                STATUS: BUSY
              </span>
              <span>
                MEETING: YES
              </span>
              <span>
                PRODUCTIVITY: 3%
              </span>
              <span>
                ADS: 97%
              </span>
            </div>

            <strong>
              YOU LOOK VERY BUSY.
            </strong>
          </section>
        );

      case "ceo":
        return (
          <section className="xp-ceo">
            <div className="xp-ceo-card">
              <small>
                OFFICIAL-ISH
              </small>

              <strong>
                CHIEF EXECUTIVE
              </strong>

              <span>
                ADS PARADISE
              </span>
            </div>

            <div className="xp-ceo-stamp">
              CEO
            </div>
          </section>
        );

      case "weird-trick":
        return (
          <section className="xp-weird">
            <div className="xp-weird-circle">
              ?
            </div>

            <div className="xp-weird-text">
              SCIENTISTS HATE THIS.
            </div>

            <small>
              THE TRICK IS THAT THERE IS NO TRICK.
            </small>
          </section>
        );

      case "surprise":
        return (
          <section className="xp-surprise">
            <div className="xp-surprise-star">
              ★
            </div>

            <h3>
              SURPRISE.
            </h3>

            <p>
              WE TOLD YOU WE HAD NO IDEA.
            </p>
          </section>
        );

      case "insurance":
        return (
          <section className="xp-insurance">
            <div className="xp-shield">
              ◇
            </div>

            <strong>
              YOU ARE SAFE.
            </strong>

            <small>
              FROM ABSOLUTELY NOTHING.
            </small>
          </section>
        );

      case "guaranteed-nothing":
        return (
          <section className="xp-guarantee">
            <div className="xp-check">
              ✓
            </div>

            <h3>
              GUARANTEED.
            </h3>

            <small>
              GUARANTEED NOTHING.
            </small>
          </section>
        );

      case "rectangle":
        return (
          <section className="xp-rectangle">
            <div className="xp-rectangle-object" />

            <strong>
              YOU NOW OWN A RECTANGLE.
            </strong>

            <small>
              PLEASE ENJOY RESPONSIBLY.
            </small>
          </section>
        );

      case "browser":
        return (
          <section className="xp-browser">
            <div className="xp-browser-mouth">
              ◡
            </div>

            <div className="xp-browser-food">
              AD
            </div>

            <strong>
              NOM.
            </strong>

            <small>
              BROWSER SATISFIED.
            </small>
          </section>
        );

      case "reality":
        return (
          <section className="xp-reality">
            <div className="xp-reality-grid">
              <span />
              <span />
              <span />
              <span />
            </div>

            <h3>
              REALITY 2.0
            </h3>

            <small>
              UPDATE FAILED.
            </small>
          </section>
        );

      case "tabs":
        return (
          <section className="xp-tabs">
            <div className="xp-tab-stack">
              <span>TAB 1</span>
              <span>TAB 2</span>
              <span>TAB 3</span>
              <span>TAB 4</span>
              <span>+ ∞</span>
            </div>

            <strong>
              MORE TABS.
            </strong>
          </section>
        );

      case "money-generator":
        return (
          <section className="xp-money-generator">
            <div className="xp-money-counter">
              €0.00
            </div>

            <div className="xp-money-wheel">
              ↻
            </div>

            <small>
              GENERATING WEALTH...
            </small>
          </section>
        );

      case "premium-plus":
        return (
          <section className="xp-premium-plus">
            <div className="xp-plus-stars">
              ✦ ✦ ✦
            </div>

            <span>
              ADVERTISEMENT
            </span>

            <h3>
              PREMIUM PLUS
            </h3>

            <small>
              MORE ADVERTISEMENT THAN EVER.
            </small>
          </section>
        );

      case "stop-ads":
        return (
          <section className="xp-stop-ads">
            <div className="xp-stop-ads-message">
              ADS STOPPED
            </div>

            <div className="xp-stop-ads-timer">
              0.00s
            </div>

            <small>
              THAT WAS QUICK.
            </small>
          </section>
        );

      case "millionth":
        return (
          <section className="xp-millionth">
            <div className="xp-millionth-number">
              #1,000,000
            </div>

            <div className="xp-millionth-lights">
              ✦ ✦ ✦ ✦ ✦
            </div>

            <h3>
              YOU DEFINITELY WON.
            </h3>
          </section>
        );

      case "download-internet":
        return (
          <section className="xp-download-internet">
            <div className="xp-internet-download">
              {experience.progress}%
            </div>

            <div className="xp-download-world">
              ◉
            </div>

            <small>
              DOWNLOADING THE INTERNET...
            </small>
          </section>
        );

      case "absolute-nothing":
        return (
          <section className="xp-absolute-nothing">
            <div className="xp-nothing-pulse" />

            <span>
              NOTHING
            </span>

            <small>
              NOTHING HAS HAPPENED.
            </small>
          </section>
        );

      case "final":
        return (
          <section className="xp-final">
            <div className="xp-final-curtain">
              <span>
                THE END?
              </span>
            </div>

            <h3>
              THERE IS ALWAYS
              <br />
              ANOTHER AD.
            </h3>

            <small>
              THANK YOU FOR YOUR ATTENTION.
            </small>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <article
        ref={ref}
        className={`fake-ad fake-ad-${ad.size}`}
        data-effect={ad.effect}
      >
        <div className="ad-label">
          ADVERTISEMENT
        </div>

        <div className="fake-ad-content">
          <div className="fake-ad-main">
            <h2>{ad.title}</h2>

            <p>{ad.description}</p>

            <button
              type="button"
              onClick={interact}
            >
              {ad.button}
            </button>
          </div>

          <div className="fake-ad-interaction-preview">
            <span>INTERACTIVE</span>
            <small>
              CLICK TO EXPERIENCE
            </small>
          </div>
        </div>

        <div className="fake-ad-footer">
          Sponsored by absolutely nobody.
        </div>
      </article>

      {open && (
        <div
          className={`fake-ad-experience fake-ad-experience-${ad.effect}`}
          onClick={close}
        >
          <div
            className="fake-ad-experience-inner"
            onClick={(event) => event.stopPropagation()}
            style={{
              "--experience-accent":
                effectColors[ad.effect],
            } as CSSProperties}
          >
            <button
              type="button"
              className="fake-ad-experience-close"
              onClick={close}
            >
              ×
            </button>

            <span className="fake-ad-experience-label">
              {ad.title}
            </span>

            {renderExperience()}

            <p className="fake-ad-experience-result">
              {experience.progress >= 100
                ? effectMessages[ad.effect]
                : effectMessages[ad.effect]}
            </p>
          </div>
        </div>
      )}
    </>
  );
}