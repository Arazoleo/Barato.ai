"use client";

import { useState } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { OnboardingChat } from "./OnboardingChat";

/**
 * Alterna entre a tela inicial e o chat de credenciamento.
 * Começa na tela inicial; o botão "Fazer cadastro" abre a conversa.
 */
export function OnboardingExperience() {
  const [started, setStarted] = useState(false);

  if (!started) return <WelcomeScreen onStart={() => setStarted(true)} />;
  return <OnboardingChat />;
}
