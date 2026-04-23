import { type Dispatch, type FC, type SetStateAction, useState } from "react";
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
  onSelect: Dispatch<SetStateAction<string>>;
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
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-surface-primary border-r border-border-default flex h-full flex-col justify-between p-6 transition-all duration-200",
        isCollapsed ? "w-[5.525rem] min-w-21.25 p-2" : "w-[16.9469rem]",
      )}
    >
      <div>
        <div
          className={cn(
            "mb-6 flex h-16 items-center",
            isCollapsed ? "justify-center" : "justify-between",
          )}
        >
          <div className="flex items-center gap-2">
            <div className="bg-brand-primary rounded-md w-8 h-8 flex items-center justify-center">
              <img
                src="/assets/sidebar-logo.svg"
                alt="Logo"
                className="w-4 h-4"
              />
            </div>
            {!isCollapsed && (
              <span className="font-medium text-lg text-text-primary font-sans">
                Codexify
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => setIsCollapsed((state) => !state)}
            aria-label={isCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>

        <nav className="flex flex-col gap-2 mb-6">
          {menu.map((item) => (
            <Button
              key={item.key}
              variant={selected === item.key ? "primary" : "ghost"}
              className={cn(
                "w-full rounded px-2 py-2 transition-all duration-200",
                isCollapsed ? "justify-center gap-0 px-0" : "justify-start",
                selected === item.key && "text-text-brand",
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
                <span className="text-sm font-sans font-medium">
                  {item.label}
                </span>
              )}
            </Button>
          ))}
        </nav>

        <Button
          className={cn("mt-2 w-full py-3", isCollapsed ? "px-0" : "")}
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
          selected === "account" && "border-brand-primary bg-brand-subtle",
          isCollapsed
            ? "flex h-16 w-16 items-center justify-center rounded-[9999px] bg-surface-primary p-1"
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
