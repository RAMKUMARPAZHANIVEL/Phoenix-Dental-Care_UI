# Contract: URL Structure & Routing

**Date**: 2026-07-08 | **Plan**: [plan.md](../plan.md)

This contract defines the canonical URL structure for the multi-page site. All links within the application must use these paths. Changing a slug or path is a breaking change requiring redirects.

## Route Map

| Page | URL | Notes |
|------|-----|-------|
| Home | `/` | Hero, highlights, testimonials |
| About | `/about` | Practice story, values, location |
| Services (listing) | `/services` | Grid of all treatment cards |
| Service Detail | `/services/:slug` | `:slug` from `data/services.js` — see slug table below |
| Team / Doctors | `/team` | Doctor profiles |
| Contact | `/contact` | Address, hours, contact form |
| Sitemap | `/sitemap.xml` | Auto-generated |
| Robots | `/robots.txt` | Auto-generated |
| Not Found | `*` | Branded 404 |

## Service Slugs (Canonical)

These slugs are fixed. Changing them requires a 301 redirect from the old slug.

| Slug | Page Title |
|------|------------|
| `preventive-dentistry` | Preventive Dentistry |
| `cosmetic-dentistry` | Cosmetic Dentistry |
| `restorative-dentistry` | Restorative Dentistry |
| `pediatric-dentistry` | Pediatric Dentistry |
| `root-canal-treatment` | Root Canal Treatment |
| `orthodontics` | Orthodontics (Braces & Aligners) |
| `gum-care` | Gum Care (Periodontics) |
| `tooth-replacement` | Tooth Replacement Solutions |
| `laser-dentistry` | Painless & Laser Dentistry |
| `smile-makeover` | Smile Makeover |

## Navigation Links (Header & Footer)

Primary navigation must include links to: Home (`/`), Services (`/services`), About (`/about`), Team (`/team`), Contact (`/contact`).

The "Book Appointment" CTA in the header links to `/contact`.

## Meta Title Pattern

| Page Type | Pattern | Example |
|-----------|---------|---------|
| Home | `Phoenix Dental Care — Chitlapakkam, Chennai` | — |
| About | `About Us \| Phoenix Dental Care` | — |
| Services listing | `Our Services \| Phoenix Dental Care` | — |
| Service detail | `{Service Name} \| Phoenix Dental Care` | `Cosmetic Dentistry \| Phoenix Dental Care` |
| Team | `Our Doctors \| Phoenix Dental Care` | — |
| Contact | `Contact Us \| Phoenix Dental Care` | — |
| 404 | `Page Not Found \| Phoenix Dental Care` | — |

## Breadcrumb Trails

Breadcrumbs appear on inner pages only (not on Home).

| Page | Breadcrumb Trail |
|------|-----------------|
| `/about` | Home > About |
| `/services` | Home > Services |
| `/services/:slug` | Home > Services > {Service Name} |
| `/team` | Home > Team |
| `/contact` | Home > Contact |
