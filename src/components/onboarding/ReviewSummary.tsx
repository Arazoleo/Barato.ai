import { CheckCircle2, Pencil } from "lucide-react";
import { onboardingSteps } from "@/config/onboardingFlow";
import { formatAnswer } from "@/lib/flow";
import type { Answers, Question } from "@/types/onboarding";
import { Button } from "@/components/ui/Button";

interface ReviewSummaryProps {
  questions: Question[];
  answers: Answers;
  onEdit: (questionId: string) => void;
  onConfirm: () => void;
}

export function ReviewSummary({ questions, answers, onEdit, onConfirm }: ReviewSummaryProps) {
  const groups = onboardingSteps
    .map((step) => ({ step, items: questions.filter((q) => q.stepId === step.id) }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      {groups.map(({ step, items }) => (
        <section key={step.id}>
          <h3 className="mb-2 text-xs font-semibold tracking-wide text-brand-600 uppercase">
            {step.label}
          </h3>
          <dl className="divide-y divide-slate-100">
            {items.map((q) => (
              <div key={q.id} className="flex items-center gap-3 py-2">
                <dt className="w-2/5 shrink-0 text-xs text-slate-500">{q.reviewLabel}</dt>
                <dd className="min-w-0 flex-1 text-sm font-medium break-words text-navy-900">
                  {formatAnswer(q, answers[q.id])}
                </dd>
                <button
                  type="button"
                  onClick={() => onEdit(q.id)}
                  aria-label={`Editar ${q.reviewLabel}`}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-brand-50 hover:text-brand-600"
                >
                  <Pencil className="size-3.5" />
                </button>
              </div>
            ))}
          </dl>
        </section>
      ))}
      <Button onClick={onConfirm} className="w-full sm:w-auto">
        <CheckCircle2 className="size-4" aria-hidden />
        Confirmar credenciamento
      </Button>
    </div>
  );
}
