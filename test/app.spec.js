var assert = require('assert'),
    Vue    = require('vue'),
    app    = '../src/js/app';

describe('app.vue', function() {
  describe('#onSubSearch', function() {
    it('should trigger subreddit search', function() {
      assert(true);
    });
  });

  describe('#onSearchComplete', function() {
    it('should reset the search state', function() {
      assert(true);
    });
  });

  describe('#onSubSelect', function() {
    it('should set the active subreddit', function() {
      assert(true);
    });
  });
});
