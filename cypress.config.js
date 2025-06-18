const cucumber = require("cypress-cucumber-preprocessor").default;
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true, // 👈 habilita o Studio
    setupNodeEvents(on, config) {
      // Você pode deixar isso vazio se não precisar de eventos
    },
  },
})