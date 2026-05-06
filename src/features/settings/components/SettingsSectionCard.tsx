import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SettingsSectionCardProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}

const SettingsSectionCard = ({
  title,
  icon: Icon,
  children,
  className,
}: SettingsSectionCardProps) => {
  return (
    <article
      className={cn(
        "rounded-lg border border-border-default bg-white p-5 shadow-card sm:p-6 dark:bg-surface-primary",
        className,
      )}
    >
      <div className="mb-5 flex items-center gap-3 sm:mb-6">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-md bg-surface-subtle text-brand-primary dark:bg-surface-primary/50"
          aria-hidden="true"
        >
          <Icon className="size-5" strokeWidth={2} />
        </div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      </div>
      <div className="flex flex-col">{children}</div>
    </article>
  );
};

export default SettingsSectionCard;
