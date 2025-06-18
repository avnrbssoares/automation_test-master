describe('Login Unimed', () => {
  it('passes', () => {
    cy.visit('https://servicoshom.unimeduberlandia.coop.br/')
    cy.get('#Usuario').type('12255613611')
    cy.get('#Senha').type('Unimed@2029')
    cy.get('#dominio').type('seu_dominio')
    cy.get('.btn-block').click()
  })
})