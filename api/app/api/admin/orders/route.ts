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

  const { data: orders, error } = await supabaseAdmin
    .from("orders")
    .select(`
      id,
      amount_nzd,
      currency,
      purchase_type,
      course_id,
      video_key,
      service_id,
      status,
      created_at,
      paid_at,
      stripe_session_id,
      users (
        username,
        email
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  return NextResponse.json({ orders });
}
