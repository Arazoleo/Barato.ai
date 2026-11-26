# AGENTS.md

Este arquivo define o Procedimento Operacional Padrão (SOP) para qualquer agente de IA que atue neste workspace, incluindo assistentes de código e agentes equivalentes.

## Objetivo do Repositório
Este repositório centraliza as especificações do ecossistema **Barato.ai** e deve ser tratado como a Fonte Única da Verdade (SSOT) para entendimento funcional, definição de mudanças e validação.

## Regras Obrigatórias para Qualquer IA

1. Antes de propor, alterar ou revisar código nos repositórios consumidores, a IA deve ler o estado atual consolidado em `docs/resources/`.
2. Nenhuma IA pode alterar diretamente os repositórios consumidores sem antes documentar a mudança. O planejamento da mudança deve ser feito **diretamente na pasta `docs/resources/`** (acrescentando novas features ou modificando arquivos existentes), e **somente após receber permissão explícita** do responsável.
3. Correções, melhorias, **refatorações funcionais (especialmente focadas em eliminar duplicações de código)** e novas features devem nascer primeiro como uma atualização documental em `docs/resources/` e só depois evoluir para a implementação técnica no código.
4. O sucesso de qualquer tarefa deve ser medido estritamente pelos arquivos de validação definidos em `docs/validators/`.
5. Quando houver ambiguidade, conflito de regra ou ausência de contexto, a IA deve parar e solicitar confirmação explícita ao responsável designado.
6. A IA não deve inferir regra operacional de negócio sem evidência documental neste repositório.
7. Toda mudança deve preservar rastreabilidade entre a especificação em `docs/resources/` e o critério de validação correspondente.
8. O diretório `docs/resources/` é expansível: os arquivos atuais representam apenas os domínios e módulos já mapeados. Novos recursos e features devem ser adicionados como novos arquivos Markdown sempre que houver um contexto funcional próprio.
9. Durante a análise de um recurso ou revisão de código, se a IA identificar um item candidato a remoção (tabela, view, endpoint, módulo ou componente sem uso aparente) ou **código duplicado**, deve: 
   - (a) registrá-lo em `docs/resources/tech-debt.md` com status de candidato e a evidência encontrada; 
   - (b) mencionar ao responsável técnico de forma breve e não bloqueante. A remoção ou refatoração estrutural efetiva nunca ocorre sem a aprovação do responsável técnico e a respectiva atualização no `docs/resources/`.
10. Nunca executar `git commit` (nem `git push`) sem aprovação explícita do responsável técnico na interação atual, independentemente do modo de execução da IA. Ao concluir e verificar o trabalho, a IA deve deixar as alterações em stage (`git add` dos arquivos específicos), listar o que está em stage por repositório, propor a mensagem de commit (com work items, quando houver) e perguntar se pode commitar. A aprovação dada para um commit não se estende a commits seguintes. Esta regra vale para todos os repositórios do ecossistema Barato.ai.

## Uso de Ferramentas Externas (MCP)
Quando o agente tiver acesso ao MCP de gestão de trabalho (por exemplo, Azure DevOps, Jira, GitHub Issues), as seguintes regras se aplicam:
- O MCP deve ser usado exclusivamente para consumo de informações de work items (título, descrição, critérios de aceite, comentários, estado e vínculos).
- Nunca usar o MCP para buscar código-fonte (`search_code`, `get_file_content`, `get_repository_tree` ou equivalentes) como substituto à leitura dos repositórios locais via filesystem. O código local é a fonte de verdade para implementação.
- A leitura de work items via MCP complementa — mas não substitui — a leitura obrigatória de `docs/resources/` descrita na Ordem de Trabalho.
- Informações relevantes obtidas via MCP devem ser integradas ao documento da feature em `docs/resources/` para garantir rastreabilidade.
- Se o MCP não estiver disponível, solicitar ao responsável que cole o conteúdo relevante do work item diretamente no chat.

## Definição de Pronto para IAs
Uma tarefa só pode ser considerada concluída quando:
- a mudança (incluindo intenções de refatoração ou novas features) estiver descrita, atualizada e consolidada na pasta `docs/resources/`;
- os critérios de validação estiverem definidos em `docs/validators/`;
- todos os critérios automáticos do validator tiverem sido verificados (garantindo que refatorações não quebraram o comportamento existente);
- o "de acordo" explícito do responsável técnico tiver sido obtido antes do commit final;
- os commits tiverem sido separados por responsabilidade e vinculados aos work items, quando informados;
- não restarem ambiguidades abertas sem decisão do responsável.

## Code Style, Refatoramento e Prevenção de Duplicidades

Todo código gerado ou alterado deve respeitar as regras de estilo do repositório afetado. Antes de implementar, leia o arquivo de code style correspondente:

| Repositório | Arquivo de referência |
| :--- | :--- |
| `[REPOSITORIO_BACKEND]` | `[REPOSITORIO_BACKEND]/.agents/code-style.md` |
| `[REPOSITORIO_FRONTEND]` | `[REPOSITORIO_FRONTEND]/.agents/frontend-code-style.md` |

Regras que exigem atenção especial da IA na arquitetura do código:
- **Evitar Duplicações (DRY - Don't Repeat Yourself):** Antes de criar qualquer nova função, classe, componente ou script, a IA **deve** buscar ativamente na base de código por implementações similares. A reutilização de código e abstrações existentes é mandatória.
- **Refatoramento Ativo:** Ao identificar blocos de código repetidos, lógicas com alta complexidade cognitiva ou desvios de padrão, a IA deve propor a extração dessa lógica em funções auxiliares ou serviços reutilizáveis. O refatoramento deve manter o comportamento externo intacto (verificado pelos testes/validators).
- Sempre usar chaves em estruturas de controle (`if`, `else`, `for`, `while`), mesmo em corpo de linha única.
- Nunca colocar corpo de bloco na mesma linha que a abertura.
- Nunca deixar imports não utilizados.
- Nunca deixar variáveis ou parâmetros não utilizados (prefixar com `_` quando intencional).
- Respeitar o limite de linha e a indentação definidos pelo repositório.

## Ordem de Trabalho Obrigatória

1. Ler `docs/resources/README.md`.
2. Identificar o domínio ou módulo afetado na pasta `docs/resources/`.
3. **Solicitar permissão:** A IA deve pedir autorização explícita ao responsável técnico para modificar um arquivo existente em `docs/resources/` ou para criar um novo documento descrevendo a nova feature.
4. **Documentar a Mudança:** Após a permissão, atualizar ou criar o arquivo em `docs/resources/` detalhando a implementação que será feita. A tabela de controle de versão (no topo do documento) deve declarar o RN, o RT, os repositórios afetados e a branch. Quando envolver banco de dados, confirmar o `sql_path`.
5. Criar ou atualizar os critérios de aceite em `docs/validators/`.
6. Criar a branch nos repositórios afetados (apenas com autorização explícita).
7. Implementar no código o escopo exato que foi previamente escrito em `docs/resources/`, priorizando o reaproveitamento de código e respeitando o code style.
8. Verificar todos os critérios automáticos do validator antes de qualquer etapa de commit.
9. Solicitar aprovação e testes manuais ao responsável técnico. Não realizar o commit de implementação sem aprovação explícita.
10. Após a aprovação explícita: confirmar com o responsável os work items a vincular. Fazer o commit separando por responsabilidade.
11. Atualizar o repositório central de especificações (SSOT) garantindo que a documentação final em `docs/resources/` reflete perfeitamente o código que acabou de ser validado e mergeado.

## Padrões Obrigatórios para Scripts SQL

**ALTER TABLE — guard obrigatório**
Nunca gerar `ALTER TABLE ... ADD` sem verificar se a coluna já existe. Usar sempre o padrão:
```sql
IF NOT EXISTS (
    SELECT 1 FROM sys.columns
    WHERE object_id = OBJECT_ID('dbo.<tabela>')
    AND name = '<coluna>'
)
BEGIN
    ALTER TABLE [dbo].[<tabela>]
    ADD [<coluna>] <tipo> NULL;
END
GO
