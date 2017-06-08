import assert from 'assert';
import header from '../src/js/components/header.vue';

describe('header.vue', function() {
  describe('#created - without term', function() {
    it('submit button should be initially disabled', function() {
      const Constructor = Vue.extend(header);
      const comp = new Constructor({
        propsData: {
          searching: false
        }
      }).$mount();

      // ???

      assert(true);
    });
  });

  describe('#created - with term', function() {
    it('submit button should be enabled when there is a search term', function() {
      const Constructor = Vue.extend(header);
      const comp = new Constructor({
        propsData: {
          searching: false
        }
      }).$mount();

      this.term = 'test';

      // ???

      assert(true);
    });
  });

  describe('#watch - term', function() {
    it('busy should false when searching is true', function() {
      const Constructor = Vue.extend(header);
      const comp = new Constructor({
        propsData: {
          searching: false
        }
      }).$mount();

      comp.searching = true;

      assert(comp.busy === false);
    });
  });

  describe('#submitTerm', function() {
    it('busy should true when a search is submitted', function() {
      const Constructor = Vue.extend(header);
      const comp = new Constructor({
        propsData: {
          searching: false
        }
      }).$mount();

      comp.submitTerm();

      assert(comp.busy === true);
    });
  });
});
