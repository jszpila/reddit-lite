// TODO:
// input validation & error display
// handle no results
// handle fetch error
// set active sub colors
// set timer on posts!
// check for hash on load
// media queries

document.addEventListener('DOMContentLoaded', function(event) {
  Vue.component('rl-subs-list', {
    props: ['subs', 'title'],
    methods: {
      selectSub: function(subName) {
        this.$emit('select-sub', subName);
      }
    },
    template: `<div class="panel panel-left">
                <h4>{{title}}</h4>
                <ul class="subreddits-list">
                  <li v-for="sub in subs">
                    <a :href="'#' + sub.name" @click="selectSub(sub.name)">{{sub.name}}</a>
                  </li>
                </ul>
              </div>`
  });

  Vue.component('rl-posts-list', {
    props: ['posts', 'name', 'domain'],
    template: `<div class="panel panel-right">
                <h4 v-if="name">r/{{name}}</h4>
                <ul class="posts-list">
                  <li v-for="post in posts">
                    <rl-post :post="post.data" :domain="domain"></rl-post>
                  </li>
                </ul>
              </div>`
  });

  Vue.component('rl-post', {
    props: ['post', 'domain'],
    methods: {
      makeTitleUrl: function(permalink) {
        return this.domain + permalink;
      },

      makeAuthorUrl: function(author) {
        return this.domain + '/user/' + author;
      },

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
      }
    },
    template: `<div class="post-container">
                <a :href="makeTitleUrl(post.permalink)" class="title-link" target="_blank">{{post.title}}</a>
                  <div class="post-meta">
                    Submitted by <a :href="makeAuthorUrl(post.author)" class="author-link" target="_blank">{{post.author}}</a> at <span class="time-stamp">{{formatDate(post.created_utc)}}</span>
                    <a :href="post.url" class="comments-link" target="_blank">{{post.num_comments}} comments</a>
                  </div>
                </div>`

  });

  Vue.component('rl-app-header', {
    props: ['busy'],
    data: function() {
      return {
        searching: false,
        term: ''
      }
    },
    watch: {
      busy: function(val) {
        // Reset search state after searching from text field but do not alter when other fetching is in occurring
        if (this.searching) {
          this.searching = false;
        }
      }
    },
    computed: {
      shouldDisable: function() {
        return this.busy || this.searching || this.term.length === 0;
      }
    },
    methods: {
      submitTerm: function() {
        this.searching = true;
        this.$emit('search-subs', this.term);
      }
    },
    template: `<header id="TitleBar">
                <div class="flex-row-container">
                  <h1><i class="fa fa-reddit-square"></i> Reddit Lite</h1>
                  <form class="search-form">
                    <input name="Search" type="text" placeholder="Search Subreddits" v-model="term">
                    <button @click="submitTerm" @keyup.enter="submitTerm" :disabled="shouldDisable">
                      <i class="fa fa-search" v-show="!searching"></i>
                      <i class="fa fa-refresh fa-spin" v-show="searching"></i>
                    </button>
                  </form>
                </div>
              </header>`
  });

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
      // Endpoints return objects with different structure; transmogrify them!
      // @subredditData - array (of objects) - listing from Reddit endpoint
      formatSubredditData: function(subredditData) {
        var formatted = [],
            tmp       = null;

        for (var i = 0, x = subredditData.length; i < x; i++) {
          tmp = subredditData[i].data;
          formatted.push({'name': tmp.display_name ? tmp.display_name : tmp.subreddit, 'id': tmp.id});
        }

        return formatted;
      },

      // Fetch subreddits
      // @term - string - search term
      getSubReddits: function(term) {
        var self = this,
            url  = this.domain;

        this.posts = null;
        this.activeSub = '';
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
            self.subreddits = self.formatSubredditData(json.data.children);
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
});
