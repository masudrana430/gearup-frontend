import Link from "next/link";
import { Mountain } from "lucide-react";

import { cn } from "@/lib/utils/cn";

interface LogoProps {
  className?: string;
  compact?: boolean;
}

export function Logo({
  className,
  compact = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="GearUp homepage"
      className={cn(
        "inline-flex items-center gap-2.5",
        className,
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
        <Mountain className="size-5" />
      </span>

      {!compact ? (
        <span className="font-display text-xl font-semibold tracking-[-0.04em]">
          GearUp
        </span>
      ) : null}
    </Link>
  );
}