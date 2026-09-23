# Quickstart Validation Guide: Multi-Page SEO Website Upgrade

**Date**: 2026-07-08 | **Plan**: [plan.md](./plan.md)

This guide describes how to run the application and validate each user story and success criterion after implementation.

## Prerequisites

- Node.js 18+
- Dependencies installed: `npm install`
- Development server running: `npm run dev` (available at `http://localhost:3000`)

## Running the Application

```bash
npm run dev      # Development server (hot reload)
npm run build    # Production build (validates SSG + metadata)
npm start        # Serve production build
```

---

## Validation Scenarios

### User Story 1 — New Patient Discovers Practice Online

**Goal**: Confirm each page has unique SEO metadata.

1. Run `npm run build` — check the build output lists all expected routes:
   - `/`, `/about`, `/services`, `/services/[slug]` (×10), `/team`, `/contact`
2. Open `http://localhost:3000` and view page source (`Ctrl+U`). Confirm `<title>` is `Phoenix Dental Care — Chitlapakkam, Chennai`.
3. Navigate to `http://localhost:3000/services/cosmetic-dentistry`. Confirm `<title>` is `Cosmetic Dentistry | Phoenix Dental Care`.
4. Repeat for `/about`, `/team`, `/contact` — confirm each has a different `<title>` and `<meta name="description">`.
5. Confirm no two pages share the same title or description (SC-001).

**Mobile check (SC-003)**:
- Open DevTools → Toggle Device Toolbar → select "iPhone SE" (375px).
- Visit each main page. Confirm no horizontal scroll, all text readable, buttons tappable.

---

### User Story 2 — Visitor Explores Services

**Goal**: Confirm service listing and detail pages work end-to-end.

1. Go to `http://localhost:3000/services`. Confirm all 10 service cards are visible with names and images.
2. Click "Preventive Dentistry". Confirm URL changes to `/services/preventive-dentistry`.
3. Confirm the detail page shows: full description, an image, a breadcrumb trail (`Home > Services > Preventive Dentistry`), and a "Contact Us" or "Book Appointment" CTA linking to `/contact`.
4. Navigate back. Repeat for at least one more service.

---

### User Story 3 — Visitor Learns About the Practice and Team

**Goal**: Confirm About and Team pages have meaningful content and social preview metadata.

1. Go to `http://localhost:3000/about`. Confirm the page shows practice description, values, and location.
2. Go to `http://localhost:3000/team`. Confirm Dr. Divya's profile card is visible with name, title, and qualifications.
3. Validate Open Graph metadata (SC-006):
   - Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) with the deployed URL, or
   - Inspect page source for `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:image">` — confirm values differ across pages.

---

### User Story 4 — Visitor Contacts or Books an Appointment

**Goal**: Confirm the contact form is reachable and submittable.

1. From any page, click "Contact" or "Book Appointment" in the header. Confirm you reach `/contact` in one click.
2. On the Contact page, confirm the clinic address, phone number, and opening hours are visible.
3. Fill in the form with test data:
   - Name: `Test Patient`
   - Phone: `9876543210`
   - Message: `I'd like to inquire about teeth cleaning.`
4. Click Submit. Confirm an on-screen success message appears.
5. *(On a deployed Netlify site)*: Check the Netlify dashboard → Forms → `contact` to confirm the submission appears.

---

## Edge Case Validation

### 404 Page (SC-007)

1. Go to `http://localhost:3000/this-page-does-not-exist`.
2. Confirm a branded 404 page appears with the clinic's header/footer and a link back to the homepage.

### Sitemap (SC-004)

1. After `npm run build` and `npm start`, open `http://localhost:3000/sitemap.xml`.
2. Confirm the XML lists all main pages and all 10 service detail pages.
3. Confirm no page has a `noindex` meta tag in its source.

### Structured Data (FR-009)

1. On the homepage, view page source. Search for `application/ld+json`.
2. Confirm a `Dentist` or `LocalBusiness` JSON-LD block is present with `name`, `address`, `telephone`.
3. Paste the JSON into [Google's Rich Results Test](https://search.google.com/test/rich-results) to confirm validity.

### Breadcrumbs (FR-014)

1. Navigate to `/services/smile-makeover`.
2. Confirm breadcrumb trail shows: `Home > Services > Smile Makeover`.
3. Click "Services" in the breadcrumb. Confirm navigation to `/services`.
4. Click "Home" in the breadcrumb. Confirm navigation to `/`.

---

## Build Verification

```bash
npm run build
```

Expected output: No build errors. All service slugs resolved via `generateStaticParams`. Routes listed in build output:

```
Route (app)                     Size
├ ○ /                           ...
├ ○ /about                      ...
├ ○ /services                   ...
├ ● /services/[slug]            ...
│   ├ /services/preventive-dentistry
│   ├ /services/cosmetic-dentistry
│   └ ... (10 total)
├ ○ /team                       ...
├ ○ /contact                    ...
└ ○ /sitemap.xml                ...
```

(`○` = static, `●` = dynamic with static params)

---

## Artifacts Reference

- URL routes and slugs: [contracts/url-structure.md](./contracts/url-structure.md)
- Contact form fields and states: [contracts/contact-form.md](./contracts/contact-form.md)
- Data files: [data-model.md](./data-model.md)
