# SEO Reference: Technical Audit

Use during Step 2 of the seo agent workflow. Walk this checklist page-by-page or template-by-template.

## Crawl Directives

- `robots.txt` exists at the root, allows crawling of public routes, blocks admin/private paths, references the sitemap URL
- AI crawlers explicitly handled (allow, block, or rate-limit per project policy — confirm with the user if unclear). Common bots in 2026:
  - **OpenAI:** `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`
  - **Anthropic:** `ClaudeBot`, `anthropic-ai`, `Claude-Web`
  - **Google AI:** `Google-Extended` (separate from Googlebot — controls Gemini/Vertex training)
  - **Other LLM providers:** `PerplexityBot`, `cohere-ai`, `Meta-ExternalAgent`, `Bytespider`, `Amazonbot`, `Applebot-Extended`, `Diffbot`
  - **Common crawl:** `CCBot`
  - This list is non-exhaustive. Check Dark Visitors (`darkvisitors.com`) or the project's access logs before finalizing the policy.
- `sitemap.xml` exists, lists only canonical URLs, returns 200, includes accurate `lastmod` dates, splits into multiple sitemaps if more than 50,000 URLs
- `sitemap.xml` is referenced from `robots.txt` and submitted to Search Console / Bing Webmaster (note this for the user — the agent does not have access)

## Indexing Controls

- Each public page returns 200. As of Google's December 2025 rendering update, non-200 pages are excluded from rendering entirely.
- `noindex` is used intentionally and never on pages meant to rank
- Canonical tags present on all indexable pages, point to the absolute HTTPS URL, agree with sitemap entries and internal links
- Pagination, parameters, and variants (sort, filter, tracking) have a deliberate canonical strategy
- `hreflang` annotations present and reciprocal if the project ships in multiple languages or regions

## Rendering and Delivery

- HTTPS enforced, HTTP redirects to HTTPS with 301
- A single canonical host (www vs non-www, trailing slash convention) — no duplicates indexed in parallel
- Critical content and `<head>` SEO tags appear in the initial HTML response. Verify with `curl` or view-source, not devtools.
- 404s return a 404 status, not 200 with a "not found" page rendered client-side
- Redirects use 301 for permanent, 302 only for genuinely temporary moves; no chains longer than 1 hop

## Core Web Vitals

Thresholds Google uses as of 2026:

- **LCP (Largest Contentful Paint):** under 2.5s on representative pages
- **INP (Interaction to Next Paint):** under 200ms on common interactions
- **CLS (Cumulative Layout Shift):** under 0.1 — no layout shift from late-loading images, fonts, or ads

Common fixes:

- Hero images use `priority` / `fetchpriority="high"` and explicit `width` and `height`
- Fonts use `font-display: swap` and preload only the primary face
- Third-party scripts loaded with `defer` or `async`, behind consent where required, removed if unused
- Avoid hydration-blocking effects on the first paint path (heavy `useEffect` chains, large client components above the fold)
