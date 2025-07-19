/// <reference types="cypress" />

// Testes de consulta de elementos DOM no Cypress
describe('Querying', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/querying');
  });

  it('deve consultar elementos DOM com cy.get()', () => {
    cy.get('#query-btn').should('contain', 'Button');
    cy.get('.query-btn').should('contain', 'Button');
    cy.get('#querying .well>button:first').should('contain', 'Button');
    cy.get('[data-test-id="test-example"]').should('have.class', 'example');
    cy.get('[data-test-id="test-example"]')
      .invoke('attr', 'data-test-id')
      .should('equal', 'test-example');
    cy.get('[data-test-id="test-example"]')
      .invoke('css', 'position')
      .should('equal', 'static');
    cy.get('[data-test-id="test-example"]')
      .should('have.attr', 'data-test-id', 'test-example')
      .and('have.css', 'position', 'static');
  });

  it('deve consultar elementos DOM pelo conteúdo com cy.contains()', () => {
    cy.get('.query-list').contains('bananas').should('have.class', 'third');
    cy.get('.query-list').contains(/^b\w+/).should('have.class', 'third');
    cy.get('.query-list').contains('apples').should('have.class', 'first');
    cy.get('#querying').contains('ul', 'oranges').should('have.class', 'query-list');
    cy.get('.query-button').contains('Save Form').should('have.class', 'btn');
  });

  it('deve consultar elementos dentro de um elemento específico com .within()', () => {
    cy.get('.query-form').within(() => {
      cy.get('input:first').should('have.attr', 'placeholder', 'Email');
      cy.get('input:last').should('have.attr', 'placeholder', 'Password');
    });
  });

  it('deve consultar o elemento raiz com cy.root()', () => {
    cy.root().should('match', 'html');
    cy.get('.query-ul').within(() => {
      cy.root().should('have.class', 'query-ul');
    });
  });

  it('boas práticas para selecionar elementos', () => {
    cy.get('[data-cy=best-practices-selecting-elements]').within(() => {
      cy.get('button').click(); // Genérico
      cy.get('.btn.btn-large').click(); // Coupling com estilo
      cy.get('[name=submission]').click(); // Coupling com atributo
      cy.get('#main').click(); // Coupling com id
      cy.get('#main[role=button]').click(); // Id + ARIA
      cy.contains('Submit').click(); // Coupling com texto
      cy.get('[data-cy=submit]').click(); // Melhor prática
    });
  });
});
