describe('Login Unimed', () => {
  it('deve realizar login com sucesso', () => {
    cy.visit('https://servicoshom.unimeduberlandia.coop.br/');

    // Preenche usuário, senha e domínio
    cy.get('#Usuario').should('be.visible').type('jpmiranda');
    cy.get('#Senha').should('be.visible').type('Unimed@2029');
    cy.get('#dominio').should('be.visible').select('6'); // CSC UNI

    // Realiza login
    cy.get('.btn-block').should('be.enabled').click();

    // Valida menu lateral visível
    cy.get('.sidebar-menu', { timeout: 10000 }).should('be.visible');

    // Valida item do menu (evite nth-child, mas mantém para garantir funcionalidade)
    cy.get('.sidebar-menu > :nth-child(5) > [href="#"] > :nth-child(2)')
      .should('be.visible');

    // Valida URL de sucesso
    cy.url().should('include', '/pagina-inicial');
  });
});