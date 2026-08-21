import Link from "next/link";

export default function ParadiseHeader() {
  return (
    <header className="header">
      <Link href="/" className="logo" aria-label="Ads Paradise home">
        ADS <span>PARADISE</span>
      </Link>

      <nav className="header-nav" aria-label="Main navigation">
        <Link href="/global-counter" className="global-counter-link">
          GLOBAL COUNTER <span>↗</span>
        </Link>
        <div className="header-subtitle">THE INTERNET'S MOST AD-FILLED DESTINATION</div>
      </nav>
    </header>
  );
}
