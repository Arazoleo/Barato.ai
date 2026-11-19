"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { AnswerValue, MultiChoiceQuestion, SingleChoiceQuestion } from "@/types/onboarding";
import { Button } from "@/components/ui/Button";
import { ChoiceChip } from "./ChoiceChip";

interface ChoiceAnswerProps {
  question: SingleChoiceQuestion | MultiChoiceQuestion;
  initialValue?: AnswerValue;
  onSubmit: (value: AnswerValue) => void;
}

/** Seleção única envia ao clicar; seleção múltipla exige confirmação explícita. */
export function ChoiceAnswer({ question, initialValue, onSubmit }: ChoiceAnswerProps) {
  const multiple = question.type === "multi";
  const [selected, setSelected] = useState<string[]>(
    Array.isArray(initialValue) ? initialValue : initialValue ? [initialValue] : [],
  );
  const minSelections = question.type === "multi" ? (question.minSelections ?? 1) : 1;

  const toggle = (value: string) => {
    if (!multiple) {
      onSubmit(value);
      return;
    }
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  // Mantém a ordem definida na config, independentemente da ordem dos cliques.
  const orderedSelection = question.options
    .map((o) => o.value)
    .filter((v) => selected.includes(v));

  return (
    <div className="space-y-3">
      <div
        role={multiple ? "group" : "radiogroup"}
        aria-label={question.reviewLabel}
        className="flex flex-wrap gap-2"
      >
        {question.options.map((option) => (
          <ChoiceChip
            key={option.value}
            option={option}
            multiple={multiple}
            selected={selected.includes(option.value)}
            onClick={() => toggle(option.value)}
          />
        ))}
      </div>
      {multiple && (
        <Button
          onClick={() => onSubmit(orderedSelection)}
          disabled={orderedSelection.length < minSelections}
        >
          Confirmar
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      )}
    </div>
  );
}
