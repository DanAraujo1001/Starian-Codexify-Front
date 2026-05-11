import { type FC, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (projects.length === 0) {
    return <ProjectsEmptyState onNewProject={onNewProject} />;
  }

  if (filteredProjects.length === 0) {
    return (
      <>
        <ProjectSearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
        <ProjectsEmptyState onNewProject={onNewProject} />
      </>
    );
  }

  return (
    <>
      <ProjectSearchInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
      />
      <div className="grid grid-cols-3 gap-6 w-244">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            name={project.name}
            manager={project.manager}
            lastRequest={project.lastRequest}
            highlight={index === 0}
            onClick={() =>
              void navigate({
                to: "/projects/$projectId",
                params: { projectId: project.id },
              })
            }
          />
        ))}
      </div>
    </>
  );
};

export default Home;
