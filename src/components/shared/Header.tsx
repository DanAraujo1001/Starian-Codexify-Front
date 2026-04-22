import { type FC, type ReactNode } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";

interface HeaderProps {
  children?: ReactNode;
  onNewProject: () => void;
}

const Header: FC<HeaderProps> = ({ children, onNewProject }) => (
  <header className="flex items-center justify-end w-full h-24.25 border-b border-border-default px-27.5">
    {children}
    <Button className="h-9 px-3" onClick={onNewProject}>
      <Plus className="w-4 h-4" aria-hidden="true" strokeWidth={1.75} />
      <span className="font-medium text-sm">Novo Projeto</span>
    </Button>
  </header>
);

export default Header;
