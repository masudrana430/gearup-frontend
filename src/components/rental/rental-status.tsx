import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import type {
  PaymentStatus,
  RentalStatus,
} from "@/types/rental";

interface RentalStatusBadgeProps {
  status: RentalStatus;
}

const rentalStyles: Record<
  RentalStatus,
  string
> = {
  PENDING:
    "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-400",

  CONFIRMED:
    "border-blue-500/25 bg-blue-500/10 text-blue-700 dark:text-blue-400",

  ACTIVE:
    "border-primary/25 bg-primary/10 text-primary",

  COMPLETED:
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",

  CANCELLED:
    "border-destructive/25 bg-destructive/10 text-destructive",

  REJECTED:
    "border-destructive/25 bg-destructive/10 text-destructive",

  UNKNOWN:
    "border-border bg-muted text-muted-foreground",
};

export function RentalStatusBadge({
  status,
}: RentalStatusBadgeProps) {
  const label = status
    .toLowerCase()
    .replaceAll("_", " ");

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-3 py-1 capitalize",
        rentalStyles[status],
      )}
    >
      {label}
    </Badge>
  );
}

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="rounded-full px-3 py-1 capitalize"
    >
      Payment:{" "}
      {status
        .toLowerCase()
        .replaceAll("_", " ")}
    </Badge>
  );
}