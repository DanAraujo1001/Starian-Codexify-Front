import { type FC, type ReactNode } from "react";
import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";

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
  const handleNewProject = onNewProject ?? (() => alert("Novo Projeto"));

  return (
    <div className="flex h-screen w-screen bg-surface-primary">
      <Sidebar
        user={mockUser}
        selected={selected}
        onSelect={onSelect}
        onNewProject={handleNewProject}
      />
      <div className="flex-1 flex flex-col">
        <Header onNewProject={handleNewProject} />
        <main className="flex-1 flex flex-col items-center py-8 overflow-y-auto gap-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
