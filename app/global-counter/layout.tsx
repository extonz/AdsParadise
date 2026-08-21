import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Ad Counter — Ads Paradise",
  description:
    "Live global statistics for fake advertisements seen across Ads Paradise.",
  alternates: {
    canonical: "/global-counter",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function GlobalCounterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
