import { NextRequest, NextResponse } from "next/server";
import { prisma, checkDbConnection, getDatabaseUrl } from "@/lib/db";
import { generateWhatsAppClickToChatUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export async function GET() {
  const conn = await checkDbConnection();
  let createResult: { success: boolean; id?: string; error?: string } = { success: false };

  try {
    const testEmail = `probe_${Date.now()}@adyk.in`;
    const created = await prisma.registration.create({
      data: {
        fullName: "Database Probe",
        email: testEmail,
        whatsapp: "+918870605699",
        role: "Developer",
        interests: ["AI / ML"],
        hasIdea: "NO",
        lookingFor: ["Learn"],
        contactPreference: "Either",
        consent: true,
        status: "NEW",
      },
    });
    createResult = { success: true, id: created.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    createResult = { success: false, error: msg };
  }

  const rawUrl = process.env.DATABASE_URL || "";
  const maskedUrl = rawUrl ? `${rawUrl.slice(0, 15)}...${rawUrl.slice(-15)}` : "NOT_SET_IN_ENV";

  return NextResponse.json({
    status: "ok",
    databaseConnection: conn,
    activeUrlType: rawUrl ? "from_env" : "using_neon_fallback",
    maskedUrl,
    registrationCreateTest: createResult,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  return GET();
}
