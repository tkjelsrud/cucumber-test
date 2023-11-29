Feature: Check website status

  Scenario: Verify badstudio.no is online
    Given site "https://www.badstudio.no/" is online
    Then the response status code should be 200
    Then page should contain "about"