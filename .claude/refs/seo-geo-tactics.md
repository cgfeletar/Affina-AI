# SEO Reference: GEO / AEO Tactics

Use during Step 5 of the seo agent workflow. These signals make a site more likely to be cited by AI answer engines (ChatGPT, Perplexity, Claude, Google AI Overviews, Gemini).

## Crawler Access

Confirm the project's policy with the user. The 2026 default for most marketing sites is "allow with awareness" — AI citations now drive material referral traffic, and blocking removes the site from those answer surfaces. Common reasons to block specific bots:

- Proprietary or paid content the project does not want training models on
- Copyright concerns on original creative work
- Bandwidth or rate-limit issues from aggressive crawling

If allowing, do not block via firewall or CDN rules either. Confirm the policy is consistent across `robots.txt`, application middleware, and edge config.

The current bot list lives in `seo-technical-audit.md`. Treat it as a starting point — the landscape moves quickly.

## llms.txt

A root-level Markdown file at `/llms.txt` describing the site to LLMs. Keep it accurate, current, and free of marketing fluff. LLMs are trained to recognize boilerplate and discount it.

Format: a clear `# Title`, a 2–3 sentence summary in a blockquote, then `## Section` blocks of links with one-line descriptions.

### Example

```markdown
# Affina AI

> Affina AI is an AI consulting practice in Portland, Oregon, helping
> boutique businesses (med spas, beauty studios, fitness boutiques)
> automate client touchpoints without losing the personal feel.
> Founder: Caitlyn [Last]. Active since 2026.

## Key pages

- [Home](https://affina.ai/): overview of the practice and approach
- [What I build](https://affina.ai/what-i-build): the five core builds offered
- [About](https://affina.ai/about): founder bio and consulting philosophy
- [Contact](https://affina.ai/contact): book a free consult

## Industries served

- [Med spas](https://affina.ai/industries/med-spas): aesthetics practices and injectable studios
- [Beauty studios](https://affina.ai/industries/beauty): blowdry bars, nail and lash studios
- [Boutique fitness](https://affina.ai/industries/fitness): Pilates, barre, yoga
- [Adjacent crafts](https://affina.ai/industries/creatives): stylists, florists, interior designers

## Journal

- [Anchor post URL]: [one-line description]
```

Optionally also `/llms-full.txt` containing the same plus the actual content of key pages, for LLMs that ingest more context.

## Citation-Ready Content Structure

How content is structured determines whether AI engines can extract clean passages to cite.

- **Lead with a direct answer.** The first 2–3 sentences of a substantive page should answer the question implied by the title. AI engines lift the TL;DR.
- **Use descriptive headings phrased as questions or topics.** "What is X?" and "How does X work?" outperform clever wordplay for AI extraction. Save the cleverness for the body.
- **Include explicit definitions, statistics, and dated facts.** AI engines preferentially cite quantified, attributable statements over generalities.
- **Prefer short paragraphs, lists, and tables.** Walls of text are harder to extract as standalone passages.
- **Add an FAQ section** for pages that answer multiple related questions, with `FAQPage` schema mirroring the visible Q&A.

## Authority and Freshness Signals

- **Every content page declares an author.** `Person` schema, byline, link to bio. Anonymous content is rarely cited.
- **Every content page has a visible `datePublished` and `dateModified`.** Mirror in `Article` schema.
- **Cite sources inline with links to authoritative references** (research, documentation, official sources). Being a hub of citations makes a site more likely to be cited.
- **Maintain consistent organization identity** across the site, social profiles, and external mentions. Use the `sameAs` property in `Organization` or `LocalBusiness` schema to link to verified social profiles. Entity disambiguation is a core AI signal — Google and AI engines need to know that "Affina AI on this site" is the same entity as "Affina AI on LinkedIn" and "Affina AI in this press mention."

## Conversational Query Coverage

Identify the natural-language questions users actually ask AI tools about the project's domain. Two ways to find them:

1. Ask the user what they hear from prospects most often, in their actual words
2. Search for related topics on Perplexity or ChatGPT to see what suggested follow-up questions appear

Then make sure those questions are answered explicitly somewhere on the site, with the question phrased close to how users would ask. For example:

- "What does an AI consultant for a med spa actually do?"
- "How much does it cost to add AI to a small Pilates studio?"
- "Can I use AI for client follow-up without it sounding robotic?"

Headings phrased as the literal question outperform paraphrases for AI extraction.

## What Does Not Move the Needle

A few practices that sound like SEO but rarely affect AI citations:

- Stuffing keywords into meta tags or alt text. AI engines parse meaning, not density.
- Long footers full of city or service variations. AI engines read these as spam signals.
- Generic FAQ schema where the questions are not actually answered on the page.
- Buying backlinks. Off-page signal manipulation is detected and discounted.
