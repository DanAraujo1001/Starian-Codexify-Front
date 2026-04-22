import { type FC } from "react";
import { Bell } from "lucide-react";

interface ProjectCardProps {
  name: string;
  manager: string;
  lastRequest: string;
  highlight?: boolean;
}

const ProjectCard: FC<ProjectCardProps> = ({
  name,
  manager,
  lastRequest,
  highlight,
}) => (
  <div className="bg-surface-subtle border border-border-default rounded-lg p-6 w-77.25 h-53.25 flex flex-col justify-between relative">
    <div>
      <h3 className="font-semibold text-lg text-text-primary mb-2">{name}</h3>
      <div className="text-xs text-text-secondary font-medium mb-1">
        Gestor Cadastrado
      </div>
      <div className="text-sm text-text-primary mb-4">{manager}</div>
    </div>
    <div className="bg-brand-primary rounded-md h-8 flex items-center px-3 justify-between">
      <span className="text-text-brand text-sm opacity-80">
        Última requisição:
      </span>
      <span className="text-text-brand text-sm">{lastRequest}</span>
    </div>
    {highlight && (
      <div className="absolute -top-2 -right-2 bg-brand-primary rounded-full shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] w-8 h-8 flex items-center justify-center">
        <Bell
          className="w-4 h-4 text-text-brand"
          aria-hidden="true"
          strokeWidth={2}
        />
      </div>
    )}
  </div>
);

export default ProjectCard;
