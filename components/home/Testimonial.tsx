import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonial() {
  return (
    <section className="bg-bg py-[var(--section-y)] text-center">
      <Container as="div">
        <Reveal>
          <p className="mx-auto mb-10 max-w-[24ch] font-display text-[clamp(1.625rem,3.5vw,2.625rem)] font-light leading-[1.25] tracking-[-0.01em] text-ink">
            <span className="italic text-rose-deep">&ldquo;</span>A real client
            quote will live here once the first engagement is underway.
            <span className="italic text-rose-deep">&rdquo;</span>
          </p>
          <p className="text-[0.8125rem] uppercase tracking-[0.15em] text-ink-mute">
            — Client name · Studio name, Portland
          </p>
          <p className="mt-12 font-display text-sm italic text-ink-mute opacity-70">
            Case study coming soon. First build in progress with a Portland
            med spa.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
