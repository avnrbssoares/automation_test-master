/// <reference types="cypress" />

// Testes de requisições de rede no Cypress
describe('Network Requests', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/network-requests');
  });

  it('deve fazer uma requisição XHR com cy.request()', () => {
    cy.request('https://jsonplaceholder.cypress.io/comments')
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('length').and.be.oneOf([500, 501]);
        expect(response).to.have.property('headers');
        expect(response).to.have.property('duration');
      });
  });

  it('deve verificar resposta usando BDD com cy.request()', () => {
    cy.request('https://jsonplaceholder.cypress.io/comments')
      .then((response) => {
        expect(response).property('status').to.equal(200);
        expect(response).property('body').to.have.property('length').and.be.oneOf([500, 501]);
        expect(response).to.include.keys('headers', 'duration');
      });
  });

  it('deve fazer requisição com parâmetros de query', () => {
    cy.request({
      url: 'https://jsonplaceholder.cypress.io/comments',
      qs: { postId: 1, id: 3 },
    })
      .its('body')
      .should('be.an', 'array')
      .and('have.length', 1)
      .its('0')
      .should('contain', { postId: 1, id: 3 });
  });

  it('deve passar resultado para segunda requisição', () => {
    cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
      .its('body.0')
      .then((user) => {
        expect(user).property('id').to.be.a('number');
        cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
          userId: user.id,
          title: 'Cypress Test Runner',
          body: 'Fast, easy and reliable testing for anything that runs in a browser.',
        });
      })
      .then((response) => {
        expect(response).property('status').to.equal(201);
        expect(response).property('body').to.contain({ title: 'Cypress Test Runner' });
        expect(response.body).property('id').to.be.a('number').and.to.be.gt(100);
        expect(response.body).property('userId').to.be.a('number');
      });
  });

  it('deve salvar resposta no contexto do teste', () => {
    cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
      .its('body.0').as('user')
      .then(function () {
        cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
          userId: this.user.id,
          title: 'Cypress Test Runner',
          body: 'Fast, easy and reliable testing for anything that runs in a browser.',
        })
        .its('body').as('post');
      })
      .then(function () {
        expect(this.post, 'post tem o userId correto').property('userId').to.equal(this.user.id);
      });
  });

  it('deve interceptar e rotas respostas de requisições', () => {
    const message = 'whoa, this comment does not exist';
    cy.intercept('GET', '**/comments/*').as('getComment');
    cy.get('.network-btn').click();
    cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304]);
    cy.intercept('POST', '**/comments').as('postComment');
    cy.get('.network-post').click();
    cy.wait('@postComment').should(({ request, response }) => {
      expect(request.body).to.include('email');
      expect(request.headers).to.have.property('content-type');
      expect(response && response.body).to.have.property('name', 'Using POST in cy.intercept()');
    });
    cy.intercept({ method: 'PUT', url: '**/comments/*' }, {
      statusCode: 404,
      body: { error: message },
      headers: { 'access-control-allow-origin': '*' },
      delayMs: 500,
    }).as('putComment');
    cy.get('.network-put').click();
    cy.wait('@putComment');
    cy.get('.network-put-comment').should('contain', message);
  });
});
