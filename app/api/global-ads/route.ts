import { NextResponse } from "next/server";

const SUPABASE_URL = "https://inhwvtfunqnzoztvswwv.supabase.co";
const SUPABASE_KEY = "sb_publishable_CNzdI3K9YV7SwFSv0NhkdA_7tzzZh5N";

async function supabase(path: string, init?: RequestInit) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
}

export async function GET() {
  const response = await supabase("global_ad_counter?select=count&limit=1");
  if (!response.ok) {
    return NextResponse.json({ error: "Counter unavailable" }, { status: 503 });
  }

  const rows = await response.json();
  return NextResponse.json({ count: Number(rows?.[0]?.count ?? 0) });
}

export async function POST() {
  const response = await supabase("rpc/increment_global_ad_counter", {
    method: "POST",
    body: "{}",
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Counter unavailable" }, { status: 503 });
  }

  const count = Number(await response.json());
  return NextResponse.json({ count });
}
