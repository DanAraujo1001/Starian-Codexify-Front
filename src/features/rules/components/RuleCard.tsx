import { type FC } from "react";
import { Tag } from "lucide-react";
import StatusBadge, { type RuleStatus } from "./StatusBadge";

export interface RuleCardData {
  id: string;
  name: string;
  status: RuleStatus;
  linkedProjects: number;
  initials: string;
  colorClass: string;
}

interface RuleCardProps {
  rule: RuleCardData;
  onOpenRule: (id: string) => void;
}

const RuleCard: FC<RuleCardProps> = ({ rule, onOpenRule }) => (
  <button
    type="button"
    onClick={() => onOpenRule(rule.id)}
    className="group flex flex-col justify-between rounded-2xl border border-border-default bg-surface-primary p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
    aria-label={`Abrir detalhe da regra ${rule.name}`}
  >
    <div className="flex items-center justify-between gap-4">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white ${rule.colorClass}`}
      >
        <Tag className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
      </div>
      <StatusBadge status={rule.status} />
    </div>

    <div className="mt-5 space-y-2">
      <h3 className="text-base font-semibold text-text-primary">{rule.name}</h3>
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-text-secondary">
          Projetos vinculados
        </span>
        <span className="text-2xl font-semibold text-text-primary">
          {rule.linkedProjects}
        </span>
      </div>
    </div>
  </button>
);

export default RuleCard;
