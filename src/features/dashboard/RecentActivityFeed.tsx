import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/utils/cn";
import type { ActivityEventItem } from "./dashboard.types";

interface RecentActivityFeedProps {
  events: ActivityEventItem[];
}

const RecentActivityFeed = ({ events }: RecentActivityFeedProps) => {
  return (
    <div className="rounded-lg border border-border-default bg-surface-primary p-4 shadow-card sm:p-5">
      <h2 className="mb-4 text-lg font-semibold text-text-primary">
        Atividade Recente
      </h2>
      <ul className="flex flex-col gap-4">
        {events.map((event) => (
          <li key={event.id} className="flex gap-3">
            {event.type === "success" ? (
              <CheckCircle2
                className="mt-0.5 size-5 shrink-0 text-emerald-600"
                aria-hidden="true"
                strokeWidth={2}
              />
            ) : null}
            {event.type === "error" ? (
              <XCircle
                className="mt-0.5 size-5 shrink-0 text-red-600"
                aria-hidden="true"
                strokeWidth={2}
              />
            ) : null}
            {event.type === "warning" ? (
              <AlertTriangle
                className="mt-0.5 size-5 shrink-0 text-amber-500"
                aria-hidden="true"
                strokeWidth={2}
              />
            ) : null}
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "text-sm leading-snug text-text-primary",
                  event.type === "error" && "text-red-900",
                  event.type === "warning" && "text-amber-900",
                )}
              >
                {event.message}
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                {event.relativeTime}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivityFeed;
