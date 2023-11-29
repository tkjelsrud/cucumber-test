const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const https = require('https');
//const commonSteps = require('./common');

let response;
let data = '';
let pageContent = '';

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

    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', async () => {
        pageContent = data;
    });

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

/*Then('page should contain {string}', function(containStr, callback) {
    response.on('data', (chunk) => {
        data += chunk;
    });
    console.log(data);
    assert.match(data, new RegExp(containStr));
});*/

Then('page should contain {string}', function(expectedText) {
    //pageContent;
    assert.ok(pageContent.includes(expectedText), `Expected text "${expectedText}" not found on the page`);
});