import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./paradise-redesign.css";
import "./fake-ad-effects.css";
import "./fake-ad-runtime.css";

export const metadata: Metadata = {
  title: "Ads Paradise — The Internet, But Mostly Ads",
  description:
    "Ads Paradise is a completely unnecessary internet experience packed with fake advertisements, real ads, strange interactions and absolutely no reason to be here.",
  metadataBase: new URL("https://adsparadise.net"),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Ads Paradise",
    description: "You came for the internet. We gave you ads.",
    type: "website",
    url: "https://adsparadise.net",
    siteName: "Ads Paradise",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
