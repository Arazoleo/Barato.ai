import { Bot } from "lucide-react";

interface AssistantMessageProps {
  text: string;
  helper?: string;
  /** Controles de resposta (ex: chips de opção) renderizados abaixo do balão. */
  children?: React.ReactNode;
}

export function AssistantMessage({ text, helper, children }: AssistantMessageProps) {
  return (
    <div className="flex animate-message-in items-start gap-3">
      <span
        aria-hidden
        className="relative grid size-10 shrink-0 place-items-center rounded-full bg-navy-900 text-white shadow-sm"
      >
        <Bot className="size-5" />
        <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-accent-500 ring-2 ring-white" />
      </span>
      <div className="min-w-0 max-w-xl space-y-3">
        <div className="rounded-2xl rounded-tl-md bg-slate-100 px-4 py-3 text-sm leading-relaxed text-navy-900">
          <p>{text}</p>
          {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
