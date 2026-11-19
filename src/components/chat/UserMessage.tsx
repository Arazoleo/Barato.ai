import { Pencil, UserRound } from "lucide-react";

interface UserMessageProps {
  text: string;
  onEdit?: () => void;
}

export function UserMessage({ text, onEdit }: UserMessageProps) {
  return (
    <div className="group flex animate-message-in items-start justify-end gap-3">
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="mt-2 flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-500 opacity-100 transition hover:bg-slate-100 hover:text-brand-600 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <Pencil className="size-3" aria-hidden />
          Editar
        </button>
      )}
      <p className="max-w-md rounded-2xl rounded-tr-md bg-brand-100 px-4 py-2.5 text-sm font-medium break-words text-navy-900">
        {text}
      </p>
      <span
        aria-hidden
        className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600"
      >
        <UserRound className="size-5" />
      </span>
    </div>
  );
}
