import { type FC, type ReactNode, useState } from "react";
import Sidebar from "@/components/shared/Sidebar";
import { cn } from "@/utils/cn";

interface DashboardLayoutProps {
  children: ReactNode;
  selected: string;
  onSelect: (section: string) => void;
  onNewProject?: () => void;
}

const mockUser = {
  name: "Jorge Silva",
  email: "jorge@email.com",
  avatarUrl: "/assets/avatar-jorge.png",
};

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  selected,
  onSelect,
  onNewProject,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleNewProject = onNewProject ?? (() => alert("Novo Projeto"));

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-surface-primary p-6 box-border">
      <Sidebar
        user={mockUser}
        selected={selected}
        onSelect={onSelect}
        onNewProject={handleNewProject}
        isCollapsed={isCollapsed}
        onIsCollapsedChange={setIsCollapsed}
      />
      <div
        className={cn(
          "min-h-[calc(100vh-3rem)] transition-[padding-left] duration-200",
          isCollapsed ? "pl-[5.525rem]" : "pl-[16.9469rem]",
        )}
      >
        <main className="flex min-h-[calc(100vh-3rem)] flex-col items-center gap-8 py-8 overflow-y-auto px-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
