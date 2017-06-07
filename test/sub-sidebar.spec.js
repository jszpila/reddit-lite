import assert     from 'assert';
import subSideBar from '../src/js/components/sub-sidebar.vue';

describe('sub-sidebar.vue', function() {
  describe('#created', function() {
    it('should NOT have any content if initialized without a subbreddit in the location hash', function(done) {
      window.location.hash = '';

      const Constructor = Vue.extend(subSideBar);
      const comp = new Constructor({
          propsData: {
            domain:   'https://www.reddit.com/',
            activeSub: null
          }}).$mount();

      Vue.nextTick(() => {
        assert(comp.content === null);
        done();
      });
    });
  });

  describe('#created', function() {
    it('should set active subbreddit if there is one in the location hash', function(done) {
      window.location.hash = '#r/AskReddit';

      const Constructor = Vue.extend(subSideBar);
      const comp = new Constructor({
          propsData: {
            domain:   'https://www.reddit.com/',
            activeSub: null
          }}).$mount();

      Vue.nextTick(() => {
        assert(comp.activeSub.display_name_prefixed === 'r/AskReddit');
        done();
      });
    });
  });

  describe('#created', function() {
    it('should have content if initialized with a subbreddit data as a prop', function(done) {
      const Constructor = Vue.extend(subSideBar);
      const comp = new Constructor({
          propsData: {
            domain:   'https://www.reddit.com/',
            activeSub: {
              display_name_prefixed: 'r/AskReddit',
              description_html:      '<h1>hello world</h1>'
            }
          }}).$mount();

      Vue.nextTick(() => {
        assert(comp.activeSub.description_html === '<h1>hello world</h1>');
        done();
      });
    });
  });

  describe('#decodeHTML', function() {
    it('should convert escaped text to HTML', function() {
      const Constructor = Vue.extend(subSideBar);
      const comp = new Constructor({
          propsData: {
            domain:   'https://www.reddit.com/',
            activeSub: {
              display_name_prefixed: 'r/AskReddit',
              description_html:      '&lt;div class=\"test-class\"&gt;&lt;p&gt; hello this is a test &lt;/p&gt;&lt;/div&gt;'
            }
          }}).$mount();

      assert(comp.decodeHTML('&lt;div class=\"test-class\"&gt;&lt;p&gt; hello this is a test &lt;/p&gt;&lt;/div&gt;'), '<div class="test-class"><p> hello this is a test </p></div>');
    });
  });

  describe('#decodeHTML', function() {
    it('should NOT alter text that does not contain escaped HTML', function() {
      const Constructor = Vue.extend(subSideBar);
      const comp = new Constructor({
          propsData: {
            domain:   'https://www.reddit.com/',
            activeSub: {
              display_name_prefixed: 'r/AskReddit',
              description_html:      '<><<tHe qu!ck brown $% fox jumP3d ()ver the lAzy d0ge!><'
            }
          }}).$mount();

      assert(comp.decodeHTML('tHe qu!ck brown $% fox jumP3d ()ver the lAzy d0ge!'), '<><<tHe qu!ck brown $% fox jumP3d ()ver the lAzy d0ge!><');
    });
  });

  describe('#getContent', function() {
    it('should set the sidebar content to HTML, converted from escaped HTML content', function() {
      const Constructor = Vue.extend(subSideBar);
      const comp = new Constructor({
          propsData: {
            domain:   'https://www.reddit.com/',
            activeSub: {
              display_name_prefixed: 'r/AskReddit',
              description_html:      '&lt;div class=\"test-class\"&gt;&lt;p&gt; hello this is a test &lt;/p&gt;&lt;/div&gt;'
            }
          }}).$mount();

      comp.getContent();

      assert(comp.content === '<div class="test-class"><p> hello this is a test </p></div>');
    });
  });

  describe('#getContent', function() {
    it('should set the sidebar content and NOT alter text that does not contain encoded characters', function() {
      const Constructor = Vue.extend(subSideBar);
      const comp = new Constructor({
          propsData: {
            domain:   'https://www.reddit.com/',
            activeSub: {
              display_name_prefixed: 'r/AskReddit',
              description_html:      '<><<tHe qu!ck brown $% fox jumP3d ()ver the lAzy d0ge!><'
            }
          }}).$mount();

      comp.getContent();

      assert(comp.content === '<><<tHe qu!ck brown $% fox jumP3d ()ver the lAzy d0ge!><');
    });
  });
});
