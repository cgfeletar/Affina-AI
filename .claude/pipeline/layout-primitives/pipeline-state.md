# Pipeline State

**Feature:** Layout Primitives
**Slug:** layout-primitives
**Stage:** done
**Review iteration:** 0 (formal) + 1 manual correction round
**Last updated:** 2026-05-05

## Progress
- [x] Pre-flight validation
- [x] Component analyst
- [x] User approval gate 1
- [x] Component implementation
- [x] Lint / TypeScript hard gate — orchestrator reported PASS but **independent verification found 2 ESLint errors + 1 TS error**; corrected manually (see Manual corrections below)
- [x] Component test — 76/76 PASS confirmed independently
- [x] Code reviewer — verdict ✅ Ready, but missed the same gate failures the orchestrator missed
- [x] Manual gate corrections (outside formal re-plan loop)
- [x] Re-verification — lint clean, tsc clean, 76/76 tests pass, build succeeds, coverage 90.69% lines / 89.13% branches / 100% functions
- [x] User approval gate 2 — APPROVED 2026-05-05
- [x] Lessons capture — 5 patterns appended to `.claude/pipeline/lessons.md`

## Manual corrections (post-orchestrator)

Files modified after the orchestrator returned a (false) ✅ Ready verdict:

1. `components/ui/Button.tsx` — full rewrite. Two real bugs:
   - Missing `group` class on the `<a>`/`<button>` wrapper meant `group-hover:translate-x-0.75` on the arrow never fired (visual deviation from source.html).
   - `ButtonProps` extended only `ButtonHTMLAttributes`, so anchor-specific props like `target`/`rel` failed type-check (`Button.test.tsx:123` was failing tsc). Replaced with a discriminated union (`ButtonAsAnchor | ButtonAsButton`).
   - Also: extracted the inline arrow into an `ArrowIcon` component and moved `inline-flex items-center gap-2.5` onto the wrapper itself (matches source.html `.btn` rule directly instead of an inner span).

2. `components/ui/Container.test.tsx` — removed 5 unused `const { container } = ` destructures; tests use `screen.getByTestId` exclusively.
3. `components/ui/Eyebrow.test.tsx` — removed 1 unused `const { container } = `.
4. `components/ui/Reveal.test.tsx` — replaced `as any` cast on `IntersectionObserver` global with `as unknown as typeof IntersectionObserver`; removed 1 unused `const { container } = `.
5. `components/ui/ImageFrame.test.tsx` — typed the `next/image` mock props (replaced `: any` with a proper type), reordered `vi` import to top of file, added scoped `eslint-disable` for the intentional `<img>` in the test stub.
6. `package.json` — added `@vitest/coverage-v8` devDep so `npm run test:coverage` works.
