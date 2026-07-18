"use client";

import {
  motion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";

import { cn } from "@/lib/utils/cn";

interface RevealProps
  extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  blur?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.65,
  distance = 24,
  blur = 8,
  ...props
}: RevealProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: distance,
      filter: `blur(${blur}px)`,
    },

    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  };

  return (
    <motion.div
      {...props}
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}