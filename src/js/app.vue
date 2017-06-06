import Vue         from 'vue';
import Header      from './components/header.vue';
import UTCDateTime from './components/utc-date-time.vue';
import Post        from './components/post.vue';
import PostsList   from './components/posts-list.vue';
import SubSidebar  from './components/sub-sidebar.vue';
import SubsList    from './components/subs-list.vue';

let app = new Vue({
  el: '#RedditLite',
  data: {
    domain: 'https://www.reddit.com/',
    searching: false,
    activeSub: null,
    term: 'default'
  },

  created: function() {
    // "restore" active sub data on refresh because why not;
    // alternately, could use local storage or something as exotic as routing!
    if (window.location.hash) {
      this.activeSub = {
        display_name_prefixed: window.location.hash.substr(1)
      }
    }
  },

  methods: {
    // Trigger search for subreddit by term
    // @term - string - term to search for
    onSubSearch: function(term) {
      this.term = term;
      this.activeSub = null;
      this.searching = true;
    },

    // Notify components that subreddit search is complete
    onSearchComplete: function() {
      this.searching = false;
    },

    // Trigger fetching posts for selected sub
    // @sub - object - data for selected sub
    onSubSelect: function(sub) {
      this.activeSub = sub;
    }
  }
});

export {app};
