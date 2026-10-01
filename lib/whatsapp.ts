import { RegistrationRecord } from "@/types/registration";

/**
 * Build formatted plain text message for WhatsApp
 */
export function formatWhatsAppMessage(reg: Partial<RegistrationRecord>): string {
  return `🚀 *NEW ADYK INSPIRE REGISTRATION*

*Name:* ${reg.fullName || "N/A"}
*Role:* ${reg.role || "N/A"}
*Location:* ${reg.location || "N/A"}
*Email:* ${reg.email || "N/A"}
*WhatsApp:* ${reg.whatsapp || "N/A"}
*Interests:* ${(reg.interests || []).join(", ") || "N/A"}
*Has Idea:* ${reg.hasIdea || "N/A"}${
    reg.ideaDescription ? `\n*Idea:* ${reg.ideaDescription}` : ""
  }
*Looking For:* ${(reg.lookingFor || []).join(", ") || "N/A"}
*Registration ID:* ${reg.id || "Pending"}

Please review the registration in the ADYK system.`;
}

/**
 * Generate manual WhatsApp direct link fallback
 */
export function generateWhatsAppFallbackUrl(reg: Partial<RegistrationRecord>): string {
  const text = encodeURIComponent(formatWhatsAppMessage(reg));
  const adminNumber = process.env.WHATSAPP_ADMIN_NUMBER?.trim() || "918870605699";
  return `https://wa.me/${adminNumber}?text=${text}`;
}

/**
 * Send WhatsApp notification to Admin via Meta WhatsApp Business Cloud API
 */
export async function sendAdminWhatsAppNotification(
  reg: Partial<RegistrationRecord>
): Promise<{ success: boolean; fallbackUrl: string; messageId?: string; error?: string }> {
  const fallbackUrl = generateWhatsAppFallbackUrl(reg);
  const token = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  const adminNumber = process.env.WHATSAPP_ADMIN_NUMBER?.trim() || "918870605699";

  if (!token || !phoneId) {
    if (process.env.NODE_ENV === "development") {
      console.log("ℹ️ [WhatsApp Cloud API] Not configured in .env.local (optional). Direct WhatsApp URL ready.");
    }
    return {
      success: false,
      fallbackUrl,
      error: "WhatsApp API not configured — fallback available.",
    };
  }

  try {
    const messageBody = formatWhatsAppMessage(reg);

    const response = await fetch(
      `https://graph.facebook.com/v19.0/${phoneId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: adminNumber,
          type: "text",
          text: {
            preview_url: false,
            body: messageBody,
          },
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Meta WhatsApp Cloud API error response:", result);
      return {
        success: false,
        fallbackUrl,
        error: result.error?.message || "Meta API error",
      };
    }

    const messageId = result.messages?.[0]?.id;
    return { success: true, messageId, fallbackUrl };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Network error contacting Meta API";
    console.error("WhatsApp notification dispatch failed:", errorMsg);
    return { success: false, fallbackUrl, error: errorMsg };
  }
}
