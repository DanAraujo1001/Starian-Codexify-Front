import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Account from "@/pages/Account";
import RuleDetail from "@/pages/RuleDetail";
import Rules from "@/pages/Rules";
import {
  DashboardShell,
  HomeRoutePage,
  PlaceholderSection,
} from "@/pages/RouterViews";

const rootRoute = createRootRoute({ component: DashboardShell });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomeRoutePage,
});

const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: Account,
});

const rulesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rules",
  component: Rules,
});

const ruleDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rules/$ruleId",
  component: RuleDetail,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => <PlaceholderSection title="Dashboard" />,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => <PlaceholderSection title="Configurações" />,
});

const helpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/help",
  component: () => <PlaceholderSection title="Ajuda" />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  accountRoute,
  rulesRoute,
  ruleDetailRoute,
  dashboardRoute,
  settingsRoute,
  helpRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
