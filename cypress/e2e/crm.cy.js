describe('Fluxo de Atendimento - CRM', () => {
  it('deve realizar login e abrir atendimento', () => {
    // Acessa a página de autenticação do CRM
    cy.visit('https://uberlandia.jmjsistemas.app/crm/#/authenticate');

    // Preenche usuário e senha usando variáveis de ambiente
    cy.get(':nth-child(1) > .login__input')
      .should('be.visible')
      .type(Cypress.env('CRM_USER'));

    cy.get('.ng-isolate-scope > #senha')
      .should('be.visible')
      .type(Cypress.env('CRM_PASSWORD'));

    // Realiza login
    cy.get('.login__submit')
      .should('be.enabled')
      .click();

    // Valida se o login foi bem-sucedido (exemplo: verifica se a página mudou)
    cy.url().should('include', '/dashboard'); // Ajuste o path conforme o esperado após login
    // Você pode adicionar validações extras aqui, como checar elementos do dashboard
  });
});
