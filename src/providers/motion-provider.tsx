"use client";

import { MotionConfig } from "motion/react";

interface MotionProviderProps {
  children: React.ReactNode;
}

const defaultTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={defaultTransition}
    >
      {children}
    </MotionConfig>
  );
}