import { type FC, type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

interface AccountInfoRowProps {
  Icon: LucideIcon;
  label: string;
  children: ReactNode;
  className?: string;
}

const AccountInfoRow: FC<AccountInfoRowProps> = ({
  Icon,
  label,
  children,
  className,
}) => (
  <div className={cn("flex flex-col gap-2", className)}>
    <div className="flex items-center gap-1.5 text-xs font-medium text-text-secondary">
      <Icon className="size-4 shrink-0" aria-hidden="true" strokeWidth={1.75} />
      <span>{label}</span>
    </div>

    <div className="text-sm leading-account-row text-text-primary">
      {children}
    </div>
  </div>
);

export default AccountInfoRow;
