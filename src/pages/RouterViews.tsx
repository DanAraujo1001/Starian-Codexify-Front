import { createContext, useContext, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import Home, { type Project } from "@/pages/Home";

type DashboardSection =
  | "home"
  | "rules"
  | "dashboard"
  | "settings"
  | "help"
  | "account";

interface ProjectsContextValue {
  projects: Project[];
  onNewProject: () => void;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

const PROJECTS_MOCK: Project[] = [
  {
    id: "projeto-alpha",
    name: "Projeto Alpha",
    manager: "Maria Silva",
    lastRequest: "31/03/2026",
  },
  {
    id: "projeto-beta",
    name: "Projeto Beta",
    manager: "João Santos",
    lastRequest: "30/03/2026",
  },
  {
    id: "projeto-gamma",
    name: "Projeto Gamma",
    manager: "Ana Costa",
    lastRequest: "29/03/2026",
  },
];

const sectionByPath: Record<string, DashboardSection> = {
  "/": "home",
  "/rules": "rules",
  "/dashboard": "dashboard",
  "/settings": "settings",
  "/help": "help",
  "/account": "account",
};

const pathBySection: Record<DashboardSection, string> = {
  home: "/",
  rules: "/rules",
  dashboard: "/dashboard",
  settings: "/settings",
  help: "/help",
  account: "/account",
};

export const DashboardShell = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);

  const handleNewProject = () => {
    setProjects((currentProjects) => {
      if (currentProjects.length >= PROJECTS_MOCK.length) {
        return currentProjects;
      }

      return [...currentProjects, PROJECTS_MOCK[currentProjects.length]];
    });
  };

  const selectedSection =
    location.pathname.startsWith("/rules") ||
    sectionByPath[location.pathname] === "rules"
      ? "rules"
      : sectionByPath[location.pathname] ?? "home";

  const projectsContextValue = useMemo(
    () => ({ projects, onNewProject: handleNewProject }),
    [projects],
  );

  const handleSelectSection = (section: string) => {
    const nextPath = pathBySection[section as DashboardSection];

    if (nextPath) {
      void navigate({ to: nextPath });
    }
  };

  return (
    <ProjectsContext.Provider value={projectsContextValue}>
      <DashboardLayout
        selected={selectedSection}
        onSelect={handleSelectSection}
        onNewProject={handleNewProject}
      >
        <Outlet />
      </DashboardLayout>
    </ProjectsContext.Provider>
  );
};

export const HomeRoutePage = () => {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error("ProjectsContext não foi fornecido pelo layout raiz.");
  }

  return (
    <Home projects={context.projects} onNewProject={context.onNewProject} />
  );
};

export const PlaceholderSection = ({ title }: { title: string }) => (
  <section className="flex w-full max-w-3xl flex-1 items-center justify-center px-4 text-center sm:px-0">
    <div className="rounded-lg border border-border-default bg-surface-primary px-8 py-10 shadow-card">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary">
        {title}
      </p>
      <h1 className="mt-3 text-2xl font-semibold text-text-primary">
        Em breve
      </h1>
      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Esta seção ainda não possui conteúdo implementado.
      </p>
    </div>
  </section>
);
