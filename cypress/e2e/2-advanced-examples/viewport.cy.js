/// <reference types="cypress" />

// Testes de manipulação de viewport no Cypress
describe('Viewport', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/viewport');
  });

  it('deve definir o tamanho e dimensão do viewport', () => {
    // Verifica navbar visível no padrão
    cy.get('#navbar').should('be.visible');

    // Define viewport pequeno e verifica navbar colapsada
    cy.viewport(320, 480);
    cy.get('#navbar').should('not.be.visible');
    cy.get('.navbar-toggle').should('be.visible').click();
    cy.get('.nav').find('a').should('be.visible');

    // Define viewport super grande
    cy.viewport(2999, 2999);

    // Testa presets de dispositivos
    const devices = [
      'macbook-15', 'macbook-13', 'macbook-11',
      'ipad-2', 'ipad-mini', 'iphone-6+', 'iphone-6',
      'iphone-5', 'iphone-4', 'iphone-3'
    ];
    devices.forEach((device) => {
      cy.viewport(device);
      cy.wait(200);
    });

    // Testa orientação portrait e landscape
    cy.viewport('ipad-2', 'portrait');
    cy.wait(200);
    cy.viewport('iphone-4', 'landscape');
    cy.wait(200);

    // O viewport é resetado entre os testes (configurável no cypress.config)
  });
});
