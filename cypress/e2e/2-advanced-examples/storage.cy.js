/// <reference types="cypress" />

// Testes de Local Storage e Session Storage no Cypress
describe('Local Storage / Session Storage', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/storage');
  });

  it('deve limpar todos os dados do localStorage do origin atual', () => {
    cy.get('.ls-btn').click();
    cy.get('.ls-btn').should(() => {
      expect(localStorage.getItem('prop1')).to.eq('red');
      expect(localStorage.getItem('prop2')).to.eq('blue');
      expect(localStorage.getItem('prop3')).to.eq('magenta');
    });
    cy.clearLocalStorage();
    cy.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('prop1')).to.be.null;
      expect(localStorage.getItem('prop2')).to.be.null;
      expect(localStorage.getItem('prop3')).to.be.null;
    });
    cy.get('.ls-btn').click();
    cy.get('.ls-btn').should(() => {
      expect(localStorage.getItem('prop1')).to.eq('red');
      expect(localStorage.getItem('prop2')).to.eq('blue');
      expect(localStorage.getItem('prop3')).to.eq('magenta');
    });
    cy.clearLocalStorage('prop1');
    cy.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('prop1')).to.be.null;
      expect(localStorage.getItem('prop2')).to.eq('blue');
      expect(localStorage.getItem('prop3')).to.eq('magenta');
    });
    cy.get('.ls-btn').click();
    cy.get('.ls-btn').should(() => {
      expect(localStorage.getItem('prop1')).to.eq('red');
      expect(localStorage.getItem('prop2')).to.eq('blue');
      expect(localStorage.getItem('prop3')).to.eq('magenta');
    });
    cy.clearLocalStorage(/prop1|2/);
    cy.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('prop1')).to.be.null;
      expect(localStorage.getItem('prop2')).to.be.null;
      expect(localStorage.getItem('prop3')).to.eq('magenta');
    });
  });

  it('deve obter todos os dados do localStorage de todos os origins', () => {
    cy.get('.ls-btn').click();
    cy.getAllLocalStorage().should((storageMap) => {
      expect(storageMap).to.deep.equal({
        'https://example.cypress.io': {
          prop1: 'red',
          prop2: 'blue',
          prop3: 'magenta',
        },
      });
    });
  });

  it('deve limpar todos os dados do localStorage de todos os origins', () => {
    cy.get('.ls-btn').click();
    cy.clearAllLocalStorage();
    cy.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('prop1')).to.be.null;
      expect(localStorage.getItem('prop2')).to.be.null;
      expect(localStorage.getItem('prop3')).to.be.null;
    });
  });

  it('deve obter todos os dados do sessionStorage de todos os origins', () => {
    cy.get('.ls-btn').click();
    cy.getAllSessionStorage().should((storageMap) => {
      expect(storageMap).to.deep.equal({
        'https://example.cypress.io': {
          prop4: 'cyan',
          prop5: 'yellow',
          prop6: 'black',
        },
      });
    });
  });

  it('deve limpar todos os dados do sessionStorage de todos os origins', () => {
    cy.get('.ls-btn').click();
    cy.clearAllSessionStorage();
    cy.getAllSessionStorage().should(() => {
      expect(sessionStorage.getItem('prop4')).to.be.null;
      expect(sessionStorage.getItem('prop5')).to.be.null;
      expect(sessionStorage.getItem('prop6')).to.be.null;
    });
  });
});
