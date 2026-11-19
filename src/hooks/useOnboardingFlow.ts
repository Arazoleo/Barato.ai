"use client";

import { useEffect, useReducer } from "react";
import { onboardingQuestions } from "@/config/onboardingFlow";
import { getNextCursor, getVisibleQuestions } from "@/lib/flow";
import {
  DONE_CURSOR,
  REVIEW_CURSOR,
  type Answers,
  type AnswerValue,
  type Cursor,
} from "@/types/onboarding";

const STORAGE_KEY = "barato.onboarding.v1";

interface FlowState {
  answers: Answers;
  cursor: Cursor;
}

type FlowAction =
  | { type: "answer"; questionId: string; value: AnswerValue }
  | { type: "edit"; questionId: string }
  | { type: "back" }
  | { type: "complete" }
  | { type: "restart" }
  | { type: "hydrate"; state: FlowState };

const initialState: FlowState = {
  answers: {},
  cursor: onboardingQuestions[0].id,
};

function reducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case "answer": {
      const merged = { ...state.answers, [action.questionId]: action.value };
      // Descarta respostas de perguntas que deixaram de ser visíveis (ex: trocar o tipo de conta),
      // evitando guardar dados órfãos no estado e no localStorage.
      const answers = Object.fromEntries(
        getVisibleQuestions(merged).map((q) => [q.id, merged[q.id]]),
      );
      return { answers, cursor: getNextCursor(answers) };
    }
    case "edit":
      return { ...state, cursor: action.questionId };
    case "back": {
      const visible = getVisibleQuestions(state.answers);
      const index =
        state.cursor === REVIEW_CURSOR
          ? visible.length
          : visible.findIndex((q) => q.id === state.cursor);
      return index > 0 ? { ...state, cursor: visible[index - 1].id } : state;
    }
    case "complete":
      return { ...state, cursor: DONE_CURSOR };
    case "restart":
      return initialState;
    case "hydrate":
      return action.state;
  }
}

export function useOnboardingFlow() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Restaura o progresso após a montagem (localStorage não existe durante o SSR).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: "hydrate", state: JSON.parse(saved) as FlowState });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // O estado inicial intocado nunca é salvo, então o primeiro render não sobrescreve o progresso gravado.
  useEffect(() => {
    if (state !== initialState) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const visibleQuestions = getVisibleQuestions(state.answers);
  const atReviewOrDone = state.cursor === REVIEW_CURSOR || state.cursor === DONE_CURSOR;
  const cursorIndex = atReviewOrDone
    ? visibleQuestions.length
    : visibleQuestions.findIndex((q) => q.id === state.cursor);

  return {
    answers: state.answers,
    cursor: state.cursor,
    visibleQuestions,
    // Perguntas já respondidas, exibidas acima da pergunta ativa.
    history: visibleQuestions.slice(0, cursorIndex),
    currentQuestion: visibleQuestions[cursorIndex],
    isReviewing: state.cursor === REVIEW_CURSOR,
    isDone: state.cursor === DONE_CURSOR,
    canGoBack: cursorIndex > 0 && state.cursor !== DONE_CURSOR,
    answer: (questionId: string, value: AnswerValue) =>
      dispatch({ type: "answer", questionId, value }),
    edit: (questionId: string) => dispatch({ type: "edit", questionId }),
    back: () => dispatch({ type: "back" }),
    complete: () => dispatch({ type: "complete" }),
    restart: () => {
      localStorage.removeItem(STORAGE_KEY);
      dispatch({ type: "restart" });
    },
  };
}
