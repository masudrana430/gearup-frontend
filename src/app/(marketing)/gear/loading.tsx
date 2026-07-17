import { Skeleton } from "@/components/ui/skeleton";

export default function GearLoading() {
  return (
    <div className="container-shell py-16">
      <Skeleton className="h-5 w-36" />
      <Skeleton className="mt-5 h-14 w-full max-w-2xl" />
      <Skeleton className="mt-4 h-6 w-full max-w-xl" />

      <div className="mt-14 grid gap-8 lg:grid-cols-[18rem_1fr]">
        <Skeleton className="h-[36rem] rounded-[2rem]" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-[28rem] rounded-[2rem]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}