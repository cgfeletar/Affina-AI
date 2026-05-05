# SEO Reference: Severity Calibration

Use when assigning severity to issues in the seo agent's report.

## P0 — Blocks Ranking or AI Citation Entirely

- Critical pages return non-200 or `noindex` unintentionally
- Public pages have no `<title>` or no rendered HTML content (CSR-only with empty initial response)
- `robots.txt` blocks indexable content
- Canonical tags point to wrong URLs (dev, staging) or are missing on all pages
- JSON-LD contradicts visible content (schema drift) — actively penalized
- Mixed HTTP/HTTPS or duplicate hosts indexed in parallel
- Critical content rendered only client-side, with the initial HTML response empty of the real page text

## P1 — Significantly Hurts Ranking or AI Visibility

- Duplicate or templated `<title>` and meta descriptions across many pages
- Missing or invalid sitemap, or sitemap not referenced from `robots.txt`
- No JSON-LD on content with obvious schema candidates (articles, products, FAQs)
- Multiple `<h1>` or broken heading hierarchy on key pages
- Open Graph tags missing on shareable pages
- Core Web Vitals failing (LCP > 2.5s, INP > 200ms, CLS > 0.1)
- No `llms.txt`, no AI crawler policy, anonymous content with no author or date signals
- Images without `alt` text on content-bearing imagery

## P2 — Polish, Marginal Gains

- Title or description could be more compelling but is unique and accurate
- Schema covers the basics but could add `BreadcrumbList`, `Person` author entity, or other linked-entity refinements
- Internal linking could be denser between related content
- Image `alt` text is present but generic
- Minor heading rewording for question-style phrasing (AEO-friendly)
- `og:image` exists but is below the recommended 1200x630 size

## Calibration Tips

- If the issue blocks indexing or rendering, it is P0. There is no "P0-ish."
- If the issue degrades signal but content still ranks and renders, it is P1.
- If the issue is about doing better rather than fixing wrong, it is P2.
- When unsure between two levels, ask: "If I shipped without fixing this, would the user lose ranking or citations?" Yes → higher level. No → lower.
