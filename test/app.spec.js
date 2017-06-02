import 'jsdom-global/register';
import assert from 'assert';
import Vue    from 'vue/dist/vue';
import app    from '../src/js/app.vue';

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
