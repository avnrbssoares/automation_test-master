// Cypress configuration for running both Cucumber (.feature) and standard spec files
const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  e2e: {
    // Permite rodar arquivos .feature e arquivos padrão do Cypress
    specPattern: [
      'cypress/e2e/**/*.feature',
      'cypress/e2e/**/*.cy.{js,ts}'
    ],
    experimentalStudio: true, // Habilita o Studio do Cypress
    setupNodeEvents(on, config) {
      cucumber(on, config);
      return config;
    },
  },
});