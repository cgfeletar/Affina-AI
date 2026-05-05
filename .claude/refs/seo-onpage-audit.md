# SEO Reference: On-Page Audit

Use during Step 3 of the seo agent workflow. Apply per route or template.

## Title and Description

- `<title>` is unique per page, 60 characters or fewer, leads with the primary topic, ends with the brand
- `<meta name="description">` is unique, 140–160 characters, summarizes the page in language a user would click on. No keyword stuffing.
- No template duplication. Every page should produce its own values, not "Page | Site" with a static description across the whole site.

## Headings and Structure

- Exactly one `<h1>` per page, matches the page topic, distinct from `<title>`
- Heading levels are sequential — no jumping from `<h2>` to `<h4>`
- Section headings reflect actual content hierarchy, not styling choices

## Semantic HTML

- `<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>` used appropriately
- Lists use `<ul>` or `<ol>`, not styled `<div>`s
- Tables use `<thead>`, `<tbody>`, and `<th scope>` for data tables
- Images have descriptive `alt` text, or empty `alt=""` for decorative images. Never `alt` containing the filename.

## Internal Linking

- Every important page is reachable from the home page within 3 clicks
- Anchor text is descriptive — avoid "click here" and "read more". Reflect the destination's topic.
- Related-content links connect topically clustered pages. This helps both crawlers and AI engines build entity relationships.
- No orphan pages — every indexable page has at least one internal link pointing to it

## Open Graph and Twitter Cards

- `og:title`, `og:description`, `og:image`, `og:url`, `og:type` set on every shareable page
- `og:image` is at least 1200x630, under 8MB, served over HTTPS, with a stable URL
- `twitter:card` set (typically `summary_large_image`) with matching title, description, and image
- `og:site_name` and locale set globally
