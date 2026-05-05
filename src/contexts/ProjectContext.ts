import { createContext, useContext } from "react";

export interface ProjectContextValue {
  project: {
    id: string;
    title: string;
    mergeRequests: Array<{
      id: string;
      title: string;
      date: string;
    }>;
  } | null;
  setProject: (project: ProjectContextValue["project"]) => void;
}

export const ProjectContext = createContext<ProjectContextValue | null>(null);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject deve ser usado dentro de DashboardLayout");
  }
  return context;
};
