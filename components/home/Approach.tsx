import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Reveal } from "@/components/ui/Reveal";

const APPROACH_COPY = {
  ledeBody:
    "I don't sell software. I build small, specific systems on the tools you already trust, like Gmail, Airtable, and your booking platform, that quietly do the things you don't have time for.",
  bodyParagraph:
    'Every build is shaped around your actual bottleneck. We start with a free conversation about where your time goes, what your clients notice, and what\'s been on your "I should really fix this" list for too long. From there, I propose a build, usually one or two to start, and ship it in two to four weeks.',
};

export function Approach() {
  return (
    <Section tone="deep" aria-labelledby="approach-heading">
      <Container as="div">
        <div className="grid grid-cols-1 items-center gap-12 min-[900px]:grid-cols-[0.9fr_1.1fr] min-[900px]:gap-[clamp(2rem,6vw,6rem)]">
          <Reveal>
            <ImageFrame
              kind="placeholder"
              label="Lifestyle shot"
              description="Working environment — laptop on a wooden desk, notebook, coffee cup, soft natural light, slight blur on foreground"
              aspectRatio="4 / 5"
            />
          </Reveal>

          <Reveal>
            <div>
              <Eyebrow>The approach</Eyebrow>
              <h2
                id="approach-heading"
                className="mb-7 mt-6 font-display text-display-md font-light"
              >
                AI that{" "}
                <span className="italic text-rose-deep">disappears</span> into
                the way you already work.
              </h2>
              <p className="mb-7 max-w-[48ch] text-lede font-light text-ink-soft">
                {APPROACH_COPY.ledeBody}
              </p>
              <p className="mb-6 max-w-[52ch] text-base text-ink-soft">
                {APPROACH_COPY.bodyParagraph}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border-b border-line pb-1 text-[0.9375rem] text-ink transition-colors duration-300 hover:border-rose-deep hover:text-rose-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                More about the approach
                <ArrowIcon />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M1 7H13M13 7L7 1M13 7L7 13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
