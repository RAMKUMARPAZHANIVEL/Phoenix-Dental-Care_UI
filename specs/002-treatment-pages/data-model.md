# Data Model: Treatment Pages Module

**Date**: 2026-09-22 | **Branch**: `002-treatment-pages`

---

## Overview

All treatment content is stored as a static JavaScript array exported from `data/services.js`. The existing 5 entries are enriched in-place; 5 new entries are added. No database migrations are required.

---

## Entity: Treatment

The central entity. Each array element in `data/services.js` represents one treatment page.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | `string` | Yes | URL-safe identifier. Determines the page URL: `/services/{slug}`. Must be unique across all entries. kebab-case only (e.g. `root-canal-treatment`). |
| `name` | `string` | Yes | Display name shown as H1 on the detail page and on listing cards (e.g. "Root Canal Treatment"). |
| `summary` | `string` | Yes | One or two sentence description for listing cards and meta description fallback. Max ~160 characters. |
| `metaTitle` | `string` | Yes | Treatment-specific title portion only — the root layout template appends "\| Phoenix Dental Care" automatically. E.g. "Root Canal Treatment in Chennai". Max ~45 characters. Must be unique across all entries. |
| `metaDescription` | `string` | Yes | Unique meta description for the page. Patient-focused. Max ~155 characters. |
| `description` | `string` | Yes | Full treatment overview paragraph(s) for the overview section. Minimum 2–3 sentences. |
| `imageSrc` | `string` | Yes | Path to the hero/card image, relative to `/public/` (e.g. `/images/root_canal.jpg`). |
| `heroAlt` | `string` | Yes | Descriptive alt text for the hero image. E.g. "Dentist performing root canal treatment at Phoenix Dental Care, Chennai". |
| `category` | `string` | Yes | One of: `"cosmetic"` \| `"specialty"` \| `"restorative"` \| `"preventive"`. Used for grouping/filtering. |
| `benefits` | `Benefit[]` | Yes | Ordered list of treatment benefits. Minimum 3 items. |
| `procedureSteps` | `ProcedureStep[]` | Yes | Ordered list of steps describing the treatment process. Minimum 3 items. |
| `faqs` | `FAQItem[]` | Yes | List of frequently asked questions for this treatment. Minimum 3 items. Used for FAQ section and FAQPage JSON-LD. |
| `relatedSlugs` | `string[]` | Yes | List of 2–4 treatment slugs shown in the Related Treatments section. Must not include own slug. All referenced slugs must exist. |
| `doctorId` | `string \| null` | No | Identifier matching a doctor's `id` field in `data/team.js`. `null` if no doctor section should be shown. |
| `beforeAfterImages` | `BeforeAfterPair[]` | No | Array of before/after image pairs. Empty array or omitted → gallery section hidden. |

### Validation Rules

- `slug` must be unique across all entries.
- `slug` must match the pattern `^[a-z][a-z0-9-]*$`.
- `relatedSlugs` must not contain the entry's own `slug`.
- All `slug` values in `relatedSlugs` must resolve to an existing treatment.
- `metaTitle` and `metaDescription` must be unique across all entries.
- `category` must be one of the four allowed enum values.

---

## Entity: Benefit

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Short benefit label (e.g. "Pain-free procedure"). |
| `description` | `string` | No | Optional one-sentence elaboration on the benefit. |

---

## Entity: ProcedureStep

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `step` | `number` | Yes | 1-based step number (used for display and ordering). |
| `title` | `string` | Yes | Short step title (e.g. "Diagnosis & X-Ray"). |
| `description` | `string` | Yes | One to three sentences describing what happens in this step. |

---

## Entity: FAQItem

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `question` | `string` | Yes | The patient-facing question. Ends with a `?`. |
| `answer` | `string` | Yes | The patient-friendly answer. Plain text (no markdown). |

Used to render the FAQ accordion section and to generate `FAQPage` JSON-LD structured data.

---

## Entity: BeforeAfterPair

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `before` | `ImageAsset` | Yes | The "before" image. |
| `after` | `ImageAsset` | Yes | The "after" image. |

---

## Entity: ImageAsset

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `src` | `string` | Yes | Image path relative to `/public/` (e.g. `/images/whitening-before.jpg`). |
| `alt` | `string` | Yes | Descriptive alt text. Must not be empty or generic. |

---

## Entity: Doctor (existing — `data/team.js`)

No changes to the Doctor entity. Treatment pages reference doctors by `id`.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier (e.g. `"dr-divya"`). Referenced by `Treatment.doctorId`. |
| `name` | `string` | Full name. |
| `title` | `string` | Professional title. |
| `qualifications` | `string` | Credential string. |
| `bio` | `string` | Short biography. |
| `imageSrc` | `string` | Profile image path. |

---

## Entity: Testimonial (existing — `app/utils/config.js`)

No changes. All 3 global testimonials are displayed on each treatment page.

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Patient name. |
| `treatment` | `string` | Treatment name (used as a label). |
| `review` | `string` | Review text. |

---

## Treatment Registry (10 entries)

| # | Name | Slug | Status |
|---|------|------|--------|
| 1 | Root Canal Treatment | `root-canal-treatment` | Enrich existing |
| 2 | Dental Implants | `dental-implants` | New entry |
| 3 | Teeth Whitening | `teeth-whitening` | New entry |
| 4 | Invisible Aligners | `invisible-aligners` | New entry |
| 5 | Braces Treatment | `braces-treatment` | New entry |
| 6 | Pediatric Dentistry | `pediatric-dentistry` | Enrich existing |
| 7 | Laser Dentistry | `laser-dentistry` | Enrich existing |
| 8 | Smile Makeover | `smile-makeover` | Enrich existing |
| 9 | Gum Treatments | `gum-care` | Enrich existing (slug preserved) |
| 10 | Tooth Extraction | `tooth-extraction` | New entry |

---

## Relationships

```
Treatment (1) ──── (0..*) FAQItem
Treatment (1) ──── (1..*) Benefit
Treatment (1) ──── (1..*) ProcedureStep
Treatment (1) ──── (0..*) BeforeAfterPair
Treatment (0..*) ─ (0..1) Doctor        (via doctorId → team.js)
Treatment (0..*) ─ (0..*) Treatment     (self-referential via relatedSlugs)
```

---

## Backward Compatibility

The existing fields (`slug`, `name`, `summary`, `description`, `imageSrc`, `category`) are preserved unchanged. All new fields are additions. The listing page (`/services`) uses only `slug`, `name`, `summary`, `imageSrc`, `category` — it requires no changes when new fields are added. The `ServiceCard` component uses only these existing fields.
