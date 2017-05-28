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
        url += 'search.json?type=sr&q=' + encodeURIComponent(this.term);
      }

      fetch(url).then(function(res) {
        self.busy = false;
        return res.json();
      }).then(function(json) {
        if (json.error) {
          console.error(json.error, json.message);
        } else {
          self.subs = json.data.children;
          self.$emit('on-search-complete');
        }
      });
    },

    // Dispatch event to application to indicate selected subreddit has changed
    // @subName - string - name of selected subreddit
    selectSub: function(subName) {
      this.$emit('on-sub-select', subName);
    }
  },

  template: `<div class="panel panel-left">
              <h4>{{title}} <i v-if="busy" class="fa fa-refresh fa-spin"></i></h4>
              <ul class="subreddits-list">
                <li class="subreddit" v-for="sub in subs">
                  <a :href="'#' + sub.data.display_name_prefixed" @click="selectSub(sub.data.display_name_prefixed)">{{sub.data.display_name}}</a>
                </li>
              </ul>
            </div>`
});
