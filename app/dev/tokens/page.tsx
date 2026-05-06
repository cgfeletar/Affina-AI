import { notFound } from "next/navigation";

export const metadata = {
  title: "Tokens · dev",
  robots: { index: false, follow: false },
};

const COLORS = [
  { name: "bg", token: "bg-bg", hex: "#f4efe8" },
  { name: "bg-deep", token: "bg-bg-deep", hex: "#ebe4d9" },
  { name: "ink", token: "bg-ink", hex: "#2b2722" },
  { name: "ink-soft", token: "bg-ink-soft", hex: "#5a5249" },
  { name: "ink-mute", token: "bg-ink-mute", hex: "#8a8278" },
  { name: "rose", token: "bg-rose", hex: "#b88574" },
  { name: "rose-deep", token: "bg-rose-deep", hex: "#8e5d4e" },
  { name: "sage", token: "bg-sage", hex: "#8a9582" },
  { name: "line", token: "bg-line", hex: "#d9d0c2" },
  { name: "line-soft", token: "bg-line-soft", hex: "#e5dccd" },
];

const DISPLAY_SIZES = [
  { name: "display-xl", token: "text-display-xl" },
  { name: "display-lg", token: "text-display-lg" },
  { name: "display-md", token: "text-display-md" },
  { name: "lede", token: "text-lede" },
];

export default function TokensPreview() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="mx-auto max-w-content px-[var(--gutter)] py-[var(--section-y)] space-y-20">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-eyebrow text-ink-mute">
          Internal · design tokens
        </p>
        <h1 className="text-display-lg">
          Affina <span className="font-wordmark italic text-rose">AI</span>{" "}
          tokens
        </h1>
        <p className="max-w-prose">
          Eyeball-match this page against{" "}
          <code className="font-mono text-sm">source.html</code>. Every value
          here lives in <code className="font-mono text-sm">app/globals.css</code>.
          Page 404s in production.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-display-md">Colors</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {COLORS.map((c) => (
            <div key={c.name} className="space-y-2">
              <div
                className={`${c.token} aspect-square rounded-sm border border-line`}
              />
              <div className="space-y-0.5 text-sm">
                <p className="font-medium text-ink">{c.name}</p>
                <p className="font-mono text-xs text-ink-mute">{c.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-display-md">Typography</h2>
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-eyebrow text-ink-mute">
              Display — Fraunces
            </p>
            <p className="font-display text-3xl">
              The quick brown fox{" "}
              <span className="italic text-rose-deep">jumps</span> over the lazy
              dog
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-eyebrow text-ink-mute">
              Body — Inter
            </p>
            <p className="font-body text-base">
              The quick brown fox jumps over the lazy dog. 0123456789.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-eyebrow text-ink-mute">
              Wordmark — Bodoni Moda
            </p>
            <p className="font-wordmark text-3xl">
              Affina <span className="italic text-rose">AI</span>
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-display-md">Display sizes</h2>
        <div className="space-y-8">
          {DISPLAY_SIZES.map((s) => (
            <div key={s.name} className="space-y-2">
              <p className="text-xs uppercase tracking-eyebrow text-ink-mute">
                {s.name} — <span className="font-mono">{s.token}</span>
              </p>
              <p className={`${s.token} font-display`}>
                Run like you have a{" "}
                <span className="italic text-rose-deep">bigger team</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-display-md">Eyebrow + lede</h2>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-eyebrow text-ink-mute">
            Who this is for
          </p>
          <p className="text-lede max-w-[50ch]">
            Most AI tools are built for tech companies. Affina AI is built for
            the kind of business where the owner remembers your name.
          </p>
        </div>
      </section>
    </main>
  );
}
