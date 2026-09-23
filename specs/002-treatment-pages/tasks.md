# Tasks: Treatment Pages Module

**Input**: Design documents from `specs/002-treatment-pages/`

**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/ ✅ | quickstart.md ✅

**Tests**: No automated test tasks generated — no testing framework is installed. Manual validation scenarios are documented in `quickstart.md`.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1–US7)
- Exact file paths are included in all descriptions

## Path Conventions

Next.js App Router web application at repository root:

```
app/           ← pages, layouts, routes
components/    ← reusable UI components
data/          ← static JS data files
public/        ← static assets (images)
```

---

## Phase 1: Setup

**Purpose**: Establish the precise state of each file that will be modified before any changes are made. Prevents surprises during implementation.

- [x] T001 Read `app/services/[slug]/page.js` and note its current structure — what sections exist, what props are used, how `generateStaticParams` and `generateMetadata` are implemented
- [x] T002 Read `data/services.js` and note all 10 current entry shapes — which fields exist, which are missing the new required fields
- [x] T003 [P] Read `components/Breadcrumb.js` and note how the `serviceNames` prop is consumed and how crumbs are built from the pathname
- [x] T004 [P] Read `components/services/ServiceCard.js` and confirm which fields it uses from the service data object
- [x] T005 [P] Read `app/services/page.js` and note how it sources and passes service data to `ServiceCard`
- [x] T006 [P] Read `app/utils/config.js` and note the exact shape of the `testimonials` array and `practiceInfo` object needed by treatment page components
- [x] T007 [P] Read `data/team.js` and note the doctor object shape — specifically the `id` field value used by Dr. Divya

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Enrich the data layer — everything else depends on this. No treatment page component or page file can be built until the data model is complete.

**⚠️ CRITICAL**: All user story phases depend on this phase being complete.

- [x] T008 Enrich all 5 existing entries in `data/services.js` — add `metaTitle` (treatment-specific portion only, e.g. "Root Canal Treatment in Chennai" — layout template appends "| Phoenix Dental Care"), `metaDescription`, `heroAlt`, `benefits[]`, `procedureSteps[]`, `faqs[]`, `relatedSlugs[]`, `doctorId` to: `root-canal-treatment`, `pediatric-dentistry`, `laser-dentistry`, `smile-makeover`, `gum-care` (update `name` of `gum-care` to "Gum Treatments"); see `data-model.md` for required field shapes and minimum array lengths
- [x] T009 Add 5 new treatment entries to `data/services.js`: `dental-implants`, `teeth-whitening`, `invisible-aligners`, `braces-treatment`, `tooth-extraction` — each with all required fields including `metaTitle` (treatment-specific portion only, max ~45 chars), `metaDescription`, `heroAlt`, `benefits[]`, `procedureSteps[]`, `faqs[]`, `relatedSlugs[]`, `doctorId`; see `contracts/treatment-data-contract.md` for field contract
- [x] T010 Add placeholder image at `public/images/placeholder.jpg` for treatments without approved photography (invisible-aligners, braces-treatment, tooth-extraction); reference it in `imageSrc` and `heroAlt` fields added in T009

**Checkpoint**: `data/services.js` now exports 10 fully-enriched entries. All downstream tasks can begin.

---

## Phase 3: User Stories 1 & 2 — Treatment Detail Page + SEO (Priority: P1) 🎯 MVP

**Goal (US1)**: A patient visiting any treatment page sees all required content sections — hero, overview, benefits, procedure, FAQs, testimonials, doctor info, and appointment CTA.

**Goal (US2)**: A search engine visiting any treatment page finds a unique title, meta description, canonical URL, and three JSON-LD structured data blocks.

**Independent Test**: Visit `http://localhost:3000/services/root-canal-treatment` and verify all required sections render. Inspect `<head>` for unique title, canonical URL, and JSON-LD scripts. See `quickstart.md` Scenarios 1–4.

### Implementation for User Stories 1 & 2

- [x] T011 [P] [US1] Create `components/services/TreatmentHero.js` — renders the treatment hero section: full-width hero image (Next.js `<Image>` with `priority` prop), treatment name as `<h1>`, category badge; accepts props: `name`, `imageSrc`, `heroAlt`, `category`
- [x] T012 [P] [US1] Create `components/services/TreatmentOverview.js` — renders the treatment overview section: `<h2>About This Treatment</h2>` heading followed by the `description` text; accepts props: `description`
- [x] T013 [P] [US1] Create `components/services/TreatmentBenefits.js` — renders the benefits section: `<h2>Benefits</h2>` heading, icon grid of benefit cards (use `react-icons` checkmark icon); each card shows `benefit.title` and optional `benefit.description`; accepts props: `benefits[]`
- [x] T014 [P] [US1] Create `components/services/TreatmentProcedure.js` — renders the procedure steps section: `<h2>Treatment Process</h2>` heading, numbered step cards each showing `step.step`, `step.title` as `<h3>`, and `step.description`; accepts props: `procedureSteps[]`
- [x] T015 [P] [US1] Create `components/services/TreatmentFAQ.js` — Client Component (`"use client"` not needed — use native `<details>`/`<summary>` HTML elements, no JS state required); renders `<h2>Frequently Asked Questions</h2>` heading, one `<details>` per FAQ item with `<summary>` for the question and `<p>` for the answer; styled with Tailwind; only rendered when `faqs.length > 0`; accepts props: `faqs[]`
- [x] T016 [P] [US1] Create `components/services/TreatmentTestimonials.js` — Server Component; renders `<h2>What Our Patients Say</h2>` heading and a **static responsive card grid** (NOT the homepage `testimonialSlider.js` carousel) of 3 testimonial cards showing name, treatment label, and review text; imports `testimonials` from `app/utils/config.js` directly; accepts no props; no Framer Motion dependency
- [x] T017 [P] [US1] Create `components/services/TreatmentCTA.js` — renders the appointment CTA banner: `<h2>` heading ("Ready to Get Started?"), a subheading, and a button linking to plain `/contact` (no query parameters, no pre-population of the contact form); styled with Tailwind using the site's primary pink color; accepts optional prop `treatmentName` to personalise the heading copy
- [x] T018 [P] [US1] Create `components/services/TreatmentDoctor.js` — renders the doctor information section: `<h2>Meet Your Doctor</h2>` heading, renders `DoctorCard` from `components/team/DoctorCard.js` with the matching doctor; accepts props: `doctorId`; section is omitted entirely when `doctorId` is null or the doctor is not found in `data/team.js`
- [x] T019 [US1] Rebuild `app/services/[slug]/page.js` — compose all section components (T011–T018) in the correct section order per `contracts/treatment-data-contract.md`; import `services` from `data/services.js`; call `notFound()` from `next/navigation` when no matching slug is found; include `generateStaticParams()` that maps all service slugs; wire `Breadcrumb` component with `serviceNames` prop built from the services array; no SEO or JSON-LD yet (added in T020–T023)
- [x] T020 [US2] Add `generateMetadata({ params })` to `app/services/[slug]/page.js` — returns `title: treatment.metaTitle` (treatment-specific portion; the root layout template in `app/layout.js` appends "| Phoenix Dental Care" via its `template` field — do NOT append it manually), `description: treatment.metaDescription`, `alternates: { canonical: \`https://phoenixdentalcare.in/services/${slug}\` }`, and `openGraph` block with title, description, url, and hero image; calls `notFound()` for missing slugs
- [x] T021 [US2] Add BreadcrumbList JSON-LD to `app/services/[slug]/page.js` — use `components/seo/JsonLd.js`; three list items: Home (`/`), Services (`/services`), and the current treatment name (no `item` URL on the last item per schema.org spec)
- [x] T022 [US2] Add MedicalProcedure JSON-LD to `app/services/[slug]/page.js` — use `components/seo/JsonLd.js`; include `name`, `description`, `procedureType: "Therapeutic"`, `url`, and `provider` object using `practiceInfo` from `app/utils/config.js`
- [x] T023 [US2] Add FAQPage JSON-LD to `app/services/[slug]/page.js` — use `components/seo/JsonLd.js`; conditionally rendered only when `treatment.faqs.length > 0`; maps each FAQ item to a `Question`/`Answer` pair per schema.org spec

**Checkpoint**: Visit `http://localhost:3000/services/root-canal-treatment` — all content sections visible; `<head>` contains unique title, canonical, and three JSON-LD blocks. US1 and US2 are independently testable.

---

## Phase 4: User Story 3 — Breadcrumb Navigation (Priority: P2)

**Goal**: A patient landing on any treatment page sees and can use the breadcrumb trail "Home → Services → [Treatment Name]" with working links.

**Independent Test**: Visit any treatment page; verify breadcrumb shows three levels with correct labels and "Home" and "Services" link correctly. See `quickstart.md` Scenario 2 (breadcrumb check).

### Implementation for User Story 3

- [x] T024 [US3] Update `app/services/[slug]/page.js` to pass the treatment's display `name` correctly to the `Breadcrumb` component via the `serviceNames` prop — verify the prop builds a map of `{ [slug]: name }` covering all 10 slugs so the breadcrumb label shows the human-readable treatment name rather than the raw slug
- [x] T025 [US3] Verify `components/Breadcrumb.js` correctly handles the `services` path segment — inspect the segment label map for `"services"` and add it if missing so the middle crumb reads "Services" (not the raw segment)

**Checkpoint**: Breadcrumb on any treatment page shows "Home > Services > [Treatment Name]" with first two items as clickable links. BreadcrumbList JSON-LD (from T021) already contains correct structure.

---

## Phase 5: User Story 4 — Related Treatments (Priority: P2)

**Goal**: A patient on any treatment page sees 2–4 related treatment links in a "Related Treatments" section and can navigate to each.

**Independent Test**: Visit `http://localhost:3000/services/teeth-whitening`; scroll to bottom; verify 2–4 related treatment cards appear with working links; verify current treatment does not appear in its own related list. See `quickstart.md` Scenario 2 (related treatments check).

### Implementation for User Story 4

- [x] T026 [US4] Create `components/services/RelatedTreatments.js` — renders `<h2>Related Treatments</h2>` heading and a grid of 2–4 treatment cards; each card shows treatment name, summary, and a "Learn More" link to `/services/{slug}`; section is omitted entirely when `relatedSlugs` is empty; accepts props: `relatedSlugs[]`, `allTreatments[]` (the full services array, used to look up treatment details from slugs)
- [x] T027 [US4] Wire `RelatedTreatments` into `app/services/[slug]/page.js` — pass `treatment.relatedSlugs` and the full `services` array; place at bottom of page per section order in `contracts/treatment-data-contract.md`

**Checkpoint**: Each treatment page shows its related treatments section. No treatment links to itself. Empty `relatedSlugs` hides the section cleanly.

---

## Phase 6: User Story 5 — Before & After Gallery (Priority: P3)

**Goal**: On treatment pages that have before/after image data, a patient can view paired before/after images with descriptive alt text.

**Independent Test**: Verify that a treatment with `beforeAfterImages` data shows the gallery section; verify that a treatment without this data shows no gallery and no empty container. See `quickstart.md` Scenario 6.

### Implementation for User Story 5

- [x] T028 [US5] Create `components/services/TreatmentGallery.js` — renders `<h2>Before & After</h2>` heading and a responsive grid of paired image cards; each card shows a "Before" label + image and an "After" label + image using Next.js `<Image>` component; all images must have non-empty alt text; section is omitted entirely when `beforeAfterImages` is empty or absent; accepts props: `beforeAfterImages[]`
- [x] T029 [US5] Wire `TreatmentGallery` into `app/services/[slug]/page.js` — pass `treatment.beforeAfterImages ?? []`; place between FAQ and Testimonials sections per `contracts/treatment-data-contract.md`

**Checkpoint**: Treatments with before/after data show the gallery. All others show no section and no empty space. Layout intact at all viewport sizes.

---

## Phase 7: User Story 6 — Services Listing (Priority: P2)

**Goal**: A patient visiting `/services` sees all 10 treatment cards, each with name, summary, and a working "Learn More" link.

**Independent Test**: Visit `http://localhost:3000/services`; count 10 cards; click 3 different "Learn More" links; verify each routes to the correct treatment detail page. See `quickstart.md` Scenario 1.

### Implementation for User Story 6

- [x] T030 [US6] Verify `app/services/page.js` sources and renders all entries from `data/services.js` — confirm it passes all 10 entries to `ServiceCard`; update the import and rendering logic if it currently only renders a hardcoded subset
- [x] T031 [P] [US6] Verify `components/services/ServiceCard.js` renders correctly with the enriched data entries from Phase 2 — confirm it only uses the original fields (`slug`, `name`, `summary`, `imageSrc`, `category`) and no new fields have inadvertently broken its props

**Checkpoint**: `/services` shows all 10 treatment cards. Each card links to the correct detail page. No layout regressions.

---

## Phase 8: User Story 7 — Data-Driven Extensibility (Priority: P2)

**Goal**: Adding a new treatment to `data/services.js` automatically creates a routed page and sitemap entry with no new page files.

**Independent Test**: Temporarily add an 11th entry to `data/services.js`; visit its URL; verify the page renders; verify the sitemap includes it; remove the entry. See `quickstart.md` Scenario 8.

### Implementation for User Story 7

- [x] T032 [US7] Verify `app/services/[slug]/page.js` `generateStaticParams()` reads directly from `data/services.js` with no hardcoded slug list — if any slugs are hardcoded, replace with a dynamic map over the services array
- [x] T033 [US7] Verify `app/sitemap.js` generates entries by mapping over all slugs from `data/services.js` — confirm all 10 treatment slugs appear in the sitemap output at `http://localhost:3000/sitemap.xml`; update the sitemap generator if any slugs are hardcoded or missing

**Checkpoint**: Adding a new data entry auto-generates a routed page and sitemap entry. No page files created.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Production-readiness, regression prevention, and compliance with success criteria.

- [x] T034 [P] Verify `app/services/[slug]/page.js` calls `notFound()` for unmatched slugs — manually visit `http://localhost:3000/services/not-a-real-treatment` and confirm the 404 page renders (not a blank page or JS error); check `app/not-found.js` exists
- [x] T035 [P] Audit all `heroAlt` values in `data/services.js` — verify every entry has a non-empty, treatment-specific alt text; no entry should use generic text like "image" or "photo"
- [x] T036 [P] Audit all `alt` props used in `TreatmentGallery.js` — verify before/after image alt texts are descriptive and treatment-specific
- [x] T037 Run `npm run build` from the project root — confirm the build completes with zero errors and all 10 treatment pages appear in the `.next` static output; fix any build-time errors introduced by this feature
- [x] T038 [P] Smoke-test existing pages for regressions after the build: verify `/` (homepage), `/about`, `/contact`, `/team`, and `/services` all load and render correctly
- [ ] T039 [P] Manual responsive check — open browser DevTools; test `http://localhost:3000/services/dental-implants` at 375 px, 768 px, and 1280 px viewport widths; verify no horizontal overflow, all sections are readable, CTA button is tappable at 375 px
- [x] T040 [P] Verify footer quick-links still work — `components/footer.js` has hardcoded service links; confirm they still resolve to valid pages after the data changes; update if any link targets an invalid slug

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately; all 7 tasks run in parallel
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user story phases
- **Phase 3 (US1+US2)**: Depends on Phase 2 — components T011–T018 run in parallel; T019–T023 sequential in same file
- **Phase 4 (US3)**: Depends on Phase 3 (T019 must be complete — page must exist before breadcrumb is wired)
- **Phase 5 (US4)**: Depends on Phase 3 (T019 must be complete — page must exist before RelatedTreatments is wired)
- **Phase 6 (US5)**: Depends on Phase 3 (T019 must be complete — page must exist before Gallery is wired)
- **Phase 7 (US6)**: Depends on Phase 2 (data enrichment) — independent of Phases 3–6
- **Phase 8 (US7)**: Depends on Phase 3 (page must exist to verify routing)
- **Polish (Phase 9)**: Depends on all feature phases complete

### User Story Dependencies

- **US1 + US2 (Phase 3)**: Requires Phase 2 complete; no dependency on other stories
- **US3 (Phase 4)**: Requires Phase 3 complete (page file must exist to add breadcrumb wiring)
- **US4 (Phase 5)**: Requires Phase 3 complete (page file must exist); independent of US3
- **US5 (Phase 6)**: Requires Phase 3 complete (page file must exist); independent of US3, US4
- **US6 (Phase 7)**: Requires Phase 2 complete; independent of Phase 3 — can run in parallel with Phase 3
- **US7 (Phase 8)**: Requires Phase 3 complete (routing must exist to verify)

### Within Phase 3

1. T011–T018 (section components) — all [P], run in parallel, no inter-dependencies
2. T019 (page rebuild) — depends on T011–T018 being complete
3. T020 (generateMetadata) — depends on T019
4. T021–T023 (JSON-LD blocks) — depends on T019; T021/T022 can run in parallel; T023 sequential after T022

---

## Parallel Opportunities

### Phase 1 (all parallel)

```
T001 Read app/services/[slug]/page.js
T002 Read data/services.js
T003 Read components/Breadcrumb.js
T004 Read components/services/ServiceCard.js
T005 Read app/services/page.js
T006 Read app/utils/config.js
T007 Read data/team.js
```

### Phase 3 — Section Components (all parallel)

```
T011 TreatmentHero.js
T012 TreatmentOverview.js
T013 TreatmentBenefits.js
T014 TreatmentProcedure.js
T015 TreatmentFAQ.js
T016 TreatmentTestimonials.js
T017 TreatmentCTA.js
T018 TreatmentDoctor.js
```
→ Then T019 (page rebuild) when all complete

### Phases 4, 5, 6 and Phase 7 — run in parallel after Phase 3

```
Phase 4 (US3): T024, T025
Phase 5 (US4): T026, T027
Phase 6 (US5): T028, T029
Phase 7 (US6): T030, T031
```
→ All four can proceed simultaneously after T019 is complete

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 — one treatment fully working)

1. Complete Phase 1: Setup (parallel reads — ~30 min)
2. Complete Phase 2: Foundational (data enrichment — ~2–3 hours for 10 treatments with full content)
3. Complete Phase 3: US1 + US2 (section components + page rebuild + SEO — ~3–4 hours)
4. **STOP and VALIDATE**: Verify `root-canal-treatment` page end-to-end per `quickstart.md` Scenarios 1–4
5. If validation passes — MVP is live. All 10 treatment pages work via the same route.

### Incremental Delivery

1. Phase 1 + 2 + 3 → 10 treatment pages with full content and SEO (**MVP shipped**)
2. Phase 4 → Breadcrumb refinement
3. Phases 5 + 6 + 7 in parallel → Related treatments, gallery, listing verification
4. Phase 8 → Extensibility confirmed
5. Phase 9 → Polish and production build validated

### Parallel Team Strategy

With two developers after Phase 2 is complete:

- **Dev A**: Phase 3 (US1 + US2) — treatment detail page and SEO
- **Dev B**: Phase 7 (US6) — services listing verification

Once Phase 3 is done, all of Phases 4–6 and Phase 8 can proceed.

---

## Notes

- [P] tasks operate on different files — no merge conflicts
- [Story] label maps each task to its user story for traceability
- No test tasks generated — manual validation via `quickstart.md`
- The MVP is complete after Phase 3: all 10 treatment pages are live with SEO from a single data file update
- Commit after each phase checkpoint (or after each logical task group)
- Before starting Phase 3, confirm all 10 data entries in `data/services.js` pass the contract in `contracts/treatment-data-contract.md`
