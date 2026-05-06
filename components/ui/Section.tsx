import React, { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SectionTone = "default" | "deep" | "ink";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
}

const TONE_STYLES: Record<SectionTone, string> = {
  default: "bg-bg text-ink",
  deep: "bg-bg-deep text-ink",
  ink: "bg-ink text-bg",
};

export const Section = React.forwardRef<
  HTMLElement,
  SectionProps
>(({ tone = "default", className, ...props }, ref) => {
  return (
    <section
      ref={ref as React.Ref<HTMLElement>}
      className={cn(
        "w-full py-[var(--section-y)]",
        TONE_STYLES[tone],
        className,
      )}
      {...props}
    />
  );
});

Section.displayName = "Section";
