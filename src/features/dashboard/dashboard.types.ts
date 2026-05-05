export type AiStatus =
  | "issues"
  | "approved"
  | "pending"
  | "analyzing"
  | "merged";

export interface MergeRequestRow {
  id: string;
  title: string;
  authorName: string;
  authorInitials: string;
  aiStatus: AiStatus;
  score: number;
  additions: number;
  deletions: number;
  relativeTime: string;
}

export interface ActivityEventItem {
  id: string;
  type: "success" | "error" | "warning";
  message: string;
  relativeTime: string;
}

export interface ProjectAnalysisItem {
  id: string;
  name: string;
  lastChange: string;
}

export type DashboardActivityRangeKey = "7" | "15" | "30";

export interface DashboardActivitySeries {
  labels: string[];
  values: number[];
}
