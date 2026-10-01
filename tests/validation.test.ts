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

test("Rate Limiter: Throttles duplicate submissions by email", () => {
  const testEmail = "test_rate_unique@adyk.in";
  const first = rateLimitRegistration("192.168.1.10", testEmail);
  assert.equal(first.allowed, true);

  // Immediate second submission with same email should be blocked
  const second = rateLimitRegistration("192.168.1.10", testEmail);
  assert.equal(second.allowed, false);
});
