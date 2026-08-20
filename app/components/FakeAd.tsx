"use client";

import { useEffect, useRef, useState } from "react";

interface FakeAdProps {
  title: string;
  description: string;
  button: string;
  action?: string;
  onNext?: () => void;
}

type OverlayType =
  | "modal"
  | "purchase"
  | "download"
  | "scan"
  | "loading"
  | "secret"
  | "surprise"
  | null;

export default function FakeAd({
  title,
  description,
  button,
  action,
  onNext,
}: FakeAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  const [overlay, setOverlay] = useState<OverlayType>(null);
  const [progress, setProgress] = useState(0);
  const [reward, setReward] = useState<number | null>(null);
  const [counter, setCounter] = useState(0);
  const [shake, setShake] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  useEffect(() => {
    const element = adRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          window.dispatchEvent(new Event("ad-seen"));
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const nextAd = () => {
    if (onNext) {
      onNext();
    }
  };

  const closeOverlay = () => {
    setOverlay(null);
    setProgress(0);
    setDownloadComplete(false);
    setGlitch(false);

    nextAd();
  };

  const runConfetti = () => {
    setConfetti(true);

    window.setTimeout(() => {
      setConfetti(false);
      nextAd();
    }, 2200);
  };

  const runShake = () => {
    setShake(true);

    window.setTimeout(() => {
      setShake(false);
    }, 700);
  };

  const runProgress = (
    type: OverlayType,
    duration: number
  ) => {
    setOverlay(type);
    setProgress(0);

    const start = Date.now();

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - start;

      const value = Math.min(
        Math.round((elapsed / duration) * 100),
        100
      );

      setProgress(value);

      if (value >= 100) {
        window.clearInterval(interval);

        if (type === "download") {
          setDownloadComplete(true);
        }

        if (type === "scan") {
          window.setTimeout(() => {
            nextAd();
          }, 1500);
        }

        if (type === "loading") {
          window.setTimeout(() => {
            nextAd();
          }, 800);
        }
      }
    }, 50);
  };

  const handleClick = () => {
    switch (action) {
      case "modal":
        setOverlay("modal");
        break;

      case "prize":
        setReward(
          Math.floor(Math.random() * 9000000) + 100000
        );

        setConfetti(true);

        window.setTimeout(() => {
          setConfetti(false);
          setReward(null);
          nextAd();
        }, 2500);

        break;

      case "purchase":
        setOverlay("purchase");
        break;

      case "download":
        runProgress("download", 2400);
        break;

      case "counter":
        setCounter((value) => value + 1);

        window.setTimeout(() => {
          nextAd();
        }, 900);

        break;

      case "scroll":
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });

        window.setTimeout(() => {
          nextAd();
        }, 1000);

        break;

      case "confetti":
        runConfetti();
        break;

      case "scan":
        runProgress("scan", 3000);
        break;

      case "loading":
        runProgress("loading", 4000);
        break;

      case "secret":
        setOverlay("secret");
        setGlitch(true);
        runShake();

        break;

      case "surprise":
        setOverlay("surprise");
        setConfetti(true);
        runShake();

        break;

      case "nothing":
        setShake(true);

        window.setTimeout(() => {
          setShake(false);
          nextAd();
        }, 700);

        break;

      default:
        nextAd();
        break;
    }
  };

  return (
    <>
      <div
        ref={adRef}
        className={`fake-ad ${
          shake ? "fake-ad-shake" : ""
        }`}
      >
        <div className="ad-label">
          ADVERTISEMENT
        </div>

        <div className="fake-ad-content">
          <h2>{title}</h2>

          <p>{description}</p>

          <button
            type="button"
            onClick={handleClick}
          >
            {button}
          </button>

          {counter > 0 && (
            <div className="fake-ad-counter-result">
              CLICK COUNT: {counter}
            </div>
          )}
        </div>

        <div className="fake-ad-footer">
          Sponsored by absolutely nobody
        </div>

        {reward !== null && (
          <div className="fake-ad-reward">
            <span>YOU WON</span>

            <strong>
              €{reward.toLocaleString()}
            </strong>

            <small>probably</small>
          </div>
        )}
      </div>

      {overlay === "modal" && (
        <div className="fake-ad-overlay">
          <div className="fake-ad-popup fake-ad-popup-normal">
            <button
              type="button"
              className="popup-close"
              onClick={closeOverlay}
            >
              ×
            </button>

            <div className="popup-icon">
              ?
            </div>

            <span className="popup-label">
              IMPORTANT ADVERTISEMENT
            </span>

            <h3>
              You found something.
            </h3>

            <p>
              Unfortunately, we have no idea what
              you found.
            </p>

            <button
              type="button"
              onClick={closeOverlay}
            >
              CONTINUE
            </button>
          </div>
        </div>
      )}

      {overlay === "purchase" && (
        <div className="fake-ad-overlay">
          <div className="fake-ad-popup fake-ad-popup-shop">
            <button
              type="button"
              className="popup-close"
              onClick={closeOverlay}
            >
              ×
            </button>

            <div className="shop-product">
              <div className="shop-product-image">
                ✦
              </div>

              <div>
                <span>
                  PREMIUM PRODUCT
                </span>

                <h3>
                  Absolutely Nothing™
                </h3>

                <strong>
                  €999.99
                </strong>
              </div>
            </div>

            <div className="shop-cart">
              <span>
                ADDING TO CART...
              </span>

              <div className="shop-cart-bar">
                <div />
              </div>
            </div>

            <p>
              Your invisible product has been
              successfully added to your invisible
              shopping cart.
            </p>

            <button
              type="button"
              onClick={closeOverlay}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      )}

      {overlay === "download" && (
        <div className="fake-ad-overlay">
          <div className="fake-ad-popup fake-ad-popup-download">
            <div className="download-icon">
              ↓
            </div>

            {!downloadComplete ? (
              <>
                <span>
                  DOWNLOADING
                </span>

                <h3>
                  TotallyUsefulFile.exe
                </h3>

                <div className="download-progress">
                  <div
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <strong>
                  {progress}%
                </strong>

                <small>
                  Please do not turn off your
                  computer.
                </small>
              </>
            ) : (
              <>
                <span>
                  DOWNLOAD COMPLETE
                </span>

                <h3>
                  Nothing downloaded.
                </h3>

                <button
                  type="button"
                  onClick={closeOverlay}
                >
                  ACCEPT MY FATE
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {overlay === "scan" && (
        <div className="fake-ad-overlay">
          <div className="fake-ad-popup fake-ad-popup-scan">
            <div className="scan-circle">
              <div />

              <span>
                {progress}%
              </span>
            </div>

            <span>
              SYSTEM SCAN
            </span>

            <h3>
              {progress < 100
                ? "Scanning your computer..."
                : "Scan complete."}
            </h3>

            <div className="scan-lines">
              <span />
              <span />
              <span />
            </div>

            {progress >= 100 && (
              <p>
                No threats found.
                <br />
                No useful information found either.
              </p>
            )}
          </div>
        </div>
      )}

      {overlay === "loading" && (
        <div className="fake-ad-overlay">
          <div className="fake-ad-popup fake-ad-popup-loading">
            <div className="loading-spinner" />

            <span>
              PLEASE WAIT
            </span>

            <h3>
              Doing something important...
            </h3>

            <div className="loading-dots">
              <i />
              <i />
              <i />
            </div>

            <div className="loading-progress">
              <div
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <small>
              {progress}% complete
            </small>
          </div>
        </div>
      )}

      {overlay === "secret" && (
        <div
          className={`fake-ad-overlay fake-ad-secret ${
            glitch ? "fake-ad-glitch" : ""
          }`}
        >
          <div className="secret-screen">
            <div className="secret-symbol">
              ◉
            </div>

            <span>
              SYSTEM MESSAGE
            </span>

            <h2>
              ACCESS GRANTED
            </h2>

            <p>
              You weren't supposed to click that.
            </p>

            <div className="secret-code">
              01010111 01001000 01011001
            </div>

            <button
              type="button"
              onClick={closeOverlay}
            >
              LEAVE SECRET AREA
            </button>
          </div>
        </div>
      )}

      {overlay === "surprise" && (
        <div className="fake-ad-overlay fake-ad-surprise">
          <div className="surprise-screen">
            <div className="surprise-burst">
              ✦
            </div>

            <span>
              CONGRATULATIONS
            </span>

            <h2>
              SURPRISE!
            </h2>

            <p>
              There is absolutely no prize.
            </p>

            <button
              type="button"
              onClick={closeOverlay}
            >
              I AM DISAPPOINTED
            </button>
          </div>
        </div>
      )}

      {confetti && (
        <div
          className="fake-ad-confetti"
          aria-hidden="true"
        >
          {Array.from({ length: 80 }).map(
            (_, index) => (
              <span
                key={index}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${
                    Math.random() * 0.8
                  }s`,
                }}
              >
                {
                  ["✦", "◆", "●", "★", "■"][
                    index % 5
                  ]
                }
              </span>
            )
          )}
        </div>
      )}
    </>
  );
}