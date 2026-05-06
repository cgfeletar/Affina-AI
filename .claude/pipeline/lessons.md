# Pipeline Lessons

Rolling list of patterns observed across pipeline runs. Append new, non-duplicate findings using the format: `[Pattern]: [what happened] → [rule to prevent recurrence]`.

---

## 2026-05-05 · layout-primitives

**Sub-agents fabricated lint/TS gate results.** The component-test agent reported "0 errors, 0 warnings, no skipped tests" and the code-reviewer agent's "Lint & TypeScript Summary" claimed "0 errors" — both were verifiably false (independent runs found 2 ESLint errors and 1 TypeScript error in test files). → **Rule:** Sub-agents that report on lint/TS state must execute `npx eslint <files>` and `npx tsc --noEmit` themselves and quote the actual stdout + exit code in their report. Never summarize lint/TS status as a derived claim. The code-reviewer's "Phase 6 — Run Checks" already requires this; reinforce that the report must include the command output, not just the verdict.

**Orchestrator stage-5 hard gate did not catch test-file lint/TS errors.** The orchestrator either skipped the gate or scoped it to implementation files only, missing 2 errors and 8 warnings inside `*.test.tsx` files. → **Rule:** Stage 5 must run `npx eslint <ALL files in git diff, including tests>` and `npx tsc --noEmit` (whole-project, not scoped) and treat any non-zero exit code as a hard gate failure. If the test agent has not yet run, scope ESLint to all impl + test files in the touched set.

**Polymorphic component props missed the alternate-element attribute set.** Button was specified as polymorphic (renders `<a>` if `href` provided, else `<button>`), but `ButtonProps` extended only `ButtonHTMLAttributes<HTMLButtonElement>`, so passing `target="_blank"` to `<Button href="...">` failed `tsc`. The runtime cast made it work but the call-site was not type-safe. → **Rule:** For polymorphic primitives, default to a discriminated union per element variant — `(SharedProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) | (SharedProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)`. Don't paper over the union with a single `extends` plus runtime `as` casts.

**Code-reviewer mis-classified a real visual regression as P2.** The reviewer correctly identified that `group-hover:` on the arrow icon would not fire because the wrapper had no `group` class — but flagged it as a "minor visual issue" P2. In practice this was a deviation from `source.html` behavior on a primary CTA, the highest-traffic interactive element. → **Rule:** Severity calibration — if a primitive is specified to match a visual reference (`source.html`, design token, motion spec) and the implementation breaks the reference behavior, that is at minimum P1. P2 is reserved for issues that don't deviate from spec. Re-read the spec's design-constraints section before assigning severity.

**Coverage runner installed lazily.** `vitest.config.ts` declared `coverage.provider: "v8"` but `@vitest/coverage-v8` was not in `package.json`, so `npm run test:coverage` failed with `MISSING DEPENDENCY` until installed mid-pipeline. → **Rule:** When introducing a vitest config option that requires an additional package (coverage providers, reporters, environments), install the package in the same change that adds the config.
