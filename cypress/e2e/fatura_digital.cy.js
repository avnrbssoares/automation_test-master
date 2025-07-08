describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://faturadigitalhml.unimeduberlandia.coop.br/index.php'); // Acessa o site da Fatura Digital HML
    cy.get('#usuario').should('be.visible').type(Cypress.env('FATURA_DIGITAL_USER')); // Digita o usuário
    cy.get('#senha').should('be.visible').type(Cypress.env('FATURA_DIGITAL_PASSWORD')); // Digita a senha
    cy.get('.btn-primary').should('be.enabled').click(); // Clica no botão de login
    cy.get(':nth-child(2) > #dropdownSubMenu1', {timeout: 10000}).should('be.visible').click(); // Clica no menu "Envio de Boleto"
    cy.get(':nth-child(3) > #dropdownSubMenu2', {timeout: 10000}).should('be.visible').click(); // Clica no submenu
    cy.get(':nth-child(3) > #dropdownSubMenu2', {timeout: 10000}).get('select').select('3'); // Clica na opção desejada

    cy.get('[aria-labelledby="dropdownSubMenu1"] > :nth-child(3) > .dropdown-menu > :nth-child(4) > .dropdown-item')
  })
})