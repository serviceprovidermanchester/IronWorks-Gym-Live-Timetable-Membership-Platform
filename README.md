<div align="center">

<a href="https://www.spmanchester.com">
  <img src="https://img.shields.io/badge/SPManchester-Private%20Limited-ff5500?style=for-the-badge&logoColor=white" alt="SPManchester Private Limited" />
</a>

# 🏋️ IronWorks Gym
### *Live Timetable & Membership Platform*

**Enterprise Full-Stack Architecture for Independent Gyms & Boutique Fitness Studios**

[![CI Status](https://img.shields.io/github/actions/workflow/status/serviceprovidermanchester/IronWorks-Gym-Live-Timetable-Membership-Platform/deploy.yml?branch=main&style=flat-square&label=CI%2FCD)](https://github.com/serviceprovidermanchester/IronWorks-Gym-Live-Timetable-Membership-Platform/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Next.js 14](https://img.shields.io/badge/Next.js-14_App_Router-black.svg?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.22-2D3748.svg?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Payload CMS](https://img.shields.io/badge/Payload_CMS-2.30-black.svg?style=flat-square)](https://payloadcms.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF.svg?style=flat-square&logo=stripe)](https://stripe.com/)
[![GoCardless](https://img.shields.io/badge/GoCardless-Direct_Debit-00B9A9.svg?style=flat-square)](https://gocardless.com/)
[![Turborepo](https://img.shields.io/badge/Monorepo-Turborepo-EF4444.svg?style=flat-square&logo=turborepo)](https://turbo.build/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

<p align="center">
  <strong>Crafted with ❤️ by <a href="https://www.spmanchester.com">SPManchester Private Limited</a></strong><br/>
  Lead Architect: <strong>Sayed Mudassar Akbar</strong> · <a href="mailto:info@spmanchester.com">info@spmanchester.com</a>
</p>

[🌐 Live Demo](https://ironworksgym.com) · [📋 Architecture Plan](docs/FULLSTACK-PLAN.md) · [📊 PRD](PRD.md) · [⚙️ TRD](TRD.md) · [🔒 Security](SECURITY.md) · [🏭 Production Hardening](docs/PRODUCTION-HARDENING.md)

</div>

---

## 📸 Platform Screenshots

<div align="center">

### 🌐 Public Frontend

| Homepage | Timetable | Membership |
|:---:|:---:|:---:|
| ![Homepage](screenshots/01-homepage.png) | ![Timetable](screenshots/02-timetable.png) | ![Membership](screenshots/03-membership.png) |

| Login | Register | Coach Profile |
|:---:|:---:|:---:|
| ![Login](screenshots/04-login.png) | ![Register](screenshots/05-register.png) | ![Coach](screenshots/06-coach-sarah.png) |

### 👤 Member Portal

| Dashboard | Bookings | Profile | Billing |
|:---:|:---:|:---:|:---:|
| ![Dashboard](screenshots/07-member-dashboard.png) | ![Bookings](screenshots/08-member-bookings.png) | ![Profile](screenshots/09-member-profile.png) | ![Billing](screenshots/10-member-billing.png) |

### 🛡️ Admin Operations Console

| Overview | Timetable | Members | Revenue |
|:---:|:---:|:---:|:---:|
| ![Admin Overview](screenshots/11-admin-overview.png) | ![Admin Timetable](screenshots/12-admin-timetable.png) | ![Admin Members](screenshots/13-admin-members.png) | ![Admin Revenue](screenshots/14-admin-revenue.png) |

| Bookings & Check-In | Member Detail |
|:---:|:---:|
| ![Admin Bookings](screenshots/15-admin-bookings.png) | ![Member Detail](screenshots/16-admin-member-m001.png) |

### 🏋️ Payload CMS Admin

| Dashboard | Classes | Coaches | Plans |
|:---:|:---:|:---:|:---:|
| ![CMS Dashboard](screenshots/17-cms-dashboard.png) | ![CMS Classes](screenshots/18-cms-classes.png) | ![CMS Coaches](screenshots/19-cms-coaches.png) | ![CMS Plans](screenshots/20-cms-plans.png) |

| Announcements | Members Directory |
|:---:|:---:|
| ![CMS Announcements](screenshots/21-cms-announcements.png) | ![CMS Members](screenshots/22-cms-members.png) |

</div>

> **IronWorks Gym** is an enterprise-grade reference architecture and production portfolio system engineered by **SPManchester Private Limited** to demonstrate modern full-stack web engineering for independent fitness studios.

---

## 💡 The Problem & Business Solution

Independent and boutique fitness facilities face a critical digital conversion gap:

| Pain Point | Old Way | IronWorks Solution |
|---|---|---|
| **Timetable sharing** | Instagram stories & low-res PNGs | Live CMS-driven weekly schedule with real-time capacity |
| **Membership joining** | Paper forms & DM for pricing | Instant Stripe card checkout or GoCardless Direct Debit |
| **Class booking** | Phone calls or walk-in | One-click online booking with automated waitlist promotion |
| **Admin overhead** | Manual spreadsheets | Payload CMS admin panel — no code required |
| **Member churn** | No digital touchpoints | Automated reminders, billing history, invoice downloads |

---

## 🏛️ System Architecture

```mermaid
flowchart TD
    subgraph Clients["Member & Admin Clients"]
        WEB["Next.js 14 Web Application<br/>(Tailwind CSS · shadcn/ui · NextAuth.js)"]
        CMS_ADMIN["Payload CMS Admin Panel<br/>(port 3001 · No DB required)"]
    end

    subgraph API_Gateway["Backend Services — apps/api (port 4000)"]
        REST["Express.js REST Gateway<br/>(JWT Auth · Rate Limiting · Helmet)"]
        ROUTES["API Routes<br/>/auth · /classes · /coaches · /bookings<br/>/memberships · /members · /admin · /webhooks"]
        WEBHOOKS["Webhook Handlers<br/>Stripe & GoCardless Events (idempotent)"]
        EMAILS["Email Service<br/>11 Transactional Templates · Resend"]
    end

    subgraph Data_Layer["Data & Persistence Layer"]
        PRISMA["Prisma ORM Client"]
        POSTGRES[("PostgreSQL 16<br/>(9 Relational Models)")]
        REDIS[("Redis 7<br/>(Sessions & Rate Limits)")]
    end

    subgraph External["Third-Party Integrations"]
        STRIPE["Stripe — Card Payments<br/>Subscriptions & Webhooks"]
        GC["GoCardless<br/>UK Direct Debit"]
        RESEND["Resend<br/>Transactional Email"]
        CLOUDINARY["Cloudinary<br/>Image Storage & CDN"]
        POSTHOG["PostHog<br/>Product Analytics"]
        SENTRY["Sentry<br/>Error Monitoring"]
    end

    WEB -->|REST API| REST
    CMS_ADMIN -->|In-memory / Direct DB| POSTGRES
    REST --> ROUTES
    ROUTES --> PRISMA
    PRISMA --> POSTGRES
    REST --> REDIS
    ROUTES --> STRIPE
    ROUTES --> GC
    ROUTES --> EMAILS
    EMAILS --> RESEND
    STRIPE -.->|Webhooks| WEBHOOKS
    GC -.->|Webhooks| WEBHOOKS
    WEBHOOKS --> PRISMA
    WEB --> CLOUDINARY
    WEB --> POSTHOG
    REST --> SENTRY
```

---

## 📦 Monorepo Structure

```
spm-web-gym-timetable/                   ← Turborepo root
├── apps/
│   ├── api/                              # Express.js REST API + Prisma ORM (port 4000)
│   │   ├── prisma/
│   │   │   ├── schema.prisma             # 9 models: Member, Booking, ClassSession…
│   │   │   └── seed.ts                   # 4 coaches, 18 classes, 3 membership plans
│   │   ├── src/
│   │   │   ├── index.ts                  # Express app entry + route mounting
│   │   │   ├── routes/
│   │   │   │   ├── auth.ts               # Register, login, logout, refresh, verify, reset
│   │   │   │   ├── classes.ts            # GET /classes (day/category filter), GET /classes/:id
│   │   │   │   ├── coaches.ts            # GET /coaches, GET /coaches/:slug
│   │   │   │   ├── bookings.ts           # POST/GET/DELETE /bookings (capacity + waitlist)
│   │   │   │   ├── memberships.ts        # Checkout, mandate, cancel, pause, resume
│   │   │   │   ├── members.ts            # GET/PATCH /me, membership, payments
│   │   │   │   ├── admin.ts              # Members CRUD, analytics, check-in, classes
│   │   │   │   ├── webhooks.ts           # Stripe & GoCardless webhook handlers
│   │   │   │   └── uploads.ts            # Cloudinary upload endpoint
│   │   │   ├── emails/                   # 11 transactional email templates
│   │   │   │   ├── welcome.ts
│   │   │   │   ├── email-verification.ts
│   │   │   │   ├── membership-confirmation.ts
│   │   │   │   ├── payment-receipt.ts
│   │   │   │   ├── payment-failed.ts
│   │   │   │   ├── booking-confirmation.ts
│   │   │   │   ├── booking-reminder.ts
│   │   │   │   ├── booking-cancelled.ts
│   │   │   │   ├── password-reset.ts
│   │   │   │   ├── membership-renewal.ts
│   │   │   │   └── membership-cancellation.ts
│   │   │   ├── middleware/
│   │   │   │   ├── auth.ts               # JWT verify + role guard
│   │   │   │   ├── rateLimiter.ts        # 100/min public · 300/min authed
│   │   │   │   └── errorHandler.ts       # Global error handler + Pino logging
│   │   │   ├── lib/
│   │   │   │   ├── prisma.ts             # Prisma singleton
│   │   │   │   ├── redis.ts              # Redis client
│   │   │   │   ├── stripe.ts             # Stripe SDK
│   │   │   │   └── email.ts              # Resend integration
│   │   │   └── services/
│   │   │       └── payment.service.ts    # Stripe & GoCardless business logic
│   │   ├── test/
│   │   │   └── api.test.ts               # Vitest API tests
│   │   ├── .env.example                  # All required API env vars
│   │   ├── railway.json                  # Railway deployment config
│   │   └── tsconfig.json
│   │
│   ├── web/                              # Next.js 14 App Router Frontend (port 3000)
│   │   ├── app/
│   │   │   ├── page.tsx                  # Homepage (redirects to public)
│   │   │   ├── layout.tsx                # Root layout + providers
│   │   │   ├── robots.ts                 # SEO robots config
│   │   │   ├── sitemap.ts                # Auto-generated sitemap
│   │   │   ├── (public)/                 # Public pages (no auth)
│   │   │   │   ├── timetable/page.tsx    # Weekly calendar + filters (day/category)
│   │   │   │   ├── membership/page.tsx   # Plans, billing toggle, comparison table, FAQ
│   │   │   │   ├── coaches/page.tsx      # Coach directory
│   │   │   │   └── coaches/[slug]/page.tsx  # Coach profile + their classes
│   │   │   ├── (auth)/                   # Authentication pages
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── register/page.tsx
│   │   │   │   ├── forgot-password/page.tsx
│   │   │   │   └── reset-password/page.tsx
│   │   │   ├── (member)/                 # Protected member portal
│   │   │   │   ├── dashboard/page.tsx    # Upcoming bookings, membership status
│   │   │   │   ├── bookings/page.tsx     # Book / cancel classes
│   │   │   │   ├── profile/page.tsx      # Edit profile + avatar upload
│   │   │   │   └── billing/page.tsx      # Plan, invoices, payment method, cancel
│   │   │   ├── admin/                    # Protected admin console
│   │   │   │   ├── page.tsx              # Overview: KPIs + today's schedule + recent joiners
│   │   │   │   ├── timetable/page.tsx    # Class timetable management
│   │   │   │   ├── members/page.tsx      # Paginated member directory
│   │   │   │   ├── members/[id]/page.tsx # Member dossier + operations
│   │   │   │   ├── bookings/page.tsx     # Turnstile check-in desk
│   │   │   │   ├── classes/page.tsx      # Class CRUD
│   │   │   │   └── payments/page.tsx     # Revenue & payments ledger
│   │   │   └── api/                      # Next.js API routes (NextAuth)
│   │   ├── components/
│   │   │   ├── home/                     # Hero, Timetable, Membership, Coaches sections
│   │   │   ├── admin/                    # AdminSubNav, KPI cards, check-in UI
│   │   │   ├── member/                   # MemberSubNav, booking cards
│   │   │   ├── forms/                    # Auth forms, profile forms
│   │   │   ├── animations/               # Framer Motion wrappers
│   │   │   └── ui/                       # shadcn/ui base components
│   │   ├── lib/
│   │   │   ├── analytics.ts              # PostHog event tracking
│   │   │   └── auth.ts                   # NextAuth config
│   │   ├── .env.example                  # All required web env vars
│   │   └── next.config.mjs
│   │
│   └── cms/                              # Payload CMS 2.0 (port 3001)
│       ├── src/
│       │   ├── server.ts                 # Standalone Express CMS admin (no DB required)
│       │   ├── collections/              # Classes, Coaches, MembershipPlans, Announcements
│       │   ├── access/                   # Role-based access control
│       │   ├── hooks/                    # afterChange → API cache invalidation
│       │   └── seed.ts                   # CMS seed script
│       └── payload.config.ts
│
├── packages/
│   ├── types/                            # Shared TypeScript types (@ironworks/types)
│   │   └── src/
│   │       ├── index.ts                  # Member, Class, Booking, Plan interfaces
│   │       └── validations.ts            # Shared Zod schemas
│   └── config/                           # Shared ESLint + tooling configs
│
├── screenshots/                          # 22 full-page PNG screenshots (all pages)
├── scripts/
│   ├── chrome-screenshots.ps1            # PowerShell screenshot capture script
│   └── take-screenshots.js               # Node.js screenshot script (puppeteer-core)
├── tests/
│   ├── e2e/user-journey.spec.ts          # Playwright end-to-end tests
│   └── load/timetable-load.js            # k6 load test (timetable endpoint)
├── docs/
│   └── PRODUCTION-HARDENING.md           # WCAG, Lighthouse, OWASP, Uptime checklist
├── legacy/v1/                            # Original static HTML/CSS/JS prototype
├── .github/workflows/
│   └── deploy.yml                        # CI/CD: lint → type-check → test → deploy
├── docker-compose.yml                    # PostgreSQL 16 + Redis 7 local dev
├── turbo.json                            # Turborepo pipeline caching config
├── pnpm-workspace.yaml                   # pnpm monorepo workspace config
└── package.json                          # Root scripts (run all apps via turbo)
```

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | ≥ 20.0.0 | [nodejs.org](https://nodejs.org) |
| pnpm | ≥ 9.0.0 | `npm i -g pnpm` |
| Docker | Latest | [docker.com](https://docker.com) *(optional — for local DB)* |

### 1. Clone & Install

```bash
git clone https://github.com/serviceprovidermanchester/IronWorks-Gym-Live-Timetable-Membership-Platform.git
cd IronWorks-Gym-Live-Timetable-Membership-Platform
pnpm install
```

### 2. Configure Environment Variables

```bash
# Copy and fill in your credentials
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
cp apps/cms/.env.example apps/cms/.env
```

> See [Environment Variables Reference](#-environment-variables) below for all required values.

### 3. Start Database (Optional — requires Docker)

```bash
docker compose up -d
# PostgreSQL → localhost:5432
# Redis      → localhost:6379
```

> **No Docker?** The API runs with resilient in-memory fallbacks — all endpoints return demo data without a live database.

### 4. Database Setup

```bash
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run all migrations
pnpm db:seed          # Seed 4 coaches, 18 classes, 3 plans, demo members
```

### 5. Start All Dev Servers

```bash
pnpm dev
```

| Service | URL | Description |
|---------|-----|-------------|
| 🌐 Frontend | [http://localhost:3000](http://localhost:3000) | Next.js 14 public site + member portal |
| ⚡ REST API | [http://localhost:4000/v1](http://localhost:4000/v1) | Express.js API |
| 🏋️ CMS Admin | [http://localhost:3001/admin](http://localhost:3001/admin) | Payload CMS admin panel |
| 🔍 API Health | [http://localhost:4000/v1/health](http://localhost:4000/v1/health) | Health check endpoint |

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| 👤 Member | `member@ironworksgym.com` | `MemberPassword123!` |
| 🛡️ Admin | `admin@ironworksgym.com` | `AdminPassword123!` |

---

## 🔌 REST API Reference

**Base URL:** `http://localhost:4000/v1`  
**Auth:** `Authorization: Bearer <accessToken>` (JWT, 15-min expiry)  
**Rate Limit:** 100 req/min (public) · 300 req/min (authenticated)

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | None | Register new member + send welcome email |
| `POST` | `/auth/login` | None | Login → JWT + httpOnly refresh cookie |
| `POST` | `/auth/logout` | Member | Invalidate session |
| `POST` | `/auth/refresh` | Cookie | Exchange refresh token for new access token |
| `POST` | `/auth/forgot-password` | None | Trigger password reset email |
| `POST` | `/auth/reset-password` | Token | Set new password with reset token |
| `GET`  | `/auth/verify-email/:token` | None | Verify email address |
| `GET`  | `/auth/me` | Member | Get current member profile |

### Classes & Timetable

| Method | Endpoint | Query Params | Description |
|--------|----------|-------------|-------------|
| `GET` | `/classes` | `?day=MON&category=STRENGTH&active=true` | List all active classes |
| `GET` | `/classes/:id` | — | Single class detail + coach |
| `GET` | `/classes/:id/schedule` | `?from=&to=` | Weekly occurrences + live capacity |
| `GET` | `/classes/categories` | — | Enum list of all categories |
| `GET` | `/coaches` | — | All active coaches |
| `GET` | `/coaches/:slug` | — | Coach profile + their classes |

### Bookings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/bookings` | Member | My bookings (`?status=CONFIRMED&page=1`) |
| `POST` | `/bookings` | Member | Book a class slot |
| `GET` | `/bookings/:id` | Member | Booking detail |
| `DELETE` | `/bookings/:id` | Member | Cancel booking (promotes waitlist) |

### Members & Membership

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/members/me` | Member | Full member profile |
| `PATCH` | `/members/me` | Member | Update profile fields |
| `GET` | `/members/me/membership` | Member | Current membership detail + billing |
| `GET` | `/members/me/payments` | Member | Paginated payment history |
| `GET` | `/membership-plans` | None | All active plans + features |
| `POST` | `/memberships/checkout` | Member | Create Stripe Checkout session |
| `POST` | `/memberships/mandate` | Member | Create GoCardless DD redirect |
| `POST` | `/memberships/cancel` | Member | Cancel (with cooling-off period) |
| `POST` | `/memberships/pause` | Member | Pause membership |
| `POST` | `/memberships/resume` | Member | Resume paused membership |

### Admin (`role: ADMIN` required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/admin/members` | List all members (paginated + search) |
| `GET/PATCH` | `/admin/members/:id` | View or edit member record |
| `GET` | `/admin/memberships` | All active memberships |
| `GET/POST/PATCH/DELETE` | `/admin/classes` | Full class CRUD |
| `GET` | `/admin/payments` | Full payments ledger |
| `POST` | `/admin/bookings/:id/check-in` | Mark member as checked-in |
| `GET` | `/admin/analytics` | MRR, attendance, revenue metrics |

### Webhooks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/webhooks/stripe` | Stripe subscription lifecycle (idempotent) |
| `POST` | `/webhooks/gocardless` | GoCardless mandate & payment events (idempotent) |

---

## 💳 Payment Flows

### Stripe — Card Payment

```
Member → POST /memberships/checkout
       → Stripe Checkout Session created
       → Redirect to Stripe hosted checkout
       → Payment success → checkout.session.completed webhook
       → Activate Membership (ACTIVE)
       → Create Payment record + Stripe Subscription
       → Send membership-confirmation email (Resend)
       → Redirect to /dashboard?success=true
```

### GoCardless — UK Direct Debit

```
Member → POST /memberships/mandate
       → GC Redirect Flow created
       → Redirect to GoCardless bank authorisation
       → Member authorises DD mandate
       → mandates.active webhook → save gcMandateId
       → Create GC Subscription (monthly, billing_day=1)
       → payments.paid_out webhook
       → Activate Membership + send membership-confirmation email
```

---

## 📧 Transactional Email Templates

All 11 templates built with HTML string renderers, sent via **Resend**:

| Template | Trigger | Key Content |
|----------|---------|-------------|
| `welcome.ts` | Register | Welcome + verify button |
| `email-verification.ts` | Register | Verify link (expires 24h) |
| `membership-confirmation.ts` | Payment success | Plan, start date, member ref `IW-XXXXX`, QR code |
| `payment-receipt.ts` | Payment collected | Amount, date, invoice PDF download |
| `payment-failed.ts` | Stripe/GC failure | Action required + update payment link |
| `booking-confirmation.ts` | Booking created | Class, date, time, coach, cancel link |
| `booking-reminder.ts` | 2h before class | Class reminder + gym directions |
| `booking-cancelled.ts` | Cancellation | Confirmation + rebook link |
| `password-reset.ts` | Forgot password | Reset link (expires 1h) |
| `membership-renewal.ts` | 3 days before renewal | Renewal amount + manage link |
| `membership-cancellation.ts` | Cancel confirmed | Cooling-off period details |

---

## 🎨 Frontend Pages

### Public (No Auth)
| Route | Description |
|-------|-------------|
| `/` | Homepage: Hero → Problem/Solution → Timetable → Membership → Coaches → CTA |
| `/timetable` | Weekly calendar with live capacity bars, day & category filters |
| `/membership` | Plan cards with monthly/annual toggle (-17%), comparison table, FAQ |
| `/coaches` | Coach directory grid |
| `/coaches/:slug` | Coach profile: bio, credentials, their classes |

### Auth
| Route | Description |
|-------|-------------|
| `/login` | Email/password login with NextAuth |
| `/register` | Member registration + email verification trigger |
| `/forgot-password` | Password reset request |
| `/reset-password` | Set new password via token |

### Member Portal (Auth required)
| Route | Description |
|-------|-------------|
| `/dashboard` | Upcoming bookings, membership status, quick actions |
| `/bookings` | Browse & book classes, cancel bookings, waitlist status |
| `/profile` | Edit name, bio, avatar (Cloudinary upload) |
| `/billing` | Current plan, payment method, invoice history, cancel flow |

### Admin Console (Admin role required)
| Route | Description |
|-------|-------------|
| `/admin` | Live KPI cards: active members, MRR, today's bookings, waitlist |
| `/admin/timetable` | Full class timetable with capacity indicators |
| `/admin/members` | Paginated searchable member directory |
| `/admin/members/:id` | Member dossier: bookings, payments, membership, operations |
| `/admin/bookings` | Turnstile check-in desk with QR scanner UI |
| `/admin/classes` | Class CRUD: add, edit, deactivate |
| `/admin/payments` | Revenue ledger with Stripe/GC transaction history |

### CMS Admin (Port 3001)
| Route | Description |
|-------|-------------|
| `/admin` | Dashboard: stats, today's schedule, recent joiners |
| `/admin/classes` | 18 class sessions — edit name, day, time, coach, capacity |
| `/admin/coaches` | 4 coach profiles — edit bio, specialisms, certifications |
| `/admin/plans` | Membership plan pricing and feature editing |
| `/admin/announcements` | Publish gym notices to member portal |
| `/admin/members` | Member directory (418 total) |

---

## 🗄️ Database Schema (Prisma)

9 models in PostgreSQL 16:

```
Member          → Users with role: MEMBER | ADMIN
ClassSession    → 18 weekly classes with schedule & capacity
Booking         → Member ↔ ClassSession with CONFIRMED | WAITLIST | CANCELLED | ATTENDED
MembershipPlan  → 3 tiers: Founding Member | Standard | Unlimited
Membership      → Member's active plan with billing dates
Payment         → Stripe/GC transaction records
PaymentMethod   → STRIPE | GOCARDLESS per member
ClassCoach      → Coach profiles linked to ClassSessions
Announcement    → CMS-managed member notices
```

---

## 🌐 Environment Variables

### `apps/api/.env`

```bash
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

### `apps/web/.env.local`

```bash
NEXT_PUBLIC_API_URL="https://api.ironworksgym.com/v1"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
NEXTAUTH_URL="https://ironworksgym.com"
NEXTAUTH_SECRET="min-32-char-secret"
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_SENTRY_DSN="..."
```

---

## 🧪 Testing

```bash
# Unit + Integration tests (Vitest)
pnpm test

# Type checking (all apps)
pnpm type-check

# Lint (all apps)
pnpm lint

# E2E tests (Playwright)
npx playwright test tests/e2e/user-journey.spec.ts

# Load test (k6)
k6 run tests/load/timetable-load.js
```

---

## 🚢 Deployment

### Production Stack

| Service | Platform | URL |
|---------|----------|-----|
| Frontend (Next.js) | Vercel | `https://ironworksgym.com` |
| REST API (Express) | Railway | `https://api.ironworksgym.com` |
| CMS Admin (Payload) | Railway | `https://cms.ironworksgym.com` |
| PostgreSQL 16 | Neon | Managed serverless |
| Redis 7 | Railway | Managed |

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
Jobs:
  lint-and-test   → ESLint + TypeScript check + Vitest
  build           → turbo build (all apps)
  deploy-api      → Railway deploy (apps/api)
  deploy-cms      → Railway deploy (apps/cms)
  deploy-web      → Vercel deploy (apps/web)
  smoke-test      → Health check all production endpoints
```

### Re-take Screenshots

```powershell
# Windows PowerShell (requires servers running on :3000 and :3001)
powershell -ExecutionPolicy Bypass -File scripts/chrome-screenshots.ps1
```

---

## 📊 Analytics & KPI Targets

**PostHog Events tracked:**

| Event | Properties |
|-------|-----------|
| `timetable_filtered` | `day, category, results_count` |
| `class_card_expanded` | `class_name, category, coach` |
| `checkout_started` | `tier, payment_method` |
| `checkout_completed` | `tier, revenue_gbp` |
| `checkout_abandoned` | `tier, step` |
| `booking_created` | `class_name, day, time` |
| `booking_cancelled` | `class_name, reason` |

**PRD KPI Targets:**

| Metric | Target |
|--------|--------|
| Online join rate | ≥ 50% of new memberships |
| Timetable filter usage | ≥ 45% of sessions |
| Join form completion | ≥ 55% of starters |
| Median time to join | ≤ 2 min |
| LCP (mobile) | ≤ 2.5s |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 95 |

---

## 🛡️ Security & Production Standards

- **JWT Auth:** HTTP-only refresh cookies + short-lived (15min) access tokens
- **Rate Limiting:** `express-rate-limit` — 100 req/min public, 300 req/min authed
- **Input Validation:** Zod schemas on all API endpoints
- **Webhook Verification:** Stripe signature + GoCardless secret validation
- **Idempotency:** All webhook handlers deduplicate via event ID
- **PCI Compliance:** Zero card data stored — all via Stripe Elements
- **SQL Safety:** Prisma parameterized queries — no raw SQL injection risk
- **Headers:** Helmet.js + X-Frame-Options DENY + Content-Security-Policy
- **OWASP Top 10:** Addressed — see [docs/PRODUCTION-HARDENING.md](docs/PRODUCTION-HARDENING.md)

---

## 🎯 Acceptance Criteria Status

| Criteria | Status |
|---------|--------|
| Member can register, verify email, log in, log out | ✅ Complete |
| Member can view CMS-driven timetable with day + category filters | ✅ Complete |
| Member can join via Stripe card + receive confirmation email | ✅ Complete |
| Member can join via GoCardless Direct Debit | ✅ Complete |
| Member can book a class + receive reminder email | ✅ Complete |
| Member can cancel a booking | ✅ Complete |
| Member can view billing history + download invoice | ✅ Complete |
| Admin can edit class in Payload CMS → reflects on site within 60s | ✅ Complete |
| Admin can mark member as checked in via admin dashboard | ✅ Complete |
| All Stripe and GoCardless webhooks verified and idempotent | ✅ Complete |
| Lighthouse Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 | 🎯 Configured |
| Zero critical OWASP vulnerabilities | ✅ Hardened |
| CI pipeline: lint → type-check → test → E2E → deploy | ✅ Complete |

---

## 🏢 About SPManchester Private Limited

**[SPManchester Private Limited](https://www.spmanchester.com)** is a premier software engineering, cloud architecture, and web development agency based in Manchester, United Kingdom. We build mission-critical, enterprise-grade digital platforms for ambitious businesses.

| | |
|--|--|
| **Founder & Lead Architect** | Sayed Mudassar Akbar |
| **Website** | [www.spmanchester.com](https://www.spmanchester.com) |
| **Email** | [info@spmanchester.com](mailto:info@spmanchester.com) |
| **Services** | Custom Web Applications · Enterprise Cloud Architecture · API Engineering · Platform Modernization |

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for complete details.

Copyright © 2026 **SPManchester Private Limited**. All rights reserved.

---

<div align="center">

**[⬆ Back to top](#-ironworks-gym)**

Made with 🧡 by [SPManchester Private Limited](https://www.spmanchester.com) · Manchester, UK

</div>
