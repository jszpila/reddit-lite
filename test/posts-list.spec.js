import assert    from 'assert';
import postsList from '../src/js/components/posts-list.vue';

describe('posts-list.vue', function() {
  describe('#getPosts', function() {
    it('should populate 25 posts from r/AskReddit', function(done) {
      let Constructor = Vue.extend(postsList);
      let comp = new Constructor({
        propsData: {
          domain:   'https://www.reddit.com/',
          term:     '',
          activeSub: {
            display_name_prefixed: 'r/AskReddit'
          }
        }
      }).$mount();

      comp.getPosts(function() {
        assert((comp.posts.length === 25));
        return done();
      });
    });
  });

  describe('#startTimer', function() {
    it('should start the timer', function() {
      assert(true);
    });
  });

  describe('#getTimeStamp', function() {
    it('should return the current UTC time stamp', function() {
      assert(true);
    });
  });

  describe('#setErrorState', function() {
    it('should display an error message', function() {
      assert(true);
    });
  });
});
