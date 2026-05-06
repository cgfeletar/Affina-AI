import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const VERTICALS = [
  {
    number: "i.",
    title: "Med spas",
    description:
      "Aesthetics practices and injectable studios where consults, follow-ups, and personalization are the product.",
  },
  {
    number: "ii.",
    title: "Beauty studios",
    description:
      "Blowdry bars, nail and lash studios, salons. Anywhere the client experience lives in the small details.",
  },
  {
    number: "iii.",
    title: "Boutique fitness",
    description:
      "Pilates, barre, yoga. Premium studios where membership is a relationship, not a transaction.",
  },
  {
    number: "iv.",
    title: "Adjacent crafts",
    description:
      "Stylists, florists, interior designers. Solo practitioners and small teams running on taste and trust.",
  },
] as const;

export function WhoSection() {
  return (
    <Section tone="deep" id="who" aria-labelledby="who-heading">
      <Container as="div">
        <Reveal>
          <div className="mb-[clamp(3rem,6vw,5rem)] grid grid-cols-1 items-end gap-6 min-[800px]:grid-cols-2 min-[800px]:gap-[clamp(2rem,5vw,5rem)]">
            <div>
              <Eyebrow>Who this is for</Eyebrow>
              <h2
                id="who-heading"
                className="mt-5 font-display text-display-lg font-light"
              >
                Built for owner-operators who care about{" "}
                <span className="italic text-rose-deep">how</span> the work gets
                done.
              </h2>
            </div>
            <p className="text-lede font-light text-ink-soft">
              Most AI tools are built for tech companies. Affina AI is built for
              the kind of business where the owner remembers your name, your
              last appointment, and what you&apos;re going through. The kind of
              business where polish matters.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] border-t border-line list-none">
            {VERTICALS.map((vertical, idx) => {
              const isLast = idx === VERTICALS.length - 1;
              return (
                <li
                  key={vertical.title}
                  className={cn(
                    "border-b border-line py-9 pr-0",
                    "min-[800px]:pr-7",
                    !isLast && "min-[800px]:border-r min-[800px]:border-line",
                  )}
                >
                  <span className="mb-4 block font-display text-sm italic text-rose">
                    {vertical.number}
                  </span>
                  <h3 className="mb-3 text-2xl font-normal text-ink">
                    {vertical.title}
                  </h3>
                  <p className="text-[0.9375rem] text-ink-soft">
                    {vertical.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
