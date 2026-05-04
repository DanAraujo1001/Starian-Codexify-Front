import { type FC } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  FileText,
  Home,
  PieChart,
  Plus,
  Settings,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

interface SidebarProps {
  user: {
    name: string;
    email: string;
    avatarUrl: string;
  };
  onNewProject: () => void;
  selected: string;
  onSelect: (section: string) => void;
  isCollapsed: boolean;
  onIsCollapsedChange: (isCollapsed: boolean) => void;
}

interface MenuItem {
  label: string;
  key: string;
  icon: LucideIcon;
}

const menu: MenuItem[] = [
  { label: "Home", key: "home", icon: Home },
  { label: "Regras", key: "rules", icon: FileText },
  {
    label: "Dashboard",
    key: "dashboard",
    icon: PieChart,
  },
  {
    label: "Configurações",
    key: "settings",
    icon: Settings,
  },
  { label: "Ajuda", key: "help", icon: CircleHelp },
];

const Sidebar: FC<SidebarProps> = ({
  user,
  onNewProject,
  selected,
  onSelect,
  isCollapsed,
  onIsCollapsedChange,
}) => {
  return (
    <aside
      className={cn(
        "fixed left-6 top-6 z-10 bg-surface-sidebar rounded-xl shadow-sm overflow-hidden flex flex-col justify-between p-6 transition-all duration-200",
        isCollapsed
          ? "w-[5.525rem] min-w-[5.525rem] p-2 h-[calc(100vh-3rem)]"
          : "w-[16.9469rem] h-[calc(100vh-3rem)]",
      )}
    >
      <div>
        <div
          className={cn(
            "mb-6 flex h-16 items-center",
            isCollapsed ? "justify-center" : "justify-between",
          )}
        >
          <div className="flex items-center gap-3">
            <div className="bg-surface-brand-medium rounded-lg w-10 h-10 flex items-center justify-center">
              <img
                src="/assets/sidebar-logo.svg"
                alt="Logo"
                className="w-5 h-5"
              />
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-lg text-text-primary font-sans">
                Codexify
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-text-secondary hover:text-text-primary"
            onClick={() => onIsCollapsedChange(!isCollapsed)}
            aria-label={isCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>

        <nav className="flex flex-col gap-2">
          {menu.map((item) => (
            <Button
              key={item.key}
              variant={selected === item.key ? "primary" : "ghost"}
              className={cn(
                "w-full rounded-lg px-2 py-2 transition-all duration-200 text-text-primary hover:bg-surface-brand-low",
                isCollapsed ? "justify-center gap-0 px-0" : "justify-start",
                selected === item.key && "bg-surface-selected text-text-brand",
              )}
              onClick={() => onSelect(item.key)}
              aria-current={selected === item.key ? "page" : undefined}
              aria-label={item.label}
            >
              <item.icon
                className="w-4 h-4"
                aria-hidden="true"
                strokeWidth={1.75}
              />
              {!isCollapsed && (
                <span className="text-sm font-sans font-medium ml-2">
                  {item.label}
                </span>
              )}
            </Button>
          ))}
        </nav>

        <Button
          variant="primary"
          className={cn(
            "mt-2 w-full py-3 rounded-md flex items-center justify-center gap-2",
            isCollapsed ? "px-0" : "px-3",
          )}
          onClick={onNewProject}
          aria-label="Novo Projeto"
        >
          <Plus className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
          {!isCollapsed && "Novo Projeto"}
        </Button>
      </div>

      <Button
        variant="ghost"
        className={cn(
          "mt-6 w-full overflow-hidden border border-border-default p-0 text-left transition-all duration-200 hover:bg-surface-subtle",
          selected === "account" && "bg-surface-selected border-brand-primary",
          isCollapsed
            ? "flex h-16 w-16 items-center justify-center rounded-full bg-surface-sidebar p-1"
            : "flex items-center gap-3 rounded-lg p-3",
        )}
        onClick={() => onSelect("account")}
        aria-current={selected === "account" ? "page" : undefined}
        aria-label={`Abrir conta de ${user.name}`}
      >
        <img
          src={"https://cdn-icons-png.flaticon.com/512/1458/1458201.png"}
          alt={user.name}
          className={cn(
            "rounded-full object-cover",
            isCollapsed ? "h-8 w-8" : "h-10 w-10",
          )}
        />
        {!isCollapsed && (
          <div>
            <div className="text-sm font-sans font-normal text-text-primary">
              {user.name}
            </div>
            <div className="text-xs font-sans text-text-secondary">
              {user.email}
            </div>
          </div>
        )}
      </Button>
    </aside>
  );
};

export default Sidebar;
