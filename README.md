[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&center=true&width=435&lines=Bem-vind%40+ao+Barato.ai+)](https://git.io/typing-svg)

Comparar fornecedores é um labirinto e com frete, pedido mínimo e condições de pagamento, o menor preço vira a ponta do iceberg. Com o Barato.ai, você pnão precisa quebrar a cabeça, o agente avalia cada entrelinha, faz a matemática e revela qual proposta realmente protege o caixa do seu restaurante, garantindo que o barato seja barato de verdade.

O **Barato.ai** é um sistema baseado em agentes de inteligência artificial projetado para automatizar o processo de compras de restaurantes, cobrindo de ponta a ponta: desde a busca de fornecedores até a aprovação do pedido, achamos para você a melhor oferta.


## Como Funciona:

O agente de IA assume o trabalho repetitivo e operacional da cotação, enquanto o dono do restaurante mantém o controle e a decisão final.

1. **Onboarding:** O dono define os produtos, as quantidades desejadas e os limites de negociação.
2. **Busca e Contato:** O serviço busca fornecedores na região e dispara pedidos de cotação via **Integração com E-mail e WhatsApp**.
3. **Extração de Dados:** Um pipeline inteligente lê e transforma respostas não estruturadas dos fornecedores (texto, áudio, foto e PDF) em ofertas padronizadas.
4. **Motor de Decisão (Negociação):** O agente calcula o custo real de cada proposta (considerando fretes, prazos e taxas) e conduz rodadas de negociação automáticas com os fornecedores, respeitando as regras estabelecidas.
5. **Aprovação Humana:** O agente monta um ranking com as melhores recomendações. Se o dono aprovar, o pedido é fechado. Se recusar, o pedido pode ser ajustado e o agente retoma a negociação.


## Público Inicial

O MVP (Produto Mínimo Viável) é focado em **restaurantes de uma única região**. Esse público foi escolhido pela alta frequência de compras (semanais), gerando um volume rico de cotações para testes de software. No futuro, a mesma arquitetura poderá ser adaptada para outros segmentos ajustando apenas o onboarding.


## Escopo do Projeto (MVP)

| No MVP | Futuras Atualizações |
| :--- | :--- |
| Onboarding com produtos, quantidades e limites | Outros segmentos além de restaurantes |
| Busca de fornecedores em uma região específica | Cobertura de várias regiões |
| **Integração com WhatsApp** e E-mail para cotação | Disparos em massa para fornecedores desconhecidos |
| Leitura de respostas em texto, áudio, foto e PDF | Integração com sistemas de gestão (ERP) do restaurante |
| Negociação automática dentro dos limites definidos | Fechamento automático de compras sem aprovação |
| Ranking pelo custo real e painel de aprovação | Pagamento processado dentro da plataforma |


## Contribuidores e Responsabilidades

As frentes de trabalho do projeto estão organizadas abaixo, cada integrante liderará uma frente, com decisões principais revisadas por todo o grupo.

| Frente | Responsabilidade | Responsável |
| :--- | :--- | :--- |
| **Agente e negociação** | Lógica de decisão, limites e contrapropostas | Leonardo Arazo de Oliveira Araújo |
| **Fornecedores e dados** | Busca de fornecedores e extração inteligente das ofertas | Pedro Marx Amaral Abreu |
| **Canais de mensagem** | Integração total com **WhatsApp** e e-mail; acompanhamento do fluxo | Miguel Rangel |
| **Produto e back-end** | Fluxo de onboarding, telas, API e banco de dados | Ana Beatriz Ribeiro Garcia |
| **Registro e qualidade** | Documentação, testes automatizados e métricas | Larissa Lumi Hayakawa de Sá |
