# Product Requirements Document (PRD) — IronWorks Gym

| Field | Detail |
|---|---|
| Project | **IronWorks Gym** — Strength, conditioning & classes · Ancoats, Manchester |
| Document | Product Requirements Document (PRD) |
| Version | 1.0 (first issue, alongside the built concept website) |
| Date | 10 November 2026 |
| Prepared by | SPManchester — Web Design & Development (https://spmanchester.com/) |
| Portfolio service | 01 · Web Design & Development (project folder `spm-web-gym-timetable`) |
| Status | Concept / demo project — approved for portfolio, GitHub and client-pitch use |
| Companion documents | Technical Requirements Document (TRD.md) — how it is built and how it goes live; PROJECT-DETAILS.md — pitch, portfolio entry and LinkedIn draft; README.md — how to run |

> **Concept notice:** IronWorks Gym is a **fictional business** created by SPManchester as a portfolio
> concept project. Names, prices, reviews and figures are illustrative samples, chosen to be
> realistic for the Manchester market. Nothing in this document claims a real client engagement.


## 1. Executive summary
A gym website with a data-driven class timetable (18 classes across 7 days and 6 categories) with day and category filters, clear membership plans, and an online joining flow that confirms instantly with a member reference.

**Pitch in one line:** Indie gyms run on Instagram screenshots and paper forms. This site gives them chain-level convenience: a live timetable and 2-minute online joining.

This PRD defines the product as built (the working concept website in this folder) and the
requirements a live client version must meet. It is written so that (a) a client in this trade
can see exactly what they would get, and (b) any developer can build the live version without
re-deciding the product.

## 2. The market problem
Independent gyms run on Instagram screenshots and paper joining forms, while members expect chain-level convenience: a live timetable they can filter and joining that takes two minutes online.

### 2.1 Why now
- Buyers in this market research on mobile, outside business hours, and choose whoever answers
  first with a price or a booking — not whoever has the nicest brochure.
- The concept is designed to 2026 expectations (instant answers, transparent pricing, one-tap
  actions) so it stays pitchable through 2028 without a redesign of the core journeys.
- For SPManchester, this project is portfolio proof for the Web Design & Development service:
  working code, a screenshot, this PRD and its companion TRD, ready for GitHub and LinkedIn.

## 3. Product vision & goals
**Vision:** Indie gyms run on Instagram screenshots and paper forms. This site gives them chain-level convenience: a live timetable and 2-minute online joining.

| # | Goal | Why it matters |
|---|---|---|
| G1 | Convert visitors into enquiries/bookings on the website itself, 24/7 | The website must earn, not just describe |
| G2 | Answer the visitor's price/availability question instantly | Price silence is the top conversion killer in this market |
| G3 | Be fully usable one-handed on a phone | The majority of this market's traffic is mobile |
| G4 | Be credible enough to pitch to a real client in this trade as-is | This is a portfolio asset, not a mock-up |
| G5 | Define a clean upgrade path to a live, integrated product | A client who says yes should reach MVP without a rebuild |

## 4. Success metrics (live-build targets)
| Metric | Target |
|---|---|

| Online joins | ≥ 50% of new memberships start online within 6 months |
| Timetable engagement | ≥ 45% of sessions use a day/category filter |
| Join-form completion rate | ≥ 55% of visitors who start joining |
| Time to join | ≤ 2 minutes median |
| Paper/Instagram timetable requests | Effectively zero — timetable lives on the site |

| Portfolio metric (SPManchester) | Project is published with code, screenshot, PRD and TRD, and is used in at least one client pitch |

Targets are measured from launch of a live version (GA4 + the business's own booking/lead
records). The demo itself takes no measurements — see the TRD for the analytics requirements.

## 5. Target users

### 5.1 Shift worker
- **Goal:** Find classes that fit a rotating rota before joining
- **Pain today:** Chain gyms' apps set the expectation; paper timetables are useless to them
- **Journey on this site:** Filters timetable by day and category across the week, then joins online at midnight

### 5.2 Student / first-time joiner
- **Goal:** Compare plans and join without a sales tour
- **Pain today:** Intimidated by in-person sign-up and unclear pricing
- **Journey on this site:** Reads plans, joins the entry plan online, gets a member reference instantly

### 5.3 Ex-chain member
- **Goal:** Same convenience, better coaching and price
- **Pain today:** Left a chain overcrowding; checks class variety first
- **Journey on this site:** Filters Conditioning and Combat to verify depth, then joins


## 6. Scope
### 6.1 In scope — as built (concept website, v1.0)
- Single-page, mobile-first website: story (Problem → Solution), timetable (filterable), plans (membership plans), join (online joining).
- Headline interactive feature: Data-driven class timetable (18 classes) with day & category filters, membership plans and an online joining flow with instant confirmation.
- Instant on-screen confirmation with a generated reference (prefix IW-) for every
  submitted request — no data leaves the browser in the demo.
- Problem → Solution storytelling section, reviews/testimonials (sample), SEO-ready semantic
  markup, zero third-party dependencies, no build step.

### 6.2 Out of scope (deliberately excluded from the demo)

- Payments or Direct Debit set-up (demo confirms without payment)
- Class booking with capacity (timetable is informational)
- Member app, workout tracking or access control
- Personal-training booking

### 6.3 Future scope (live client build)

- Phase 2 (live MVP): Direct Debit joining, emailed QR access, CMS-managed timetable.
- Phase 3: bookable classes with waiting lists, PT booking, member referrals.

## 7. Primary user journey (as built)
1. Visitor lands from Google/LinkedIn on the hero, which names the problem and the fix.
2. They read the Problem → Solution story section and the offer sections
   (story (Problem → Solution), timetable (filterable), plans (membership plans), join (online joining)).
3. They use the headline feature: **Data-driven class timetable (18 classes) with day & category filters, membership plans and an online joining flow with instant confirmation.**
4. They submit the request form (name (text, required); email (email, required); plan (select, required); start (date, required)).
5. They immediately see a confirmation panel repeating their own selections, with reference
   **IW-XXXXX**, and a plain statement of what would happen next in a live build.
6. In a live build, the business receives the request in its existing system (see TRD §11)
   and the visitor receives an SMS/email confirmation — the demo simulates step 5 only.

## 8. Functional requirements
Priority key: **Must** = required for the product to work / be pitchable · **Should** = expected
in a live build · **Could** = enhancement backlog (§12).

### FR-01 — Filterable class timetable (Must)
18 classes rendered from one data array; day chips (All + Mon–Sun) and category chips (All + 6 categories) filter in combination, with a live count of matching classes.
- **Acceptance criteria:** Selecting Mon + Strength shows exactly the 2 Monday Strength classes; count text updates every change

### FR-02 — Membership plans (Must)
Plans presented as comparable cards under #plans, feeding the join form's plan select.
- **Acceptance criteria:** Every plan in the join select also appears as a plan card

### FR-03 — Online joining flow (Must)
Name, email, plan and start date; instant confirmation with member reference (IW-) and a note that the access QR would be emailed in the live build.
- **Acceptance criteria:** Confirmation repeats plan and start date and shows an IW- reference

### FR-04 — Coach attribution (Should)
Every class names its coach, building familiarity before the first visit.
- **Acceptance criteria:** All 18 timetable rows show a coach name

### FR-05 — Mobile-first design (Must)
Timetable and joining must work one-handed on a phone at the gym door.
- **Acceptance criteria:** Filters and join form fully usable at 360px


## 9. Content requirements
- Voice: plain English, Manchester-local, written for a non-technical visitor; every price or
  figure labelled as sample content while the project is a concept.
- Sections and their content are fixed as built: story (Problem → Solution), timetable (filterable), plans (membership plans), join (online joining).
- Reviews/testimonials in the demo are sample content and are labelled as such in
  PROJECT-DETAILS.md; a live build must replace them with verified reviews.
- Imagery: the demo uses CSS-based visuals (see TRD Known Limitations). A live build requires
  licensed or owned photography supplied or approved by the client.

## 10. Data requirements (product level)
CLASSES is a JS array of 18 rows, each [day, time, class name, coach, category] — e.g. ['Mon','06:30','Strength Foundations','Coach Dee','Strength']. Days Mon–Sun; categories Strength, HIIT, Conditioning, Mobility, Combat (plus 'All'). Plans are static HTML mirrored in the join form's select. Memberships exist only in the confirmation panel.

- The demo stores **nothing**: no cookies, no local storage, no analytics, no transmission.
- A live build must collect the minimum personal data needed for the transaction, show a
  privacy notice at the point of collection, and route data into the business's existing
  system of record (TRD §11) rather than a new silo.

## 11. Non-functional requirements (product level)
| Area | Requirement |
|---|---|
| Responsive | Fully usable at 360px wide and on desktop; no horizontal scrolling; tap targets ≥ 44px |
| Performance | Static page, zero dependencies; live-build budget: LCP ≤ 2.5s on a mid-range phone (4G) |
| Accessibility | Live build targets WCAG 2.2 AA; demo keeps semantic structure, labelled fields and visible focus |
| SEO | One H1, meta description, location/service headings; live build adds LocalBusiness schema and Google Business Profile alignment |
| Trust | Every figure labelled sample in the concept; live build shows only verifiable claims |
| Availability (live) | Static hosting (≥ 99.9% typical) — no server to maintain |

## 12. Client feedback incorporated & enhancement backlog
Ali (SPManchester) reviewed the built websites on 10 November 2026 and judged the designs functional but
**not yet special enough** visually. That feedback is accepted and recorded here rather than
argued with. The following enhancements are therefore part of this product's backlog, in
priority order:
1. **Real photography / richer imagery** in place of CSS-gradient and flat visuals.
2. **Stronger visual identity per project** — distinctive typography, motion/animation on
   scroll, and a more premium hero treatment.
3. **Deeper interactivity** — the live-build integrations in the TRD (real availability,
   payments, CRM routing) replacing client-side simulation.
4. Additional screenshots (mobile + key-feature states) for GitHub/LinkedIn presentation.
These PRD/TRD documents were commissioned in the same review, to make each project
client-presentable as a complete package even before the visual upgrade lands.

## 13. Risks & assumptions
| Risk / assumption | Handling |
|---|---|
| Sample prices drift from real market rates | Labelled sample everywhere; recalibrate with the client at live-build kickoff |
| Demo confirmations could be mistaken for real bookings | Every confirmation states it is a demo and that nothing was booked/charged |
| Fictional business mistaken for a real client | Concept notice in README, PROJECT-DETAILS and this PRD |
| Regulatory specifics change (see TRD §13) | Recheck at live-build kickoff; this document states the position at 10 November 2026 |

## 14. Compliance & trust requirements (summary)

- Consumer law: membership terms, cooling-off (14-day online joining cancellation under the Consumer Contracts Regulations) and freeze/cancel terms must be published with the plans in the live build.
- UK GDPR: email used for membership administration; marketing opt-in kept separate.
- Health data: the demo join form deliberately collects no health information; any PAR-Q belongs inside the membership platform, not this website.

## 15. Deliverables & sign-off
Delivered with this PRD: the working website (`index.html`, `styles.css`, `script.js`),
`README.md`, `PROJECT-DETAILS.md`, `TRD.md`, screenshots folder, and a ZIP of the whole
project — packaged for Google Drive, GitHub and the spmanchester.com portfolio.

| Role | Name | Decision |
|---|---|---|
| Prepared by | SPManchester (Harbor) | Issued v1.0, 10 November 2026 |
| Reviewed by | Ali — SPManchester | Designs reviewed 10 November 2026; PRD/TRD commissioned and added |
| Client sign-off (live build) | — | To be completed when a real client commissions the live version |
