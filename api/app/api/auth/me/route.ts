import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  // Also fetch their active purchases
  const { data: purchases } = await supabaseAdmin
    .from("user_purchases")
    .select("purchase_type, course_id, video_key, service_id, expires_at")
    .eq("user_id", user.id)
    .eq("status", "active");

  return NextResponse.json({ user, purchases: purchases ?? [] });
}
