import type { ReactNode } from "react";

interface SettingsRowProps {
  label: string;
  description: string;
  children: ReactNode;
}

const SettingsRow = ({ label, description, children }: SettingsRowProps) => {
  return (
    <div className="flex flex-col gap-4 border-b border-border-default py-5 last:border-b-0 last:pb-0 first:pt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0 flex-1 sm:max-w-xl">
        <p className="font-semibold text-text-primary">{label}</p>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      </div>
      <div className="shrink-0 sm:flex sm:min-w-[12rem] sm:justify-end">
        {children}
      </div>
    </div>
  );
};

export default SettingsRow;
