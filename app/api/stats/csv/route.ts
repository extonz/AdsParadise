import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const VERCEL_PROJECT_ID = "prj_e69nzcxBeFqQ61BwL66s5Uvh5zJK";
const VERCEL_TEAM_ID = "team_IQXDxAojey7QOPQGBoJGY5VH";

function csvEscape(value: string | number | null | undefined) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

async function getSupabaseStats() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return { adViews: null, fakeAds: null, status: "not_configured" };
  }

  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
  };

  const [counterResponse, adsResponse] = await Promise.all([
    fetch(`${url}/rest/v1/global_ad_counter?select=count&id=eq.1`, {
      headers,
      cache: "no-store",
    }),
    fetch(`${url}/rest/v1/fake_ads?select=id&active=eq.true`, {
      headers,
      cache: "no-store",
    }),
  ]);

  if (!counterResponse.ok || !adsResponse.ok) {
    throw new Error("Supabase stats request failed");
  }

  const counter = (await counterResponse.json()) as Array<{ count: number }>;
  const ads = (await adsResponse.json()) as Array<{ id: number }>;

  return {
    adViews: counter[0]?.count ?? 0,
    fakeAds: ads.length,
    status: "ok",
  };
}

async function getVercelStats() {
  const token = process.env.VERCEL_TOKEN;

  if (!token) {
    return { pageviews: null, visitors: null, status: "not_configured" };
  }

  const params = new URLSearchParams({
    teamId: VERCEL_TEAM_ID,
    projectId: VERCEL_PROJECT_ID,
  });

  const response = await fetch(
    `https://api.vercel.com/v1/query/web-analytics/visits/count?${params}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Vercel analytics request failed (${response.status})`);
  }

  const body = (await response.json()) as {
    data?: { pageviews?: number; visitors?: number };
  };

  return {
    pageviews: body.data?.pageviews ?? 0,
    visitors: body.data?.visitors ?? 0,
    status: "ok",
  };
}

export async function GET() {
  const generatedAt = new Date().toISOString();

  try {
    const [supabase, vercel] = await Promise.all([
      getSupabaseStats(),
      getVercelStats(),
    ]);

    const rows = [
      ["generated_at", generatedAt],
      ["supabase_ad_views", supabase.adViews],
      ["supabase_active_fake_ads", supabase.fakeAds],
      ["supabase_status", supabase.status],
      ["vercel_pageviews", vercel.pageviews],
      ["vercel_visitors", vercel.visitors],
      ["vercel_status", vercel.status],
    ];

    const csv = ["metric,value", ...rows.map(([metric, value]) => `${csvEscape(metric)},${csvEscape(value)}`)].join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
        "Content-Disposition": 'inline; filename="ads-paradise-stats.csv"',
      },
    });
  } catch (error) {
    console.error("Stats export failed", error);

    return new NextResponse(
      [
        "metric,value",
        `${csvEscape("generated_at")},${csvEscape(generatedAt)}`,
        `${csvEscape("status")},${csvEscape("error")}`,
      ].join("\n"),
      {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  }
}
