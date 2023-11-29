Feature: Sample Feature

  Scenario: Testing the web server
    Given the server is running
    When I make a request to the server
    Then the response should contain "Hello, World!"