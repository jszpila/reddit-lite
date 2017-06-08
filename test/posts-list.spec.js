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

      comp.startTimer();

      assert((comp.busy === false) && (comp.timer !== null));
    });
  });

  describe('#stopTimer', function() {
    it('should stop the timer after it has started', function() {
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

      comp.startTimer();

      comp.stopTimer();

      assert((comp.busy === true) && (comp.timer['0'] === null));
    });
  });
});
