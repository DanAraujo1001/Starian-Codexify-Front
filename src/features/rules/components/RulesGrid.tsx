import { type FC } from "react";
import RuleCard, { type RuleCardData } from "./RuleCard";

interface RulesGridProps {
  rules: RuleCardData[];
  onOpenRule: (id: string) => void;
}

const RulesGrid: FC<RulesGridProps> = ({ rules, onOpenRule }) => (
  <div className="grid gap-4 md:grid-cols-3">
    {rules.length > 0 ? (
      rules.map((rule) => (
        <RuleCard key={rule.id} rule={rule} onOpenRule={onOpenRule} />
      ))
    ) : (
      <div className="col-span-full rounded-2xl border border-border-default bg-surface-primary p-10 text-center">
        <p className="text-sm font-medium text-text-secondary">
          Nenhuma regra correspondente encontrada.
        </p>
      </div>
    )}
  </div>
);

export default RulesGrid;
export type { RuleCardData };
