Feature: Login

  Scenario: Successful login
    Given I am on the login page
    When I type a valid user and password
    Then I should see a successful login message
