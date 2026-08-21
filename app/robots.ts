import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://adsparadise.vercel.app/sitemap.xml",
    host: "https://adsparadise.vercel.app",
  };
}
