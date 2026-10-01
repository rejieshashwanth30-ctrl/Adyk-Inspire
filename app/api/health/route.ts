import { NextResponse } from "next/server";
import { checkDbConnection } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const { connected, diagnostic } = await checkDbConnection();

  return NextResponse.json(
    {
      status: "ok",
      platform: "ADYK Inspire",
      company: "ADYK — A Multi-Venture Technology Company",
      database: connected ? "connected" : "disconnected",
      diagnostic,
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    },
    { status: 200 }
  );
}
