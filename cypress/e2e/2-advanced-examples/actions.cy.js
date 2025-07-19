/// <reference types="cypress" />

// Testes de ações em elementos da interface
describe('Ações em elementos', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/actions');
  });

  it('deve digitar em um elemento', () => {
    cy.get('.action-email').type('fake@email.com').should('have.value', 'fake@email.com');
    cy.get('.action-email').type('{leftarrow}{rightarrow}{uparrow}{downarrow}');
    cy.get('.action-email').type('{del}{selectall}{backspace}');
    cy.get('.action-email').type('{alt}{option}');
    cy.get('.action-email').type('{ctrl}{control}');
    cy.get('.action-email').type('{meta}{command}{cmd}');
    cy.get('.action-email').type('{shift}');
    cy.get('.action-email').type('slow.typing@email.com', { delay: 100 }).should('have.value', 'slow.typing@email.com');
    cy.get('.action-disabled').type('disabled error checking', { force: true }).should('have.value', 'disabled error checking');
  });

  it('deve focar em um elemento', () => {
    cy.get('.action-focus').focus().should('have.class', 'focus').prev().should('have.attr', 'style', 'color: orange;');
  });

  it('deve remover o foco de um elemento', () => {
    cy.get('.action-blur').type('About to blur').blur().should('have.class', 'error').prev().should('have.attr', 'style', 'color: red;');
  });

  it('deve limpar um input ou textarea', () => {
    cy.get('.action-clear').type('Clear this text').should('have.value', 'Clear this text');
    cy.get('.action-clear').clear().should('have.value', '');
  });

  it('deve submeter um formulário', () => {
    cy.get('.action-form').find('[type="text"]').type('HALFOFF');
    cy.get('.action-form').submit();
    cy.get('.action-form').next().should('contain', 'Your form has been submitted!');
  });

  it('deve clicar em elementos', () => {
    cy.get('.action-btn').click();
    cy.get('#action-canvas').click();
    cy.get('#action-canvas').click('topLeft');
    cy.get('#action-canvas').click('top');
    cy.get('#action-canvas').click('topRight');
    cy.get('#action-canvas').click('left');
    cy.get('#action-canvas').click('right');
    cy.get('#action-canvas').click('bottomLeft');
    cy.get('#action-canvas').click('bottom');
    cy.get('#action-canvas').click('bottomRight');
    cy.get('#action-canvas').click(80, 75);
    cy.get('#action-canvas').click(170, 75);
    cy.get('#action-canvas').click(80, 165);
    cy.get('#action-canvas').click(100, 185);
    cy.get('#action-canvas').click(125, 190);
    cy.get('#action-canvas').click(150, 185);
    cy.get('#action-canvas').click(170, 165);
    cy.get('.action-labels>.label').click({ multiple: true });
    cy.get('.action-opacity>.btn').click({ force: true });
  });

  it('deve dar duplo clique em um elemento', () => {
    cy.get('.action-div').dblclick();
    cy.get('.action-div').should('not.be.visible');
    cy.get('.action-input-hidden').should('be.visible');
  });

  it('deve clicar com o botão direito em um elemento', () => {
    cy.get('.rightclick-action-div').rightclick();
    cy.get('.rightclick-action-div').should('not.be.visible');
    cy.get('.rightclick-action-input-hidden').should('be.visible');
  });

  it('deve marcar checkboxes e radios', () => {
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').check().should('be.checked');
    cy.get('.action-radios [type="radio"]').not('[disabled]').check().should('be.checked');
    cy.get('.action-radios [type="radio"]').check('radio1').should('be.checked');
    cy.get('.action-multiple-checkboxes [type="checkbox"]').check(['checkbox1', 'checkbox2']).should('be.checked');
    cy.get('.action-checkboxes [disabled]').check({ force: true }).should('be.checked');
    cy.get('.action-radios [type="radio"]').check('radio3', { force: true }).should('be.checked');
  });

  it('deve desmarcar checkboxes', () => {
    cy.get('.action-check [type="checkbox"]').not('[disabled]').uncheck().should('not.be.checked');
    cy.get('.action-check [type="checkbox"]').check('checkbox1').uncheck('checkbox1');
    cy.get('.action-check [type="checkbox"][value="checkbox1"]').should('not.be.checked');
    cy.get('.action-check [type="checkbox"]').check(['checkbox1', 'checkbox3']).uncheck(['checkbox1', 'checkbox3']);
    cy.get('.action-check [type="checkbox"][value="checkbox1"]').should('not.be.checked');
    cy.get('.action-check [type="checkbox"][value="checkbox3"]').should('not.be.checked');
    cy.get('.action-check [disabled]').uncheck({ force: true }).should('not.be.checked');
  });

  it('deve selecionar opções em <select>', () => {
    cy.get('.action-select').should('have.value', '--Select a fruit--');
    cy.get('.action-select').select('apples').should('have.value', 'fr-apples');
    cy.get('.action-select-multiple').select(['apples', 'oranges', 'bananas']).invoke('val').should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas']);
    cy.get('.action-select').select('fr-bananas').should('have.value', 'fr-bananas');
    cy.get('.action-select-multiple').select(['fr-apples', 'fr-oranges', 'fr-bananas']).invoke('val').should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas']);
    cy.get('.action-select-multiple').invoke('val').should('include', 'fr-oranges');
  });

  it('deve rolar elementos para a visualização', () => {
    cy.get('#scroll-horizontal button').should('not.be.visible');
    cy.get('#scroll-horizontal button').scrollIntoView().should('be.visible');
    cy.get('#scroll-vertical button').should('not.be.visible');
    cy.get('#scroll-vertical button').scrollIntoView().should('be.visible');
    cy.get('#scroll-both button').should('not.be.visible');
    cy.get('#scroll-both button').scrollIntoView().should('be.visible');
  });

  it('deve disparar eventos em elementos', () => {
    cy.get('.trigger-input-range').invoke('val', 25).trigger('change');
    cy.get('.trigger-input-range').get('input[type=range]').siblings('p').should('have.text', '25');
  });

  it('deve rolar a janela ou elemento para uma posição', () => {
    cy.scrollTo('bottom');
    cy.get('#scrollable-horizontal').scrollTo('right');
    cy.get('#scrollable-vertical').scrollTo(250, 250);
    cy.get('#scrollable-both').scrollTo('75%', '25%');
    cy.get('#scrollable-vertical').scrollTo('center', { easing: 'linear' });
    cy.get('#scrollable-both').scrollTo('center', { duration: 2000 });
  });
});
