import {
  differenceInCalendarDays,
  format,
  formatDistanceToNow,
  isValid,
  parseISO,
} from "date-fns";

export type DateInput = string | number | Date;

function toDate(value: DateInput): Date {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "number") {
    return new Date(value);
  }

  return parseISO(value);
}

export function formatDate(
  value: DateInput,
  pattern = "dd MMM yyyy",
): string {
  const date = toDate(value);

  return isValid(date) ? format(date, pattern) : "—";
}

export function formatDateTime(
  value: DateInput,
): string {
  return formatDate(value, "dd MMM yyyy, hh:mm a");
}

export function formatRelativeDate(
  value: DateInput,
): string {
  const date = toDate(value);

  if (!isValid(date)) {
    return "—";
  }

  return formatDistanceToNow(date, {
    addSuffix: true,
  });
}

export function calculateRentalDays(
  startDate: DateInput,
  endDate: DateInput,
): number {
  const start = toDate(startDate);
  const end = toDate(endDate);

  if (!isValid(start) || !isValid(end)) {
    return 0;
  }

  return Math.max(
    differenceInCalendarDays(end, start) + 1,
    1,
  );
}