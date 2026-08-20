import type { Metadata } from "next";
// @ts-expect-error Next.js handles these global CSS imports at build time.
import "./globals.css";
import "./fake-ad-effects.css";

export const metadata: Metadata = {
  title: "Ads Paradise™ — You came for the internet. We gave you ads.",
  description:
    "Welcome to Ads Paradise. A completely unnecessary internet experience dedicated to the beautiful art of advertising.",
  keywords: [
    "Ads Paradise",
    "advertisements",
    "ads",
    "internet",
    "advertising",
  ],
  authors: [
    {
      name: "Ads Paradise",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}