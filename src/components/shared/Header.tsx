import { type FC, type ReactNode } from "react";
import { Plus } from "lucide-react";

interface HeaderProps {
  children?: ReactNode;
  onNewProject: () => void;
}

const Header: FC<HeaderProps> = ({ children, onNewProject }) => (
  <header className="flex items-center justify-end w-full h-24.25 border-b border-border-default px-27.5">
    {children}
    <button
      className="flex items-center gap-2 bg-brand-primary text-text-brand rounded-md px-3 h-9 transition-colors duration-200 hover:bg-brand-hover"
      onClick={onNewProject}
    >
      <Plus className="w-4 h-4" aria-hidden="true" strokeWidth={1.75} />
      <span className="font-medium text-sm">Novo Projeto</span>
    </button>
  </header>
);

export default Header;
