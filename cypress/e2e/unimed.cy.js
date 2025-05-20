describe('Login Unimed', () => {
  it('passes', () => {
    cy.visit('https://servicoshom.unimeduberlandia.coop.br/')
    cy.get('#Usuario').type('seu_usuario')
    cy.get('#Senha').type('sua_senha')
    cy.get('#dominio').type('seu_dominio')  
    cy.get('.btn-block')
  })
})