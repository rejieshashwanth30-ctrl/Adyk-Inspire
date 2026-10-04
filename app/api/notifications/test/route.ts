import { NextRequest, NextResponse } from "next/server";
import { prisma, checkDbConnection, getDatabaseUrl, NEON_PRODUCTION_DATABASE_URL } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const conn = await checkDbConnection();
  const activeUrl = getDatabaseUrl();

  let envHost = "NONE";
  let activeHost = "NONE";
  try {
    if (process.env.DATABASE_URL) {
      envHost = new URL(process.env.DATABASE_URL.replace(/^["']|["']$/g, "")).host;
    }
    activeHost = new URL(activeUrl).host;
  } catch {}

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

  return NextResponse.json({
    status: "ok",
    databaseConnection: conn,
    envHost,
    activeHost,
    registrationCreateTest: createResult,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  return GET();
}
