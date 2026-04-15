import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";
import { signToken, verifyToken } from "@/lib/auth";

// ─── POST /api/auth/reset-password ───────────────────────────────────────────
// Two modes:
//   mode "request"  → user submits email → we email them a reset link
//   mode "confirm"  → user submits token + new password → we update their password

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ── MODE 1: Request a reset link ──────────────────────────────────────────
    if (body.mode === "request") {
      const email = (body.email ?? "").toLowerCase().trim();
      if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
      }

      // Always return success even if email not found (security best practice)
      const { data: user } = await supabaseAdmin
        .from("users")
        .select("id, email, username")
        .eq("email", email)
        .maybeSingle();

      if (user) {
        // Sign a short-lived token (15 minutes)
        const resetToken = signToken({ userId: user.id, email: user.email });

        const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL ?? "https://www.wellnesseastern.com";
        const resetLink = `${frontendUrl}?reset_token=${resetToken}`;

        // Send email via Resend
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        if (RESEND_API_KEY) {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "WellnessEastern <noreply@wellnesseastern.com>",
              to: user.email,
              subject: "Reset your password — WellnessEastern",
              html: `
                <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#fff;border-radius:12px;">
                  <h2 style="font-size:20px;font-weight:700;color:#0f172a;margin-bottom:8px;">Reset your password</h2>
                  <p style="font-size:14px;color:#475569;margin-bottom:24px;">Hi ${user.username}, click the button below to set a new password. This link expires in <strong>15 minutes</strong>.</p>
                  <a href="${resetLink}" style="display:inline-block;background:#d97706;color:#fff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">Reset Password</a>
                  <p style="font-size:12px;color:#94a3b8;margin-top:24px;">If you did not request this, you can safely ignore this email.</p>
                </div>
              `,
            }),
          });
        }
      }

      return NextResponse.json({ ok: true });
    }

    // ── MODE 2: Confirm reset with token + new password ───────────────────────
    if (body.mode === "confirm") {
      const { token, password } = body;
      if (!token || !password) {
        return NextResponse.json({ error: "Missing token or password" }, { status: 400 });
      }
      if (password.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
      }

      const payload = verifyToken(token);
      if (!payload) {
        return NextResponse.json({ error: "Reset link is invalid or has expired" }, { status: 400 });
      }

      const password_hash = await bcrypt.hash(password, 12);
      const { error } = await supabaseAdmin
        .from("users")
        .update({ password_hash })
        .eq("id", payload.userId);

      if (error) {
        return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
      }

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
