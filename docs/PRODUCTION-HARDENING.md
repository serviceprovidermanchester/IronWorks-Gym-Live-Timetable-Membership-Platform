# 🛡️ IronWorks Gym — Production Hardening & Quality Assurance
**SPManchester Private Limited** · Flagship Ancoats, Manchester · [www.spmanchester.com](https://www.spmanchester.com)

---

## 1. ♿ WCAG 2.2 AA Accessibility Audit
- **Color Contrast**: Compliant with AA ratio (4.5:1 for normal text, 3:1 for large text) across dark athletic theme (`#020617` background vs `#f8fafc` text, `#ff5500` brand accent).
- **Keyboard Navigation**: Focus rings (`ring-2 ring-brand`) on interactive buttons, drawer modals, tabs, and filter pills.
- **Screen Reader Support**: Semantic HTML5 elements (`<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`), ARIA labels on icon buttons.

---

## 2. ⚡ Google Lighthouse Target Benchmarks
- **Performance**: ≥ 90 (Next.js server-side static rendering, AVIF/WebP image optimization, code-splitting).
- **Accessibility**: ≥ 95 (Full semantic tree, aria roles on dialogs and check-in drawers).
- **Best Practices**: ≥ 95 (HTTPS, modern HTTP headers, zero console errors, secure CSP).
- **SEO**: ≥ 95 (Automated `sitemap.xml`, `robots.txt`, dynamic metadata, OpenGraph tags, schema.org `ExerciseGym` JSON-LD).

---

## 3. 🔒 OWASP Top 10 Security Checklist
| Risk Category | Implementation in IronWorks Gym |
|---|---|
| **A01: Broken Access Control** | Next.js middleware + Express `requireAuth` & `requireAdmin` role guards on all `/admin/*` and `/v1/admin/*` routes. |
| **A02: Cryptographic Failures** | Bcrypt 10 rounds for passwords; JOSE RS256/HS256 for signed JWTs; HTTPS enforcement in production. |
| **A03: Injection** | Parameterized Prisma ORM queries; strict Zod schema validation on all inputs; zero raw SQL. |
| **A04: Insecure Design** | Rate limiting (`express-rate-limit`) on public endpoints (100 req/min) and auth endpoints. |
| **A05: Security Misconfiguration** | Helmet.js configured with strict Content Security Policy, X-Frame-Options, HSTS, and X-Content-Type-Options. |
| **A06: Vulnerable Components** | Monorepo dependencies managed with frozen pnpm lockfile and Dependabot audits. |
| **A07: Identification & Auth** | Short-lived 15-minute access JWTs; secure httpOnly cookie refresh tokens with 30-day rotation. |
| **A08: Software & Data Integrity** | Cryptographic webhook signature verification for Stripe (`stripe.webhooks.constructEvent`) and GoCardless. |
| **A09: Logging & Monitoring** | Pino structured JSON logging; Sentry error instrumentation; deduplication cache for webhook replay attacks. |
| **A10: SSRF** | All external API endpoints validated against explicit whitelists (Stripe, GoCardless, Resend, Cloudinary). |

---

## 4. 📈 Uptime & Backup Policy
- **Uptime Monitoring**: Better Uptime (or UptimeRobot) configured to poll `https://api.ironworksgym.com/v1/health` and `https://ironworksgym.com` every 60 seconds with PagerDuty alerts.
- **Neon Postgres Snapshots**: Managed daily automated database snapshots with point-in-time recovery (PITR) up to 7 days.
