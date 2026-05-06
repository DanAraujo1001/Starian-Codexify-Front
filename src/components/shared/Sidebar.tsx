import { type FC, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  FileText,
  Home,
  PieChart,
  Plus,
  Settings,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

interface MergeRequest {
  id: string;
  title: string;
  date: string;
  isSelected?: boolean;
}

interface Project {
  id: string;
  title: string;
  mergeRequests: MergeRequest[];
}

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
  project?: Project;
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
  project,
}) => {
  const [selectedMergeRequestId, setSelectedMergeRequestId] = useState<
    string | null
  >(project?.mergeRequests[0]?.id ?? null);

  return (
    <aside
      className={cn(
        "fixed left-6 top-6 z-10 bg-surface-sidebar rounded-xl shadow-sm flex flex-col transition-all duration-200",
        isCollapsed
          ? "w-[5.525rem] min-w-[5.525rem] p-2 h-[calc(100vh-3rem)]"
          : "w-[16.9469rem] h-[calc(100vh-3rem)]",
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex flex-col",
          !isCollapsed && "p-6",
          isCollapsed && "px-2 py-2",
        )}
      >
        {/* Logo Section */}
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

        {/* New Project Button */}
        <Button
          variant="primary"
          className={cn(
            "w-full py-3 rounded-md flex items-center justify-center gap-2",
            isCollapsed ? "px-0" : "px-3",
          )}
          onClick={onNewProject}
          aria-label="Novo Projeto"
        >
          <Plus className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
          {!isCollapsed && "Novo Projeto"}
        </Button>
      </div>

      <div
        className={cn(
          "flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-smooth sidebar-scrollbar",
          isCollapsed ? "px-0" : "px-6",
        )}
      >
        {/* Navigation Menu */}
        <nav className="flex flex-col gap-2">
          {menu.map((item) => (
            <Button
              key={item.key}
              variant={selected === item.key ? "primary" : "ghost"}
              className={cn(
                "w-full rounded-lg px-2 py-2 transition-all duration-200 hover:bg-surface-brand-low",
                isCollapsed ? "justify-center gap-0 px-0" : "justify-start",
                selected === item.key &&
                  "bg-surface-selected text-text-primary",
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

        {/* Project Section */}
        {project && !isCollapsed && (
          <div
            key={project.id}
            className="flex flex-col border-t border-border-default flex-1 mt-6"
          >
            {/* Project Header */}
            <div className="py-3 flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold leading-7 text-text-primary truncate flex-1">
                {project.title}
              </h3>
              <Button
                variant="ghost"
                className="h-10 w-10 p-0 text-text-secondary cursor-pointer hover:text-text-primary shrink-0"
                aria-label="Configurações do projeto"
              >
                <Settings2
                  className="h-6 w-6"
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
              </Button>
            </div>
            {/* Merge Requests List */}
            <div className="pb-3">
              <div className="flex flex-col gap-2">
                {project.mergeRequests.map((mr) => (
                  <button
                    key={mr.id}
                    type="button"
                    onClick={() => setSelectedMergeRequestId(mr.id)}
                    className={cn(
                      "rounded-lg p-4 transition-all duration-200 min-h-15 flex items-center gap-3 text-left cursor-pointer",
                      selectedMergeRequestId === mr.id
                        ? "bg-brand-primary text-text-brand shadow-sm"
                        : "bg-surface-sidebar text-text-primary hover:bg-surface-primary",
                    )}
                  >
                    <FileText
                      className={cn(
                        "h-4 w-4 shrink-0",
                        selectedMergeRequestId === mr.id
                          ? "text-text-brand"
                          : "text-text-secondary",
                      )}
                      aria-hidden="true"
                      strokeWidth={1.75}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm font-medium leading-5 truncate",
                          selectedMergeRequestId === mr.id
                            ? "text-text-brand"
                            : "text-text-primary",
                        )}
                      >
                        {mr.title}
                      </p>
                      <p
                        className={cn(
                          "text-xs leading-4 truncate",
                          selectedMergeRequestId === mr.id
                            ? "text-text-brand/80"
                            : "text-text-secondary",
                        )}
                      >
                        {mr.date}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer - User Info */}
      <div
        className={cn(
          "mt-auto",
          !isCollapsed && "p-6",
          isCollapsed && "px-2 py-2",
        )}
      >
        <Button
          variant="ghost"
          className={cn(
            "w-full overflow-hidden border border-border-default p-0 text-left transition-all duration-200 hover:bg-surface-subtle",
            selected === "account" && "bg-brand-primary border-brand-primary",
            isCollapsed
              ? "flex h-16 w-16 items-center justify-center rounded-full bg-surface-sidebar p-1"
              : "flex items-center gap-3 rounded-lg p-3",
          )}
          onClick={() => onSelect("account")}
          aria-current={selected === "account" ? "page" : undefined}
          aria-label={`Abrir conta de ${user.name}`}
        >
          <img
            src={user.avatarUrl}
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
      </div>
    </aside>
  );
};

export default Sidebar;
