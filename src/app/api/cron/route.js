import releaseCartItems from "@/lib/cron/releaseCartItems";
import { NextResponse } from "next/server";

export async function GET(request) {
  const res = await releaseCartItems();
  return NextResponse.json({ ok: true });
}
export const revalidate = 5 * 60; // 5 minutes
