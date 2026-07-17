import { Skeleton } from "@/components/ui/skeleton";

export default function GearDetailsLoading() {
  return (
    <div className="container-shell grid gap-10 py-16 lg:grid-cols-2">
      <Skeleton className="aspect-[4/3] rounded-[2rem]" />

      <div>
        <Skeleton className="h-7 w-28" />
        <Skeleton className="mt-6 h-16 w-full" />
        <Skeleton className="mt-5 h-5 w-72" />
        <Skeleton className="mt-8 h-32 w-full" />
        <Skeleton className="mt-8 h-64 rounded-[2rem]" />
      </div>
    </div>
  );
}