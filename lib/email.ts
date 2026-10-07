import { Resend } from "resend";
import { renderAdminEmailHtml } from "@/emails/registration-admin";
import { renderConfirmationEmailHtml } from "@/emails/registration-confirmation";
import { RegistrationRecord } from "@/types/registration";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  return apiKey ? new Resend(apiKey) : null;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "adykcompany.in@gmail.com";
const EMAIL_FROM = process.env.EMAIL_FROM || "ADYK Inspire <notifications@adyk.in>";
const RESEND_SANDBOX_FROM = "ADYK Inspire <onboarding@resend.dev>";

/**
 * Send admin email alert for new community registration
 */
export async function sendAdminNotificationEmail(
  registration: Partial<RegistrationRecord>
): Promise<{ success: boolean; id?: string; error?: string }> {
  const resend = getResendClient();

  if (!resend) {
    if (process.env.NODE_ENV === "development") {
      console.log("ℹ️ [Resend Email] RESEND_API_KEY not configured in .env.local — admin notification email skipped.");
    }
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const html = renderAdminEmailHtml(registration);
    let { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: `🚀 New ADYK Inspire Registration — ${registration.fullName}`,
      html,
    });

    // Auto-fallback: If custom domain is not yet verified on Resend, retry with Resend sandbox domain
    if (error && error.message && (error.message.includes("domain") || error.message.includes("verify"))) {
      console.log("ℹ️ [Resend Email] Custom domain not verified on Resend. Retrying with onboarding@resend.dev...");
      const retry = await resend.emails.send({
        from: RESEND_SANDBOX_FROM,
        to: ADMIN_EMAIL,
        subject: `🚀 New ADYK Inspire Registration — ${registration.fullName}`,
        html,
      });
      data = retry.data;
      error = retry.error;
    }

    if (error) {
      console.error("Resend admin email error:", error);
      return { success: false, error: error.message };
    }

    console.log(`✅ Admin notification email sent successfully (ID: ${data?.id})`);
    return { success: true, id: data?.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error sending admin email";
    console.error("Failed to send admin email:", message);
    return { success: false, error: message };
  }
}

/**
 * Send welcome / confirmation email to the applicant
 */
export async function sendUserConfirmationEmail(
  fullName: string,
  userEmail: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  const resend = getResendClient();

  if (!resend) {
    if (process.env.NODE_ENV === "development") {
      console.log("ℹ️ [Resend Email] RESEND_API_KEY not configured in .env.local — user confirmation email skipped.");
    }
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const html = renderConfirmationEmailHtml(fullName);
    let { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: userEmail,
      subject: "Welcome to ADYK Inspire 🚀",
      html,
    });

    // Auto-fallback: If custom domain is not yet verified on Resend, retry with Resend sandbox domain
    if (error && error.message && (error.message.includes("domain") || error.message.includes("verify"))) {
      console.log("ℹ️ [Resend Email] Retrying confirmation email via onboarding@resend.dev...");
      const retry = await resend.emails.send({
        from: RESEND_SANDBOX_FROM,
        to: userEmail,
        subject: "Welcome to ADYK Inspire 🚀",
        html,
      });
      data = retry.data;
      error = retry.error;
    }

    if (error) {
      if (
        error.message &&
        (error.message.includes("testing email address") ||
          error.message.includes("verify") ||
          error.message.includes("`to` field"))
      ) {
        console.log(
          `ℹ️ [Resend Sandbox] Confirmation email to "${userEmail}" skipped because custom domain (adyk.in) is not verified on Resend. Sandbox accounts can only send to the account owner (adykcompany.in@gmail.com). Verify adyk.in on https://resend.com/domains to send to all applicants.`
        );
      } else {
        console.error("Resend confirmation email error:", error);
      }
      return { success: false, error: error.message };
    }

    console.log(`✅ Confirmation email sent to ${userEmail} (ID: ${data?.id})`);
    return { success: true, id: data?.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error sending user email";
    console.error("Failed to send confirmation email:", message);
    return { success: false, error: message };
  }
}
