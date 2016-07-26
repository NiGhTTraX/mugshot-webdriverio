const WebDriverIOAdaptor = require('./lib/webdriverio.js');

WebDriverIOAdaptor.interfaces = {
  browser: require('./lib/interfaces/browser.js')
};

module.exports = WebDriverIOAdaptor;
