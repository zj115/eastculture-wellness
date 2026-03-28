import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Missing email/username or password" },
        { status: 400 }
      );
    }

    // Find by email or username
    const { data: user } = await supabaseAdmin
      .from("users")
      .select("id, username, email, password_hash")
      .or(`email.eq.${identifier.toLowerCase()},username.eq.${identifier}`)
      .maybeSingle() as { data: { id: string; username: string; email: string; password_hash: string } | null };

    if (!user) {
      return NextResponse.json(
        { error: "Account not found" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    const token = signToken({ userId: user.id, email: user.email });

    const response = NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

    response.cookies.set("ec_token", token, {
      httpOnly: true,
      secure: true, // must be true for sameSite: "none"
      sameSite: "none", // required for cross-site fetch (frontend ≠ api domain)
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
