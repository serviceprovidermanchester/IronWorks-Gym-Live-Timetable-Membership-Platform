# Security Policy

> **Maintained by [SPManchester Private Limited](https://www.spmanchester.com)**

## Overview

SPManchester Private Limited takes the security of all our open-source projects seriously. This document describes the security posture of the **IronWorks Gym** project and how to responsibly report a vulnerability.

---

## Supported Versions

| Version | Status | Support |
|---|---|---|
| `main` branch | ✅ Active | Security fixes applied |
| Tagged releases | ✅ Active | Security fixes backported |
| Forks / derivatives | ⚠️ Community | Maintained by fork owners |

---

## Project Security Posture

This is a **static-only, zero-dependency** web project. Its security characteristics are:

| Characteristic | Detail |
|---|---|
| **No backend** | No server, no database, no API — nothing to exploit server-side |
| **No data storage** | The demo stores nothing: no cookies, no localStorage, no analytics, no transmission |
| **No authentication** | No login, no session tokens, no credentials |
| **No external requests** | The page makes zero network requests beyond its own three files |
| **No user-uploaded content** | No file input, no image upload |
| **No third-party scripts** | Zero CDN, zero npm dependency — no supply-chain risk |

Despite this minimal attack surface, we still treat security reports seriously — particularly for:
- Cross-site scripting (XSS) risks introduced by any future dynamic content
- Vulnerabilities introduced in a derivative live-build version
- Issues in our portfolio website at [www.spmanchester.com](https://www.spmanchester.com)

---

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, report them **privately** to our security contact:

### Primary Contact

| Channel | Details |
|---|---|
| 📧 **Email** | [info@spmanchester.com](mailto:info@spmanchester.com) |
| 🌐 **Website** | [www.spmanchester.com](https://www.spmanchester.com) |
| **Subject line** | `[SECURITY] spm-web-gym-timetable — <brief description>` |

### What to Include in Your Report

Please provide as much of the following as possible:

```
1. Type of vulnerability (e.g. XSS, information disclosure, dependency confusion)
2. Affected file(s) and line numbers (if known)
3. Step-by-step reproduction instructions
4. Proof-of-concept or exploit code (if available)
5. Potential impact — what an attacker could do
6. Suggested fix (optional but appreciated)
```

---

## Response Process

| Step | Timeline |
|---|---|
| **Acknowledgement** | Within 2 business days of receipt |
| **Initial assessment** | Within 5 business days |
| **Status update** | Weekly updates until resolved |
| **Resolution** | Varies by severity — critical issues patched within 7 days |
| **Public disclosure** | Coordinated with the reporter after fix is released |

We follow a **90-day coordinated disclosure** window. If you need to disclose publicly before that, please notify us in advance so we can release a fix or advisory simultaneously.

---

## Responsible Disclosure Policy

We ask security researchers to:

- Give us reasonable time to investigate and address the issue before public disclosure
- Avoid accessing, modifying, or deleting data that is not yours
- Avoid automated scanning that disrupts the service
- Not perform physical testing or social engineering against SPManchester staff
- Act in good faith throughout the process

In return, SPManchester Private Limited commits to:

- Acknowledge your report promptly
- Keep you informed of progress
- Not pursue legal action against researchers acting in good faith
- Credit you in the security advisory (unless you prefer to remain anonymous)

---

## Scope

**In scope:**
- `spm-web-gym-timetable` repository code
- Deployed demos at `*.github.io/spm-web-gym-timetable`
- SPManchester portfolio website at [www.spmanchester.com](https://www.spmanchester.com)

**Out of scope:**
- Social engineering or phishing attacks against SPManchester staff
- Denial of service (DoS/DDoS)
- Issues in GitHub's own infrastructure
- Issues in browsers or operating systems (report those to the vendor)

---

## Security Best Practices for Forks / Live Builds

If you are building a live version of this project for a real client, please additionally:

1. **Serve over HTTPS** — required for any form that collects personal data
2. **Add a Content Security Policy header** — prevents XSS in a live build
3. **Keep dependencies minimal** — the demo is zero-dependency by design; every dependency you add is a supply-chain risk
4. **Apply UK GDPR requirements** — privacy notice, data minimisation, right-to-erasure — before going live
5. **Conduct a security review** before connecting a payment provider or CMS

---

*SPManchester Private Limited · Manchester, UK · [www.spmanchester.com](https://www.spmanchester.com) · [info@spmanchester.com](mailto:info@spmanchester.com)*
