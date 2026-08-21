"use client";

import { useEffect, useState } from "react";

type Achievement = { id: string; icon: string; title: string; description: string };

const ACHIEVEMENTS: Achievement[] = [
  { id: "first-ad", icon: "01", title: "FIRST IMPRESSION", description: "You looked at an advertisement. Congratulations." },
  { id: "ten-ads", icon: "10", title: "ADDICTED", description: "You have seen 10 ads. There is no going back." },
  { id: "twenty-five-ads", icon: "25", title: "NO, SERIOUSLY", description: "25 advertisements have entered your brain." },
  { id: "fifty-ads", icon: "50", title: "AD SURVIVOR", description: "You survived 50 fake advertisements." },
  { id: "hundred-ads", icon: "100", title: "PARADISE RESIDENT", description: "100 ads seen. You practically live here now." },
  { id: "two-hundred-ads", icon: "200", title: "LOCAL", description: "200 ads. At this point, you should have a key." },
  { id: "five-hundred-ads", icon: "500", title: "AD VETERAN", description: "500 advertisements survived. Respect." },
  { id: "thousand-ads", icon: "1K", title: "THE PROPHECY", description: "You saw 1,000 ads. You have become the advertisement." },
  { id: "two-thousand-ads", icon: "2K", title: "WHY", description: "2,000 ads. Nobody told you to stop?" },
  { id: "five-thousand-ads", icon: "5K", title: "TOUCH GRASS", description: "5,000 ads. Please consider going outside." },
  { id: "ten-thousand-ads", icon: "10K", title: "ADVERTISEMENT", description: "10,000 ads seen. You ARE Ads Paradise now." },
  { id: "shuffler", icon: "↻", title: "CHAOS AGENT", description: "You shuffled the feed. Embrace the randomness." },
  { id: "shuffle-five", icon: "5×", title: "CHAOS ENGINE", description: "You shuffled five times. You have chosen violence." },
  { id: "shuffle-twenty", icon: "20×", title: "RANDOMNESS", description: "Twenty shuffles. Surely the next one will be better." },
  { id: "more", icon: "+", title: "MORE PLEASE", description: "You asked for more ads. We are concerned." },
  { id: "more-five", icon: "+5", title: "INFINITE SUPPLY", description: "You asked for more five times. There are always more." },
  { id: "more-twenty", icon: "+20", title: "UNSATISFIABLE", description: "Twenty requests for more ads. We cannot help you." },
  { id: "rapid-fire", icon: "⚡", title: "RAPID FIRE", description: "You triggered several interactions in quick succession." },
  { id: "popup", icon: "!", title: "POP-UP VICTIM", description: "You opened one of our extremely necessary pop-ups." },
  { id: "popup-five", icon: "!!", title: "POP-UP COLLECTOR", description: "Five pop-ups later and you are still here." },
  { id: "download", icon: "↓", title: "DOWNLOADED NOTHING", description: "You interacted with a fake download. Good choice." },
  { id: "scan", icon: "⌁", title: "SCANNED", description: "You let a completely fake security scanner inspect you." },
  { id: "secret", icon: "?", title: "SUSPICIOUS", description: "You found something you probably weren't supposed to find." },
  { id: "secret-three", icon: "???", title: "DEEPER", description: "You discovered three secret interactions." },
  { id: "secret-ten", icon: "???", title: "ARCHAEOLOGIST", description: "Ten secrets discovered. You are digging through Ads Paradise." },
  { id: "long-session", icon: "∞", title: "STILL HERE", description: "You have spent a long time in Ads Paradise." },
  { id: "returning", icon: "↩", title: "WELCOME BACK", description: "You came back. We missed you. Probably." },
  { id: "night-owl", icon: "☾", title: "NIGHT OWL", description: "You visited Ads Paradise during the night." },
  { id: "early-bird", icon: "☀", title: "EARLY BIRD", description: "You visited Ads Paradise suspiciously early." },
  { id: "mobile", icon: "▯", title: "POCKET PARADISE", description: "You survived Ads Paradise on a phone." },
  { id: "desktop", icon: "▣", title: "BIG SCREEN", description: "You visited from a desktop-sized screen." },
  { id: "scroll", icon: "↓", title: "KEEP SCROLLING", description: "You scrolled deep into the endless advertisements." },
  { id: "bottom", icon: "⌄", title: "BOTTOM FEED", description: "You reached an extremely unnecessary part of the feed." },
  { id: "fast-scroller", icon: "»", title: "SPEED SCROLLER", description: "You flew through advertisements at suspicious speed." },
  { id: "ad-blocker", icon: "×", title: "BLOCKED", description: "An ad blocker appears to have entered the Paradise." },
  { id: "all-real", icon: "5", title: "REALITY CHECK", description: "You encountered the real advertisements." },
  { id: "ten-interactions", icon: "10", title: "BUTTON MASHER", description: "Ten interactive ad moments discovered." },
  { id: "twenty-five-interactions", icon: "25", title: "INTERACTION HOARDER", description: "25 interactive moments discovered." },
  { id: "fifty-interactions", icon: "50", title: "PARADISE MASTER", description: "You discovered all 50 planned interactions." },
  { id: "completionist", icon: "★", title: "COMPLETIONIST", description: "You unlocked every achievement available." },
];

const STORAGE_KEY = "ads-paradise-achievements-v2";
const SEEN_KEY = "ads-paradise-seen-count-v2";
const ACTION_KEY = "ads-paradise-action-counts-v2";

function loadJson<T>(key: string, fallback: T): T {
  try { const value = window.localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
}

export default function Achievements() {
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [seen, setSeen] = useState(0);
  const [toast, setToast] = useState<Achievement | null>(null);

  useEffect(() => {
    setSeen(Number(window.localStorage.getItem(SEEN_KEY) || "0"));
    setUnlocked(loadJson<string[]>(STORAGE_KEY, []));

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
      const milestones: [number, string][] = [[1,"first-ad"],[10,"ten-ads"],[25,"twenty-five-ads"],[50,"fifty-ads"],[100,"hundred-ads"],[200,"two-hundred-ads"],[500,"five-hundred-ads"],[1000,"thousand-ads"],[2000,"two-thousand-ads"],[5000,"five-thousand-ads"],[10000,"ten-thousand-ads"]];
      milestones.forEach(([n, id]) => { if (next >= n) unlock(id); });
      return next;
    });

    const onAction = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      const counts = loadJson<Record<string, number>>(ACTION_KEY, {});
      counts[detail] = (counts[detail] || 0) + 1;
      window.localStorage.setItem(ACTION_KEY, JSON.stringify(counts));
      if (detail === "shuffle") { unlock("shuffler"); if (counts.shuffle >= 5) unlock("shuffle-five"); if (counts.shuffle >= 20) unlock("shuffle-twenty"); }
      if (detail === "load-more") { unlock("more"); if (counts[detail] >= 5) unlock("more-five"); if (counts[detail] >= 20) unlock("more-twenty"); }
      if (detail === "popup") { unlock("popup"); if (counts.popup >= 5) unlock("popup-five"); }
      if (detail === "download") unlock("download");
      if (detail === "scan") unlock("scan");
      if (detail === "secret") unlock("secret");
      if (detail === "ad-blocker") unlock("ad-blocker");
      if (detail === "real-ad") unlock("all-real");
      if (detail === "interaction") { if (counts.interaction >= 10) unlock("ten-interactions"); if (counts.interaction >= 25) unlock("twenty-five-interactions"); if (counts.interaction >= 50) unlock("fifty-interactions"); }
      if (Object.values(counts).reduce((a,b) => a+b, 0) >= 10) unlock("rapid-fire");
    };

    const onVisit = () => unlock("returning");
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 6) unlock("night-owl");
    if (hour >= 5 && hour < 8) unlock("early-bird");
    if (window.innerWidth <= 600) unlock("mobile"); else unlock("desktop");

    window.addEventListener("ad-seen", onSeen);
    window.addEventListener("achievement-action", onAction);
    window.addEventListener("ads-paradise-returning", onVisit);
    return () => {
      window.removeEventListener("ad-seen", onSeen);
      window.removeEventListener("achievement-action", onAction);
      window.removeEventListener("ads-paradise-returning", onVisit);
    };
  }, []);

  useEffect(() => { if (unlocked.length === ACHIEVEMENTS.length && unlocked.length > 0) { /* completionist is intentionally awarded after all other unlocks */ } }, [unlocked.length]);

  return (
    <>
      <div className="achievement-badge" aria-label={`${unlocked.length} of ${ACHIEVEMENTS.length} achievements unlocked`}><span>🏆</span><strong>{unlocked.length}/{ACHIEVEMENTS.length}</strong></div>
      <div className="achievement-progress" aria-label="Achievement progress">{seen} ads seen · {unlocked.length}/{ACHIEVEMENTS.length} achievements</div>
      {toast && <div className="achievement-toast" role="status"><div className="achievement-toast-icon">{toast.icon}</div><div><small>ACHIEVEMENT UNLOCKED</small><strong>{toast.title}</strong><span>{toast.description}</span></div></div>}
      <style jsx>{`
        .achievement-badge { position:fixed; right:18px; bottom:18px; z-index:9000; display:flex; align-items:center; gap:8px; border:2px solid #111; background:#ffef00; color:#111; padding:10px 13px; box-shadow:5px 5px 0 #111; font-weight:900; }
        .achievement-badge span { font-size:18px; }
        .achievement-progress { position:fixed; left:18px; bottom:18px; z-index:9000; background:#111; color:white; padding:8px 11px; font:700 10px/1.2 monospace; letter-spacing:.06em; }
        .achievement-toast { position:fixed; right:18px; top:18px; z-index:10000; width:min(390px,calc(100vw - 36px)); display:flex; gap:14px; padding:15px; border:3px solid #111; background:white; color:#111; box-shadow:8px 8px 0 #111; animation:achievementIn .35s cubic-bezier(.16,1,.3,1); }
        .achievement-toast-icon { width:52px; height:52px; flex:0 0 52px; display:grid; place-items:center; background:#ffef00; border:2px solid #111; font-weight:900; font-family:monospace; }
        .achievement-toast small,.achievement-toast strong,.achievement-toast span { display:block; }
        .achievement-toast small { font:800 9px monospace; letter-spacing:.12em; opacity:.55; }
        .achievement-toast strong { margin:4px 0; font-size:20px; }
        .achievement-toast span { font-size:12px; line-height:1.35; color:#555; }
        @keyframes achievementIn { from { opacity:0; transform:translateY(-15px) scale(.95); } to { opacity:1; transform:translateY(0) scale(1); } }
        @media(max-width:600px) { .achievement-progress { left:10px; bottom:10px; font-size:8px; } .achievement-badge { right:10px; bottom:10px; padding:8px 10px; } }
      `}</style>
    </>
  );
}
