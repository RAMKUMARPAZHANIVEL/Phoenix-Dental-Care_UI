# Tasks: Multi-Page SEO Website Upgrade

**Input**: Design documents from `specs/001-multi-page-seo-upgrade/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no shared dependencies)
- **[Story]**: Which user story this task belongs to
- Paths are relative to the repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Extract scattered inline data into canonical static data files and extend the shared config. These files are consumed by every subsequent phase.

- [ ] T001 Create `data/services.js` exporting an array of 10 service objects — each with `slug`, `name`, `summary` (≤160 chars), `description`, `imageSrc`, and `category` — migrated from `components/home/treatments.js`
- [ ] T002 Create `data/team.js` exporting an array of team member objects — each with `id`, `name`, `title`, `qualifications`, `bio`, and `imageSrc` — starting with Dr. Divya's profile from the existing contact section in `app/page.js`
- [ ] T003 Update `app/utils/config.js` to add and export a `practiceInfo` object containing `name`, `tagline`, `address`, `phone`, `email`, `openingHours`, and `mapUrl` fields using data already present in `app/page.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before any user story page can be built. Includes layout restructuring, navigation update, shared SEO components, and built-in Next.js SEO routes.

**⚠️ CRITICAL**: No user story page work can begin until this phase is complete.

- [ ] T004 Update `app/layout.js` to import and render `Footer` globally in the root layout so individual pages no longer need to include it; keep `<html>`, `<body>`, font variables, and default metadata export intact
- [ ] T005 Update `components/Header.js` to replace anchor `<a href>` tags with `next/link` `<Link>` components for all navigation items (`/`, `/services`, `/about`, `/team`, `/contact`); add active route highlighting using `usePathname()` from `next/navigation`; update "Book Appointment" CTA to link to `/contact` instead of WhatsApp
- [ ] T006 Update `components/mobileMenu.js` to use `next/link` `<Link>` for all navigation links matching the same route set as the desktop header; ensure menu closes on navigation
- [ ] T007 Create `components/Breadcrumb.js` as a client component (`"use client"`) that reads the current path via `usePathname()`, maps path segments to human-readable labels, and renders a `<nav aria-label="Breadcrumb">` trail (e.g., Home > Services > Cosmetic Dentistry)
- [ ] T008 [P] Create `components/seo/JsonLd.js` server-safe component that accepts a `data` prop (a plain JS object) and renders `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />`
- [ ] T009 [P] Create `app/sitemap.js` using the Next.js built-in sitemap export — return entries for `/`, `/about`, `/services`, `/team`, `/contact`, and all 10 `/services/[slug]` paths from `data/services.js`; set `lastModified`, `changeFrequency`, and `priority` on each entry
- [ ] T010 [P] Create `app/robots.js` using the Next.js built-in robots export — allow all crawlers on all paths and reference `/sitemap.xml`

**Checkpoint**: Foundation ready — run `npm run build` to confirm `app/sitemap.xml` and `app/robots.txt` are generated without errors, and that the layout renders Header + Footer on a test page.

---

## Phase 3: User Story 1 — New Patient Discovers Practice Online (Priority: P1) 🎯 MVP

**Goal**: Every main page has a unique, descriptive `<title>` and `<meta name="description">`. The homepage is a proper server-rendered page with Dentist/LocalBusiness structured data. Search engines can crawl and index the full site.

**Independent Test**: Run `npm run build`. View page source of the homepage — confirm unique title, meta description, and `application/ld+json` JSON-LD block are present. Open `/sitemap.xml` and confirm all pages are listed. On mobile (DevTools 375px), confirm all content is visible without horizontal scroll.

### Implementation for User Story 1

- [ ] T011 [US1] Refactor `app/page.js` to a pure Server Component — add a static `metadata` export with `title: "Phoenix Dental Care — Chitlapakkam, Chennai"` and a unique `description`; ensure all existing sections (hero, about snippet, WhyChooseUs, Treatments preview, Testimonials, Offers, Stats, Map) still render correctly; remove any `"use client"` at the page level (keep it only on child Client Components)
- [ ] T012 [US1] Add a `Dentist`/`LocalBusiness` JSON-LD structured data block to `app/page.js` using the `JsonLd` component from `components/seo/JsonLd.js` and `practiceInfo` from `app/utils/config.js` — include `@type`, `name`, `address`, `telephone`, `openingHoursSpecification`
- [ ] T013 [P] [US1] Create skeleton `app/about/page.js` as a Server Component with a static `metadata` export (`title: "About Us | Phoenix Dental Care"`, unique description) and a placeholder `<main>` section — full content added in Phase 6
- [ ] T014 [P] [US1] Create skeleton `app/services/page.js` as a Server Component with a static `metadata` export (`title: "Our Services | Phoenix Dental Care"`, unique description) and a placeholder `<main>` section — full content added in Phase 4
- [ ] T015 [P] [US1] Create skeleton `app/team/page.js` as a Server Component with a static `metadata` export (`title: "Our Doctors | Phoenix Dental Care"`, unique description) and a placeholder `<main>` — full content added in Phase 6
- [ ] T016 [P] [US1] Create skeleton `app/contact/page.js` as a Server Component with a static `metadata` export (`title: "Contact Us | Phoenix Dental Care"`, unique description) and a placeholder `<main>` — full content added in Phase 5
- [ ] T017 [US1] Create `app/services/[slug]/page.js` with `generateStaticParams` (mapping all slugs from `data/services.js`) and `generateMetadata` (returning `title: "{service.name} | Phoenix Dental Care"` and `description: service.summary`) — use a minimal placeholder body for now; full content added in Phase 4

**Checkpoint**: Run `npm run build`. All routes appear in build output: `/`, `/about`, `/services`, `/team`, `/contact`, and 10 `/services/[slug]` entries. No two pages share the same `<title>`. Sitemap lists all pages.

---

## Phase 4: User Story 2 — Visitor Explores Services (Priority: P2)

**Goal**: The Services listing page shows all 10 treatment cards. Each card links to a fully content-populated detail page with breadcrumb navigation and a clear CTA to the Contact page.

**Independent Test**: Navigate to `/services` — confirm all 10 service cards with images are visible. Click "Cosmetic Dentistry" — confirm URL is `/services/cosmetic-dentistry`, full description and image are shown, breadcrumb reads "Home > Services > Cosmetic Dentistry", and a "Book an Appointment" button links to `/contact`.

### Implementation for User Story 2

- [ ] T018 [P] [US2] Create `components/services/ServiceCard.js` — renders a card with the service image, name, summary, and a "Learn More" `<Link>` pointing to `/services/${service.slug}`; accepts a single `service` prop matching the shape from `data/services.js`
- [ ] T019 [US2] Populate `app/services/page.js` with a responsive grid of `ServiceCard` components using `data/services.js`; add a page heading; add a `BreadcrumbList` JSON-LD block via `JsonLd` for the services listing path
- [ ] T020 [US2] Populate `app/services/[slug]/page.js` with full service detail layout: `Breadcrumb` component, `<h1>` service name, service image (`next/image`), full description paragraph, and a "Book an Appointment" `<Link>` CTA pointing to `/contact`; add `BreadcrumbList` JSON-LD

**Checkpoint**: All 10 service detail pages render with correct content and breadcrumbs. Clicking "Book an Appointment" navigates to `/contact`.

---

## Phase 5: User Story 4 — Visitor Contacts or Books an Appointment (Priority: P2)

**Goal**: The Contact page displays clinic address, phone, and hours, and includes a working Netlify contact form. Submitting shows a success confirmation.

**Independent Test**: Navigate to `/contact` from the header. Confirm address, phone number, and opening hours are visible. Fill all required fields (Name, Phone, Message) and submit. Confirm success message appears. On deployed Netlify site: check Netlify dashboard → Forms → `contact` for the test submission.

### Implementation for User Story 4

- [ ] T021 [US4] Create `components/ContactForm.js` as a Client Component (`"use client"`) with a `<form>` element using `data-netlify="true"` and `name="contact"` attributes; include fields: Name (required), Phone (required), Email (optional), Message (required), Preferred Date (optional); implement client-side required-field validation; manage a `status` state (`idle | submitting | success | error`) to show a confirmation message after successful submission using `fetch` with `method: "POST"` and `application/x-www-form-urlencoded` encoding
- [ ] T022 [US4] Populate `app/contact/page.js` with a two-column layout: left column shows clinic address, phone, email, and opening hours from `practiceInfo` in `app/utils/config.js`; right column renders `ContactForm`; add `Breadcrumb` component at the top

**Checkpoint**: Contact page renders correctly. Submitting with valid data shows success confirmation. Header "Book Appointment" CTA navigates here in one click.

---

## Phase 6: User Story 3 — Visitor Learns About the Practice and Team (Priority: P3)

**Goal**: The About page tells the practice's story. The Team page shows Dr. Divya's profile card. Both pages have breadcrumbs and unique metadata.

**Independent Test**: Navigate to `/about` — confirm practice description, values/differentiators are shown. Navigate to `/team` — confirm Dr. Divya's profile card with name, title, qualifications, and bio is visible. Share `/team` URL in a Slack message preview and confirm the og:title and og:description are populated correctly.

### Implementation for User Story 3

- [ ] T023 [US3] Populate `app/about/page.js` with practice story content using the existing bio text from `app/page.js` (About section); include `Breadcrumb` component; reuse the existing `WhyChooseUs` component (`components/home/whyChooseUs.js`) and `Stats` component (`components/Stats.js`) where appropriate
- [ ] T024 [P] [US3] Create `components/team/DoctorCard.js` — renders a card with doctor photo (`next/image`, falls back to a placeholder if `imageSrc` is null), name, title, qualifications, and bio; accepts a single `member` prop matching the shape from `data/team.js`
- [ ] T025 [US3] Populate `app/team/page.js` with a grid of `DoctorCard` components using `data/team.js`; add `Breadcrumb` component; add a `Person` JSON-LD block via `JsonLd` for the primary doctor

**Checkpoint**: `/about` and `/team` render with content, breadcrumbs, and Open Graph metadata. Sharing either URL on social media shows correct preview title and description.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Branded error page, footer navigation, Open Graph completeness, and final validation.

- [ ] T026 Create `app/not-found.js` branded 404 page — render the site Header and Footer, a friendly "Page Not Found" message, and a `<Link>` back to `/`
- [ ] T027 [P] Update `components/footer.js` to add navigation links (About, Services, Team, Contact) using `next/link`; display clinic phone and address from `practiceInfo` in `app/utils/config.js`
- [ ] T028 [P] Add `openGraph` metadata to all pages — update each page's `metadata` or `generateMetadata` to include `openGraph.title`, `openGraph.description`, and `openGraph.images`; add a default `openGraph` fallback in `app/layout.js` for pages without a custom image
- [ ] T029 Run full validation from `specs/001-multi-page-seo-upgrade/quickstart.md` — verify `/sitemap.xml` lists all routes, `/robots.txt` allows crawlers, JSON-LD passes Google Rich Results Test, 404 page appears for invalid URLs, contact form submits on Netlify, and mobile layout passes DevTools usability check

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — **BLOCKS all page phases**
- **Phase 3 (US1)**: Depends on Phase 2 — establishes metadata foundation for all pages
- **Phase 4 (US2)**: Depends on Phase 3 (service detail page skeleton from T017) — can start immediately after T017
- **Phase 5 (US4)**: Depends on Phase 3 (contact page skeleton from T016) — can start immediately after T016
- **Phase 6 (US3)**: Depends on Phase 3 (about/team skeletons from T013, T015) — can start immediately after those tasks
- **Phase 7 (Polish)**: Depends on all story phases complete

### User Story Dependencies

- **US1 (Phase 3)**: No story dependencies — foundational SEO work
- **US2 (Phase 4)**: Depends on T017 from US1 (service detail page exists)
- **US4 (Phase 5)**: Depends on T016 from US1 (contact page skeleton exists)
- **US3 (Phase 6)**: Depends on T013 and T015 from US1 (about/team skeletons exist)

### Within Each Phase

- Phase 1: T001–T003 have no mutual dependencies; can run in parallel
- Phase 2: T004–T007 must be sequential (layout before pages); T008–T010 are [P]
- Phase 3: T011–T012 sequential; T013–T016 are [P] with each other; T017 after T016
- Phase 4: T018 first (ServiceCard needed by T019); T019 then T020
- Phase 5: T021 then T022 (form component used in page)
- Phase 6: T023 independent; T024 [P] with T023; T025 after T024

---

## Parallel Opportunities

### Phase 2 (Foundational)

```
Parallel group A (after T004-T007):
  T008: Create components/seo/JsonLd.js
  T009: Create app/sitemap.js
  T010: Create app/robots.js
```

### Phase 3 (US1 — after T011, T012)

```
Parallel group B:
  T013: Create app/about/page.js skeleton
  T014: Create app/services/page.js skeleton
  T015: Create app/team/page.js skeleton
  T016: Create app/contact/page.js skeleton
```

### Phase 7 (Polish)

```
Parallel group C:
  T027: Update components/footer.js
  T028: Add openGraph metadata to all pages
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1: Setup (T001–T003)
2. Complete Phase 2: Foundational (T004–T010)
3. Complete Phase 3: US1 (T011–T017)
4. **STOP and VALIDATE**: Run `npm run build` — confirm all routes built, metadata unique, sitemap complete
5. Deploy to Netlify and confirm live SEO metadata

### Incremental Delivery

1. Setup + Foundational → navigation and SEO infrastructure ready
2. US1 (Phase 3) → all pages discoverable in search (MVP)
3. US2 (Phase 4) → services fully browsable
4. US4 (Phase 5) → contact/conversion flow live
5. US3 (Phase 6) → trust-building content live
6. Polish (Phase 7) → 404, footer, OG tags, validation

---

## Notes

- [P] tasks touch different files with no shared dependencies — safe to run in parallel
- [Story] label maps each task to its user story for traceability
- No database or API — all data is static; `generateStaticParams` pre-renders all dynamic routes at build time
- Netlify Forms: the `<form data-netlify="true">` must be present in the HTML at build time — do not inject it dynamically after page load
- Existing components in `components/home/` (WhyChooseUs, Testimonials, Offers, Stats, Map) are reused as-is on the Home page — no changes needed in those files
- Commit after each phase checkpoint to preserve working increments
