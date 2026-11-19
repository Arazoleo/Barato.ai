"use client";

import { ArrowRight, Clock, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** Benefícios destacados na tela inicial, antes de iniciar o cadastro. */
const beneficios = [
  { icon: Zap, title: "Economia real", subtitle: "em cada cotação" },
  { icon: Clock, title: "Mais tempo", subtitle: "para o que importa" },
  { icon: ShieldCheck, title: "Compras seguras", subtitle: "com aprovação humana" },
];

interface WelcomeScreenProps {
  /** Chamado quando o usuário clica em "Fazer cadastro" para abrir o chat. */
  onStart: () => void;
}

/**
 * Tela inicial (landing) exibida antes do credenciamento.
 * Apresenta o produto e um único botão que inicia a conversa de cadastro.
 */
export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="grid h-full place-items-center">
      <div className="mx-auto max-w-xl px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          Assistente de compras com IA
        </span>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
          Compras mais inteligentes para o seu <span className="text-accent-500">negócio</span>
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm text-slate-600 sm:text-base">
          O Grupo Barato.ai automatiza suas cotações, compara fornecedores e encontra as melhores
          ofertas. Para começar, vamos credenciar o seu negócio em alguns passos.
        </p>

        <div className="mt-8 flex justify-center">
          <Button onClick={onStart} className="px-6 py-3 text-base">
            Fazer cadastro
            <ArrowRight className="size-5" aria-hidden />
          </Button>
        </div>

        <ul className="mx-auto mt-12 grid max-w-lg gap-5 sm:grid-cols-3">
          {beneficios.map(({ icon: Icon, title, subtitle }) => (
            <li key={title} className="flex flex-col items-center gap-2">
              <span className="grid size-12 place-items-center rounded-full bg-accent-50 text-accent-500">
                <Icon className="size-6" aria-hidden />
              </span>
              <p className="text-xs text-slate-600">
                <span className="block text-sm font-semibold text-navy-900">{title}</span>
                {subtitle}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
