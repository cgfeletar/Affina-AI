import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageFrame } from "@/components/ui/ImageFrame";

const fadeUpStyle = (
  delay: string,
  duration = "0.9s",
): React.CSSProperties => ({
  opacity: 0,
  animation: `fadeUp ${duration} ease ${delay} forwards`,
});

const fadeInStyle = (
  delay: string,
  duration = "1.2s",
): React.CSSProperties => ({
  opacity: 0,
  animation: `fadeIn ${duration} ease ${delay} forwards`,
});

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-[clamp(4rem,8vw,7rem)] pt-[var(--hero-y)]"
    >
      <Container as="div">
        <div className="grid grid-cols-1 items-center gap-12 min-[900px]:grid-cols-[1.15fr_0.85fr] min-[900px]:gap-[clamp(2rem,5vw,5rem)]">
          <div>
            <div
              className="mb-8 flex items-center gap-3"
              style={fadeUpStyle("0.1s", "0.8s")}
            >
              <Eyebrow dot>AI consulting · Portland, Oregon</Eyebrow>
            </div>

            <h1
              id="hero-heading"
              className="mb-8 font-display text-display-lg font-light text-balance"
              style={fadeUpStyle("0.25s")}
            >
              Run like you have a{" "}
              <span className="italic text-rose-deep">bigger team</span>,
              without losing the personal touch.
            </h1>

            <p
              className="mb-10 max-w-[50ch] text-lede font-light text-ink-soft"
              style={fadeUpStyle("0.45s")}
            >
              Affina AI helps boutique businesses give their clients more
              personalized attention and their owners more time. You wear a lot
              of hats, we&apos;ll take some.
            </p>

            <div
              className="flex flex-wrap items-center gap-5"
              style={fadeUpStyle("0.6s")}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 font-body font-medium text-bg transition-all duration-200 hover:translate-y-[-1px] hover:bg-rose-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                Book a free consult
                <ArrowIcon />
              </Link>
              <Link
                href="/what-i-build"
                className="border-b border-ink px-0 py-4 font-body font-medium text-ink transition-colors duration-200 hover:border-rose-deep hover:text-rose-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                See what I build
              </Link>
            </div>
          </div>

          <div className="relative" style={fadeInStyle("0.5s")}>
            <ImageFrame
              kind="placeholder"
              label="Hero portrait"
              description="Founder portrait — natural window light, soft warm tones, working at a small marble surface or against a linen background"
              aspectRatio="4 / 5"
              accent="sage"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.75"
      width="14"
      height="14"
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
