import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

const EXPLORE_LINKS = [
  { href: "/what-i-build", label: "What I build" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
] as const;

const INDUSTRY_LINKS = [
  { href: "/industries/med-spas", label: "Med spas" },
  { href: "/industries/beauty", label: "Beauty studios" },
  { href: "/industries/fitness", label: "Boutique fitness" },
  { href: "/industries/creatives", label: "Creatives" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-soft bg-bg pb-10 pt-16">
      <Container as="div">
        <div className="mb-16 grid grid-cols-2 gap-10 min-[800px]:grid-cols-[1.5fr_1fr_1fr_1fr] min-[800px]:gap-12">
          <div className="col-span-2 min-[800px]:col-span-1">
            <Link
              href="/"
              aria-label="Affina AI home"
              className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <Wordmark as="span" className="text-[1.625rem]" />
            </Link>
            <p className="mt-5 max-w-[36ch] text-[0.9375rem] text-ink-soft">
              AI consulting for boutique businesses that care about how their
              work gets done. Based in Portland, Oregon.
            </p>
          </div>

          <FooterColumn heading="Explore" links={EXPLORE_LINKS} />
          <FooterColumn heading="Industries" links={INDUSTRY_LINKS} />

          <div>
            <h4 className="mb-5 text-xs font-medium uppercase tracking-eyebrow text-ink-mute">
              Connect
            </h4>
            <ul className="flex flex-col gap-[0.85rem]">
              <li>
                <FooterLink href="/contact">Book a call</FooterLink>
              </li>
              <li>
                <FooterLink href={`mailto:${SITE.email}`} external>
                  {SITE.email}
                </FooterLink>
              </li>
              <li>
                <FooterLink href={SITE.instagram} external>
                  Instagram
                </FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-8 border-t border-line-soft pt-8 text-[0.8125rem] text-ink-mute">
          <span>© {year} {SITE.name}. All rights reserved.</span>
          <span>{SITE.city}, {SITE.region === "OR" ? "Oregon" : SITE.region}</span>
        </div>
      </Container>
    </footer>
  );
}

type FooterColumnProps = {
  heading: string;
  links: ReadonlyArray<{ href: string; label: string }>;
};

function FooterColumn({ heading, links }: FooterColumnProps) {
  return (
    <div>
      <h4 className="mb-5 text-xs font-medium uppercase tracking-eyebrow text-ink-mute">
        {heading}
      </h4>
      <ul className="flex flex-col gap-[0.85rem]">
        {links.map(({ href, label }) => (
          <li key={href}>
            <FooterLink href={href}>{label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
};

function FooterLink({ href, children, external = false }: FooterLinkProps) {
  const className =
    "text-[0.9375rem] text-ink-soft transition-colors duration-300 hover:text-rose-deep focus-visible:outline-none focus-visible:text-rose-deep";

  if (external) {
    return (
      <a
        href={href}
        className={className}
        rel="noopener noreferrer"
        target={href.startsWith("mailto:") ? undefined : "_blank"}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
