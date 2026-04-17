import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function checkAdminAuth(req: NextRequest): boolean {
  const adminKey = req.headers.get("x-admin-key");
  return adminKey === process.env.ADMIN_SECRET_KEY;
}

export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Total page views
  const { count: totalViews } = await supabaseAdmin
    .from("page_views")
    .select("*", { count: "exact", head: true });

  // Views in last 7 days (daily breakdown)
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data: recent } = await supabaseAdmin
    .from("page_views")
    .select("viewed_at")
    .gte("viewed_at", sevenDaysAgo)
    .order("viewed_at", { ascending: true });

  // Build daily counts for last 7 days
  const dailyMap: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    dailyMap[key] = 0;
  }
  (recent ?? []).forEach((row) => {
    const key = (row.viewed_at as string).slice(0, 10);
    if (key in dailyMap) dailyMap[key]++;
  });

  const daily = Object.entries(dailyMap).map(([date, views]) => ({ date, views }));

  // Top pages
  const { data: allViews } = await supabaseAdmin
    .from("page_views")
    .select("path");

  const pathMap: Record<string, number> = {};
  (allViews ?? []).forEach((row) => {
    const p = row.path as string;
    pathMap[p] = (pathMap[p] ?? 0) + 1;
  });
  const topPages = Object.entries(pathMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([path, views]) => ({ path, views }));

  return NextResponse.json({
    totalViews: totalViews ?? 0,
    last7Days: (recent ?? []).length,
    daily,
    topPages,
  });
}
