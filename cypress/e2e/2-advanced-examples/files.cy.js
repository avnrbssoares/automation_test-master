/// <reference types="cypress" />

// Carrega fixture JSON diretamente usando require
const requiredExample = require('../../fixtures/example');

describe('Files', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/files');
    // Carrega o arquivo de fixture e armazena no contexto do teste
    cy.fixture('example.json').as('example');
  });

  it('deve carregar fixture com cy.fixture()', () => {
    cy.intercept('GET', '**/comments/*', { fixture: 'example.json' }).as('getComment');
    cy.get('.fixture-btn').click();
    cy.wait('@getComment').its('response.body')
      .should('have.property', 'name')
      .and('include', 'Using fixtures to represent data');
  });

  it('deve carregar fixture usando cy.fixture() ou require', function () {
    expect(this.example, 'fixture no contexto do teste')
      .to.deep.equal(requiredExample);
    cy.wrap(this.example)
      .should('deep.equal', requiredExample);
  });

  it('deve ler conteúdo de arquivo com cy.readFile()', () => {
    cy.readFile(Cypress.config('configFile')).then((config) => {
      expect(config).to.be.a('string');
    });
  });

  it('deve escrever em arquivo com cy.writeFile()', () => {
    cy.request('https://jsonplaceholder.cypress.io/users')
      .then((response) => {
        cy.writeFile('cypress/fixtures/users.json', response.body);
      });
    cy.fixture('users').should((users) => {
      expect(users[0].name).to.exist;
    });
    cy.writeFile('cypress/fixtures/profile.json', {
      id: 8739,
      name: 'Jane',
      email: 'jane@example.com',
    });
    cy.fixture('profile').should((profile) => {
      expect(profile.name).to.eq('Jane');
    });
  });
});
