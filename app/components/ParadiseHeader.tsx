import Link from "next/link";

export default function ParadiseHeader() {
  return (
    <header className="header">
      <div className="logo">
        ADS <span>PARADISE</span>
      </div>

      <div className="header-subtitle">
        THE INTERNET'S MOST AD-FILLED DESTINATION
      </div>

      <Link href="/global-counter" className="global-counter-link">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5m0 14h16M7 16l3-4 3 2 5-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        GLOBAL COUNTER
        <span>↗</span>
      </Link>
    </header>
  );
}
