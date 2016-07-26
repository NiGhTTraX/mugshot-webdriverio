const WebdriverIOAdapter = require('../lib/webdriverio.js');
const webdriverio = require('webdriverio');
const expect = require('chai').expect;
const path = require('path');

describe('Testing WebDriverIOAdaptor', function() {
  let url, options, webdriverioInstance, browser, selector, brokenSelector;
  let invalidWebdriverioInstance, invalidBrowser;

  before(function(done) {

    url = 'file://' + path.join(__dirname, 'test.html');

    options = {
      desiredCapabilities: {
        browserName: 'PhantomJS'
      }
    };

    webdriverioInstance = webdriverio.remote(options).init().url(url);
    invalidWebdriverioInstance = webdriverio.remote(options).init();

    browser = new WebdriverIOAdapter(webdriverioInstance);
    invalidBrowser = new WebdriverIOAdapter(invalidWebdriverioInstance);

    selector = '#rectangle';
    brokenSelector = 'something-broken';

    done();
  });

  it('should call the cb with error if browser is invalid', function(done) {

    invalidWebdriverioInstance
        .then(function() {

          invalidBrowser.takeScreenshot(function(error, screenshot) {
            expect(error).to.be.an.instanceof(Error);

            expect(screenshot).to.be.undefined;

            done();
          });
        });
  });

  it('should take a screenshot of the whole page', function(done) {

    webdriverioInstance
        .then(function() {

          browser.takeScreenshot(function(error, screenshot) {
            expect(error).to.be.null;

            expect(screenshot).to.be.an.instanceof(Buffer);

            done();
          });
        });
  });

  it('should take a screenshot of the selector', function(done) {

    webdriverioInstance
        .then(function() {

          browser.getBoundingClientRect(selector, function(error, data) {
            expect(error).to.be.null;

            expect(data).to.be.an('object');
            expect(data).to.have.property('width');
            expect(data).to.have.property('height');
            expect(data).to.have.property('top');
            expect(data).to.have.property('left');
            expect(data).to.have.property('bottom');
            expect(data).to.have.property('right');

            done();
          });
        });
  });

  it('should call the cb with error if the selector is broken', function(done) {

    webdriverioInstance
        .then(function() {

          browser.getBoundingClientRect(brokenSelector, function(error, data) {
            expect(error).to.be.an.instanceof(Error);

            expect(data).to.be.undefined;

            done();
          });
        });
  });

  after(function() {
    return webdriverioInstance.end();
  });
});
