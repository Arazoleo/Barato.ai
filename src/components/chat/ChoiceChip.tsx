import { Check } from "lucide-react";
import type { ChoiceOption } from "@/types/onboarding";
import { cn } from "@/lib/cn";

interface ChoiceChipProps {
  option: ChoiceOption;
  selected: boolean;
  multiple: boolean;
  onClick: () => void;
}

export function ChoiceChip({ option, selected, multiple, onClick }: ChoiceChipProps) {
  const Icon = selected && multiple ? Check : option.icon;
  return (
    <button
      type="button"
      role={multiple ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors",
        "focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 focus-visible:outline-none",
        selected
          ? "border-brand-500 bg-brand-50 text-brand-700"
          : "border-slate-200 bg-white text-navy-900 hover:border-brand-200 hover:bg-brand-50/50",
      )}
    >
      {Icon && <Icon className="size-4" aria-hidden />}
      {option.label}
    </button>
  );
}
