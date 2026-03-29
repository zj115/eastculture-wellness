import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check for existing email
    const { data: existing } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 12);

    // Create user
    const { data: newUser, error } = await supabaseAdmin
      .from("users")
      .insert({
        username: username.trim(),
        email: email.toLowerCase().trim(),
        password_hash,
      })
      .select("id, username, email, created_at")
      .single();

    if (error || !newUser) {
      console.error("Register error:", error);
      return NextResponse.json(
        { error: "Failed to create account" },
        { status: 500 }
      );
    }

    const token = signToken({ userId: newUser.id, email: newUser.email });

    const response = NextResponse.json({
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token, // also return token in body for localStorage fallback (iOS Safari cross-site cookie issue)
    });

    response.cookies.set("ec_token", token, {
      httpOnly: true,
      secure: true, // must be true for sameSite: "none"
      sameSite: "none", // required for cross-site fetch (frontend ≠ api domain)
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
