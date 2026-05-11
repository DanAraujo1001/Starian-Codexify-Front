import type { EChartsOption } from "echarts";
import * as echarts from "echarts";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type {
  DashboardActivityRangeKey,
  DashboardActivitySeries,
} from "@/features/dashboard/dashboard.types";
import { DASHBOARD_ACTIVITY_RANGE_OPTIONS } from "@/features/dashboard/mocks/dashboardOverview";
import { cn } from "@/utils/cn";

interface ActivityChartProps {
  activityByRange: Record<DashboardActivityRangeKey, DashboardActivitySeries>;
}

const BRAND_BAR = "#0c2256";
const AXIS_COLOR = "#6b7280";
const SPLIT_LINE = "rgba(156, 163, 175, 0.35)";

const ActivityChart = ({ activityByRange }: ActivityChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [rangeKey, setRangeKey] = useState<DashboardActivityRangeKey>("7");
  const [menuOpen, setMenuOpen] = useState(false);

  const { labels, values } = activityByRange[rangeKey];
  const selectedLabel =
    DASHBOARD_ACTIVITY_RANGE_OPTIONS.find((o) => o.key === rangeKey)?.label ??
    "Últimos 7 dias";

  useEffect(() => {
    const el = chartRef.current;
    if (!el) {
      return;
    }

    const chart = echarts.init(el);

    const option: EChartsOption = {
      grid: {
        left: 40,
        right: 16,
        top: 24,
        bottom: labels.length > 7 ? 40 : 28,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      xAxis: {
        type: "category",
        data: labels,
        axisLine: { lineStyle: { color: AXIS_COLOR } },
        axisLabel: {
          color: AXIS_COLOR,
          fontSize: 12,
          rotate: labels.length > 7 ? 45 : 0,
        },
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { color: SPLIT_LINE, type: "dashed" } },
        axisLabel: { color: AXIS_COLOR, fontSize: 12 },
      },
      series: [
        {
          type: "bar",
          data: values,
          barMaxWidth: 36,
          itemStyle: {
            color: BRAND_BAR,
            borderRadius: [6, 6, 0, 0],
          },
        },
      ],
    };

    chart.setOption(option);

    const resizeObserver = new ResizeObserver(() => {
      chart.resize();
    });
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
      chart.dispose();
    };
  }, [labels, values]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const node = dropdownRef.current;
      if (node && !node.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className="rounded-lg border border-border-default bg-surface-primary p-4 shadow-card sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-text-primary">
          Atividade Semanal
        </h2>
        <div ref={dropdownRef} className="relative self-start sm:self-auto">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-haspopup="listbox"
            aria-controls="activity-range-listbox"
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(
              "inline-flex items-center gap-2 rounded-md border border-border-default px-3 py-2 text-sm font-medium text-text-primary transition-all duration-200",
              "bg-[rgb(243_244_210)] hover:bg-surface-subtle/80",
              "dark:bg-surface-subtle/10 dark:hover:bg-surface-subtle/90",
            )}
          >
            {selectedLabel}
            <ChevronDown
              className={cn(
                "size-4 shrink-0 text-text-secondary transition-transform duration-200",
                menuOpen && "rotate-180",
              )}
              aria-hidden="true"
              strokeWidth={2}
            />
          </button>

          {menuOpen ? (
            <ul
              id="activity-range-listbox"
              role="listbox"
              aria-label="Período de atividade"
              className="absolute right-0 z-20 mt-1 min-w-[12.5rem] overflow-hidden rounded-md border border-border-default bg-[rgb(243_244_246)] py-1 shadow-card dark:bg-surface-primary"
            >
              {DASHBOARD_ACTIVITY_RANGE_OPTIONS.map((option) => {
                const isSelected = option.key === rangeKey;
                return (
                  <li key={option.key} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setRangeKey(option.key);
                        setMenuOpen(false);
                      }}
                      className={cn(
                        "flex w-full px-3 py-2 text-left text-sm text-text-primary transition-all duration-200",
                        "hover:bg-surface-subtle/90",
                        isSelected &&
                          "bg-surface-subtle/70 font-medium dark:bg-surface-primary/30",
                      )}
                    >
                      {option.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
      <div
        ref={chartRef}
        className="h-64 w-full min-h-64"
        role="img"
        aria-label="Gráfico de barras com a quantidade de atividades no período selecionado"
      />
    </div>
  );
};

export default ActivityChart;
