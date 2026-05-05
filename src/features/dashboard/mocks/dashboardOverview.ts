import type {
  ActivityEventItem,
  DashboardActivityRangeKey,
  DashboardActivitySeries,
  MergeRequestRow,
  ProjectAnalysisItem,
} from "@/features/dashboard/dashboard.types";

export const DASHBOARD_RECENT_MRS: MergeRequestRow[] = [
  {
    id: "1",
    title: "Implementar autenticação OAuth2 no serviço de usuários",
    authorName: "Ana Santos",
    authorInitials: "AS",
    aiStatus: "approved",
    score: 92,
    additions: 342,
    deletions: 87,
    relativeTime: "2h atrás",
  },
  {
    id: "2",
    title: "Corrigir vazamento de memória no worker de filas",
    authorName: "Bruno Lima",
    authorInitials: "BL",
    aiStatus: "issues",
    score: 48,
    additions: 56,
    deletions: 120,
    relativeTime: "5h atrás",
  },
  {
    id: "3",
    title: "Adicionar cache Redis para leituras frequentes",
    authorName: "Carla Menezes",
    authorInitials: "CM",
    aiStatus: "pending",
    score: 71,
    additions: 210,
    deletions: 34,
    relativeTime: "1d atrás",
  },
  {
    id: "4",
    title: "Refatorar módulo de pagamentos para PIX",
    authorName: "Daniel Rocha",
    authorInitials: "DR",
    aiStatus: "analyzing",
    score: 65,
    additions: 189,
    deletions: 92,
    relativeTime: "3h atrás",
  },
  {
    id: "5",
    title: "Atualizar dependências de segurança (patch)",
    authorName: "Eduarda Prado",
    authorInitials: "EP",
    aiStatus: "merged",
    score: 88,
    additions: 24,
    deletions: 18,
    relativeTime: "6h atrás",
  },
  {
    id: "6",
    title: "Instrumentar métricas OpenTelemetry no gateway de API",
    authorName: "Felipe Nogueira",
    authorInitials: "FN",
    aiStatus: "approved",
    score: 84,
    additions: 412,
    deletions: 63,
    relativeTime: "8h atrás",
  },
  {
    id: "7",
    title: "Ajustar política de retry no cliente HTTP interno",
    authorName: "Gabriela Souza",
    authorInitials: "GS",
    aiStatus: "pending",
    score: 76,
    additions: 98,
    deletions: 41,
    relativeTime: "12h atrás",
  },
  {
    id: "8",
    title: "Corrigir validação de schema no endpoint de webhooks",
    authorName: "Henrique Alves",
    authorInitials: "HA",
    aiStatus: "analyzing",
    score: 58,
    additions: 132,
    deletions: 205,
    relativeTime: "1d atrás",
  },
];

export const DASHBOARD_ACTIVITY_EVENTS: ActivityEventItem[] = [
  {
    id: "e1",
    type: "success",
    message: "MR #7 'Otimizar queries N+1' foi merged",
    relativeTime: "2d atrás",
  },
  {
    id: "e2",
    type: "error",
    message: "MR #4 'Race condition pagamentos' rejeitado",
    relativeTime: "18h atrás",
  },
  {
    id: "e3",
    type: "warning",
    message: "MR #8 'Winston logging' aguardando análise",
    relativeTime: "20min atrás",
  },
];

export const DASHBOARD_PROJECT_ANALYSIS: ProjectAnalysisItem[] = [
  { id: "p1", name: "Projeto Alpha", lastChange: "31/03/2026" },
  { id: "p2", name: "Projeto Beta", lastChange: "30/03/2026" },
  { id: "p3", name: "Projeto Gamma", lastChange: "29/03/2026" },
  { id: "p4", name: "Projeto Delta", lastChange: "28/03/2026" },
  { id: "p5", name: "Projeto Épsilon", lastChange: "27/03/2026" },
  { id: "p6", name: "Projeto Zeta", lastChange: "26/03/2026" },
];

export const DASHBOARD_WEEKLY_LABELS = [
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sáb",
  "Dom",
];

export const DASHBOARD_WEEKLY_VALUES = [12, 19, 8, 22, 15, 5, 3];

const DASHBOARD_ACTIVITY_LABELS_15 = Array.from({ length: 15 }, (_, i) =>
  String(i + 1),
);

const DASHBOARD_ACTIVITY_VALUES_15 = [
  10, 14, 9, 18, 12, 21, 7, 16, 11, 19, 8, 22, 13, 17, 10,
];

const DASHBOARD_ACTIVITY_LABELS_30 = Array.from({ length: 30 }, (_, i) =>
  String(i + 1),
);

const DASHBOARD_ACTIVITY_VALUES_30 = [
  9, 12, 7, 15, 11, 20, 8, 14, 18, 6, 13, 22, 10, 16, 9, 19, 12, 7, 21, 11,
  14, 8, 17, 10, 23, 9, 15, 12, 18, 7,
];

export const DASHBOARD_ACTIVITY_BY_RANGE: Record<
  DashboardActivityRangeKey,
  DashboardActivitySeries
> = {
  "7": {
    labels: DASHBOARD_WEEKLY_LABELS,
    values: DASHBOARD_WEEKLY_VALUES,
  },
  "15": {
    labels: DASHBOARD_ACTIVITY_LABELS_15,
    values: DASHBOARD_ACTIVITY_VALUES_15,
  },
  "30": {
    labels: DASHBOARD_ACTIVITY_LABELS_30,
    values: DASHBOARD_ACTIVITY_VALUES_30,
  },
};

export const DASHBOARD_ACTIVITY_RANGE_OPTIONS: {
  key: DashboardActivityRangeKey;
  label: string;
}[] = [
  { key: "7", label: "Últimos 7 dias" },
  { key: "15", label: "Últimos 15 dias" },
  { key: "30", label: "Últimos 30 dias" },
];
