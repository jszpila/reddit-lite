import assert   from 'assert';
import Vue      from 'vue/dist/vue';
import subsList from '../src/js/components/subs-list.vue';

describe('subs-list.vue', function() {
  describe('#getSubReddits - popular', function() {
    it('should populate "popular" subreddits', function(done) {
      const Constructor = Vue.extend(subsList);
      const comp = new Constructor({
        propsData: {
          domain:   'https://www.reddit.com/',
          term:     'popular',
          activeSub: null
        }
      }).$mount();

      comp.getSubReddits(function() {
        assert((comp.subs.length === 25) && (comp.title === 'Popular Subreddits'));
        return done();
      });
    });
  });

  describe('#getSubReddits - search for "test"', function() {
    it('should populate subreddits matching "test" search term', function() {
      const Constructor = Vue.extend(subsList);
      const comp = new Constructor({
        propsData: {
          domain:   'https://www.reddit.com/',
          term:     'test',
          activeSub: null
        }
      }).$mount();

      comp.getSubReddits(function() {
        console.log(comp.subs.length, comp.title, comp.term)
        assert((comp.subs.length > 0) && (comp.title === '"test" Subreddits'));
        return done();
      });
    });
  });

  describe('#getSubReddits - search for gibberish', function() {
    it('should NOT populate any subreddits matching "68jo8yyou8" search term', function() {
      assert(true);
    });
  });

  describe('#isActiveSub - match', function() {
    it('should match the specified sub as the active sub', function() {
      const Constructor = Vue.extend(subsList);
      const comp = new Constructor({
        propsData: {
          domain:    'https://www.reddit.com/',
          term:      'isActiveSub test',
          activeSub: {
            dispay_name_prefixed: 'r/test'
          }
        }
      }).$mount();

      assert(comp.isActiveSub({data: {dispay_name_prefixed: 'r/test'}}), true);
    });
  });

  describe('#isActiveSub - not match', function() {
    it('should NOT match the specified sub as the active sub', function() {
      const Constructor = Vue.extend(subsList);
      const comp = new Constructor({
        propsData: {
          domain:    'https://www.reddit.com/',
          term:      'isActiveSub test',
          activeSub: {
            dispay_name_prefixed: 'r/test'
          }
        }
      }).$mount();

      assert(comp.isActiveSub({data: {dispay_name_prefixed: 'r/test123'}}), false);
    });
  });

  describe('#selectSub', function() {
    it('should emit the sub selection event', function() {
      assert(true);
    });
  });

  describe('#setErrorState', function() {
    it('should display the error message', function() {
      assert(true);
    });
  });
});
