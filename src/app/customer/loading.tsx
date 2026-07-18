import { Skeleton } from "@/components/ui/skeleton";

export default function CustomerLoading() {
  return (
    <div>
      <Skeleton className="h-4 w-36" />
      <Skeleton className="mt-4 h-12 w-full max-w-lg" />
      <Skeleton className="mt-3 h-5 w-full max-w-xl" />

      <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-44 rounded-[1.75rem]"
          />
        ))}
      </div>

      <Skeleton className="mt-12 h-8 w-48" />

      <div className="mt-6 space-y-5">
        {Array.from({
          length: 3,
        }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-64 rounded-[2rem]"
          />
        ))}
      </div>
    </div>
  );
}