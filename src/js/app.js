// TODO:
// input validation & error display
// handle no results
// handle fetch error
// set active sub colors (make subreddits into own component)
// check for hash on load
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
