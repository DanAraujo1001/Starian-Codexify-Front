import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProjectCard from "@/features/projects/components/ProjectCard";
import ProjectSearchInput from "@/features/projects/components/ProjectSearchInput";
import ProjectsEmptyState from "@/features/projects/components/ProjectsEmptyState";

interface Project {
  id: string;
  name: string;
  manager: string;
  lastRequest: string;
}

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

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const handleNewProject = () => {
    setProjects((currentProjects) => {
      if (currentProjects.length >= PROJECTS_MOCK.length) {
        return currentProjects;
      }

      return [...currentProjects, PROJECTS_MOCK[currentProjects.length]];
    });
  };

  return (
    <DashboardLayout onNewProject={handleNewProject}>
      {projects.length === 0 ? (
        <ProjectsEmptyState onNewProject={handleNewProject} />
      ) : (
        <>
          <ProjectSearchInput />
          <div className="grid grid-cols-3 gap-6 w-244">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                name={project.name}
                manager={project.manager}
                lastRequest={project.lastRequest}
                highlight={index === 0}
              />
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Home;
