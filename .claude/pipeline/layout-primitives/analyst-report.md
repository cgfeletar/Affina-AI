# Component Analysis Report

**Feature:** Layout Primitives  
**Slug:** layout-primitives  
**Date:** 2026-05-05  
**Analyzed by:** component-analyst agent

---

## Summary

This is a **greenfield component library** — no `components/` directory exists yet. All 7 primitives are classified as **WRITE NEW**. There are no existing reusable candidates in the codebase, and no cross-module styling conflicts because the target module is being created from scratch.

### Summary Table

| Component Needed | Classification | Best Candidate | Match Score | Style Compat |
|---|---|---|---|---|
| Container | WRITE NEW | N/A | 0% | N/A |
| Section | WRITE NEW | N/A | 0% | N/A |
| Button | WRITE NEW | N/A | 0% | N/A |
| Eyebrow | WRITE NEW | N/A | 0% | N/A |
| Wordmark | WRITE NEW | N/A | 0% | N/A |
| Reveal | WRITE NEW | N/A | 0% | N/A |
| ImageFrame | WRITE NEW | N/A | 0% | N/A |

---

## Project Conventions (for implementation agent)

| Convention | Value | Evidence |
|---|---|---|
| Export style | Named exports + barrel file (`index.ts`) | `lib/cn.ts` exports named `cn()` function; recommended pattern for UI library |
| Props naming | `ComponentNameProps` (discriminated unions preferred) | `app/layout.tsx:L24-28` shows React Props interface pattern |
| className utility | `cn()` from `@/lib/cn` | `lib/cn.ts:L1-6` — clsx + tailwind-merge composition |
| Path aliases | `@/*` → project root | `tsconfig.json:L21-23` |
| Data fetching | None for UI primitives (no async, no external hooks) | Spec confirms all primitives are presentational |
| State management | None for UI primitives (except framer-motion internal state in `Reveal`) | Spec: no React state outside `Reveal`'s motion hooks |
| Styling approach | **Tailwind v4 (PostCSS-based, no `tailwind.config.ts`)** + CSS custom properties | `app/globals.css:L1` imports `@import "tailwindcss"` and uses `@theme` block |
| Design tokens | Defined in `app/globals.css` `@theme` block as Tailwind utilities | `app/globals.css:L9-39` — all color, font, size, tracking tokens defined here |
| No arbitrary classes rule | STRICT: no `bg-[#xxx]`, `text-[14px]`, etc. Add missing values to `@theme` block first | `CLAUDE.md` and `spec.md` enforce this; `globals.css` is the single source of truth |
| Fonts | `next/font/google` pre-loaded with CSS variables: `--font-fraunces`, `--font-inter`, `--font-bodoni-moda` | `lib/fonts.ts:L3-25` with `variable` prop; `app/layout.tsx:L32-35` applies variables to html |
| Component composition | Server components by default; only `'use client'` when interactivity requires (state, events, framer-motion) | `app/page.tsx:L1-9` is a default server component; spec requires `Reveal` to be client-only |
| Test runner | Vitest + RTL + jsdom + vitest-axe | `vitest.config.ts` configured; `package.json:L10-12` has `test:run` and `test:coverage` scripts |
| Test file location | Co-located `*.test.ts(x)` files in the same directory as source | `vitest.config.ts:L18` includes `"**/*.{test,spec}.{ts,tsx}"` |
| Test coverage thresholds | 80% lines, branches, functions, statements | `vitest.config.ts:L33-38` |
| Next.js version | 16.2.4 (App Router with `generateMetadata` API) | `package.json:L21` |
| React version | 19.2.4 (stable, full JSX support) | `package.json:L22` |
| TypeScript | Strict mode enabled | `tsconfig.json:L8: "strict": true` |

---

## Detailed Analysis

### 1. Container

**Classification:** WRITE NEW  
**Match Score:** 0%  
**Best Candidate:** None — no layout wrapper primitives in codebase

**Score Breakdown:**
- Props/API overlap: 0/30
- Visual/layout similarity: 0/25
- Behavior match: 0/25
- Styling system compatibility: N/A (greenfield)

**Styling Compatibility:**
- Source module: N/A (new module)
- Target module: `components/ui/`
- Status: N/A
- Conflicts: None (greenfield)

**Notes:**
- **What to implement:** Polymorphic `as` prop defaulting to `'div'`; supports any HTML element via `React.ElementType`
- **Styling:** Uses `max-w-content` (defined in `globals.css:L38` as `--container-content: 1280px`) and `px-[var(--gutter)]` for responsive horizontal padding
- **Pattern reference:** `app/page.tsx:L3` shows consumer using `px-[var(--gutter)]` directly — centralize this in Container
- **Server component:** Yes, no interactivity

---

### 2. Section

**Classification:** WRITE NEW  
**Match Score:** 0%  
**Best Candidate:** None — no section wrapper in codebase

**Score Breakdown:**
- Props/API overlap: 0/30
- Visual/layout similarity: 0/25
- Behavior match: 0/25
- Styling system compatibility: N/A (greenfield)

**Styling Compatibility:**
- Source module: N/A (new)
- Target module: `components/ui/`
- Status: N/A
- Conflicts: None

**Notes:**
- **What to implement:** Discriminated `tone` prop with three variants: `'default'` (bg-bg), `'deep'` (bg-bg-deep), `'ink'` (bg-ink with light text)
- **Styling:** `py-[var(--section-y)]` for vertical padding; CSS variable defined at `globals.css:L50` as `--section-y: clamp(5rem, 10vw, 9rem)`
- **Composition strategy per spec:** Consumer composes `<Section><Container>...</Container></Section>` — do NOT include Container inside Section; preserve layout flexibility
- **Text color handling:** When `tone='ink'`, set text utilities to light colors (text-bg or similar) for readability
- **Server component:** Yes

---

### 3. Button

**Classification:** WRITE NEW  
**Match Score:** 0%  
**Best Candidate:** None — no button primitives in codebase

**Score Breakdown:**
- Props/API overlap: 0/30
- Visual/layout similarity: 0/25
- Behavior match: 0/25
- Styling system compatibility: N/A (greenfield)

**Styling Compatibility:**
- Source module: N/A (new)
- Target module: `components/ui/`
- Status: N/A
- Conflicts: None

**Notes:**
- **Two variants:** `primary` and `text`
- **Polymorphic:** If `href` provided, renders `<a>` with `href`; otherwise `<button>` with default `type="submit"` unless overridden
- **Primary variant styling:**
  - Base: `bg-ink text-bg rounded-full` (pill button)
  - Padding: `1rem 1.75rem` to exceed 44×44px touch target
  - Hover: `bg-rose-deep` (color token from `globals.css:L16`) + `translate-y(-1px)` (matches source.html visual)
  - Optional trailing arrow icon (SVG; arrow translates 3px right on hover)
  - Server component (no onClick handler — link/form submission only)
- **Text variant styling:**
  - Base: `text-ink` + `border-b border-ink` underline
  - Padding: `1rem 0`
  - Hover: `text-rose-deep` + underline color becomes `text-rose-deep`
- **Focus ring:** `ring-ink` on light backgrounds, `ring-bg` on dark backgrounds; use `focus-visible:` utilities
- **Icon implementation:** SVG from source.html lines 1048-1062, 1338-1353; render inline or as separate arrow component
- **Server component:** Yes (no onClick handlers)

---

### 4. Eyebrow

**Classification:** WRITE NEW  
**Match Score:** 0%  
**Best Candidate:** None — no eyebrow tag primitives in codebase

**Score Breakdown:**
- Props/API overlap: 0/30
- Visual/layout similarity: 0/25
- Behavior match: 0/25
- Styling system compatibility: N/A (greenfield)

**Styling Compatibility:**
- Source module: N/A (new)
- Target module: `components/ui/`
- Status: N/A
- Conflicts: None

**Notes:**
- **What to implement:** Simple `<span>` with `text-xs uppercase tracking-eyebrow text-ink-mute`
- **Tracking:** `tracking-eyebrow` defined in `globals.css:L36` as `--tracking-eyebrow: 0.18em`
- **Decoration:** Optional `dot?: boolean` renders a 6×6 rose dot (`bg-rose`, size via Tailwind) before the text
- **Pattern reference:** source.html hero eyebrow at lines 1029-1032 shows this pattern
- **Server component:** Yes

---

### 5. Wordmark

**Classification:** WRITE NEW  
**Match Score:** 0%  
**Best Candidate:** None — no branded wordmark component in codebase

**Score Breakdown:**
- Props/API overlap: 0/30
- Visual/layout similarity: 0/25
- Behavior match: 0/25
- Styling system compatibility: N/A (greenfield)

**Styling Compatibility:**
- Source module: N/A (new)
- Target module: `components/ui/`
- Status: N/A
- Conflicts: None

**Notes:**
- **What to implement:** "Affina" (regular, Bodoni Moda 500) + nbsp + "AI" (italic Bodoni Moda, `text-rose`)
- **Font:** Uses `font-wordmark` CSS variable (defined in `globals.css:L45` as `--font-wordmark: var(--font-bodoni-moda), Didot, Georgia, serif`)
- **Font loading:** Bodoni Moda imported at `lib/fonts.ts:L19-25` with `style: ["normal", "italic"]`
- **Polymorphic:** `as?: 'a' | 'span'` (default `'a'`)
  - When `as='a'`: default `href="/"`, apply link semantics (`rel`, focus states)
  - When `as='span'`: render as inline text
- **Size:** Configurable via `className` prop; default should suit nav use (e.g., `text-2xl`)
- **Accessible:** Rendered as single text node so screen readers read "Affina AI" as one unit
- **Pattern reference:** `app/page.tsx:L4-6` shows current wordmark implementation — extract and refactor into component
- **Server component:** Yes

---

### 6. Reveal

**Classification:** WRITE NEW  
**Match Score:** 0%  
**Best Candidate:** None — no animation wrapper primitives in codebase

**Score Breakdown:**
- Props/API overlap: 0/30
- Visual/layout similarity: 0/25
- Behavior match: 0/25
- Styling system compatibility: N/A (greenfield)

**Styling Compatibility:**
- Source module: N/A (new)
- Target module: `components/ui/`
- Status: N/A
- Conflicts: None

**Notes:**
- **ONLY CLIENT COMPONENT:** Mark with `'use client'` — framer-motion requires browser environment
- **What to implement:** Wraps children in `motion.div` (or polymorphic `motion[as]`) with fade-up animation
- **Animation spec (matches source.html exactly):**
  - From: `{ opacity: 0, y: 30 }` — starts 30px below, invisible
  - To: `{ opacity: 1, y: 0 }` — fades in, slides to normal position
  - Transition: `{ duration: 0.9, ease: 'easeOut' }`
  - Viewport trigger: `{ once: true, margin: '0px 0px -60px 0px' }` — fires once when 60px from bottom of viewport
- **Reduced motion:** framer-motion's `useReducedMotion()` hook detects `prefers-reduced-motion: reduce` media query
  - **Critical:** When motion is reduced, children MUST be visible (opacity 1, y: 0) from the start — no hidden state
- **Stagger:** Optional `delay?: number` prop (in seconds) for cascading animations across multiple Reveal instances in a list
- **Polymorphic:** `as?: keyof JSX.IntrinsicElements` (default `'div'`) — allows `<motion.section>`, `<motion.article>`, etc.
- **Dependencies:** `framer-motion` already in `package.json:L19`
- **Server component:** No — must be client (`'use client'`) for hook access

---

### 7. ImageFrame

**Classification:** WRITE NEW  
**Match Score:** 0%  
**Best Candidate:** None — no image frame container in codebase

**Score Breakdown:**
- Props/API overlap: 0/30
- Visual/layout similarity: 0/25
- Behavior match: 0/25
- Styling system compatibility: N/A (greenfield)

**Styling Compatibility:**
- Source module: N/A (new)
- Target module: `components/ui/`
- Status: N/A
- Conflicts: None

**Notes:**
- **Discriminated union:** Render EITHER a placeholder OR an image, never both
- **Base styling (both modes):** `bg-bg-deep border border-line overflow-hidden flex items-center justify-center`
- **Placeholder mode** (`kind: 'placeholder'`):
  - Required props: `label: string`, `description: string`
  - Label: `text-xs uppercase tracking-eyebrow text-ink-mute`
  - Description: `font-display italic text-ink-soft` (Fraunces italic)
  - Pattern reference: source.html lines 1067-1078 shows structure
  - Decorative (no alt text needed for accessibility)
- **Image mode** (`kind: 'image'`):
  - Required props: `src: string`, `alt: string`
  - Optional: `priority?: boolean` (default false) — use for LCP images
  - Implementation: `next/image` with `fill` layout (maintains aspect ratio via CSS container)
- **Aspect ratio:** Optional `aspectRatio?: string` CSS value (default `'4 / 5'` matching source.html); applied to container
- **Accent decoration:** Optional `accent?: 'sage'` renders decorative sage slab:
  - Placement: absolutely positioned, top -20px, right -20px
  - Size: width 60%, height 40%
  - Styling: `bg-sage` at 15% opacity (use Tailwind opacity modifier or calc)
  - Z-index: Behind frame (lower z-index)
  - Pattern reference: source.html `.hero-image::before` pseudo-element
- **Server component:** Yes (no interactivity; images via next/image)

---

## Cross-Module Import Warnings

None. This is a greenfield library — no existing code imports components/ui yet.

---

## Recommendations for Implementation Agent

### Priority Order
1. **Container** — foundational; needed by other components and every page layout
2. **Section** — foundational; pairs with Container for page structure
3. **Button** — high-frequency UI element; primary and text variants both needed
4. **Eyebrow** — lightweight; useful in hero and section headers
5. **Wordmark** — nav/branding; extract pattern from existing `app/page.tsx` code
6. **Reveal** — animation wrapper; client-only, non-blocking; can be implemented last if timeline is tight
7. **ImageFrame** — specialized; lower priority than core layout

### Architectural Suggestions

- **Barrel export:** Create `components/ui/index.ts` that re-exports all 7 primitives for convenience (e.g., `export { Button } from './Button'`)
- **PropTypes approach:** Use **discriminated unions** (TypeScript `type A | type B`) rather than optional props for ImageFrame — forces consumers to specify `kind` upfront
- **Polymorphic patterns:** Use the `as` prop pattern consistently across Container, Section, Wordmark, and Reveal for flexibility
- **className merging:** Always import and use `cn()` from `@/lib/cn` to safely merge consumer classNames without breaking Tailwind utilities
- **No style coupling:** Each primitive should be self-contained; avoid importing other primitives (except Button using optional Icon, which could be a separate SVG utility)
- **Icons in Button:** For the arrow icon, either:
  - Inline SVG in Button component (simplest, no extra imports)
  - Extract to a separate `components/ui/icons/ArrowRight.tsx` utility (more reusable, harder to test)
  - Use Heroicons or similar library (adds dependency, but consistent)
  - **Recommendation:** Inline SVG for v1, refactor later if icon reuse grows

### Implementation Notes

- **Reveal motion testing:** framer-motion with `useReducedMotion()` requires browser environment — test in jsdom carefully; may need to mock `useReducedMotion` in unit tests or skip animation assertions and test only the visibility fallback
- **ImageFrame aspect ratio:** Next.js `fill` layout requires a parent with `position: relative` — ensure the wrapper handles this correctly
- **Button a11y:** Test focus ring visibility on both light (ring-ink) and dark (ring-bg) backgrounds with axe-core
- **Wordmark spacing:** Render Affina + non-breaking space (U+00A0, or ` ` in JSX) + AI to prevent line breaks between words
- **Design token consistency:** Verify all color, font, and size values match `globals.css` exactly — never hardcode hex or pixel values

### No Breaking Changes Expected
Since this is greenfield, there are no existing components or consumers to break. All 7 primitives can be implemented independently and in parallel if desired.

---

## Analyst Confidence & Caveats

**Confidence Level:** Very high (98%)  
**Caveats:**
- The animation in Reveal depends on framer-motion hooks that require a client environment — verify `useReducedMotion()` behavior in jsdom before finalizing tests
- Arrow icon SVG source lines (1048-1062, 1338-1353 in source.html) should be extracted and reviewed for proper inline SVG rendering in JSX
- The 15% opacity sage accent in ImageFrame will require a CSS variable or Tailwind opacity modifier; verify the final syntax matches Tailwind v4 PostCSS approach in the project

---

**End of Report**
