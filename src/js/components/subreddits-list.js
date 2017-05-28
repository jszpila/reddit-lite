Vue.component('rl-subs-list', {
  props: ['term', 'domain'],
  data: function() {
    return {
      busy: true,
      subs: null,
      title: ''
    }
  },

  created: function() {
    // Fetch popular subs on initial load
    if (!this.subs) {
      this.getSubReddits();
    }
  },

  watch: {
    term: function(val) {
      this.subs = null;
      this.getSubReddits();
    }
  },

  methods: {
    // Get subreddits matching specified term
    getSubReddits: function() {
      var self = this,
          url  = this.domain;

      this.busy = true;

      if (this.term === 'popular') {
        this.title = 'Popular Subreddits';
        url += 'subreddits/popular.json';
      } else {
        this.title = '"' + this.term + '" Subreddits';
        url += 'search.json?q=' + encodeURIComponent(this.term);
      }

      fetch(url).then(function(res) {
        self.busy = false;
        return res.json();
      }).then(function(json) {
        if (json.error) {
          console.error(json.error, json.message);
        } else {
          self.subs = self.formatSubData(json.data.children);
          self.$emit('on-search-complete');
        }
      });
    },

    // Popular and searched-for subs return data with different structures
    // @subs - array (of objects) - subreddit data
    // @return - array (of objects)
    formatSubData: function(subs) {
      var formatted = [],
          tmp       = null;

      for (var i = 0, x = subs.length; i < x; i++) {
        tmp = subs[i].data;

        formatted.push({'name': tmp.display_name ? tmp.display_name : tmp.subreddit, 'id': tmp.id});
      }

      return formatted;
    },

    // Dispatch event to application to indicate selected subreddit has changed
    // @subName - string - name of selected subreddit
    selectSub: function(subName) {
      this.$emit('on-sub-select', subName);
    }
  },

  template: `<div class="panel panel-left">
              <h4>{{title}} <i v-if="busy" class="fa fa-spinner fa-pulse fa-fw"></i></h4>
              <ul class="subreddits-list">
                <li v-for="sub in subs">
                  <a :href="'#' + sub.name" @click="selectSub(sub.name)">{{sub.name}}</a>
                </li>
              </ul>
            </div>`
});
