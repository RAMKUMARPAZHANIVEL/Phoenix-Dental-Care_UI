# Phoenix Dental Care — Development Instructions

## Project Context

Phoenix Dental Care is a dental clinic website being upgraded from a
single-page website to a structured, SEO-friendly multi-page application.

The current upgrade focuses on creating dedicated treatment/service pages.

## Primary Feature

Implement a reusable Treatment Pages module.

Initial treatments include:

- Root Canal Treatment
- Dental Implants
- Teeth Whitening
- Invisible Aligners
- Braces Treatment
- Pediatric Dentistry
- Laser Dentistry
- Smile Makeover
- Gum Treatments
- Tooth Extraction

The treatment list is based on the Phoenix Dental Care SEO proposal.

## Development Rules

### Existing Application

- Inspect the existing application before making architectural decisions.
- Reuse existing components, layouts, utilities, styles, and database patterns
  whenever appropriate.
- Do not rewrite or replace working functionality unnecessarily.
- Do not introduce a new framework or library unless the existing application
  cannot reasonably support the requirement.
- Preserve the current visual identity unless the feature specifically
  requires a UI change.

### Architecture

- Follow the existing project architecture.
- Follow the existing naming conventions.
- Keep components reusable.
- Keep business logic separate from presentation where the existing
  architecture supports this.
- Prefer configuration/data-driven treatment pages rather than duplicating
  page implementations.

### Treatment Pages

Each treatment should have a dedicated SEO-friendly URL.

Example:

/treatments/root-canal-treatment
/treatments/dental-implants
/treatments/teeth-whitening

The exact URL structure should follow the existing application conventions
after inspecting the codebase.

Each treatment page should support:

1. Hero section
2. Treatment overview
3. Benefits
4. Procedure/treatment process
5. Frequently Asked Questions
6. Before and After gallery
7. Patient testimonials
8. Doctor information where applicable
9. Appointment CTA
10. Related treatments
11. Breadcrumb navigation

### SEO

Each treatment page must support:

- Unique page title
- Unique meta description
- Canonical URL where applicable
- Appropriate heading hierarchy
- SEO-friendly URL
- Image alt text
- Internal links
- Breadcrumb structured data
- Treatment/service structured data where appropriate
- FAQ structured data where appropriate

Do not generate keyword-stuffed content.

SEO content should remain natural and patient-focused.

### Images

- Use optimized images.
- Use meaningful alt text.
- Avoid unnecessary large image downloads.
- Follow the image handling approach already used by the project.

### Accessibility

Follow WCAG AA principles where practical.

Ensure:

- Keyboard accessibility
- Proper semantic HTML
- Accessible buttons and links
- Form labels
- Meaningful image alt text
- Sufficient heading structure
- Appropriate focus states

### Responsive Design

Treatment pages must work on:

- Mobile
- Tablet
- Desktop

Use the existing responsive design system of the application.

### Performance

Avoid unnecessary client-side JavaScript.

If the application uses Next.js App Router:

- Prefer Server Components.
- Use Client Components only when interactivity requires them.
- Optimize images.
- Avoid unnecessary API calls.

### Data

Before creating new database models:

1. Inspect the existing database schema.
2. Identify existing treatment/service-related models.
3. Reuse existing models where possible.
4. Only create new models when required.

### Admin

The treatment content should eventually be manageable through the
administration interface.

Before implementing Admin CRUD:

- Inspect the existing admin architecture.
- Reuse existing authentication and authorization.
- Follow existing CRUD patterns.

### Testing

Add tests appropriate to the existing project.

At minimum verify:

- Treatment page rendering
- Treatment slug routing
- Missing/invalid treatment handling
- SEO metadata
- FAQ rendering
- Related treatment links
- Responsive UI where the project's testing setup supports it

### Code Quality

Before considering the feature complete:

- Run the existing lint command.
- Run the existing type-check command.
- Run the existing test suite.
- Fix errors introduced by the feature.
- Do not modify unrelated functionality merely to silence warnings.

## Important Agent Behavior

Before implementing:

1. Inspect the repository.
2. Understand the existing architecture.
3. Identify reusable components.
4. Identify existing treatment/service data.
5. Identify the existing routing strategy.
6. Identify the existing SEO implementation.
7. Identify the existing database structure.

Do not start by creating new files blindly.

When requirements are ambiguous, ask for clarification or document the
assumption before implementation.

Keep changes focused on the Treatment Pages feature.