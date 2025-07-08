describe('Fluxo de Login - Ambiente HML Unimed', () => {
  it('Deve realizar login com sucesso', () => {
    cy.visit('https://servicoshom.unimeduberlandia.coop.br/'); // Acessa o site da Unimed Uberlândia HML

    cy.get('#Usuario').should('be.visible').type(Cypress.env('UNIMED_USER')); // Digita o usuário
    cy.get('#Senha').should('be.visible').type(Cypress.env('UNIMED_PASSWORD')); // Digita a senha
    cy.get('#dominio').should('be.visible').select('6'); // CSC UNI
    cy.get('.btn-block').should('be.enabled').click(); // 

    //Cenário de Carta Permanência
    cy.get('.sidebar-menu', { timeout: 10000 }).should('be.visible'); // Verifica se o menu lateral foi carregado 

    cy.get('.sidebar-menu > :nth-child(5) > [href="#"] > :nth-child(2)') // Acessa o menu "Atendimento"
      .should('be.visible')
      .click();

    cy.get('.menu-open > .treeview-menu > :nth-child(4) > a').click(); // Seleciona a opção "Carta de Permanência"

    cy.get('#codigoCartao', { timeout: 10000 })
      .scrollIntoView()                        // garante que esteja na viewport
      .should('be.visible').type(Cypress.env('CARTA PERMANENCIA')); // Digita o número da carta permanente

    //cy.get('.box-title').should('be.visible');

    //cy.get('.menu-open > .treeview-menu > :nth-child(4) > a', { timeout: 10000 })
    //  .should('be.visible')
    //  .click();
    
    //cy.get('.col-lg-1 > .col-lg-12').should('be.visible').type(Cypress.env('CARTA PERMANENCIA')); // Digita o número da carta permanente
    cy.get('#buttonPesquisar').should('be.visible').click(); // Clica no botão de pesquisar

  });
});
