/// <reference types="cypress" />

// Testes diversos do Cypress
describe('Misc', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/misc');
  });

  it('deve executar um comando do sistema com cy.exec()', () => {
    cy.exec('echo Jane Lane')
      .its('stdout').should('contain', 'Jane Lane');
    // Comandos específicos de sistema removidos para compatibilidade
  });

  it('deve obter o elemento DOM com foco usando cy.focused()', () => {
    cy.get('.misc-form').find('#name').click();
    cy.focused().should('have.id', 'name');
    cy.get('.misc-form').find('#description').click();
    cy.focused().should('have.id', 'description');
  });

  describe('Cypress.Screenshot', () => {
    it('deve tirar um screenshot com cy.screenshot()', () => {
      cy.screenshot('my-image');
    });

    it('deve alterar configuração padrão de screenshot', () => {
      Cypress.Screenshot.defaults({
        blackout: ['.foo'],
        capture: 'viewport',
        clip: { x: 0, y: 0, width: 200, height: 200 },
        scale: false,
        disableTimersAndAnimations: true,
        screenshotOnRunFailure: true,
        onBeforeScreenshot() {},
        onAfterScreenshot() {},
      });
    });
  });

  it('deve envolver um objeto com cy.wrap()', () => {
    cy.wrap({ foo: 'bar' })
      .should('have.property', 'foo')
      .and('include', 'bar');
  });
});
