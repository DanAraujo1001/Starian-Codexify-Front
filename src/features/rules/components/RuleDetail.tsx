import { useMemo } from "react";
import { Folder, Pencil, Plus, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import Button from "@/components/ui/Button";
import { RULES_MOCK, getRuleProjects } from "@/features/rules/data";

const RuleDetail = () => {
  const navigate = useNavigate();
  const { ruleId } = useParams({ from: "/rules/$ruleId" });

  const rule = useMemo(
    () => RULES_MOCK.find((item) => item.id === ruleId),
    [ruleId],
  );

  const associatedProjects = useMemo(
    () => (rule ? getRuleProjects(rule) : []),
    [rule],
  );

  if (!rule) {
    return (
      <section className="w-full max-w-[1200px] px-6 pb-10">
        <div className="rounded-2xl border border-border-default bg-surface-primary p-10 text-center">
          <h1 className="text-2xl font-semibold text-text-primary">
            Regra não encontrada
          </h1>
          <p className="mt-3 text-sm text-text-secondary">
            Selecione uma regra válida para ver os detalhes.
          </p>
          <Button className="mt-6" onClick={() => navigate({ to: "/rules" })}>
            Voltar para regras
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[1200px] px-6 pb-12 pt-2 font-sans">
      <div className="flex flex-col gap-8">
        <div>
          <span
            className={`inline-flex items-center rounded-md px-4 py-2 text-2xl font-semibold text-white ${rule.colorClass}`}
          >
            {rule.name}
          </span>

          <div className="mt-8 rounded-md border border-border-default bg-surface-primary px-4 py-3">
            <h2 className="text-base font-semibold text-text-primary">Descrição</h2>
            <p className="mt-1.5 text-sm leading-6 text-text-secondary">
              Esta regra é aplicada automaticamente para classificar e organizar
              projetos de acordo com critérios específicos. Permite melhor gestão
              e acompanhamento das atividades relacionadas.
            </p>
          </div>
        </div>

        <div className="rounded-md bg-surface-primary py-3">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                Projetos vinculados à Regra
              </h3>
              <p className="text-sm text-text-secondary">
                Confira os projetos que utilizam esta regra.
              </p>
            </div>
            <span className="inline-flex rounded-sm bg-brand-primary px-2.5 py-1 text-sm font-semibold text-white font-mono">
              {associatedProjects.length} projetos
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {associatedProjects.map((project) => (
              <article
                key={project.id}
                className="flex items-center gap-3 rounded-md border border-border-default bg-transparent px-4 py-3"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-border-default bg-transparent text-text-secondary">
                  <Folder className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-normal text-text-primary">
                    {project.name}
                  </h4>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-md border border-border-default bg-surface-subtle px-4 text-sm font-medium text-text-primary transition-colors duration-200 hover:bg-surface-primary"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            Vincular mais projetos
          </button>
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-start">
          <Button
            variant="primary"
            className="h-9 min-w-32 rounded-sm px-4 text-sm"
            onClick={() => navigate({ to: "/rules" })}
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
            Editar regra
          </Button>
          <Button
            variant="ghost"
            className="h-9 min-w-32 rounded-sm border border-border-default px-4 text-sm text-text-primary hover:bg-surface-subtle"
            onClick={() => navigate({ to: "/rules" })}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Excluir regra
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RuleDetail;
