global.fetch = require('whatwg-fetch').fetch;
global.Vue = require('vue/dist/vue');
require('jsdom-global')();

document.body.innerHTML = '<html><head></head><body><main id="RedditLite"></main></body>';
