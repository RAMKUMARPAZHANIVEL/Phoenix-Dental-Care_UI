# Feature Specification: Treatment Pages Module

**Feature Branch**: `002-treatment-pages`

**Created**: 2026-09-22

**Status**: Draft

**Input**: Implement the Treatment Pages module for the existing Phoenix Dental Care application with dedicated, SEO-optimised pages for 10 dental treatments.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Patient Researches a Specific Treatment (Priority: P1)

A prospective patient has been advised they may need root canal treatment. They search online and arrive at the Phoenix Dental Care root canal page. They want to understand what the treatment involves, its benefits, the step-by-step procedure, common questions answered, and how to book an appointment — all without leaving the page.

**Why this priority**: This is the primary conversion path. Rich, trustworthy treatment pages turn search traffic into booked appointments and are the core business purpose of the feature.

**Independent Test**: Visit `/services/root-canal-treatment` and confirm all required sections are present, correctly populated, and functional.

**Acceptance Scenarios**:

1. **Given** a patient visits `/services/root-canal-treatment`, **When** the page loads, **Then** they see a hero section with the treatment name, a treatment overview paragraph, a benefits list, a step-by-step procedure section, a FAQ section with at least one question, and a booking CTA.
2. **Given** a patient reads a FAQ answer, **When** they expand or read it, **Then** the answer is patient-friendly, relevant to that specific treatment, and free of clinical jargon without explanation.
3. **Given** a patient clicks the booking CTA, **When** they are redirected, **Then** they arrive at the contact/appointment page.

---

### User Story 2 - Search Engine Indexes a Treatment Page (Priority: P1)

A search engine crawler visits a treatment page. It must find a unique title, unique meta description, canonical URL, a logical heading hierarchy, and structured data blocks so the page can be accurately indexed and ranked.

**Why this priority**: SEO is the primary business driver for this entire feature. Without correct metadata and structured data, treatment pages will not achieve organic search visibility.

**Independent Test**: Inspect the rendered HTML `<head>` of any treatment page for title, description, canonical link, and verify the page body contains JSON-LD scripts for BreadcrumbList, Service/MedicalProcedure, and FAQPage.

**Acceptance Scenarios**:

1. **Given** a search engine visits `/services/dental-implants`, **When** it reads the `<head>`, **Then** it finds a page title unique to dental implants, a meta description unique to dental implants, and a canonical URL pointing to that exact page.
2. **Given** a search engine parses the structured data, **When** it reads the JSON-LD blocks, **Then** it finds a BreadcrumbList (Home → Services → Dental Implants), a Service or MedicalProcedure schema, and a FAQPage schema for the treatment's FAQs.
3. **Given** the sitemap is generated, **When** a crawler reads `/sitemap.xml`, **Then** all 10 treatment page URLs are listed.

---

### User Story 3 - Patient Navigates via Breadcrumb (Priority: P2)

A patient who arrived directly on a treatment page from search wants to browse other available services. They use the breadcrumb (Home → Services → [Treatment Name]) to return to the services listing without using the browser back button.

**Why this priority**: Breadcrumb navigation reduces bounce rate for search-landing visitors and provides structured data that can appear directly in search results.

**Independent Test**: Verify the breadcrumb on any treatment page shows the correct three-level trail with working links, and that the BreadcrumbList JSON-LD reflects the same structure.

**Acceptance Scenarios**:

1. **Given** a patient is on `/services/dental-implants`, **When** they view the breadcrumb, **Then** it reads "Home > Services > Dental Implants" with "Home" and "Services" as navigable links.
2. **Given** a patient clicks "Services" in the breadcrumb, **When** the page loads, **Then** they arrive at the services listing page.
3. **Given** the breadcrumb structured data is present, **When** a search engine reads the BreadcrumbList JSON-LD, **Then** it contains three items: Home, Services, and the current treatment.

---

### User Story 4 - Patient Discovers Related Treatments (Priority: P2)

A patient reading about teeth whitening is curious about other cosmetic options. At the bottom of the page they see a Related Treatments section and can navigate directly to those pages.

**Why this priority**: Internal linking between treatment pages strengthens the site's topical authority, reduces exit rate, and supports SEO through a well-connected content cluster.

**Independent Test**: Verify that each treatment page shows 2–4 related treatment links, each navigating to a fully populated treatment page.

**Acceptance Scenarios**:

1. **Given** a patient is on the teeth whitening page, **When** they scroll to Related Treatments, **Then** they see 2–4 other treatments displayed with names and links.
2. **Given** a patient clicks a related treatment, **When** the new page loads, **Then** it is the correctly populated treatment page for that treatment.
3. **Given** the related treatments list is configured, **When** the page renders, **Then** the current treatment does not appear as one of its own related treatments.

---

### User Story 5 - Patient Views Before & After Gallery (Priority: P3)

A patient considering a cosmetic treatment wants visual proof of results. On applicable treatment pages (e.g. teeth whitening, smile makeover) they can view before and after image pairs.

**Why this priority**: Visual proof builds confidence and supports conversion, but real patient images may not be available at launch for all treatments — making this lower priority than core content and SEO.

**Independent Test**: Verify that treatments with before/after images show the gallery section, and treatments without images do not show an empty or broken gallery section.

**Acceptance Scenarios**:

1. **Given** a treatment has before/after images configured, **When** a patient views the treatment page, **Then** the gallery section displays paired images with descriptive alt text.
2. **Given** a treatment has no before/after images, **When** the page renders, **Then** no gallery section is shown and the page layout remains intact.

---

### User Story 6 - Patient Finds All Treatments on the Services Listing (Priority: P2)

A patient who visits the `/services` page directly should be able to browse and navigate to all 10 treatment pages from a single listing.

**Why this priority**: The services listing is the primary internal discovery surface for treatments. It must accurately reflect all available treatment pages.

**Independent Test**: Visit `/services` and confirm 10 treatment cards are shown, each linking to the correct treatment detail page.

**Acceptance Scenarios**:

1. **Given** a patient visits `/services`, **When** the page loads, **Then** all 10 treatments appear as cards with name, summary description, and a "Learn More" link.
2. **Given** a patient clicks "Learn More" on a treatment card, **When** the detail page loads, **Then** it is the correctly populated page for that treatment.

---

### User Story 7 - Developer Adds a New Treatment Without Creating a New Page File (Priority: P2)

A developer needs to add an eleventh treatment. They should only need to add a single data entry — no new page file, no new route configuration.

**Why this priority**: Data-driven architecture prevents code duplication and proves the system scales for future treatments. This is a quality and maintainability requirement with direct business value.

**Independent Test**: Add an eleventh treatment entry to the data source. Confirm a new treatment page is automatically generated at the expected URL and appears in the sitemap, with no new page files required.

**Acceptance Scenarios**:

1. **Given** a new treatment entry is added to the data source, **When** the application is built, **Then** a new fully-rendered treatment page is accessible at its slug URL.
2. **Given** a new treatment is added, **When** the sitemap is generated, **Then** the new treatment URL is included automatically.

---

### Edge Cases

- What happens when a visitor navigates to `/services/non-existent-slug`? The page must return a 404 response, not crash or display empty content.
- What happens when a treatment has no before/after images? The gallery section must be gracefully omitted without leaving empty space or broken layout.
- What happens when a treatment has no doctor assigned? The doctor information section must be conditionally omitted.
- What happens when a treatment has no FAQs? The FAQ section and FAQPage JSON-LD must both be omitted.
- What happens when the related treatments list is empty? The related treatments section must be omitted rather than showing an empty container.
- What if a related treatment slug does not correspond to an existing treatment? The link must not appear (broken links must be avoided).

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Each of the 10 specified treatments MUST have a dedicated, publicly accessible page at a unique SEO-friendly URL following the existing `/services/[slug]` pattern.
- **FR-002**: Each treatment page MUST render: hero section, treatment overview, benefits list, step-by-step procedure, FAQ section, before & after gallery (conditional on data), patient testimonials, doctor information (conditional on data), appointment CTA, related treatments section, and breadcrumb navigation.
- **FR-003**: Each treatment page MUST export a unique `generateMetadata` result containing a unique page title, unique meta description, and a canonical URL set to that page's own URL.
- **FR-004**: Each treatment page MUST include JSON-LD structured data for BreadcrumbList and Service/MedicalProcedure. Pages with FAQs MUST also include FAQPage structured data.
- **FR-005**: The services listing page (`/services`) MUST display cards for all 10 treatments, each linking to the correct detail page.
- **FR-006**: The sitemap MUST include all 10 treatment page URLs.
- **FR-007**: Navigating to a non-existent treatment slug MUST render the application's 404 page.
- **FR-008**: All treatment detail pages MUST be statically generated at build time — no per-request server-side rendering.
- **FR-009**: All treatment page content (title, overview, benefits, procedure steps, FAQs, related treatments, doctor assignment, images) MUST be sourced from a single data configuration. Adding a new treatment MUST require only a new data entry with no new page file.
- **FR-010**: Doctor information section and before/after gallery MUST be conditionally rendered — they MUST NOT appear when the corresponding data is absent.
- **FR-011**: Breadcrumb navigation MUST correctly display the three-level trail "Home → Services → [Treatment Name]" with working links for the first two levels.
- **FR-012**: The appointment CTA on each treatment page MUST link to `/contact`. No query parameters or pre-population of the contact form is required.
- **FR-013**: All treatment page images MUST have meaningful, descriptive alt text. No image may have an empty `alt` attribute or generic text such as "image".
- **FR-014**: Treatment pages MUST be fully responsive and functional at mobile, tablet, and desktop viewport sizes, reusing the existing responsive design system.
- **FR-015**: Each treatment page MUST have exactly one H1 element (the treatment name). All other section headings MUST use H2 or H3 in a logical hierarchy.
- **FR-016**: All 10 treatment pages MUST be reachable from the services listing page.
- **FR-017**: Related treatments MUST NOT include the current treatment page.
- **FR-018**: The existing application's layout (header, footer, global styles) MUST be preserved unchanged on all treatment pages. The "Services" navigation label in the header and footer is out of scope for this feature.

### Key Entities

- **Treatment**: The central data entity. Attributes: unique URL slug, display name, short summary (for listing cards), full overview description, ordered list of benefits, ordered list of procedure steps (each with a title and description), list of FAQ items (question + answer), list of related treatment slugs, optional list of before/after image pairs (each with before/after image paths and alt text), optional assigned doctor identifier, category (cosmetic / specialty / restorative / preventive), hero image path and alt text, unique page title (for `<title>`), unique meta description.
- **FAQ Item**: A question-and-answer pair belonging to a specific treatment. Used to render the FAQ section and generate FAQPage JSON-LD structured data.
- **Procedure Step**: An ordered step in the treatment process. Each step has a short title and a descriptive body. Used to render the procedure section.
- **Doctor**: An existing data entity. Treatment pages reference a doctor by identifier; no new doctor model is required.
- **Testimonial**: A patient review. Currently global (shared across all treatments). Displayed on treatment pages as a static responsive card grid (not the homepage carousel). Treatment-specific testimonials are a future enhancement.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 10 treatment pages are accessible at their respective `/services/[slug]` URLs and return a fully rendered page with all required sections visible.
- **SC-002**: No two treatment pages share the same page title or meta description value.
- **SC-003**: Every treatment page contains at least one JSON-LD `<script>` block; every treatment page with FAQs contains a FAQPage schema block.
- **SC-004**: Visiting `/services/[non-existent-slug]` returns a 404 page (not an error or blank page).
- **SC-005**: Adding a new treatment data entry and rebuilding the application produces a new, routed treatment page without any new page file being created.
- **SC-006**: All 10 treatments appear on the `/services` listing page with correct names and working "Learn More" links.
- **SC-007**: The sitemap includes URLs for all 10 treatment pages.
- **SC-008**: All treatment page images have non-empty, descriptive alt text.
- **SC-009**: Each treatment page renders without layout breakage at 375 px (mobile), 768 px (tablet), and 1280 px (desktop) viewport widths.
- **SC-010**: The existing homepage, about, contact, and team pages continue to load and render correctly after the treatment pages feature is implemented (no regressions).

---

## Assumptions

- The existing URL pattern `/services/[slug]` is **confirmed** for all treatment pages. The alternative `/treatments/[slug]` path is not introduced in order to avoid breaking existing links, sitemap entries, and any accumulated SEO signals (confirmed in clarification session 2026-09-22).
- The static JavaScript data file (`data/services.js`) is the authoritative content source for all treatment data. No database, CMS, or external API is introduced in this phase. The data model is enriched in-place.
- The 5 treatments not currently present as individual entries (Dental Implants, Teeth Whitening, Invisible Aligners, Braces Treatment, Tooth Extraction) will be added as new entries with new slugs. The existing `gum-care` slug is **confirmed** to be enriched in-place with display name "Gum Treatments" — the URL `/services/gum-care` is preserved and no redirect is introduced (confirmed in clarification session 2026-09-22).
- Treatment-specific testimonials are out of scope for this phase. The 3 global testimonials from `config.js` are displayed on all treatment pages. Per-treatment testimonials can be added to the data model in a future iteration.
- Only one doctor (Dr. Divya S) currently exists in the team data. Doctor assignment to specific treatments is supported in the data model, but the same doctor will be referenced for all treatments where a doctor section is appropriate.
- Image assets for the 5 new treatments do not yet exist in the project. Placeholder images are acceptable for initial development; real images must be sourced before production launch. Image paths will be referenced in the data file and added to `/public/images/`.
- No admin interface is in scope for this phase. Content management is entirely file-based. Admin CRUD will be designed in a separate feature once the content model is stable.
- No automated testing framework is currently installed. Test requirements from the project's CLAUDE.md are acknowledged; framework selection and test authoring are deferred to the planning phase.
- Canonical URL support is introduced for treatment pages in this feature. Backfilling canonical URLs to other existing pages (homepage, about, contact, team) is out of scope and may be addressed as a follow-up.
- The before/after gallery section requires real patient images with signed consent. The gallery section is **hidden entirely** when no before/after image data is present — no placeholder UI is shown (confirmed in clarification session 2026-09-22). The section will appear automatically once image pairs are added to the treatment data.

---

## Clarifications

### Session 2026-09-22

- Q: Which base path should treatment pages use — `/services/[slug]` (existing) or `/treatments/[slug]` (CLAUDE.md example)? → A: Keep `/services/[slug]` — preserves existing routing, internal links, sitemap, and footer without requiring redirects.
- Q: Should the "Services" label in the header nav, footer, and listing page be renamed to "Treatments" as part of this feature? → A: No — keep "Services" label unchanged; renaming is out of scope for this feature.
- Q: Should "Gum Treatments" enrich the existing `gum-care` slug or use a new `gum-treatments` slug? → A: Enrich `gum-care` in-place — URL stays `/services/gum-care`, display name becomes "Gum Treatments". No redirect needed.
- Q: When a treatment has no before/after images, should the gallery section show a placeholder or be hidden entirely? → A: Hidden entirely — no placeholder UI; section appears automatically once image data is added.
- Q: Should the booking CTA link to plain `/contact` or pre-populate treatment name via `/contact?treatment=[name]`? → A: Plain `/contact` — no changes to `ContactForm.js`; query-parameter pre-fill is out of scope.
- Q: Should testimonials on treatment pages use the existing animated carousel or a static card grid? → A: Static card grid — Server Component compatible, no Framer Motion dependency, simpler and faster for content pages.
- Q: Should `metaTitle` in the data file be the full title string or just the treatment-specific portion? → A: Treatment-specific portion only (e.g. "Root Canal Treatment in Chennai") — the root layout template appends "| Phoenix Dental Care" automatically.
