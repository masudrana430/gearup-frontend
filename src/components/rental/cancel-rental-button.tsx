"use client";

import {
  LoaderCircle,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCancelRentalMutation } from "@/features/rentals/rental.hooks";

interface CancelRentalButtonProps {
  rentalId: string;
}

export function CancelRentalButton({
  rentalId,
}: CancelRentalButtonProps) {
  const router = useRouter();

  const cancelMutation =
    useCancelRentalMutation(
      rentalId,
    );

  async function handleCancel() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this rental?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await cancelMutation.mutateAsync();

      toast.success(
        "The rental was cancelled.",
      );

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to cancel the rental.",
      );
    }
  }

  return (
    <Button
      type="button"
      variant="destructive"
      className="rounded-full"
      disabled={cancelMutation.isPending}
      onClick={handleCancel}
    >
      {cancelMutation.isPending ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <XCircle className="size-4" />
      )}

      Cancel rental
    </Button>
  );
}