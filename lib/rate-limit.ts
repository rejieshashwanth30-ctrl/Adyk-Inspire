interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipStore = new Map<string, RateLimitRecord>();
const emailStore = new Map<string, RateLimitRecord>();

// Cleanup stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of ipStore.entries()) {
      if (value.resetAt < now) ipStore.delete(key);
    }
    for (const [key, value] of emailStore.entries()) {
      if (value.resetAt < now) emailStore.delete(key);
    }
  }, 5 * 60 * 1000);
}

/**
 * Checks if a key has exceeded its limit within the time window
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
 * Rate limit check for registrations:
 * - 5 submissions per 10 minutes per IP
 * - 1 submission per 5 minutes per email (duplicate spam protection)
 */
export function rateLimitRegistration(ip: string, email?: string) {
  const ipCheck = checkLimit(ipStore, `ip_${ip}`, 5, 10 * 60 * 1000);
  if (!ipCheck.allowed) {
    return {
      allowed: false,
      reason: "Too many registration attempts from this connection. Please wait a few minutes.",
      resetAt: ipCheck.resetAt,
    };
  }

  if (email) {
    const emailCheck = checkLimit(emailStore, `email_${email.toLowerCase()}`, 1, 5 * 60 * 1000);
    if (!emailCheck.allowed) {
      return {
        allowed: false,
        reason: "A registration with this email address was already submitted recently. Please wait before submitting again.",
        resetAt: emailCheck.resetAt,
      };
    }
  }

  return { allowed: true };
}
