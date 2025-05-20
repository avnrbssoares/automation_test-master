describe('Login Unimed', () => {
  it('passes', () => {
    cy.visit('https://www.unimeduberlandia.coop.br/portal/')
    cy.get('.adopt-c-bXGRNs')
    cy.get('#adopt-accept-all-button').click()
    cy.get('.navbar-toggler-icon').click()
    cy.get('#menu-item-18 > .nav-link').click()
    cy.get('#cpfMenu').type('12255613611')
    cy.get('#senhaMenuPF').type('Unimed')
    cy.get('#form-login-teste > .form-pf > button').click()
  })
})