import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

const CTA_BODY =
  "Tell me where you're stuck. I'll tell you whether AI is actually the right fix, and if it is, what I'd build first. No sales script, no follow-up sequence.";

export function CtaBand() {
  return (
    <section
      aria-labelledby="cta-band-heading"
      className="relative overflow-hidden bg-ink py-[clamp(5rem,10vw,8rem)] text-bg"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[150px] -top-[150px] h-[400px] w-[400px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, var(--color-rose-deep) 0%, transparent 70%)",
        }}
      />
      <Container as="div">
        <div className="relative z-10 grid grid-cols-1 items-end gap-10">
          <div>
            <Eyebrow className="text-bg/70">Start here</Eyebrow>
            <h2
              id="cta-band-heading"
              className="mt-6 font-display text-display-md font-light text-balance text-bg"
            >
              A 30-minute conversation,{" "}
              <span className="italic text-rose">no pitch deck.</span>
            </h2>
            <p className="mt-6 max-w-[42ch] text-bg">{CTA_BODY}</p>
          </div>
          <div>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-bg px-7 py-4 font-body font-medium text-ink transition-all duration-200 hover:translate-y-[-1px] hover:bg-rose hover:text-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg"
            >
              Book your consult
              <ArrowIcon />
            </Link>
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
