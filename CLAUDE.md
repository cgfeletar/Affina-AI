# Affina AI · Website

This is the marketing site for Affina AI, an AI consulting practice based in Portland, Oregon, serving high-end boutique businesses (med spas, beauty studios, boutique fitness, and adjacent crafts).

The reference design lives in `source.html` at the project root. Treat it as the **visual and structural source of truth** for the home page. Match its aesthetic, spacing, and tone — not necessarily its exact markup, since the source is hand-written HTML and this project is React/Next.js.

---

## Brand & Positioning

- **Name:** Affina AI
- **Positioning line:** "Affina AI helps boutique businesses run like they have a bigger team, without losing the personal touch their clients come for."
- **Audience:** Local, owner-operated boutique businesses serving high-earning women — med spas, beauty boutiques (blowdry bars, nail/lash studios), boutique fitness (Pilates, barre, yoga at $40+ drop-in), and adjacent crafts (stylists, interior designers, florists).
- **Aesthetic direction:** Luxe, not techy. Reference points: Vintner's Daughter, Elevest, Remedy Place (vibe, not palette), high-end interior design studios. Editorial, not corporate. Generous whitespace, real photography over stock, restrained palette, warm not stark.

## Voice Rules

The site copy should feel like it was written by a person who runs a small consulting practice, not by an AI or a marketing agency. The single most important rule: **specificity over polish.**

- **Avoid em dashes.** They are an AI tell. Use commas, periods, or parentheses. Em dashes are acceptable as visual lead-ins for tags (e.g. "— Lead capture") and for attribution lines, but not in body copy.
- **Avoid lists of three.** "X, Y, and Z" patterns where all three are abstractions ("polish, attention, care") sound generated. Replace with one specific concrete detail.
- **Avoid empty luxury vocabulary.** Words to use sparingly or not at all: _polish, thoughtful, intentional, elevated, considered, curated, quietly, seamlessly._ They feel like luxury copy because that's where they appear, but they're placeholders for something more specific.
- **Avoid the wise-narrator voice.** Don't tell the reader about her own life ("You remember birthdays, you know your clients..."). Write from the consultant's perspective, naming what she observes in real practices.
- **Avoid defensive copy.** "No sales script, no follow-up sequence" tells people what you won't do. Lead with what you will.
- **Avoid the "not just X, but Y" sentence shape.** It is the most AI-coded construction.
- **Specific over abstract.** "Stephanie still asks how my mom's surgery went" is better than "the kind of place that remembers you."
- **Outcomes, not features.** "Never lose a lead in your DMs again" is better than "Airtable + Zapier automation."

When in doubt, the test: _could this paragraph appear on a competitor's site verbatim?_ If yes, rewrite it.

---

## Site Architecture

1. **Home** (`/`) — Hero, "who this is for" verticals, three "is this you?" scenarios, client testimonial section (placeholder until first case study), CTA.
2. **What I build** (`/what-i-build`) — The five builds, written as outcomes, each with a short story of who it's for.
3. **Industries** (`/industries`) — Index page plus one short page per vertical (`/industries/med-spas`, `/industries/beauty`, `/industries/fitness`, `/industries/creatives`). Each industry page is an SEO landing page targeting "AI for [vertical] Portland."
4. **About** (`/about`) — Story, photo, why she does this. The biggest differentiator vs. faceless agencies.
5. **Case study** (`/case-study/[slug]`) — Activates once The Artistry NP engagement is documented.
6. **Journal** (`/journal`) — Blog. Markdown-based, file-system rendered. One anchor post at launch, growing over time.
7. **Contact** (`/contact`) — Calendly embed, no form gauntlet.

---

## Stack

- **Framework:** Next.js 15+ with App Router and TypeScript
- **Styling:** Tailwind CSS v4 (use the design tokens below — do not invent new ones)
- **Hosting:** Vercel
- **Blog:** Local MDX/Markdown files in `/content/journal/*.mdx`. No CMS for now.
- **Calendly:** `react-calendly` package on the contact page
- **Sitemap:** `next-sitemap` for build-time generation
- **Analytics:** Vercel Analytics (one-line install, privacy-friendly)
- **Animations:** `framer-motion` for scroll reveals and transitions
- **Images:** Always `next/image`, never raw `<img>` tags
- **Fonts:** Self-host via `next/font/google` for Fraunces (display, body) and Inter (UI). Bodoni Moda is wordmark-only.

## Design Tokens

These come from `source.html` and should be configured in `tailwind.config.ts` (or `globals.css` for v4). Do not introduce new colors, fonts, or arbitrary values without updating these tokens first.

### Colors

```
--bg:         #f4efe8   warm off-white, primary background
--bg-deep:    #ebe4d9   slightly deeper off-white for alternating sections
--ink:        #2b2722   near-black, warm; primary text
--ink-soft:   #5a5249   secondary text
--ink-mute:   #8a8278   tertiary text, labels, eyebrows
--rose:       #b88574   dusty rose accent (italics, marks, hover states)
--rose-deep:  #8e5d4e   deeper rose for emphasis and primary button hover
--sage:       #8a9582   secondary sage accent (used sparingly)
--line:       #d9d0c2   hairline borders
--line-soft:  #e5dccd   very faint dividers
```

### Typography

```
--font-display:  Fraunces           // headlines, body, italic accents
--font-body:     Inter              // UI text, buttons, eyebrows
--font-wordmark: Bodoni Moda        // ONLY for the "Affina AI" wordmark
```

The italic _AI_ in the wordmark uses Bodoni Moda's own italic — do not substitute Fraunces italic there.

### Spacing & Layout

```
--max-width:  1280px
--gutter:     clamp(1.25rem, 4vw, 3rem)
```

Section vertical padding follows the source: `clamp(5rem, 10vw, 9rem)` for standard sections, slightly more for hero.

---

## SEO Foundation

These need to ship with the first deploy, not added later:

- **Sitemap** generated at build time via `next-sitemap`
- **`robots.txt`** allowing all crawlers
- **Schema.org JSON-LD** on every page:
  - `LocalBusiness` on home
  - `ProfessionalService` on industry pages
  - `Person` on About
  - `Article` on journal posts
- **Open Graph images** for every page (1200x630, generated via `next/og` route handler)
- **Per-page metadata** via the Next.js `generateMetadata` API — title, description, OG, Twitter card
- **Canonical URLs** set explicitly on every page
- **Primary terms to optimize for:** "AI consultant Portland," "AI for [vertical] Portland" (one per industry page). Do not stuff these — work them into headlines, meta descriptions, and the first H2 on each industry page naturally.

The seo agent in `.claude/agents/` should handle most of this when invoked on a per-page basis.

---

## AI Crawler Policy

Affina AI **allows** all major AI search and training crawlers. AI citations are treated as a primary distribution channel, not a leak: being quoted by ChatGPT, Perplexity, Claude, and Google AI Overviews drives qualified inbound that traditional SEO does not.

The following user agents are explicitly allowed in `robots.txt`:

| Provider     | User agents                                  |
| ------------ | -------------------------------------------- |
| OpenAI       | `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`    |
| Anthropic    | `ClaudeBot`, `anthropic-ai`, `Claude-Web`    |
| Perplexity   | `PerplexityBot`                              |
| Google AI    | `Google-Extended`                            |
| Meta         | `Meta-ExternalAgent`                         |
| ByteDance    | `Bytespider`                                 |
| Amazon       | `Amazonbot`                                  |
| Apple        | `Applebot-Extended`                          |
| Common Crawl | `CCBot`                                      |

Do not block any of these without an explicit decision from the owner. The `seo` agent should treat this section as authoritative and not re-ask the AI crawler policy question.

---

## Photography

- All real photography goes in `/public/images/` organized by section
- A brand photoshoot is planned but not yet completed; placeholder image frames in `source.html` describe the shots needed
- When real photos arrive, replace placeholder components with `next/image` calls
- Avoid stock photos that read as generic. Texture and detail shots (marble, linen, soft window light) can be sourced from Death to Stock or Haute Stock if needed; never from Unsplash's tech/business categories

---

## Component Conventions

Discover existing patterns by reading the codebase before writing new ones. A few rules of thumb specific to this project:

- **Sections** are the top-level building block. Each section is a self-contained component with its own padding, max-width container, and grid.
- **Reuse the design tokens.** If a hex value or font name appears in your code, it should match the tokens above.
- **No `bg-[#2b2722]` arbitrary Tailwind classes.** If you need a color, it should be in the theme.
- **Server components by default.** Only mark `'use client'` when interactivity (state, events, framer-motion) genuinely requires it.
- **Animations should be subtle.** Fade-up on scroll, slow text reveals. Nothing flashy. The brand is restrained.
- **Mobile first, but design for desktop.** The audience reads on both, but the desktop experience is where the editorial design lives.

---

## What This Site Is Not

A few negative examples — these are common patterns to avoid:

- Generic AI imagery: brains, circuits, neon gradients, "techy" iconography
- Purple gradients of any kind
- Tech-startup hero patterns: large gradient text, animated mesh backgrounds, code-snippet illustrations
- Bullet-point feature lists. Builds and services should be described as outcomes in prose.
- Trust-badge logos ("As featured in...") unless we genuinely have press
- Live chat widgets, exit-intent popups, scarcity timers, any growth-hacking pattern
- Stock photos of people in headsets pointing at laptops

---

## Priorities for First Deploy

In rough order:

1. Home page that matches `source.html` translated into clean React components
2. Layout primitives: `<Nav>`, `<Footer>`, `<Container>`, `<Section>`, `<Button>`
3. About page (high differentiator — needs to ship in v1)
4. Contact page with Calendly embed
5. Industries index + one industry page (med spas) as the template for the others
6. What I build page
7. Sitemap, robots, schema, OG images
8. Vercel Analytics
9. Journal infrastructure (no posts yet, but the route should exist)
10. Remaining industry pages
11. First anchor blog post
