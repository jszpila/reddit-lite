// TODO:
// input validation & error display
// handle no results
// handle fetch error
// set active sub colors (make subreddits into own component)
// check for hash on load
// media queries

var vm = new Vue({
  el: '#RedditLite',
  data: {
    domain: 'https://www.reddit.com/',
    searching: false,
    busy: false,
    errorState: false,
    errorData: null,
    subreddits: null,
    activeSub: null,
    posts: null
  },
  created: function(e) {
    this.getSubReddits('popular');
  },
  methods: {
    // Fetch subreddits
    // @term - string - search term
    getSubReddits: function(term) {
      var self = this,
          url  = this.domain;

      this.subreddits = null;
      this.posts = null;
      this.activeSub = null;
      this.busy = true;

      if (term === 'popular') {
        this.searchTitle = 'Popular Subreddits';
        url += 'subreddits/popular.json';
      } else {
        this.searchTitle = '"' + term + '" Subreddits';
        url += 'search.json?q=' + encodeURIComponent(term);
      }

      fetch(url).then(function(res) {
        self.busy = false;
        return res.json();
      }).then(function(json) {
        if (json.error) {
          self.errorState = true;
          self.error = data.error;
          console.error(data.error, data.message);
        } else {
          self.subreddits = json.data.children;
        }
      });
    },

    getPostsBySubName: function(subName) {
      var self = this;

      this.busy = true;
      this.activeSub = subName;

      fetch(this.domain + '/r/' + subName + '.json').then(function(res) {
        self.busy = false;
        return res.json();
      }).then(function(json) {
        if (json.error) {
          console.error(json.error);
        } else {
          self.posts = json.data.children;
        }
      });
    }
  }
});
