describe('Login Unimed', () => {
  it('Deve realizar login com sucesso', () => {
    cy.visit('https://servicoshom.unimeduberlandia.coop.br/')

    cy.get('#Usuario').should('be.visible').type('jpmiranda')
    cy.get('#Senha').should('be.visible').type('Unimed@2029')
    cy.get('#dominio').should('be.visible').select('6') // Seleciona o domínio "CSC UNI" 
    cy.get('.btn-block').should('be.enabled').click()
    cy.get('.sidebar-menu', { timeout: 10000 }).should('be.visible')

    // Evite usar nth-child se possível
    cy.get('.sidebar-menu > :nth-child(5) > [href="#"] > :nth-child(2)')
      .should('be.visible')

    cy.url().should('include', '/pagina-inicial')
  })
})