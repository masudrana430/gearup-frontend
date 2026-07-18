"use client";


import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarDays,
  LoaderCircle,
  LockKeyhole,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useForm,
  useWatch,
} from "react-hook-form";
import { toast } from "sonner";

import {
  rentalFormSchema,
  type RentalFormValues,
} from "@/features/rentals/rental.schema";
import { useCreateRentalMutation } from "@/features/rentals/rental.hooks";
import { useCurrentUser } from "@/features/auth/auth.hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { calculateRentalDays } from "@/lib/utils/date";
import { formatCurrency } from "@/lib/utils/currency";
import { cn } from "@/lib/utils/cn";
import type { GearAvailability } from "@/types/gear";

interface RentalFormProps {
  gearId: string;
  gearName: string;
  pricePerDay: number;
  depositAmount?: number;
  availability: GearAvailability;
}

export function RentalForm({
  gearId,
  gearName,
  pricePerDay,
  depositAmount = 0,
  availability,
}: RentalFormProps) {
  const router = useRouter();

  const {
    data: user,
    isLoading: userLoading,
  } = useCurrentUser();

  const createRentalMutation =
    useCreateRentalMutation();

  const {
  register,
  handleSubmit,
  control,
  formState: {
    errors,
    isSubmitting,
  },
} = useForm<RentalFormValues>({
    resolver: zodResolver(
      rentalFormSchema,
    ),

    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

  const [startDate, endDate] = useWatch({
  control,
  name: [
    "startDate",
    "endDate",
  ],
});

const rentalDays =
  startDate && endDate
    ? calculateRentalDays(
        startDate,
        endDate,
      )
    : 0;

  const rentalSubtotal =
    rentalDays * pricePerDay;

  async function onSubmit(
    values: RentalFormValues,
  ) {
    try {
      const result =
        await createRentalMutation.mutateAsync(
          {
            gearId,
            startDate:
              values.startDate,
            endDate: values.endDate,
          },
        );

      toast.success(
        `${gearName} was reserved successfully.`,
      );

      router.push(
        `/customer/rentals/${result.rentalId}`,
      );

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to create the rental.",
      );
    }
  }

  if (availability !== "AVAILABLE") {
    return (
      <div className="rounded-[2rem] border bg-muted/30 p-6 text-center">
        <CalendarDays className="mx-auto size-8 text-muted-foreground" />

        <h2 className="mt-4 font-display text-xl font-semibold">
          This gear is unavailable
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Choose another available item
          from the GearUp marketplace.
        </p>
      </div>
    );
  }

  if (userLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-[2rem] border">
        <LoaderCircle className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    const loginPath =
      `/login?next=${encodeURIComponent(
        `/gear/${gearId}`,
      )}`;

    return (
      <div className="glass-panel rounded-[2rem] p-6">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <LockKeyhole className="size-5" />
        </span>

        <h2 className="mt-5 font-display text-2xl font-semibold">
          Sign in to reserve
        </h2>

        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Customer authentication is
          required before creating a
          rental.
        </p>

        <Link
          href={loginPath}
          className={cn(
            buttonVariants({
              size: "lg",
            }),
            "mt-6 h-12 w-full rounded-full",
          )}
        >
          Sign in and continue
        </Link>
      </div>
    );
  }

  if (user.role !== "CUSTOMER") {
    return (
      <div className="rounded-[2rem] border bg-muted/30 p-6">
        <h2 className="font-display text-xl font-semibold">
          Customer account required
        </h2>

        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Provider and administrator
          accounts cannot create customer
          rentals.
        </p>
      </div>
    );
  }

  const pending =
    isSubmitting ||
    createRentalMutation.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-panel rounded-[2rem] p-6"
    >
      <h2 className="font-display text-2xl font-semibold">
        Choose rental dates
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Select the period when you need
        this equipment.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startDate">
            Start date
          </Label>

          <Input
            id="startDate"
            type="date"
            className="h-12 rounded-xl"
            {...register("startDate")}
          />

          {errors.startDate ? (
            <p className="text-sm text-destructive">
              {errors.startDate.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">
            End date
          </Label>

          <Input
            id="endDate"
            type="date"
            className="h-12 rounded-xl"
            {...register("endDate")}
          />

          {errors.endDate ? (
            <p className="text-sm text-destructive">
              {errors.endDate.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-muted/45 p-5">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {formatCurrency(
              pricePerDay,
            )}{" "}
            × {rentalDays} day
            {rentalDays === 1 ? "" : "s"}
          </span>

          <span className="font-medium">
            {formatCurrency(
              rentalSubtotal,
            )}
          </span>
        </div>

        {depositAmount > 0 ? (
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-muted-foreground">
              Refundable deposit
            </span>

            <span className="font-medium">
              {formatCurrency(
                depositAmount,
              )}
            </span>
          </div>
        ) : null}

        <div className="mt-4 flex justify-between border-t pt-4">
          <span className="font-semibold">
            Rental total
          </span>

          <span className="font-display text-xl font-semibold text-primary">
            {formatCurrency(
              rentalSubtotal,
            )}
          </span>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-6 h-12 w-full rounded-full"
        disabled={
          pending || rentalDays < 1
        }
      >
        {pending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Creating rental...
          </>
        ) : (
          <>
            <CalendarDays className="size-4" />
            Reserve this gear
          </>
        )}
      </Button>
    </form>
  );
}