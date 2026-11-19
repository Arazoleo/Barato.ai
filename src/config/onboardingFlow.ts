import {
  Beef,
  CakeSlice,
  Coffee,
  Fish,
  Leaf,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Pizza,
  Sandwich,
  Store,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import type { Question, StepDefinition } from "@/types/onboarding";

/**
 * Fonte única de verdade do fluxo de credenciamento.
 * Para adicionar uma pergunta, inclua um item aqui com um stepId existente (ou novo).
 * A ordem neste array é a ordem em que as perguntas são feitas.
 */
export const onboardingSteps: StepDefinition[] = [
  { id: "conta", label: "Tipo de conta" },
  { id: "restaurante", label: "Seu negócio" },
  { id: "endereco", label: "Endereço" },
  { id: "responsavel", label: "Responsável" },
  { id: "operacao", label: "Operação" },
  { id: "revisao", label: "Revisão" },
];

export const REVIEW_STEP_ID = "revisao";

/** Termo do negócio conforme o tipo de conta escolhido, usado nos enunciados. */
function termoNegocio(answers: { tipoConta?: unknown }): string {
  return answers.tipoConta === "fornecedor" ? "fornecedor" : "restaurante";
}

function ehFornecedor(answers: { tipoConta?: unknown }): boolean {
  return answers.tipoConta === "fornecedor";
}

const weekDays = [
  { value: "seg", label: "Seg" },
  { value: "ter", label: "Ter" },
  { value: "qua", label: "Qua" },
  { value: "qui", label: "Qui" },
  { value: "sex", label: "Sex" },
  { value: "sab", label: "Sáb" },
  { value: "dom", label: "Dom" },
];

export const onboardingQuestions: Question[] = [
  // Tipo de conta
  {
    id: "tipoConta",
    stepId: "conta",
    type: "single",
    prompt:
      "Olá! Sou o assistente do Grupo Barato.ai 👋 Para começar, você está cadastrando um restaurante ou um fornecedor?",
    reviewLabel: "Tipo de conta",
    options: [
      { value: "restaurante", label: "Sou um restaurante", icon: Store },
      { value: "fornecedor", label: "Sou um fornecedor", icon: Truck },
    ],
  },

  // Seu negócio
  {
    id: "nomeFantasia",
    stepId: "restaurante",
    type: "input",
    format: "text",
    prompt: (a) =>
      ehFornecedor(a)
        ? "Perfeito! Qual é o nome do seu negócio como fornecedor?"
        : "Perfeito! Qual é o nome do seu estabelecimento?",
    placeholder: "Ex: Cantina da Vila",
    reviewLabel: "Nome do estabelecimento",
  },
  {
    id: "razaoSocial",
    stepId: "restaurante",
    type: "input",
    format: "text",
    prompt: (a) => `Prazer, ${a.nomeFantasia}! Qual é a razão social da empresa?`,
    helper: "Exatamente como consta no cartão CNPJ.",
    placeholder: "Ex: Cantina da Vila Alimentos LTDA",
    reviewLabel: "Razão social",
  },
  {
    id: "cnpj",
    stepId: "restaurante",
    type: "input",
    format: "cnpj",
    prompt: (a) => `Agora, informe o CNPJ do ${termoNegocio(a)}.`,
    placeholder: "00.000.000/0000-00",
    reviewLabel: "CNPJ",
  },
  {
    id: "tipoCulinaria",
    stepId: "restaurante",
    type: "single",
    prompt: "Ótimo! E qual é o tipo de culinária do seu restaurante?",
    reviewLabel: "Tipo de culinária",
    when: (a) => !ehFornecedor(a),
    options: [
      { value: "italiana", label: "Italiana", icon: Pizza },
      { value: "brasileira", label: "Brasileira", icon: UtensilsCrossed },
      { value: "japonesa", label: "Japonesa", icon: Fish },
      { value: "churrascaria", label: "Churrascaria", icon: Beef },
      { value: "lanches", label: "Lanches", icon: Sandwich },
      { value: "vegetariana", label: "Vegetariana", icon: Leaf },
      { value: "cafeteria", label: "Cafeteria", icon: Coffee },
      { value: "doceria", label: "Doceria", icon: CakeSlice },
      { value: "outros", label: "Outros", icon: MoreHorizontal },
    ],
  },
  {
    id: "tipoCulinariaOutro",
    stepId: "restaurante",
    type: "input",
    format: "text",
    prompt: "Entendi. Como você descreveria a culinária do seu restaurante?",
    placeholder: "Ex: Árabe, Peruana, Frutos do mar...",
    reviewLabel: "Culinária (outros)",
    when: (a) => a.tipoCulinaria === "outros",
  },

  // Endereço
  {
    id: "cep",
    stepId: "endereco",
    type: "input",
    format: "cep",
    prompt:
      "Vamos ao endereço. Ele é usado para encontrar fornecedores que atendem a sua região. Qual é o CEP?",
    placeholder: "00000-000",
    reviewLabel: "CEP",
  },
  {
    id: "logradouro",
    stepId: "endereco",
    type: "input",
    format: "text",
    prompt: "Qual é a rua ou avenida?",
    placeholder: "Ex: Rua das Flores",
    reviewLabel: "Logradouro",
  },
  {
    id: "numero",
    stepId: "endereco",
    type: "input",
    format: "text",
    prompt: "E o número?",
    placeholder: "Ex: 123",
    reviewLabel: "Número",
  },
  {
    id: "complemento",
    stepId: "endereco",
    type: "input",
    format: "text",
    optional: true,
    prompt: "Tem algum complemento?",
    helper: "Opcional. Deixe em branco e envie se não houver.",
    placeholder: "Ex: Loja 2",
    reviewLabel: "Complemento",
  },
  {
    id: "bairro",
    stepId: "endereco",
    type: "input",
    format: "text",
    prompt: "Qual é o bairro?",
    placeholder: "Ex: Vila Madalena",
    reviewLabel: "Bairro",
  },
  {
    id: "cidade",
    stepId: "endereco",
    type: "input",
    format: "text",
    prompt: "Em qual cidade?",
    placeholder: "Ex: São Paulo",
    reviewLabel: "Cidade",
  },
  {
    id: "uf",
    stepId: "endereco",
    type: "input",
    format: "uf",
    prompt: "E o estado (UF)?",
    placeholder: "Ex: SP",
    reviewLabel: "UF",
  },

  // Responsável
  {
    id: "nomeResponsavel",
    stepId: "responsavel",
    type: "input",
    format: "text",
    prompt:
      "Agora sobre você. Qual é o nome do responsável pelas compras? Essa pessoa vai aprovar os pedidos.",
    placeholder: "Nome completo",
    reviewLabel: "Nome do responsável",
  },
  {
    id: "cargo",
    stepId: "responsavel",
    type: "single",
    prompt: (a) => `Qual é o seu cargo no ${termoNegocio(a)}?`,
    reviewLabel: "Cargo",
    options: [
      { value: "proprietario", label: "Proprietário(a)" },
      { value: "socio", label: "Sócio(a)" },
      { value: "gerente", label: "Gerente" },
      { value: "comprador", label: "Comprador(a)" },
      { value: "chef", label: "Chef de cozinha" },
    ],
  },
  {
    id: "email",
    stepId: "responsavel",
    type: "input",
    format: "email",
    prompt: "Qual e-mail devemos usar para enviar os pedidos para aprovação?",
    placeholder: "voce@restaurante.com.br",
    reviewLabel: "E-mail",
  },
  {
    id: "telefone",
    stepId: "responsavel",
    type: "input",
    format: "phone",
    prompt: "E o seu telefone com WhatsApp?",
    placeholder: "(11) 90000-0000",
    reviewLabel: "Telefone / WhatsApp",
  },

  // Operação
  {
    id: "pedidosMes",
    stepId: "operacao",
    type: "input",
    format: "integer",
    prompt: (a) =>
      ehFornecedor(a)
        ? "Quantos pedidos você costuma atender por mês?"
        : "Quantos pedidos de compra você costuma fazer por mês?",
    helper: "Isso nos ajuda a dimensionar o seu volume e encontrar os melhores parceiros.",
    placeholder: "Ex: 50, 100, 200...",
    min: 1,
    max: 10000,
    reviewLabel: "Pedidos por mês",
  },
  {
    id: "diasCompra",
    stepId: "operacao",
    type: "multi",
    prompt: (a) =>
      ehFornecedor(a)
        ? "Em quais dias da semana você costuma atender pedidos?"
        : "Em quais dias da semana você costuma fazer compras?",
    helper: "Selecione um ou mais dias.",
    options: weekDays,
    minSelections: 1,
    reviewLabel: "Dias de compra",
  },
  {
    id: "canais",
    stepId: "operacao",
    type: "multi",
    prompt: "Por quais canais você prefere receber as atualizações e aprovações?",
    options: [
      { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
      { value: "email", label: "E-mail", icon: Mail },
    ],
    minSelections: 1,
    reviewLabel: "Canais de contato",
  },
];
