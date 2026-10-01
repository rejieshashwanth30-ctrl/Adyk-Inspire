/**
 * Sanitizes a string by stripping potentially malicious HTML/scripts
 * and trimming excess whitespace.
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // Strip HTML angle brackets
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Strip control characters
    .trim();
}

/**
 * Normalizes an email address
 */
export function normalizeEmail(email: unknown): string {
  if (typeof email !== "string") return "";
  return email.trim().toLowerCase();
}

/**
 * Normalizes a phone number, preserving international format
 */
export function normalizePhone(phone: unknown): string {
  if (typeof phone !== "string") return "";
  const cleaned = phone.trim().replace(/[^\d+]/g, "");
  // If 10 digits without country code, default to Indian country code +91
  if (/^\d{10}$/.test(cleaned)) {
    return `+91${cleaned}`;
  }
  return cleaned;
}

/**
 * Normalizes URL string, ensuring protocol prefix if provided
 */
export function normalizeUrl(url: unknown): string | undefined {
  if (!url || typeof url !== "string") return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}
