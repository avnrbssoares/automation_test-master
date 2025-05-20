import {given, when, then} from "cypress-cucumber-preprocessor/steps"

Given("I am on the login page", () => {
  cy.visit('https://uberlandia.jmjsistemas.app/crm/#/authenticate')
})

When("I type a valid my user and password", () => {
  cy.get(':nth-child(1) > .login__input').type('laramos')
  cy.get('.ng-isolate-scope > #senha').type('kFOt6xfb7h')
  cy.get('.login__submit').click()
})

Then("I have a successful login", () => {
    cy.get('.content-wrapper > :nth-child(1)').should('be.visible')   
  })
