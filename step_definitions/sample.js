const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const http = require('http');

let server;
let response;

Given('the server is running', () => {
  server = require('../server'); // Make sure to adjust the path based on your project structure
});

When('I make a request to the server', (callback) => {
  http.get('http://localhost:3000', (res) => {
    response = res;
    callback();
  });
});

Then('the response should contain {string}', (expected, callback) => {
  let data = '';
  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    assert.strictEqual(data.trim(), expected);
    callback();
  });
});
