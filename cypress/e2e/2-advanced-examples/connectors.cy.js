/// <reference types="cypress" />

// Testes de conectores em Cypress
describe('Conectores em Cypress', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/connectors');
  });

  it('deve iterar sobre um array de elementos com .each()', () => {
    cy.get('.connectors-each-ul>li')
      .each(($el, index, $list) => {
        // Exemplo de iteração, pode adicionar validações aqui
        expect($el).to.exist;
      });
  });

  it('deve obter propriedades do elemento com .its()', () => {
    cy.get('.connectors-its-ul>li')
      .its('length')
      .should('be.gt', 2);
  });

  it('deve invocar função no elemento com .invoke()', () => {
    cy.get('.connectors-div').should('be.hidden');
    cy.get('.connectors-div').invoke('show');
    cy.get('.connectors-div').should('be.visible');
  });

  it('deve espalhar array como argumentos com .spread()', () => {
    const arr = ['foo', 'bar', 'baz'];
    cy.wrap(arr).spread((foo, bar, baz) => {
      expect(foo).to.eq('foo');
      expect(bar).to.eq('bar');
      expect(baz).to.eq('baz');
    });
  });

  context('.then()', () => {
    it('deve invocar callback com o elemento atual', () => {
      cy.get('.connectors-list > li')
        .then(($lis) => {
          expect($lis, '3 items').to.have.length(3);
          expect($lis.eq(0), 'first item').to.contain('Walk the dog');
          expect($lis.eq(1), 'second item').to.contain('Feed the cat');
          expect($lis.eq(2), 'third item').to.contain('Write JavaScript');
        });
    });

    it('deve passar valor retornado para o próximo comando', () => {
      cy.wrap(1)
        .then((num) => {
          expect(num).to.equal(1);
          return 2;
        })
        .then((num) => {
          expect(num).to.equal(2);
        });
    });

    it('deve manter valor original se não retornar nada', () => {
      cy.wrap(1)
        .then((num) => {
          expect(num).to.equal(1);
        })
        .then((num) => {
          expect(num).to.equal(1);
        });
    });

    it('deve passar valor do último comando Cypress', () => {
      cy.wrap(1)
        .then((num) => {
          expect(num).to.equal(1);
          cy.wrap(2);
        })
        .then((num) => {
          expect(num).to.equal(2);
        });
    });
  });
});
