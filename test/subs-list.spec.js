import assert   from 'assert';
import Vue      from 'vue/dist/vue';
import subsList from '../src/js/components/subs-list.vue';

describe('subs-list.vue', function() {
  describe('#getSubReddits - popular', function() {
    it('should populate 25 "popular" subreddits', function(done) {
      let Constructor = Vue.extend(subsList);
      let comp = new Constructor({
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

  describe('#getSubReddits - test', function() {
    it('should populate 25 subreddits matching search term "test"', function(done) {
      let Constructor = Vue.extend(subsList);
      let comp = new Constructor({
        propsData: {
          domain:   'https://www.reddit.com/',
          term:     'test',
          activeSub: null
        }
      }).$mount();

      comp.getSubReddits(function() {
        assert((comp.subs.length === 25) && (comp.title === '"test" Subreddits'));
        return done();
      });
    });
  });

  describe('#getSubReddits - popular', function() {
    it('should NOT populate any results when searching for gibberish "68jo y997t6"', function(done) {
      let Constructor = Vue.extend(subsList);
      let comp = new Constructor({
        propsData: {
          domain:   'https://www.reddit.com/',
          term:     '68jo y997t6',
          activeSub: null
        }
      }).$mount();

      comp.getSubReddits(function() {
        assert((comp.subs.length === 0) && (comp.title === '"68jo y997t6" Subreddits'));
        return done();
      });
    });
  });

  describe('#isActiveSub - match', function() {
    it('should match the specified sub as the active sub', function() {
      let Constructor = Vue.extend(subsList);
      let comp = new Constructor({
        propsData: {
          domain:    'https://www.reddit.com/',
          term:      'popular',
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
      let Constructor = Vue.extend(subsList);
      let comp = new Constructor({
        propsData: {
          domain:    'https://www.reddit.com/',
          term:      'popular',
          activeSub: {
            dispay_name_prefixed: 'r/test'
          }
        }
      }).$mount();

      assert(comp.isActiveSub({data: {dispay_name_prefixed: 'r/test123'}}), false);
    });
  });
});
