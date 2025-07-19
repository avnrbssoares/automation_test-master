/// <reference types="cypress" />

// Testes de manipulação de cookies no Cypress
describe('Manipulação de Cookies', () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true);
    cy.visit('https://example.cypress.io/commands/cookies');
    // Limpa cookies após visitar para evitar cookies de terceiros
    cy.clearCookies();
  });

  it('deve obter um cookie do navegador com cy.getCookie()', () => {
    cy.get('#getCookie .set-a-cookie').click();
    cy.getCookie('token').should('have.property', 'value', '123ABC');
  });

  it('deve obter cookies do domínio atual com cy.getCookies()', () => {
    cy.getCookies().should('be.empty');
    cy.get('#getCookies .set-a-cookie').click();
    cy.getCookies().should('have.length', 1).should((cookies) => {
      expect(cookies[0]).to.include({ name: 'token', value: '123ABC', httpOnly: false, secure: false });
      expect(cookies[0]).to.have.property('domain');
      expect(cookies[0]).to.have.property('path');
    });
  });

  it('deve obter todos os cookies do navegador com cy.getAllCookies()', () => {
    cy.getAllCookies().should('be.empty');
    cy.setCookie('key', 'value');
    cy.setCookie('key', 'value', { domain: '.example.com' });
    cy.getAllCookies().should('have.length', 2).should((cookies) => {
      expect(cookies[0]).to.include({ name: 'key', value: 'value', httpOnly: false, secure: false });
      expect(cookies[0]).to.have.property('domain');
      expect(cookies[0]).to.have.property('path');
      expect(cookies[1]).to.include({ name: 'key', value: 'value', httpOnly: false, secure: false, domain: '.example.com' });
      expect(cookies[1]).to.have.property('path');
    });
  });

  it('deve definir um cookie no navegador com cy.setCookie()', () => {
    cy.getCookies().should('be.empty');
    cy.setCookie('foo', 'bar');
    cy.getCookie('foo').should('have.property', 'value', 'bar');
  });

  it('deve limpar um cookie específico com cy.clearCookie()', () => {
    cy.getCookie('token').should('be.null');
    cy.get('#clearCookie .set-a-cookie').click();
    cy.getCookie('token').should('have.property', 'value', '123ABC');
    cy.clearCookie('token');
    cy.getCookie('token').should('be.null');
  });

  it('deve limpar todos os cookies do domínio atual com cy.clearCookies()', () => {
    cy.getCookies().should('be.empty');
    cy.get('#clearCookies .set-a-cookie').click();
    cy.getCookies().should('have.length', 1);
    cy.clearCookies();
    cy.getCookies().should('be.empty');
  });

  it('deve limpar todos os cookies do navegador com cy.clearAllCookies()', () => {
    cy.getAllCookies().should('be.empty');
    cy.setCookie('key', 'value');
    cy.setCookie('key', 'value', { domain: '.example.com' });
    cy.getAllCookies().should('have.length', 2);
    cy.clearAllCookies();
    cy.getAllCookies().should('be.empty');
  });
});
