# Quickstart Validation Guide: Treatment Pages Module

**Date**: 2026-09-22 | **Branch**: `002-treatment-pages`

---

## Prerequisites

- Node.js installed (project uses Next.js 14)
- Dependencies installed: `npm install`
- Dev server not already running on port 3000

---

## Start the Dev Server

```bash
npm run dev
```

Server starts at `http://localhost:3000`.

---

## Scenario 1 — All 10 treatments appear on the listing page (SC-006, FR-005)

1. Open `http://localhost:3000/services`
2. Count treatment cards — expect **10 cards**
3. Verify each card shows: treatment name, summary text, "Learn More" link
4. Click "Learn More" on each card — each should route to the correct detail page without a 404

---

## Scenario 2 — Treatment detail page renders all required sections (SC-001, FR-002)

1. Open `http://localhost:3000/services/root-canal-treatment`
2. Scroll through the page and verify each section is present:
   - [ ] Breadcrumb: "Home > Services > Root Canal Treatment"
   - [ ] Hero section with treatment name as H1
   - [ ] Treatment overview paragraph
   - [ ] Benefits list (minimum 3 items)
   - [ ] Procedure steps (minimum 3 numbered steps)
   - [ ] FAQ accordion (minimum 3 questions)
   - [ ] Patient testimonials (3 global cards)
   - [ ] Appointment booking CTA with link to `/contact`
   - [ ] Related treatments (2–4 treatment cards)
3. Repeat spot-check for at least 2 other treatments (e.g. `dental-implants`, `smile-makeover`)

---

## Scenario 3 — Unique metadata per page (SC-002, FR-003)

For each treatment page, open browser DevTools → Elements → `<head>`:

1. Verify `<title>` contains the treatment-specific title (not the default homepage title)
2. Verify `<meta name="description">` content is treatment-specific
3. Verify `<link rel="canonical">` points to the current page URL  
   Example: `<link rel="canonical" href="https://phoenixdentalcare.in/services/dental-implants" />`
4. Titles and descriptions must differ between pages — open two tabs and compare

---

## Scenario 4 — Structured data present (SC-003, FR-004)

1. Open any treatment page (e.g. `http://localhost:3000/services/teeth-whitening`)
2. In DevTools → Elements, search for `application/ld+json`
3. Verify at least 3 JSON-LD `<script>` blocks exist:
   - One with `"@type": "BreadcrumbList"` — contains 3 list items (Home, Services, treatment name)
   - One with `"@type": "MedicalProcedure"` — contains treatment name and description
   - One with `"@type": "FAQPage"` — contains at least 3 Question/Answer pairs
4. Use [Google's Rich Results Test](https://search.google.com/test/rich-results) (paste the page URL after deploying, or paste JSON-LD manually) to validate FAQPage schema

---

## Scenario 5 — 404 for invalid slug (SC-004, FR-007)

1. Open `http://localhost:3000/services/not-a-real-treatment`
2. Expect: the application's 404 page renders (not a JavaScript error, not a blank page)

---

## Scenario 6 — Conditional sections (FR-010)

1. Find a treatment whose data has an empty `beforeAfterImages` array (or no `doctorId`)
2. Visit that treatment page
3. Verify: no gallery section appears, no empty container is visible, layout is intact
4. Find a treatment with `beforeAfterImages` populated — verify gallery renders with paired images

---

## Scenario 7 — Sitemap includes all 10 treatments (SC-007, FR-006)

```bash
curl http://localhost:3000/sitemap.xml
```

Or open `http://localhost:3000/sitemap.xml` in a browser.

Verify the XML contains 10 `<url>` entries whose `<loc>` values match the treatment page URLs:
- `.../services/root-canal-treatment`
- `.../services/dental-implants`
- `.../services/teeth-whitening`
- `.../services/invisible-aligners`
- `.../services/braces-treatment`
- `.../services/pediatric-dentistry`
- `.../services/laser-dentistry`
- `.../services/smile-makeover`
- `.../services/gum-care`
- `.../services/tooth-extraction`

---

## Scenario 8 — Data-driven extensibility (SC-005, FR-009)

1. Add a temporary 11th treatment entry to `data/services.js` with a new unique slug (e.g. `"test-treatment"`)
2. Verify `http://localhost:3000/services/test-treatment` renders a full treatment page
3. Verify `http://localhost:3000/services` now shows 11 cards
4. Remove the temporary entry and verify the page count returns to 10

---

## Scenario 9 — Responsiveness (SC-009, FR-014)

Using browser DevTools Device Toolbar:

1. Set viewport to **375 px** (mobile) — verify no horizontal overflow, text is readable, CTA button is accessible
2. Set viewport to **768 px** (tablet) — verify layout adapts appropriately
3. Set viewport to **1280 px** (desktop) — verify full desktop layout

---

## Scenario 10 — No regressions (SC-010)

After all implementation is complete, verify these existing pages still load correctly:

| Page | URL | Check |
|------|-----|-------|
| Homepage | `/` | Loads; nav, hero, treatments grid present |
| About | `/about` | Loads; content present |
| Contact | `/contact` | Loads; form present |
| Team | `/team` | Loads; doctor card present |
| Services listing | `/services` | All 10 cards present |

---

## Production Build Validation

```bash
npm run build
```

Verify: build completes with no errors. All 10 treatment pages are output as static HTML files in `.next/server/app/services/`.

```bash
npm run start
```

Repeat Scenario 1 and Scenario 2 against the production build at `http://localhost:3000`.

---

## References

- Data contract: [`contracts/treatment-data-contract.md`](./contracts/treatment-data-contract.md)
- Data model: [`data-model.md`](./data-model.md)
- Spec success criteria: [`spec.md#success-criteria`](./spec.md)
