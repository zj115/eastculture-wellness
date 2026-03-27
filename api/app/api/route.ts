import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "EastCulture API is running ✅" });
}
