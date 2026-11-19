import type { FieldFormat, InputQuestion } from "@/types/onboarding";

const onlyDigits = (value: string) => value.replace(/\D/g, "");

function maskCnpj(value: string) {
  const d = onlyDigits(value).slice(0, 14);
  return d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function maskPhone(value: string) {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function maskCep(value: string) {
  const d = onlyDigits(value).slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
}

/** Valida os dígitos verificadores do CNPJ (algoritmo da Receita Federal). */
function isValidCnpj(value: string) {
  const d = onlyDigits(value);
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false;
  const checkDigit = (base: string) => {
    const weights = base.length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = base.split("").reduce((acc, n, i) => acc + Number(n) * weights[i], 0);
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };
  const first = checkDigit(d.slice(0, 12));
  const second = checkDigit(d.slice(0, 12) + first);
  return d.endsWith(`${first}${second}`);
}

const UFS = new Set([
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
  "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
]);

interface FormatSpec {
  mask?: (value: string) => string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  inputType?: "text" | "email" | "tel";
  autoComplete?: string;
  /** Retorna uma mensagem de erro, ou null se o valor for válido. */
  validate: (value: string, question: InputQuestion) => string | null;
}

export const fieldFormats: Record<FieldFormat, FormatSpec> = {
  text: {
    validate: (v) => (v.trim().length < 2 ? "Digite pelo menos 2 caracteres." : null),
  },
  email: {
    inputType: "email",
    inputMode: "email",
    autoComplete: "email",
    validate: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : "Informe um e-mail válido.",
  },
  phone: {
    mask: maskPhone,
    inputType: "tel",
    inputMode: "tel",
    autoComplete: "tel",
    validate: (v) =>
      onlyDigits(v).length >= 10 ? null : "Informe o telefone com DDD.",
  },
  cnpj: {
    mask: maskCnpj,
    inputMode: "numeric",
    validate: (v) => (isValidCnpj(v) ? null : "CNPJ inválido. Confira os números."),
  },
  cep: {
    mask: maskCep,
    inputMode: "numeric",
    autoComplete: "postal-code",
    validate: (v) => (onlyDigits(v).length === 8 ? null : "O CEP deve ter 8 dígitos."),
  },
  uf: {
    mask: (v) => v.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase(),
    validate: (v) => (UFS.has(v) ? null : "Informe uma UF válida, como SP ou RJ."),
  },
  integer: {
    mask: (v) => onlyDigits(v).slice(0, 7),
    inputMode: "numeric",
    validate: (v, q) => {
      const n = Number(v);
      if (!v || Number.isNaN(n)) return "Informe um número.";
      if (q.min !== undefined && n < q.min) return `O valor mínimo é ${q.min}.`;
      if (q.max !== undefined && n > q.max) return `O valor máximo é ${q.max}.`;
      return null;
    },
  },
};

export function validateInput(question: InputQuestion, value: string): string | null {
  if (!value.trim()) return question.optional ? null : "Este campo é obrigatório.";
  return fieldFormats[question.format].validate(value, question);
}
