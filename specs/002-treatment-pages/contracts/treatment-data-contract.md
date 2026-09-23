# Contract: Treatment Data & Page Interface

**Date**: 2026-09-22 | **Branch**: `002-treatment-pages`

---

## 1. Treatment Data Object Contract

Every entry in `data/services.js` that represents one of the 10 treatment pages must conform to this shape. This is the contract between the data layer and the page/component layer.

```js
{
  // ── Required fields (already existing) ──────────────────────────────────
  slug:            String,   // unique, kebab-case, URL-safe
  name:            String,   // display name (H1, card title)
  summary:         String,   // ≤160 chars; shown on listing cards
  description:     String,   // full overview text for overview section
  imageSrc:        String,   // path from /public/ (e.g. "/images/root_canal.jpg")
  category:        Enum("cosmetic" | "specialty" | "restorative" | "preventive"),

  // ── New required fields ──────────────────────────────────────────────────
  metaTitle:       String,   // unique; ≤45 chars; treatment-specific portion only;
                              // root layout template appends "| Phoenix Dental Care"
  metaDescription: String,   // unique; ≤155 chars; used as meta description
  heroAlt:         String,   // non-empty alt text for hero image

  benefits: [
    {
      title:       String,   // short label
      description: String,   // optional elaboration (may be empty string)
    }
    // minimum 3 items
  ],

  procedureSteps: [
    {
      step:        Number,   // 1-based
      title:       String,
      description: String,
    }
    // minimum 3 items, ordered
  ],

  faqs: [
    {
      question:    String,   // ends with "?"
      answer:      String,   // plain text, no markdown
    }
    // minimum 3 items
  ],

  relatedSlugs:    [String], // 2–4 items; must not include own slug;
                              // all slugs must resolve to existing treatments

  // ── Optional fields ──────────────────────────────────────────────────────
  doctorId:        String | null,  // matches id in data/team.js; null → no doctor section

  beforeAfterImages: [
    {
      before: { src: String, alt: String },
      after:  { src: String, alt: String },
    }
  ],  // empty array or omitted → gallery section hidden
}
```

---

## 2. URL Contract

| Concern | Value |
|---------|-------|
| Listing page | `/services` |
| Detail page | `/services/{slug}` |
| Slug format | kebab-case, lowercase, alphanumeric + hyphens |
| Invalid slug | → 404 (rendered via `app/not-found.js`) |

All 10 slugs: `root-canal-treatment`, `dental-implants`, `teeth-whitening`, `invisible-aligners`, `braces-treatment`, `pediatric-dentistry`, `laser-dentistry`, `smile-makeover`, `gum-care`, `tooth-extraction`.

---

## 3. Metadata Contract

Each treatment page's `generateMetadata({ params })` must return:

```js
{
  title:       String,   // treatment.metaTitle (unique per treatment)
  description: String,   // treatment.metaDescription (unique per treatment)
  alternates: {
    canonical: String,   // absolute URL: "https://phoenixdentalcare.in/services/{slug}"
  },
  openGraph: {
    title:       String,
    description: String,
    url:         String,  // same as canonical
    images:      Array,   // at minimum the treatment hero image
  },
}
```

If `params.slug` does not match any entry: call `notFound()` from `next/navigation`.

---

## 4. Structured Data (JSON-LD) Contract

### 4a. BreadcrumbList (every treatment page)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",     "item": "https://phoenixdentalcare.in/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://phoenixdentalcare.in/services" },
    { "@type": "ListItem", "position": 3, "name": "{treatment.name}" }
  ]
}
```

### 4b. MedicalProcedure (every treatment page)

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "name": "{treatment.name}",
  "description": "{treatment.description}",
  "procedureType": "Therapeutic",
  "url": "https://phoenixdentalcare.in/services/{slug}",
  "provider": {
    "@type": "Dentist",
    "name": "Phoenix Dental Care",
    "address": "{practiceInfo.address}"
  }
}
```

### 4c. FAQPage (only when `treatment.faqs.length > 0`)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{faq.question}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{faq.answer}"
      }
    }
  ]
}
```

---

## 5. Sitemap Contract

`app/sitemap.js` must generate one entry per treatment slug:

```js
{
  url:          "https://phoenixdentalcare.in/services/{slug}",
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority:     0.7,
}
```

This is already generated dynamically from `data/services.js` — adding new entries to the data file automatically adds them to the sitemap.

---

## 6. Component Render Contract

### Conditional sections

| Section | Rendered when |
|---------|--------------|
| Before & After Gallery | `treatment.beforeAfterImages?.length > 0` |
| Doctor Information | `treatment.doctorId !== null && doctor found in team data` |
| FAQ Section + FAQPage JSON-LD | `treatment.faqs.length > 0` |
| Related Treatments | `treatment.relatedSlugs.length > 0` |

### Section order (fixed)

1. Breadcrumb
2. Hero
3. Treatment Overview
4. Benefits
5. Procedure Steps
6. FAQ (conditional)
7. Before & After Gallery (conditional)
8. Patient Testimonials
9. Doctor Information (conditional)
10. Appointment CTA
11. Related Treatments (conditional)
