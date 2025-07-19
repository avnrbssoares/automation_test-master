/// <reference types="cypress" />

// Testes de travessia de elementos DOM no Cypress
describe('Traversal', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/traversal');
  });

  it('deve obter elementos filhos com .children()', () => {
    cy.get('.traversal-breadcrumb')
      .children('.active')
      .should('contain', 'Data');
  });

  it('deve obter ancestral mais próximo com .closest()', () => {
    cy.get('.traversal-badge')
      .closest('ul')
      .should('have.class', 'list-group');
  });

  it('deve obter elemento pelo índice com .eq()', () => {
    cy.get('.traversal-list>li')
      .eq(1).should('contain', 'siamese');
  });

  it('deve filtrar elementos com .filter()', () => {
    cy.get('.traversal-nav>li')
      .filter('.active').should('contain', 'About');
  });

  it('deve buscar descendentes com .find()', () => {
    cy.get('.traversal-pagination')
      .find('li').find('a')
      .should('have.length', 7);
  });

  it('deve obter o primeiro elemento com .first()', () => {
    cy.get('.traversal-table td')
      .first().should('contain', '1');
  });

  it('deve obter o último elemento com .last()', () => {
    cy.get('.traversal-buttons .btn')
      .last().should('contain', 'Submit');
  });

  it('deve obter próximo irmão com .next()', () => {
    cy.get('.traversal-ul')
      .contains('apples').next().should('contain', 'oranges');
  });

  it('deve obter todos os próximos irmãos com .nextAll()', () => {
    cy.get('.traversal-next-all')
      .contains('oranges')
      .nextAll().should('have.length', 3);
  });

  it('deve obter próximos irmãos até elemento com .nextUntil()', () => {
    cy.get('#veggies')
      .nextUntil('#nuts').should('have.length', 3);
  });

  it('deve remover elementos do conjunto com .not()', () => {
    cy.get('.traversal-disabled .btn')
      .not('[disabled]').should('not.contain', 'Disabled');
  });

  it('deve obter elemento pai com .parent()', () => {
    cy.get('.traversal-mark')
      .parent().should('contain', 'Morbi leo risus');
  });

  it('deve obter todos os pais com .parents()', () => {
    cy.get('.traversal-cite')
      .parents().should('match', 'blockquote');
  });

  it('deve obter pais até elemento com .parentsUntil()', () => {
    cy.get('.clothes-nav')
      .find('.active')
      .parentsUntil('.clothes-nav')
      .should('have.length', 2);
  });

  it('deve obter irmão anterior com .prev()', () => {
    cy.get('.birds').find('.active')
      .prev().should('contain', 'Lorikeets');
  });

  it('deve obter todos os irmãos anteriores com .prevAll()', () => {
    cy.get('.fruits-list').find('.third')
      .prevAll().should('have.length', 2);
  });

  it('deve obter irmãos anteriores até elemento com .prevUntil()', () => {
    cy.get('.foods-list').find('#nuts')
      .prevUntil('#veggies').should('have.length', 3);
  });

  it('deve obter todos os irmãos com .siblings()', () => {
    cy.get('.traversal-pills .active')
      .siblings().should('have.length', 2);
  });
});
