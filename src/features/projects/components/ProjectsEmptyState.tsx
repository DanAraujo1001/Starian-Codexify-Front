import { type FC } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";

interface ProjectsEmptyStateProps {
  onNewProject: () => void;
}

const ProjectsEmptyState: FC<ProjectsEmptyStateProps> = ({ onNewProject }) => (
  <section
    className="flex w-full flex-1 items-center justify-center py-16"
    aria-live="polite"
  >
    <div className="flex flex-col items-center gap-2 text-center">
      <p className="text-center text-lg font-medium leading-6.75 text-text-secondary">
        Nenhum projeto cadastrado ainda.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 text-center text-sm leading-5.25 text-text-secondary">
        <span>Clique em</span>

        <Button className="h-9 rounded-sm px-3" onClick={onNewProject}>
          <Plus className="size-4" aria-hidden="true" strokeWidth={1.75} />
          <span className="text-sm font-medium">Novo Projeto</span>
        </Button>

        <span>para começar!</span>
      </div>
    </div>
  </section>
);

export default ProjectsEmptyState;
