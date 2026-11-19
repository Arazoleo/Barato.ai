# Grupo Barato.ai — Credenciamento (front-end)

Onboarding conversacional determinístico do restaurante. Sem back-end: os dados ficam no estado local e no `localStorage`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run typecheck
```

## Estrutura

```
src/
  app/                 layout, página e tema (globals.css)
  config/
    onboardingFlow.ts  etapas e perguntas (fonte única do fluxo)
    navigation.ts      itens da sidebar e usuário mock
  types/onboarding.ts  tipos de perguntas, respostas e etapas
  lib/
    flow.ts            regras do fluxo (perguntas visíveis, próxima pergunta, payload)
    fieldFormats.ts    máscaras e validações (CNPJ, telefone, CEP, UF, e-mail, número)
  hooks/useOnboardingFlow.ts  estado do fluxo (reducer + persistência)
  components/
    layout/            AppShell, Sidebar
    chat/              mensagens, chips de opção, campo de resposta
    onboarding# Grupo Barato.ai — Credenciamento (front-end)

Onboarding conversaciona  
Onboarding conversacional determinístico do r pe
```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run typecheck
```

## Estrutura

```
src/
`, npm in`,npm run de`cnpm run build
npm run typecheck
```

## "npm run type`"```

## Estruturio
#`;

```
src/
 nswsrs)  a b  config/
    onboardingFlow.ts  etapas e perguntas (fontera    ons n?   navigation.ts      itens da sidebar e usuário mock
   `onboar  types/onboarding.ts  tipos de perguntas, respostas e `  lib/
    flow.ts            regras do fluxo (perguntas visol    f r    fieldFormats.ts    máscaras e validações (CNPJ, telefone, CEP, UF, e-mail, núme o  grep -c lint package.json; npx tsc --noEmit && echo TSC_OK
grep -rn "//" src --include="*.ts" --include="*.tsx" | grep -v "http" | grep -vE "^\S+:[0-9]+:\s*import" | grep -E "//[^/]" | grep -iE "[a-z]{4,}"
printf '\n'; grep -rn "//" /Users/ana_garcia/Documents/Front_barato/src --include="*.ts" --include="*.tsx" | grep -vE "import|http" | grep -E "//[A-Za-z ]"
grep -rn "// " /Users/ana_garcia/Documents/Front_barato/src 2>/dev/null | grep -v import
echo HELLO_WORLD_TEST
