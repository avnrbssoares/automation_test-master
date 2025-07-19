/// <reference types="cypress" />

// Testes de navegação no Cypress
describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io');
    cy.get('.navbar-nav').contains('Commands').click();
    cy.get('.dropdown-menu').contains('Navigation').click();
  });

  it('deve navegar para trás e para frente no histórico do navegador com cy.go()', () => {
    cy.location('pathname').should('include', 'navigation');
    cy.go('back');
    cy.location('pathname').should('not.include', 'navigation');
    cy.go('forward');
    cy.location('pathname').should('include', 'navigation');
    cy.go(-1);
    cy.location('pathname').should('not.include', 'navigation');
    cy.go(1);
    cy.location('pathname').should('include', 'navigation');
  });

  it('deve recarregar a página com cy.reload()', () => {
    cy.reload();
    cy.reload(true); // sem cache
  });

  it('deve visitar uma URL remota com cy.visit()', () => {
    cy.visit('https://example.cypress.io/commands/navigation', {
      timeout: 50000,
      onBeforeLoad(contentWindow) {
        expect(typeof contentWindow === 'object').to.be.true;
      },
      onLoad(contentWindow) {
        expect(typeof contentWindow === 'object').to.be.true;
      },
    });
  });
});
