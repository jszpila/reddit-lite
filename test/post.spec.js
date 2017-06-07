import assert from 'assert';
import post   from '../src/js/components/post.vue';

describe('post.vue', function() {
  describe('#makeAuthorUrl', function() {
    it('should create a valid user URL', function() {
      const Constructor = Vue.extend(post);
      const comp = new Constructor({
        propsData: {
          domain: 'https://www.reddit.com',
          post:   {
                    url:          'https://www.reddit.com/wiki/faq',
                    title:        'Some post title',
                    author:       'someguy',
                    num_comments: 86,
                    created_utc:  1496376816
                  }
        }
      }).$mount();

      assert(comp.makeAuthorUrl('someguy'), 'http://www.reddit.com/user/someguy');
    });
  });
});
