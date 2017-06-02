import 'jsdom-global/register';
import assert     from 'assert';
import Vue        from 'vue/dist/vue';
import subSideBar from '../src/js/components/sub-sidebar.vue';

describe('sub-sidebar.vue', function() {
  describe('#decodeHTML', function() {
    it('should convert escaped text to HTML', function() {
      const Constructor = Vue.extend(subSideBar);
      const comp = new Constructor().$mount();

      assert(comp.decodeHTML('&lt;div class=\"test-class\"&gt;&lt;p&gt; hello this is a test &lt;/p&gt;&lt;/div&gt;'), '<div class="test-class"><p> hello this is a test </p></div>');
    });
  });
});
