import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { supabaseAdmin } from "./supabase";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface JWTPayload {
  userId: string;
  email: string;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export async function getUserFromRequest(
  req: NextRequest
): Promise<{ id: string; email: string; username: string } | null> {
  const token =
    req.cookies.get("ec_token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  const { data } = await supabaseAdmin
    .from("users")
    .select("id, email, username")
    .eq("id", payload.userId)
    .single();

  return data ?? null;
}

// Check if user has access to a course/video
export async function userHasAccess(
  userId: string,
  courseId: string
): Promise<boolean> {
  // Check active membership first
  const { data: membership } = await supabaseAdmin
    .from("user_purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("purchase_type", "membership")
    .eq("status", "active")
    .gte("expires_at", new Date().toISOString())
    .maybeSingle();

  if (membership) return true;

  // Check course series purchase
  const { data: seriesPurchase } = await supabaseAdmin
    .from("user_purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .eq("purchase_type", "course")
    .eq("status", "active")
    .maybeSingle();

  if (seriesPurchase) return true;

  return false;
}

// Check if user has access to a specific video lesson
export async function userHasVideoAccess(
  userId: string,
  courseId: string,
  videoKey: string
): Promise<boolean> {
  // Course-level access also covers individual videos
  const courseAccess = await userHasAccess(userId, courseId);
  if (courseAccess) return true;

  // Check individual video purchase
  const { data } = await supabaseAdmin
    .from("user_purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("video_key", videoKey)
    .eq("purchase_type", "video")
    .eq("status", "active")
    .maybeSingle();

  return !!data;
}
