import { type FC } from "react";
import { FileCode } from "lucide-react";
import { cn } from "@/utils/cn";

interface CodeLine {
  number: number;
  type: "added" | "removed" | "context";
  content: string;
  suggestion?: {
    title: string;
    description: string;
  };
}

interface CodeDiffViewerProps {
  fileName: string;
  additions: number;
  deletions: number;
  lines: CodeLine[];
}

const CodeDiffViewer: FC<CodeDiffViewerProps> = ({
  fileName,
  additions,
  deletions,
  lines,
}) => {
  return (
    <div className="overflow-hidden rounded-[16px] border border-border-default bg-surface-primary">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border-default bg-surface-primary px-6 py-4">
        <div className="flex items-center gap-3">
          <FileCode
            className="h-5 w-5 text-text-secondary"
            aria-hidden="true"
            strokeWidth={1.5}
          />
          <h3 className="text-sm font-semibold leading-[21px] text-text-primary">
            {fileName}
          </h3>
        </div>
        <div className="flex items-center gap-4 text-base font-normal leading-6">
          <span className="text-status-excellent">+{additions}</span>
          <span className="text-status-critical">-{deletions}</span>
        </div>
      </div>

      {/* Code Diff Area */}
      <div className="overflow-x-auto bg-surface-primary">
        <div className="inline-block min-w-full">
          {lines.map((line) => (
            <div
              key={`${line.number}-${line.content}`}
              className={cn(
                "group flex border-b border-border-default/40 transition-colors hover:bg-black/5",
                line.type === "added" && "bg-status-excellent/10",
                line.type === "removed" && "bg-status-critical/10",
              )}
            >
              {/* Line Number */}
              <div
                className={cn(
                  "flex w-12 flex-shrink-0 select-none items-center justify-end border-r border-border-default/40 px-3 py-2 text-right font-mono text-xs leading-5 text-text-secondary",
                  line.type === "added" && "bg-status-excellent/5",
                  line.type === "removed" && "bg-status-critical/5",
                )}
              >
                {line.number}
              </div>

              {/* Line Type Indicator */}
              <div
                className={cn(
                  "flex w-6 flex-shrink-0 items-center justify-center font-mono text-sm font-semibold",
                  line.type === "added" && "text-status-excellent",
                  line.type === "removed" && "text-status-critical",
                  line.type === "context" && "text-text-secondary/30",
                )}
              >
                {line.type === "added" && "+"}
                {line.type === "removed" && "-"}
                {line.type === "context" && " "}
              </div>

              {/* Code Content */}
              <div className="flex-1 px-4 py-2">
                <code
                  className={cn(
                    "font-mono text-sm leading-6 tracking-[0.5px]",
                    line.type === "added" && "text-text-primary",
                    line.type === "removed" && "text-text-primary",
                    line.type === "context" && "text-text-primary",
                  )}
                >
                  {line.content}
                </code>
              </div>

              {/* Suggestion Indicator */}
              {line.suggestion && (
                <div className="flex-shrink-0 px-3 py-2">
                  <div className="inline-flex items-center gap-2 rounded-lg border border-blue-200/50 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    <span>ⓘ</span>
                    <span>Sugestão</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Suggestion Card */}
      {lines.some((line) => line.suggestion) && (
        <div className="border-t border-blue-200/30 bg-blue-50 px-6 py-4">
          {lines.find((line) => line.suggestion)?.suggestion && (
            <div className="flex gap-3">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-blue-400 bg-blue-100 text-xs font-bold text-blue-700">
                ⓘ
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-900">
                  {lines.find((line) => line.suggestion)?.suggestion?.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-blue-800">
                  {
                    lines.find((line) => line.suggestion)?.suggestion
                      ?.description
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeDiffViewer;
