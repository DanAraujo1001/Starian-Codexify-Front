import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { cn } from "@/utils/cn";

interface SummaryCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  iconClassName?: string;
  trend?: {
    label: string;
    positive?: boolean;
  };
}

const SummaryCard = ({
  icon: Icon,
  value,
  label,
  iconClassName,
  trend,
}: SummaryCardProps) => {
  return (
    <div className="relative flex flex-col gap-3 rounded-lg border border-border-default bg-surface-primary p-4 shadow-card sm:p-5">
      {trend ? (
        <div
          className={cn(
            "absolute right-3 top-3 flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
            trend.positive !== false
              ? "bg-emerald-100 text-emerald-800"
              : "bg-red-100 text-red-800",
          )}
        >
          <TrendingUp className="size-3.5" aria-hidden="true" strokeWidth={2} />
          <span>{trend.label}</span>
        </div>
      ) : null}

      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-md",
          iconClassName ?? "bg-brand-subtle text-brand-primary",
        )}
      >
        <Icon className="size-5" aria-hidden="true" strokeWidth={2} />
      </div>

      <div>
        <p className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          {value}
        </p>
        <p className="mt-1 text-sm text-text-secondary">{label}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
