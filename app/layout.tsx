import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "./paradise-redesign.css";
import "./fake-ad-effects.css";
import "./fake-ad-runtime.css";

const siteUrl = "https://adsparadise.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ads Paradise — The Internet, But Mostly Ads",
  description:
    "Ads Paradise is a ridiculous internet experience with 1,000 fake ads, interactive advertisements, real ads and strange web experiments.",
  applicationName: "Ads Paradise",
  category: "entertainment",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Ads Paradise — The Internet, But Mostly Ads",
    description:
      "You came for the internet. We gave you ads. Explore 1,000 fake ads and interactive web experiments.",
    type: "website",
    url: siteUrl,
    siteName: "Ads Paradise",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Ads Paradise — The Internet, But Mostly Ads",
    description:
      "A ridiculous website packed with fake ads, interactive experiments and absolutely no reason to exist.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ads Paradise",
    url: siteUrl,
    description:
      "A ridiculous internet experience packed with fake advertisements and interactive web experiments.",
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
