// TODO:
// input validation & error display
// handle no results
// handle fetch error
// set active sub colors
// set timer on posts!
// check for hash on load

document.addEventListener('DOMContentLoaded', function(event) {
  var vm = new Vue({
    el: '#RedditLite',
    data: {
      domain: 'https://www.reddit.com/',
      searchTerm: '',
      searchTitle: '',
      searching: false,
      busy: false,
      errorState: false,
      errorData: null,
      subreddits: null,
      activeSub: null,
      posts: null
    },
    created: function(e) {
      this.getSubReddits(true);
    },
    methods: {
      formatDate: function(utcStr) {
        var d        = new Date(0),
            h        = null,
            meridian = 'am';

        d.setUTCSeconds(utcStr);
        h = d.getHours();

        if (h > 12) {
          h -= 12;
          meridian = 'pm';
        }

        return ((d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + ', ' + h + ':' + d.getMinutes() + meridian);
      },
      // Endpoints return objects with different structure; transmogrify them!
      // @subredditData - array (of objects) - listing from Reddit endpoint
      formatSubredditData: function(subredditData) {
        var formatted = [],
            tmp       = null;

        for (var i = 0, x = subredditData.length; i < x; i++) {
          tmp = subredditData[i].data;
          formatted.push({'title': tmp.display_name ? tmp.display_name : tmp.subreddit, 'id': tmp.id});
        }

        return formatted;
      },
      // Fetch subreddits meeting specified criteria
      // @popular - boolean - determine whether popular or searched for subreddits should be fetched
      getSubReddits: function(popular) {
        var self = this,
            url  = this.domain;

        if (popular) {
          this.searchTitle = 'Popular Subreddits';
          url += 'subreddits/popular.json';
        } else {
          this.searchTitle = '"' + this.searchTerm + '" Subreddits';
          url += 'search.json?q=' + encodeURIComponent(this.searchTerm);
        }

        this.busy = true;

        fetch(url).then(function(res) {
          self.busy = false;
          self.searching = false;
          return res.json();
        }).then(function(json) {
          if (json.error) {
            self.errorState = true;
            self.error = data.error;
            console.error(data.error, data.message);
          } else {
            self.subreddits = self.formatSubredditData(json.data.children);
          }
        });
      },
      searchSubReddits: function(e) {
        this.searching = true;
        this.posts = null;
        this.getSubReddits(false);
      },
      getPosts: function(subName) {
        var self = this;

        this.busy = true;
        this.activeSub = subName;

        fetch(this.domain + '/r/' + subName + '.json').then(function(res) {
          this.busy = false;
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
});
