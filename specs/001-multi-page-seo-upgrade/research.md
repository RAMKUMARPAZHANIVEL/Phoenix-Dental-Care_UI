# Research: Multi-Page SEO Website Upgrade

**Date**: 2026-07-08 | **Plan**: [plan.md](./plan.md)

## 1. Sitemap Generation in Next.js 14 App Router

**Decision**: Use the built-in `app/sitemap.js` export (returns an array of sitemap entry objects).

**Rationale**: Next.js 13.3+ includes native sitemap support via a `sitemap.js` file in the `app/` directory. It is zero-dependency, integrates with ISR/SSG, and outputs a valid `sitemap.xml` at `/sitemap.xml` automatically. No additional package needed.

**Alternatives considered**:
- `next-sitemap` npm package: Adds dependency and post-build configuration; overkill for a static site with ~15 routes.
- Manual `public/sitemap.xml`: Cannot be dynamically generated; would require manual updates when service pages are added.

**Implementation note**: The sitemap export must return an array where each entry has `url`, `lastModified`, `changeFrequency`, and `priority` fields.

---

## 2. Per-Page SEO Metadata (Title, Description, Open Graph)

**Decision**: Use the Next.js `generateMetadata` function (or static `metadata` export) in each `page.js` file.

**Rationale**: App Router's metadata API is the idiomatic way to define per-page `<title>`, `<meta name="description">`, and `<meta property="og:*">` tags. Server-rendered, no extra libraries, works with dynamic routes (`[slug]`).

**Alternatives considered**:
- `next/head`: Legacy Pages Router approach; not available/recommended in App Router.
- `react-helmet`: Third-party library; redundant given native Next.js capability.

**Pattern for dynamic routes**:
```js
export async function generateMetadata({ params }) {
  const service = getServiceBySlug(params.slug);
  return {
    title: `${service.name} | Phoenix Dental Care`,
    description: service.summary,
    openGraph: {
      title: `${service.name} | Phoenix Dental Care`,
      description: service.summary,
      images: [{ url: service.imageSrc }],
    },
  };
}
```

---

## 3. Structured Data (JSON-LD / Schema.org)

**Decision**: Render a `<script type="application/ld+json">` tag in Server Components using `dangerouslySetInnerHTML`. Wrap in a shared `JsonLd` component.

**Rationale**: Google recommends JSON-LD over microdata. Next.js App Router Server Components render synchronously, so inline script tags are safe and fast. No third-party library needed.

**Schema types to implement**:
- `LocalBusiness` (subtype: `Dentist`) on the Home and Contact pages — includes name, address, telephone, openingHours, geo coordinates.
- `BreadcrumbList` on inner pages (service detail, team) — signals page hierarchy to search engines.
- `MedicalBusiness` / `Dentist` is a recognized Google rich result type and increases chance of knowledge panel appearance.

**Alternatives considered**:
- `schema-dts` npm package: Provides TypeScript types for schema objects; not needed in a JS project.
- Microdata attributes on HTML elements: More verbose, harder to maintain, less supported by Google tooling.

---

## 4. Contact Form — Submission Handling

**Decision**: Netlify Forms. Add `data-netlify="true"` and `name="contact"` attributes to the HTML `<form>` element. No backend code required.

**Rationale**: The project is already deployed on Netlify. Netlify Forms detects forms at build time and automatically handles submissions, sends email notifications to the site owner, and provides a submissions dashboard. Zero additional dependencies or server infrastructure.

**Constraints**:
- The form must be rendered as HTML (not purely client-side injected) at build time so Netlify can detect it during the build step.
- A hidden `<input type="hidden" name="form-name" value="contact" />` is required for AJAX submission.
- Use a Server Component for the page; the form itself can be a Client Component for interactivity (success state, validation feedback).

**Alternatives considered**:
- Resend / Nodemailer with Server Action: Requires API key management and an email provider; adds complexity.
- EmailJS: Client-side email sending; exposes API keys in browser.
- WhatsApp redirect (current approach): Not a form; provides no structured data capture; poor UX for non-WhatsApp users.

**Form fields**: Name (required), Phone (required), Email (optional), Message/Treatment Interest (required), Preferred Date (optional).

---

## 5. Breadcrumb Navigation

**Decision**: Client Component using `usePathname()` from `next/navigation` to derive the breadcrumb trail from the current URL. Paired with `BreadcrumbList` JSON-LD rendered in the parent Server Component.

**Rationale**: The URL structure (`/services/teeth-whitening`) is self-describing enough to generate breadcrumbs programmatically. A path-to-label mapping handles slugs. JSON-LD BreadcrumbList enables Google to show breadcrumbs in search results.

**Alternatives considered**:
- Prop-based breadcrumbs (pass title chain explicitly): More explicit but requires duplicating metadata in multiple places.
- Third-party breadcrumb library: Unnecessary for 2-level depth.

---

## 6. robots.txt

**Decision**: Use the built-in `app/robots.js` export.

**Rationale**: Same rationale as sitemap — zero-dependency, Next.js native, outputs `/robots.txt` automatically.

**Content**: Allow all crawlers on all paths; reference the sitemap URL.

---

## 7. Service Slug Generation

**Decision**: Slugs are defined statically in `data/services.js` as a field on each service object (e.g., `slug: "preventive-dentistry"`). Do not auto-generate from the name at runtime.

**Rationale**: Static slugs are stable (won't break if a name changes slightly), predictable, and safe for `generateStaticParams()` in the `[slug]` route. The service names from the existing `treatments.js` component translate cleanly to slugs.

**`generateStaticParams` pattern**:
```js
export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
```
This pre-renders all service detail pages at build time (SSG), optimal for Netlify deployment.

---

## All Unknowns Resolved

| Unknown | Resolution |
|---------|-----------|
| Sitemap generation | Built-in `app/sitemap.js` |
| Per-page metadata | `generateMetadata` / `metadata` export |
| Structured data | Inline JSON-LD `<script>` via `JsonLd` component |
| Contact form | Netlify Forms |
| Breadcrumbs | `usePathname()` hook + JSON-LD |
| robots.txt | Built-in `app/robots.js` |
| Service slugs | Static field in `data/services.js` |
