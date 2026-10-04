import { NextRequest, NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validation";
import { rateLimitRegistration } from "@/lib/rate-limit";
import { prisma } from "@/lib/db";
import { generateWhatsAppClickToChatUrl } from "@/lib/whatsapp";
import { dispatchAllNotifications } from "@/lib/notifications";
import { ApiResponse, RegistrationRecord } from "@/types/registration";

export const dynamic = "force-dynamic";

// In-flight mutex set to prevent simultaneous race conditions for the same email
const inFlightEmails = new Set<string>();

export async function POST(req: NextRequest) {
  let normalizedEmail: string | undefined;

  try {
    // 1. IP identification for rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Invalid JSON request payload.",
          errorCode: "VALIDATION_ERROR",
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // 2. Validate using Zod & Sanitize Input
    const validationResult = registrationSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string[]> = {};
      const issues =
        validationResult.error.issues ||
        (validationResult.error as unknown as { errors: typeof validationResult.error.issues }).errors;

      issues.forEach((err) => {
        const field = err.path.join(".");
        if (!fieldErrors[field]) fieldErrors[field] = [];
        fieldErrors[field].push(err.message);
      });

      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Please correct the highlighted errors in the form.",
          errors: fieldErrors,
          errorCode: "VALIDATION_ERROR",
          timestamp: new Date().toISOString(),
        },
        { status: 422 }
      );
    }

    const validData = validationResult.data;
    normalizedEmail = validData.email.toLowerCase();

    // 3. Spam Honeypot Detection
    if (validData.website_url_hidden && validData.website_url_hidden.trim() !== "") {
      console.warn(`[SPAM BLOCKED] Honeypot triggered from IP: ${ip}`);
      // Return 200 to fool bots without persisting or notifying
      return NextResponse.json<ApiResponse>(
        {
          success: true,
          message: "Registration received.",
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    // 4. Rate Limiting Check (Production-safe, IP & flood protection)
    const rateLimit = rateLimitRegistration(ip, validData.email);
    if (!rateLimit.allowed) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: rateLimit.reason || "Too many attempts. Please wait a few minutes.",
          errorCode: rateLimit.errorCode || "RATE_LIMIT_ERROR",
          timestamp: new Date().toISOString(),
        },
        { status: 429 }
      );
    }

    // 5. In-flight Concurrency Check (Prevents identical simultaneous requests)
    if (inFlightEmails.has(normalizedEmail)) {
      return NextResponse.json<ApiResponse>(
        {
          success: true,
          message: "Your registration is currently being processed. Please wait a moment.",
          errorCode: "DUPLICATE_SUBMISSION",
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    inFlightEmails.add(normalizedEmail);

    // 6. Accidental Duplicate / Rapid Double-Click Protection
    // If exact same email was successfully saved within the last 60 seconds, reuse it safely
    let savedRegistration: RegistrationRecord;
    try {
      const sixtySecondsAgo = new Date(Date.now() - 60 * 1000);
      const recentSubmission = await prisma.registration.findFirst({
        where: {
          email: validData.email,
          createdAt: { gte: sixtySecondsAgo },
        },
        orderBy: { createdAt: "desc" },
      });

      if (recentSubmission) {
        console.log(
          `[DEDUPLICATION] Accidental duplicate detected within 60s for email: ${validData.email}. Returning existing registration ID: ${recentSubmission.id}`
        );
        const whatsappUrl = generateWhatsAppClickToChatUrl(recentSubmission);
        return NextResponse.json<ApiResponse>(
          {
            success: true,
            message: "Your ADYK Inspire registration has already been received. Welcome to ADYK Inspire!",
            data: {
              id: recentSubmission.id,
              fullName: recentSubmission.fullName,
              email: recentSubmission.email,
              whatsappUrl,
              alreadyRegistered: true,
            },
            timestamp: new Date().toISOString(),
          },
          { status: 200 }
        );
      }

      // 7. Save Registration to PostgreSQL (Must succeed before reporting success)
      const created = await prisma.registration.create({
        data: {
          fullName: validData.fullName,
          email: validData.email,
          whatsapp: validData.whatsapp,
          location: validData.location || null,
          ageGroup: validData.ageGroup || null,
          role: validData.role,
          interests: validData.interests,
          hasIdea: validData.hasIdea,
          ideaDescription: validData.ideaDescription || null,
          explorationDescription: validData.explorationDescription || null,
          lookingFor: validData.lookingFor,
          linkedin: validData.linkedin || null,
          github: validData.github || null,
          website: validData.website || null,
          contactPreference: validData.contactPreference,
          consent: Boolean(validData.consent),
          status: "NEW",
        },
      });

      savedRegistration = {
        ...created,
        status: created.status,
      };
      console.log(`✅ [DB SUCCESS] Registration saved to PostgreSQL: ID ${savedRegistration.id} (${savedRegistration.email})`);
    } catch (dbError: unknown) {
      console.error("❌ [DB ERROR] Database persistence failed:", dbError);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unable to save your registration right now. Please try again in a few moments.",
          errorCode: "DATABASE_ERROR",
          timestamp: new Date().toISOString(),
        },
        { status: 503 }
      );
    } finally {
      if (normalizedEmail) {
        inFlightEmails.delete(normalizedEmail);
      }
    }

    // 8, 9, 10. Background Notifications (Admin Email, Admin WhatsApp, User Confirmation)
    // Non-blocking: failures here NEVER roll back or discard the saved database record
    const notificationResults = await dispatchAllNotifications(savedRegistration);
    const whatsappUrl =
      notificationResults.adminWhatsApp.clickToChatUrl ||
      generateWhatsAppClickToChatUrl(savedRegistration);

    // 11. Controlled Success Response
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Registration received successfully. Welcome to ADYK Inspire.",
        data: {
          id: savedRegistration.id,
          fullName: savedRegistration.fullName,
          email: savedRegistration.email,
          whatsappUrl,
          notifications: {
            adminEmail: notificationResults.adminEmail.success,
            adminWhatsApp: notificationResults.adminWhatsApp.success,
            userConfirmation: notificationResults.userEmail.success,
            whatsappFallbackUrl: whatsappUrl,
          },
        },
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (normalizedEmail) {
      inFlightEmails.delete(normalizedEmail);
    }
    const errorMsg = error instanceof Error ? error.message : "Internal error";
    console.error("❌ Unhandled server error in /api/registrations:", errorMsg);

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong while processing your registration. Please try again.",
        errorCode: "UNKNOWN_ERROR",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
