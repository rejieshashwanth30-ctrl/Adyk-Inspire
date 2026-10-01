# ADYK Inspire — Public Community Registration Platform

> **ADYK — A Multi-Venture Technology Company**  
> *LEARN. BUILD. SHARE. INSPIRE.*

---

## 1. Overview
**ADYK Inspire** is an open community platform engineered for students, developers, creators, founders, entrepreneurs, and technology enthusiasts to connect, exchange concepts, learn, and build real-world products together.

This repository contains the complete production-grade web application and backend architecture built to Apple/Linear/Stripe aesthetic and architectural standards:
- **Monochrome Cinematic Aesthetic:** Ultra-minimalist black & white design with subtle GPU-accelerated ambient depth and dynamic lighting.
- **Editorial Registration Portal:** Multi-section progressive registration flow with inline validation, spam traps, and responsive controls.
- **Production Backend:** Next.js Route Handlers with Zod validation, sanitization, in-memory sliding-window rate limiting, and PostgreSQL persistence via Prisma.
- **Notification Multi-Channel Dispatcher:** Resend email service (dark HTML admin & user confirmation emails) + Meta WhatsApp Cloud API with automatic `wa.me` manual fallback links.
- **Resilience Guarantee:** Database persistence succeeds even if notification channels are unconfigured or fail.

---

## 2. Architecture & Data Flow

```text
USER (Browser)
   │
   ▼
ADYK Inspire Website (/ & /join)
   │
   ▼
Client-Side Validation & Honeypot
   │
   ▼
POST /api/registrations
   │
   ├─► Honeypot Check (Spam Trap)
   ├─► IP & Email Sliding Window Rate Limiter
   ├─► Zod Validation & Sanitization
   ├─► Duplicate Submission Prevention
   │
   ▼
PostgreSQL Database (Prisma ORM)
   │
   ▼ (Saved Successfully)
   │
   ├───────────────────────────────┐
   │                               │
   ▼                               ▼
Resend Email Service        Meta WhatsApp Cloud API
   ├─► Admin Alert             ├─► Admin Push Alert
   │   (rejieshashwanth30@...) └─► wa.me Fallback Link
   └─► User Welcome Email
   │
   ▼
/success Confirmation Experience
```

---

## 3. Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5.9 (Strict mode)
- **Styling:** Tailwind CSS v4 with custom monochrome tokens & glass panels
- **Animations:** Framer Motion (respects `prefers-reduced-motion`)
- **Database & ORM:** PostgreSQL with Prisma 7 (`@prisma/adapter-pg`)
- **Validation:** Zod
- **Email:** Resend API
- **WhatsApp:** Meta WhatsApp Business Cloud API + `wa.me` fallback generator
- **Icons:** Lucide React

---

## 4. Primary ADYK Contact Details

- **WhatsApp:** `+91 8870605699` (Number: `8870605699`)
- **Email:** `rejieshashwanth30@gmail.com`

---

## 5. Local Setup & Development

### Prerequisites
- Node.js `v20+` or `v24+`
- npm `v10+` or `v11+`
- A PostgreSQL database (Local or hosted on Neon, Supabase, Railway)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in the parameters:
```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/adyk_inspire?schema=public"

# Resend Email Service
RESEND_API_KEY="re_..."
EMAIL_FROM="ADYK Inspire <notifications@adyk.in>"
ADMIN_EMAIL="rejieshashwanth30@gmail.com"

# Meta WhatsApp Business Cloud API
WHATSAPP_ACCESS_TOKEN="EAAB..."
WHATSAPP_PHONE_NUMBER_ID="10..."
WHATSAPP_BUSINESS_ACCOUNT_ID="10..."
WHATSAPP_ADMIN_NUMBER="918870605699"

# Public Variables
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_ADYK_WHATSAPP="918870605699"
NEXT_PUBLIC_ADYK_EMAIL="rejieshashwanth30@gmail.com"
```

### Step 3: Database Migration & Prisma Generation
```bash
npx prisma generate
npx prisma db push # or npx prisma migrate dev
```

To seed test data:
```bash
npx tsx prisma/seed.ts
```

### Step 4: Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 6. Testing

Run the automated test suite covering sanitization, validation schemas, edge cases, conditional field logic, and rate limiting:
```bash
npx tsx tests/validation.test.ts
```

### API Endpoints
- `GET /api/health` — Returns service health, uptime, and database connection status.
- `POST /api/registrations` — Main endpoint handling join-list submissions.
- `POST /api/notifications/test` — Safe diagnostic endpoint to test email and WhatsApp notification dispatch.

---

## 7. Production Deployment (Vercel)

1. **Push to GitHub / GitLab:**
   Ensure `.env.local` is never committed (it is excluded by `.gitignore`).
2. **Deploy on Vercel:**
   - Link the repository on [Vercel](https://vercel.com).
   - In **Project Settings > Environment Variables**, configure all variables from `.env.example`.
   - Set Build Command: `prisma generate && next build`
3. **Verify Deployment:**
   - Test `GET /api/health` to confirm the PostgreSQL connection status is `"connected"`.
   - Submit a test registration on `/join`.

---

## 8. License

© 2026 ADYK. All rights reserved.
Part of ADYK — A Multi-Venture Technology Company.
