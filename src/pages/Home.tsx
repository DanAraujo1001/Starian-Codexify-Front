import { type FC } from "react";
import ProjectCard from "@/features/projects/components/ProjectCard";
import ProjectSearchInput from "@/features/projects/components/ProjectSearchInput";
import ProjectsEmptyState from "@/features/projects/components/ProjectsEmptyState";

export interface Project {
  id: string;
  name: string;
  manager: string;
  lastRequest: string;
}

interface HomeProps {
  projects: Project[];
  onNewProject: () => void;
}

const Home: FC<HomeProps> = ({ projects, onNewProject }) => {
  return projects.length === 0 ? (
    <ProjectsEmptyState onNewProject={onNewProject} />
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
  );
};

export default Home;
