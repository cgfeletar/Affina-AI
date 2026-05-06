import React from "react";
import { cn } from "@/lib/cn";

type WordmarkElement = "a" | "span";

export interface WordmarkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: WordmarkElement;
}

export const Wordmark = React.forwardRef<
  HTMLAnchorElement,
  WordmarkProps
>(
  (
    { as: Component = "a", href = "/", className, children, ...props },
    ref,
  ) => {
    const defaultClassName = "font-wordmark text-2xl font-medium";

    if (Component === "a") {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cn(defaultClassName, className)}
          {...props}
        >
          <span>Affina</span>
          <span> </span>
          <span className="italic text-rose">AI</span>
          {children}
        </a>
      );
    }

    return (
      <span
        className={cn(defaultClassName, className)}
        {...(props as React.HTMLAttributes<HTMLSpanElement>)}
      >
        <span>Affina</span>
        <span> </span>
        <span className="italic text-rose">AI</span>
        {children}
      </span>
    );
  },
);

Wordmark.displayName = "Wordmark";
