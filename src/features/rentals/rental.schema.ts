import { z } from "zod";

function parseDateOnly(value: string): Date {
  return new Date(`${value}T00:00:00`);
}

function startOfToday(): Date {
  const today = new Date();

  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
}

export const rentalFormSchema = z
  .object({
    startDate: z
      .string()
      .min(1, "Select a start date."),

    endDate: z
      .string()
      .min(1, "Select an end date."),
  })
  .superRefine((values, context) => {
    if (!values.startDate || !values.endDate) {
      return;
    }

    const startDate = parseDateOnly(
      values.startDate,
    );

    const endDate = parseDateOnly(
      values.endDate,
    );

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime())
    ) {
      context.addIssue({
        code: "custom",
        path: ["startDate"],
        message: "Enter valid rental dates.",
      });

      return;
    }

    if (startDate < startOfToday()) {
      context.addIssue({
        code: "custom",
        path: ["startDate"],
        message:
          "The rental cannot start in the past.",
      });
    }

    if (endDate < startDate) {
      context.addIssue({
        code: "custom",
        path: ["endDate"],
        message:
          "The end date must be after the start date.",
      });
    }
  });

export type RentalFormValues = z.infer<
  typeof rentalFormSchema
>;