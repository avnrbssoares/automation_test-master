/// <reference types="cypress" />

// Testes de localização da URL
describe('Location', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/location');
  });

  it('deve retornar o hash atual da URL com cy.hash()', () => {
    cy.hash().should('be.empty');
  });

  it('deve retornar informações de window.location com cy.location()', () => {
    cy.location().should((location) => {
      expect(location.hash).to.be.empty;
      expect(location.href).to.eq('https://example.cypress.io/commands/location');
      expect(location.host).to.eq('example.cypress.io');
      expect(location.hostname).to.eq('example.cypress.io');
      expect(location.origin).to.eq('https://example.cypress.io');
      expect(location.pathname).to.eq('/commands/location');
      expect(location.port).to.eq('');
      expect(location.protocol).to.eq('https:');
      expect(location.search).to.be.empty;
    });
  });

  it('deve retornar a URL atual com cy.url()', () => {
    cy.url().should('eq', 'https://example.cypress.io/commands/location');
  });
});
