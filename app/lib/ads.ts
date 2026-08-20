import type { FakeAd } from "../data/ads";
import { fakeAds as fallbackAds } from "../data/ads";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export type AdSource = "supabase" | "local";

export type LoadedAds = {
  ads: FakeAd[];
  source: AdSource;
};

function isValidAd(value: unknown): value is FakeAd {
  if (!value || typeof value !== "object") return false;

  const ad = value as Record<string, unknown>;

  return (
    typeof ad.id === "number" &&
    typeof ad.title === "string" &&
    typeof ad.description === "string" &&
    typeof ad.button === "string" &&
    typeof ad.category === "string" &&
    (ad.size === "small" ||
      ad.size === "medium" ||
      ad.size === "large") &&
    typeof ad.effect === "string"
  );
}

export async function loadAds(): Promise<LoadedAds> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return { ads: fallbackAds, source: "local" };
  }

  try {
    const endpoint = new URL(
      "/rest/v1/fake_ads",
      SUPABASE_URL,
    );

    endpoint.searchParams.set(
      "select",
      "id,title,description,button,category,size,effect",
    );
    endpoint.searchParams.set("is_active", "eq.true");
    endpoint.searchParams.set("order", "id.asc");
    endpoint.searchParams.set("limit", "1000");

    const response = await fetch(endpoint.toString(), {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Supabase returned ${response.status}`,
      );
    }

    const payload = await response.json();
    const ads = Array.isArray(payload)
      ? payload.filter(isValidAd)
      : [];

    if (ads.length === 0) {
      throw new Error("Supabase returned no valid ads");
    }

    return { ads, source: "supabase" };
  } catch {
    return { ads: fallbackAds, source: "local" };
  }
}
