"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface GearErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function GearError({
  error,
  reset,
}: GearErrorProps) {
  useEffect(() => {
    console.error(
      "Gear page error:",
      error,
    );
  }, [error]);

  return (
    <div className="container-shell py-24">
      <div className="mx-auto max-w-xl rounded-[2rem] border bg-card p-8 text-center shadow-premium">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle className="size-8" />
        </span>

        <h1 className="mt-6 font-display text-3xl font-semibold">
          Unable to load gear
        </h1>

        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          The marketplace could not connect
          to the GearUp backend. Please try
          again.
        </p>

        <Button
          type="button"
          className="mt-7 rounded-full"
          onClick={reset}
        >
          Try again
        </Button>
      </div>
    </div>
  );
}