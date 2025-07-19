describe('Fluxo de Login - Ambiente HML Unimed', () => {
  it('deve realizar login e pesquisar carta de permanência com sucesso', () => {
    // Acessa o site da Unimed Uberlândia HML
    cy.visit('https://servicoshom.unimeduberlandia.coop.br/');

    // Preenche usuário, senha e domínio
    cy.get('#Usuario').should('be.visible').type(Cypress.env('UNIMED_USER'));
    cy.get('#Senha').should('be.visible').type(Cypress.env('UNIMED_PASSWORD'));
    cy.get('#dominio').should('be.visible').select('6'); // CSC UNI
    cy.get('.btn-block').should('be.enabled').click();

    // Valida menu lateral
    cy.get('.sidebar-menu', { timeout: 10000 }).should('be.visible');

    // Acessa o menu Atendimento
    cy.get('.sidebar-menu > :nth-child(5) > [href="#"] > :nth-child(2)')
      .should('be.visible')
      .click();

    // Seleciona opção Carta de Permanência
    cy.get('.menu-open > .treeview-menu > :nth-child(4) > a')
      .should('be.visible')
      .click();

    // Digita o número da carta permanente
    cy.get('#codigoCartao', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .type(Cypress.env('CARTA_PERMANENCIA'));

    // Pesquisa carta de permanência
    cy.get('#buttonPesquisar').should('be.visible').click();

    // Validação extra: pode validar se resultado aparece
    // cy.get('.box-title').should('be.visible');
  });
});
