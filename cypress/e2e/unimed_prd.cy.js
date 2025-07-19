describe('Login Unimed - Produção', () => {
  it('deve realizar login com sucesso', () => {
    // Acessa o site da Unimed Uberlândia
    cy.visit('https://www.unimeduberlandia.coop.br/portal/');

    // Aceita cookies
    cy.get('#adopt-accept-all-button')
      .should('be.visible')
      .click();

    // Abre menu
    cy.get('.navbar-toggler-icon')
      .should('be.visible')
      .click();

    // Clica em "Acessar Portal"
    cy.get('#menu-item-18 > .nav-link')
      .should('be.visible')
      .click();

    // Preenche CPF e senha usando variáveis de ambiente
    cy.get('#cpfMenu')
      .should('be.visible')
      .type(Cypress.env('UNIMED_PRD_CPF'));

    cy.get('#senhaMenuPF')
      .should('be.visible')
      .type(Cypress.env('UNIMED_PRD_PASSWORD'));

    // Realiza login
    cy.get('#form-login-teste > .form-pf > button')
      .should('be.enabled')
      .click();

    // Valida se a página inicial foi carregada
    cy.get('.container-fluid', { timeout: 10000 })
      .should('be.visible');
    // Você pode adicionar validações extras aqui, como checar elementos específicos da home
  });
});
