describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://faturadigitalhml.unimeduberlandia.coop.br/index.php'); // Acessa o site da Fatura Digital HML
    cy.get('#usuario').should('be.visible').type(Cypress.env('FATURA_DIGITAL_USER')); // Digita o usuário
    cy.get('#senha').should('be.visible').type(Cypress.env('FATURA_DIGITAL_PASSWORD')); // Digita a senha
    cy.get('.btn-primary').should('be.enabled').click(); // Clica no botão de login
    cy.get(':nth-child(1) > #dropdownSubMenu1', {timeout: 10000}).should('be.visible').click(); // Clica no menu "Configurações"
    cy.get('.nav-item.show > .dropdown-menu > :nth-child(2) > .dropdown-item').should('be.visible').click(); // Clica no submenu "Gerar Fatura Digital"

    cy.get('.card-title').should('contain.text', 'Anexos Cadastrados'); // Verifica se a página de geração de fatura digital está visível
    
    cy.get('.col-md-2 > .btn').should('be.visible').and('contain.text', 'Cadastrar Anexo').click();

        
    cy.get('#titulo').should('be.visible').type('Teste de Anexo'); // Digita o título do anexo
    
    cy.get('#tipoPessoa').should('not.be.disabled').select('PJ').should('have.value', 'PJ');
    
  describe('Upload de arquivo', () => {
  it('Faz upload do exemplo.pdf', () => {
    cy.visit('/pagina-upload');
    cy.get('#arquivo').attachFile('exemplo.pdf');
    cy.get('.mensagem-sucesso').should('contain.text', 'Upload realizado com sucesso');
  });
});
  })
})