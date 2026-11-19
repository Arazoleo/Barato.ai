"use client";

import { useEffect, useRef } from "react";
import { PartyPopper, RotateCcw } from "lucide-react";
import { onboardingSteps } from "@/config/onboardingFlow";
import { useOnboardingFlow } from "@/hooks/useOnboardingFlow";
import { formatAnswer, getCurrentStepId, resolvePrompt } from "@/lib/flow";
import { AssistantMessage } from "@/components/chat/AssistantMessage";
import { UserMessage } from "@/components/chat/UserMessage";
import { ChoiceAnswer } from "@/components/chat/ChoiceAnswer";
import { Composer } from "@/components/chat/Composer";
import { Button } from "@/components/ui/Button";
import { StepProgress } from "./StepProgress";
import { ReviewSummary } from "./ReviewSummary";

export function OnboardingChat() {
  const flow = useOnboardingFlow();
  const { answers, currentQuestion } = flow;
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [flow.cursor]);

  const restaurantName = typeof answers.nomeFantasia === "string" ? answers.nomeFantasia : "";
  const inputQuestion = currentQuestion?.type === "input" ? currentQuestion : undefined;
  const composerHint = flow.isReviewing
    ? "Revise suas respostas acima"
    : flow.isDone
      ? "Credenciamento concluído"
      : "Selecione uma opção acima";

  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col gap-3 sm:gap-4">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
        <header className="shrink-0 space-y-5 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
              Bem-vindo(a) ao <span className="text-accent-500">Grupo Barato.ai</span>!
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Vamos credenciar seu negócio em alguns passos. Assim, você automatiza suas cotações
              e encontra as melhores ofertas.
            </p>
          </div>
          <StepProgress
            steps={onboardingSteps}
            currentStepId={getCurrentStepId(flow.cursor)}
            finished={flow.isDone}
          />
        </header>

        <section
          aria-label="Conversa de credenciamento"
          aria-live="polite"
          className="-mx-2 min-h-0 flex-1 space-y-5 overflow-y-auto px-2 py-2"
        >
          {flow.history.map((q) => (
            <div key={q.id} className="space-y-5">
              <AssistantMessage text={resolvePrompt(q, answers)} />
              <UserMessage
                text={formatAnswer(q, answers[q.id])}
                onEdit={flow.isDone ? undefined : () => flow.edit(q.id)}
              />
            </div>
          ))}

          {currentQuestion && (
            <AssistantMessage
              key={currentQuestion.id}
              text={resolvePrompt(currentQuestion, answers)}
              helper={currentQuestion.helper}
            >
              {currentQuestion.type !== "input" && (
                <ChoiceAnswer
                  question={currentQuestion}
                  initialValue={answers[currentQuestion.id]}
                  onSubmit={(value) => flow.answer(currentQuestion.id, value)}
                />
              )}
            </AssistantMessage>
          )}

          {flow.isReviewing && (
            <AssistantMessage
              text={`Pronto! Confira os dados${restaurantName ? ` do ${restaurantName}` : ""} antes de concluir. Você pode editar qualquer resposta.`}
            >
              <ReviewSummary
                questions={flow.visibleQuestions}
                answers={answers}
                onEdit={flow.edit}
                onConfirm={flow.complete}
              />
            </AssistantMessage>
          )}

          {flow.isDone && (
            <AssistantMessage text="Credenciamento concluído! Seus dados foram registrados. Em breve você poderá cadastrar produtos e configurar suas cotações.">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-xl bg-accent-50 px-3 py-2 text-sm font-medium text-accent-600">
                  <PartyPopper className="size-4" aria-hidden />
                  Tudo certo por aqui
                </span>
                <Button variant="ghost" onClick={flow.restart}>
                  <RotateCcw className="size-4" aria-hidden />
                  Começar novo cadastro
                </Button>
              </div>
            </AssistantMessage>
          )}
          <div ref={bottomRef} />
        </section>
      </div>

      <Composer
        key={flow.cursor}
        question={inputQuestion}
        initialValue={
          inputQuestion && typeof answers[inputQuestion.id] === "string"
            ? (answers[inputQuestion.id] as string)
            : ""
        }
        disabledHint={composerHint}
        canGoBack={flow.canGoBack}
        onBack={flow.back}
        onSubmit={(value) => inputQuestion && flow.answer(inputQuestion.id, value)}
      />
    </div>
  );
}
