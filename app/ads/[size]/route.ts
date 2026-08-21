import { NextResponse } from "next/server";

const CONFIG = {
  "320x50": { width: 320, height: 50 },
  "468x60": { width: 468, height: 60 },
  "728x90": { width: 728, height: 90 },
  "300x250": { width: 300, height: 250 },
} as const;

type AdSize = keyof typeof CONFIG;

export async function GET(
  _request: Request,
  context: { params: Promise<{ size: string }> },
) {
  const { size } = await context.params;

  if (!(size in CONFIG)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const config = CONFIG[size as AdSize];

  // Third-party ad scripts are intentionally disabled until the provider/domain
  // can be independently verified. Keep the local ad endpoint alive so the
  // frontend does not break while a safer provider is selected.
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=${config.width}, initial-scale=1">
<meta name="referrer" content="no-referrer">
<style>
html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:transparent}
body{display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif}
.ad-placeholder{box-sizing:border-box;width:100%;height:100%;display:flex;align-items:center;justify-content:center;gap:8px;border:1px solid rgba(0,0,0,.08);background:#f7f7f5;color:#777;font-size:11px;letter-spacing:.08em;text-transform:uppercase}
.dot{width:6px;height:6px;border-radius:50%;background:#f5c400}
</style>
</head>
<body>
<div class="ad-placeholder"><span class="dot"></span><span>Advertisement temporarily paused</span></div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline';",
    },
  });
}
