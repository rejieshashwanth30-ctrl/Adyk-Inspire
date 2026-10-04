import test from "node:test";
import assert from "node:assert/strict";
import { registrationSchema } from "../lib/validation";
import { rateLimitRegistration } from "../lib/rate-limit";
import { sanitizeString, normalizeEmail, normalizePhone } from "../lib/sanitize";

test("Sanitization and normalization utilities", () => {
  // HTML stripping
  const dirty = "<script>alert('xss')</script>John Doe";
  assert.equal(sanitizeString(dirty), "scriptalert('xss')/scriptJohn Doe");

  // Email normalization
  assert.equal(normalizeEmail("  TEST.User@Example.COM  "), "test.user@example.com");

  // Phone normalization
  assert.equal(normalizePhone("8870605699"), "+918870605699");
  assert.equal(normalizePhone("+91 8870605699"), "+918870605699");
});

test("Validation Schema: Accepts valid registration", () => {
  const payload = {
    fullName: "Alex Rivera",
    email: "alex@example.com",
    whatsapp: "+91 8870605699",
    location: "Bangalore",
    ageGroup: "22–25",
    role: "Developer",
    interests: ["AI / ML", "Software Development"],
    hasIdea: "YES",
    ideaDescription: "A distributed intelligence orchestrator for edge nodes.",
    lookingFor: ["Find Collaborators", "Build a Project"],
    contactPreference: "WhatsApp",
    consent: true,
  };

  const result = registrationSchema.safeParse(payload);
  assert.equal(result.success, true);
});

test("Validation Schema: Rejects missing full name", () => {
  const payload = {
    fullName: "",
    email: "alex@example.com",
    whatsapp: "+91 8870605699",
    role: "Developer",
    interests: ["AI / ML"],
    hasIdea: "NO",
    consent: true,
  };

  const result = registrationSchema.safeParse(payload);
  assert.equal(result.success, false);
  if (!result.success) {
    const issues = result.error.issues;
    const nameErr = issues.find((e) => e.path.includes("fullName"));
    assert.ok(nameErr, "Should have error on fullName");
  }
});

test("Validation Schema: Rejects invalid email", () => {
  const payload = {
    fullName: "Alex Rivera",
    email: "invalid-email-string",
    whatsapp: "+91 8870605699",
    role: "Developer",
    interests: ["AI / ML"],
    hasIdea: "NO",
    consent: true,
  };

  const result = registrationSchema.safeParse(payload);
  assert.equal(result.success, false);
  if (!result.success) {
    const issues = result.error.issues;
    const emailErr = issues.find((e) => e.path.includes("email"));
    assert.ok(emailErr, "Should have error on email");
  }
});

test("Validation Schema: Rejects invalid WhatsApp phone number", () => {
  const payload = {
    fullName: "Alex Rivera",
    email: "alex@example.com",
    whatsapp: "123", // too short
    role: "Developer",
    interests: ["AI / ML"],
    hasIdea: "NO",
    consent: true,
  };

  const result = registrationSchema.safeParse(payload);
  assert.equal(result.success, false);
  if (!result.success) {
    const issues = result.error.issues;
    const phoneErr = issues.find((e) => e.path.includes("whatsapp"));
    assert.ok(phoneErr, "Should have error on whatsapp");
  }
});

test("Validation Schema: Rejects empty interests", () => {
  const payload = {
    fullName: "Alex Rivera",
    email: "alex@example.com",
    whatsapp: "+91 8870605699",
    role: "Developer",
    interests: [], // Empty
    hasIdea: "NO",
    consent: true,
  };

  const result = registrationSchema.safeParse(payload);
  assert.equal(result.success, false);
  if (!result.success) {
    const issues = result.error.issues;
    const intErr = issues.find((e) => e.path.includes("interests"));
    assert.ok(intErr, "Should have error on interests");
  }
});

test("Validation Schema: Requires idea description when hasIdea = YES", () => {
  const payload = {
    fullName: "Alex Rivera",
    email: "alex@example.com",
    whatsapp: "+91 8870605699",
    role: "Developer",
    interests: ["AI / ML"],
    hasIdea: "YES",
    ideaDescription: "", // Missing when YES
    consent: true,
  };

  const result = registrationSchema.safeParse(payload);
  assert.equal(result.success, false);
  if (!result.success) {
    const issues = result.error.issues;
    const ideaErr = issues.find((e) => e.path.includes("ideaDescription"));
    assert.ok(ideaErr, "Should have error on ideaDescription");
  }
});

test("Validation Schema: Rejects missing consent", () => {
  const payload = {
    fullName: "Alex Rivera",
    email: "alex@example.com",
    whatsapp: "+91 8870605699",
    role: "Developer",
    interests: ["AI / ML"],
    hasIdea: "NO",
    consent: false, // Consent must be true
  };

  const result = registrationSchema.safeParse(payload);
  assert.equal(result.success, false);
  if (!result.success) {
    const issues = result.error.issues;
    const consentErr = issues.find((e) => e.path.includes("consent"));
    assert.ok(consentErr, "Should have error on consent");
  }
});

test("Rate Limiter: Allows reasonable submissions and throttles bot floods", () => {
  const testEmail = "test_rate_flood@adyk.in";
  const testIp = "192.168.1.100";

  // First 5 attempts from this email are permitted (allows typo fixes, retrying)
  for (let i = 0; i < 5; i++) {
    const res = rateLimitRegistration(testIp, testEmail);
    assert.equal(res.allowed, true, `Attempt ${i + 1} should be allowed`);
  }

  // 6th attempt within window should be throttled
  const throttled = rateLimitRegistration(testIp, testEmail);
  assert.equal(throttled.allowed, false, "Abusive flood should be throttled");
  assert.equal(throttled.errorCode, "RATE_LIMIT_ERROR");
});

test("WhatsApp Click-to-Chat: Builds dynamic message and omits empty optional fields", () => {
  const { buildWhatsAppMessage, generateWhatsAppClickToChatUrl } = require("../lib/whatsapp");

  const reg = {
    fullName: "Alex Rivera",
    whatsapp: "+91 8870605699",
    location: "Bangalore",
    role: "Developer",
    hasIdea: "YES",
    interests: ["AI / ML", "Startups"],
    ideaDescription: "Autonomous developer agents.",
    lookingFor: ["Find Collaborators", "Build a Project"],
    linkedin: "https://linkedin.com/in/alex",
    // github and website are intentionally empty/omitted
    createdAt: new Date("2026-10-04T12:00:00Z"),
  };

  const message = buildWhatsAppMessage(reg);

  assert.ok(message.includes("🔔 NEW ADYK INSPIRE REGISTRATION"));
  assert.ok(message.includes("👤 Name: Alex Rivera"));
  assert.ok(message.includes("📱 Mobile: +91 8870605699"));
  assert.ok(message.includes("📍 Location: Bangalore"));
  assert.ok(message.includes("🎓 Role: Developer"));
  assert.ok(message.includes("💡 Has Idea: Yes"));
  assert.ok(message.includes("🚀 Interests: AI / ML, Startups"));
  assert.ok(message.includes("💭 Idea:\nAutonomous developer agents."));
  assert.ok(message.includes("🤝 Looking For:\nFind Collaborators, Build a Project"));
  assert.ok(message.includes("🔗 LinkedIn: https://linkedin.com/in/alex"));
  assert.ok(!message.includes("GitHub:"), "Empty GitHub should be omitted");
  assert.ok(!message.includes("Website:"), "Empty Website should be omitted");
  assert.ok(!message.includes("undefined"), "Should never contain 'undefined'");
  assert.ok(!message.includes("null"), "Should never contain 'null'");
  assert.ok(message.includes("ADYK INSPIRE\nLearn. Build. Share. Inspire."));

  const url = generateWhatsAppClickToChatUrl(reg);
  assert.ok(url.startsWith("https://wa.me/918870605699?text="));
  assert.ok(url.includes(encodeURIComponent("Alex Rivera")));
});

