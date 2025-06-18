describe('Fluxo de Atendimento - CRM', () => {
  it('Deve realizar login e abrir atendimento', () => {
    cy.visit('https://uberlandia.jmjsistemas.app/crm/#/authenticate'); // Acessa o CRM

    cy.get(':nth-child(1) > .login__input').type(Cypress.env('CRM_USER')); // Digita o usuário
    cy.get('.ng-isolate-scope > #senha').type(Cypress.env('CRM_PASSWORD')); //
    cy.get('.login__submit').click(); // Clica no botão de login
    
  });
});
