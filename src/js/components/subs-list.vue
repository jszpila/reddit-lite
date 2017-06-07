export default Vue.component('rl-subs-list', {
  props: ['activeSub', 'term', 'domain'],
  data: function() {
    return {
      busy: true,
      subs: null,
      title: '',
      showError: false
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
    // @cb - function - callback to trigger once complete
    getSubReddits: function(cb) {
      var self = this,
          url  = this.domain;

      this.showError = false;
      this.busy = true;

      if (this.term === 'default') {
        this.title = 'Default Subreddits';
        url += 'subreddits/default.json';
      } else {
        this.title = '"' + this.term + '" Subreddits';
        url += 'search.json?type=sr&q=' + this.term;
      }

      fetch(url).then(function(res) {
        self.busy = false;

        if (res.ok) {
          return res.json();
        }

        throw new Error('Fetch failed: subs');
      }).then(function(json) {
        if (json.error) {
          this.setErrorState();
          console.error(json.error, json.message);
        } else {
          self.subs = json.data.children;
          self.$emit('on-search-complete');
        }

        if (cb) {
          cb();
        }
      }).catch(function(err) {
        self.setErrorState();

        if (cb) {
          cb();
        }
      });
    },

    // Determin if specified sub is the active sub
    // @sub - object - data for specified sub
    isActiveSub: function(sub) {
      return this.activeSub && (sub.data.display_name_prefixed === this.activeSub.display_name_prefixed);
    },

    // Dispatch event to application to indicate selected subreddit has changed
    // @sub - object - data for selected subreddit
    selectSub: function(sub) {
      this.$emit('on-sub-select', sub);
    },

    setErrorState: function() {
      this.showError = true;
      this.title = '';
      this.subs = null;
    }
  },

  template: `<nav id="LeftNav" class="side-column subreddits-list-container"">
              <h4 v-if="title">{{title}} <i v-if="busy" class="fa fa-refresh fa-spin"></i></h4>
              <ul class="subreddits-list">
                <li class="subreddit" v-for="sub in subs">
                  <a :href="'#' + sub.data.display_name_prefixed" @click="selectSub(sub.data)" v-bind:class="{'active' : isActiveSub(sub)}">{{sub.data.display_name}}</a>
                </li>
              </ul>

              <div v-if="showError" class="error">
                <i class="fa fa-frown-o fa-4x"></i>
                <p><strong>Well, that's embarassing.</strong></p>
              </div>
            </nav>`
});
