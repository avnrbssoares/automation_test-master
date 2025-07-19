/// <reference types="cypress" />

// Testes automatizados para o exemplo de app de tarefas (to-do)
describe('Exemplo: To-Do App', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo');
  });

  it('deve exibir dois itens por padrão', () => {
    cy.get('.todo-list li').should('have.length', 2);
    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill');
    cy.get('.todo-list li').last().should('have.text', 'Walk the dog');
  });

  it('deve adicionar um novo item', () => {
    const novoItem = 'Feed the cat';
    cy.get('[data-test=new-todo]').type(`${novoItem}{enter}`);
    cy.get('.todo-list li')
      .should('have.length', 3)
      .last()
      .should('have.text', novoItem);
  });

  it('deve marcar um item como concluído', () => {
    cy.contains('Pay electric bill')
      .parent()
      .find('input[type=checkbox]')
      .check();
    cy.contains('Pay electric bill')
      .parents('li')
      .should('have.class', 'completed');
  });

  context('com uma tarefa marcada', () => {
    beforeEach(() => {
      cy.contains('Pay electric bill')
        .parent()
        .find('input[type=checkbox]')
        .check();
    });

    it('deve filtrar tarefas não concluídas', () => {
      cy.contains('Active').click();
      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Walk the dog');
      cy.contains('Pay electric bill').should('not.exist');
    });

    it('deve filtrar tarefas concluídas', () => {
      cy.contains('Completed').click();
      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Pay electric bill');
      cy.contains('Walk the dog').should('not.exist');
    });

    it('deve excluir todas as tarefas concluídas', () => {
      cy.contains('Clear completed').click();
      cy.get('.todo-list li')
        .should('have.length', 1)
        .should('not.have.text', 'Pay electric bill');
      cy.contains('Clear completed').should('not.exist');
    });
  });
});
