import { Check } from "lucide-react";
import type { StepDefinition } from "@/types/onboarding";
import { cn } from "@/lib/cn";

interface StepProgressProps {
  steps: StepDefinition[];
  currentStepId: string;
  /** Quando true, todas as etapas aparecem como concluídas. */
  finished?: boolean;
}

export function StepProgress({ steps, currentStepId, finished = false }: StepProgressProps) {
  const currentIndex = finished ? steps.length : steps.findIndex((s) => s.id === currentStepId);

  return (
    <ol className="flex w-full items-start" aria-label="Etapas do credenciamento">
      {steps.map((step, index) => {
        const done = index < currentIndex;
        const current = index === currentIndex;
        return (
          <li key={step.id} className="relative flex flex-1 flex-col items-center gap-2">
            {index > 0 && (
              <span
                aria-hidden
                className={cn(
                  "absolute top-4 right-1/2 h-0.5 w-full -translate-y-1/2",
                  index <= currentIndex ? "bg-brand-600" : "bg-slate-200",
                )}
              />
            )}
            <span
              aria-current={current ? "step" : undefined}
              className={cn(
                "relative z-10 grid size-8 place-items-center rounded-full border-2 text-sm font-semibold transition-colors",
                done && "border-brand-600 bg-brand-600 text-white",
                current && "border-brand-600 bg-brand-600 text-white ring-4 ring-brand-100",
                !done && !current && "border-slate-200 bg-white text-slate-500",
              )}
            >
              {done ? <Check className="size-4" aria-label="Concluída" /> : index + 1}
            </span>
            <span
              className={cn(
                "text-center text-[11px] sm:text-xs",
                current ? "font-semibold text-navy-900" : "text-slate-500",
                !current && "hidden sm:block",
              )}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
