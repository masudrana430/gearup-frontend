import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import type { GearAvailability } from "@/types/gear";

interface AvailabilityBadgeProps {
  status: GearAvailability;
}

const styles: Record<
  GearAvailability,
  string
> = {
  AVAILABLE:
    "border-primary/20 bg-primary/12 text-primary",

  UNAVAILABLE:
    "border-destructive/20 bg-destructive/10 text-destructive",

  RENTED:
    "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",

  MAINTENANCE:
    "border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400",

  UNKNOWN:
    "border-border bg-muted text-muted-foreground",
};

const labels: Record<
  GearAvailability,
  string
> = {
  AVAILABLE: "Available",
  UNAVAILABLE: "Unavailable",
  RENTED: "Currently rented",
  MAINTENANCE: "Maintenance",
  UNKNOWN: "Status unavailable",
};

export function AvailabilityBadge({
  status,
}: AvailabilityBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-3 py-1",
        styles[status],
      )}
    >
      {labels[status]}
    </Badge>
  );
}