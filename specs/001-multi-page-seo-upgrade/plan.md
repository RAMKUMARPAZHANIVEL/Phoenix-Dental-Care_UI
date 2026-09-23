# Implementation Plan: Multi-Page SEO Website Upgrade

**Branch**: `001-multi-page-seo-upgrade` | **Date**: 2026-07-08 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-multi-page-seo-upgrade/spec.md`

## Summary

Upgrade Phoenix Dental Care from a single `app/page.js` with anchor-based navigation to a proper multi-page Next.js App Router application with dedicated routes, per-page SEO metadata, structured data, a contact form, and a sitemap. All existing visual components and branding are preserved; the work is primarily restructuring routes, extracting data into static files, and adding SEO infrastructure.

## Technical Context

**Language/Version**: JavaScript (ES Modules), Next.js 14.2.5, React 18.2

**Primary Dependencies**: Next.js 14.2.5 (App Router), Framer Motion 12, React Icons 5, Tailwind CSS 3.4

**Storage**: No database. Static data files (`data/services.js`, `data/team.js`) for service and team content. Netlify Forms for contact form submissions (zero backend config).

**Testing**: No test framework in project. Validation via browser + Lighthouse CI (see quickstart.md).

**Target Platform**: Web browser — deployed on Netlify via `@netlify/plugin-nextjs`.

**Project Type**: Public-facing multi-page web application (marketing/conversion site).

**Performance Goals**: Core content visible in under 3 seconds on mobile; Lighthouse Performance score ≥ 85.

**Constraints**: Mobile-first responsive design. SEO-safe (no `noindex` on content pages). All core content server-rendered (no client-only rendering for indexable content). Netlify Forms requires HTML form rendered on page (not purely client-rendered).

**Scale/Scope**: ~10 routes (5 main pages + ~10 service detail pages). No auth, no database, no user accounts. Static/SSG-friendly.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The `.specify/memory/constitution.md` file contains a blank template with no ratified project principles. No governance constraints are enforced at this time. This gate passes by default. Constitution should be completed before the next feature.

## Project Structure

### Documentation (this feature)

```text
specs/001-multi-page-seo-upgrade/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── url-structure.md
│   └── contact-form.md
└── tasks.md             # Phase 2 output (/speckit-tasks — NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
app/
├── layout.js                    # Update: move Footer here, keep Header
├── page.js                      # Refactor: Home page only (hero + highlights)
├── about/
│   └── page.js                  # New: About the Practice
├── services/
│   ├── page.js                  # New: Services listing
│   └── [slug]/
│       └── page.js              # New: Individual service detail
├── team/
│   └── page.js                  # New: Team / Doctors listing
├── contact/
│   └── page.js                  # New: Contact + inquiry form
├── not-found.js                 # New: Branded 404 page
├── sitemap.js                   # New: Next.js sitemap export
├── robots.js                    # New: robots.txt export
└── globals.css                  # Existing (unchanged)

data/
├── services.js                  # New: canonical service data (extracted from treatments.js)
└── team.js                      # New: doctor/team member data

components/
├── Header.js                    # Update: use next/link, highlight active route
├── footer.js                    # Minor update: add nav links
├── mobileMenu.js                # Existing (update links)
├── Breadcrumb.js                # New: breadcrumb trail for inner pages
├── ContactForm.js               # New: Netlify-compatible contact form
├── seo/
│   └── JsonLd.js               # New: JSON-LD script tag component
├── services/
│   └── ServiceCard.js          # New: card linking to service detail page
└── team/
    └── DoctorCard.js           # New: doctor profile card

public/
└── images/                     # Existing (unchanged)
```

**Structure Decision**: Existing `components/home/` components (WhyChooseUs, Testimonials, Offers, Stats, Map) are reused on the Home page. The `treatments.js` component and `config.js` data are replaced by the canonical `data/services.js` and `data/team.js` files. A new `components/services/` and `components/team/` directory handles new route-specific components.

## Complexity Tracking

No Constitution violations. No complexity justification required.
