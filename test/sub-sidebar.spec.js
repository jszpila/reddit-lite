import assert     from 'assert';
import subSideBar from '../src/js/components/sub-sidebar.vue';

describe('sub-sidebar.vue', function() {
  describe('#decodeHTML', function() {
    it('should convert escaped text to HTML', function() {
      const Constructor = Vue.extend(subSideBar);
      const comp = new Constructor().$mount();

      assert(comp.decodeHTML('&lt;div class=\"test-class\"&gt;&lt;p&gt; hello this is a test &lt;/p&gt;&lt;/div&gt;'), '<div class="test-class"><p> hello this is a test </p></div>');
    });
  });

  describe('#decodeHTML', function() {
    it('should NOT alter text that does not contain encoded characters', function() {
      const Constructor = Vue.extend(subSideBar);
      const comp = new Constructor().$mount();

      assert(comp.decodeHTML('tHe qu!ck brown $% fox jumP3d ()ver the lAzy d0ge!'), 'tHe qu!ck brown $% fox jumP3d ()ver the lAzy d0ge!');
    });
  });
});
