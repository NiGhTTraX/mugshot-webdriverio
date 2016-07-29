# Mugshot-WebdriverIO

[WebdriverIO](http://webdriver.io/) adapter for the [Mugshot](https://github.com/uberVU/mugshot) Visual regression testing lib.


## Usage

```sh
'use strict';
const chai = require('chai');
const expect = require('chai').expect;
const Mugshot = require('mugshot');
const chaiMugshot = require('chai-mugshot');
const webdriverio = require('webdriverio');
const WebdriverIOAdapter = require('mugshot-webdriverio');

const BROWSER = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
};

describe('Visual test suite', function() {
  let mugshotOptions = {
        acceptFirstBaseline: true
      },
      webdriverioInstance, browser;

  before(function(done) {
    webdriverioInstance = webdriverio.remote(BROWSER).init()
        .then(function() {
          browser = new WebdriverIOAdapter(webdriverioInstance);
          done();
        });
  });

  it(`should look OK`, function() {
    let captureItem = {
      name: 'screenshot'
    };

    return webdriverioInstance.url('www.example.com')
        .then(function() {
          let mugshot = new Mugshot(browser, mugshotOptions);
          chai.use(chaiMugshot(mugshot));
          return expect(captureItem).to.be.identical;
        });
  });

  after(function() {
    return webdriverioInstance.end();
  });
});
```
