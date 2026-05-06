import React from "react";
import { cn } from "@/lib/cn";

export interface EyebrowProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  dot?: boolean;
}

export const Eyebrow = React.forwardRef<
  HTMLSpanElement,
  EyebrowProps
>(({ dot = false, className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "text-xs uppercase tracking-eyebrow text-ink-mute",
        className,
      )}
      {...props}
    >
      {dot && (
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-rose" />
      )}
      {children}
    </span>
  );
});

Eyebrow.displayName = "Eyebrow";
