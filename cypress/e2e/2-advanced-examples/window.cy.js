/// <reference types="cypress" />

// Testes de manipulação de objetos globais no Cypress
describe('Window', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/window');
  });

  it('deve obter o objeto global window com cy.window()', () => {
    cy.window().should('have.property', 'top');
  });

  it('deve obter o objeto document com cy.document()', () => {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
  });

  it('deve obter o título da página com cy.title()', () => {
    cy.title().should('include', 'Kitchen Sink');
  });
});
