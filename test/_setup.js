global.Vue   = require('vue/dist/vue');
global.fetch = require('whatwg-fetch').fetch;

before(function() {
  this.jsdom = require('jsdom-global')();

  document.body.innerHTML = '<html><head></head><body><main id="RedditLite"></main></body>';
});
