import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ purchases: [] }, { status: 200 });
  }

  const { data: purchases } = await supabaseAdmin
    .from("user_purchases")
    .select("purchase_type, course_id, video_key, expires_at, created_at")
    .eq("user_id", user.id)
    .eq("status", "active");

  // Filter out expired memberships
  const now = new Date();
  const active = (purchases ?? []).filter((p) => {
    if (!p.expires_at) return true;
    return new Date(p.expires_at) > now;
  });

  return NextResponse.json({ purchases: active });
}
