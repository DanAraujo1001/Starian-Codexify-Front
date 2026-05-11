import { Tag } from "lucide-react";
import { type FC } from "react";

export interface ProjectRule {
  id: string;
  name: string;
  severity?: "critical" | "warning" | "info";
}

interface RulesPanelProps {
  rules?: ProjectRule[];
}

const RulesPanel: FC<RulesPanelProps> = () => {
  return (
    <div className="space-y-6">
      <div className="mt-2 grid grid-cols-1 gap-3 lg:col-span-2 sm:grid-cols-3">
        <div className="flex min-h-[120px] flex-col items-center justify-center rounded-[6px] border border-border-default/60 bg-surface-primary p-4 text-center">
          <p className="text-[40px] font-semibold leading-[40px] text-status-excellent">
            4
          </p>
          <p className="mt-2 text-[16px] font-normal leading-[24px] text-text-secondary">
            Aprovados
          </p>
        </div>

        <div className="flex min-h-[120px] flex-col items-center justify-center rounded-[6px] border border-border-default/60 bg-surface-primary p-4 text-center">
          <p className="text-[40px] font-semibold leading-[40px] text-status-critical">
            2
          </p>
          <p className="mt-2 text-[16px] font-normal leading-[24px] text-text-secondary">
            Reprovados
          </p>
        </div>

        <div className="flex min-h-[120px] flex-col items-center justify-center rounded-[6px] border border-border-default/60 bg-surface-primary p-4 text-center">
          <p className="text-[40px] font-semibold leading-[40px] text-brand-primary">
            2
          </p>
          <p className="mt-2 text-[16px] font-normal leading-[24px] text-text-secondary">
            Atenção
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Consultar Regra Cadastrada</h2>
        <div className="py-6 w-full">
          <button
            type="button"
            onClick={() => alert("Ir para Regras")}
            className="w-full flex justify-between rounded-md border border-border-default bg-surface-primary p-4 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer hover:shadow-sm"
            aria-label={`Abrir detalhe da regra`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="p-2 bg-[#DC0105] rounded-sm">
                <Tag
                  className="h-6 w-6 text-text-brand"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>
              <h3>Regra Beta</h3>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesPanel;
