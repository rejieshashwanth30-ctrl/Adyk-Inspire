import { ErrorCategory } from "@/types/registration";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipStore = new Map<string, RateLimitRecord>();
const emailStore = new Map<string, RateLimitRecord>();

// Periodic memory cleanup to prevent memory leaks in long-running processes
if (typeof setInterval !== "undefined") {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, value] of ipStore.entries()) {
      if (value.resetAt < now) ipStore.delete(key);
    }
    for (const [key, value] of emailStore.entries()) {
      if (value.resetAt < now) emailStore.delete(key);
    }
  }, 5 * 60 * 1000);
  cleanupTimer.unref?.();
}

/**
 * Checks if a key has exceeded its limit within the time window.
 */
function checkLimit(
  store: Map<string, RateLimitRecord>,
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = store.get(key);

  if (!record || record.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetAt: record.resetAt,
  };
}

/**
 * Production-safe rate limiting for registrations:
 * - 30 submissions per 10 minutes per IP (supports shared college / co-working WiFi)
 * - 5 submissions per 10 minutes per email (allows retrying typo fixes while preventing bot floods)
 * 
 * Note: Accidental double-clicks and rapid re-submits are handled idempotently
 * in the registration API route to avoid blocking legitimate users.
 */
export function rateLimitRegistration(
  ip: string,
  email?: string
): { allowed: boolean; reason?: string; errorCode?: ErrorCategory; resetAt?: number } {
  // IP-level rate limiting
  const ipCheck = checkLimit(ipStore, `ip_${ip}`, 30, 10 * 60 * 1000);
  if (!ipCheck.allowed) {
    return {
      allowed: false,
      reason: "Too many registration attempts from this connection. Please wait a few minutes.",
      errorCode: "RATE_LIMIT_ERROR",
      resetAt: ipCheck.resetAt,
    };
  }

  // Flood protection per email (allows retrying and corrections, prevents script flooding)
  if (email && email.trim() !== "") {
    const normalized = email.trim().toLowerCase();
    const emailCheck = checkLimit(emailStore, `email_${normalized}`, 5, 10 * 60 * 1000);
    if (!emailCheck.allowed) {
      return {
        allowed: false,
        reason: "Too many submission attempts for this email address. Please wait a few minutes before trying again.",
        errorCode: "RATE_LIMIT_ERROR",
        resetAt: emailCheck.resetAt,
      };
    }
  }

  return { allowed: true };
}
