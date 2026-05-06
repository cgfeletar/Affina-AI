"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/what-i-build", label: "What I build" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
] as const;

const SHADOW_DEFAULT =
  "0 1px 0 var(--color-line-soft), 0 4px 20px rgba(43, 39, 34, 0.04)";
const SHADOW_SCROLLED =
  "0 1px 0 var(--color-line-soft), 0 6px 24px rgba(43, 39, 34, 0.07)";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 bg-bg px-[var(--gutter)] py-6 transition-shadow duration-300"
      style={{ boxShadow: scrolled ? SHADOW_SCROLLED : SHADOW_DEFAULT }}
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-8">
        <Link
          href="/"
          aria-label="Affina AI home"
          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <Wordmark as="span" className="text-[1.625rem]" />
        </Link>

        <ul className="hidden items-center gap-[clamp(1.25rem,2.5vw,2.5rem)] min-[820px]:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="group relative py-1 text-sm text-ink-soft transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:text-ink"
              >
                {label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px w-0 bg-rose transition-[width] duration-300 group-hover:w-full group-focus-visible:w-full"
                />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-[0.8125rem] text-bg transition-all duration-300 hover:-translate-y-px hover:bg-rose-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink"
            >
              Book a free consult
            </Link>
          </li>
        </ul>

        <button
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsOpen((v) => !v)}
          className="relative z-[60] flex flex-col items-center justify-center p-2 min-[820px]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink rounded-sm"
        >
          <span
            className={cn(
              "block h-px w-[22px] bg-ink transition-transform duration-300",
              isOpen && "translate-y-[6px] rotate-45",
            )}
          />
          <span
            className={cn(
              "mt-[5px] block h-px w-[22px] bg-ink transition-opacity duration-300",
              isOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "mt-[5px] block h-px w-[22px] bg-ink transition-transform duration-300",
              isOpen && "-translate-y-[6px] -rotate-45",
            )}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-4/5 max-w-[360px] border-l border-line bg-bg px-10 py-12 transition-transform duration-400 ease-out min-[820px]:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <ul className="flex h-full flex-col items-start justify-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={closeMenu}
                tabIndex={isOpen ? 0 : -1}
                className="font-display text-2xl font-light text-ink-soft transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:text-ink"
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <Link
              href="/contact"
              onClick={closeMenu}
              tabIndex={isOpen ? 0 : -1}
              className="inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-[0.8125rem] text-bg transition-all duration-300 hover:-translate-y-px hover:bg-rose-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink"
            >
              Book a free consult
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
