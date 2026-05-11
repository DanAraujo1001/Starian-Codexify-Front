import { type ButtonHTMLAttributes, type FC } from "react";
import { Bell } from "lucide-react";
import { cn } from "@/utils/cn";

interface ProjectCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  className,
  ...props
}) => (
  <button
    type="button"
    className={cn(
      "bg-surface-subtle border border-border-default rounded-lg p-6 w-77.25 h-53.25 flex flex-col justify-between relative text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-brand-primary",
      className,
    )}
    {...props}
  >
    <div>
      <h3 className="font-semibold text-lg text-text-primary mb-2">{name}</h3>
      <div className="text-xs text-text-secondary font-medium mb-1">
        Gestor Cadastrado
      </div>
      <div className="text-sm text-text-primary mb-4">{manager}</div>
    </div>
    <div className="bg-brand-primary rounded-md h-8 flex items-center px-3 justify-between">
      <span className="text-sm text-text-brand">Última requisição:</span>
      <span className="text-text-brand text-sm">{lastRequest}</span>
    </div>
    {highlight && (
      <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary shadow-highlight">
        <Bell
          className="w-4 h-4 text-text-brand"
          aria-hidden="true"
          strokeWidth={2}
        />
      </div>
    )}
  </button>
);

export default ProjectCard;
