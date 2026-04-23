import { useState } from "react";
import "./App.css";
import DashboardLayout from "@/layouts/DashboardLayout";
import Home, { type Project } from "@/pages/Home";
import Account from "./pages/Account";

type DashboardSection =
  | "home"
  | "rules"
  | "dashboard"
  | "settings"
  | "help"
  | "account";

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

const App = () => {
  const [selectedSection, setSelectedSection] = useState<string>("home");
  const [projects, setProjects] = useState<Project[]>([]);

  const handleNewProject = () => {
    setProjects((currentProjects) => {
      if (currentProjects.length >= PROJECTS_MOCK.length) {
        return currentProjects;
      }

      return [...currentProjects, PROJECTS_MOCK[currentProjects.length]];
    });
  };

  const renderSection = () => {
    if (selectedSection === "home") {
      return <Home projects={projects} onNewProject={handleNewProject} />;
    }

    if (selectedSection === "account") {
      return <Account />;
    }

    const sectionTitles: Record<
      Exclude<DashboardSection, "home" | "account">,
      string
    > = {
      rules: "Regras",
      dashboard: "Dashboard",
      help: "Ajuda",
      settings: "Configurações",
    };

    const sectionKey = selectedSection as Exclude<
      DashboardSection,
      "home" | "account"
    >;

    return (
      <section className="flex w-full max-w-3xl flex-1 items-center justify-center px-4 text-center sm:px-0">
        <div className="rounded-lg border border-border-default bg-surface-primary px-8 py-10 shadow-card">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary">
            {sectionTitles[sectionKey]}
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
  };

  return (
    <DashboardLayout
      selected={selectedSection}
      onSelect={setSelectedSection}
      onNewProject={handleNewProject}
    >
      {renderSection()}
    </DashboardLayout>
  );
};

export default App;
