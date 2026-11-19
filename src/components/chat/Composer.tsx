"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, SendHorizontal } from "lucide-react";
import type { InputQuestion } from "@/types/onboarding";
import { fieldFormats, validateInput } from "@/lib/fieldFormats";
import { cn } from "@/lib/cn";

interface ComposerProps {
  /** Pergunta de texto a responder, ou undefined quando a etapa usa controles inline. */
  question?: InputQuestion;
  initialValue?: string;
  disabledHint: string;
  canGoBack: boolean;
  onBack: () => void;
  onSubmit: (value: string) => void;
}

export function Composer({
  question,
  initialValue = "",
  disabledHint,
  canGoBack,
  onBack,
  onSubmit,
}: ComposerProps) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const format = question ? fieldFormats[question.format] : undefined;

  useEffect(() => {
    if (question) inputRef.current?.focus();
  }, [question]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!question) return;
    const trimmed = value.trim();
    const validationError = validateInput(question, trimmed);
    setError(validationError);
    if (!validationError) onSubmit(trimmed);
  };

  const errorId = question ? `${question.id}-error` : undefined;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-1.5">
      <div
        className={cn(
          "flex items-center gap-2 rounded-2xl border bg-white p-2 pl-3 shadow-sm transition-colors",
          error ? "border-red-300" : "border-slate-200 focus-within:border-brand-500",
        )}
      >
        <button
          type="button"
          onClick={onBack}
          disabled={!canGoBack}
          aria-label="Voltar para a pergunta anterior"
          title="Voltar"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-navy-900 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ArrowLeft className="size-5" />
        </button>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => {
            setValue(format?.mask ? format.mask(e.target.value) : e.target.value);
            if (error) setError(null);
          }}
          disabled={!question}
          type={format?.inputType ?? "text"}
          inputMode={format?.inputMode}
          autoComplete={format?.autoComplete ?? "off"}
          placeholder={question ? (question.placeholder ?? "Digite sua resposta") : disabledHint}
          aria-label={question?.reviewLabel ?? disabledHint}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-navy-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!question}
          aria-label="Enviar resposta"
          className="grid size-10 place-items-center rounded-xl bg-brand-600 text-white transition-colors hover:bg-brand-700 disabled:bg-brand-200"
        >
          <SendHorizontal className="size-5" />
        </button>
      </div>
      {error && (
        <p id={errorId} role="alert" className="px-3 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}
