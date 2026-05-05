import { type FC, useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  FileText,
  UserRound,
  Sparkles,
  AlertTriangle,
  type LucideIcon,
  FileTextIcon,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { useProject } from "@/contexts/ProjectContext";
import AiAnalysisPanel from "@/features/analysis/components/AiAnalysisPanel";

type DetailTab = "overview" | "ai" | "changes" | "rules";

interface FileChange {
  path: string;
  additions: number;
  deletions: number;
}

interface Project {
  id: string;
  title: string;
  branch: string;
  authorInitials: string;
  authorName: string;
  statusLabel: string;
  createdAt: string;
  description: string;
  additions: number;
  deletions: number;
  files: number;
  changes: FileChange[];
}

const MOCK_PROJECTS: Record<string, Project> = {
  "projeto-alpha": {
    id: "projeto-alpha",
    title: "Implementar autenticação OAuth2 com refresh token",
    branch: "feature/oauth2-auth → develop",
    authorInitials: "AS",
    authorName: "Ana Santos",
    statusLabel: "Issues",
    createdAt: "06/03/2026, 08:30:00",
    description:
      "Implementação completa do fluxo OAuth2 com suporte a refresh token e renovação automática de sessão.",
    additions: 342,
    deletions: 87,
    files: 12,
    changes: [
      { path: "src/auth/OAuthService.js", additions: 145, deletions: 12 },
      { path: "src/auth/TokenManager.js", additions: 89, deletions: 34 },
      {
        path: "src/middleware/authMiddleware.js",
        additions: 56,
        deletions: 23,
      },
      { path: "src/config/oauth.config.js", additions: 28, deletions: 8 },
    ],
  },
};

const tabs: { id: DetailTab; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Visão Geral", icon: UserRound },
  { id: "ai", label: "Análise IA", icon: Sparkles },
  { id: "changes", label: "Alterações", icon: FileText },
  { id: "rules", label: "Regras", icon: AlertTriangle },
];

const ProjectDetailsPage: FC = () => {
  const navigate = useNavigate();
  const { setProject } = useProject();
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const projectId = pathname.split("/").pop() || "projeto-alpha";
  const project =
    (projectId && MOCK_PROJECTS[projectId]) || MOCK_PROJECTS["projeto-alpha"];

  const [activeTab, setActiveTab] = useState<DetailTab>("overview");

  // Passar dados do projeto para o Sidebar
  useEffect(() => {
    setProject({
      id: project.id,
      title: project.title,
      mergeRequests: project.changes.map((change, index) => ({
        id: `mr-${index}`,
        title: index === 0 ? project.title : change.path,
        date: index === 0 ? project.createdAt : "31/03/2026 - 10:22",
      })),
    });

    return () => {
      setProject(null);
    };
  }, [project, setProject]);

  return (
    <section className="w-full max-w-[1100px] px-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="h-9 w-9 p-0"
              onClick={() => void navigate({ to: "/" })}
            >
              <ArrowLeft
                className="size-4"
                aria-hidden="true"
                strokeWidth={1.75}
              />
            </Button>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
                Detalhes do Merge Request
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-text-primary">
                {project.title}
              </h1>
              <p className="mt-1 text-sm text-text-secondary">
                {project.branch}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" className="h-9 px-4">
            Aprovar
          </Button>
          <Button variant="secondary" className="h-9 px-4 text-status-critical">
            Rejeitar
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div
          className="inline-flex rounded-xl bg-surface-nav p-1 shadow-card"
          role="tablist"
          aria-label="Seções do projeto"
        >
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`project-panel-${tab.id}`}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200",
                  isSelected
                    ? "bg-surface-primary text-text-primary shadow-sm"
                    : "text-text-brand hover:bg-white/5",
                )}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon
                  className="size-4"
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "overview" && (
        <div
          className="relative grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2"
          id="project-panel-overview"
          role="tabpanel"
          aria-labelledby="tab-overview"
        >
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium leading-[18px] text-text-secondary">
              AUTOR
            </label>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary font-medium text-surface-primary">
                <span className="text-[14px] font-medium leading-[21px]">
                  {project.authorInitials}
                </span>
              </div>
              <span className="text-[16px] font-normal leading-[24px] text-text-primary">
                {project.authorName}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium leading-[18px] text-text-secondary">
              STATUS
            </label>
            <div className="relative h-[22px]">
              <div className="inline-flex items-center gap-1 rounded-[4px] border-[0.8px] border-transparent bg-status-critical px-[8.8px] py-[2.8px] text-[12px] font-medium leading-[16px] text-text-brand">
                <AlertTriangle
                  className="h-3 w-3"
                  aria-hidden="true"
                  strokeWidth={2.2}
                />
                <span>Issues</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium leading-[18px] text-text-secondary">
              BRANCH
            </label>
            <span className="text-[14px] font-normal leading-[21px] text-text-primary">
              {project.branch}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium leading-[18px] text-text-secondary">
              CRIADO EM
            </label>
            <span className="text-[14px] font-normal leading-[21px] text-text-primary">
              {project.createdAt}
            </span>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-2">
            <label className="text-[12px] font-medium leading-[18px] text-text-secondary">
              DESCRIÇÃO
            </label>
            <p className="text-[14px] font-normal leading-[21px] text-text-primary">
              {project.description}
            </p>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-3 lg:col-span-2 sm:grid-cols-3">
            <div className="flex min-h-[120px] flex-col items-center justify-center rounded-[6px] border border-border-default/60 bg-surface-primary p-4 text-center">
              <p className="text-[40px] font-semibold leading-[40px] text-status-excellent">
                +{project.additions}
              </p>
              <p className="mt-2 text-[16px] font-normal leading-[24px] text-text-secondary">
                Adições
              </p>
            </div>

            <div className="flex min-h-[120px] flex-col items-center justify-center rounded-[6px] border border-border-default/60 bg-surface-primary p-4 text-center">
              <p className="text-[40px] font-semibold leading-[40px] text-status-critical">
                -{project.deletions}
              </p>
              <p className="mt-2 text-[16px] font-normal leading-[24px] text-text-secondary">
                Remoções
              </p>
            </div>

            <div className="flex min-h-[120px] flex-col items-center justify-center rounded-[6px] border border-border-default/60 bg-surface-primary p-4 text-center">
              <p className="text-[40px] font-semibold leading-[40px] text-brand-primary">
                {project.files}
              </p>
              <p className="mt-2 text-[16px] font-normal leading-[24px] text-text-secondary">
                Arquivos
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-[16px] font-normal leading-[24px] text-text-primary">
              Arquivos Alterados
            </h3>
            <ul className="flex flex-col gap-2">
              {project.changes.map((change) => (
                <li
                  key={change.path}
                  className="flex min-h-[57.6px] items-center justify-between rounded-[8px] border-[0.8px] border-border-default bg-surface-primary px-[16.8px] py-[16.8px]"
                >
                  <div className="flex items-center gap-3 text-text-primary">
                    <FileTextIcon
                      className="h-4 w-4 text-text-secondary"
                      aria-hidden="true"
                    />
                    <span className="text-[16px] font-normal leading-[24px]">
                      {change.path}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[16px] font-normal leading-[24px]">
                    <span className="text-[rgb(var(--excellent-dark))]">
                      +{change.additions}
                    </span>
                    <span className="text-text-secondary">/</span>
                    <span className="text-[rgb(var(--critical-dark))]">
                      -{change.deletions}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === "ai" && (
        <div
          id="project-panel-ai"
          role="tabpanel"
          aria-labelledby="tab-ai"
          className="mb-6"
        >
          <AiAnalysisPanel score={35} />
        </div>
      )}

      {activeTab === "changes" && (
        <div
          id="project-panel-changes"
          role="tabpanel"
          aria-labelledby="tab-changes"
          className="rounded-[12px] border border-border-default bg-surface-primary p-6 text-text-secondary"
        >
          Conteúdo de alterações em construção.
        </div>
      )}

      {activeTab === "rules" && (
        <div
          id="project-panel-rules"
          role="tabpanel"
          aria-labelledby="tab-rules"
          className="rounded-[12px] border border-border-default bg-surface-primary p-6 text-text-secondary"
        >
          Conteúdo de regras em construção.
        </div>
      )}
    </section>
  );
};

export default ProjectDetailsPage;
