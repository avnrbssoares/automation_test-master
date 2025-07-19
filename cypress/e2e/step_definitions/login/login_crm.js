// Step definitions para o cenário de login do CRM
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

/**
 * Acessa a página de login do CRM
 */
function visitLoginPage() {
  cy.visit("https://uberlandia.jmjsistemas.app/crm/#/authenticate");
}

/**
 * Realiza login com usuário e senha válidos
 */
function performLogin() {
  cy.get(":nth-child(1) > .login__input").type("laramos");
  cy.get(".ng-isolate-scope > #senha").type("kFOt6xfb7h");
  cy.get(".login__submit").click();
}

/**
 * Verifica se o login foi bem-sucedido
 */
function checkLoginSuccess() {
  cy.get(".content-wrapper > :nth-child(1)").should("be.visible");
}

// Steps Cucumber
Given("I am on the login page", () => {
  visitLoginPage();
});

When("I type a valid my user and password", () => {
  performLogin();
});

Then("I have a successful login", () => {
  checkLoginSuccess();
});
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Função para acessar a página de login
function visitLoginPage() {
  cy.visit("https://uberlandia.jmjsistemas.app/crm/#/authenticate");
}

// Função para realizar o login com usuário e senha válidos
function performLogin() {
  cy.get(":nth-child(1) > .login__input").type("laramos");
  cy.get(".ng-isolate-scope > #senha").type("kFOt6xfb7h");
  cy.get(".login__submit").click();
}

// Função para verificar se o login foi bem-sucedido
function checkLoginSuccess() {
  cy.get(".content-wrapper > :nth-child(1)").should("be.visible");
}

Given("I am on the login page", () => {
  visitLoginPage();
});

When("I type a valid my user and password", () => {
  performLogin();
});

Then("I have a successful login", () => {
  checkLoginSuccess();
});
