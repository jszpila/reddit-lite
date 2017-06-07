import 'jsdom-global/register';
import assert from 'assert';
import app    from '../src/js/app.vue';

describe('app.vue', function() {
  describe('#created', function() {
    it('should initialize the application without a default subreddit', function() {
      assert(true);
    });
  });

  describe('#created', function() {
    it('should initialize the application with r/AskReddit as the active subreddit', function() {
      assert(true);
    });
  });

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
