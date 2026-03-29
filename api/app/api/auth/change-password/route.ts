import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Login required" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    // Get current password hash
    const { data: dbUser } = await supabaseAdmin
      .from("users")
      .select("password_hash")
      .eq("id", user.id)
      .single() as { data: { password_hash: string } | null };

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const valid = await bcrypt.compare(currentPassword, dbUser.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
    }

    const newHash = await bcrypt.hash(newPassword, 12);
    await supabaseAdmin
      .from("users")
      .update({ password_hash: newHash })
      .eq("id", user.id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Change password error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
