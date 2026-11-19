import { onboardingQuestions, onboardingSteps, REVIEW_STEP_ID } from "@/config/onboardingFlow";
import {
  DONE_CURSOR,
  REVIEW_CURSOR,
  type Answers,
  type AnswerValue,
  type Cursor,
  type Question,
} from "@/types/onboarding";

export function getVisibleQuestions(answers: Answers): Question[] {
  return onboardingQuestions.filter((q) => !q.when || q.when(answers));
}

export function isAnswered(value: AnswerValue | undefined) {
  // String vazia é resposta válida para campos opcionais, então só undefined conta como "sem resposta".
  return value !== undefined;
}

/** Primeira pergunta visível sem resposta, ou a tela de revisão quando tudo está preenchido. */
export function getNextCursor(answers: Answers): Cursor {
  const pending = getVisibleQuestions(answers).find((q) => !isAnswered(answers[q.id]));
  return pending ? pending.id : REVIEW_CURSOR;
}

export function resolvePrompt(question: Question, answers: Answers) {
  return typeof question.prompt === "function" ? question.prompt(answers) : question.prompt;
}

export function formatAnswer(question: Question, value: AnswerValue | undefined): string {
  if (value === undefined) return "";
  if (question.type === "input") return value === "" ? "Sem complemento" : String(value);
  const values = Array.isArray(value) ? value : [value];
  return values
    .map((v) => question.options.find((o) => o.value === v)?.label ?? v)
    .join(", ");
}

export function getCurrentStepId(cursor: Cursor): string {
  if (cursor === REVIEW_CURSOR || cursor === DONE_CURSOR) return REVIEW_STEP_ID;
  return onboardingQuestions.find((q) => q.id === cursor)?.stepId ?? onboardingSteps[0].id;
}
