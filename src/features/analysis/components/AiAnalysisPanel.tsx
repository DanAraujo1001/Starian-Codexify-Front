import { type FC, useEffect, useRef } from "react";
import * as echarts from "echarts";

interface AiAnalysisPanelProps {
  score?: number;
}

interface ScoreCard {
  label: string;
  value: string;
  accentClassName: string;
  progressClassName: string;
  progressWidthClassName: string;
}

interface IssueItem {
  title: string;
  badge: string;
  badgeClassName: string;
  badgeTextClassName: string;
  date: string;
  description: string;
  reference: string;
}

const scoreCards: ScoreCard[] = [
  {
    label: "Segurança",
    value: "42.500",
    accentClassName: "text-[rgb(var(--critical-dark))]",
    progressClassName: "bg-[rgb(var(--critical-light))]",
    progressWidthClassName: "pr-[53.762px]",
  },
  {
    label: "Performance",
    value: "76.700",
    accentClassName: "text-brand-primary",
    progressClassName: "bg-[rgb(8,24,62)]",
    progressWidthClassName: "pr-[83.512px]",
  },
  {
    label: "Legalidade",
    value: "79.700",
    accentClassName: "text-brand-primary",
    progressClassName: "bg-[rgb(8,24,62)]",
    progressWidthClassName: "pr-[72.762px]",
  },
  {
    label: "Regras de Negócio",
    value: "85.700",
    accentClassName: "text-brand-primary",
    progressClassName: "bg-[rgb(8,24,62)]",
    progressWidthClassName: "pr-[51.262px]",
  },
];

const issues: IssueItem[] = [
  {
    title: "Tokens armazenados inseguros em localStorage",
    badge: "CRÍTICO",
    badgeClassName: "border-status-critical bg-status-critical/10",
    badgeTextClassName: "text-status-critical",
    date: "Hoje às 11:35 - 2025-03-15",
    description:
      "Tokens sensíveis armazenados em localStorage podem ser acessados por scripts maliciosos. Vulnerabilidade expõe tokens a ataques XSS. Tokens sensíveis devem ser armazenados em httpOnly cookies.",
    reference: "Issues/XYZ-03.44",
  },
  {
    title: "Falta tratamento de erro no refresh",
    badge: "MÉDIO",
    badgeClassName: "border-status-medium bg-status-medium/10",
    badgeTextClassName: "text-status-medium",
    date: "Ontem às 23:15 - 2025-03-14",
    description:
      "O refresh de token não possui tratamento de erro. Se o refresh falhar, o sistema pode expirar sem feedback, a aplicação pode quebrar abruptamente.",
    reference: "Issues/XYZ-03.44",
  },
  {
    title: "Client secret está sendo enviado no body da request",
    badge: "MÉDIO",
    badgeClassName: "border-status-medium bg-status-medium/10",
    badgeTextClassName: "text-status-medium",
    date: "2 dias atrás - 2025-03-13",
    description:
      "O client_secret está sendo enviado no corpo da requisição. A RFC 6749 ERM recomenda usar HTTP Basic Authentication para credenciais do cliente.",
    reference: "Issues/rfc6749-3.2.1",
  },
  {
    title: "Acoplamento no construtor",
    badge: "INFO",
    badgeClassName: "border-status-info bg-status-info/10",
    badgeTextClassName: "text-status-info",
    date: "3 dias atrás - 2025-03-12",
    description:
      "O construtor está excessivamente acoplado ao OAuthConfig. Dificulta testes unitários e mocks. Recomenda-se passar parâmetros individuais no construtor.",
    reference: "Issues/XYZ-03.44",
  },
];

const AiAnalysisPanel: FC<AiAnalysisPanelProps> = ({ score = 35 }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    chartRef.current = echarts.init(ref.current, undefined, {
      renderer: "svg",
    });

    const setOption = (value: number) => {
      chartRef.current?.setOption({
        animation: false,
        series: [
          {
            type: "gauge",
            radius: "96%",
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            center: ["50%", "50%"],
            progress: { show: true, roundCap: true, width: 14 },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 14,
                color: [[1, "rgba(228,228,228,0.8)"]],
              },
            },
            itemStyle: { color: "#FB2C36" },
            pointer: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            detail: {
              valueAnimation: false,
              formatter: "{value}",
              fontSize: 56,
              fontWeight: 700,
              color: "rgb(var(--text-primary))",
              offsetCenter: [0, 0],
            },
            title: { show: false },
            data: [{ value }],
          },
        ],
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      chartRef.current?.resize();
    });

    resizeObserver.observe(ref.current);
    setOption(score);

    return () => {
      resizeObserver.disconnect();
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, [score]);

  return (
    <section className="w-full rounded-[12px] border border-border-default bg-surface-primary p-6">
      <div className="flex flex-col items-center gap-8">
        <div className="relative h-[253px] w-[280px]">
          <div ref={ref} className="h-full w-full" />
        </div>

        <div className="w-full max-w-[831px] rounded-[12px] border-2 border-status-critical bg-status-critical/10 p-[26px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-status-critical text-text-brand">
                <span className="text-xs font-medium">!</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold leading-[33.6px] text-[rgb(var(--critical-dark))]">
                  CRÍTICO
                </h4>
              </div>
            </div>
            <div className="rounded-[4px] bg-status-critical px-4 py-2">
              <span className="text-xl font-medium text-text-brand">
                {score}/100
              </span>
            </div>
          </div>

          <p className="mt-4 text-base font-medium leading-6 text-text-secondary">
            O código passou issues que devem ser resolvidos antes da merge.
            Revenda recomendada.
          </p>
        </div>

        <div className="flex w-full flex-wrap justify-center gap-4">
          {scoreCards.map((card) => (
            <div
              key={card.label}
              className="w-full max-w-[408px] rounded-[12px] border border-border-default bg-surface-primary p-[0.8px]"
            >
              <div className="flex h-[83px] flex-col gap-2 px-6 pt-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium leading-[21px] text-text-primary">
                    {card.label}
                  </p>
                  <p
                    className={`text-sm font-normal leading-5 ${card.accentClassName}`}
                  >
                    {card.value}
                  </p>
                </div>
                <div
                  className={`flex h-[6px] w-full items-start overflow-hidden rounded-full bg-surface-sidebar ${card.progressWidthClassName}`}
                >
                  <div
                    className={`h-[6px] w-full rounded-full ${card.progressClassName}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full rounded-[12px] border border-border-default bg-surface-primary p-0.5">
          <div className="px-6 pt-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-primary" />
              <h3 className="text-base font-normal text-text-primary">
                Issues Encontrados (5)
              </h3>
            </div>
          </div>

          <div className="flex flex-col gap-4 px-6 py-4">
            {issues.map((issue) => (
              <article
                key={issue.title}
                className={`rounded-[12px] border border-solid bg-surface-primary p-[0.8px] ${
                  issue.badge === "CRÍTICO"
                    ? "border-status-critical"
                    : issue.badge === "INFO"
                      ? "border-status-info"
                      : "border-status-medium"
                }`}
              >
                <div className="relative min-h-[120px] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-base font-normal leading-6 text-text-primary">
                      {issue.title}
                    </h4>
                    <span
                      className={`rounded-[4px] border px-[8.8px] py-[2.8px] text-xs font-medium leading-4 ${issue.badgeClassName} ${issue.badgeTextClassName}`}
                    >
                      {issue.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-normal leading-4 text-text-secondary">
                    {issue.date}
                  </p>
                  <p className="mt-6 text-base font-normal leading-6 text-text-secondary">
                    {issue.description}
                  </p>
                  <p className="mt-6 text-sm font-medium leading-5 text-brand-primary">
                    {issue.reference}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiAnalysisPanel;
