# 🏋️ IronWorks Gym — Full-Stack Upgrade Master Plan v2.0

> **Prepared by SPManchester Private Limited** · [www.spmanchester.com](https://www.spmanchester.com) · info@spmanchester.com
> **Author:** Sayed Mudassar Akbar · **Version:** 2.0 · **Date:** November 2026
> **Status:** Architecture Plan — Ready for Implementation

---

## 📋 Executive Summary

This document is the complete, implementation-ready upgrade plan to evolve the IronWorks Gym project from a **static HTML/CSS/JS concept demo** into a **production-grade, full-stack web application** — with a real PostgreSQL database, authenticated Node.js REST API, CMS-managed timetable, real payment processing via Stripe + GoCardless, transactional email via Resend, and a modern Next.js 14 frontend. Every decision is grounded in the PRD goals.

---

## 🗺️ What We Are Building

```
Current State (v1.0)              →    Target State (v2.0 + v3.0)
─────────────────────────────────      ──────────────────────────────────────
Static HTML + CSS + JS                 Next.js 14 App Router (React SSR/SSG)
No backend                             Node.js / Express REST API
No database                            PostgreSQL + Prisma ORM
No auth                                NextAuth.js (member + admin sessions)
Hardcoded timetable array              Payload CMS — admin edits classes live
No payments                            Stripe + GoCardless Direct Debit
No email                               Resend + React Email templates
Single HTML page                       Public site + Member Portal + Admin Dashboard
```

---

## 🏗️ Phase Overview

| Phase | Name | Duration | Deliverable |
|---|---|---|---|
| **Phase 1** | Foundation & Infrastructure | 1–2 weeks | Monorepo, DB, CI/CD pipeline |
| **Phase 2** | Public Frontend (Next.js) | 2–3 weeks | Pixel-perfect public site |
| **Phase 3** | Backend API | 2–3 weeks | Full REST API + auth |
| **Phase 4** | CMS & Timetable | 1–2 weeks | Admin-editable timetable |
| **Phase 5** | Payments & Memberships | 2–3 weeks | Stripe + GoCardless integration |
| **Phase 6** | Member Portal | 2–3 weeks | Dashboard, booking, profile |
| **Phase 7** | Admin Dashboard | 1–2 weeks | Full gym management UI |
| **Phase 8** | Production Hardening | 1 week | Security, monitoring, SEO |

**Total: 12–19 weeks (solo) · 6–9 weeks (2-person team)**

---

## 🧱 Technology Stack

### Frontend
| Layer | Technology | Reason |
|---|---|---|
| Framework | **Next.js 14** (App Router) | SSR + SSG for SEO; file-based routing; API routes |
| UI Library | **React 18** | Component model; huge ecosystem |
| Styling | **Tailwind CSS 3.4** | Utility-first; design tokens in config; tiny output |
| Components | **shadcn/ui** + Radix UI | Accessible, unstyled primitives |
| Animation | **Framer Motion 11** | Scroll animations; micro-interactions |
| Icons | **Lucide React** | Lightweight; tree-shakeable |
| Forms | **React Hook Form 7** | Minimal re-renders; native validation |
| Validation | **Zod 3** | Type-safe schemas shared with backend |
| State | **Zustand 4** | Lightweight global state |
| Data fetching | **TanStack Query 5** | Server state caching, optimistic updates |
| Date handling | **date-fns 3** | Lightweight; tree-shakeable |

### Backend
| Layer | Technology | Reason |
|---|---|---|
| Runtime | **Node.js 20 LTS** | Stable; huge ecosystem |
| Framework | **Express.js 4** | Mature REST; widely understood |
| ORM | **Prisma 5** | Type-safe DB client; migration system |
| Auth | **NextAuth.js v5** | Sessions + JWT; multiple providers |
| Password | **bcrypt** (12 rounds) | Industry standard |
| Validation | **Zod 3** | Shared schemas with frontend |
| Email | **Resend** + React Email | Best deliverability; template DX |
| File uploads | **Cloudinary** | CDN + transforms |
| Rate limiting | **express-rate-limit** | Protect auth and payment endpoints |
| Logging | **Pino 8** | Structured JSON logs |

### Database
| Layer | Technology | Reason |
|---|---|---|
| Primary DB | **PostgreSQL 16** | ACID; relational; excellent Prisma support |
| Hosting | **Neon** (serverless Postgres) | Generous free tier; connection pooling |
| Cache | **Redis** (Upstash) | Sessions; rate limiting; timetable cache |

### Payments
| Integration | Purpose |
|---|---|
| **Stripe** | Card payments, subscriptions, invoices, webhooks |
| **GoCardless** | UK Direct Debit mandates — preferred for monthly memberships |

### CMS
| Tool | Purpose |
|---|---|
| **Payload CMS 2** | Self-hosted, TypeScript-native — timetable, coaches, plans, announcements |

### Infrastructure
| Tool | Purpose |
|---|---|
| **Vercel** | Frontend (Next.js optimised) |
| **Railway** | Backend API + CMS |
| **Neon** | Managed Postgres |
| **Upstash** | Serverless Redis |
| **GitHub Actions** | CI/CD (test → lint → build → deploy) |
| **Sentry** | Error tracking |
| **PostHog** | Privacy-first product analytics |

---

## 📁 Repository Structure (Turborepo Monorepo)

```
ironworks-gym/
│
├── apps/
│   ├── web/                      # Next.js 14 — public site + member portal
│   │   ├── app/
│   │   │   ├── (public)/         # Homepage, timetable, membership, coaches
│   │   │   ├── (member)/         # Protected: dashboard, bookings, profile, billing
│   │   │   ├── (auth)/           # Login, register, forgot-password, reset
│   │   │   ├── admin/            # Admin dashboard (role-gated)
│   │   │   └── api/              # Thin Next.js API routes → delegates to backend
│   │   ├── components/
│   │   │   ├── ui/               # shadcn/ui base components
│   │   │   ├── timetable/        # TimetableGrid, ChipFilter, ClassCard
│   │   │   ├── membership/       # PlanCard, PlanComparison, CheckoutFlow
│   │   │   ├── member/           # Dashboard widgets, booking history
│   │   │   └── layout/           # Header, Footer, MobileNav, DemoBanner
│   │   └── lib/
│   │       ├── api.ts            # Typed API client + TanStack Query hooks
│   │       ├── auth.ts           # NextAuth config
│   │       └── validations.ts    # Zod schemas (shared)
│   │
│   ├── api/                      # Express REST API
│   │   ├── src/
│   │   │   ├── routes/           # auth, classes, members, memberships,
│   │   │   │                     # bookings, coaches, webhooks, admin
│   │   │   ├── middleware/       # auth (JWT), rateLimiter, validate (Zod),
│   │   │   │                     # errorHandler
│   │   │   ├── services/         # auth, member, payment, email, booking
│   │   │   └── lib/              # prisma, redis, stripe, gocardless singletons
│   │   └── prisma/
│   │       ├── schema.prisma
│   │       └── migrations/
│   │
│   └── cms/                      # Payload CMS (admin-editable content)
│       └── src/
│           ├── collections/      # Classes, Coaches, MembershipPlans, Announcements
│           └── payload.config.ts
│
├── packages/
│   ├── types/                    # Shared TypeScript types
│   └── config/                   # Shared ESLint, Tailwind, TS configs
│
├── .github/workflows/
│   ├── ci.yml                    # Lint + test on every PR
│   └── deploy.yml                # Deploy on merge to main
│
├── docker-compose.yml            # Local: Postgres + Redis
├── turbo.json
├── pnpm-workspace.yaml
└── README.md
```

---

## 🗄️ Database Schema (Prisma)

```prisma
// apps/api/prisma/schema.prisma
// PostgreSQL 16 · Prisma 5 · SPManchester Private Limited

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ── ENUMS ────────────────────────────────────────────────────

enum MembershipTier {
  OFF_PEAK          // £29/mo  09:00–16:00 + weekends
  ALL_ACCESS        // £42/mo  unlimited, any time
  ALL_ACCESS_PLUS   // £79/mo  All Access + coaching
}

enum MembershipStatus {
  ACTIVE
  PAUSED
  CANCELLED
  PENDING_PAYMENT
  TRIAL
}

enum ClassCategory {
  STRENGTH
  HIIT
  CONDITIONING
  MOBILITY
  COMBAT
}

enum DayOfWeek {
  MON TUE WED THU FRI SAT SUN
}

enum BookingStatus {
  CONFIRMED
  CANCELLED
  ATTENDED
  NO_SHOW
  WAITLISTED
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

// ── MODELS ───────────────────────────────────────────────────

model Member {
  id               String           @id @default(cuid())
  email            String           @unique
  passwordHash     String
  firstName        String
  lastName         String
  phone            String?
  avatarUrl        String?
  dateOfBirth      DateTime?
  emergencyContact String?

  // Membership
  membership       Membership?

  // Payment provider IDs
  stripeCustomerId String?          @unique
  gcMandateId      String?          @unique
  gcCustomerId     String?          @unique

  // Relations
  bookings         Booking[]
  payments         Payment[]
  sessions         Session[]

  // Audit
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt
  lastLoginAt      DateTime?
  emailVerifiedAt  DateTime?

  @@map("members")
}

model Session {
  id        String   @id @default(cuid())
  token     String   @unique
  memberId  String
  member    Member   @relation(fields: [memberId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  userAgent String?
  ipAddress String?
  createdAt DateTime @default(now())

  @@map("sessions")
}

model Membership {
  id                 String           @id @default(cuid())
  memberId           String           @unique
  member             Member           @relation(fields: [memberId], references: [id], onDelete: Cascade)
  tier               MembershipTier
  status             MembershipStatus @default(PENDING_PAYMENT)
  priceGbpPence      Int
  billingCycleDay    Int              @default(1)
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime
  cancelledAt        DateTime?
  pausedUntil        DateTime?
  stripeSubId        String?          @unique
  stripePriceId      String?
  gcSubscriptionId   String?          @unique
  payments           Payment[]
  createdAt          DateTime         @default(now())
  updatedAt          DateTime         @updatedAt

  @@map("memberships")
}

model Coach {
  id             String         @id @default(cuid())
  name           String
  slug           String         @unique
  role           String
  bio            String
  avatarUrl      String?
  certifications String[]
  instagramUrl   String?
  displayOrder   Int            @default(0)
  isActive       Boolean        @default(true)
  classes        ClassSession[]
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt

  @@map("coaches")
}

model ClassSession {
  id           String        @id @default(cuid())
  name         String
  slug         String        @unique
  description  String?
  category     ClassCategory
  dayOfWeek    DayOfWeek
  startTime    String        // "06:30" HH:MM
  durationMins Int           @default(60)
  capacity     Int           @default(20)
  coachId      String
  coach        Coach         @relation(fields: [coachId], references: [id])
  location     String?
  imageUrl     String?
  tags         String[]
  isActive     Boolean       @default(true)
  bookings     Booking[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt

  @@map("class_sessions")
}

model Booking {
  id               String        @id @default(cuid())
  memberId         String
  member           Member        @relation(fields: [memberId], references: [id], onDelete: Cascade)
  classSessionId   String
  classSession     ClassSession  @relation(fields: [classSessionId], references: [id])
  classDate        DateTime      // specific date of this occurrence
  status           BookingStatus @default(CONFIRMED)
  waitlistPosition Int?
  cancelledAt      DateTime?
  attendedAt       DateTime?
  notes            String?
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt

  @@unique([memberId, classSessionId, classDate])
  @@map("bookings")
}

model Payment {
  id                String        @id @default(cuid())
  memberId          String
  member            Member        @relation(fields: [memberId], references: [id])
  membershipId      String?
  membership        Membership?   @relation(fields: [membershipId], references: [id])
  amountGbpPence    Int
  currency          String        @default("gbp")
  status            PaymentStatus @default(PENDING)
  provider          String        // "stripe" | "gocardless"
  providerPaymentId String?       @unique
  description       String?
  metadata          Json?
  paidAt            DateTime?
  failedAt          DateTime?
  failureReason     String?
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt

  @@map("payments")
}

model MembershipPlan {
  id            String         @id @default(cuid())
  tier          MembershipTier @unique
  name          String
  slug          String         @unique
  tagline       String
  priceGbpPence Int
  billingPeriod String         @default("monthly")
  stripePriceId String?
  features      Json           // [{text: string, included: boolean}]
  isPopular     Boolean        @default(false)
  isActive      Boolean        @default(true)
  displayOrder  Int            @default(0)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  @@map("membership_plans")
}

model Announcement {
  id        String    @id @default(cuid())
  title     String
  body      String
  type      String    @default("info")  // "info" | "warning" | "promotion"
  isActive  Boolean   @default(true)
  startsAt  DateTime?
  endsAt    DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@map("announcements")
}

model WaitlistEntry {
  id        String   @id @default(cuid())
  email     String
  firstName String?
  plan      String?
  source    String?
  createdAt DateTime @default(now())

  @@map("waitlist_entries")
}
```

---

## 🔌 REST API Specification

**Base URL:** `https://api.ironworksgym.com/v1`
**Auth header:** `Authorization: Bearer <accessToken>` (JWT, 15-min expiry)
**Refresh:** httpOnly cookie — `POST /auth/refresh`
**Format:** `application/json` · **Rate limit:** 100 req/min (public) · 300 req/min (authed)

### Auth Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | None | Register new member |
| `POST` | `/auth/login` | None | Login → JWT + refresh cookie |
| `POST` | `/auth/logout` | Member | Invalidate session |
| `POST` | `/auth/refresh` | Cookie | Exchange refresh token for new access token |
| `POST` | `/auth/forgot-password` | None | Trigger password reset email |
| `POST` | `/auth/reset-password` | Token | Set new password with reset token |
| `GET` | `/auth/verify-email/:token` | None | Verify email address |
| `GET` | `/auth/me` | Member | Get current member profile |

### Classes / Timetable

| Method | Endpoint | Query params | Description |
|---|---|---|---|
| `GET` | `/classes` | `?day=MON&category=STRENGTH&active=true` | List all active classes |
| `GET` | `/classes/:id` | — | Single class detail + coach |
| `GET` | `/classes/:id/schedule` | `?from=&to=` | Weekly occurrences + live capacity |
| `GET` | `/classes/categories` | — | Enum list of all categories |

### Bookings

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/bookings` | Member | My bookings (`?status=CONFIRMED&page=1`) |
| `POST` | `/bookings` | Member | Book a class slot (`{classSessionId, classDate}`) |
| `DELETE` | `/bookings/:id` | Member | Cancel a booking |
| `GET` | `/bookings/:id` | Member | Booking detail |

### Members

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/members/me` | Member | Full member profile |
| `PATCH` | `/members/me` | Member | Update profile fields |
| `GET` | `/members/me/membership` | Member | Current membership detail + billing |
| `GET` | `/members/me/payments` | Member | Paginated payment history |

### Memberships & Payments

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/membership-plans` | None | All active plans + features |
| `POST` | `/memberships/checkout` | Member | Create Stripe Checkout Session |
| `POST` | `/memberships/mandate` | Member | Create GoCardless DD redirect |
| `POST` | `/memberships/cancel` | Member | Cancel (with cooling-off period) |
| `POST` | `/memberships/pause` | Member | Pause membership |
| `POST` | `/memberships/resume` | Member | Resume paused membership |

### Coaches

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/coaches` | None | All active coaches |
| `GET` | `/coaches/:slug` | None | Coach profile + their classes |

### Admin (requires `role: ADMIN` JWT claim)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/admin/members` | List all members (paginated + search) |
| `GET/PATCH` | `/admin/members/:id` | View or edit member record |
| `GET` | `/admin/memberships` | All memberships, filterable by status |
| `POST/PATCH/DELETE` | `/admin/classes` | Full class CRUD |
| `GET` | `/admin/bookings` | All bookings |
| `POST` | `/admin/bookings/:id/check-in` | Mark member attended |
| `GET` | `/admin/payments` | Full payment ledger |
| `GET` | `/admin/analytics` | Dashboard stats (MRR, active members, top classes) |

### Webhooks (signature-verified)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/webhooks/stripe` | `checkout.session.completed`, `invoice.paid`, `payment_intent.payment_failed` |
| `POST` | `/webhooks/gocardless` | `mandates.active`, `payments.paid_out`, `payments.failed` |

---

## 🔐 Authentication Architecture

```
Register Flow:
  POST /auth/register
  → Zod validate input
  → Check email not already taken
  → bcrypt.hash(password, 12)
  → prisma.member.create(...)
  → Send welcome + verify email (Resend)
  → 201 Created (no auto-login until verified)

Login Flow:
  POST /auth/login
  → Find member by email
  → bcrypt.compare(password, hash)
  → prisma.session.create({ token: uuid, expiresAt: +30d })
  → Sign JWT: { sub: memberId, role, exp: +15m }
  → Response: { accessToken }
  → Set-Cookie: refreshToken=<sessionToken>; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000

Every authenticated request:
  Authorization: Bearer <accessToken>
  → verify JWT (jose / jsonwebtoken)
  → attach req.member = { id, email, role }

Token refresh:
  POST /auth/refresh (cookie auto-sent by browser)
  → Find Session by token
  → Check expiresAt > now()
  → Sign new accessToken
  → Return { accessToken }
```

**Security controls checklist:**
- `helmet()` — CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- `express-rate-limit` — 10 req/min on `/auth/*`; 300 req/min authenticated
- `Zod` — all inputs validated before DB touch; unknown fields stripped
- `bcrypt` rounds: 12 prod / 10 test
- Prisma parameterised queries — SQL injection impossible
- React escaping + `DOMPurify` for any raw HTML
- CORS — strict allowlist (Vercel domain + localhost dev)
- Webhook signatures — `stripe.webhooks.constructEvent()` + GC `Webhook-Signature`
- Secrets — env vars only; never committed; Railway secrets in prod

---

## 📧 Email Templates (Resend + React Email)

| Template | Trigger | Key content |
|---|---|---|
| `welcome.tsx` | Register | Welcome + verify button |
| `email-verification.tsx` | Register | Verify link (expires 24h) |
| `membership-confirmation.tsx` | Payment success | Plan, start date, member ref `IW-XXXXX`, QR code |
| `payment-receipt.tsx` | Payment collected | Amount, date, invoice PDF download |
| `payment-failed.tsx` | Stripe/GC failure | Action required + update payment link |
| `booking-confirmation.tsx` | Booking created | Class, date, time, coach, cancel link |
| `booking-reminder.tsx` | 2h before class | Class reminder + gym directions |
| `booking-cancelled.tsx` | Cancellation | Confirmation + rebook link |
| `password-reset.tsx` | Forgot password | Reset link (expires 1h) |
| `membership-renewal.tsx` | 3 days before renewal | Renewal amount + manage link |
| `membership-cancellation.tsx` | Cancel confirmed | Cooling-off period details |

---

## 🔄 Payment Flows

### Stripe — Card Payment

```
1. Member clicks "Start All Access" → POST /memberships/checkout
2. Backend creates Stripe Checkout Session (mode: "subscription")
3. Redirect to Stripe-hosted checkout
4. Member pays → Stripe fires: checkout.session.completed webhook
5. Webhook handler (idempotent):
   - Activate Membership (ACTIVE)
   - Create Payment record (COMPLETED)
   - Create Stripe Subscription for recurring billing
   - Send membership-confirmation email (Resend)
6. Stripe redirects to /dashboard?success=true → success toast
```

### GoCardless — UK Direct Debit

```
1. Member clicks "Pay by Direct Debit" → POST /memberships/mandate
2. Backend creates GC Redirect Flow (success_redirect_url + exit_uri)
3. Redirect to GoCardless bank authorisation page
4. Member authorises DD mandate at their bank
5. GoCardless fires: mandates.active webhook
   - Save gcMandateId on Member
   - Create GC Subscription (monthly, billing_day = 1)
6. First collection date arrives → GoCardless fires: payments.created
7. Payment confirmed → GoCardless fires: payments.paid_out
   - Create Payment record (COMPLETED)
   - Activate Membership (ACTIVE)
   - Send membership-confirmation email
```

---

## 🎨 Frontend — Page Architecture

### Public Site

| Route | Component tree (key) |
|---|---|
| `/` | `HeroSection` → `ProblemSolutionSection` → `TimetableSection` (API-driven) → `MembershipSection` → `CoachesSection` → `SocialProofSection` → `CTABanner` |
| `/timetable` | `WeeklyCalendarView` (React Big Calendar) + `ClassDetailModal` + `BookingConfirmModal` |
| `/membership` | `BillingToggle` → `PlanCards` → `PlanComparisonTable` → `FAQAccordion` |
| `/coaches/:slug` | `CoachHero` → `CoachClasses` → `CoachCredentials` |

### Member Portal (authenticated)

| Route | Purpose |
|---|---|
| `/dashboard` | Greeting, membership status, upcoming bookings, quick-book |
| `/bookings` | Full booking calendar + list (Upcoming / Past / Cancelled tabs) |
| `/profile` | Edit profile, change password, notification preferences, avatar upload |
| `/billing` | Current plan, payment method (Stripe/GC), invoice history, cancel flow |

### Admin Dashboard (role: ADMIN)

| Route | Purpose |
|---|---|
| `/admin` | Analytics overview: MRR, active members, top classes |
| `/admin/members` | Member list + search + filter |
| `/admin/members/:id` | Full member record + manual override actions |
| `/admin/classes` | Timetable CRUD |
| `/admin/bookings` | Booking management + check-in scanner |
| `/admin/payments` | Full payment ledger |

---

## 🚀 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml

on: push to main

jobs:
  lint-and-test:
    - pnpm install (frozen lockfile)
    - turbo run lint
    - turbo run type-check    # tsc --noEmit across all apps
    - turbo run test          # Vitest unit tests
    - node --check            # Syntax check JS/TS

  build:
    needs: lint-and-test
    - turbo run build
    - Upload build artifacts

  deploy-api:
    needs: build
    - Deploy apps/api → Railway
    - prisma migrate deploy   # Apply pending migrations

  deploy-cms:
    needs: build
    - Deploy apps/cms → Railway

  deploy-web:
    needs: [deploy-api, deploy-cms]
    - Deploy apps/web → Vercel
    - Post preview URL to PR (on PR builds)

  smoke-test:
    needs: deploy-web
    - curl /v1/health, /v1/classes, /v1/membership-plans
    - Playwright E2E: register → checkout → book → cancel
```

---

## 🌐 Environment Variables

```bash
# apps/api/.env.example

# Database
DATABASE_URL="postgresql://USER:PASS@HOST:5432/ironworks?sslmode=require"
REDIS_URL="redis://default:PASS@HOST:PORT"

# Auth
JWT_SECRET="min-32-char-random-secret"
JWT_REFRESH_SECRET="different-min-32-char-secret"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="30d"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."

# GoCardless
GOCARDLESS_ACCESS_TOKEN="live_..."
GOCARDLESS_WEBHOOK_SECRET="..."
GOCARDLESS_ENVIRONMENT="live"

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@ironworksgym.com"
EMAIL_FROM_NAME="IronWorks Gym"

# Storage
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# App
NODE_ENV="production"
PORT=4000
FRONTEND_URL="https://ironworksgym.com"
API_URL="https://api.ironworksgym.com"

# Monitoring
SENTRY_DSN="https://...@sentry.io/..."
```

```bash
# apps/web/.env.example

NEXT_PUBLIC_API_URL="https://api.ironworksgym.com/v1"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
NEXTAUTH_URL="https://ironworksgym.com"
NEXTAUTH_SECRET="min-32-char-secret"
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_SENTRY_DSN="..."
```

---

## 📊 Analytics & KPIs

### PostHog Events to Track

| Event | Properties |
|---|---|
| `timetable_filtered` | day, category, results_count |
| `class_card_expanded` | class_name, category, coach |
| `checkout_started` | tier, payment_method |
| `checkout_completed` | tier, revenue_gbp |
| `checkout_abandoned` | tier, step (funnel) |
| `booking_created` | class_name, day, time |
| `booking_cancelled` | class_name, reason |

### PRD KPI Targets

| Metric | Target | Measurement |
|---|---|---|
| Online join rate | ≥ 50% of new memberships | Stripe/GC webhooks |
| Timetable filter usage | ≥ 45% of sessions | PostHog event |
| Join form completion | ≥ 55% of starters | PostHog funnel |
| Median time to join | ≤ 2 min | PostHog sessions |
| LCP (mobile) | ≤ 2.5s | Vercel Speed Insights |

---

## 🗓️ Sprint Plan

### Phase 1 — Foundation (Week 1–2)
- [ ] Init Turborepo monorepo with pnpm workspaces
- [ ] Next.js 14 + Tailwind + shadcn/ui scaffold
- [ ] Express API + TypeScript + Prisma scaffold
- [ ] Payload CMS scaffold
- [ ] Write full Prisma schema (all models)
- [ ] `docker-compose.yml` — Postgres + Redis local dev
- [ ] First migration + seed (18 classes, 4 coaches, 3 plans)
- [ ] GitHub Actions CI: lint + type-check on PR
- [ ] Railway + Vercel + Neon setup → deploy skeleton URLs

### Phase 2 — Public Frontend (Week 3–5)
- [ ] Port HTML/CSS → Next.js + Tailwind components
- [ ] `<Header>` with Framer Motion mobile drawer
- [ ] `<HeroSection>` with count-up stats animation
- [ ] `<TimetableSection>` — TanStack Query → API, URL-synced filters
- [ ] `<ClassCard>` — expandable, capacity bar, book CTA
- [ ] `<MembershipSection>` — plan cards + Stripe CTA
- [ ] `<CoachesSection>` — Cloudinary photos
- [ ] `<Footer>` — 3-column SPManchester branded

### Phase 3 — Backend API (Week 4–6)
- [ ] Auth routes (register, login, logout, refresh, verify email, reset)
- [ ] JWT middleware + role guard
- [ ] `GET /classes`, `GET /coaches`, `GET /membership-plans`
- [ ] Rate limiting (express-rate-limit) + Helmet
- [ ] Zod validation middleware
- [ ] Global error handler + Pino structured logging
- [ ] Sentry integration (API)
- [ ] `/health` endpoint

### Phase 4 — CMS (Week 5–6)
- [ ] Payload: Classes, Coaches, MembershipPlans, Announcements collections
- [ ] Payload reads/writes same Postgres DB as API
- [ ] API switches to Postgres (CMS manages data)
- [ ] Admin user seeding script
- [ ] Deploy CMS to Railway

### Phase 5 — Payments (Week 7–9)
- [ ] Stripe Checkout session + Subscription creation
- [ ] Stripe webhook handler (idempotent, with event deduplication)
- [ ] GoCardless redirect flow + mandate creation
- [ ] GoCardless subscription + webhook handler
- [ ] Membership activation on payment confirmed
- [ ] React Email templates: confirmation, receipt, failed
- [ ] Resend integration

### Phase 6 — Member Portal (Week 9–11)
- [ ] NextAuth.js session provider + protected route middleware
- [ ] Auth pages (Login, Register, Forgot/Reset password)
- [ ] `/dashboard` — full layout
- [ ] `/bookings` — `POST /bookings` + capacity check + `DELETE /bookings/:id`
- [ ] Booking confirmation + reminder emails
- [ ] `/profile` — form + Cloudinary avatar upload
- [ ] `/billing` — plan, payment method, invoices, cancel flow

### Phase 7 — Admin Dashboard (Week 12–13)
- [ ] Admin role + guard middleware
- [ ] `/admin` — analytics overview
- [ ] `/admin/members` — list + search
- [ ] `/admin/classes` — full CRUD UI
- [ ] `/admin/bookings` — check-in flow
- [ ] `/admin/payments` — ledger

### Phase 8 — Production Hardening (Week 14)
- [ ] WCAG 2.2 AA audit (axe DevTools)
- [ ] Lighthouse ≥ 90 all categories
- [ ] E2E: register → checkout → book → cancel (Playwright)
- [ ] Load test: 200 concurrent users on timetable (k6)
- [ ] OWASP Top 10 checklist
- [ ] `robots.txt` + `sitemap.xml` (Next.js)
- [ ] `LocalBusiness` JSON-LD schema
- [ ] Google Search Console verification
- [ ] Uptime monitoring (Better Uptime)
- [ ] Neon daily snapshot policy

---

## 💰 Monthly Cost Estimate (Production)

| Service | Tier | Est. Cost/mo |
|---|---|---|
| Vercel (web) | Pro | \$20 |
| Railway (API + CMS) | Hobby | \$5–15 |
| Neon (Postgres) | Free / Launch | \$0–19 |
| Upstash Redis | Free / Pay-as-you-go | \$0–5 |
| Resend (email) | Pro | \$20 |
| Cloudinary | Free / Plus | \$0–89 |
| Stripe | 1.4% + 20p per txn | Variable |
| GoCardless | 1% + 20p per txn | Variable |
| Sentry | Free | \$0 |
| PostHog | Free (≤1M events) | \$0 |
| **Total fixed** | | **~\$45–70/mo** |

---

## 🏁 Definition of Done — v2.0 Launch Checklist

- [ ] Member can register, verify email, log in, and log out
- [ ] Member can view CMS-driven timetable with working day + category filters
- [ ] Member can join via Stripe card and receive a confirmation email with member ref
- [ ] Member can join via GoCardless Direct Debit
- [ ] Member can book a class and receive a reminder email
- [ ] Member can cancel a booking
- [ ] Member can view billing history and download an invoice
- [ ] Admin can edit a class in Payload CMS → reflects on site within 60 seconds
- [ ] Admin can mark a member as checked in via admin dashboard
- [ ] All Stripe and GoCardless webhooks are verified and idempotent
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- [ ] Zero critical OWASP vulnerabilities
- [ ] CI pipeline green: lint → type-check → test → E2E → deploy

---

## 🏢 Built & Maintained by

**SPManchester Private Limited** · Manchester, UK

| | |
|---|---|
| 🌐 Website | [www.spmanchester.com](https://www.spmanchester.com) |
| 📧 Contact | [info@spmanchester.com](mailto:info@spmanchester.com) |
| 👤 Author | Sayed Mudassar Akbar |
| 📂 Portfolio | [www.spmanchester.com/projects](https://www.spmanchester.com/projects) |
| 💼 LinkedIn | [linkedin.com/company/spmanchester](https://www.linkedin.com/company/spmanchester) |

*Copyright © 2026 SPManchester Private Limited · MIT License*
