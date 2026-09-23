# Contract: Contact Form

**Date**: 2026-07-08 | **Plan**: [plan.md](../plan.md)

The contact form collects appointment inquiry data and submits it via Netlify Forms to the clinic.

## Form Identity

| Attribute | Value |
|-----------|-------|
| HTML name | `contact` |
| Netlify attribute | `data-netlify="true"` |
| Submission URL | Handled by Netlify (same page URL, POST) |
| Notification recipient | Site owner email configured in Netlify dashboard |

## Fields

| Field Name | Label | Type | Required | Validation |
|------------|-------|------|----------|------------|
| `name` | Full Name | text | Yes | Non-empty |
| `phone` | Phone Number | tel | Yes | Non-empty; numeric |
| `email` | Email Address | email | No | Valid email format if provided |
| `treatment` | Treatment / Service of Interest | text | No | Free text |
| `message` | Message or Question | textarea | Yes | Non-empty |
| `preferred-date` | Preferred Appointment Date | date | No | Today or future date |
| `form-name` | *(hidden)* | hidden | Yes (Netlify) | Value: `"contact"` |

## States

| State | UI Behavior |
|-------|------------|
| Idle | Form visible with empty fields |
| Submitting | Submit button shows loading indicator; fields disabled |
| Success | Form replaced with a confirmation message: "Thank you! We've received your message and will contact you shortly to confirm your appointment." |
| Error | Inline error messages under invalid fields; general error toast if submission fails |

## Validation Rules

- `name`: required, min 2 characters
- `phone`: required, digits only, min 10 characters
- `email`: optional, must match email pattern if provided
- `message`: required, min 10 characters
- `preferred-date`: optional, must be today or a future date

## Accessibility

- All fields must have visible `<label>` elements linked via `htmlFor` / `id`.
- Required fields must have `aria-required="true"`.
- Error messages must be associated with their field via `aria-describedby`.
- Form must be operable via keyboard alone.
