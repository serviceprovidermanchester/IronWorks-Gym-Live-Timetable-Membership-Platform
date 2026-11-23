# Contributing to IronWorks Gym — Live Timetable & Membership Platform

> **Maintained by [SPManchester Private Limited](https://www.spmanchester.com)**
> Questions? Email [info@spmanchester.com](mailto:info@spmanchester.com)

Thank you for your interest in contributing! This is an open portfolio project and we genuinely welcome community involvement — bug reports, feature suggestions, design improvements, and pull requests.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Branch Strategy](#branch-strategy)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Style Guide](#style-guide)
- [Contact](#contact)

---

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it. Please report unacceptable behaviour to [info@spmanchester.com](mailto:info@spmanchester.com).

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/spm-web-gym-timetable.git
   cd spm-web-gym-timetable
   ```
3. **Open** `index.html` in your browser — no build step required
4. **Optionally** run a local server:
   ```bash
   npx serve .
   # → http://localhost:3000
   ```

---

## How to Contribute

### 🐛 Report a Bug
- Search [existing issues](https://github.com/serviceprovidermanchester/spm-web-gym-timetable/issues) first
- If none exists, open a new issue using the **Bug Report** template
- Include: browser/OS, steps to reproduce, expected vs actual behaviour, and a screenshot if helpful

### 💡 Suggest a Feature
- Open a [Feature Request](https://github.com/serviceprovidermanchester/spm-web-gym-timetable/issues/new) issue
- Describe the problem you are solving, not just the solution
- Check the [Roadmap](README.md#️-roadmap) first — it may already be planned

### 🔧 Submit a Pull Request
- Pick an open issue (or create one first so we can align on scope)
- Follow the [Branch Strategy](#branch-strategy) and [Commit Conventions](#commit-conventions) below
- Keep PRs focused — one feature or fix per PR

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready code — protected; only maintainers merge here |
| `develop` | Integration branch for upcoming releases |
| `feat/<short-description>` | New features (e.g. `feat/scroll-animations`) |
| `fix/<short-description>` | Bug fixes (e.g. `fix/mobile-filter-overflow`) |
| `docs/<short-description>` | Documentation-only changes |
| `chore/<short-description>` | Tooling, config, or dependency updates |

```bash
# Example
git checkout -b feat/coach-profile-cards
```

---

## Commit Conventions

We follow the **Conventional Commits** specification. Every commit message must have the form:

```
<type>(<optional scope>): <short summary in present tense>
```

### Types

| Type | When to use |
|---|---|
| `feat` | A new feature visible to users |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, whitespace — no logic change |
| `refactor` | Code restructure with no behaviour change |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Build process, tooling, dependency changes |
| `ci` | CI/CD configuration changes |

### Examples

```bash
git commit -m "feat(timetable): add Sunday morning yoga class"
git commit -m "fix(form): prevent double-submit on slow connections"
git commit -m "docs(readme): add Netlify deploy instructions"
git commit -m "style(css): align card padding with 8px grid"
git commit -m "chore: add .editorconfig for consistent indentation"
```

**Rules:**
- Use the **imperative mood** ("add" not "added")
- Keep the summary line ≤ 72 characters
- Do not end the summary with a period
- Reference issues with `Closes #123` or `Fixes #123` in the commit body

---

## Pull Request Process

1. **Update documentation** — if your change affects how the project works, update `README.md`, `PRD.md`, or `TRD.md` accordingly
2. **Test thoroughly** — check desktop (1280 px+), tablet (768 px), and mobile (360 px); test all filters and form flows
3. **Keep scope small** — reviewers approve faster when a PR does exactly one thing
4. **Write a clear PR description** — what changed, why, and how to test it
5. **Link the issue** — use `Closes #<issue-number>` in your PR description
6. **Await review** — a maintainer from SPManchester will review within 5 business days

### PR Checklist

```
- [ ] I have read CONTRIBUTING.md
- [ ] My change follows the commit conventions
- [ ] The site renders correctly at 360px, 768px, and 1280px
- [ ] All timetable filters work after my change
- [ ] The join form confirms correctly after my change
- [ ] I have updated documentation where relevant
- [ ] I have added myself to contributors (optional but appreciated)
```

---

## Issue Reporting

### Bug Report Template

When filing a bug, please include:

```markdown
**Description:** One-sentence summary of the problem

**Steps to reproduce:**
1. Go to '...'
2. Click '...'
3. See error

**Expected behaviour:** What should happen
**Actual behaviour:** What actually happens

**Environment:**
- Browser + version:
- OS:
- Screen width (px):

**Screenshot / recording:** (if helpful)
```

### Feature Request Template

```markdown
**Problem:** What problem does this solve?
**Proposed solution:** Your suggested approach
**Alternatives considered:** Other options you have thought about
**Roadmap alignment:** Which roadmap phase does this fit?
```

---

## Style Guide

### HTML
- Use semantic elements (`<section>`, `<article>`, `<nav>`, `<footer>`)
- Include `alt` attributes on all images
- Keep one `<h1>` per page
- Indent with 2 spaces

### CSS
- Use the existing CSS custom properties (design tokens) in `:root` — do not hardcode colours
- Mobile-first: write base styles for small screens, then `@media (min-width: …)` for larger
- Keep selectors flat (avoid nesting beyond 2 levels)
- Order properties: layout → box model → typography → visual → animation

### JavaScript
- ES6+ syntax (arrow functions, `const`/`let`, template literals)
- No external libraries or frameworks — keep it zero-dependency
- Use clear, descriptive variable names
- Comment any non-obvious logic

---

## Contact

| Channel | Details |
|---|---|
| General questions | [info@spmanchester.com](mailto:info@spmanchester.com) |
| Security vulnerabilities | See [SECURITY.md](SECURITY.md) |
| Company website | [www.spmanchester.com](https://www.spmanchester.com) |
| LinkedIn | [linkedin.com/company/spmanchester](https://www.linkedin.com/company/spmanchester) |

---

*SPManchester Private Limited · Manchester, UK · [www.spmanchester.com](https://www.spmanchester.com)*
