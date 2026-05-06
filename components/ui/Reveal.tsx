"use client";

import React, { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface RevealProps {
  delay?: number;
  className?: string;
  children?: ReactNode;
  id?: string;
  style?: React.CSSProperties;
}

export const Reveal = React.forwardRef<
  HTMLDivElement,
  RevealProps
>(
  (
    {
      delay = 0,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();

    const variants = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <motion.div
        ref={ref}
        className={className}
        initial={shouldReduceMotion ? "visible" : "hidden"}
        whileInView={shouldReduceMotion ? "visible" : "visible"}
        variants={shouldReduceMotion ? {} : variants}
        transition={
          shouldReduceMotion
            ? {}
            : { duration: 0.9, ease: "easeOut", delay }
        }
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        {...rest}
      >
        {children}
      </motion.div>
    );
  },
);

Reveal.displayName = "Reveal";
