import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ hi: "from login" })
}