import { cn } from "@/utils/cn";

interface SettingsSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  ariaLabel: string;
}

const SettingsSwitch = ({
  checked,
  onCheckedChange,
  ariaLabel,
}: SettingsSwitchProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
        checked ? "bg-brand-primary" : "bg-surface-subtle dark:bg-surface-subtle/80",
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute top-0.5 size-6 rounded-full bg-white shadow-input transition-[left] duration-200",
          checked ? "left-[1.375rem]" : "left-0.5",
        )}
      />
    </button>
  );
};

export default SettingsSwitch;
