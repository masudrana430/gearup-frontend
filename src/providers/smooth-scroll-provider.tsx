"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

const dashboardPattern = /^\/(admin|customer|provider)(\/|$)/;

export function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const shouldUseNativeScroll =
    Boolean(prefersReducedMotion) || dashboardPattern.test(pathname);

  if (shouldUseNativeScroll) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.3,
      }}
    >
      {children}
    </ReactLenis>
  );
}