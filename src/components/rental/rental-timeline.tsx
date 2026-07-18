import {
  Check,
  Clock3,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";
import type { RentalStatus } from "@/types/rental";

interface RentalTimelineProps {
  status: RentalStatus;
}

const normalSteps = [
  "PENDING",
  "CONFIRMED",
  "ACTIVE",
  "COMPLETED",
] as const;

export function RentalTimeline({
  status,
}: RentalTimelineProps) {
  if (
    status === "CANCELLED" ||
    status === "REJECTED"
  ) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/8 p-5">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
            <X className="size-5" />
          </span>

          <div>
            <p className="font-semibold capitalize">
              Rental{" "}
              {status.toLowerCase()}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              This rental will not continue
              through the normal process.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentIndex =
    normalSteps.indexOf(
      status as
        | "PENDING"
        | "CONFIRMED"
        | "ACTIVE"
        | "COMPLETED",
    );

  return (
    <ol className="grid gap-4 sm:grid-cols-4">
      {normalSteps.map(
        (step, index) => {
          const completed =
            index < currentIndex;

          const current =
            index === currentIndex;

          return (
            <li
              key={step}
              className="relative"
            >
              <div
                className={cn(
                  "rounded-2xl border p-4",
                  completed &&
                    "border-primary/25 bg-primary/8",
                  current &&
                    "border-primary bg-primary/12",
                )}
              >
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full border",
                    completed &&
                      "border-primary bg-primary text-primary-foreground",
                    current &&
                      "border-primary text-primary",
                  )}
                >
                  {completed ? (
                    <Check className="size-4" />
                  ) : (
                    <Clock3 className="size-4" />
                  )}
                </span>

                <p className="mt-4 text-sm font-semibold capitalize">
                  {step.toLowerCase()}
                </p>
              </div>
            </li>
          );
        },
      )}
    </ol>
  );
}