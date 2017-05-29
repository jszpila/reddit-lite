// TODO:
// media queries
// TESTING!!!!!!!!!!!!!!!!

var vm = new Vue({
  el: '#RedditLite',
  data: {
    domain: 'https://www.reddit.com/',
    searching: false,
    activeSub: null,
    term: 'popular'
  },

  created: function() {
    // "restore" active sub data on refresh because why not;
    // alternately, could use local storage or somethinga as exotic as routing!
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
    // @subName - string - name of selected sub
    onSubSelect: function(subName) {
      this.activeSub = subName;
    }
  }
});
