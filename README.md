# Projeto ExchangeCurrency

## Descrição
ExchangeCurrency é um site de câmbio de moedas que permite aos usuários realizar operações de conversão de moedas e visualizar dados relacionados, como histórico de transações e gráficos de variação de câmbio.

---

## Funcionalidades

1. **Conversão de Moeda**
   - O usuário pode selecionar duas moedas e inserir um valor na moeda de origem. O sistema exibirá:
     - Valor unitário convertido entre as duas moedas.
     - Valor total convertido do montante inserido na moeda de destino.

2. **Histórico Pessoal**
   - Armazena localmente (no navegador) um histórico das últimas 5 conversões realizadas. As informações salvas incluem:
     - Moedas de origem e destino.
     - Valor convertido.
     - Data da conversão.
   - O histórico é acessível sem cadastro e sem necessidade de login.

3. **Gráfico de Variação Cambial**
   - Permite ao usuário visualizar um gráfico de linhas com a variação do valor de uma moeda específica ao longo dos últimos meses.
   - Facilita o acompanhamento das tendências de câmbio para planejamento financeiro.

4. **Calculadora de Custo de Viagem**
   - Calculadora para operações complexas, permitindo a soma de diferentes valores (como transporte, hospedagem, alimentação) em uma moeda e a conversão total para outra moeda.
   - Inclui a opção de adicionar um percentual de taxa (ex: taxas de câmbio) ao valor final.

---

## Ferramentas de Desenvolvimento

- **Frontend**
  - **React**: Usado para a interface gráfica, proporcionando uma experiência de usuário simples e intuitiva.

- **Backend**
  - **Java e Spring MVC**: Estruturação do backend para lidar com as conversões e armazenar dados.
  - **ExchangeRate-API**: API externa para obter taxas de câmbio em tempo real, integrando com o Spring MVC para exibir os valores de conversão precisos.

---

## Arquitetura Geral (MVC)

- **Modelo (Model)**:
  - Gerencia e armazena os dados relacionados a moedas e conversões.
  - Interage com o backend para obter e atualizar informações de câmbio.

- **Visualização (View)**:
  - Implementada em React, exibe as interfaces de conversão, histórico, gráficos e calculadora para o usuário.

- **Controlador (Controller)**:
  - Centraliza a lógica de negócios do aplicativo.
  - Recebe solicitações do frontend, interage com a API de câmbio e envia respostas para o frontend.

---

## Exemplos de Uso

- O usuário acessa a página de conversão e escolhe "USD" como moeda de origem e "BRL" como moeda de destino. Após inserir o valor, o sistema exibe a conversão atualizada.
- Ao acessar o histórico, o usuário pode ver as últimas 5 conversões feitas, facilitando o rastreamento de suas transações sem a necessidade de um cadastro.
- A calculadora de custo de viagem permite que o usuário calcule um orçamento detalhado de uma viagem, somando todos os custos e incluindo uma taxa extra de câmbio.

---

## Planejamento no GitHub Projects

- **Fase 1**: Configuração do Projeto e Estrutura Inicial
  - Tarefas de configuração de ambiente e repositório.
  - Estrutura inicial do backend (Java e Spring) e do frontend (React).

- **Fase 2**: Implementação das Funcionalidades
  - Conversão de Moeda e Histórico Local.
  - Implementação do Gráfico de Variação Cambial.
  - Implementação da Calculadora de Custo de Viagem.

- **Fase 3**: Testes e Ajustes Finais
  - Testes de unidade e de integração para garantir a precisão das funcionalidades.
  - Ajustes de interface e experiência do usuário no frontend.

---

**Documentação de API**: Detalhamento de rotas e endpoints que a API do backend disponibiliza para o frontend.

