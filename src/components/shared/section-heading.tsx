import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      <p className="mb-4 font-mono text-xs font-medium tracking-[0.22em] text-primary uppercase">
        {eyebrow}
      </p>

      <h2 className="font-display text-4xl leading-[1.02] font-semibold tracking-[-0.05em] text-balance sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}