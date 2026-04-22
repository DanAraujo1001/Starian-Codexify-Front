import { type FC } from "react";
import {
  CircleHelp,
  FileText,
  Home,
  PieChart,
  Settings,
  type LucideIcon,
} from "lucide-react";
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
}) => (
  <aside className="bg-surface-primary border-r border-border-default flex flex-col justify-between w-79.75 h-full p-6">
    <div>
      <div className="flex items-center gap-2 h-16 mb-6">
        <div className="bg-brand-primary rounded-md w-8 h-8 flex items-center justify-center">
          <img src="/assets/sidebar-logo.svg" alt="Logo" className="w-4 h-4" />
        </div>
        <span className="font-medium text-lg text-text-primary font-sans">
          Codexify
        </span>
      </div>
      <nav className="flex flex-col gap-2 mb-6">
        {menu.map((item) => (
          <button
            key={item.key}
            className={cn(
              "flex items-center gap-2 px-2 py-2 rounded transition-all duration-200",
              selected === item.key
                ? "bg-brand-primary text-text-brand"
                : "hover:bg-surface-subtle text-text-primary",
            )}
            onClick={() => onSelect(item.key)}
            aria-current={selected === item.key ? "page" : undefined}
          >
            <item.icon
              className="w-4 h-4"
              aria-hidden="true"
              strokeWidth={1.75}
            />
            <span className="text-sm font-sans font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <button
        className="bg-brand-primary text-text-brand w-full py-3 rounded-md font-medium text-sm mt-2 transition-colors duration-200 hover:bg-brand-hover"
        onClick={onNewProject}
      >
        Novo Projeto
      </button>
    </div>
    <div className="border border-border-default rounded-md flex items-center gap-3 p-3 mt-6">
      <img
        src={user.avatarUrl}
        alt={user.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <div className="text-sm font-sans font-normal text-text-primary">
          {user.name}
        </div>
        <div className="text-xs font-sans text-text-secondary">
          {user.email}
        </div>
      </div>
    </div>
  </aside>
);

export default Sidebar;
