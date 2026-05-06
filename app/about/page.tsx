import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/home/CtaBand";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Affina AI: a small AI consulting practice in Portland helping boutique businesses run like they have a bigger team without losing the personal touch their clients come for.",
  alternates: { canonical: `${SITE.url}/about` },
};

const STORY_PARAGRAPHS = [
  "I started Affina AI after a few years of watching small business owners I admired try to bolt enterprise tools onto operations that were built on relationships. The software was either too complicated or too generic. It wanted to be the whole stack, when what they needed was one specific thing fixed.",
  "Affina AI is the practice I built around fixing one specific thing at a time. I work with one or two clients at a time, build the smallest system that solves the bottleneck, and stay involved long enough to make sure it actually changes how the business runs. Then I move on.",
  "I work primarily with med spas, beauty studios, and fitness studios because that is where the gap is most pronounced. The clients are sophisticated. The tools available to them are not.",
] as const;

const PRINCIPLES = [
  {
    title: "Small, specific systems.",
    body: "I look for one bottleneck and build for that. The rest of your stack stays as it is.",
  },
  {
    title: "On the tools you already trust.",
    body: "Gmail, Airtable, your booking platform. AI works best when it slots into what is already there.",
  },
  {
    title: "Two to four weeks per build.",
    body: "A real shipping date you can tell your team about. One person involved (me) so nothing gets lost in handoffs.",
  },
  {
    title: "One or two clients at a time.",
    body: "This is a small practice. Keeping the work good means keeping the load right.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <section
        aria-labelledby="about-heading"
        className="relative overflow-hidden pb-[clamp(4rem,8vw,7rem)] pt-[var(--hero-y)]"
      >
        <Container as="div">
          <div className="grid grid-cols-1 items-center gap-12 min-[900px]:grid-cols-[1.1fr_0.9fr] min-[900px]:gap-[clamp(2rem,5vw,5rem)]">
            <div>
              <Eyebrow>About</Eyebrow>
              <h1
                id="about-heading"
                className="mb-8 mt-5 font-display text-display-lg font-light text-balance"
              >
                Hi, I&apos;m{" "}
                <span className="italic text-rose-deep">Caitlyn</span>.
              </h1>
              <p className="max-w-[50ch] text-lede font-light text-ink-soft">
                I run a small AI consulting practice in Portland that helps
                boutique businesses save time and keep the personal touch their
                clients come for. Med spas, beauty studios, fitness studios, and
                the people who run them.
              </p>
            </div>

            <div>
              <ImageFrame
                kind="placeholder"
                label="Founder portrait"
                description="Caitlyn at work — natural window light, soft warm tones, a moment of focus rather than a posed studio shot"
                aspectRatio="4 / 5"
                accent="sage"
              />
            </div>
          </div>
        </Container>
      </section>

      <Section tone="deep" aria-labelledby="story-heading">
        <Container as="div">
          <Reveal>
            <div>
              <Eyebrow>The work</Eyebrow>
              <h2
                id="story-heading"
                className="mb-10 mt-5 font-display text-display-md font-light"
              >
                Why I do this work.
              </h2>
              {STORY_PARAGRAPHS.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="mb-6 max-w-[58ch] text-ink-soft last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="default" aria-labelledby="principles-heading">
        <Container as="div">
          <Reveal>
            <div className="mb-[clamp(3rem,6vw,5rem)] max-w-[50ch]">
              <Eyebrow>How I work</Eyebrow>
              <h2
                id="principles-heading"
                className="mt-5 font-display text-display-md font-light"
              >
                Small, specific, on the tools you already use.
              </h2>
            </div>
          </Reveal>

          <ul className="grid list-none grid-cols-1 gap-x-12 gap-y-10 border-t border-line pt-10 min-[800px]:grid-cols-2">
            {PRINCIPLES.map((principle) => (
              <Reveal key={principle.title}>
                <li>
                  <h3 className="mb-3 font-display text-xl font-normal text-ink">
                    {principle.title}
                  </h3>
                  <p className="max-w-[40ch] text-[0.9375rem] text-ink-soft">
                    {principle.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
