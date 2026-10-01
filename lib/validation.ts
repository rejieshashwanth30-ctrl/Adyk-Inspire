import { z } from "zod";
import { normalizeEmail, normalizePhone, normalizeUrl, sanitizeString } from "./sanitize";

export const RoleEnum = z.enum([
  "Student",
  "Developer",
  "Founder",
  "Entrepreneur",
  "Creator",
  "Working Professional",
  "Researcher",
  "Technology Enthusiast",
  "Other",
]);

export const AgeGroupEnum = z.enum([
  "Under 18",
  "18–21",
  "18-21",
  "22–25",
  "22-25",
  "26–30",
  "26-30",
  "31+",
  "Prefer not to say",
]);

export const HasIdeaEnum = z.enum(["YES", "NO", "STILL EXPLORING"]);

export const ContactPreferenceEnum = z.enum(["WhatsApp", "Email", "Either"]);

// Phone number regex supporting international and standard formats (+91, 10-15 digits)
const phoneRegex = /^\+?[1-9]\d{6,14}$/;

export const registrationSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters.")
      .max(100, "Full name is too long.")
      .transform(sanitizeString),

    email: z
      .string()
      .email("Please provide a valid email address.")
      .max(255, "Email address is too long.")
      .transform(normalizeEmail),

    whatsapp: z
      .string()
      .transform(normalizePhone)
      .refine((val) => phoneRegex.test(val.replace(/\s+/g, "")), {
        message: "Please enter a valid phone or WhatsApp number with country code (e.g. +91 8870605699).",
      }),

    location: z
      .string()
      .max(120, "Location is too long.")
      .optional()
      .transform((val) => (val ? sanitizeString(val) : undefined)),

    ageGroup: AgeGroupEnum.optional().or(z.literal("")),

    role: RoleEnum,

    interests: z
      .array(z.string())
      .min(1, "Please select at least one area of interest."),

    hasIdea: HasIdeaEnum,

    ideaDescription: z
      .string()
      .max(2000, "Idea description cannot exceed 2000 characters.")
      .optional()
      .transform((val) => (val ? sanitizeString(val) : undefined)),

    explorationDescription: z
      .string()
      .max(2000, "Exploration description cannot exceed 2000 characters.")
      .optional()
      .transform((val) => (val ? sanitizeString(val) : undefined)),

    lookingFor: z.array(z.string()).default([]),

    linkedin: z
      .string()
      .optional()
      .transform(normalizeUrl)
      .refine(
        (val) => !val || /^https?:\/\/.+/i.test(val),
        "Please enter a valid LinkedIn URL."
      ),

    github: z
      .string()
      .optional()
      .transform(normalizeUrl)
      .refine(
        (val) => !val || /^https?:\/\/.+/i.test(val),
        "Please enter a valid GitHub or portfolio URL."
      ),

    website: z
      .string()
      .optional()
      .transform(normalizeUrl)
      .refine(
        (val) => !val || /^https?:\/\/.+/i.test(val),
        "Please enter a valid website URL."
      ),

    contactPreference: ContactPreferenceEnum.default("Either"),

    consent: z.boolean().refine((val) => val === true, {
      message: "You must agree to be contacted by the ADYK team.",
    }),

    // Honeypot field for bot spam trapping
    website_url_hidden: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // If the user marked YES for having an idea, ideaDescription is required
    if (data.hasIdea === "YES") {
      if (!data.ideaDescription || data.ideaDescription.trim().length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["ideaDescription"],
          message: "Please describe your idea or what you are currently building.",
        });
      }
    }
  });

export type RegistrationInput = z.infer<typeof registrationSchema>;
