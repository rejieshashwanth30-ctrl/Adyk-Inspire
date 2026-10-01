import { RegistrationRecord } from "@/types/registration";
import { sendAdminNotificationEmail, sendUserConfirmationEmail as sendConfirmation } from "./email";
import { sendAdminWhatsAppNotification } from "./whatsapp";

export interface NotificationResults {
  adminEmail: { success: boolean; error?: string };
  adminWhatsApp: { success: boolean; error?: string; fallbackUrl?: string };
  userEmail: { success: boolean; error?: string };
}

/**
 * Dispatches all notification channels in parallel using Promise.allSettled.
 * Crucial guarantee: Never throws or halts the registration flow.
 */
export async function dispatchAllNotifications(
  registration: Partial<RegistrationRecord>
): Promise<NotificationResults> {
  const results: NotificationResults = {
    adminEmail: { success: false },
    adminWhatsApp: { success: false },
    userEmail: { success: false },
  };

  const tasks = [
    // 1. Admin Email
    sendAdminNotificationEmail(registration).then((res) => {
      results.adminEmail = res;
    }),

    // 2. Admin WhatsApp
    sendAdminWhatsAppNotification(registration).then((res) => {
      results.adminWhatsApp = {
        success: res.success,
        error: res.error,
        fallbackUrl: res.fallbackUrl,
      };
    }),

    // 3. User Confirmation Email
    (async () => {
      if (registration.fullName && registration.email) {
        const res = await sendConfirmation(registration.fullName, registration.email);
        results.userEmail = res;
      }
    })(),
  ];

  const outcomes = await Promise.allSettled(tasks);

  outcomes.forEach((outcome, idx) => {
    if (outcome.status === "rejected") {
      console.error(`Notification channel [${idx}] rejected unexpectedly:`, outcome.reason);
    }
  });

  return results;
}
