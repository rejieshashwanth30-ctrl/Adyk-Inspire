import { RegistrationRecord } from "@/types/registration";

/**
 * ADYK Admin WhatsApp Number in E.164 international format without '+'
 * Recipient: +91 8870605699 -> "918870605699"
 */
export const ADMIN_WHATSAPP_NUMBER = "918870605699";

/**
 * Cleans phone number to international digits-only format
 */
export function cleanWhatsAppNumber(phone: string): string {
  if (!phone) return ADMIN_WHATSAPP_NUMBER;
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.startsWith("0")) return `91${digits.replace(/^0+/, "")}`;
  return digits;
}

/**
 * Builds the plain text WhatsApp message dynamically from registration details.
 * 
 * Rules:
 * 1. Only include fields that actually exist.
 * 2. If optional fields are empty, simply omit those lines.
 * 3. Never output "undefined", "null", or empty placeholders.
 * 4. No sensitive system or database details.
 */
export function buildWhatsAppMessage(reg: Partial<RegistrationRecord>): string {
  const lines: string[] = ["🔔 NEW ADYK INSPIRE REGISTRATION", ""];

  if (reg.fullName && reg.fullName.trim() !== "") {
    lines.push(`👤 Name: ${reg.fullName.trim()}`);
  }

  if (reg.whatsapp && reg.whatsapp.trim() !== "") {
    lines.push(`📱 Mobile: ${reg.whatsapp.trim()}`);
  }

  if (reg.location && reg.location.trim() !== "") {
    lines.push(`📍 Location: ${reg.location.trim()}`);
  }

  if (reg.role && reg.role.trim() !== "") {
    lines.push(`🎓 Role: ${reg.role.trim()}`);
  }

  if (reg.hasIdea && reg.hasIdea.trim() !== "") {
    const ideaText =
      reg.hasIdea === "YES"
        ? "Yes"
        : reg.hasIdea === "NO"
        ? "No"
        : reg.hasIdea === "STILL EXPLORING"
        ? "Still Exploring"
        : reg.hasIdea;
    lines.push(`💡 Has Idea: ${ideaText}`);
  }

  if (reg.interests && Array.isArray(reg.interests)) {
    const validInterests = reg.interests.filter(
      (item) => typeof item === "string" && item.trim() !== ""
    );
    if (validInterests.length > 0) {
      lines.push(`🚀 Interests: ${validInterests.join(", ")}`);
    }
  }

  // Include idea description if it exists
  if (reg.ideaDescription && reg.ideaDescription.trim() !== "") {
    lines.push("");
    lines.push("💭 Idea:");
    lines.push(reg.ideaDescription.trim());
  } else if (reg.explorationDescription && reg.explorationDescription.trim() !== "") {
    lines.push("");
    lines.push("💭 Idea / Exploring:");
    lines.push(reg.explorationDescription.trim());
  }

  // Include lookingFor if it exists
  if (reg.lookingFor && Array.isArray(reg.lookingFor)) {
    const validLooking = reg.lookingFor.filter(
      (item) => typeof item === "string" && item.trim() !== ""
    );
    if (validLooking.length > 0) {
      lines.push("");
      lines.push("🤝 Looking For:");
      lines.push(validLooking.join(", "));
    }
  }

  // Social / Portfolio Links (only add section if at least one exists)
  const links: string[] = [];
  if (reg.linkedin && reg.linkedin.trim() !== "") {
    links.push(`🔗 LinkedIn: ${reg.linkedin.trim()}`);
  }
  if (reg.github && reg.github.trim() !== "") {
    links.push(`💻 GitHub: ${reg.github.trim()}`);
  }
  if (reg.website && reg.website.trim() !== "") {
    links.push(`🌐 Website: ${reg.website.trim()}`);
  }

  if (links.length > 0) {
    lines.push("");
    lines.push(...links);
  }

  // Submission time formatted in Indian Standard Time (Asia/Kolkata)
  lines.push("");
  const dateObj = reg.createdAt ? new Date(reg.createdAt) : new Date();
  const timeFormatted = dateObj.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  lines.push(`🕐 Submitted: ${timeFormatted}`);

  lines.push("");
  lines.push("ADYK INSPIRE");
  lines.push("Learn. Build. Share. Inspire.");

  return lines.join("\n");
}

/**
 * Generates the WhatsApp Click-to-Chat URL using standard https://wa.me/{number}?text={encoded}
 * Does NOT require WhatsApp Business API or Meta Cloud API credentials.
 */
export function generateWhatsAppClickToChatUrl(
  reg: Partial<RegistrationRecord>,
  adminNumber: string = ADMIN_WHATSAPP_NUMBER
): string {
  const message = buildWhatsAppMessage(reg);
  const cleanNumber = cleanWhatsAppNumber(adminNumber);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Backward compatibility alias for fallback URL
 */
export function generateWhatsAppFallbackUrl(reg: Partial<RegistrationRecord>): string {
  return generateWhatsAppClickToChatUrl(reg);
}

export interface WhatsAppNotificationResult {
  success: boolean;
  clickToChatUrl: string;
  fallbackUrl: string;
}

/**
 * Synchronous, lightweight notification handler:
 * Generates the click-to-chat URL without any external API calls or tokens.
 */
export async function sendAdminWhatsAppNotification(
  reg: Partial<RegistrationRecord>
): Promise<WhatsAppNotificationResult> {
  const url = generateWhatsAppClickToChatUrl(reg);
  return {
    success: true,
    clickToChatUrl: url,
    fallbackUrl: url,
  };
}
