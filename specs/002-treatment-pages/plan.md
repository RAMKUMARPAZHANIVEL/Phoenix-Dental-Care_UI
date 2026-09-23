

# Implementation Plan: Treatment Pages Module

**Branch**: `002-treatment-pages` | **Date**: 2026-09-22 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/002-treatment-pages/spec.md`

---

## Summary

Enrich the existing Phoenix Dental Care Next.js 14 App Router application with 10 fully-featured, SEO-optimised treatment detail pages. The existing dynamic route `app/services/[slug]/page.js` is rebuilt as a composition of reusable section components fed by an enriched static data model in `data/services.js`. Five new treatment entries are added to the data file. No new framework, database, or CMS is introduced.

---

## Technical Context

**Language/Version**: JavaScript (Next.js 14.2.5, React 18.2)

**Primary Dependencies**: Next.js 14 (App Router), React 18, Tailwind CSS 3 (custom primary: `#ec4899`), Framer Motion 12, react-icons 5

**Storage**: Static JavaScript data files — `data/services.js` (treatments), `data/team.js` (doctors), `app/utils/config.js` (testimonials, practice info). No database.

**Testing**: No framework currently installed. Manual validation via `npm run dev`. Playwright recommended for future E2E coverage; out of scope for this phase.

**Target Platform**: Netlify static hosting; modern web browsers (mobile-first responsive)

**Project Type**: Web application — Next.js App Router, statically generated (SSG), deployed to Netlify

**Performance Goals**: Core Web Vitals "Good" thresholds — LCP < 2.5 s, CLS < 0.1, FID/INP < 100 ms on mobile. Achieved primarily via static generation and Next.js `<Image>` optimisation.

**Constraints**: All treatment pages must be statically generated at build time (`generateStaticParams`). No new npm dependencies unless an existing dependency cannot satisfy the requirement. No SSR at runtime.

**Scale/Scope**: 10 treatment pages; ~1 developer; static build (~seconds on Netlify).

---

## Constitution Check

The project constitution (`specs/.specify/memory/constitution.md`) contains only the unfilled template — no project-specific principles have been ratified. No constitutional gates apply.

**Pre-design gate**: PASS — no violations.

---

## Project Structure

### Documentation (this feature)

```text
specs/002-treatment-pages/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/
│   └── treatment-data-contract.md   ← Phase 1 output
└── tasks.md             ← Phase 2 output (/speckit-tasks, NOT created here)
```

### Source Code

```text
data/
└── services.js              ← MODIFY: enrich all 10 entries with new fields;
                                add 5 missing treatment entries

app/
└── services/
    ├── page.js              ← VERIFY: renders all 10 treatment cards (likely works
                                automatically once data entries are added)
    └── [slug]/
        └── page.js          ← MODIFY: rebuild page composition using section
                                components; add generateMetadata with canonical;
                                add JSON-LD blocks

components/
└── services/
    ├── ServiceCard.js       ← EXISTS: verify it handles all 10 entries correctly
    ├── TreatmentHero.js     ← NEW: hero banner with treatment name and hero image
    ├── TreatmentOverview.js ← NEW: treatment description paragraph(s)
    ├── TreatmentBenefits.js ← NEW: benefits list (icon + text)
    ├── TreatmentProcedure.js← NEW: numbered steps with title + description
    ├── TreatmentFAQ.js      ← NEW: Client Component; accordion using <details>/
                                <summary> or stateful toggle; omitted when no FAQs
    ├── TreatmentGallery.js  ← NEW: before/after image pairs; omitted when no images
    ├── TreatmentTestimonials.js ← NEW: testimonial cards (global testimonials);
                                    reuses testimonial data from config.js
    ├── TreatmentDoctor.js   ← NEW: doctor card section; omitted when no doctor
                                    assigned; reuses DoctorCard component
    ├── TreatmentCTA.js      ← NEW: appointment booking call-to-action banner
    └── RelatedTreatments.js ← NEW: 2-4 related treatment cards; omits self;
                                    omitted when list is empty

app/
├── sitemap.js               ← VERIFY: auto-includes new slugs (should work as-is
                                once data entries added)
└── robots.js                ← NO CHANGE
```

**Structure Decision**: Single Next.js web application. Treatment section components are colocated under `components/services/` matching the existing `ServiceCard.js` convention. No new top-level directories introduced.

---

## Complexity Tracking

No constitution violations to justify.
