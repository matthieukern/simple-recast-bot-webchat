// @flow
/**
 * @module
 * The configs for the front end. If we are on the browser, retrieve
 * configs from the data sent by the server through window.__CONFIG__.
 *
 * If we are on the server, it parses the config.json file.
 */
if (process.env.BROWSER) {
  module.exports = window.__CONFIG__;
} else {
  module.exports = require("../config.json");
}
