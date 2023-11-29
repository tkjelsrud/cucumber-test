const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const https = require('https');

let response;


Given('site {string} is online', function(websiteUrl, callback) {
    const url = new URL(websiteUrl);
    const requestOptions = {
    method: 'GET',
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    path: '/',
  };

  const req = https.request(requestOptions, (res) => {
    response = res;
    callback();
  });

  req.on('error', (err) => {
    console.error('Error making HTTP request:', err);
    callback(err);
  });

  req.end();
});

Then('the response status code should be {int}', function(expectedStatusCode) {
  assert.equal(response.statusCode, expectedStatusCode);
});