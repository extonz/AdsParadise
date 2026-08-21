export default function PopupPolish() {
  return (
    <style>{`
      /* === ADS PARADISE POPUP REDESIGN === */
      .fake-ad-experience {
        position: fixed !important;
        inset: 0 !important;
        z-index: 99999 !important;
        display: grid !important;
        place-items: center !important;
        padding: 24px !important;
        background:
          radial-gradient(circle at 20% 20%, rgba(255,239,0,.12), transparent 28%),
          radial-gradient(circle at 80% 75%, rgba(0,220,255,.10), transparent 30%),
          rgba(7,7,7,.90) !important;
        backdrop-filter: blur(18px) saturate(125%) !important;
        -webkit-backdrop-filter: blur(18px) saturate(125%) !important;
        animation: apOverlayIn .28s cubic-bezier(.16,1,.3,1) !important;
      }

      .fake-ad-experience::before,
      .fake-ad-experience::after {
        content: "" !important;
        position: absolute !important;
        width: 220px !important;
        height: 220px !important;
        pointer-events: none !important;
        opacity: .12 !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        background-size: contain !important;
        filter: drop-shadow(0 0 18px rgba(255,255,255,.35)) !important;
      }

      .fake-ad-experience::before {
        left: 5vw;
        top: 8vh;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Cpath d='M60 5l9 36 36 9-36 9-9 36-9-36-36-9 36-9 9-36zm39 73l4 16 16 4-16 4-4 16-4-16-16-4 16-4 4-16z' fill='none' stroke='%23fff' stroke-width='3'/%3E%3C/svg%3E");
        animation: apFloatA 7s ease-in-out infinite;
      }

      .fake-ad-experience::after {
        right: 4vw;
        bottom: 7vh;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='47' fill='none' stroke='%23ffef00' stroke-width='2' stroke-dasharray='4 8'/%3E%3Cpath d='M60 22v76M22 60h76' stroke='%23ffef00' stroke-width='2'/%3E%3C/svg%3E");
        animation: apSpin 18s linear infinite;
      }

      .fake-ad-experience-inner {
        position: relative !important;
        width: min(680px, 100%) !important;
        max-height: min(820px, calc(100vh - 48px)) !important;
        overflow: auto !important;
        padding: 34px !important;
        border: 1px solid rgba(255,255,255,.16) !important;
        border-radius: 22px !important;
        color: #111 !important;
        background: rgba(255,255,255,.96) !important;
        box-shadow:
          0 30px 90px rgba(0,0,0,.65),
          0 0 0 8px rgba(255,255,255,.035),
          0 0 70px color-mix(in srgb, var(--experience-accent, #ffef00) 20%, transparent) !important;
        animation: apModalIn .48s cubic-bezier(.16,1,.3,1) !important;
        isolation: isolate !important;
      }

      .fake-ad-experience-inner::before {
        content: "" !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: 5px !important;
        background: linear-gradient(90deg, #111 0 18%, var(--experience-accent, #ffef00) 18% 82%, #111 82%) !important;
      }

      .fake-ad-experience-inner::after {
        content: "" !important;
        position: absolute !important;
        top: 20px !important;
        right: 70px !important;
        width: 42px !important;
        height: 42px !important;
        pointer-events: none !important;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M32 4l5.6 20.4L58 30l-20.4 5.6L32 56l-5.6-20.4L6 30l20.4-5.6L32 4z' fill='none' stroke='%23111' stroke-width='2.5'/%3E%3Cpath d='M51 8l1.8 6.2L59 16l-6.2 1.8L51 24l-1.8-6.2L43 16l6.2-1.8L51 8z' fill='%23ffef00' stroke='%23111' stroke-width='1.5'/%3E%3C/svg%3E") center/contain no-repeat !important;
        animation: apBadge 3s ease-in-out infinite !important;
      }

      .fake-ad-experience-close {
        position: absolute !important;
        top: 16px !important;
        right: 16px !important;
        z-index: 4 !important;
        width: 40px !important;
        height: 40px !important;
        display: grid !important;
        place-items: center !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 2px solid #111 !important;
        border-radius: 50% !important;
        background: #fff !important;
        color: #111 !important;
        cursor: pointer !important;
        font: 400 24px/1 Arial,sans-serif !important;
        transition: transform .18s ease, background .18s ease, color .18s ease !important;
      }

      .fake-ad-experience-close:hover {
        transform: rotate(8deg) scale(1.08) !important;
        background: #111 !important;
        color: #fff !important;
      }

      .fake-ad-experience-label {
        display: inline-flex !important;
        align-items: center !important;
        gap: 8px !important;
        margin: 8px 0 22px !important;
        padding: 7px 10px !important;
        border: 1px solid #d7d7d7 !important;
        border-radius: 999px !important;
        background: #f7f7f7 !important;
        color: #666 !important;
        font: 800 9px/1 monospace !important;
        letter-spacing: .12em !important;
        text-transform: uppercase !important;
      }

      .fake-ad-experience-label::before {
        content: "" !important;
        width: 7px !important;
        height: 7px !important;
        border-radius: 50% !important;
        background: var(--experience-accent, #ffef00) !important;
        box-shadow: 0 0 12px color-mix(in srgb, var(--experience-accent, #ffef00) 70%, transparent) !important;
      }

      .fake-ad-experience-inner > section {
        position: relative !important;
        border-radius: 16px !important;
        overflow: hidden !important;
        margin: 0 !important;
        min-height: 260px !important;
        border: 1px solid rgba(17,17,17,.12) !important;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,.35) !important;
      }

      .fake-ad-experience-result {
        margin: 18px 0 0 !important;
        padding: 14px 16px !important;
        border: 1px solid #e4e4e4 !important;
        border-radius: 12px !important;
        background: #fafafa !important;
        color: #555 !important;
        font: 800 10px/1.5 monospace !important;
        letter-spacing: .06em !important;
        text-align: center !important;
      }

      .fake-ad-experience-result::before {
        content: "RESULT // " !important;
        color: #999 !important;
      }

      .fake-ad-experience-inner::-webkit-scrollbar { width: 8px; }
      .fake-ad-experience-inner::-webkit-scrollbar-thumb { background: #c8c8c8; border-radius: 20px; }

      .ad-counter {
        top: auto !important;
        right: auto !important;
        bottom: 18px !important;
        left: 18px !important;
        z-index: 800 !important;
        border-color: #111 !important;
        box-shadow: 5px 5px 0 #ffef00 !important;
      }

      @keyframes apOverlayIn { from { opacity:0; } to { opacity:1; } }
      @keyframes apModalIn { from { opacity:0; transform:translateY(28px) scale(.94) rotate(-.6deg); } to { opacity:1; transform:none; } }
      @keyframes apFloatA { 0%,100%{transform:translate3d(0,0,0) rotate(0deg)} 50%{transform:translate3d(18px,-16px,0) rotate(12deg)} }
      @keyframes apSpin { to { transform:rotate(360deg); } }
      @keyframes apBadge { 0%,100%{transform:rotate(-7deg) scale(.92); opacity:.55} 50%{transform:rotate(5deg) scale(1.08); opacity:.95} }

      @media (max-width: 700px) {
        .fake-ad-experience { padding: 12px !important; }
        .fake-ad-experience-inner { padding: 22px !important; border-radius: 17px !important; max-height: calc(100vh - 24px) !important; }
        .fake-ad-experience-inner::after { right: 48px !important; top: 16px !important; width: 32px !important; height: 32px !important; }
        .fake-ad-experience-close { width: 36px !important; height: 36px !important; }
        .fake-ad-experience-inner > section { min-height: 210px !important; }
        .fake-ad-experience-result { font-size: 9px !important; }
        .ad-counter { left: 10px !important; bottom: 10px !important; }
      }
    `}</style>
  );
}
