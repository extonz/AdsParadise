import { NextResponse } from "next/server";

const CONFIG = {
  "320x50": {
    key: "628f0c75cee1613f48c609fa5e5f2ed8",
    width: 320,
    height: 50,
  },
  "468x60": {
    key: "6afa17e3d471b1a172de2db008075829",
    width: 468,
    height: 60,
  },
  "728x90": {
    key: "d3d71735886c02030a69a8ea52632b4b",
    width: 728,
    height: 90,
  },
  "300x250": {
    key: "458a1f1c02613ad23c09ecf29b443cc8",
    width: 300,
    height: 250,
  },
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

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=${config.width}, initial-scale=1">
<meta name="referrer" content="no-referrer-when-downgrade">
<style>
html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:transparent}
body{display:flex;align-items:center;justify-content:center}
</style>
</head>
<body>
<script>
var atOptions={
  key:'${config.key}',
  format:'iframe',
  height:${config.height},
  width:${config.width},
  params:{}
};
</script>
<script async src="https://servicessitclaims.com/${config.key}/invoke.js"></script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
