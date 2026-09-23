# Research: Treatment Pages Module

**Date**: 2026-09-22 | **Branch**: `002-treatment-pages`

---

## Decision 1: URL Path — `/services/[slug]` vs `/treatments/[slug]`

**Decision**: Keep the existing `/services/[slug]` dynamic route.

**Rationale**: The existing app already has `app/services/[slug]/page.js`, `app/services/page.js`, a sitemap entry generator, footer quick-links, and `Breadcrumb.js` all referencing `/services/`. Switching to `/treatments/` would require updating every one of these plus adding 301 redirects for any crawled or bookmarked URLs. The CLAUDE.md example URL was illustrative — the project instructions explicitly say to follow existing routing conventions after inspection.

**Alternatives considered**:
- `/treatments/[slug]` with 301 redirects from `/services/[slug]`: Technically correct but adds redirect infrastructure and complexity with no user-facing benefit on a site with minimal existing traffic.
- Parallel routes (`/services/` and `/treatments/`): Creates duplicate content, harmful to SEO.

**Confirmed by user**: Yes (clarification session 2026-09-22, Q1).

---

## Decision 2: Schema Type — `MedicalProcedure` vs `Service`

**Decision**: Use `MedicalProcedure` as the primary schema type for treatment pages, with `@context: "https://schema.org"`.

**Rationale**: Dental treatments are unambiguously medical procedures. `MedicalProcedure` is the semantically correct schema.org type. While Google's rich results documentation does not list `MedicalProcedure` as a rich result trigger (unlike `FAQPage` or `BreadcrumbList`), using the correct type improves semantic clarity for Knowledge Graph and future indexing improvements. `FAQPage` is the high-value structured data type for treatment pages from a Google rich results perspective.

**Key fields for MedicalProcedure**:
```json
{
  "@type": "MedicalProcedure",
  "name": "Root Canal Treatment",
  "description": "...",
  "procedureType": "Therapeutic",
  "url": "https://phoenixdentalcare.in/services/root-canal-treatment",
  "provider": {
    "@type": "Dentist",
    "name": "Phoenix Dental Care"
  }
}
```

**Alternatives considered**:
- `Service` (@type): More generic, works for any business service. Acceptable but less semantically precise for medical context.
- `HealthAndBeautyBusiness` + `offers`: Overly generic, not specific to procedures.

---

## Decision 3: Gum Treatments Slug — `gum-care` vs `gum-treatments`

**Decision**: Enrich the existing `gum-care` entry in-place; set the display name to "Gum Treatments". The URL remains `/services/gum-care`.

**Rationale**: The existing `gum-care` slug is already in the codebase, sitemap, and footer. Creating `gum-treatments` would orphan the `gum-care` URL (returning 404) and risk duplicate content if both existed. The URL slug (`gum-care`) and the display name ("Gum Treatments") are independent — a descriptive display name can coexist with the existing slug.

**Alternatives considered**:
- New `gum-treatments` slug with 301 from `gum-care`: Adds redirect complexity; benefit is URL clarity, but at the cost of redirect chain risk.

**Note**: This decision was deferred from the clarification session. Proceeding with the enrich-in-place default.

---

## Decision 4: Before/After Gallery — Implement UI Now vs Defer

**Decision**: Implement the gallery component now; conditionally omit the section when no images are configured.

**Rationale**: The gallery is a simple conditional render. Building it now means no second code push when image assets arrive. The component costs minimal development effort. Sections with no data are hidden via a null-check — no placeholder UI required (cleaner UX on a clinical site).

**Implementation note**: Use Next.js `<Image>` component for all gallery images. Store before/after image paths in the treatment data object as an array of `{ before: {src, alt}, after: {src, alt} }` pairs. For treatments without approved patient images at launch, the `beforeAfterImages` array is empty and the section is omitted.

---

## Decision 5: FAQ Rendering — Component Approach

**Decision**: Use native HTML `<details>/<summary>` elements for FAQ accordion behaviour.

**Rationale**: The project has no UI component library beyond Tailwind + react-icons. Framer Motion could animate FAQ items but adds unnecessary complexity. Native `<details>/<summary>` provides built-in accordion behaviour with zero JavaScript, full keyboard accessibility, and excellent browser support. Tailwind can style it consistently with the rest of the site.

**Alternatives considered**:
- Framer Motion `AnimatePresence` accordion: Works but adds JS overhead per FAQ item; `<details>` is sufficient.
- Custom `useState` toggle Client Component: Works but unnecessary when `<details>` suffices with no JS.

---

## Decision 6: Testimonials — Global vs Treatment-Specific

**Decision**: Display all 3 global testimonials from `config.js` on every treatment page.

**Rationale**: No treatment-specific testimonials exist in the codebase. The 3 global reviews are general enough to apply to any treatment. Displaying them provides social proof at launch. The data model will include an optional `testimonials` array on the Treatment entity for future per-treatment overrides, but the default fallback is the global list.

**Alternatives considered**:
- Omit testimonials from treatment pages entirely: Reduces social proof; poor conversion impact.
- Filter by treatment name: Only 1 testimonial mentions a specific treatment; filtering would leave most pages with 0 testimonials.

---

## Decision 7: Testing Strategy

**Decision**: No automated test framework is introduced in this phase. Manual validation via dev server and build verification is the acceptance approach.

**Rationale**: The project has no installed testing framework (no Jest, Playwright, Vitest). The spec defers framework selection to planning. Introducing a testing framework alongside a content feature increases scope significantly. The recommended future approach is Playwright for E2E (covers routing, rendering, metadata, and JSON-LD validation in a browser-realistic environment).

**Future recommendation**: Add `playwright` as a dev dependency in a dedicated testing setup task. Write tests per SC-001 through SC-010 acceptance criteria.

---

## Decision 8: New Treatment Entries

The 5 treatments missing from `data/services.js` and their proposed slugs:

| Treatment | Proposed Slug | Category |
|-----------|--------------|----------|
| Dental Implants | `dental-implants` | restorative |
| Teeth Whitening | `teeth-whitening` | cosmetic |
| Invisible Aligners | `invisible-aligners` | specialty |
| Braces Treatment | `braces-treatment` | specialty |
| Tooth Extraction | `tooth-extraction` | restorative |

Existing entries to be enriched (not renamed):

| Treatment | Existing Slug | Category |
|-----------|--------------|----------|
| Root Canal Treatment | `root-canal-treatment` | specialty |
| Pediatric Dentistry | `pediatric-dentistry` | preventive |
| Laser Dentistry | `laser-dentistry` | specialty |
| Smile Makeover | `smile-makeover` | cosmetic |
| Gum Treatments | `gum-care` | preventive |

---

## Decision 9: Image Assets for New Treatments

Placeholder image strategy for 5 new treatments at launch:

- Reuse `/public/images/cosmetic.jpg` for Teeth Whitening (cosmetic category match)
- Reuse `/public/images/tooth_replacement.jpg` for Dental Implants (restorative match)
- New images needed for: Invisible Aligners, Braces Treatment, Tooth Extraction
- For initial development: reference a `/public/images/placeholder.jpg` — a single neutral placeholder image — and note in the data file that real assets are required before launch

**Action required before production launch**: Source or photograph images for these 3 treatments and update the `imageSrc` and `heroAlt` fields in `data/services.js`.
