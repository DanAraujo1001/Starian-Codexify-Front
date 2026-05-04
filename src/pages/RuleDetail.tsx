import { useMemo } from "react";
import { Folder, Plus, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import Button from "@/components/ui/Button";
import StatusBadge from "@/features/rules/components/StatusBadge";
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
    <section className="w-full max-w-[1200px] px-6 pb-10">
      <div className="mb-6 flex flex-col gap-6">

        {/* Card principal da regra */}
        <div className="rounded-2xl border border-border-default bg-surface-primary p-6 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-4">
              {/* Badge do nome com a colorClass do mock — igual ao ícone do card */}
              <div
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white ${rule.colorClass}`}
              >
                {rule.name}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={rule.status} />
                <span className="text-sm text-text-secondary">
                  {rule.linkedProjects} projetos vinculados
                </span>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="mt-6 rounded-2xl border border-border-default bg-surface-subtle p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
              Descrição
            </h2>
            <p className="mt-3 text-sm leading-6 text-text-primary">
              Esta regra é aplicada automaticamente para classificar e organizar
              projetos de acordo com critérios específicos. Permite melhor gestão
              e acompanhamento das atividades relacionadas.
            </p>
          </div>
        </div>

        {/* Card de projetos vinculados */}
        <div className="rounded-2xl border border-border-default bg-surface-primary p-6 shadow-card">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                Projetos vinculados à Regra
              </h3>
              <p className="text-sm text-text-secondary">
                Aqui estão os projetos que usam esta regra atualmente.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-surface-subtle px-3 py-1 text-sm font-semibold text-text-secondary">
              {rule.linkedProjects} projetos
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {associatedProjects.map((project) => (
              <article
                key={project.id}
                className="flex items-center gap-4 rounded-2xl border border-border-default bg-white p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-surface-subtle text-brand-primary">
                  <Folder className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">
                    {project.name}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    Projeto vinculado à regra
                  </p>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-border-default bg-surface-subtle text-sm font-semibold text-text-secondary transition-colors duration-200 hover:border-brand-primary hover:text-text-primary"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Vincular mais projetos
          </button>
        </div>

        {/* Ações */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            onClick={() => navigate({ to: "/rules" })}
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
            Editar regra
          </Button>
          <Button
            variant="ghost"
            className="border border-border-default text-critical hover:bg-surface-subtle"
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
