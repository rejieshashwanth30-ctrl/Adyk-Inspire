import { NextRequest, NextResponse } from "next/server";
import { sendAdminNotificationEmail } from "@/lib/email";
import { sendAdminWhatsAppNotification } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const testRecord = {
      id: "test-notification-diag-001",
      fullName: body.fullName || "ADYK Test User",
      email: body.email || "rejieshashwanth30@gmail.com",
      whatsapp: body.whatsapp || "+918870605699",
      role: body.role || "Developer",
      interests: ["AI / ML", "Software Development", "Startups"],
      hasIdea: "YES" as const,
      ideaDescription: "Diagnostic test notification for ADYK Inspire system.",
      lookingFor: ["Build a Project", "Networking"],
      contactPreference: "Either" as const,
      createdAt: new Date(),
    };

    const emailResult = await sendAdminNotificationEmail(testRecord);
    const whatsappResult = await sendAdminWhatsAppNotification(testRecord);

    return NextResponse.json({
      status: "test_completed",
      results: {
        email: emailResult,
        whatsapp: whatsappResult,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error testing notifications";
    return NextResponse.json(
      { error: message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Notification test endpoint is active. Use POST to trigger diagnostic notifications.",
  });
}
