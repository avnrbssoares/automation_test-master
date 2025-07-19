// Arquivo de configuração principal do Cypress
// Outros desenvolvedores podem customizar este arquivo conforme necessário
// Documentação oficial: https://docs.cypress.io/guides/references/configuration

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // setupNodeEvents permite adicionar plugins ou hooks personalizados
    setupNodeEvents(on, config) {
      // Exemplo: adicionar um plugin customizado
      // on('task', require('./cypress/plugins/index'));
      // Retorne o config se modificar algo
      // return config;
    },
    // baseUrl: 'http://localhost:3000', // Defina a URL base dos testes se necessário
    // specPattern: 'cypress/e2e/**/*.cy.{js,ts}', // Padrão dos arquivos de teste
    // supportFile: 'cypress/support/e2e.js', // Arquivo de suporte global
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
