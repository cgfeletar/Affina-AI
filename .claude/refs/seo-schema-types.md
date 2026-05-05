# SEO Reference: Schema Types and Quality Criteria

Use during Step 4 of the seo agent workflow.

## When to Use Which Schema Type

Match the schema to what the page actually is. Common high-value types:

| Schema Type                                                                     | When to Use                                                                                     | Notes                                                                                                 |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `Organization`                                                                  | Once globally on the home page or root layout                                                   | Includes name, logo, URL, `sameAs` links to social profiles                                           |
| `LocalBusiness`                                                                 | Use instead of `Organization` if the business has a physical location or serves a specific area | Includes address, geo coordinates, opening hours, `areaServed`                                        |
| `ProfessionalService`                                                           | Use for service-based businesses (consultants, agencies, designers)                             | Subtype of `LocalBusiness`. Includes `serviceType` and `areaServed`                                   |
| `WebSite`                                                                       | Once globally                                                                                   | Add `potentialAction` SearchAction if the site has a search feature                                   |
| `BreadcrumbList`                                                                | Any page with a hierarchical path                                                               | Each item has `position`, `name`, `item` (URL)                                                        |
| `Article` / `NewsArticle` / `BlogPosting`                                       | Content pages, blog posts, journal entries                                                      | Required: `headline`, `author`, `datePublished`. Recommended: `dateModified`, `image`, `publisher`    |
| `Product`                                                                       | E-commerce product pages                                                                        | Required: `name`, `image`, `description`. Recommended: `offers`, `aggregateRating`, `review`, `brand` |
| `FAQPage`                                                                       | Pages that genuinely contain question-answer pairs visible to users                             | Each Q&A appears in the page, not just the schema                                                     |
| `HowTo`                                                                         | Step-by-step instructional pages                                                                | Steps in the schema match the visible UI                                                              |
| `Person`                                                                        | Author pages, team pages, About pages                                                           | Includes `name`, `jobTitle`, `image`, `sameAs`, `worksFor`                                            |
| `Event`, `Recipe`, `Course`, `JobPosting`, `SoftwareApplication`, `VideoObject` | When applicable                                                                                 | Check schema.org for required fields per type                                                         |

## Quality Bar

Every JSON-LD block on every page must:

1. **Be server-rendered** as `<script type="application/ld+json">` in the initial HTML response. Not injected client-side. In Next.js App Router, JSON-LD inside a server component qualifies.
2. **Match visible content.** Every claim in the schema corresponds to something a user can see on the page. Schema drift (the schema says "5 stars" but no rating appears on the page) is actively penalized.
3. **Fill required and recommended fields.** Per schema.org and Google's documentation. Partial schema is often worse than none.
4. **Use `@id` URIs to link entities.** The `Article`'s `author` field's `@id` should match a `Person` schema's `@id`. The `publisher` should match the global `Organization` `@id`. This builds the knowledge graph AI engines rely on for citation decisions.
5. **Reference, don't redeclare.** When `Organization` is declared globally, refer to it from other schemas via `@id` instead of redeclaring it inline.
6. **Validate after implementation.** The user runs Google's Rich Results Test or the schema.org validator. The agent flags which blocks need testing.

## Example: Linked Entity Pattern

```json
{
  "@context": "https://schema.org",
  "@id": "https://affina.ai/#organization",
  "@type": "ProfessionalService",
  "name": "Affina AI",
  "url": "https://affina.ai",
  "areaServed": "Portland, Oregon",
  "serviceType": "AI consulting"
}
```

Then on a blog post:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What AI can actually do for a small med spa in 2026",
  "author": { "@id": "https://affina.ai/about#person" },
  "publisher": { "@id": "https://affina.ai/#organization" },
  "datePublished": "2026-05-12",
  "dateModified": "2026-05-12"
}
```

The `@id` references tie the blog post to a coherent author and publisher entity that exists elsewhere on the site. This is how AI engines build trust signals.

## Anti-Patterns to Flag

- `Article` schema with no `author` or generic `"author": "Admin"`
- `LocalBusiness` schema with no address or with placeholder address values
- `Product` schema with `aggregateRating` but no visible rating widget
- `FAQPage` schema where the Q&A pairs do not appear in the visible HTML
- Multiple top-level entities of the same type without `@id` discrimination
- Hardcoded dates or fields that should come from CMS or route data
