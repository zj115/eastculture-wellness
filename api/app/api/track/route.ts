import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = typeof body.path === "string" ? body.path.slice(0, 255) : "/";
    const referrer = typeof body.referrer === "string" ? body.referrer.slice(0, 255) : null;

    await supabaseAdmin.from("page_views").insert({ path, referrer });
  } catch {
    // silently ignore — tracking must never break the page
  }

  return NextResponse.json({ ok: true });
}
