"use client";

import { useEffect, useState } from "react";

type Achievement = { id: string; icon: string; title: string; description: string };

const ACHIEVEMENTS: Achievement[] = [
  { id: "first-ad", icon: "01", title: "FIRST IMPRESSION", description: "You looked at an advertisement. Congratulations." },
  { id: "ten-ads", icon: "10", title: "ADDICTED", description: "You have seen 10 ads. There is no going back." },
  { id: "twenty-five-ads", icon: "25", title: "NO, SERIOUSLY", description: "25 advertisements have entered your brain." },
  { id: "fifty-ads", icon: "50", title: "AD SURVIVOR", description: "You survived 50 fake advertisements." },
  { id: "hundred-ads", icon: "100", title: "PARADISE RESIDENT", description: "100 ads seen. You practically live here now." },
  { id: "shuffler", icon: "↻", title: "CHAOS AGENT", description: "You shuffled the feed. Embrace the randomness." },
  { id: "more", icon: "+", title: "MORE PLEASE", description: "You asked for more ads. We are concerned." },
];

const STORAGE_KEY = "ads-paradise-achievements-v1";
const SEEN_KEY = "ads-paradise-seen-count-v1";

function loadUnlocked(): string[] {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : [];
  } catch { return []; }
}

export default function Achievements() {
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [seen, setSeen] = useState(0);
  const [toast, setToast] = useState<Achievement | null>(null);

  useEffect(() => {
    const storedSeen = Number(window.localStorage.getItem(SEEN_KEY) || "0");
    setSeen(Number.isFinite(storedSeen) ? storedSeen : 0);
    setUnlocked(loadUnlocked());

    const unlock = (id: string) => {
      setUnlocked((current) => {
        if (current.includes(id)) return current;
        const next = [...current, id];
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        const achievement = ACHIEVEMENTS.find((item) => item.id === id);
        if (achievement) {
          setToast(achievement);
          window.setTimeout(() => setToast(null), 3600);
        }
        return next;
      });
    };

    const onSeen = () => setSeen((current) => {
      const next = current + 1;
      window.localStorage.setItem(SEEN_KEY, String(next));
      if (next >= 1) unlock("first-ad");
      if (next >= 10) unlock("ten-ads");
      if (next >= 25) unlock("twenty-five-ads");
      if (next >= 50) unlock("fifty-ads");
      if (next >= 100) unlock("hundred-ads");
      return next;
    });

    const onAction = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail === "shuffle") unlock("shuffler");
      if (detail === "load-more") unlock("more");
    };

    window.addEventListener("ad-seen", onSeen);
    window.addEventListener("achievement-action", onAction);
    return () => {
      window.removeEventListener("ad-seen", onSeen);
      window.removeEventListener("achievement-action", onAction);
    };
  }, []);

  return (
    <>
      <div className="achievement-badge" aria-label={`${unlocked.length} of ${ACHIEVEMENTS.length} achievements unlocked`}>
        <span>🏆</span>
        <strong>{unlocked.length}/{ACHIEVEMENTS.length}</strong>
      </div>

      <div className="achievement-progress" aria-label="Achievement progress">
        {seen} ads seen · {unlocked.length}/{ACHIEVEMENTS.length} achievements
      </div>

      {toast && (
        <div className="achievement-toast" role="status">
          <div className="achievement-toast-icon">{toast.icon}</div>
          <div>
            <small>ACHIEVEMENT UNLOCKED</small>
            <strong>{toast.title}</strong>
            <span>{toast.description}</span>
          </div>
        </div>
      )}

      <style jsx>{`
        .achievement-badge { position: fixed; right: 18px; bottom: 18px; z-index: 9000; display: flex; align-items: center; gap: 8px; border: 2px solid #111; background: #ffef00; color: #111; padding: 10px 13px; box-shadow: 5px 5px 0 #111; font-weight: 900; }
        .achievement-badge span { font-size: 18px; }
        .achievement-progress { position: fixed; left: 18px; bottom: 18px; z-index: 9000; background: #111; color: white; padding: 8px 11px; font: 700 10px/1.2 monospace; letter-spacing: .06em; }
        .achievement-toast { position: fixed; right: 18px; top: 18px; z-index: 10000; width: min(390px, calc(100vw - 36px)); display: flex; gap: 14px; padding: 15px; border: 3px solid #111; background: white; color: #111; box-shadow: 8px 8px 0 #111; animation: achievementIn .35s cubic-bezier(.16,1,.3,1); }
        .achievement-toast-icon { width: 52px; height: 52px; flex: 0 0 52px; display: grid; place-items: center; background: #ffef00; border: 2px solid #111; font-weight: 900; font-family: monospace; }
        .achievement-toast small, .achievement-toast strong, .achievement-toast span { display: block; }
        .achievement-toast small { font: 800 9px monospace; letter-spacing: .12em; opacity: .55; }
        .achievement-toast strong { margin: 4px 0; font-size: 20px; }
        .achievement-toast span { font-size: 12px; line-height: 1.35; color: #555; }
        @keyframes achievementIn { from { opacity: 0; transform: translateY(-15px) scale(.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @media (max-width: 600px) { .achievement-progress { left: 10px; bottom: 10px; font-size: 8px; } .achievement-badge { right: 10px; bottom: 10px; padding: 8px 10px; } }
      `}</style>
    </>
  );
}
