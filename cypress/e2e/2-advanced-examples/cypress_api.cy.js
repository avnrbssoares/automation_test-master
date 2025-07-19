/// <reference types="cypress" />

// Testes das APIs do Cypress
describe('Cypress APIs', () => {
  context('Cypress.Commands', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/cypress-api');
    });

    it('deve criar um comando customizado', () => {
      Cypress.Commands.add('console', { prevSubject: true }, (subject, method = 'log') => {
        console[method]('The subject is', subject);
        return subject;
      });
      cy.get('button').console('info').then(($button) => {
        expect($button).to.exist;
      });
    });
  });

  context('Cypress.Cookies', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/cypress-api');
    });

    it('deve habilitar debug de cookies', () => {
      Cypress.Cookies.debug(true);
      cy.setCookie('fakeCookie', '123ABC');
      cy.clearCookie('fakeCookie');
      cy.setCookie('fakeCookie', '123ABC');
      cy.clearCookie('fakeCookie');
      cy.setCookie('fakeCookie', '123ABC');
    });
  });

  context('Cypress.arch', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/cypress-api');
    });
    it('deve obter arquitetura do sistema operacional', () => {
      expect(Cypress.arch).to.exist;
    });
  });

  context('Cypress.config()', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/cypress-api');
    });
    it('deve obter e alterar opções de configuração', () => {
      const myConfig = Cypress.config();
      expect(myConfig).to.include({
        animationDistanceThreshold: 5,
        baseUrl: null,
        defaultCommandTimeout: 4000,
        requestTimeout: 5000,
        responseTimeout: 30000,
        viewportHeight: 660,
        viewportWidth: 1000,
        pageLoadTimeout: 60000,
        waitForAnimations: true,
      });
      expect(Cypress.config('pageLoadTimeout')).to.eq(60000);
      Cypress.config('pageLoadTimeout', 20000);
      expect(Cypress.config('pageLoadTimeout')).to.eq(20000);
      Cypress.config('pageLoadTimeout', 60000);
    });
  });

  context('Cypress.dom', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/cypress-api');
    });
    it('deve verificar se elemento está oculto', () => {
      const hiddenP = Cypress.$('.dom-p p.hidden').get(0);
      const visibleP = Cypress.$('.dom-p p.visible').get(0);
      expect(Cypress.dom.isHidden(hiddenP)).to.be.true;
      expect(Cypress.dom.isHidden(visibleP)).to.be.false;
    });
  });

  context('Cypress.env()', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/cypress-api');
    });
    it('deve obter e definir variáveis de ambiente', () => {
      Cypress.env({ host: 'veronica.dev.local', api_server: 'http://localhost:8888/v1/' });
      expect(Cypress.env('host')).to.eq('veronica.dev.local');
      Cypress.env('api_server', 'http://localhost:8888/v2/');
      expect(Cypress.env('api_server')).to.eq('http://localhost:8888/v2/');
      expect(Cypress.env()).to.include({ host: 'veronica.dev.local', api_server: 'http://localhost:8888/v2/' });
    });
  });

  context('Cypress.log', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/cypress-api');
    });
    it('deve controlar o que é impresso no Command Log', () => {
      // Exemplo de uso do Cypress.log
      Cypress.log({ name: 'custom log', message: 'Testando log customizado' });
    });
  });

  context('Cypress.platform', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/cypress-api');
    });
    it('deve obter nome do sistema operacional', () => {
      expect(Cypress.platform).to.exist;
    });
  });

  context('Cypress.version', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/cypress-api');
    });
    it('deve obter versão atual do Cypress', () => {
      expect(Cypress.version).to.exist;
    });
  });

  context('Cypress.spec', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/cypress-api');
    });
    it('deve obter informações do spec atual', () => {
      cy.wrap(Cypress.spec).should('include.keys', ['name', 'relative', 'absolute']);
    });
  });
});
