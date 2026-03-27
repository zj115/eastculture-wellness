import type { NextConfig } from "next";

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_FRONTEND_URL || "https://eastculture.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

const nextConfig: NextConfig = {
  // Allow cross-origin requests from the Vite frontend
  async headers() {
    return ALLOWED_ORIGINS.map((origin) => ({
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: origin },
        { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
        { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, x-admin-key" },
        { key: "Access-Control-Allow-Credentials", value: "true" },
      ],
    }));
  },
};

export default nextConfig;
