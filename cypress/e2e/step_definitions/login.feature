Feature: Login

  Scenario: Successful login
    Given I am on the login page
    When I type a valid my user and password
    Then I have a successful login
