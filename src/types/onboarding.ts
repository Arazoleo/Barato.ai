import type { LucideIcon } from "lucide-react";

/** Resposta de seleção única é string; de seleção múltipla é array de strings. */
export type AnswerValue = string | string[];
export type Answers = Record<string, AnswerValue | undefined>;

export type FieldFormat =
  | "text"
  | "email"
  | "phone"
  | "cnpj"
  | "cep"
  | "uf"
  | "integer";

export interface StepDefinition {
  id: string;
  label: string;
}

export interface ChoiceOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface QuestionBase {
  id: string;
  stepId: string;
  /** Texto exibido pelo assistente. Pode depender das respostas anteriores. */
  prompt: string | ((answers: Answers) => string);
  helper?: string;
  /** Rótulo usado na tela de revisão. */
  reviewLabel: string;
  optional?: boolean;
  /** Quando definido, a pergunta só é feita se retornar true. */
  when?: (answers: Answers) => boolean;
}

export interface InputQuestion extends QuestionBase {
  type: "input";
  format: FieldFormat;
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface SingleChoiceQuestion extends QuestionBase {
  type: "single";
  options: ChoiceOption[];
}

export interface MultiChoiceQuestion extends QuestionBase {
  type: "multi";
  options: ChoiceOption[];
  minSelections?: number;
}

export type Question = InputQuestion | SingleChoiceQuestion | MultiChoiceQuestion;

/** Cursores especiais: revisão (tudo respondido) e conclusão do credenciamento. */
export const REVIEW_CURSOR = "__review__";
export const DONE_CURSOR = "__done__";
export type Cursor = string;
