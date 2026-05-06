import React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type ImageFramePlaceholderProps = {
  kind: "placeholder";
  label: string;
  description: string;
  aspectRatio?: string;
  accent?: "sage";
  className?: string;
};

type ImageFrameImageProps = {
  kind: "image";
  src: string;
  alt: string;
  priority?: boolean;
  aspectRatio?: string;
  accent?: "sage";
  className?: string;
};

export type ImageFrameProps =
  | ImageFramePlaceholderProps
  | ImageFrameImageProps;

export const ImageFrame = React.forwardRef<
  HTMLDivElement,
  ImageFrameProps
>(
  (
    {
      kind,
      aspectRatio = "4 / 5",
      accent,
      className,
      ...props
    },
    ref,
  ) => {
    const baseClass = cn(
      "relative flex items-center justify-center overflow-hidden border border-line bg-bg-deep",
      className,
    );

    const accentClass = accent === "sage"
      ? "absolute right-[-20px] top-[-20px] z-0 h-[40%] w-[60%] bg-sage opacity-15"
      : null;

    return (
      <div
        ref={ref}
        className={baseClass}
        style={{ aspectRatio }}
      >
        {accentClass && <div className={accentClass} />}

        <div className="relative z-10 flex h-full w-full items-center justify-center">
          {kind === "placeholder" && "label" in props && "description" in props ? (
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-xs uppercase tracking-eyebrow text-ink-mute">
                {props.label}
              </span>
              <span className="font-display italic text-ink-soft">
                {props.description}
              </span>
            </div>
          ) : kind === "image" && "src" in props && "alt" in props ? (
            <Image
              src={props.src}
              alt={props.alt}
              fill
              priority={props.priority ?? false}
              className="object-cover"
            />
          ) : null}
        </div>
      </div>
    );
  },
);

ImageFrame.displayName = "ImageFrame";
