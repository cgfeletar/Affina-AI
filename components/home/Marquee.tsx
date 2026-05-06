import { Fragment } from "react";

const VERTICALS = [
  "Med spas",
  "Blowdry bars",
  "Pilates studios",
  "Nail studios",
  "Lash artists",
  "Stylists",
  "Florists",
  "Interior designers",
  "Barre studios",
  "Yoga studios",
] as const;

export function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-line-soft py-8"
    >
      <div
        className="flex w-max items-center gap-14 whitespace-nowrap font-display text-[clamp(1.25rem,2vw,1.625rem)] font-light italic text-ink-soft"
        style={{ animation: "marqueeScroll 45s linear infinite" }}
      >
        {[...VERTICALS, ...VERTICALS].map((vertical, idx) => (
          <Fragment key={`${vertical}-${idx}`}>
            <span>{vertical}</span>
            <span className="text-[0.9rem] font-normal not-italic text-rose">
              ✻
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
