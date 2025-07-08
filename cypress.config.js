const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Aquí agregas los plugins o configuraciones adicionales
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      reportFilename: 'report',
      overwrite: false,
      html: true,
      json: true,
    },
  },
});