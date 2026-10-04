import { RegistrationRecord } from "@/types/registration";
import { generateWhatsAppClickToChatUrl } from "./whatsapp";

export interface NotificationResults {
  adminEmail: { success: boolean; error?: string };
  adminWhatsApp: { success: boolean; error?: string; fallbackUrl?: string; clickToChatUrl?: string };
  userEmail: { success: boolean; error?: string };
}

/**
 * Dispatches notification workflow:
 * - Email is disabled per user requirements (no Resend API key or email setup needed).
 * - Generates the direct WhatsApp Click-to-Chat URL (https://wa.me/918870605699?text=...).
 * - Fast, synchronous, 100% reliable with zero external API dependencies.
 */
export async function dispatchAllNotifications(
  registration: Partial<RegistrationRecord>
): Promise<NotificationResults> {
  const whatsappUrl = generateWhatsAppClickToChatUrl(registration);

  return {
    adminEmail: { success: false, error: "Email notifications disabled per workflow configuration." },
    adminWhatsApp: {
      success: true,
      clickToChatUrl: whatsappUrl,
      fallbackUrl: whatsappUrl,
    },
    userEmail: { success: false, error: "User email disabled per workflow configuration." },
  };
}
