import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ads Paradise",
  description:
    "Welcome to Ads Paradise. A beautiful place full of advertisements.",
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