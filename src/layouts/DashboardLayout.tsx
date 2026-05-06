import { type FC, type ReactNode, useState, useMemo } from "react";
import { useLocation } from "@tanstack/react-router";
import Sidebar from "@/components/shared/Sidebar";
import {
  ProjectContext,
  type ProjectContextValue,
} from "@/contexts/ProjectContext";
import { cn } from "@/utils/cn";

interface DashboardLayoutProps {
  children: ReactNode;
  selected: string;
  onSelect: (section: string) => void;
  onNewProject?: () => void;
}

const mockUser = {
  name: "Jorge Silva",
  email: "jorge@email.com",
  avatarUrl: "/assets/avatar-jorge.png",
};

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  selected,
  onSelect,
  onNewProject,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [project, setProject] = useState<ProjectContextValue["project"]>(null);
  const location = useLocation();

  const handleNewProject = onNewProject ?? (() => alert("Novo Projeto"));

  const projectContextValue = useMemo(
    () => ({ project, setProject }),
    [project],
  );

  // Detecta se está em rota de projeto
  const isInProjectRoute = location.pathname.startsWith("/projects/");

  return (
    <ProjectContext.Provider value={projectContextValue}>
      <div className="min-h-screen w-full overflow-x-hidden bg-surface-primary p-6 box-border">
        <Sidebar
          user={mockUser}
          selected={selected}
          onSelect={onSelect}
          onNewProject={handleNewProject}
          isCollapsed={isCollapsed}
          onIsCollapsedChange={setIsCollapsed}
          project={isInProjectRoute ? project || undefined : undefined}
        />
        <div
          className={cn(
            "min-h-[calc(100vh-3rem)] transition-[padding-left] duration-200",
            isCollapsed ? "pl-[5.525rem]" : "pl-[16.9469rem]",
          )}
        >
          <main className="flex min-h-[calc(100vh-3rem)] flex-col items-center gap-8 py-8 overflow-y-auto px-6">
            {children}
          </main>
        </div>
      </div>
    </ProjectContext.Provider>
  );
};

export default DashboardLayout;
