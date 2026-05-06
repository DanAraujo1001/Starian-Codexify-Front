import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Account from "@/pages/Account";
import DashboardPage from "@/pages/DashboardPage";
import Rules from "@/pages/Rules";
import SettingsPage from "@/pages/SettingsPage";
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

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
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
