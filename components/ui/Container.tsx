import React from "react";
import { cn } from "@/lib/cn";

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export const Container = React.forwardRef<
  HTMLDivElement,
  ContainerProps
>(({ as: Component = "div", className, ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn(
        "mx-auto w-full max-w-content px-[var(--gutter)]",
        className,
      )}
      {...props}
    />
  );
});

Container.displayName = "Container";
