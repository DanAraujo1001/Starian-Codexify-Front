import { cn } from "@/utils/cn";
import type { AiStatus, MergeRequestRow } from "./dashboard.types";

interface MRTableProps {
  rows: MergeRequestRow[];
}

const statusPresentation: Record<
  AiStatus,
  { label: string; className: string }
> = {
  issues: {
    label: "Issues",
    className: "bg-red-100 text-red-800",
  },
  approved: {
    label: "Aprovado",
    className: "bg-emerald-100 text-emerald-800",
  },
  pending: {
    label: "Pendente",
    className: "bg-amber-100 text-amber-800",
  },
  analyzing: {
    label: "Analisando",
    className: "bg-violet-100 text-violet-800",
  },
  merged: {
    label: "Merged",
    className: "bg-sky-100 text-sky-800",
  },
};

const scorePresentation = (score: number): string => {
  if (score > 80) {
    return "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200";
  }
  if (score >= 50) {
    return "bg-amber-100 text-amber-800 ring-1 ring-amber-200";
  }
  return "bg-red-100 text-red-800 ring-1 ring-red-200";
};

const MRTable = ({ rows }: MRTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-border-default bg-surface-primary shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-surface-nav text-text-brand">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                Merge request
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                Autor
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                Status IA
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                Score
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                Alterações
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                Tempo
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const status = statusPresentation[row.aiStatus];
              return (
                <tr
                  key={row.id}
                  className={cn(
                    "border-t border-border-default transition-colors duration-200",
                    index % 2 === 0
                      ? "bg-surface-primary"
                      : "bg-surface-subtle/40",
                  )}
                >
                  <td className="max-w-[240px] px-4 py-3 font-medium text-text-primary">
                    <span className="line-clamp-2" title={row.title}>
                      {row.title}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-subtle text-xs font-semibold text-brand-primary"
                        aria-hidden="true"
                      >
                        {row.authorInitials}
                      </span>
                      <span className="text-text-primary">{row.authorName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                        status.className,
                      )}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex size-9 items-center justify-center rounded-full text-sm font-semibold",
                        scorePresentation(row.score),
                      )}
                    >
                      {row.score}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm">
                    <span className="font-semibold text-emerald-600">
                      +{row.additions}
                    </span>{" "}
                    <span className="font-semibold text-red-600">
                      -{row.deletions}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {row.relativeTime}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MRTable;
