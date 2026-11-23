# Technical Requirements Document (TRD) — IronWorks Gym

| Field | Detail |
|---|---|
| Project | **IronWorks Gym** — Strength, conditioning & classes · Ancoats, Manchester |
| Document | Technical Requirements Document (TRD) |
| Version | 1.0 (first issue, alongside the built concept website) |
| Date | 10 November 2026 |
| Prepared by | SPManchester — Web Design & Development (https://spmanchester.com/) |
| Portfolio service | 01 · Web Design & Development (project folder `spm-web-gym-timetable`) |
| Status | Concept / demo project — approved for portfolio, GitHub and client-pitch use |
| Companion documents | Product Requirements Document (PRD.md) — what it must do and why; PROJECT-DETAILS.md — pitch, portfolio entry and LinkedIn draft; README.md — how to run |

> **Concept notice:** IronWorks Gym is a **fictional business** created by SPManchester as a portfolio
> concept project. Names, prices, reviews and figures are illustrative samples, chosen to be
> realistic for the Manchester market. Nothing in this document claims a real client engagement.


## 1. Purpose & current state
This TRD describes the website **as actually built** in this folder (verified by code
inspection on 10 November 2026), the standards it must keep, and the technical path to a live,
integrated production version. Where the demo deliberately simulates behaviour (no backend,
no storage), this document says so plainly.

**As-built file inventory**
| File | Role |
|---|---|
| `index.html` | Page structure and all content (semantic HTML5) |
| `styles.css` | All styling — CSS custom properties, grid/flex layouts, media queries, mobile-first |
| `script.js` | All interactivity — vanilla JavaScript, no libraries, no build step |
| `README.md` | Pitch and run instructions |
| `PROJECT-DETAILS.md` | Problem/solution, portfolio entry text, LinkedIn draft |
| `PRD.md` | Product Requirements Document (companion) |
| `TRD.md` | This document |
| `screenshots/` | Preview image(s) of the finished design |

## 2. Architecture (as built)
```
Browser (any modern device)
└── Single static page — no server, no database, no build step
    ├── index.html ──► styles.css (presentation)
    └── script.js  ──► in-page data objects + DOM rendering
                       form handlers ──► in-page confirmation (no network call)
```
- **Pattern:** static single-page site; content sections in HTML; data-driven widgets rendered
  by JavaScript from in-file data structures; form submissions intercepted client-side.
- **Hosting:** any static host (GitHub Pages, Netlify, ordinary web hosting) or opened
  directly from disk. HTTPS required in production.
- **External calls:** none. The page makes zero network requests beyond its own three files.

## 3. Technology stack
| Layer | Choice (as built) | Constraint |
|---|---|---|
| Markup | HTML5, semantic elements, one H1, meta description | No frameworks |
| Styling | CSS3 — custom properties (design tokens), grid & flexbox, media queries | Single stylesheet; mobile-first |
| Behaviour | Vanilla JavaScript (ES6) | Zero dependencies; must pass `node --check` |
| Data | In-file JS objects/arrays + HTML option values (see §5) | No database, no localStorage, no cookies |
| Assets | CSS gradients / styled placeholders | No external images in the demo (see §14) |

## 4. Component breakdown
| Component | Implementation |
|---|---|
| Sticky navigation | HTML + CSS; anchor links to #story, #timetable, #plans, #join |
| Story section (#story) | Static HTML — Problem → Solution pitch narrative |
| Interactive feature | Data-driven class timetable (18 classes) with day & category filters, membership plans and an online joining flow with instant confirmation. |
| Request form(s) | Fields: name (text, required); email (email, required); plan (select, required); start (date, required) |
| Form handling | window.joinGym(fd) → showResult('gym-result', …) with refCode('IW'); timetable filters re-render via renderTT() |
| Confirmation system | Shared helpers `showResult(id, html)` (inject HTML, add `.show`, smooth-scroll into view) and `refCode(prefix)` (prefix + '-' + 5 random base-36 chars, upper-cased) |
| Reviews/content sections | Static HTML, sample content labelled per the PRD |

### 4.1 Interactive logic — exact behaviour
chips(id, items, setter) builds filter chips for days and categories (first chip active). renderTT() filters CLASSES with (day==='All' || c[0]===day) && (cat==='All' || c[4]===cat) and re-renders the table body plus the match count. Both filters compose (logical AND). joinGym() echoes name, plan, start date and email into the confirmation with refCode('IW'). No capacity or availability logic exists in the demo — classes are informational, not bookable, in this version.

## 5. Data model (as built)
| Entity | Fields |
|---|---|

| ClassSession (JS array row) | day, time, name, coach, category |
| MembershipPlan (static HTML + select) | name (price shown on plan cards) |
| Membership (demo, in-memory only) | name, email, plan, start, member reference (generated) |

- **Persistence:** none. All demo entities are transient (DOM / JS variables).
- **Personal data in the demo:** form inputs are read into a `FormData` object, echoed into
  the confirmation, and discarded on navigation/reload. Nothing is transmitted or stored.

## 6. Forms & validation requirements
- Use native HTML validation (`required`, `type=email`, `type=tel`, `type=date`) — the demo
  relies on it and the live build must keep it as the first line of defence.
- Every form carries `data-demo="<handler>"`; a single delegated listener calls
  `window[handler](new FormData(form))` after `preventDefault()`.
- Live build additions (mandatory): server-side validation mirroring the client rules,
  CSRF protection, rate limiting and spam control (e.g. Turnstile/hCaptcha + honeypot),
  and error messages that name the field and the fix.

## 7. Security requirements
| # | Requirement (live build) | Demo status |
|---|---|---|
| S1 | HTTPS everywhere (HSTS) | Host-dependent |
| S2 | No personal data stored by the website itself; route to the system of record | ✅ Nothing stored or sent |
| S3 | Escape/encode all user input before rendering (the demo echoes form values into HTML — acceptable only because it is a local, self-only demo; **the live build must sanitise**) | ⚠️ Known demo shortcut — flagged, must fix for production |
| S4 | Security headers (CSP, X-Content-Type-Options, Referrer-Policy) on the host | Host configuration at launch |
| S5 | Payments, if any, only via hosted PCI-compliant pages — never handle card data | N/A in demo (no payments) |
| S6 | Dependency risk: zero third-party JS in the demo; any live-build library must be pinned and reviewed | ✅ Zero dependencies |

## 8. Performance requirements
- Page weight budget (live build): ≤ 500 KB total initial load excluding photography;
  photography in WebP/AVIF with responsive `srcset` and lazy loading.
- Core Web Vitals targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 on a mid-range Android over 4G.
- The demo's zero-dependency, single-file-per-layer structure is the baseline — do not add a
  framework for the live build without a recorded reason in a TRD revision.

## 9. Accessibility requirements
- Target: **WCAG 2.2 AA** for any live/public-sector-adjacent deployment; the demo keeps
  semantic landmarks, labelled inputs, keyboard-reachable controls and visible focus.
- Interactive widgets (chips, filters, lightboxes, calculators) must be fully keyboard
  operable in the live build, with state conveyed to assistive technology (`aria-pressed`,
  `aria-live` on result panels and counts).
- Result/confirmation panels should use `role="status"` in the live build so screen readers
  announce them.

## 10. SEO & analytics requirements
- As built: semantic HTML, single H1, meta description, descriptive section headings.
- Live build: LocalBusiness (or sector-equivalent) JSON-LD, Open Graph tags, sitemap,
  Google Business Profile alignment, and GA4 (or privacy-friendly equivalent) events for:
  feature use, form start, form submit, confirmation shown, call/CTA clicks — mapped to the
  PRD §4 metrics. Consent mode required before marketing cookies.

## 11. Production upgrade path (live build)
The demo is the front-end of the live product. Going live adds a thin backend/integration
layer; the page structure, content and interaction patterns carry over unchanged.

**Target production architecture**
```
Browser ──► Static site (as built, hardened per §6–§10)
              │  HTTPS JSON
              ▼
        API layer (serverless functions or small service)
              ├──► Business system of record (below)
              ├──► Messaging (SMS/email confirmations)
              └──► Analytics / CRM lead capture
```

**Sector integrations required**

- **Membership billing:** GoCardless (Direct Debit — the UK gym standard) or Stripe subscriptions started from the join flow
- **Access control:** QR/barcode entry system fed by the membership record (the demo confirmation already promises an emailed QR)
- **Class booking & capacity:** Live build: bookable classes with capacity and waiting lists (e.g. via the membership platform's API)
- **Member comms:** Email/SMS onboarding sequence from the CRM (welcome, first-week plan, referral offer)

**Indicative API contract (live build)**
| Endpoint | Purpose |
|---|---|

| `POST /api/memberships` | Create membership {name, email, planId, startDate} → 201 {memberReference, paymentSetupUrl} |
| `GET /api/classes?day=&category=` | Return the week's classes from the CMS (single source replacing the CLASSES array) |
| `POST /api/classes/{id}/book` | Live build only: book a place, enforcing capacity |

All endpoints: JSON over HTTPS, server-side validation, references in the same

`IW-XXXXX` format the demo already issues, and idempotency keys on create calls so a
double-tap never creates two requests.

## 12. Testing requirements & test cases
Release gate for any version: all cases below pass, `node --check script.js` is clean, and
the page is checked at 360px, 768px and 1280px widths.
| # | Test case | Expected result |
|---|---|---|

| T01 | Filter Mon + Strength | Exactly 2 rows: 06:30 Strength Foundations and 18:00 Olympic Lifting |
| T02 | Filter All + All | All 18 classes listed; count reads 18 |
| T03 | Filter Sun + Combat | Zero rows with a graceful empty state / count of 0 |
| T04 | Change only the category filter | Day filter persists (filters compose) |
| T05 | Join with each plan | Confirmation repeats the chosen plan and start date with an IW- reference |
| T06 | Join with invalid email | Native validation blocks submission |
| T07 | 360px viewport | Timetable table scrolls or stacks readably; join form usable |
| T08 | node --check script.js | Passes (verified 2026-11-10) |

## 13. Compliance (technical implications)

- Consumer law: membership terms, cooling-off (14-day online joining cancellation under the Consumer Contracts Regulations) and freeze/cancel terms must be published with the plans in the live build.
- UK GDPR: email used for membership administration; marketing opt-in kept separate.
- Health data: the demo join form deliberately collects no health information; any PAR-Q belongs inside the membership platform, not this website.

## 14. Known limitations of the demo (honest list)
1. **Visual richness:** Ali's review (10 November 2026) — the designs work but are 'not special enough'
   yet. Imagery is CSS-based; a production pass needs real photography, stronger typography
   and motion. Recorded in the PRD §12 backlog; it is the top enhancement priority.
2. **No backend:** confirmations are simulated in the browser; references are random and not
   stored or verifiable.
3. **No real availability/pricing source:** all data is sample data in code (see §5).
4. **Input echo without sanitisation** (see S3) — demo-only shortcut, must be fixed live.
5. **Single page:** a live build may split long content into sub-pages for SEO depth.

## 15. Deployment & maintenance
- **Deploy (demo/portfolio):** copy the folder to any static host, or open `index.html`.
  For GitHub: one repository per project under
  https://github.com/serviceprovidermanchester named `spm-web-gym-timetable`, with README,
  PROJECT-DETAILS, PRD and TRD included (this package).
- **Versioning:** semantic versioning on this TRD/PRD pair; any change to the interactive
  logic in §4.1 requires a TRD revision note and re-running §12 tests.
- **Maintenance (live):** quarterly review of prices/sample data, monthly checks of form
  routing and confirmations, annual accessibility and compliance re-check (§13).

| Role | Name | Decision |
|---|---|---|
| Prepared by | SPManchester (Harbor) | Issued v1.0, 10 November 2026 |
| Reviewed by | Ali — SPManchester | Commissioned 10 November 2026 after reviewing the built websites |
