# 💻 Guia do Desenvolvedor: Barato.ai

Bem-vindos ao coração técnico do Barato.ai! 

Este documento estabelece as diretrizes de desenvolvimento da nossa equipe. Como nosso estimado professor tão brilhantemente nos ensinou ao longo da disciplina de Engenharia de Software (ES), **desenvolver software não é sobre "digitar código", mas sim sobre projetar soluções robustas, manuteníveis, escaláveis e focadas na entrega de valor.**


## 1. Arquitetura e Princípios de Design

**"Alta Coesão e Baixo Acoplamento"** são o segredo para a longevidade do software.

*   **SOLID:** Todo novo módulo ou agente deve respeitar os princípios SOLID (especialmente o Princípio da Responsabilidade Única - SRP). Um agente de extração não deve enviar e-mails; ele apenas extrai.
*   **Design Patterns:** Usem padrões de projeto catalogados pelo GoF (Gang of Four) quando necessário. Ex.: *Strategy* para os diferentes métodos de extração de dados (PDF, Imagem, Texto), *Observer* para o status de negociação, e *Factory* para a criação de instâncias de agentes.
*   **Arquitetura Baseada em Eventos/Agentes:** Nossos módulos comunicam-se por interfaces claras, facilitando a manutenção e a escalabilidade futura (projete para a mudança).


## 2. Git Flow
### Estrutura de Branches
*   `main`: Produção. Código sagrado, testado e validado.
*   `develop`: Branch de integração. Reflete o ambiente de homologação.
*   `feature/nome-da-feature`: Para novos requisitos funcionais.
*   `bugfix/nome-do-bug`: Para correção de anomalias.

### Padrão de Commits (Conventional Commits)
*   `feat: adiciona pipeline de leitura de pdf` (Nova funcionalidade)
*   `fix: corrige erro de calculo no custo real` (Correção de bug)
*   `refactor: melhora coesao do modulo de whatsapp` (Refatoração sem alterar o comportamento)
*   `docs: atualiza arquitetura no readme` (Documentação)
*   `test: adiciona cobertura de testes para motor de ranking` (Testes)


## 3. Padrões de Codificação (Clean Code)

Lembre-se: o código é lido muito mais vezes do que é escrito. Escreva código para humanos, não apenas para o compilador.

*   **Nomenclatura Reveladora de Intenção:** Variáveis e funções devem dizer exatamente o que fazem. Ex.: `calcularCustoRealDaCotacao()` ao invés de `calc()`.
*   **Comentários:** O código deve ser autoexplicativo. Comentários devem explicar o *porquê* de uma decisão de negócio (ex: *"# Subtrai 5% do valor total porque o restaurante possui convênio"*), e nunca o *o que* o código está fazendo.
*   **DRY (Don't Repeat Yourself):** Se você copiou e colou o mesmo trecho três vezes, transforme isso em uma função.


## 4. Garantia de Qualidade (QA) e Testes

> "Testes não provam a ausência de bugs, mas reduzem drasticamente a chance de eles irem para produção."

*   **Testes Unitários:** A lógica de cálculo de "Custo Real" do Barato.ai é o nosso *core business*. Ela deve ter **100% de cobertura de testes unitários**. Não suba PR sem testar os cenários de borda (ex: frete negativo, pedido mínimo maior que o total, divisão por zero).
*   **Testes de Integração:** Nossos agentes se comunicam com APIs externas (OpenAI/Gemini, WhatsApp, E-mail). Precisamos de *Mocks* e *Stubs* bem definidos para garantir que a orquestração do pipeline funcione perfeitamente.
*   **Code Review (Revisão por Pares):** Nenhuma PR (Pull Request) será mergeada sem a aprovação de pelo menos um colega da equipe. Essa é a nossa validação estática de qualidade.


## 🔄 5. Metodologia de Trabalho (Engenharia Ágil)

Para lidar com a volatilidade dos requisitos (já que descobrir o escopo real sempre foi o maior desafio da Engenharia de Software), adotaremos uma abordagem **Ágil**:

*   **Entregas Incrementais (MVP):** Não construir o sistema de primeira, mas sim com foco no fluxo básico (1 restaurante, poucos fornecedores) para gerar valor rápido e obter feedback.
*   **Kanban:** Mapear o fluxo de valor: `To Do` ➔ `In Progress` ➔ `Code Review` ➔ `Done`.
*   **Reuniões de Alinhamento:** Manter contato constante para garantir que todos os desenvolvedores estejam indo para a mesma direção.


> *"A boa engenharia de software não é aquela que cria sistemas complexos, mas a que resolve problemas complexos com sistemas simples."*


Bom trabalho, equipe! 
