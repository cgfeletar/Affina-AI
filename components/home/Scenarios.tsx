import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const SCENARIOS = [
  {
    num: "01",
    heading: "You're losing leads in your DMs.",
    body: "Inquiries land in Instagram, in email, in form submissions you meant to follow up on. By the time you get back, they've already booked somewhere else, or worse, ghosted into the void.",
    tag: "Lead capture",
  },
  {
    num: "02",
    heading: "You know your clients, but your tools don't.",
    body: "You remember birthdays, anniversaries, the treatment they had three months ago. But that knowledge lives in your head, not in any system that can act on it without you having to remember to log in.",
    tag: "Client memory",
  },
  {
    num: "03",
    heading: "The marketing-on-top-of-everything-else thing isn't working.",
    body: "You're posting when you can. Writing newsletters at 11 PM. The content is good when you have time, and you don't have time. The result reads like an afterthought, even though your work isn't.",
    tag: "Marketing & content",
  },
] as const;

export function Scenarios() {
  return (
    <Section tone="default" id="scenarios" aria-labelledby="scenarios-heading">
      <Container as="div">
        <Reveal>
          <div className="mb-[clamp(3rem,6vw,5rem)] grid grid-cols-1 items-end gap-6 min-[800px]:grid-cols-2 min-[800px]:gap-[clamp(2rem,5vw,5rem)]">
            <div>
              <Eyebrow>Is this you?</Eyebrow>
              <h2
                id="scenarios-heading"
                className="mt-5 font-display text-display-lg font-light"
              >
                Three kinds of stuck I see{" "}
                <span className="italic text-rose-deep">over</span> and over.
              </h2>
            </div>
          </div>
        </Reveal>

        <ol className="border-t border-line list-none">
          {SCENARIOS.map((scenario) => (
            <Reveal key={scenario.num}>
              <li className="grid grid-cols-1 items-start gap-4 border-b border-line py-10 transition-colors duration-300 hover:bg-bg-deep min-[700px]:grid-cols-[80px_1fr_auto] min-[700px]:gap-[clamp(1.5rem,4vw,3.5rem)] min-[700px]:py-[clamp(2.5rem,5vw,4rem)]">
                <span className="font-display text-base italic text-ink-mute min-[700px]:pt-2">
                  {scenario.num}
                </span>
                <div>
                  <h3 className="mb-4 max-w-[22ch] font-display text-[clamp(1.5rem,2.5vw,2rem)] font-light text-ink">
                    {scenario.heading}
                  </h3>
                  <p className="max-w-[50ch] text-base text-ink-soft">
                    {scenario.body}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.15em] text-ink-mute min-[700px]:pt-3.5">
                  — {scenario.tag}
                </span>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
