"use client";

import { useMemo, useRef } from "react";

type RealAdSize = "320x50" | "468x60" | "728x90" | "300x250";

interface RealAdProps {
  size: RealAdSize;
}

const AD_CONFIG = {
  "320x50": {
    key: "00a142de1f48d2a82566fd877d92254b",
    width: 320,
    height: 50,
  },
  "468x60": {
    key: "3ba9ceaa4f7b364be0b63a6069931c15",
    width: 468,
    height: 60,
  },
  "728x90": {
    key: "7af1ff7df3cc1746c78756943a6129de",
    width: 728,
    height: 90,
  },
  "300x250": {
    key: "adf8424bf6f43e6b6fd5cf6b4a9917d0",
    width: 300,
    height: 250,
  },
} as const;

function buildAdDocument(
  key: string,
  width: number,
  height: number,
) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=${width}, initial-scale=1">
<style>
html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:transparent}
body{display:flex;align-items:center;justify-content:center}
</style>
</head>
<body>
<script>
var atOptions={
  'key':'${key}',
  'format':'iframe',
  'height':${height},
  'width':${width},
  'params':{}
};
</script>
<script src="https://www.highperformanceformat.com/${key}/invoke.js"></script>
</body>
</html>`;
}

export default function RealAd({ size }: RealAdProps) {
  const config = AD_CONFIG[size];
  const countedRef = useRef(false);

  const srcDoc = useMemo(
    () =>
      buildAdDocument(
        config.key,
        config.width,
        config.height,
      ),
    [config.key, config.width, config.height],
  );

  const handleLoad = () => {
    if (countedRef.current) return;

    countedRef.current = true;
    window.dispatchEvent(new Event("ad-seen"));
  };

  return (
    <section
      className={`real-ad real-ad-${size}`}
      aria-label="Advertisement"
    >
      <div className="real-ad-label">
        <span>ADVERTISEMENT</span>
        <span>{size}</span>
      </div>

      <div className="real-ad-content">
        <iframe
          title={`Advertisement ${size}`}
          srcDoc={srcDoc}
          width={config.width}
          height={config.height}
          loading="lazy"
          scrolling="no"
          frameBorder="0"
          onLoad={handleLoad}
          sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms allow-same-origin"
        />
      </div>
    </section>
  );
}
