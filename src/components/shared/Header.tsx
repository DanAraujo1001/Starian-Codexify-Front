import { type FC, type ReactNode } from "react";

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
      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
        <path
          d="M8 3.333v9.334M3.333 8h9.334"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-medium text-sm">Novo Projeto</span>
    </button>
  </header>
);

export default Header;
