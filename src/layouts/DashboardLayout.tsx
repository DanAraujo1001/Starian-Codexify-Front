import { type FC, type ReactNode, useState } from "react";
import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

const mockUser = {
  name: "Jorge Silva",
  email: "jorge@email.com",
  avatarUrl: "/assets/avatar-jorge.png",
};

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [selected, setSelected] = useState("home");
  return (
    <div className="flex h-screen w-screen bg-surface-primary">
      <Sidebar
        user={mockUser}
        selected={selected}
        onSelect={setSelected}
        onNewProject={() => alert("Novo Projeto")}
      />
      <div className="flex-1 flex flex-col">
        <Header onNewProject={() => alert("Novo Projeto")} />
        <main className="flex-1 flex flex-col items-center py-8 overflow-y-auto gap-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
