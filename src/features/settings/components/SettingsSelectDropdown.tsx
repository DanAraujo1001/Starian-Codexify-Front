import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

export interface SettingsSelectOption {
  value: string;
  label: string;
}

interface SettingsSelectDropdownProps {
  value: string;
  options: ReadonlyArray<SettingsSelectOption>;
  onChange: (value: string) => void;
  ariaLabel: string;
  listboxId: string;
}

const SettingsSelectDropdown = ({
  value,
  options,
  onChange,
  ariaLabel,
  listboxId,
}: SettingsSelectDropdownProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const node = rootRef.current;
      if (node && !node.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative w-full sm:w-auto sm:min-w-[11rem]">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-md border border-border-default bg-surface-primary px-3 py-2 text-left text-sm font-medium text-text-primary transition-all duration-200",
          "hover:bg-surface-subtle/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
        )}
      >
        <span className="truncate">{selected?.label}</span>
        <ChevronRight
          className={cn(
            "size-4 shrink-0 text-text-secondary transition-transform duration-200",
            open && "rotate-90",
          )}
          aria-hidden="true"
          strokeWidth={2}
        />
      </button>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute right-0 z-30 mt-1 w-full min-w-[11rem] overflow-hidden rounded-md border border-border-default bg-surface-primary py-1 shadow-card sm:left-auto sm:right-0"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full px-3 py-2 text-left text-sm text-text-primary transition-all duration-200",
                    "hover:bg-surface-subtle/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary",
                    isSelected && "bg-surface-subtle/80 font-medium",
                  )}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default SettingsSelectDropdown;
