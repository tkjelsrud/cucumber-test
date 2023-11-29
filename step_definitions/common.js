const { Before, Then } = require('cucumber');
const assert = require('assert');

Before(async function() {
    this.pageContent = '';  // Initialize the context
});

Then('page should contain {string}', function(expectedText) {
    assert.ok(this.pageContent.includes(expectedText), `Expected text "${expectedText}" not found on the page`);
});