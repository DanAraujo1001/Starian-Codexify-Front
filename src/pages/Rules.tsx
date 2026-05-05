import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import ProjectSearchInput from "@/features/projects/components/ProjectSearchInput";
import { RulesGrid, type RuleCardData } from "@/features/rules";

const RULES_MOCK: RuleCardData[] = [
  {
    id: "regra-padrao-01",
    name: "Regra Padrão",
    status: "Ativo",
    linkedProjects: 5,
    initials: "RP",
    colorClass: "bg-blue-500",
  },
  {
    id: "projeto-cajueiro",
    name: "Projeto Cajueiro",
    status: "Ativo",
    linkedProjects: 3,
    initials: "PC",
    colorClass: "bg-emerald-500",
  },
  {
    id: "regra-beta",
    name: "Regra Beta",
    status: "Inativo",
    linkedProjects: 2,
    initials: "RB",
    colorClass: "bg-amber-500",
  },
  {
    id: "regra-aceitavel",
    name: "Regra Aceitável",
    status: "Ativo",
    linkedProjects: 7,
    initials: "RA",
    colorClass: "bg-violet-500",
  },
  {
    id: "regra-critica",
    name: "Regra Crítica",
    status: "Inativo",
    linkedProjects: 1,
    initials: "RC",
    colorClass: "bg-red-500",
  },
  {
    id: "projeto-laranjeira",
    name: "Projeto Laranjeira",
    status: "Ativo",
    linkedProjects: 4,
    initials: "PL",
    colorClass: "bg-sky-500",
  },
  {
    id: "regra-sprint",
    name: "Regra Sprint",
    status: "Ativo",
    linkedProjects: 6,
    initials: "RS",
    colorClass: "bg-orange-500",
  },
  {
    id: "regra-homolog",
    name: "Regra Homolog",
    status: "Inativo",
    linkedProjects: 2,
    initials: "RH",
    colorClass: "bg-teal-500",
  },
  {
    id: "projeto-figueira",
    name: "Projeto Figueira",
    status: "Ativo",
    linkedProjects: 8,
    initials: "PF",
    colorClass: "bg-indigo-500",
  },
  {
    id: "regra-avancada",
    name: "Regra Avançada",
    status: "Ativo",
    linkedProjects: 3,
    initials: "RA",
    colorClass: "bg-lime-500",
  },
  {
    id: "projeto-olivio",
    name: "Projeto Olívio",
    status: "Inativo",
    linkedProjects: 5,
    initials: "PO",
    colorClass: "bg-fuchsia-500",
  },
  {
    id: "regra-experimental",
    name: "Regra Experimental",
    status: "Ativo",
    linkedProjects: 9,
    initials: "RE",
    colorClass: "bg-pink-500",
  },
];

const Rules = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const totalRules = RULES_MOCK.length;
  const hasMoreThanNine = totalRules > 9;

  const filteredRules = useMemo(
    () =>
      RULES_MOCK.filter((rule) =>
        rule.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
      ),
    [searchTerm],
  );

  const visibleRules =
    searchTerm || showAll ? filteredRules : RULES_MOCK.slice(0, 6);
  const showVerMaisButton = hasMoreThanNine && !showAll && !searchTerm;
  const showFooterCount = hasMoreThanNine;

  const handleOpenRule = (id: string) => {
    void navigate({ to: `/rules/${id}` });
  };

  if (totalRules === 0) {
    return (
      <section className="flex min-h-[calc(100vh-96px)] items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-2xl border border-border-default bg-surface-primary p-10 text-center">
          <h1 className="text-2xl font-semibold text-text-primary">
            Nenhuma regra cadastrada
          </h1>
          <p className="mt-3 text-sm text-text-secondary">
            Crie sua primeira regra para começar a gerenciar projetos e
            políticas.
          </p>
          <Button className="mt-6">+ Nova Regra</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[1200px] px-6 pb-10">
      <div className="mb-8 flex justify-center">
        <div className="w-full max-w-xl">
          <ProjectSearchInput
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Qual regra você procura?"
            aria-label="Buscar regra"
            className="w-full"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold text-text-primary">
          Regras cadastradas
        </h1>

        {showVerMaisButton && (
          <button
            type="button"
            className="text-sm font-medium text-brand-primary transition-colors duration-200 hover:text-brand-hover"
            onClick={() => setShowAll(true)}
          >
            Ver mais
          </button>
        )}

        {showAll && !searchTerm && (
          <button
            type="button"
            className="text-sm font-medium text-brand-primary transition-colors duration-200 hover:text-brand-hover"
            onClick={() => setShowAll(false)}
          >
            Ver menos
          </button>
        )}
      </div>

      <RulesGrid rules={visibleRules} onOpenRule={handleOpenRule} />

      {showFooterCount && (
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <span className="text-sm text-text-secondary text-center">
            {totalRules} regras cadastradas
          </span>
          <Button className="h-9 px-3 gap-0">
            <Plus className="w-4 h-4" aria-hidden="true" strokeWidth={1.75} />
            <span className="font-medium text-sm">Nova Regra</span>
          </Button>
        </div>
      )}
    </section>
  );
};

export default Rules;
