import { NextRequest, NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validation";
import { rateLimitRegistration } from "@/lib/rate-limit";
import { prisma } from "@/lib/db";
import { dispatchAllNotifications } from "@/lib/notifications";
import { ApiResponse, RegistrationRecord } from "@/types/registration";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. IP identification for rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    const body = await req.json();

    // 2. Spam Honeypot Detection
    if (body.website_url_hidden && body.website_url_hidden.trim() !== "") {
      console.warn(`[SPAM BLOCKED] Honeypot triggered from IP: ${ip}`);
      // Return 200 to fool bots without persisting
      return NextResponse.json<ApiResponse>(
        {
          success: true,
          message: "Registration received.",
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    // 3. Rate Limit Check
    const rateLimit = rateLimitRegistration(ip, body.email);
    if (!rateLimit.allowed) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: rateLimit.reason || "Rate limit exceeded. Please try again later.",
          timestamp: new Date().toISOString(),
        },
        { status: 429 }
      );
    }

    // 4. Zod Validation & Sanitization
    const validationResult = registrationSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string[]> = {};
      const issues = validationResult.error.issues || (validationResult.error as unknown as { errors: typeof validationResult.error.issues }).errors;
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
          timestamp: new Date().toISOString(),
        },
        { status: 422 }
      );
    }

    const validData = validationResult.data;

    // 5. Duplicate Check & Save to Database
    let savedRegistration: RegistrationRecord;

    try {
      // Check duplicate within the last 10 minutes in DB if DB available
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      const recentExisting = await prisma.registration.findFirst({
        where: {
          email: validData.email,
          createdAt: { gte: tenMinutesAgo },
        },
      });

      if (recentExisting) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            message: "A registration with this email was recently received. Our team will contact you shortly.",
            timestamp: new Date().toISOString(),
          },
          { status: 409 }
        );
      }

      // Persist to PostgreSQL
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
    } catch (dbError) {
      console.error("❌ Database persistence failed:", dbError);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message:
            "Database unavailable. Unable to save registration to PostgreSQL. Please check database connection.",
          timestamp: new Date().toISOString(),
        },
        { status: 503 }
      );
    }

    // 6. Asynchronous Background Notifications (Safe - never fails registration)
    const notificationResults = await dispatchAllNotifications(savedRegistration);

    // 7. Controlled Success Response
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Registration received successfully. Welcome to ADYK Inspire.",
        data: {
          id: savedRegistration.id,
          fullName: savedRegistration.fullName,
          email: savedRegistration.email,
          notifications: {
            adminEmail: notificationResults.adminEmail.success,
            adminWhatsApp: notificationResults.adminWhatsApp.success,
            userConfirmation: notificationResults.userEmail.success,
            whatsappFallbackUrl: notificationResults.adminWhatsApp.fallbackUrl,
          },
        },
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Internal error";
    console.error("Unhandled error in /api/registrations:", errorMsg);

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong while processing your registration. Please try again or contact ADYK directly at +91 8870605699.",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
