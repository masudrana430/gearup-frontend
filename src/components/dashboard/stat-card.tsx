import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
}

export function StatCard({
  label,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <article className="glass-panel rounded-[1.75rem] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {label}
          </p>

          <p className="mt-3 font-display text-4xl font-semibold tracking-[-0.045em]">
            {value}
          </p>
        </div>

        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <Icon className="size-5" />
        </span>
      </div>

      {description ? (
        <p className="mt-4 text-xs leading-6 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </article>
  );
}