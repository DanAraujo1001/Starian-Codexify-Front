import { type FC } from "react";

export type RuleStatus = "Ativo" | "Inativo";

interface StatusBadgeProps {
  status: RuleStatus;
}

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => (
  <span
    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
      status === "Ativo"
        ? "bg-[rgba(0,201,80,0.1)] text-excellent"
        : "bg-[rgba(251,44,54,0.1)] text-critical"
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;
