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
  // Check course series purchase (lifetime — no expires_at check needed)
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

  // Check individual video purchase (exact key match)
  const { data } = await supabaseAdmin
    .from("user_purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("video_key", videoKey)
    .eq("purchase_type", "video")
    .eq("status", "active")
    .maybeSingle();

  if (data) return true;

  // Also grant access if user has ANY active video purchase from the same course
  // (handles renamed/reorganized video files — matches frontend hasCourseAccess logic)
  const COURSE_PREFIXES: Record<string, string> = {
    faceyoga: "face-yoga/",
    taichi: "taichi/",
    qigong: "acupressure/",
    wingchun: "wingchun/",
    guasha: "FacialGuaSha/",
  };
  const prefix = COURSE_PREFIXES[courseId];
  if (prefix) {
    const { data: anyVideoPurchase } = await supabaseAdmin
      .from("user_purchases")
      .select("id")
      .eq("user_id", userId)
      .eq("purchase_type", "video")
      .eq("status", "active")
      .like("video_key", `${prefix}%`)
      .maybeSingle();
    if (anyVideoPurchase) return true;
  }

  return false;
}
