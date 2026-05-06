# Feature Spec: Layout Primitives

**Slug:** `layout-primitives`  
**Status:** Pre-flight confirmed  
**Date:** 2026-05-05

---

## Target Module

- **Location:** `components/ui/` at project root (does not exist yet — this run creates it)
- **Import path:** `@/components/ui/*`
- **Scope:** Page-agnostic primitives consumed across every route in the app
- **Export strategy:** All components exported from `components/ui/index.ts` for convenience

---

## Component List (7 primitives, all WRITE NEW)

### 1. Container
- **Purpose:** Max-width wrapper with horizontal gutter
- **Type:** Server component
- **Polymorphic:** `as?: React.ElementType` (default `'div'`), renders any element
- **Key styling:** `max-w-content` + `px-[var(--gutter)]`
- **Props:**
  - `as?: React.ElementType` (default `'div'`)
  - `className?: string` (merged via `cn()`)
  - Standard HTML props passthrough

### 2. Section
- **Purpose:** Vertical rhythm wrapper
- **Type:** Server component
- **Renders:** `<section>` element
- **Tone variants:** `tone?: 'default' | 'deep' | 'ink'`
  - `'default'` → `bg-bg`
  - `'deep'` → `bg-bg-deep`
  - `'ink'` → `bg-ink` with light text
- **Key styling:** `py-[var(--section-y)]`
- **Composition strategy:** Consumer composes `<Section><Container>...</Container></Section>`
- **Props:**
  - `tone?: 'default' | 'deep' | 'ink'`
  - `className?: string` (merged)
  - `children: ReactNode`

### 3. Button
- **Purpose:** Primary and text-variant call-to-action button
- **Type:** Server component (no `onClick`)
- **Variants:** `variant: 'primary' | 'text'`

**Variant: primary**
- Styling: `bg-ink text-bg` pill shape (`rounded-full`)
- Hover: `bg-rose-deep` + subtle 1px translate-y (matches source.html)
- Touch target: ≥ 44×44px (source uses `padding: 1rem 1.75rem`)
- Optional trailing arrow icon (SVG from source.html lines 1048-1062, 1338-1353)
- Arrow hover: translates 3px right

**Variant: text**
- Styling: `text-ink` + 1px underline (`border-b border-ink`)
- Padding: `1rem 0`
- Hover: `text-rose-deep` + underline color rose-deep

**Polymorphic:**
- If `href` provided: renders `<a>`
- Otherwise: renders `<button>` (default `type="submit"` unless overridden)

**Accessibility:**
- Visible focus ring: `ring-ink` on light backgrounds, `ring-bg` on dark
- Tested with axe-core

**Props:**
- `variant?: 'primary' | 'text'` (default `'primary'`)
- `href?: string` (if provided, renders `<a>`)
- `className?: string` (merged)
- `children: ReactNode`
- Standard HTML button/anchor props passthrough

### 4. Eyebrow
- **Purpose:** Uppercase label tag
- **Type:** Server component
- **Renders:** `<span>`
- **Key styling:** `text-xs uppercase tracking-eyebrow text-ink-mute`
- **Decoration:** Optional `dot?: boolean` renders a 6×6 rose dot before text (matches source.html hero eyebrow, lines 1029-1032)
- **Props:**
  - `dot?: boolean` (default false)
  - `className?: string` (merged)
  - `children: ReactNode`

### 5. Wordmark
- **Purpose:** "Affina _AI_" branded wordmark
- **Type:** Server component
- **Renders:** "Affina" (regular) + " " (nbsp) + "AI" (italic, rose-colored)
- **Font:** Bodoni Moda 500 (`font-wordmark`)
- **Default size:** Reasonable for nav use (e.g., `text-2xl`)
- **Color:** "AI" portion is `text-rose`
- **Polymorphic:** `as?: 'a' | 'span'` (default `'a'`)
  - When `'a'`: defaults `href="/"`, applies link semantics
- **Accessible:** Rendered as single text node for screen readers
- **Props:**
  - `as?: 'a' | 'span'` (default `'a'`)
  - `href?: string` (when `as='a'`, default `'/'`)
  - `className?: string` (merged; sets font size, etc.)
  - Standard HTML props passthrough

### 6. Reveal
- **Purpose:** Fade-up animation on viewport entry
- **Type:** Client component (`'use client'`)
- **Library:** framer-motion `<motion.div>` (or polymorphic via `as?`)
- **Animation spec (matches source.html):**
  - From: `{ opacity: 0, y: 30 }`
  - To: `{ opacity: 1, y: 0 }`
  - Transition: `{ duration: 0.9, ease: 'easeOut' }`
  - Viewport: `{ once: true, margin: '0px 0px -60px 0px' }` (matches IntersectionObserver rootMargin)
  - Respects `prefers-reduced-motion` (framer-motion handles natively via `useReducedMotion()`)
  - **Fallback:** When motion is reduced, children must be visible (opacity 1, no offset)
- **Stagger:** Optional `delay?: number` (seconds) for staggered animations across multiple Reveal instances
- **Polymorphic:** `as?: 'div' | 'section' | ...` (default `'div'`)
- **Props:**
  - `as?: keyof JSX.IntrinsicElements` (default `'div'`)
  - `delay?: number` (seconds; default 0)
  - `className?: string` (merged)
  - `children: ReactNode`

### 7. ImageFrame
- **Purpose:** Bordered, centered image container with optional placeholder or real image
- **Type:** Server component
- **Base styling:** `bg-bg-deep` + `border border-line` + overflow-hidden + flex center
- **Discriminated union:**

**Mode: placeholder** (`kind: 'placeholder'`)
- Renders source.html label structure (lines 1067-1078)
- Label: small uppercase (`text-xs uppercase tracking-eyebrow text-ink-mute`)
- Description: italic Fraunces (`font-display italic text-ink-soft`)
- Props: `label: string`, `description: string`
- Decorative (no alt text)

**Mode: image** (`kind: 'image'`)
- Renders `next/image` with `fill` layout
- Props: `src: string`, `alt: string` (required), `priority?: boolean` (default false)

**Common props:**
- `aspectRatio?: string` (CSS aspect-ratio; default `'4 / 5'` matching source.html)
- `accent?: 'sage'` (renders decorative sage slab behind frame, matches source.html `.hero-image::before`)
  - Placement: top -20px, right -20px, width 60%, height 40%
  - Styling: `bg-sage` at 15% opacity, behind frame (z-index)

**Props structure:**
- Discriminated union via `kind: 'placeholder' | 'image'`
- `className?: string` (merged)

---

## Data Fetching

None. All primitives are presentational. No async data, no API, no React state outside framer-motion's internal state inside `Reveal`.

---

## Design Constraints

**Stack:**
- Next.js 16.2.4 App Router
- React 19.2.4
- TypeScript strict mode
- Tailwind v4 (PostCSS-based, no `tailwind.config.ts`)

**Design tokens** (defined in `app/globals.css`):
- **Colors:** `bg-bg`, `bg-bg-deep`, `bg-ink`, `text-ink-soft`, `text-ink-mute`, `bg-rose`, `bg-rose-deep`, `bg-sage`, `border-line`, `border-line-soft` (and corresponding `text-*`, `border-*`, `ring-*` variants)
- **Fonts:** `font-display` (Fraunces), `font-body` (Inter — default), `font-wordmark` (Bodoni Moda)
- **Size scales:** `text-display-xl`, `text-display-lg`, `text-display-md`, `text-lede`
- **Tracking:** `tracking-eyebrow` (0.18em)
- **Container:** `max-w-content` (1280px)
- **CSS vars (arbitrary syntax):** `--gutter`, `--section-y`, `--hero-y`

**Rules:**
- **NO arbitrary classes** (`bg-[#xxx]`, `text-[14px]`, etc.). If missing, add to `app/globals.css` `@theme` block first.
- **`cn()` utility:** Imported from `@/lib/cn` (clsx + tailwind-merge) for all class merging
- **Path alias:** `@/*` → project root
- **Server components by default.** Only `Reveal` is `'use client'`. `Button` stays server-compatible (no `onClick`).
- **Visual reference:** `source.html` at project root is the source of truth for aesthetics, spacing, color, motion.

---

## Existing Files for Convention Discovery

**To read before implementation:**
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/dev/tokens/page.tsx`
- `lib/cn.ts`, `lib/fonts.ts`, `lib/site.ts`
- `tsconfig.json`, `eslint.config.mjs`, `package.json`, `vitest.config.ts`, `vitest.setup.ts`
- `source.html` (motion + visual reference)
- `CLAUDE.md` (voice rules, design tokens, server-component-default rule)

---

## Test Runner Configuration

**Already configured:**
- `vitest` + `@vitejs/plugin-react` + `jsdom` + `@testing-library/react` + `@testing-library/jest-dom` + `@testing-library/user-event` + `vitest-axe`
- `vitest.config.ts` at root, `vitest.setup.ts` for jest-dom matchers
- Coverage thresholds: 80% lines/branches/functions/statements
- Test convention: co-located `*.test.ts(x)` files (example: `lib/cn.test.ts`)
- Run tests: `npm run test:run` (non-watch), `npm run test:coverage` (with coverage)
