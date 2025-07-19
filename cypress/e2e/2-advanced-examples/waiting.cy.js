/// <reference types="cypress" />

// Testes de espera (wait) no Cypress
describe('Waiting', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/waiting');
  });

  // Evite adicionar esperas desnecessárias!
  // https://on.cypress.io/best-practices#Unnecessary-Waiting

  it('deve esperar um tempo específico com cy.wait()', () => {
    cy.get('.wait-input1').type('Wait 1000ms after typing');
    cy.wait(1000);
    cy.get('.wait-input2').type('Wait 1000ms after typing');
    cy.wait(1000);
    cy.get('.wait-input3').type('Wait 1000ms after typing');
    cy.wait(1000);
  });

  it('deve esperar uma rota específica com cy.wait()', () => {
    cy.intercept('GET', '**/comments/*').as('getComment');
    cy.get('.network-btn').click();
    cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304]);
  });
});
