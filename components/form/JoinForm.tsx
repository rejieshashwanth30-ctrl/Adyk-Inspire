"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  RoleOption,
  AgeGroupOption,
  HasIdeaOption,
  ContactPreferenceOption,
  RegistrationFormData,
} from "@/types/registration";
import { Check, AlertCircle, ArrowRight, Loader2 } from "lucide-react";

export function JoinForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: "",
    email: "",
    whatsapp: "",
    location: "",
    ageGroup: "",
    role: "",
    interests: [],
    hasIdea: "",
    ideaDescription: "",
    explorationDescription: "",
    lookingFor: [],
    linkedin: "",
    github: "",
    website: "",
    contactPreference: "Either",
    consent: false,
    website_url_hidden: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const roleOptions: RoleOption[] = [
    "Student",
    "Developer",
    "Founder",
    "Entrepreneur",
    "Creator",
    "Working Professional",
    "Researcher",
    "Technology Enthusiast",
    "Other",
  ];

  const ageGroupOptions: AgeGroupOption[] = [
    "Under 18",
    "18–21",
    "22–25",
    "26–30",
    "31+",
    "Prefer not to say",
  ];

  const interestOptions = [
    "Startups",
    "AI / ML",
    "Software Development",
    "Hardware / IoT",
    "Business",
    "Entrepreneurship",
    "Product Building",
    "Networking",
    "Learning",
    "Mentorship",
    "Innovation",
    "Technology",
  ];

  const lookingForOptions = [
    "Learn",
    "Exchange Ideas",
    "Find Collaborators",
    "Get Feedback",
    "Build a Project",
    "Explore Startup Opportunities",
    "Networking",
    "Mentorship",
    "Technology Guidance",
    "Other",
  ];

  const contactPrefOptions: ContactPreferenceOption[] = ["WhatsApp", "Email", "Either"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const toggleInterest = (item: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(item);
      const next = exists
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item];
      return { ...prev, interests: next };
    });
    if (errors.interests) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.interests;
        return copy;
      });
    }
  };

  const toggleLookingFor = (item: string) => {
    setFormData((prev) => {
      const exists = prev.lookingFor.includes(item);
      const next = exists
        ? prev.lookingFor.filter((i) => i !== item)
        : [...prev.lookingFor, item];
      return { ...prev, lookingFor: next };
    });
  };

  const validateClientSide = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    const cleanedPhone = formData.whatsapp.replace(/[^\d+]/g, "");
    if (!cleanedPhone || cleanedPhone.length < 8) {
      newErrors.whatsapp = "Please enter a valid WhatsApp phone number with country code.";
    }

    if (!formData.role) {
      newErrors.role = "Please select what best describes you.";
    }

    if (formData.interests.length === 0) {
      newErrors.interests = "Please select at least one area of interest.";
    }

    if (!formData.hasIdea) {
      newErrors.hasIdea = "Please indicate if you currently have an idea.";
    } else if (
      formData.hasIdea === "YES" &&
      (!formData.ideaDescription || formData.ideaDescription.trim().length < 5)
    ) {
      newErrors.ideaDescription = "Please tell us a little about what you are building or thinking of building.";
    }

    if (!formData.consent) {
      newErrors.consent = "You must agree to be contacted by the ADYK team.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateClientSide()) {
      // Scroll to the first error
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(`field-${firstErrorKey}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.errors) {
          const mappedErrors: Record<string, string> = {};
          Object.keys(result.errors).forEach((key) => {
            mappedErrors[key] = result.errors[key][0];
          });
          setErrors(mappedErrors);
        }
        setServerError(result.message || "Failed to submit registration.");
        setIsSubmitting(false);
        return;
      }

      // Store submitted name in session storage for personalized success page
      if (typeof window !== "undefined") {
        sessionStorage.setItem("adyk_reg_name", formData.fullName);
        sessionStorage.setItem("adyk_reg_email", formData.email);
        sessionStorage.setItem("adyk_reg_id", result.data?.id || "");
      }

      // Smooth transition to /success
      router.push(`/success?id=${encodeURIComponent(result.data?.id || "")}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error";
      setServerError(`Unable to submit registration (${msg}). Please try again or reach out on WhatsApp: +91 8870605699.`);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-16">
      
      {/* Server Error Alert */}
      {serverError && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/80 text-red-200 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold block mb-0.5">Submission Error</span>
            <span>{serverError}</span>
          </div>
        </div>
      )}

      {/* Invisible Honeypot */}
      <input
        type="text"
        name="website_url_hidden"
        value={formData.website_url_hidden}
        onChange={handleInputChange}
        tabIndex={-1}
        autoComplete="off"
        className="opacity-0 absolute -z-50 pointer-events-none h-0 w-0"
        aria-hidden="true"
      />

      {/* SECTION 1: PERSONAL INFORMATION */}
      <div id="field-personal" className="p-8 sm:p-10 rounded-2xl bg-neutral-950/70 border border-neutral-900 space-y-8">
        <div className="border-b border-neutral-900 pb-4">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 block mb-1">
            SECTION 01
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
            Personal Information
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Full Name */}
          <div id="field-fullName" className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block">
              Full Name <span className="text-white">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. John Doe"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg bg-neutral-900/80 border text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-white transition-all ${
                errors.fullName ? "border-red-500/80 bg-red-950/10" : "border-neutral-800 focus:border-neutral-500"
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-red-400 font-mono">{errors.fullName}</p>
            )}
          </div>

          {/* Email Address */}
          <div id="field-email" className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block">
              Email Address <span className="text-white">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="e.g. john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg bg-neutral-900/80 border text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-white transition-all ${
                errors.email ? "border-red-500/80 bg-red-950/10" : "border-neutral-800 focus:border-neutral-500"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-400 font-mono">{errors.email}</p>
            )}
          </div>

          {/* WhatsApp Number */}
          <div id="field-whatsapp" className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block">
              WhatsApp Number <span className="text-white">*</span>
            </label>
            <input
              type="tel"
              name="whatsapp"
              placeholder="e.g. +91 8870605699"
              value={formData.whatsapp}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg bg-neutral-900/80 border text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-white transition-all ${
                errors.whatsapp ? "border-red-500/80 bg-red-950/10" : "border-neutral-800 focus:border-neutral-500"
              }`}
            />
            {errors.whatsapp && (
              <p className="text-xs text-red-400 font-mono">{errors.whatsapp}</p>
            )}
          </div>

          {/* City / Location */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block">
              City / Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Bangalore, India"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-neutral-900/80 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-white transition-all"
            />
          </div>

        </div>

        {/* Age Group */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block">
            Age Group
          </label>
          <div className="flex flex-wrap gap-2.5">
            {ageGroupOptions.map((age) => (
              <button
                type="button"
                key={age}
                onClick={() => setFormData((prev) => ({ ...prev, ageGroup: age }))}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                  formData.ageGroup === age
                    ? "bg-white text-black border-white"
                    : "bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white"
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* SECTION 2: ABOUT YOU */}
      <div id="field-role" className="p-8 sm:p-10 rounded-2xl bg-neutral-950/70 border border-neutral-900 space-y-6">
        <div className="border-b border-neutral-900 pb-4">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 block mb-1">
            SECTION 02
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
            What Best Describes You? <span className="text-white">*</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1">Select one role that aligns most with your current primary focus.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {roleOptions.map((role) => (
            <button
              type="button"
              key={role}
              onClick={() => {
                setFormData((prev) => ({ ...prev, role }));
                if (errors.role) {
                  setErrors((prev) => {
                    const c = { ...prev };
                    delete c.role;
                    return c;
                  });
                }
              }}
              className={`p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                formData.role === role
                  ? "bg-white text-black border-white font-semibold"
                  : "bg-neutral-900/60 text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white"
              }`}
            >
              <span className="text-xs uppercase tracking-wider">{role}</span>
              {formData.role === role && <Check className="w-4 h-4 text-black flex-shrink-0" />}
            </button>
          ))}
        </div>
        {errors.role && (
          <p className="text-xs text-red-400 font-mono mt-2">{errors.role}</p>
        )}
      </div>

      {/* SECTION 3: INTERESTS */}
      <div id="field-interests" className="p-8 sm:p-10 rounded-2xl bg-neutral-950/70 border border-neutral-900 space-y-6">
        <div className="border-b border-neutral-900 pb-4">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 block mb-1">
            SECTION 03
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
            What Are You Interested In? <span className="text-white">*</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1">Select all categories that you want to explore or build around.</p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {interestOptions.map((item) => {
            const isSelected = formData.interests.includes(item);
            return (
              <button
                type="button"
                key={item}
                onClick={() => toggleInterest(item)}
                className={`px-4 py-2.5 rounded-full text-xs uppercase tracking-wider border transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-white text-black border-white font-medium"
                    : "bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white"
                }`}
              >
                <span>{item}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
        {errors.interests && (
          <p className="text-xs text-red-400 font-mono">{errors.interests}</p>
        )}
      </div>

      {/* SECTION 4: YOUR IDEA */}
      <div id="field-hasIdea" className="p-8 sm:p-10 rounded-2xl bg-neutral-950/70 border border-neutral-900 space-y-6">
        <div className="border-b border-neutral-900 pb-4">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 block mb-1">
            SECTION 04
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
            Do You Currently Have A Startup, Product Or Project Idea? <span className="text-white">*</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(["YES", "NO", "STILL EXPLORING"] as HasIdeaOption[]).map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => {
                setFormData((prev) => ({ ...prev, hasIdea: option }));
                if (errors.hasIdea) {
                  setErrors((prev) => {
                    const c = { ...prev };
                    delete c.hasIdea;
                    return c;
                  });
                }
              }}
              className={`p-4 rounded-xl text-center border transition-all ${
                formData.hasIdea === option
                  ? "bg-white text-black border-white font-semibold"
                  : "bg-neutral-900/60 text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white"
              }`}
            >
              <span className="text-xs uppercase tracking-wider">{option}</span>
            </button>
          ))}
        </div>
        {errors.hasIdea && (
          <p className="text-xs text-red-400 font-mono">{errors.hasIdea}</p>
        )}

        {/* Conditional Textarea for YES */}
        {formData.hasIdea === "YES" && (
          <div id="field-ideaDescription" className="space-y-2 pt-4">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block">
              Tell Us About Your Idea <span className="text-white">*</span>
            </label>
            <textarea
              name="ideaDescription"
              rows={4}
              placeholder="What are you building or thinking about building? What problem does it solve?"
              value={formData.ideaDescription}
              onChange={handleInputChange}
              className={`w-full p-4 rounded-xl bg-neutral-900/80 border text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-white transition-all ${
                errors.ideaDescription ? "border-red-500/80 bg-red-950/10" : "border-neutral-800 focus:border-neutral-500"
              }`}
            />
            {errors.ideaDescription && (
              <p className="text-xs text-red-400 font-mono">{errors.ideaDescription}</p>
            )}
          </div>
        )}

        {/* Conditional Textarea for NO or STILL EXPLORING */}
        {(formData.hasIdea === "NO" || formData.hasIdea === "STILL EXPLORING") && (
          <div className="space-y-2 pt-4">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block">
              What Would You Like To Explore?
            </label>
            <textarea
              name="explorationDescription"
              rows={3}
              placeholder="What topics, problems, or technologies are you most curious about exploring in the community?"
              value={formData.explorationDescription}
              onChange={handleInputChange}
              className="w-full p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-white transition-all"
            />
          </div>
        )}
      </div>

      {/* SECTION 5: WHAT ARE YOU LOOKING FOR? */}
      <div className="p-8 sm:p-10 rounded-2xl bg-neutral-950/70 border border-neutral-900 space-y-6">
        <div className="border-b border-neutral-900 pb-4">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 block mb-1">
            SECTION 05
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
            What Are You Looking For?
          </h2>
          <p className="text-xs text-neutral-500 mt-1">Select any outcomes you hope to achieve through ADYK Inspire.</p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {lookingForOptions.map((item) => {
            const isSelected = formData.lookingFor.includes(item);
            return (
              <button
                type="button"
                key={item}
                onClick={() => toggleLookingFor(item)}
                className={`px-4 py-2.5 rounded-full text-xs uppercase tracking-wider border transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-white text-black border-white font-medium"
                    : "bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white"
                }`}
              >
                <span>{item}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 6: ONLINE PRESENCE */}
      <div className="p-8 sm:p-10 rounded-2xl bg-neutral-950/70 border border-neutral-900 space-y-6">
        <div className="border-b border-neutral-900 pb-4">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 block mb-1">
            SECTION 06
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
            Online Presence (Optional)
          </h2>
          <p className="text-xs text-neutral-500 mt-1">Help the team understand your background and previous work.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
              LinkedIn Profile
            </label>
            <input
              type="url"
              name="linkedin"
              placeholder="https://linkedin.com/in/username"
              value={formData.linkedin}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-neutral-900/80 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-white transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
              GitHub / Portfolio
            </label>
            <input
              type="url"
              name="github"
              placeholder="https://github.com/username"
              value={formData.github}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-neutral-900/80 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-white transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
              Website
            </label>
            <input
              type="url"
              name="website"
              placeholder="https://yourwebsite.com"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-neutral-900/80 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* SECTION 7: CONTACT PREFERENCE & CONSENT */}
      <div className="p-8 sm:p-10 rounded-2xl bg-neutral-950/70 border border-neutral-900 space-y-8">
        <div className="border-b border-neutral-900 pb-4">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 block mb-1">
            SECTION 07
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
            Contact Preference
          </h2>
          <p className="text-xs text-neutral-500 mt-1">How would you prefer ADYK to contact you?</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {contactPrefOptions.map((pref) => (
            <button
              type="button"
              key={pref}
              onClick={() => setFormData((prev) => ({ ...prev, contactPreference: pref }))}
              className={`p-3.5 rounded-xl text-center border transition-all ${
                formData.contactPreference === pref
                  ? "bg-white text-black border-white font-semibold"
                  : "bg-neutral-900/60 text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white"
              }`}
            >
              <span className="text-xs uppercase tracking-wider">{pref}</span>
            </button>
          ))}
        </div>

        {/* Consent Checkbox */}
        <div id="field-consent" className="pt-4 border-t border-neutral-900 space-y-3">
          <label className="flex items-start gap-3.5 cursor-pointer select-none">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
              className="mt-1 w-4 h-4 rounded border-neutral-800 bg-neutral-900 text-white focus:ring-0 focus:ring-offset-0 transition-colors accent-white"
            />
            <span className="text-xs text-neutral-400 leading-relaxed">
              I agree to be contacted by the ADYK team regarding ADYK Inspire community
              activities, discussions, opportunities and related updates. Read our{" "}
              <Link href="/privacy" className="text-white underline hover:text-neutral-300">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-white underline hover:text-neutral-300">
                Terms of Participation
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p className="text-xs text-red-400 font-mono">{errors.consent}</p>
          )}
        </div>

      </div>

      {/* SUBMISSION BUTTON */}
      <div className="pt-4 flex flex-col items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto min-w-[280px] group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-white text-black hover:bg-neutral-200 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 shadow-2xl hover:shadow-white/20"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>SUBMITTING...</span>
            </>
          ) : (
            <>
              <span>JOIN ADYK</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </button>

        <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-600">
          Zero Membership Fees • Open Technology Community
        </p>
      </div>

    </form>
  );
}
