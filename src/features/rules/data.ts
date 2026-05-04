import type { RuleCardData } from "./components/RuleCard";

export const RULES_MOCK: RuleCardData[] = [
  {
    id: "regra-padrao-01",
    name: "Regra Padrão",
    status: "Ativo",
    linkedProjects: 5,
    initials: "RP",
    colorClass: "bg-blue-500",
  },
  {
    id: "regra-cajueiro",
    name: "Regra Cajueiro",
    status: "Ativo",
    linkedProjects: 3,
    initials: "RC",
    colorClass: "bg-emerald-500",
  },
  {
    id: "regra-beta",
    name: "Regra Beta",
    status: "Inativo",
    linkedProjects: 2,
    initials: "RB",
    colorClass: "bg-amber-500",
  },
  {
    id: "regra-aceitavel",
    name: "Regra Aceitável",
    status: "Ativo",
    linkedProjects: 7,
    initials: "RA",
    colorClass: "bg-violet-500",
  },
  {
    id: "regra-critica",
    name: "Regra Crítica",
    status: "Inativo",
    linkedProjects: 1,
    initials: "RC",
    colorClass: "bg-red-500",
  },
  {
    id: "regra-laranjeira",
    name: "Regra Laranjeira",
    status: "Ativo",
    linkedProjects: 4,
    initials: "RL",
    colorClass: "bg-sky-500",
  },
  {
    id: "regra-sprint",
    name: "Regra Sprint",
    status: "Ativo",
    linkedProjects: 6,
    initials: "RS",
    colorClass: "bg-orange-500",
  },
  {
    id: "regra-homolog",
    name: "Regra Homolog",
    status: "Inativo",
    linkedProjects: 2,
    initials: "RH",
    colorClass: "bg-teal-500",
  },
  {
    id: "regra-figueira",
    name: "Regra Figueira",
    status: "Ativo",
    linkedProjects: 8,
    initials: "RF",
    colorClass: "bg-indigo-500",
  },
  {
    id: "regra-avancada",
    name: "Regra Avançada",
    status: "Ativo",
    linkedProjects: 3,
    initials: "RA",
    colorClass: "bg-lime-500",
  },
  {
    id: "regra-olivio",
    name: "Regra Olívio",
    status: "Inativo",
    linkedProjects: 5,
    initials: "RO",
    colorClass: "bg-fuchsia-500",
  },
  {
    id: "regra-experimental",
    name: "Regra Experimental",
    status: "Ativo",
    linkedProjects: 9,
    initials: "RE",
    colorClass: "bg-pink-500",
  },
];

export interface RuleProject {
  id: string;
  name: string;
}

const GENERIC_PROJECTS: RuleProject[] = [
  { id: "projeto-alpha", name: "Projeto Alpha" },
  { id: "projeto-beta", name: "Projeto Beta" },
  { id: "projeto-gamma", name: "Projeto Gamma" },
  { id: "projeto-delta", name: "Projeto Delta" },
  { id: "projeto-olimpia", name: "Projeto Olímpia" },
  { id: "projeto-ceres", name: "Projeto Ceres" },
  { id: "projeto-aurea", name: "Projeto Áurea" },
  { id: "projeto-lua", name: "Projeto Lua" },
  { id: "projeto-sol", name: "Projeto Sol" },
];

export const getRuleProjects = (rule: RuleCardData): RuleProject[] =>
  GENERIC_PROJECTS.slice(0, Math.min(rule.linkedProjects, GENERIC_PROJECTS.length));
