"use client";

import {
  motion,
  type HTMLMotionProps,
  useReducedMotion,
} from "motion/react";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  distance?: number;
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  distance = 28,
  once = true,
  ...props
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      {...props}
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              y: distance,
              filter: "blur(8px)",
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}