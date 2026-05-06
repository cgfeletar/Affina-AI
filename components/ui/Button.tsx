import * as React from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "text";

type SharedButtonProps = {
  variant?: ButtonVariant;
};

type ButtonAsAnchor = SharedButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedButtonProps> & {
    href: string;
  };

type ButtonAsButton = SharedButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedButtonProps> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsAnchor | ButtonAsButton;

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "group inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 font-body font-medium text-bg transition-all duration-200 hover:translate-y-[-1px] hover:bg-rose-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
  text:
    "inline-flex items-center border-b border-ink px-0 py-4 font-body font-medium text-ink transition-colors duration-200 hover:border-rose-deep hover:text-rose-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
};

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

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  { variant = "primary", className, children, ...rest },
  ref,
) {
  const computedClassName = cn(VARIANT_STYLES[variant], className);
  const showArrow = variant === "primary";

  if ("href" in rest && typeof rest.href === "string") {
    const anchorRest = rest as Omit<ButtonAsAnchor, "variant">;
    return (
      <a
        {...anchorRest}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={computedClassName}
      >
        {children}
        {showArrow && <ArrowIcon />}
      </a>
    );
  }

  const buttonRest = rest as Omit<ButtonAsButton, "variant">;
  return (
    <button
      {...buttonRest}
      type={buttonRest.type ?? "submit"}
      ref={ref as React.Ref<HTMLButtonElement>}
      className={computedClassName}
    >
      {children}
      {showArrow && <ArrowIcon />}
    </button>
  );
});

Button.displayName = "Button";
