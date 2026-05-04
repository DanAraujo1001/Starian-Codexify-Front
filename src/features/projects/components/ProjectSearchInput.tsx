import { cn } from "@/utils/cn";
import type { FC, InputHTMLAttributes } from "react";

const ProjectSearchInput: FC<InputHTMLAttributes<HTMLInputElement>> = (
  props,
) => {
  const { className, placeholder, ...rest } = props;
  const placeholderValue = placeholder ?? "Qual regra você procura?";
  const ariaLabelValue = (rest as { "aria-label"?: string })["aria-label"] ?? "Buscar regra";

  return (
    <div className="relative h-12 w-2xl">
      <input
        {...rest}
        className={cn(
          "bg-surface-primary border border-border-default rounded-md shadow-input pl-3 pr-10 py-1.5 w-full h-full text-sm text-text-secondary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-200 hover:border-brand-primary hover:shadow-input-hover",
          className,
        )}
        placeholder={placeholderValue}
        aria-label={ariaLabelValue}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
        <path
          d="M17 17l-3-3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  </div>
  );
};

export default ProjectSearchInput;
