import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = new Set([
  "https://eastculture.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
]);

const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, x-admin-key",
  "Access-Control-Allow-Credentials": "true",
};

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "";
  const isAllowed = ALLOWED_ORIGINS.has(origin);

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    const res = new NextResponse(null, { status: 204 });
    if (isAllowed) {
      res.headers.set("Access-Control-Allow-Origin", origin);
    }
    Object.entries(CORS_HEADERS).forEach(([k, v]) => res.headers.set(k, v));
    res.headers.set("Access-Control-Max-Age", "86400");
    return res;
  }

  // For actual requests, let them pass through and attach CORS headers
  const res = NextResponse.next();
  if (isAllowed) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  }
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}

export const config = {
  matcher: "/api/:path*",
};
