# Projeto de Testes Automatizados com Cypress

Este projeto utiliza Cypress para automatização de testes E2E em ambientes da Unimed e CRM interno.

## Pré-requisitos

- Node.js instalado
- NPM ou Yarn

## Instalação

```bash
npm install
```

## Configuração de Ambiente

Crie um arquivo `cypress.env.json` com o seguinte conteúdo:

```json
{
  "UNIMED_USER": "jpmiranda",
  "UNIMED_PASSWORD": "Unimed@2029",
  "UNIMED_PRD_CPF": "12255613611",
  "UNIMED_PRD_PASSWORD": "Unimed",
  "CRM_USER": "laramos",
  "CRM_PASSWORD": "kFOt6xfb7h",
  "CRM_DOMINIO": "seu_dominio"
}
```

## Execução dos Testes

### Modo Interativo (GUI)

```bash
npx cypress open
```

### Modo Headless (Terminal)

```bash
npx cypress run
```

## Estrutura de Testes

- `unimed_hml.cy.js` - Teste de login no ambiente de homologação
- `unimed_prd.cy.js` - Teste de login no portal de produção
- `crm.cy.js` - Teste de abertura de atendimento no CRM interno
