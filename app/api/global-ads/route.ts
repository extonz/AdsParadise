import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return NextResponse.json({ count: null, configured: false });
  }

  const today = new Date().toISOString().slice(0, 10);
  const endpoint = new URL("/rest/v1/daily_ad_stats", SUPABASE_URL);
  endpoint.searchParams.set("select", "ads_seen");
  endpoint.searchParams.set("day", `eq.${today}`);
  endpoint.searchParams.set("limit", "1");

  const response = await fetch(endpoint.toString(), {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ count: null, configured: true }, { status: 200 });
  }

  const rows = await response.json();
  return NextResponse.json({
    count: Number(rows?.[0]?.ads_seen ?? 0),
    configured: true,
  });
}

export async function POST(request: Request) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return NextResponse.json({ count: null, configured: false });
  }

  let amount = 1;
  try {
    const body = await request.json();
    if (typeof body?.amount === "number") {
      amount = Math.max(1, Math.min(Math.floor(body.amount), 25));
    }
  } catch {
    // Default to one view when the request has no JSON body.
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_daily_ad_views`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ count: null, configured: true }, { status: 200 });
  }

  const value = await response.json();
  return NextResponse.json({ count: Number(value ?? 0), configured: true });
}
