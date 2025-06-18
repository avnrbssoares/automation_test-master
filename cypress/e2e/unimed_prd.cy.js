describe('Login Unimed - Produção', () => {
  it('Deve realizar login com sucesso', () => {
    cy.visit('https://www.unimeduberlandia.coop.br/portal/'); //Acessa o site da Unimed Uberlândia

    cy.get('#adopt-accept-all-button').click(); // Aceita cookies
    cy.get('.navbar-toggler-icon').click(); // Abre menu

    cy.get('#menu-item-18 > .nav-link').click(); // Clica em "Acessar Portal"

    cy.get('#cpfMenu').type(Cypress.env('UNIMED_PRD_CPF')); // Digita CPF
    cy.get('#senhaMenuPF').type(Cypress.env('UNIMED_PRD_PASSWORD'));// Digita Senha
    cy.get('#form-login-teste > .form-pf > button').click(); // Clica no botão de login

    cy.get('.container-fluid', { timeout: 10000 }).should('be.visible'); // Verifica se a página inicial foi carregada
  });
});
