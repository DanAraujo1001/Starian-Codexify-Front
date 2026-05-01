import { type ButtonHTMLAttributes, type FC } from "react";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  className,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-brand-primary text-text-brand hover:bg-brand-hover",
        variant === "secondary" &&
          "border border-border-default bg-surface-primary text-text-primary hover:bg-surface-subtle",
        variant === "ghost" &&
          "bg-transparent text-text-primary hover:bg-surface-subtle",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
