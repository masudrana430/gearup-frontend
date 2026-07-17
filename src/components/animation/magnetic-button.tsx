"use client";

import type { PointerEvent, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils/cn";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 12,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 300,
    damping: 20,
  });

  const springY = useSpring(y, {
    stiffness: 300,
    damping: 20,
  });

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (prefersReducedMotion) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const relativeX =
      event.clientX - rect.left - rect.width / 2;

    const relativeY =
      event.clientY - rect.top - rect.height / 2;

    x.set((relativeX / rect.width) * strength);
    y.set((relativeY / rect.height) * strength);
  }

  function resetPosition() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={cn("inline-flex", className)}
      style={{
        x: springX,
        y: springY,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
    >
      {children}
    </motion.div>
  );
}