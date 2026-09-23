# Data Model: Multi-Page SEO Website Upgrade

**Date**: 2026-07-08 | **Plan**: [plan.md](./plan.md)

All data is static (no database). Two canonical data files replace the inline arrays currently scattered across component files.

---

## Service

**File**: `data/services.js`

Represents a dental treatment offered by the practice.

| Field | Type | Rules |
|-------|------|-------|
| `slug` | string | URL-safe, kebab-case, unique across all services. Used as the route param for `/services/[slug]`. |
| `name` | string | Display name (title case). Used in headings, cards, and meta titles. |
| `summary` | string | 1–2 sentence overview. Used on the Services listing page card and as the meta description. Max ~160 characters. |
| `description` | string | Full treatment description (paragraph or two). Used on the individual service detail page. |
| `imageSrc` | string | Path to image under `/public/images/` (e.g., `"/images/preventive.jpeg"`). Used on both listing card and detail page. |
| `category` | string | Groups services for potential future filtering. One of: `"preventive"`, `"cosmetic"`, `"restorative"`, `"specialty"`. |

**Initial services** (extracted from `components/home/treatments.js`):

| Slug | Name | Category |
|------|------|----------|
| `preventive-dentistry` | Preventive Dentistry | `preventive` |
| `cosmetic-dentistry` | Cosmetic Dentistry | `cosmetic` |
| `restorative-dentistry` | Restorative Dentistry | `restorative` |
| `pediatric-dentistry` | Pediatric Dentistry | `specialty` |
| `root-canal-treatment` | Root Canal Treatment | `specialty` |
| `orthodontics` | Orthodontics (Braces & Aligners) | `specialty` |
| `gum-care` | Gum Care (Periodontics) | `specialty` |
| `tooth-replacement` | Tooth Replacement Solutions | `restorative` |
| `laser-dentistry` | Painless & Laser Dentistry | `specialty` |
| `smile-makeover` | Smile Makeover | `cosmetic` |

**Validation rules**:
- `slug` must match `/^[a-z0-9-]+$/` and be unique.
- `summary` must be present and under 160 characters for meta description use.
- `imageSrc` must reference an existing file under `public/`.

---

## TeamMember

**File**: `data/team.js`

Represents a dentist or staff member with a public profile.

| Field | Type | Rules |
|-------|------|-------|
| `id` | string | Unique identifier (kebab-case name, e.g., `"dr-divya"`). |
| `name` | string | Full name with title (e.g., `"Dr. Divya S"`). |
| `title` | string | Role/specialization (e.g., `"Family Dental Surgeon & Aesthetician"`). |
| `qualifications` | string | Degrees and certifications (e.g., `"B.D.S, M.D.S."`). |
| `bio` | string | 2–4 sentence biography for the profile page. |
| `imageSrc` | string | Path to profile photo under `/public/images/`, or `null` if no photo yet. |

**Initial team member** (extracted from `app/page.js` contact section and existing `ourDoctor` component):

| id | Name | Title |
|----|------|-------|
| `dr-divya` | Dr. Divya S | Family Dental Surgeon, Aesthetician, Adult and Children's Dentist; Associate Professor in Dental College |

---

## PracticeInfo

**File**: `app/utils/config.js` (extend existing file)

Centralizes clinic contact and branding data used across multiple pages (footer, Contact page, JSON-LD).

| Field | Type | Current Value |
|-------|------|---------------|
| `name` | string | `"Phoenix Dental Care"` |
| `tagline` | string | `"Dr. Divya's Phoenix Dental Care"` |
| `address` | string | `"No 58/60, Ground Floor, Anna Street, Chitlapakkam, Chennai - 600064"` |
| `phone` | string | `"+91 90032 26380"` |
| `email` | string | `"phoenixdentalc@gmail.com"` |
| `openingHours` | string[] | e.g., `["Mon–Sat 09:00–20:00"]` |
| `mapUrl` | string | Google Maps link to the clinic |
| `whatsappUrl` | string | Existing WhatsApp booking URL (kept for WhatsApp button in footer/header) |

---

## ContactFormSubmission

**Handled by**: Netlify Forms (no application-level data model needed)

Fields collected via the contact form:

| Field | Required | Validation |
|-------|----------|------------|
| `name` | Yes | Non-empty string |
| `phone` | Yes | Numeric, 10 digits minimum |
| `email` | No | Valid email format if provided |
| `message` | Yes | Non-empty, describes treatment interest or question |
| `preferredDate` | No | Date string, must be today or future |

Submissions are stored by Netlify and forwarded by email to the configured site owner address. No application-level persistence.

---

## Page / Route

Not a data entity — defined by the file system. Documented here for reference:

| Route | File | Type |
|-------|------|------|
| `/` | `app/page.js` | Server Component (SSG) |
| `/about` | `app/about/page.js` | Server Component (SSG) |
| `/services` | `app/services/page.js` | Server Component (SSG) |
| `/services/[slug]` | `app/services/[slug]/page.js` | Server Component (SSG via `generateStaticParams`) |
| `/team` | `app/team/page.js` | Server Component (SSG) |
| `/contact` | `app/contact/page.js` | Server Component (SSG, form is Client Component) |
| `/sitemap.xml` | `app/sitemap.js` | Next.js built-in |
| `/robots.txt` | `app/robots.js` | Next.js built-in |
| `*` (404) | `app/not-found.js` | Next.js built-in |
