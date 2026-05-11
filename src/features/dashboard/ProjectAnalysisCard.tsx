import type { ProjectAnalysisItem } from "./dashboard.types";

interface ProjectAnalysisCardProps {
  project: ProjectAnalysisItem;
}

const ProjectAnalysisCard = ({ project }: ProjectAnalysisCardProps) => {
  return (
    <article className="rounded-xl bg-[#D9DBE3] p-4 shadow-card transition-all duration-200 hover:shadow-highlight sm:p-5 dark:bg-surface-subtle">
      <h3 className="text-base font-bold leading-snug text-[#1A1C24] dark:text-text-primary">
        {project.name}
      </h3>
      <div className="mt-4 flex items-center justify-between gap-3 rounded-md bg-[#0B215E] px-3 py-2.5 sm:px-4 sm:py-3 dark:bg-brand-primary">
        <span className="text-sm font-normal text-white/95">
          Última alteração:
        </span>
        <span className="text-sm font-normal tabular-nums text-white/95">
          {project.lastChange}
        </span>
      </div>
    </article>
  );
};

export default ProjectAnalysisCard;
