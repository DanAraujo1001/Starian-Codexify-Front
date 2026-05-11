import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Layers,
  Star,
} from "lucide-react";
import ActivityChart from "@/features/dashboard/ActivityChart";
import DashboardSectionHeader from "@/features/dashboard/DashboardSectionHeader";
import MRTable from "@/features/dashboard/MRTable";
import ProjectAnalysisCard from "@/features/dashboard/ProjectAnalysisCard";
import RecentActivityFeed from "@/features/dashboard/RecentActivityFeed";
import SummaryCard from "@/features/dashboard/SummaryCard";
import {
  DASHBOARD_ACTIVITY_BY_RANGE,
  DASHBOARD_ACTIVITY_EVENTS,
  DASHBOARD_PROJECT_ANALYSIS,
  DASHBOARD_RECENT_MRS,
} from "@/features/dashboard/mocks/dashboardOverview";

const MR_PREVIEW_COUNT = 5;

const DashboardPage = () => {
  const [mrExpanded, setMrExpanded] = useState(false);

  const hasMoreMrs = DASHBOARD_RECENT_MRS.length > MR_PREVIEW_COUNT;

  const visibleMrs = useMemo(
    () =>
      mrExpanded
        ? DASHBOARD_RECENT_MRS
        : DASHBOARD_RECENT_MRS.slice(0, MR_PREVIEW_COUNT),
    [mrExpanded],
  );

  return (
    <section className="flex w-full max-w-7xl flex-col gap-8 px-0 pb-12 pt-2 sm:gap-10 sm:pt-4">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Visão geral
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-text-secondary sm:text-base">
          Dashboard de monitoramento e análise de code reviews automatizados
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        <SummaryCard
          icon={Layers}
          value="3"
          label="MRs Pendentes"
          trend={{ label: "↑ 12%" }}
        />
        <SummaryCard
          icon={CheckCircle2}
          value="3"
          label="Aprovados / Merged"
          iconClassName="bg-emerald-100 text-emerald-700"
          trend={{ label: "↑ 8%" }}
        />
        <SummaryCard
          icon={AlertCircle}
          value="2"
          label="Com Problemas"
          iconClassName="bg-red-100 text-red-700"
          trend={{ label: "↑ 3%" }}
        />
        <SummaryCard
          icon={Star}
          value="79/100"
          label="Score Médio IA"
          iconClassName="bg-amber-100 text-amber-700"
        />
      </div>

      <div>
        <DashboardSectionHeader
          title="Merge Requests Recentes"
          actionLabel={
            hasMoreMrs ? (mrExpanded ? "Ver menos" : "Ver mais") : undefined
          }
          onActionClick={
            hasMoreMrs
              ? () => {
                  setMrExpanded((expanded) => !expanded);
                }
              : undefined
          }
        />
        <MRTable rows={visibleMrs} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        <ActivityChart activityByRange={DASHBOARD_ACTIVITY_BY_RANGE} />
        <RecentActivityFeed events={DASHBOARD_ACTIVITY_EVENTS} />
      </div>

      <div>
        <DashboardSectionHeader
          title="Análise por Projeto"
          actionLabel="Ver mais"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {DASHBOARD_PROJECT_ANALYSIS.map((project) => (
            <ProjectAnalysisCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
