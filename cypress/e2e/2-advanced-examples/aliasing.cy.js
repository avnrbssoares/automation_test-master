/// <reference types="cypress" />

// Testes de alias para elementos e rotas
describe('Alias em Cypress', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/aliasing');
  });

  it('deve criar alias para elemento DOM e reutilizar', () => {
    cy.get('.as-table').find('tbody>tr')
      .first().find('td').first()
      .find('button').as('firstBtn');
    cy.get('@firstBtn').click();
    cy.get('@firstBtn').should('have.class', 'btn-success').and('contain', 'Changed');
  });

  it('deve criar alias para rota e aguardar resposta', () => {
    cy.intercept('GET', '**/comments/*').as('getComment');
    cy.get('.network-btn').click();
    cy.wait('@getComment').its('response.statusCode').should('eq', 200);
  });
});
