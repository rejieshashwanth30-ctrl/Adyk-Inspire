export type RoleOption =
  | "Student"
  | "Developer"
  | "Founder"
  | "Entrepreneur"
  | "Creator"
  | "Working Professional"
  | "Researcher"
  | "Technology Enthusiast"
  | "Other";

export type AgeGroupOption =
  | "Under 18"
  | "18–21"
  | "22–25"
  | "26–30"
  | "31+"
  | "Prefer not to say";

export type HasIdeaOption = "YES" | "NO" | "STILL EXPLORING";

export type ContactPreferenceOption = "WhatsApp" | "Email" | "Either";

export type RegistrationStatus =
  | "NEW"
  | "REVIEWING"
  | "CONTACTED"
  | "FOLLOW_UP"
  | "JOINED"
  | "CLOSED";

export interface RegistrationFormData {
  fullName: string;
  email: string;
  whatsapp: string;
  location?: string;
  ageGroup?: AgeGroupOption | string;
  role: RoleOption | string;
  interests: string[];
  hasIdea: HasIdeaOption | string;
  ideaDescription?: string;
  explorationDescription?: string;
  lookingFor: string[];
  linkedin?: string;
  github?: string;
  website?: string;
  contactPreference: ContactPreferenceOption | string;
  consent: boolean;
  website_url_hidden?: string; // Honeypot field
}

export interface RegistrationRecord {
  id: string;
  fullName: string;
  email: string;
  whatsapp: string;
  location?: string | null;
  ageGroup?: string | null;
  role: string;
  interests: string[];
  hasIdea: string;
  ideaDescription?: string | null;
  explorationDescription?: string | null;
  lookingFor: string[];
  linkedin?: string | null;
  github?: string | null;
  website?: string | null;
  contactPreference: string;
  consent: boolean;
  status: RegistrationStatus | string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  contactedAt?: string | Date | null;
  notes?: string | null;
}

export type ErrorCategory =
  | "VALIDATION_ERROR"
  | "RATE_LIMIT_ERROR"
  | "DUPLICATE_SUBMISSION"
  | "DATABASE_ERROR"
  | "EMAIL_ERROR"
  | "WHATSAPP_ERROR"
  | "UNKNOWN_ERROR";

export interface RegistrationResponseData {
  id: string;
  fullName: string;
  email: string;
  whatsappUrl?: string;
  alreadyRegistered?: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
  errorCode?: ErrorCategory;
  timestamp: string;
}
